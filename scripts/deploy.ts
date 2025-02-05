import { ethers } from "hardhat";

async function main() {
    const keykatFactory = await ethers.getContractFactory("KEYKAT");
    const keykat = await keykatFactory.deploy("KEYKAT", "KEY", 18);
    await keykat.waitForDeployment();
    console.log("Token deployed to:", keykat.target);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});