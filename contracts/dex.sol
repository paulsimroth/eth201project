// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;
pragma experimental ABIEncoderV2;

import "./wallet.sol";

contract Dex is Wallet {

    using SafeMath for uint256;

    enum Side {
        BUY,
        SELL
    }

    struct Order {
        uint id;
        address trader;
        Side side;
        bytes32 ticker;
        uint amount;
        uint price;
        uint filled;
    }

    uint public nextOrderId = 0;

    mapping(bytes32 => mapping(uint => Order[])) public orderBook;

    function getOrderBook(bytes32 ticker, Side side) view public returns(Order[] memory){
        return orderBook[ticker][uint(side)];
    }

    function createLimitOrder(Side side, bytes32 ticker, uint amount, uint price) public{
        if(side == Side.BUY){
           require(balances[msg.sender]["ETH"] >= amount.mul(price), "ETH balance must be greater than or equal to buy order value!");
       }
        else if(side == Side.SELL){
           require(balances[msg.sender][ticker] >= amount, "Token balance must be greater than or equal to sell order value!");
       }

        Order[] storage orders = orderBook[ticker][uint(side)];
        orders.push(
            Order(nextOrderId, msg.sender, side, ticker, amount, price)
        );

        //Bubble sort for both order books
        uint i = orders.length > 0 ? orders.length - 1 : 0;

        if(side == Side.BUY){
            while(i > 0){
                if(orders[i - 1].price > orders[i].price) {
                    break;
                }
                Order memory orderToMove = orders[i - 1];
                orders[i - 1] = orders[i];
                orders[i] = orderToMove;
                i--;
            }
        }
        else if (side == Side.SELL){
             while(i > 0){
                if(orders[i - 1].price < orders[i].price) {
                    break;
                }
                Order memory orderToMove = orders[i - 1];
                orders[i - 1] = orders[i];
                orders[i] = orderToMove;
                i--;
            }
        }

        nextOrderId++;
    }

    function createMarketOrder(Side side, bytes32 ticker, uint amount) public{
        require(balances[msg.sender][ticker] >= amount, "Insufficient balance");

        uint orderBookSide;
        if(side == Side.BUY){
            orderBookSide = 1;
        }
        else if (side == Side.SELL){
            orderBookSide = 0;
        }

        Order[] storage orders = orderBook[ticker][orderBookSide];

        uint totalFilled;

        for (uint256 i = 0; i < orders.length && totalFilled < amount; i++){
            //Filling from order[i]

            //update totalFilled

            //Execute trade & shift balances

            //Verify buyer has enough ETH for transaction
            
        }

        //Loop through orderbook, remove 100% filled orders
    }

}