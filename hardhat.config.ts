import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      chainId: 5777,
    },
    Ganache: {
      url: process.env.PROVIDER_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      // accounts: [
      //   '0xd18631941e4a98e4a9f8684f63de7f57f2e73afc5350b432d243cd64de870045',
      //   '0x805297ec2868a818caf8d06b69a677cf680ee4ae8a7b6b9ef04f239fae4243a1',
      //   '0xc5b0b09ecd0aba5bc37368d9255d8d2bd6072aea6058ca8a477cadfabb371d05',
      //   '0x84f615a96fe23945e241ff03e81b2997c27eada29d48c5c60d051b917ec6e6e8',
      //   '0x9d5ae35fd7b1766fa92c233d97804bb1ab715130a51a00672fc5cbfaea53b866'
      // ],
    },  
  },
};

export default config;
