const hre = require("hardhat");
const appendAddress = require("../../appendAddress");
const { ERC_CONTRACT_NAME, ERC_TOKEN_NAME } = require("../../constants");

async function main() {
  //Deploying Sms Version 2
  console.log("Deploying Sms Erc contract Version 2....");
  const SmsV2 = await hre.ethers.getContractFactory("smsV2");
  const smsV2 = await SmsV2.deploy(ERC_CONTRACT_NAME, ERC_TOKEN_NAME);
  await smsV2.deployed();
  console.log(`Sms Contract Version2 is Deployed At ${smsV2.address}`);
  appendAddress({ key: "smsV2", value: smsV2.address });

  const network = await hre.ethers.provider.getNetwork();
  if (network.chainId == 5) {
    appendAddress({ key: "smsV2Goerli", value: smsV2.address });
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
