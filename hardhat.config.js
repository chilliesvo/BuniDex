// Loading env configs for deploying and public contract source
require("dotenv").config();

// Solidity compile
require("solidity-coverage");

require("hardhat-contract-sizer");

// Using hardhat-ethers plugin for deploying
// See here: https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html
//           https://hardhat.org/guides/deploying.html
require("@nomiclabs/hardhat-ethers");

// Testing plugins with Waffle
// See here: https://hardhat.org/guides/waffle-testing.html
require("@nomiclabs/hardhat-waffle");

// This plugin runs solhint on the project's sources and prints the report
// See here: https://hardhat.org/plugins/nomiclabs-hardhat-solhint.html
require("@nomiclabs/hardhat-solhint");

// Verify and public source code on etherscan
require("@nomiclabs/hardhat-etherscan");

// Report gas
require("hardhat-gas-reporter");

// This plugin adds ways to ignore Solidity warnings
require("hardhat-ignore-warnings");

const config = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            accounts: { count: 100 },
            allowUnlimitedContractSize: false,
            blockGasLimit: 500e9,
        },
        binance_testnet: {
            url: process.env.BSCT_RPC,
            accounts: [process.env.SYSTEM_PRIVATE_KEY],
        },
    },
    etherscan: {
        apiKey: {
            bsc: process.env.BSC_API_KEY,
        },
    },
    solidity: {
        compilers: [
            {
                version: "0.6.12",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
            {
                version: "0.5.12",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
        ],
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts",
        deploy: "deploy",
        deployments: "deployments",
    },
    contractSizer: {
        alphaSort: true,
        disambiguatePaths: false,
        runOnCompile: false,
        strict: true,
    },
    mocha: {
        timeout: 200000,
        useColors: true,
        reporter: "mocha-multi-reporters",
        reporterOptions: {
            configFile: "./mocha-report.json",
        },
    },
    gasReporter: {
        enabled: true,
        currency: "USD",
        token: "BNB",
        gasPrice: 30,
    },
    exposed: { prefix: "$" },
};

module.exports = config;
