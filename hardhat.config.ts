import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import fs from "fs";

const privateKey = fs.readFileSync(".secret", "utf8").toString();

const configuration: HardhatUserConfig = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: process.env.NET_URL,
      accounts: [privateKey]
    }
  },
  solidity: {
    version: "0.8.4"
  }
}

export default configuration;