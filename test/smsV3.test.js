const { expect } = require("chai");
const { ethers } = require("hardhat");
const {
  ERC_CONTRACT_NAME,
  ERC_TOKEN_NAME,
  TOTAL_SUPPLY,
} = require("../constants");

let owner;
let user;

let smsV3;

describe("Sms Version3 Contract", function () {
  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();

    const SmsV3 = await hre.ethers.getContractFactory("smsV3");
    smsV3 = await SmsV3.deploy(ERC_CONTRACT_NAME, ERC_TOKEN_NAME);
    await smsV3.deployed();
  });

  // Test case

  it("Mint & Burn Validation", async function () {
    const totalSupply = await smsV3.totalSupply();
    const ownerBalance = await smsV3.balanceOf(owner.address);
    expect(totalSupply).equal(TOTAL_SUPPLY);
    expect(ownerBalance).equal(TOTAL_SUPPLY);

    // Burning Tokens
    await smsV3.burn(owner.address, TOTAL_SUPPLY);

    // Burn Validation
    const updatedTotalSupply = await smsV3.totalSupply();
    const updatedOwnerBalance = await smsV3.balanceOf(owner.address);
    expect(updatedTotalSupply).equal(0);
    expect(updatedOwnerBalance).equal(0);

    // Minting Tokens
    await smsV3.mint(owner.address, TOTAL_SUPPLY);

    // Minting Validation
    const updatedMintTotalSupply = await smsV3.totalSupply();
    const updatedMintOwnerBalance = await smsV3.balanceOf(owner.address);
    expect(updatedMintTotalSupply).equal(TOTAL_SUPPLY);
    expect(updatedMintOwnerBalance).equal(TOTAL_SUPPLY);

    // Checking Mint & Burn By Anyone will result in Revert
    // Mint By User
    await expect(
      smsV3.connect(user).mint(user.address, TOTAL_SUPPLY)
    ).to.be.revertedWith("Not owner");

    // Burn By User
    await expect(
      smsV3.connect(user).burn(user.address, TOTAL_SUPPLY)
    ).to.be.revertedWith("Not owner");
  });
});
