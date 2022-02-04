const Dex = artifacts.require("Dex")
const Link = artifacts.require("Link")
const truffleAssert = require("truffle-assertions");

contract("Dex", accounts => {
    it("Should only be possible for owners to add tokens", async () =>{
        let dex = await Dex.deployed()
        let link = await Link.deployed()
        await truffleAssert.passes(
            dex.addToken(web3.utils.fromUtf8("LINK"), link.address, {from: accounts[0]})
        )
    })

    it("Should handle deposits correctly", async () =>{
        let dex = await Dex.deployed()
        let link = await Link.deployed()
        await link.approve(dex.address, 500);
        await dex.deposit(100, web3.utils.fromUtf8("LINK"));
        let balance = await dex.balance(web3.utils.fromUtf8("LINK"))
        console.log(balance)
        assert.equal(balance.toString(), 100)
        
    })

    it("Should handle faulty withdrawals correctly", async () =>{
        let dex = await Dex.deployed()
        let link = await Link.deployed()
        await truffleAssert.reverts(dex.withdraw(500, web3.utils.fromUtf8("LINK")))
    })

    it("Should handle withdrawals correctly", async () =>{
        let dex = await Dex.deployed()
        let link = await Link.deployed()
        await truffleAssert.passes(dex.withdraw(100, web3.utils.fromUtf8("LINK")))
    })

    it("Should handle ETH deposits correctly", async () =>{
        let dex = await Dex.deployed()
        let link = await Link.deployed()
        await dex.depositEth({value: web3.utils.toWei("10", "ether")});
        let balance = await dex.balance(web3.utils.fromUtf8("ETH"))
        console.log(balance)
        assert.equal(web3.utils.fromWei(balance.toString(), "ether"), 10) 
    })

    it("Should handle faulty ETH withdrawals correctly", async () =>{
        let dex = await Dex.deployed()
        let link = await Link.deployed()
        await truffleAssert.reverts(dex.withdrawEth(web3.utils.toWei("100", "ether")))
    })

    it("Should handle ETH withdrawals correctly", async () =>{
        let dex = await Dex.deployed()
        let link = await Link.deployed()
        await truffleAssert.passes(dex.withdrawEth(web3.utils.toWei("10", "ether")))
    })

})
