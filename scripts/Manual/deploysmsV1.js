const hre = require("hardhat");
const appendAddress = require("../../appendAddress");
const { ERC_CONTRACT_NAME, ERC_TOKEN_NAME } = require("../../constants");

async function main() {
  //Deploying Sms Version 1
  console.log("Deploying Sms Erc contract Version 1....");
  const SmsV1 = await hre.ethers.getContractFactory("smsV1");
  const smsV1 = await SmsV1.deploy(ERC_CONTRACT_NAME, ERC_TOKEN_NAME);
  await smsV1.deployed();
  console.log(`Sms Contract Version1 is Deployed At ${smsV1.address}`);
  appendAddress({ key: "smsV1", value: smsV1.address });

  const network = await hre.ethers.provider.getNetwork();
  if (network.chainId == 5) {
    appendAddress({ key: "smsV1Goerli", value: smsV1.address });
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
