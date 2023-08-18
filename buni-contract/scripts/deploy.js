const { ethers } = require("hardhat");
const { blockTimestamp, ZERO_ADDRESS } = require("../utils/utils");
require("dotenv").config();
const fs = require("fs");

async function main() {
    //* Get network */
    const network = await ethers.provider.getNetwork();
    const networkName = network.chainId === 31337 ? "hardhat" : network.name;
    const blockTimeNow = await blockTimestamp();

    //* Loading accounts */
    const accounts = await ethers.getSigners();
    const addresses = accounts.map((item) => item.address);
    const deployer = addresses[0];

    //* Loading contract factory */

    //* Deploy contracts */
    const underline = "=".repeat(93);
    console.log(underline);
    console.log("DEPLOYING CONTRACTS");
    console.log(underline);
    console.log("chainId   :>> ", network.chainId);
    console.log("chainName :>> ", networkName);
    console.log("deployer  :>> ", deployer);
    console.log(underline);

    const verifyArguments = {
        chainId: network.chainId,
        networkName,
        deployer,
    };

    // const BToken = await ethers.getContractFactory("BToken");
    // const bToken = await BToken.deploy();
    // verifyArguments.bToken = bToken.address;

    // const BFactory = await ethers.getContractFactory("BFactory");
    // const bFactory = await BFactory.deploy();
    // verifyArguments.bFactory = bFactory.address;

    //** libraries */
    // const BuniSafeMath = await ethers.getContractFactory("BuniSafeMath");
    // const buniSafeMath = await BuniSafeMath.deploy();
    // verifyArguments.buniSafeMath = buniSafeMath.address;

    // const RightsManager = await ethers.getContractFactory("RightsManager");
    // const rightsManager = await RightsManager.deploy();
    // verifyArguments.rightsManager = rightsManager.address;

    // const SmartPoolManager = await ethers.getContractFactory("SmartPoolManager");
    // const smartPoolManager = await SmartPoolManager.deploy();
    // verifyArguments.smartPoolManager = smartPoolManager.address;

    // const CRPFactory = await ethers.getContractFactory("CRPFactory", {
    //     libraries: {
    //         BuniSafeMath: buniSafeMath.address,
    //         RightsManager: rightsManager.address,
    //         SmartPoolManager: smartPoolManager.address,
    //     }
    // });
    // const crpFactory = await CRPFactory.deploy();
    // verifyArguments.crpFactory = crpFactory.address;

    // const BActions = await ethers.getContractFactory("BActions");
    // const bActions = await BActions.deploy();
    // verifyArguments.bActions = bActions.address;

    // const weth = "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd";
    // const ExchangeProxy = await ethers.getContractFactory("ExchangeProxy");
    // const exchangeProxy = await ExchangeProxy.deploy(weth);
    // verifyArguments.exchangeProxy = exchangeProxy.address;

    // const bFactoryDeployed = "0xDC8E950d2669a9ad62446DDa00bDCf2017e39Fd3";
    // const KRegistry = await ethers.getContractFactory("KRegistry");
    // const kRegistry = await KRegistry.deploy(bFactoryDeployed);
    // verifyArguments.kRegistry = kRegistry.address;

    console.log(underline);
    console.log("DONE");
    console.log(underline);

    const dir = `./deploy-history/${network.chainId}-${networkName}/`;
    const fileName = network.chainId === 31337 ? "hardhat" : blockTimeNow;
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    await fs.writeFileSync("contracts.json", JSON.stringify(verifyArguments));
    await fs.writeFileSync(`${dir}/${fileName}.json`, JSON.stringify(verifyArguments));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
