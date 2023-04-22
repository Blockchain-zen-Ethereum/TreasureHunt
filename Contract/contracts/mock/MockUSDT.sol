// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockUSDT is ERC20 {
    constructor(
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) {
    }

    function mint(address _recipient, uint256 _amount) external {
        _mint(_recipient, _amount);
    }

    function decimals() public view virtual override returns (uint8) {
        return 6;
    }
}