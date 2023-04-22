module.exports = {
  defaultNetwork: "thundercore_testnet",
  networks: {
    hardhat: {
    },
    thundercore_testnet: {
      url: "https://testnet-rpc.thundercore.com",
      accounts: []
    }
  },
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
}