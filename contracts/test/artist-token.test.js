const { expect } = require("chai");


const testURI= "http://ipfs.io/ipfs/test"

describe("USM Artiest Token", function() {
  it("should create a token", async function() {
    const USMA = await ethers.getContractFactory("USMArtistToken");
    const usma = await USMA.deploy();
    await usma.deployed();

    await usma.createArtist(testURI)
    const tokenURI = await usma.tokenURI(1)
    expect(tokenURI).to.equal(testURI)
  });
});