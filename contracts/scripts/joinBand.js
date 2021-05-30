
const hre = require("hardhat");

const deployedAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"

async function main() {


  try {
    const UltraSoundMusic = await hre.ethers.getContractFactory("UltraSoundMusic");
    const contract = await UltraSoundMusic.attach(deployedAddress);
  
  // Now you can call functions of the contract
    await contract.joinBand(5, 104);
    
    
  } catch (error) {
    console.log(error)
  }

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});