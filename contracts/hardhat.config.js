require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${SEPOLIA_RPC_URL}`,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
};

require("@nomicfoundation/hardhat-toolbox");
