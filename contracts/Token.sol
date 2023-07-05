// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import 'hardhat/console.sol';

contract Token is ERC20('Laswap', 'LAS') {
    using SafeMath for uint256;

    address immutable owner;
    uint256 maxSupply = 1000000000*(10**18);

    IERC20 immutable USDC;
    IERC20 immutable DAI;
    IERC20 immutable LINK;
    IERC20 immutable WBTC;

    constructor () {
        owner = msg.sender;

        USDC = IERC20(0x3a034FE373B6304f98b7A24A3F21C958946d4075);
        DAI = IERC20(0xD77b79BE3e85351fF0cbe78f1B58cf8d1064047C);
        LINK = IERC20(0xCBf97FD098dBAc05cEeAD7f01Ea8e2Cf4313b60D);
        WBTC = IERC20(0xD1393E8b49B0f6C68A35e160dE2c0973a34290ee);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, 'Only the owner is authorized');
        _;
    }

    function mint(address _to, uint256 _amount) external virtual returns (bool) {
        require(
            (_amount + this.totalSupply()) <= maxSupply, 'can not mint more than a billion, maximum tokens'
        );
        _mint(_to, _amount);
        return true;
    }

    function burn(address _to, uint256 _amount) external virtual {
        _burn(_to, _amount);
    }

}