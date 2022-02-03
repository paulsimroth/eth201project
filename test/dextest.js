const Dex = artifacts.require("Dex")
const Link = artifacts.require("Link")
const truffleAssert = require("truffle-assertions");

contract("Dex", accounts => {

//The User must have ETH deposited such that deposited ETH >= buy order value
    it("Should be more or as much ETH as buy order value", async () => {
        let dex = await Dex.deployed()
        let link = await Link.deployed()
        await link.approve(dex.address, 500);  
        await truffleAssert.passes(
            dex.addToken(web3.utils.fromUtf8("LINK"), link.address, {from: accounts[0]})
        )
        await truffleAssert.reverts(
            dex.createLimitOrder(0, web3.utils.fromUtf8("LINK"), 10, 1)
        )
        await dex.depositEth({value: web3.utils.toWei( "10", "ether")})
        await dex.deposit(100, web3.utils.fromUtf8("LINK"));
        await truffleAssert.passes(
            dex.createLimitOrder(0, web3.utils.fromUtf8("LINK"), 10, 1)
        )
    })

//The User must have enough tokens deposited such that token balance >= sell order amount
    it("Should be bigger or equal token balance to sell order value", async () =>{
        let dex = await Dex.deployed()
        let link = await Link.deployed()
        await truffleAssert.passes(
            dex.addToken(web3.utils.fromUtf8("LINK"), link.address, {from: accounts[0]})
        )
        await truffleAssert.reverts(
            dex.createLimitOrder(1, web3.utils.fromUtf8("LINK"), 10, 1)
        )
        await link.approve(dex.address, 500);
        await dex.deposit(10, web3.utils.fromUtf8("LINK"));
        await truffleAssert.passes(
            dex.createLimitOrder(1, web3.utils.fromUtf8("LINK"), 10, 1)
        )
    })

//The BUY order book should be ordered on price from highest to lowest starting at index 0
    it("Should order BUY order book from highest to lowest value", async () =>{
        let dex = await Dex.deployed()
        let link = await Link.deployed()
        await link.approve(dex.address, 500);

        await dex.createLimitOrder(0, web3.utils.fromUtf8("LINK"), 1, 300)
        await dex.createLimitOrder(0, web3.utils.fromUtf8("LINK"), 1, 100)
        await dex.createLimitOrder(0, web3.utils.fromUtf8("LINK"), 1, 200)

        let orderbook = await dex.getOrderBook(web3.utils.fromUtf8("LINK"), 0);
        assert(orderbook.length>0);

        for (let i = 0; i < orderbook.length - 1; i++) {
            const element = array[index];
            assert(orderbook[i].price >= orderbook[i+1].price, "not right order in buy book")
        }
    })

//The SELL order book should be ordered on price from lowest to highest starting at index 0
    it("Should order SELL order book from lowest to highest value", async () =>{
        let dex = await Dex.deployed()
        let link = await Link.deployed()

        await link.approve(dex.address, 500);
        await dex.createLimitOrder(1, web3.utils.fromUtf8("LINK"), 1, 300)
        await dex.createLimitOrder(1, web3.utils.fromUtf8("LINK"), 1, 100)
        await dex.createLimitOrder(1, web3.utils.fromUtf8("LINK"), 1, 200)

        let orderbook = await dex.getOrderBook(web3.utils.fromUtf8("LINK"), 1);
        assert(orderbook.length>0);
        
        for (let i = 0; i < orderbook.length - 1; i++) {
            const element = array[index];
            assert(orderbook[i].price <= orderbook[i+1].price, "not right order in SELL book")
        }
    })

})
