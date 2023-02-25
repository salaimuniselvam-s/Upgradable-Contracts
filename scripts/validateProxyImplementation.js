const hre = require("hardhat");
const { ProxyGoerli, ProxyAdminGoerli } = require("../secrets.json");

async function main() {
  // Setting Sms V1 Contract as Admin
  console.log("Validate Proxy  Implementation..");
  const smsV1 = await hre.ethers.getContractAt("smsV1", ProxyGoerli);
  console.log(await smsV1.decimals());
  console.log(await smsV1.name());
  console.log(await smsV1.symbol());
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
