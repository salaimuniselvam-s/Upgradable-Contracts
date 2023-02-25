require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");

/** @type import('hardhat/config').HardhatUserConfig */
const {
  InfuraAPIkeyGoerli,
  deployerWalletPrivateKey,
  etherscanAPIkey,
} = require("./secrets.json");

module.exports = {
  solidity: "0.8.12",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    goerli: {
      url: InfuraAPIkeyGoerli, //from infura
      accounts: [deployerWalletPrivateKey], //from metamask
      gas: 10000000,
    },
  },
  etherscan: {
    apiKey: etherscanAPIkey,
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};
