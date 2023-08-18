const { run } = require("hardhat");
const contracts = require("../contracts.json");

async function main() {
    const jobs = [
        // run("verify:verify", {
        //     address: contracts.bToken
        // }),
        // run("verify:verify", {
        //     address: contracts.bFactory
        // }),
        // run("verify:verify", {
        //     address: contracts.buniSafeMath,
        //     contract: "contracts/utils/BuniSafeMath.sol:BuniSafeMath"
        // }),
        // run("verify:verify", {
        //     address: contracts.rightsManager
        // }),
        // run("verify:verify", {
        //     address: contracts.smartPoolManager
        // }),
        // run("verify:verify", {
        //     address: contracts.crpFactory
        // }),
        // run("verify:verify", {
        //     address: contracts.bActions
        // }),
        // run("verify:verify", {
        //     address: contracts.exchangeProxy,
        //     constructorArguments: ["0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd"]
        // }),
        // run("verify:verify", {
        //     address: contracts.kRegistry,
        //     constructorArguments: ["0xDC8E950d2669a9ad62446DDa00bDCf2017e39Fd3"]
        // }),
    ];

    await Promise.all(jobs.map((job) => job.catch(console.log)));
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
