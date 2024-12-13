const SimpleInvoice = artifacts.require("SimpleInvoice");

module.exports = function (deployer) {
  deployer.deploy(SimpleInvoice);
};
