const hre = require("hardhat");
const appendAddress = require("../appendAddress");

async function main() {
  const smsv3 = await ethers.getContractFactory("smsv3");
  console.log("Upgrading smsv3...");
  const PROXY_ADDRESS = "0x327F59af0e01eC33967de3e2C1d8623d96ae92a6";
  const sms = await upgrades.prepareUpgrade(PROXY_ADDRESS, smsv3);
  console.log("smsv3 deployed to:", sms);
  appendAddress({ key: "smsv3", value: sms });

  const network = await hre.ethers.provider.getNetwork();
  if (network.chainId == 5) {
    appendAddress({ key: "smsv3Goerli", value: sms });
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
