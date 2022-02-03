// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract Wallet is Ownable{

    using SafeMath for uint256;

    //token consists of a ticker and the contract address
    struct Token {
        bytes32 ticker;
        address tokenAddress;
    }

    mapping(bytes32 => Token) public tokenMapping;

    bytes32[] public tokenList;

    mapping(address => mapping(bytes32 => uint256)) public balances;

    modifier tokenExist(bytes32 ticker) {
        require(tokenMapping[ticker].tokenAddress != address(0), "Token not listed!");
        _;
    }

    //add ERC20 Token
    function addToken(bytes32 ticker, address tokenAddress) onlyOwner external {
        tokenMapping[ticker] = Token(ticker, tokenAddress);
        tokenList.push(ticker);
    }

    //deposit  ERC20 Token
    function deposit(uint amount, bytes32 ticker) tokenExist(ticker) external {
        require(amount != 0, "cannot deposit nothing");
        IERC20(tokenMapping[ticker].tokenAddress).transferFrom(msg.sender,address(this), amount);
        balances[msg.sender][ticker] = balances[msg.sender][ticker].add(amount);
    }

    //withdraw ERC20 Token
    function withdraw(uint amount, bytes32 ticker) tokenExist(ticker) external {
        require(balances[msg.sender][ticker] >= amount, "Balance not sufficient");
        IERC20(tokenMapping[ticker].tokenAddress).transfer(msg.sender, amount);
        balances[msg.sender][ticker] = balances[msg.sender][ticker].sub(amount);
    }

    //deposit ETH
    function depositEth() payable external {
        require(msg.value != 0, "cannot deposit nothing");
        //IERC20(tokenMapping["ETH"]).transferFrom(msg.sender,address(this), msg.value);
        balances[msg.sender]["ETH"] = balances[msg.sender]["ETH"].add(msg.value);
    }

    //withdraw ETH
    function withdrawEth() payable external {
        require(balances[msg.sender]["ETH"] >= msg.value, "Balance not sufficient");
        //IERC20(tokenMapping["ETH"]).transfer(msg.sender, msg.value);
        balances[msg.sender]["ETH"] = balances[msg.sender]["ETH"].sub(msg.value);
    }
}