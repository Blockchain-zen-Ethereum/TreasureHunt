import { ThunderCoreTestnet } from "@usedapp/core";

type AddressMap = {
  MOCK_PRICE_TOKEN: string;
  MOCK_USDT_TOKEN: string;
  TREASURY: string;
  STAKING_POLL: string;
  TREASURY_HUNT: string;
};

const ADDRESSES: { [key: number]: AddressMap } = {
  [ThunderCoreTestnet.chainId]: {
    MOCK_PRICE_TOKEN: "0xD677C0EBcC2bD275b630e93534a80AF3a914593C",
    MOCK_USDT_TOKEN: "0xc77cD0a29f1D02DB61535EcE3e981aA435755c62",
    TREASURY: "0x83303D8c1F21738f72397bE70102b501FC688441",
    STAKING_POLL: "0x83303D8c1F21738f72397bE70102b501FC688441",
    TREASURY_HUNT: "0x986bdf5fC44b5824E05d2144e01d692133A0BFdF",
  },
};

export default ADDRESSES;
