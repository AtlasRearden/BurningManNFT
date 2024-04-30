require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
const dotenv =require("dotenv");
 
const RPC_URL= 'https://sepolia.infura.io/v3/b6dcdcc1640f4d37868efc9632a10dd1';
const private_key='4cdc589c42957fed2e9931f1e140fd7bb88cd4bf2d2f7d695bb0febaface2c71';

dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {
    },
    sepolia: {
      url: RPC_URL,
      accounts: [private_key],
    },
  },
  solidity: {
    version:"0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  etherscan: {
    apiKey: 'F6DZ563GSJTFKW4XDBSB2USPI4J68VET2W',
  }
};


