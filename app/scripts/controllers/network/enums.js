const ethNetProps = require("../../../../xdc-net-props");
const POA = "poa";
const DAI = "dai";
const POA_SOKOL = "sokol";
const MAINNET = "mainnet";
const ROPSTEN = "ropsten";
const RINKEBY = "rinkeby";
const KOVAN = "kovan";
const GOERLI_TESTNET = "goerli_testnet";
const CLASSIC = "classic";
const XDC = "xdc";
const XDC_TESTNET = "xdc_testnet";
const XDC_DEVNET = "xdc_devnet";
const LOCALHOST = "localhost";

const POA_CODE = 99;
const DAI_CODE = 100;
const POA_SOKOL_CODE = 77;
const MAINNET_CODE = 1;
const ROPSTEN_CODE = 3;
const RINKEBY_CODE = 4;
const KOVAN_CODE = 42;
const GOERLI_TESTNET_CODE = 5;
const CLASSIC_CODE = 61;
const XDC_CODE = 50;
const XDC_TESTNET_CODE = 51;
const XDC_DEVNET_CODE = 551;

const POA_DISPLAY_NAME = "POA Core";
const DAI_DISPLAY_NAME = "xDai Chain";
const POA_SOKOL_DISPLAY_NAME = "Sokol";
const MAINNET_DISPLAY_NAME = "Main Ethereum Network";
const ROPSTEN_DISPLAY_NAME = "Ropsten";
const RINKEBY_DISPLAY_NAME = "Rinkeby";
const KOVAN_DISPLAY_NAME = "Kovan";
const GOERLI_TESTNET_DISPLAY_NAME = "Görli Testnet";
const CLASSIC_DISPLAY_NAME = "Ethereum Classic";
const XDC_DISPLAY_NAME = "XDC Mainnet";
const XDC_TESTNET_DISPLAY_NAME = "XDC Apothem Testnet";
const XDC_DEVNET_DISPLAY_NAME = "XDC Devnet";

const DROPDOWN_POA_DISPLAY_NAME = POA_DISPLAY_NAME;
const DROPDOWN_DAI_DISPLAY_NAME = DAI_DISPLAY_NAME;
const DROPDOWN_POA_SOKOL_DISPLAY_NAME = "Sokol Network";
const DROPDOWN_MAINNET_DISPLAY_NAME = "Main Network";
const DROPDOWN_ROPSTEN_DISPLAY_NAME = "Ropsten Test Net";
const DROPDOWN_RINKEBY_DISPLAY_NAME = "Rinkeby Test Net";
const DROPDOWN_KOVAN_DISPLAY_NAME = "Kovan Test Net";
const DROPDOWN_GOERLI_TESTNET_DISPLAY_NAME = "Görli Test Net";
const DROPDOWN_CLASSIC_DISPLAY_NAME = "Ethereum Classic";
const DROPDOWN_XDC_DISPLAY_NAME = "XDC Mainnet";
const DROPDOWN_XDC_TESTNET_DISPLAY_NAME = "XDC Apothem Testnet";
const DROPDOWN_XDC_DEVNET_DISPLAY_NAME = "XDC Devnet";

/* RPC Endpoints */
// const XDC_RPC_ENDPOINT = 'https://rpc.xinfin.network'
// const XDC_TESTNET_RPC_ENDPOINT = 'https://rpc.apothem.network'
const XDC_RPC_ENDPOINT = "https://xdcpayrpc.blocksscan.io/";
const XDC_TESTNET_RPC_ENDPOINT = "https://apothemxdcpayrpc.blocksscan.io/";
const XDC_DEVNET_RPC_ENDPOINT = "https://devnetrpc.apothem.network";

/* Block Explorer URLs */
const XDC_BLOCK_EXPLORER_URL = "https://observer.xdc.org";
// const XDC_BLOCK_EXPLORER_URL = 'https://explorer.xdc.network'
const XDC_TESTNET_BLOCK_EXPLORER_URL = "https://explorer.apothem.network";
const XDC_DEVNET_BLOCK_EXPLORER_URL = "https://explorer.devnet.network";

