const hre = require("hardhat");

async function main() {
  const RealKittyNFTContract = await hre.ethers.getContractFactory("RealKittyNFT");
  const nftDeployed = await RealKittyNFTContract.deploy();

  await nftDeployed.deployed();

  console.log("RealKittyNFT deployed to:", nftDeployed.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
