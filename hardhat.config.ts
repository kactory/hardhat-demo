import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    Ganache: {
      url: process.env.PROVIDER_URL,
      accounts: [
        `0x${process.env.PRIVATE_KEY}`,
        '0x06d7df9b348cfabd148aff015dcac5b9f7466a1b8d38e17096ae297b027cc367',
        '0x9f9608dc948258f5d75ee066808096ba04167bc270beb3ed711f07be489746c7'
      ],
    },  
  },
};

export default config;
