pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "../lib/thundercore/RandomLibrary.sol";

contract Treasury is Ownable {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    struct Game {
        bool isSettled;
        uint256 gameId;
        address creator;
        uint256 prizeAmount;
        uint256 totalFeeAmount;
        uint256 startTime;
        uint256 deadline;
        address winner;
        Lottery lottery;
    }

    struct Lottery {
        uint256 randomNumber;
        address winner;
        address[] tickets;
    }

    struct rewardDistribution {
        uint256 gameId;
        bool isClaimed;
        uint256 amount;
    }

    uint256 public gameIdCounter;
    uint256 public initFeeAmount;
    uint256 public constant PRIZE_TOKEN_DECIMAL = 18;
    uint256 public constant FEE_TOKEN_DECIMAL = 18;
    uint256 public constant DEFAULT_GAME_DURATION = 60 minutes;
    uint256 public constant DEFAULT_FEE_INCREASE_DURATION = 6 hours;
    uint256 public constant PRIZE_DISTRIBUTION_GAME_CREATOR = 60;
    uint256 public constant PRIZE_DISTRIBUTION_TOKEN_STACKERS = 20;
    uint256 public constant PRIZE_DISTRIBUTION_TREASURY = 10;
    uint256 public constant PRIZE_DISTRIBUTION_LOTTERY = 10;

    mapping(uint256 => Game) public games;
    mapping(address => mapping(uint256 => uint256))
        public userParticipationCount;
    mapping(address => rewardDistribution[]) public winnerPrizeList;
    mapping(address => rewardDistribution[]) public creatorRewardList;
    mapping(address => rewardDistribution[]) public lotteryRewardList;
    address public stakingPool;
    address public treasury;
    IERC20 public prizeToken;
    IERC20 public feeToken;

    constructor(
        address _prizeTokenAddress,
        address _feeToken,
        address _treasury,
        address _stakingPool
    ) {
        prizeToken = IERC20(_prizeTokenAddress);
        feeToken = IERC20(_feeToken);
        treasury = _treasury;
        stakingPool = _stakingPool;
        initFeeAmount = 10 ** FEE_TOKEN_DECIMAL;
        gameIdCounter = 1;
    }

    function createGame(uint256 _prizeAmount) external {
        require(_prizeAmount > 0, "Prize amount must be greater than zero.");

        uint256 gameId = gameIdCounter;

        Lottery memory initLottery;
        games[gameId] = Game({
            isSettled: false,
            gameId: gameId,
            creator: msg.sender,
            prizeAmount: _prizeAmount,
            totalFeeAmount: 0,
            startTime: block.timestamp,
            deadline: block.timestamp.add(DEFAULT_GAME_DURATION),
            winner: address(0),
            lottery: initLottery
        });

        gameIdCounter = gameIdCounter.add(1);
        prizeToken.transferFrom(msg.sender, address(this), _prizeAmount);
    }

    function joinGame(uint256 _gameId) external {
        Game storage game = games[_gameId];
        require(game.creator != address(0), "Game does not exist.");
        require(game.deadline > block.timestamp, "Game has expired.");

        userParticipationCount[msg.sender][_gameId]++;
        game.winner = msg.sender;
        game.deadline = block.timestamp.add(DEFAULT_GAME_DURATION);

        Lottery storage lottery = game.lottery;
        lottery.tickets.push(msg.sender);

        uint256 timeDuration = block.timestamp.sub(game.startTime);
        uint256 feeAmount = initFeeAmount.add(
            (timeDuration.div(DEFAULT_FEE_INCREASE_DURATION)) **
                FEE_TOKEN_DECIMAL
        );
        game.totalFeeAmount = game.totalFeeAmount.add(feeAmount);
        prizeToken.transferFrom(msg.sender, address(this), feeAmount);
    }

    function endGame(uint256 _gameId) external {
        Game storage game = games[_gameId];
        require(game.creator != address(0), "Game does not exist.");
        require(game.deadline <= block.timestamp, "Game is ongoing.");
        require(!game.isSettled, "Game has been settled.");

        game.isSettled = true;

        if (game.winner != address(0) && game.totalFeeAmount > 0) {
            winnerPrizeList[game.winner].push(
                rewardDistribution({
                    gameId: game.gameId,
                    isClaimed: false,
                    amount: game.prizeAmount
                })
            );

            uint256 creatorReward = game
                .totalFeeAmount
                .mul(PRIZE_DISTRIBUTION_GAME_CREATOR)
                .div(100);
            uint256 stackerReward = game
                .totalFeeAmount
                .mul(PRIZE_DISTRIBUTION_TOKEN_STACKERS)
                .div(100);
            uint256 treasuryReward = game
                .totalFeeAmount
                .mul(PRIZE_DISTRIBUTION_TREASURY)
                .div(100);
            uint256 lotteryReward = game
                .totalFeeAmount
                .mul(PRIZE_DISTRIBUTION_LOTTERY)
                .div(100);

            creatorRewardList[game.creator].push(
                rewardDistribution({
                    gameId: game.gameId,
                    isClaimed: false,
                    amount: creatorReward
                })
            );

            game.lottery.randomNumber = LibThunderRNG.rand();
            game.lottery.winner = game.lottery.tickets[
                game.lottery.randomNumber.mod(game.lottery.tickets.length)
            ];
            lotteryRewardList[game.lottery.winner].push(
                rewardDistribution({
                    gameId: game.gameId,
                    isClaimed: false,
                    amount: lotteryReward
                })
            );

            feeToken.safeTransfer(stakingPool, stackerReward);
            feeToken.safeTransfer(treasury, treasuryReward);
        } else {
            winnerPrizeList[game.creator].push(
                rewardDistribution({
                    gameId: game.gameId,
                    isClaimed: false,
                    amount: game.prizeAmount
                })
            );
        }
    }

    function claimWinnerPrize(uint256 _index) external {
        require(
            _index < winnerPrizeList[msg.sender].length,
            "index out of range"
        );
        rewardDistribution storage winnerPrize = winnerPrizeList[msg.sender][
            _index
        ];
        require(!winnerPrize.isClaimed, "The prize has been claimed");
        winnerPrize.isClaimed = true;

        prizeToken.safeTransfer(msg.sender, winnerPrize.amount);
    }

    function claimCreatorReward(uint256 _index) external {
        require(
            _index < creatorRewardList[msg.sender].length,
            "index out of range"
        );
        rewardDistribution storage creatorReward = creatorRewardList[
            msg.sender
        ][_index];
        require(!creatorReward.isClaimed, "The reward has been claimed");
        creatorReward.isClaimed = true;

        feeToken.safeTransfer(msg.sender, creatorReward.amount);
    }

    function claimLotteryReward(uint256 _index) external {
        require(
            _index < lotteryRewardList[msg.sender].length,
            "index out of range"
        );
        rewardDistribution storage lotteryReward = lotteryRewardList[
            msg.sender
        ][_index];
        require(!lotteryReward.isClaimed, "The reward has been claimed");
        lotteryReward.isClaimed = true;

        prizeToken.safeTransfer(msg.sender, lotteryReward.amount);
    }

    function getLotteryInfo(
        uint256 _gameId
    )
        external
        view
        returns (uint256 randomNumber, uint256 participantCount, address winner)
    {
        Game memory game = games[_gameId];
        require(game.creator != address(0), "Game does not exist.");

        return (
            game.lottery.randomNumber,
            game.lottery.tickets.length,
            game.lottery.winner
        );
    }

    function getGameParticipantList(
        uint256 _gameId,
        uint256 _start,
        uint256 _end
    ) external view returns (address[] memory) {
        Game memory game = games[_gameId];
        require(game.creator != address(0), "Game does not exist.");
        require(_start >= 0 && _start <= _end, "Index out of range");
        require(game.lottery.tickets.length <= _end, "Index out of range");

        address[] memory participants = new address[](_end.sub(_start).add(1));
        for(uint256 i = _start; i <= _end; i++) {
            participants[i.sub(_start)] = game.lottery.tickets[_start];
        }

        return participants;
    }
}
