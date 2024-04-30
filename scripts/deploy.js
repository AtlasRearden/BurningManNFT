const hre = require("hardhat");

async function main() {
    // .address is depricated.
    const { ethers } = hre;

    // Get the account address to use as the initial owner.
    const accounts = await ethers.getSigners();
    const initialOwner = accounts[0].address;

    // Deploy the contract.
    const BurningMan = await ethers.getContractFactory('BurningMan');
    const burningMan = await BurningMan.deploy(initialOwner);

    // Wait for the deployment transaction to be mined.
    await burningMan.waitForDeployment();
    // Wait for address deployment as well.
    const burningManAddress = await burningMan.getAddress();

    console.log("Deployer address: ", accounts[0].address);
    console.log("BurningMan NFT deployed to: " , burningManAddress);
}

main()
    .then(()=> process.exit(0))
    .catch((error)=> {
        console.error(error);
        process.exit(1);
    });