const chainTypes = {
  TEST: 1,
  PROD: 2,
  TEST1: 3,
};
const permanentNetworks = [
  {
    name: XDC_DISPLAY_NAME,
    rpcURL: XDC_RPC_ENDPOINT,
    chainId: XDC_CODE,
    currencySymbol: "XDC",
    blockExplorer: XDC_BLOCK_EXPLORER_URL,
    providerType: XDC,
    isPermanent: true,
    colorCode: "#2049B9",
  },
  {
    name: XDC_TESTNET_DISPLAY_NAME,
    rpcURL: XDC_TESTNET_RPC_ENDPOINT,
    chainId: XDC_TESTNET_CODE,
    currencySymbol: "XDC",
    blockExplorer: XDC_TESTNET_BLOCK_EXPLORER_URL,
    providerType: XDC_TESTNET,
    isPermanent: true,
    colorCode: "#2049B9",
  },
  {
    name: XDC_DEVNET_DISPLAY_NAME,
    rpcURL: XDC_DEVNET_RPC_ENDPOINT,
    chainId: XDC_DEVNET_CODE,
    currencySymbol: "XDC",
    blockExplorer: XDC_DEVNET_BLOCK_EXPLORER_URL,
    providerType: XDC_DEVNET,
    isPermanent: true,
    colorCode: "#2049B9",
  },
  {
    name: "Localhost 8545",
    rpcURL: "https://localhost:8545",
    chainId: "",
    currencySymbol: "",
    blockExplorer: "",
    providerType: LOCALHOST,
    isPermanent: false,
    colorCode: "#0CB0BE",
  },
];

module.exports = {
  POA,
  DAI,
  POA_SOKOL,
  MAINNET,
  ROPSTEN,
  RINKEBY,
  KOVAN,
  GOERLI_TESTNET,
  CLASSIC,
  XDC,
  XDC_TESTNET,
  XDC_DEVNET,
  LOCALHOST,
  POA_CODE,
  DAI_CODE,
  POA_SOKOL_CODE,
  MAINNET_CODE,
  ROPSTEN_CODE,
  RINKEBY_CODE,
  KOVAN_CODE,
  GOERLI_TESTNET_CODE,
  CLASSIC_CODE,
  XDC_CODE,
  XDC_TESTNET_CODE,
  XDC_DEVNET_CODE,
  POA_DISPLAY_NAME,
  DAI_DISPLAY_NAME,
  POA_SOKOL_DISPLAY_NAME,
  MAINNET_DISPLAY_NAME,
  ROPSTEN_DISPLAY_NAME,
  RINKEBY_DISPLAY_NAME,
  KOVAN_DISPLAY_NAME,
  GOERLI_TESTNET_DISPLAY_NAME,
  CLASSIC_DISPLAY_NAME,
  XDC_DISPLAY_NAME,
  XDC_TESTNET_DISPLAY_NAME,
  XDC_DEVNET_DISPLAY_NAME,
  DROPDOWN_POA_DISPLAY_NAME,
  DROPDOWN_DAI_DISPLAY_NAME,
  DROPDOWN_POA_SOKOL_DISPLAY_NAME,
  DROPDOWN_MAINNET_DISPLAY_NAME,
  DROPDOWN_ROPSTEN_DISPLAY_NAME,
  DROPDOWN_RINKEBY_DISPLAY_NAME,
  DROPDOWN_KOVAN_DISPLAY_NAME,
  DROPDOWN_GOERLI_TESTNET_DISPLAY_NAME,
  DROPDOWN_CLASSIC_DISPLAY_NAME,
  DROPDOWN_XDC_DISPLAY_NAME,
  DROPDOWN_XDC_TESTNET_DISPLAY_NAME,
  DROPDOWN_XDC_DEVNET_DISPLAY_NAME,
  chainTypes,
  permanentNetworks,
  XDC_RPC_ENDPOINT,
  XDC_TESTNET_RPC_ENDPOINT,
  XDC_DEVNET_RPC_ENDPOINT,
};
