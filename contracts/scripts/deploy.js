// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile 
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const USMToken = await hre.ethers.getContractFactory("USMToken");
  const usmToken = await USMToken.deploy(100000000000);

  await usmToken.deployed();

  console.log("USM Token deployed to:", usmToken.address);

  const USMA = await hre.ethers.getContractFactory("USMArtistToken");
  const usma = await USMA.deploy();

  await usma.deployed();

  console.log("USMA Token deployed to:", usma.address);

  const USMT = await hre.ethers.getContractFactory("USMTrackToken");
  const usmt = await USMT.deploy();

  await usmt.deployed();

  console.log("USMT Token deployed to:", usmt.address);




}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
