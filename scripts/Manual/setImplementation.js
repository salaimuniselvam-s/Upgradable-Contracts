const hre = require("hardhat");
const {
  ProxyGoerli,
  ProxyAdminGoerli,
  smsV3Goerli,
  ProxyAdmin,
  Proxy,
  smsV3,
} = require("../../secrets.json");

async function main() {
  const network = await hre.ethers.provider.getNetwork();
  console.log("Setting  Implementation..");
  const proxy = network.chainId == 5 ? ProxyGoerli : Proxy;
  const ImplementationContract = network.chainId == 5 ? smsV3Goerli : smsV3;
  const proxyAdmin = await hre.ethers.getContractAt(
    "ProxyAdmin",
    network.chainId == 5 ? ProxyAdminGoerli : ProxyAdmin
  );

  const initialImplementaion = await proxyAdmin.getProxyImplementation(proxy);

  console.log(`Old Implemented Contract is at ${initialImplementaion}`);

  const tx = await proxyAdmin.upgrade(proxy, ImplementationContract);
  await tx.wait(1);

  const UpdatedImplementaion = await proxyAdmin.getProxyImplementation(proxy);

  console.log(`Updated Implemented Contract is at ${UpdatedImplementaion}`);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
