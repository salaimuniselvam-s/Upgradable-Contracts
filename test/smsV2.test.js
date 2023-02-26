const { expect } = require("chai");
const { ethers } = require("hardhat");
const {
  ERC_CONTRACT_NAME,
  ERC_TOKEN_NAME,
  TOTAL_SUPPLY,
} = require("../constants");

let owner;
let user;
const APPROVAL_AMOUNT = 10000;

let smsV2;

describe("Sms Version2 Contract", function () {
  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();

    const SmsV2 = await hre.ethers.getContractFactory("smsV2");
    smsV2 = await SmsV2.deploy(ERC_CONTRACT_NAME, ERC_TOKEN_NAME);
    await smsV2.deployed();
  });

  // Test case

  it("Approve & Allowance & Transfer From Validation", async function () {
    await smsV2.approve(user.address, APPROVAL_AMOUNT);
    //  Approving
    const allowance = await smsV2.allowance(owner.address, user.address);
    const totalSupply = await smsV2.totalSupply();
    const ownerBalance = await smsV2.balanceOf(owner.address);
    const userBalance = await smsV2.balanceOf(user.address);
    expect(allowance).equal(APPROVAL_AMOUNT);
    expect(totalSupply).equal(TOTAL_SUPPLY);
    expect(ownerBalance).equal(TOTAL_SUPPLY);
    expect(userBalance).equal(0);

    // Withdrawl
    await smsV2
      .connect(user)
      .transferFrom(owner.address, user.address, APPROVAL_AMOUNT);

    // Validating
    const updatedAllowance = await smsV2.allowance(owner.address, user.address);
    const updatedTotalSupply = await smsV2.totalSupply();
    const updatedOwnerBalance = await smsV2.balanceOf(owner.address);
    const updatedUserBalance = await smsV2.balanceOf(user.address);
    expect(updatedAllowance).equal(0);
    expect(updatedTotalSupply).equal(TOTAL_SUPPLY);
    expect(updatedOwnerBalance).equal(TOTAL_SUPPLY - APPROVAL_AMOUNT);
    expect(updatedUserBalance).equal(APPROVAL_AMOUNT);
  });

  it("Transfer Validation", async function () {
    const totalSupply = await smsV2.totalSupply();
    const ownerBalance = await smsV2.balanceOf(owner.address);
    const userBalance = await smsV2.balanceOf(user.address);
    expect(totalSupply).equal(TOTAL_SUPPLY);
    expect(ownerBalance).equal(TOTAL_SUPPLY);
    expect(userBalance).equal(0);

    // Transfering
    await smsV2.transfer(user.address, APPROVAL_AMOUNT);

    // Validating
    const updatedTotalSupply = await smsV2.totalSupply();
    const updatedOwnerBalance = await smsV2.balanceOf(owner.address);
    const updatedUserBalance = await smsV2.balanceOf(user.address);
    expect(updatedTotalSupply).equal(TOTAL_SUPPLY);
    expect(updatedOwnerBalance).equal(TOTAL_SUPPLY - APPROVAL_AMOUNT);
    expect(updatedUserBalance).equal(APPROVAL_AMOUNT);
  });

  it("Mint & Burn Validation", async function () {
    const totalSupply = await smsV2.totalSupply();
    const ownerBalance = await smsV2.balanceOf(owner.address);
    expect(totalSupply).equal(TOTAL_SUPPLY);
    expect(ownerBalance).equal(TOTAL_SUPPLY);

    // Burning Tokens
    await smsV2.burn(owner.address, TOTAL_SUPPLY);

    // Burn Validation
    const updatedTotalSupply = await smsV2.totalSupply();
    const updatedOwnerBalance = await smsV2.balanceOf(owner.address);
    expect(updatedTotalSupply).equal(0);
    expect(updatedOwnerBalance).equal(0);

    // Minting Tokens
    await smsV2.mint(owner.address, TOTAL_SUPPLY);

    // Minting Validation
    const updatedMintTotalSupply = await smsV2.totalSupply();
    const updatedMintOwnerBalance = await smsV2.balanceOf(owner.address);
    expect(updatedMintTotalSupply).equal(TOTAL_SUPPLY);
    expect(updatedMintOwnerBalance).equal(TOTAL_SUPPLY);

    // Checking Anyone can mint or burn

    const userBalance = await smsV2.balanceOf(user.address);
    expect(userBalance).equal(0);

    // Mint By User
    await smsV2.mint(user.address, TOTAL_SUPPLY);

    // Validating Mint by user
    const userMintBalance = await smsV2.balanceOf(user.address);
    expect(userMintBalance).equal(TOTAL_SUPPLY);
    const updatedMintedTotalSupply = await smsV2.totalSupply();
    expect(updatedMintedTotalSupply).equal(TOTAL_SUPPLY + TOTAL_SUPPLY);

    // Burn By User
    await smsV2.burn(user.address, APPROVAL_AMOUNT);

    // Validating Mint by user
    const userBurnBalance = await smsV2.balanceOf(user.address);
    expect(userBurnBalance).equal(TOTAL_SUPPLY - APPROVAL_AMOUNT);
    const updatedBurnedTotalSupply = await smsV2.totalSupply();
    expect(updatedBurnedTotalSupply).equal(
      TOTAL_SUPPLY + TOTAL_SUPPLY - APPROVAL_AMOUNT
    );
  });
});
