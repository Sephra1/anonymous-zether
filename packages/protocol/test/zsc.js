const ERC20Mintable = artifacts.require("ERC20Mintable");
const ZSC = artifacts.require("ZSC");
const utils = require('../../anonymous.js/src/utils/utils.js');

contract("ZSC", async accounts => {
    it("should allow depositing / funding", async () => {
        let erc20mintable = await ERC20Mintable.deployed();
        let zsc = await ZSC.deployed();
        await erc20mintable.mint(accounts[0], 10000000);
        let balance = await erc20mintable.balanceOf.call(accounts[0]);
        assert.equal(
            balance,
            10000000,
            "Minting failed."
        );
        var y = utils.createAccount()['y'];
        var resp = await zsc.register(y);
        var receipt = await web3.eth.getTransactionReceipt(resp.tx);
        assert.equal(
            receipt.status,
            "0x1",
            "Registration failed."
        ); // this might be necessary.
    });
});