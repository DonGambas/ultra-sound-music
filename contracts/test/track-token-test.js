const { expect } = require("chai");


const testURI= "http://ipfs.io/ipfs/test"

describe("USM Artiest Token", function() {
  it("should create a token", async function() {
    const USMT= await ethers.getContractFactory("USMTrackToken");
    const usmt = await USMT.deploy();
    await usmt.deployed();

    await usmt.createTrack(testURI)
    const tokenURI = await usmt.tokenURI(1)
    expect(tokenURI).to.equal(testURI)
  });
});