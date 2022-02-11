# Ethereum201-course-project

This is my repository for the project as part of the course Ethereum Smart Contract Programming 201 at Moralis Academy.

The project is a decentralized Exchange built using Truffle and Openzeppelin.
It consists of a wallet contract and a dex contract which inherits from the wallet.
The token contract is there for testing.

All test files are also included in this repository.

In the dex you can do market orders and limit orders.
The order book is sorted with a bubble sort algorithm which compares two values inside of the order book array and orders them depending on the side of the orderbook. 
After the limit orders are filled by market orders the orderbooks get updated in the market order function.
