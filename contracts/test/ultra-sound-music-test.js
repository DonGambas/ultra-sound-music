const { expect } = require("chai");
const {BigNumber} = require("ethers")
const { waffle } = require("hardhat");
const provider = waffle.provider;



const testURI= "http://ipfs.io/ipfs/test"

describe("Ultra Sound Music", function() {
  it("should create a ultra sound music token", async function() {
    const UltraSoundMusic= await ethers.getContractFactory("UltraSoundMusic");
    const ultraSoundMusic = await UltraSoundMusic.deploy();
    await ultraSoundMusic.deployed();
   

    const {hash} = await ultraSoundMusic.createArtist(testURI)
    await provider.waitForTransaction(hash)
    const currentTokenId = await ultraSoundMusic.artistCount()
    const mintedUri = await ultraSoundMusic.uri(BigNumber.from(currentTokenId))


  });
});