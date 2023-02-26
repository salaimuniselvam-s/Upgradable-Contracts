const hre = require("hardhat");
const { ProxyGoerli, Proxy } = require("../../secrets.json");

async function main() {
  const network = await hre.ethers.provider.getNetwork();
  // Setting Sms V1 Contract as Admin
  // console.log("Validate Proxy  Implementation Version 1 ..");
  // const smsV1 = await hre.ethers.getContractAt("smsV1", ProxyGoerli);
  // console.log(await smsV1.decimals());
  // console.log(await smsV1.name());
  // console.log(await smsV1.symbol());

  // console.log("Validate Proxy  Implementation Version 2..");
  // const smsV2 = await hre.ethers.getContractAt("smsV2", ProxyGoerli);
  // console.log(await smsV2.decimals());
  // console.log(await smsV2.name());
  // console.log(await smsV2.symbol());

  console.log("Validate Proxy  Implementation Version 3..");
  const smsV3 = await hre.ethers.getContractAt(
    "smsV3",
    network.chainId == 5 ? ProxyGoerli : Proxy
  );
  console.log(await smsV3.decimals());
  console.log(await smsV3.name());
  console.log(await smsV3.symbol());
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
