const hre = require("hardhat");
const { ProxyGoerli, ProxyAdminGoerli } = require("../secrets.json");

async function main() {
  // Setting ProxyAdmin Contract as Admin
  console.log("Setting ProxyAdmin Contract as Admin..");
  const proxy = await hre.ethers.getContractAt("Proxy", ProxyGoerli);

  const tx = await proxy.changeAdmin(ProxyAdminGoerli);
  await tx.wait(1);

  console.log("Admin Updated Successfully");
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
