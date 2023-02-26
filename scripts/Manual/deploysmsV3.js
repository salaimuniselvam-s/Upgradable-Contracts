const hre = require("hardhat");
const appendAddress = require("../../appendAddress");
const { ERC_CONTRACT_NAME, ERC_TOKEN_NAME } = require("../../constants");

async function main() {
  //Deploying Sms Version 3
  console.log("Deploying Sms Erc contract Version 3....");
  const SmsV3 = await hre.ethers.getContractFactory("smsV3");
  const smsV3 = await SmsV3.deploy(ERC_CONTRACT_NAME, ERC_TOKEN_NAME);
  await smsV3.deployed();
  console.log(`Sms Contract Version3 is Deployed At ${smsV3.address}`);
  appendAddress({ key: "smsV3", value: smsV3.address });

  const network = await hre.ethers.provider.getNetwork();
  if (network.chainId == 5) {
    appendAddress({ key: "smsV3Goerli", value: smsV3.address });
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
