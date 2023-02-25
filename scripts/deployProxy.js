const hre = require("hardhat");
const appendAddress = require("../appendAddress");

async function main() {
  //Deploy Proxy
  console.log("Deploying Proxy....");
  const Proxy = await hre.ethers.getContractFactory("Proxy");
  const proxy = await Proxy.deploy();
  await proxy.deployed();
  console.log(`Proxy is Deployed At ${proxy.address}`);
  appendAddress({ key: "Proxy", value: proxy.address });

  //Deploying Proxy Admin
  console.log("Deploying Proxy Admin....");
  const ProxyAdmin = await hre.ethers.getContractFactory("ProxyAdmin");
  const proxyAdmin = await ProxyAdmin.deploy();
  await proxyAdmin.deployed();
  console.log(`ProxyAdmin is Deployed At ${proxyAdmin.address}`);
  appendAddress({ key: "ProxyAdmin", value: proxyAdmin.address });

  const network = await hre.ethers.provider.getNetwork();
  if (network.chainId == 5) {
    appendAddress({ key: "ProxyGoerli", value: proxy.address });
    appendAddress({ key: "ProxyAdminGoerli", value: proxyAdmin.address });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
