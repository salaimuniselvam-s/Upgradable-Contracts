# Upgradable Smart Contract

This Project Demonstrates How to use Upgradable Proxy Contract.

## pre-requiste

```
node js
```

## To run & test

```shell
npm install
npx hardhat test
```

## To Deploy & Upgrade Contract

To Deploy ERC Contract Version 1,

```
  yarn upgradeV1
```

To Upgrade Contract to next version with mint & burn,

```
  yarn upgradeV2
```

To Upgrade Contract with reentrancy guard ,

```
  yarn upgradeV3
```

## Contract Addresses

1. Proxy Admin Address : [0x5f801e0B849Fd0798B00C66A57809D8626050984](https://goerli.etherscan.io/address/0x5f801e0B849Fd0798B00C66A57809D8626050984)
2. Proxy Address: [0x327F59af0e01eC33967de3e2C1d8623d96ae92a6](https://goerli.etherscan.io/address/0x327F59af0e01eC33967de3e2C1d8623d96ae92a6)
3. Implementation V1: [0xCD36FbB238114E104B9A413bF7e768FABF029CF1](https://goerli.etherscan.io/address/0xCD36FbB238114E104B9A413bF7e768FABF029CF1)
4. Implementation V2: [0xe521b33E9bccb53f7c9504702cB259C17A1577be](https://goerli.etherscan.io/address/0xe521b33E9bccb53f7c9504702cB259C17A1577be)
5. Implementation V3: [0x242D8746edaad2CaA23Fd465C48518D3c286f266](https://goerli.etherscan.io/address/0x242D8746edaad2CaA23Fd465C48518D3c286f266)
