const SimpleInvoice = artifacts.require("SimpleInvoice");

contract("SimpleInvoice", (accounts) => {
  const [owner, buyer] = accounts;

  it("should create an invoice", async () => {
    const instance = await SimpleInvoice.deployed();
    await instance.addInvoice(buyer, 1000, Date.now() + 3600, { from: owner });

    const invoice = await instance.getInvoice(0);
    assert.equal(invoice[0], owner, "seller should match");
    assert.equal(invoice[1], buyer, "buyer should match");
    assert.equal(invoice[2].toNumber(), 1000, "amount should match");
    assert.equal(invoice[3].toNumber(), 0, "status should be pending");
  });

  it("should allow buyer to pay the invoice", async () => {
    const instance = await SimpleInvoice.deployed();
    await instance.payInvoice(0, { from: buyer, value: 1000 });

    const invoice = await instance.getInvoice(0);
    assert.equal(invoice[3].toNumber(), 1, "status should be complete");
  });

  it("should allow seller to withdraw funds", async () => {
    const instance = await SimpleInvoice.deployed();
    const balanceBefore = web3.utils.toBN(await web3.eth.getBalance(owner));

    await instance.withdraw({ from: owner });

    const balanceAfter = web3.utils.toBN(await web3.eth.getBalance(owner));
    assert(balanceAfter.gt(balanceBefore), "seller should have withdrawn funds");
  });
});
