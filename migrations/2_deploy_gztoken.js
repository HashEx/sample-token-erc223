const GzToken = artifacts.require("./GzToken.sol");

module.exports = function(deployer) {
  deployer.deploy(GzToken);
};