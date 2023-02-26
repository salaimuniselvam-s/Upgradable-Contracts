const { expect } = require("chai");
const { ethers } = require("hardhat");
const {
  ERC_CONTRACT_NAME,
  ERC_TOKEN_NAME,
  TOTAL_SUPPLY,
} = require("../constants");

let owner;
let user;

let smsV1;

describe("Sms Version1 Contract", function () {
  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();

    const SmsV1 = await hre.ethers.getContractFactory("smsV1");
    smsV1 = await SmsV1.deploy("SMS", "sms");
    await smsV1.deployed();
  });

  // Test case

  it("Contract Name & Symbol Validation", async function () {
    let name = await smsV1.name();
    let symbol = await smsV1.symbol();
    expect(name).equal(ERC_CONTRACT_NAME);
    expect(symbol).equal(ERC_TOKEN_NAME);
  });
  it("Total Supply Validation", async function () {
    let totalSupply = await smsV1.totalSupply();
    expect(totalSupply).equal(TOTAL_SUPPLY);
  });

  it("Balance of Validation", async function () {
    let balance = await smsV1.balanceOf(owner.address);
    expect(balance).equal(TOTAL_SUPPLY);
  });
});
