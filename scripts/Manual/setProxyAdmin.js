const hre = require("hardhat");
const {
  ProxyGoerli,
  ProxyAdminGoerli,
  ProxyAdmin,
  Proxy,
} = require("../../secrets.json");

async function main() {
  const network = await hre.ethers.provider.getNetwork();
  // Setting ProxyAdmin Contract as Admin
  console.log("Setting ProxyAdmin Contract as Admin..");
  const proxy = await hre.ethers.getContractAt(
    "Proxy",
    network.chainId == 5 ? ProxyGoerli : Proxy
  );

  const tx = await proxy.changeAdmin(
    network.chainId == 5 ? ProxyAdminGoerli : ProxyAdmin
  );
  await tx.wait(1);

  console.log("Admin Updated Successfully");
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
