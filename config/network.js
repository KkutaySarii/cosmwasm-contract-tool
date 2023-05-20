export const mainnetConfig = {
  chainId: "juno-1",
  chainName: "Juno",
  addressPrefix: "juno",
  rpcUrl: "https://rpc-juno.mib.tech/",
  feeToken: "ujuno",
  stakingToken: "ujuno",
  coinMap: {
    ujuno: { denom: "JUNO", fractionalDigits: 6 },
  },
  gasPrice: 0.025,
  fees: {
    upload: 1500000,
    init: 500000,
    exec: 200000,
  },
};

export const uniTestnetConfig = {
  chainId: "uni-5",
  chainName: "Juno Uni Testnet",
  rpc: "https://rpc.uni.kingnodes.com/",
  rest: "https://api.uni.kingnodes.com/",
  stakeCurrency: {
    coinDenom: "JUNOX",
    coinMinimalDenom: "ujunox",
    coinDecimals: 6,
    coinGeckoId: "-",
  },
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "juno",
    bech32PrefixAccPub: "junopub",
    bech32PrefixValAddr: "junovaloper",
    bech32PrefixValPub: "junovaloperpub",
    bech32PrefixConsAddr: "junovalcons",
    bech32PrefixConsPub: "junovalconspub",
  },
  currencies: [
    {
      coinDenom: "JUNOX",
      coinMinimalDenom: "ujunox",
      coinDecimals: 6,
      coinGeckoId: "-",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "JUNOX",
      coinMinimalDenom: "ujunox",
      coinDecimals: 6,
      coinGeckoId: "-",
      gasPriceStep: {
        low: 0.025,
        average: 0.03,
        high: 0.04,
      },
    },
  ],
  coinType: 118,
  features: ["ibc-transfer", "cosmwasm", "ibc-go"],
};

export const junoConfig = {
  chainId: "uni-5",
  chainName: "Juno Testnet (junotestnet)",
  addressPrefix: "juno",
  rpcUrl: "https://rpc.uni.junonetwork.io",
  httpUrl: "https://api.uni.junonetwork.io",
  feeToken: "ujunox",
  stakingToken: "ujunox",
  coinMap: {
    ujunox: { denom: "JUNOX", fractionalDigits: 6 },
  },
  gasPrice: 0.04,
};

export const getConfig = (network) => {
  if (network === "mainnet") return mainnetConfig;
  return mainnetConfig;
};
