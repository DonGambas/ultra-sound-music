pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract USMToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("USM", "USM") {
        _mint(msg.sender, initialSupply);
    }
}
