// pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// import "@openzeppelin/contracts/utils/math/SafeMath.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

// contract GameContract is Ownable {
//     using SafeMath for uint256;

//     struct Game {
//         uint256 gameId;
//         address creator;
//         uint256 prizeAmount;
//         uint256 feeAmount;
//         uint256 feeIncrease;
//         uint256 deadline;
//         address winner;
//         mapping(address => uint256) participantFees;
//     }

//     uint256 public gameIdCounter;
//     uint256 public constant DEFAULT_GAME_DURATION = 5 minutes;
//     uint256 public constant PRIZE_DISTRIBUTION_GAME_CREATOR = 60;
//     uint256 public constant PRIZE_DISTRIBUTION_TOKEN_STACKERS = 20;
//     uint256 public constant PRIZE_DISTRIBUTION_PROJECT_DEVELOPERS = 10;
//     uint256 public constant PRIZE_DISTRIBUTION_PARTICIPANTS = 10;

//     mapping(uint256 => Game) public games;
//     IERC20 public prizeToken;

//     event GameCreated(
//         uint256 indexed gameId,
//         address indexed creator,
//         uint256 prizeAmount,
//         uint256 feeAmount,
//         uint256 deadline
//     );
//     event GameJoined(
//         uint256 indexed gameId,
//         address indexed participant,
//         uint256 feeAmount
//     );
//     event GameWon(
//         uint256 indexed gameId,
//         address indexed winner,
//         uint256 prizeAmount
//     );

//     constructor(address _prizeTokenAddress) {
//         prizeToken = IERC20(_prizeTokenAddress);
//         gameIdCounter = 1;
//     }

//     function createGame(uint256 _prizeAmount, uint256 _feeAmount) external {
//         require(_prizeAmount > 0, "Prize amount must be greater than zero.");
//         require(_feeAmount > 0, "Fee amount must be greater than zero.");

//         uint256 gameId = gameIdCounter;

//         games[gameId] = Game({
//             gameId: gameId,
//             creator: msg.sender,
//             prizeAmount: _prizeAmount,
//             feeAmount: _feeAmount,
//             feeIncrease: 1,
//             deadline: block.timestamp.add(DEFAULT_GAME_DURATION),
//             winner: address(0)
//         });

//         prizeToken.transferFrom(msg.sender, address(this), _prizeAmount);
//         emit GameCreated(
//             gameId,
//             msg.sender,
//             _prizeAmount,
//             _feeAmount,
//             games[gameId].deadline
//         );

//         gameIdCounter = gameIdCounter.add(1);
//     }

//     function joinGame(uint256 _gameId) external {
//         Game storage game = games[_gameId];
//         require(game.creator != address(0), "Game does not exist.");
//         require(game.winner == address(0), "Game has already ended.");
//         require(game.deadline > block.timestamp, "Game has expired.");

//         uint256 feeAmount = game.feeAmount.add(
//             game.feeIncrease.mul(game.participantFees[msg.sender])
//         );
//         prizeToken.transferFrom(msg.sender, address(this), feeAmount);
//         game.participantFees[msg.sender] = game.participantFees[msg.sender].add(
//             1
//         );
//         game.feeIncrease = game.feeIncrease.add(1);
//         game.deadline = block.timestamp.add(DEFAULT_GAME_DURATION);
//         emit GameJoined(_gameId, msg.sender, feeAmount);
//     }

//     function endGame(uint256 _gameId) external onlyOwner {
//         Game storage game = games[_gameId];
//         require(game.creator != address(0), "Game does not exist.");
//         require(game.winner == address(0), "Game has already ended.");
//         require(game.deadline <= block.timestamp, "Game is ongoing.");
//         address winner = determineWinner(_gameId);
//         game.winner = winner;
//         uint256 totalFeeAmount = getTotalFeeAmount(game);
//         uint256 prizeAmount = game.prizeAmount.sub(totalFeeAmount);
//         uint256 gameCreatorPrize = prizeAmount
//             .mul(PRIZE_DISTRIBUTION_GAME_CREATOR)
//             .div(100);
//         uint256 tokenStackersPrize = prizeAmount
//             .mul(PRIZE_DISTRIBUTION_TOKEN_STACKERS)
//             .div(100);
//         uint256 projectDevelopersPrize = prizeAmount
//             .mul(PRIZE_DISTRIBUTION_PROJECT_DEVELOPERS)
//             .div(100);
//         uint256 participantsPrize = prizeAmount
//             .mul(PRIZE_DISTRIBUTION_PARTICIPANTS)
//             .div(100);

//         prizeToken.transfer(game.creator, gameCreatorPrize);
//         prizeToken.transfer(owner(), projectDevelopersPrize);

//         for (uint256 i = 0; i < tokenStackers.length; i++) {
//             prizeToken.transfer(
//                 tokenStackers[i],
//                 tokenStackersPrize.div(tokenStackers.length)
//             );
//         }

//         for (uint256 i = 0; i < participants.length; i++) {
//             prizeToken.transfer(
//                 participants[i],
//                 participantsPrize.div(participants.length)
//             );
//         }

//         prizeToken.transfer(
//             winner,
//             totalFeeAmount
//                 .add(prizeAmount)
//                 .sub(gameCreatorPrize)
//                 .sub(projectDevelopersPrize)
//                 .sub(tokenStackersPrize)
//                 .sub(participantsPrize)
//         );
//         emit GameWon(_gameId, winner, prizeAmount);
//     }

//     function determineWinner(uint256 _gameId) internal view returns (address) {
//         Game storage game = games[_gameId];
//         uint256 maxFees = 0;
//         address winner = address(0);

//         for (uint256 i = 0; i < game.participants.length; i++) {
//             address participant = game.participants[i];
//             uint256 participantFees = game.participantFees[participant];
//             if (participantFees > maxFees) {
//                 maxFees = participantFees;
//                 winner = participant;
//             }
//         }

//         return winner;
//     }

//     function getTotalFeeAmount(
//         Game storage _game
//     ) internal view returns (uint256) {
//         uint256 totalFeeAmount = _game.feeAmount;
//         for (uint256 i = 0; i < _game.participants.length; i++) {
//             address participant = _game.participants[i];
//             totalFeeAmount = totalFeeAmount.add(
//                 _game.feeIncrease.mul(_game.participantFees[participant])
//             );
//         }
//         return totalFeeAmount;
//     }
// }
