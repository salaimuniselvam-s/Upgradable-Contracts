const { expect } = require("chai");
const { ethers } = require("hardhat");

let proxy;
let proxyAdmin;
let admin;
let user;

let smsV1;

describe("Proxy & Proxy Admin Contract", function () {
  beforeEach(async function () {
    [admin, user] = await ethers.getSigners();

    const Proxy = await ethers.getContractFactory("Proxy");
    proxy = await Proxy.deploy();
    await proxy.deployed();

    const ProxyAdmin = await hre.ethers.getContractFactory("ProxyAdmin");
    proxyAdmin = await ProxyAdmin.deploy();
    await proxyAdmin.deployed();

    const SmsV1 = await hre.ethers.getContractFactory("smsV1");
    smsV1 = await SmsV1.deploy("SMS", "sms");
    await smsV1.deployed();
  });

  // Test case

  async function settingProxyAdmin() {
    // setting proxy Contract admin to ProxyAdmin address
    await proxy.changeAdmin(proxyAdmin.address);
  }

  it("Proxy Admin Address Validation", async function () {
    settingProxyAdmin();

    let admin = await proxyAdmin.getProxyAdmin(proxy.address);
    expect(admin).equal(proxyAdmin.address);
  });

  it("Proxy Implementation Address Validation", async function () {
    settingProxyAdmin();

    let implementation = await proxyAdmin.getProxyImplementation(proxy.address);
    expect(implementation).equal(ethers.constants.AddressZero);
  });

  it("Change Proxy Admin", async function () {
    settingProxyAdmin();

    // Update Proxy Admin
    await proxyAdmin.changeProxyAdmin(proxy.address, user.address);
  });

  it("Update Implementation", async function () {
    settingProxyAdmin();

    await proxyAdmin.upgrade(proxy.address, smsV1.address);

    let implementation = await proxyAdmin.getProxyImplementation(proxy.address);
    expect(implementation).equal(smsV1.address);
  });
});
