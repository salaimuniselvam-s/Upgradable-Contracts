const hre = require("hardhat");
const {
  ProxyGoerli,
  ProxyAdminGoerli,
  smsV1Goerli,
} = require("../secrets.json");

async function main() {
  // Setting Sms V1 Contract as Admin
  console.log("Setting Sms V1 Contract as Implementation..");
  const proxyAdmin = await hre.ethers.getContractAt(
    "ProxyAdmin",
    ProxyAdminGoerli
  );

  const initialImplementaion = await proxyAdmin.getProxyImplementation(
    ProxyGoerli
  );

  console.log(`Old Implemented Contracted is ${initialImplementaion}`);
  const tx = await proxyAdmin.upgrade(ProxyGoerli, smsV1Goerli);
  await tx.wait(1);

  const UpdatedImplementaion = await proxyAdmin.getProxyImplementation(
    ProxyGoerli
  );

  console.log(`Updated Implemented Contracted is ${UpdatedImplementaion}`);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
