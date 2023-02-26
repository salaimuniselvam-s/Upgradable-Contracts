const hre = require("hardhat");
const appendAddress = require("../appendAddress");
const { ERC_CONTRACT_NAME, ERC_TOKEN_NAME } = require("../constants");
async function main() {
  const smsv1 = await ethers.getContractFactory("smsv1");
  console.log("Deploying smsv1...");
  const sms = await upgrades.deployProxy(
    smsv1,
    [ERC_CONTRACT_NAME, ERC_TOKEN_NAME],
    {
      initializer: "initialise",
    }
  );
  console.log("smsv1 deployed to:", sms.address);
  appendAddress({ key: "smsv1", value: sms.address });

  const network = await hre.ethers.provider.getNetwork();
  if (network.chainId == 5) {
    appendAddress({ key: "smsv1Goerli", value: sms.address });
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
