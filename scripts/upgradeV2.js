const hre = require("hardhat");
const appendAddress = require("../appendAddress");

async function main() {
  const smsv2 = await ethers.getContractFactory("smsv2");
  console.log("Upgrading smsv2...");
  const PROXY_ADDRESS = "0x327F59af0e01eC33967de3e2C1d8623d96ae92a6";
  const sms = await upgrades.prepareUpgrade(PROXY_ADDRESS, smsv2);
  console.log("smsv2 deployed to:", sms);
  appendAddress({ key: "smsv2", value: sms });

  const network = await hre.ethers.provider.getNetwork();
  if (network.chainId == 5) {
    appendAddress({ key: "smsv2Goerli", value: sms });
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
