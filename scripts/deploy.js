const { error } = require("console");
const hre = require("hardhat");

async function main(){
    const [deployer] = await ethers.getSigners(); // Lấy tài khoản triển khai mặc định

    console.log("Deploying contracts with the account:", deployer.address);
    const ChatApp = await hre.ethers.getContractFactory("ChatApp");
    const chatApp = await ChatApp.deploy();

    await chatApp.deployed();

    console.log(`Contract ${chatApp.address}`);
}

main().catch((error) => {
    console.error(error);
})
