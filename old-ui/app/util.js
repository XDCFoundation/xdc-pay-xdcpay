const ethUtil = require("ethereumjs-util");
const ethNetProps = require("xdc-net-props");
const {
  XDC_CODE,
  XDC_TESTNET_CODE,
  XDC_DEVNET_CODE,
} = require("../../app/scripts/controllers/network/enums");
const {
  conversionRateSelector,
} = require("../../ui/app/selectors/confirm-transaction");

var valueTable = {
  wei: "1000000000000000000",
  kwei: "1000000000000000",
  mwei: "1000000000000",
  gwei: "1000000000",
  szabo: "1000000",
  finney: "1000",
  ether: "1",
  kether: "0.001",
  mether: "0.000001",
  gether: "0.000000001",
  tether: "0.000000000001",
};
var bnTable = {};
for (var currency in valueTable) {
  bnTable[currency] = new ethUtil.BN(valueTable[currency], 10);
}

module.exports = {
  valuesFor,
  addressSummary,
  nameSummary,
  accountSummary,
  isAllOneCase,
  isValidAddress,
  isValidENSAddress,
  numericBalance,
  parseBalance,
  formatBalance,
  generateBalanceObject,
  dataSize,
  readableDate,
  normalizeToWei,
  normalizeEthStringToWei,
  normalizeNumberToWei,
  valueTable,
  bnTable,
  isHex,
  exportAsFile,
  isInvalidChecksumAddress,
  countSignificantDecimals,
  getCurrentKeyring,
  ifLooseAcc,
  ifContractAcc,
  ifHardwareAcc,
  getAllKeyRingsAccounts,
  ifXDC,
  toChecksumAddress,
  isValidChecksumAddress,
  conversation,
  ascii_to_hex,
};

function valuesFor(obj) {
  if (!obj) return [];
  return Object.keys(obj).map(function (key) {
    return obj[key];
  });
}

function addressSummary(
  network,
  address,
  firstSegLength = 7,
  lastSegLength = 4,
  includeHex = true
) {
  if (!address) return "";
  let checked = toChecksumAddress(network, address);
  if (!includeHex) {
    checked = ethUtil.stripHexPrefix(checked);
  }
  return checked
    ? checked.slice(0, firstSegLength) +
        "..." +
        checked.slice(checked.length - lastSegLength)
    : " ";
}
function nameSummary(name, firstSegLength = 15) {
  return name.length > firstSegLength
    ? name.slice(0, firstSegLength) + "..."
    : name;
}
function conversation(result) {
  var res = JSON.parse(result);
  let i = 0;
  if (Object.keys(res.xdc.accounts).length > 0) {
    Object.keys(res.xdc.accounts).forEach((key) => {
      let val = res.xdc.accounts[key];
      delete res.xdc.accounts[key];
      val.address = val.address.replace("0x", "xdc");
      res.xdc.accounts[key.replace("0x", "xdc")] = val;
    });
  }
  if (Object.keys(res.xdc.identities).length > 0) {
    Object.keys(res.xdc.identities).forEach((key) => {
      let val = res.xdc.identities[key];
      delete res.xdc.identities[key];
      val.address = val.address.replace("0x", "xdc");
      res.xdc.identities[key.replace("0x", "xdc")] = val;
    });
  }
  i = 0;
  // if(res.xdc.keyrings.length>1){
  res.xdc.keyrings.forEach((key) => {
    let arr = [];
    key.accounts.forEach((k) => {
      arr[i] = k.replace("0x", "xdc");
      i++;
    });
    key.accounts = arr;
    res.xdc.keyrings[key] = key;
  });
  // }
  i = 0;
  if (Object.keys(res.xdc.accountTokens).length > 0) {
    Object.keys(res.xdc.accountTokens).forEach((key) => {
      let val = res.xdc.accountTokens[key];
      delete res.xdc.accountTokens[key];
      if (Object.keys(val).length > 0) {
        Object.keys(val).forEach((k) => {
          let valu = [];
          let va = val[k];
          if (va.length > 1) {
            va.forEach((k1) => {
              k1.address = k1.address.replace("0x", "xdc");
              valu[i] = k1;
              i++;
            });
            i = 0;
          }
          val[k] = valu;
        });
      }
      res.xdc.accountTokens[key.replace("0x", "xdc")] = val;
    });
  }
  i = 0;
  if (Object.keys(res.xdc.cachedBalances).length > 0) {
    Object.keys(res.xdc.cachedBalances).forEach((key) => {
      let val = res.xdc.cachedBalances[key];
      delete res.xdc.cachedBalances[key];
      if (Object.keys(val).length > 0) {
        Object.keys(val).forEach((k) => {
          let value = val[k];
          delete val[k];
          val[k.replace("0x", "xdc")] = value;
        });
      }
      res.xdc.cachedBalances[key] = val;
    });
  }
  if (res.xdc.selectedAddress !== null) {
    res.xdc.selectedAddress = res.xdc.selectedAddress.replace("0x", "xdc");
  }
  i = 0;
  res.xdc.tokens.forEach((key) => {
    res.xdc.tokens[i].address = key.address.replace("0x", "xdc");
    i++;
  });
  if (Object.keys(res.xdc.unapprovedTxs).length > 0) {
    Object.keys(res.xdc.unapprovedTxs).forEach((key) => {
      res.xdc.unapprovedTxs[key].history[0].txParams.from =
        res.xdc.unapprovedTxs[key].history[0].txParams.from.replace(
          "0x",
          "xdc"
        );
      res.xdc.unapprovedTxs[key].history[0].txParams.to = res.xdc.unapprovedTxs[
        key
      ].history[0].txParams.to.replace("0x", "xdc");
      res.xdc.unapprovedTxs[key].origin = "xdc";
      res.xdc.unapprovedTxs[key].txParams.from = res.xdc.unapprovedTxs[
        key
      ].txParams.from.replace("0x", "xdc");
      res.xdc.unapprovedTxs[key].txParams.to = res.xdc.unapprovedTxs[
        key
      ].txParams.to.replace("0x", "xdc");
    });
  }
  if (Object.keys(res.xdc.assetImages).length > 0) {
    Object.keys(res.xdc.assetImages).forEach((key) => {
      let val = res.xdc.assetImages[key];
      delete res.xdc.assetImages[key];
      res.xdc.assetImages[key.replace("0x", "xdc")] = val;
    });
  }
  var tnx = [];
  tnx = res.xdc.selectedAddressTxList;
  i = 0;
  if (tnx.length > 0) {
    tnx.forEach((element) => {
      res.xdc.selectedAddressTxList[i].origin = "xdc";
      res.xdc.selectedAddressTxList[i].txParams.from =
        element.txParams.from.replace("0x", "xdc");
      res.xdc.selectedAddressTxList[i].txParams.to =
        element.txParams.to.replace("0x", "xdc");
      if (typeof res.xdc.selectedAddressTxList[i].txReceipt != "undefined") {
        res.xdc.selectedAddressTxList[i].txReceipt.from =
          element.txReceipt.from.replace("0x", "xdc");
        res.xdc.selectedAddressTxList[i].txReceipt.to =
          element.txReceipt.to.replace("0x", "xdc");
      }
      i++;
    });
  }
  return JSON.stringify(res, null, 2);
}
function accountSummary(acc, firstSegLength = 6, lastSegLength = 4) {
  if (!acc) return "";
  if (acc.length < 12) return acc;
  let posOfLastPart = acc.length - lastSegLength;
  if (posOfLastPart < firstSegLength + 1)
    posOfLastPart += firstSegLength + 1 - posOfLastPart;
  return acc.slice(0, firstSegLength) + "..." + acc.slice(posOfLastPart);
}

function isValidAddress(address, network) {
  var prefixed = ethUtil.addHexPrefix(address);
  if (ifXDC(network)) {
    if (address === "0x0000000000000000000000000000000000000000") return false;
    return ethUtil.isValidAddress(prefixed);
  } else {
    if (address === "0x0000000000000000000000000000000000000000") return false;
    return (
      (isAllOneCase(prefixed) && ethUtil.isValidAddress(prefixed)) ||
      ethUtil.isValidChecksumAddress(prefixed)
    );
  }
}

function isValidENSAddress(address) {
  return address.match(/^.{7,}\.(eth|test)$/);
}

function isInvalidChecksumAddress(address, network) {
  var prefixed = ethUtil.addHexPrefix(address);
  if (address === "0x0000000000000000000000000000000000000000") return false;
  return !isAllOneCase(prefixed) && !isValidChecksumAddress(network, prefixed);
}

function isAllOneCase(address) {
  if (!address) return true;
  var lower = address.toLowerCase();
  var upper = address.toUpperCase();
  return address === lower || address === upper;
}

// Takes wei Hex, returns wei BN, even if input is null
function numericBalance(balance) {
  if (!balance) return new ethUtil.BN(0, 16);
  var stripped = ethUtil.stripHexPrefix(balance);
  return new ethUtil.BN(stripped, 16);
}

// Takes  hex, returns [beforeDecimal, afterDecimal]
function parseBalance(balance) {
  var beforeDecimal, afterDecimal;
  const wei = numericBalance(balance);
  var weiString = wei.toString();
  const trailingZeros = /0+$/;

  beforeDecimal =
    weiString.length > 18 ? weiString.slice(0, weiString.length - 18) : "0";
  afterDecimal = ("000000000000000000" + wei)
    .slice(-18)
    .replace(trailingZeros, "");
  if (afterDecimal === "") {
    afterDecimal = "0";
  }
  return [beforeDecimal, afterDecimal];
}

// Takes wei hex, returns an object with three properties.
// Its "formatted" property is what we generally use to render values.
function formatBalance(
  balance,
  decimalsToKeep,
  needsParse = true,
  network,
  isToken,
  tokenSymbol,
  networkList
) {
  let coinName = ethNetProps.props.getNetworkCoinName(network);
  if (networkList && networkList.find((netObj) => netObj.chainId === network)) {
    coinName =
      networkList.find((netObj) => netObj.chainId === network).currencySymbol ||
      coinName;
  }
  const assetName = isToken ? tokenSymbol : coinName;
  var parsed = needsParse ? parseBalance(balance) : balance.split(".");
  var beforeDecimal = parsed[0];
  var afterDecimal = parsed[1];
  var formatted = "0";
  if (decimalsToKeep === undefined) {
    if (beforeDecimal === "0") {
      if (afterDecimal !== "0") {
        var sigFigs = afterDecimal.match(/^0*(.{2})/); // default: grabs 2 most significant digits
        if (sigFigs) {
          afterDecimal = sigFigs[0];
        }
        formatted = "0." + afterDecimal + ` ${assetName}`;
      }
    } else {
      formatted =
        beforeDecimal + "." + afterDecimal.slice(0, 3) + ` ${assetName}`;
    }
  } else {
    afterDecimal += Array(decimalsToKeep).join("0");
    formatted =
      beforeDecimal +
      "." +
      afterDecimal.slice(0, decimalsToKeep) +
      ` ${assetName}`;
  }
  return formatted;
}

function generateBalanceObject(formattedBalance, decimalsToKeep) {
  var balance = formattedBalance.split(" ")[0];
  var label = formattedBalance.split(" ")[1];
  var beforeDecimal = balance.split(".")[0];
  var afterDecimal = balance.split(".")[1];
  var shortBalance = shortenBalance(balance, decimalsToKeep);

  if (beforeDecimal === "0" && afterDecimal.substr(0, 5) === "00000") {
    // eslint-disable-next-line eqeqeq
    if (afterDecimal == 0) {
      balance = "0";
    }
    // else {
    //   balance = '<1.0e-5'
    // }
  } else if (beforeDecimal !== "0") {
    balance = `${beforeDecimal}.${afterDecimal.slice(0, decimalsToKeep)}`;
  }

  return { balance, label, shortBalance };
}

function shortenBalance(balance, decimalsToKeep) {
  var truncatedValue;

  var convertedBalance = parseFloat(balance);
  if (convertedBalance >= 1000000 && convertedBalance < 999999999) {
    truncatedValue = (parseFloat(balance) / 1000000).toFixed(decimalsToKeep);
    return `${truncatedValue}M`;
  } else if(convertedBalance>999 && convertedBalance<10000){
    return (parseFloat(balance)).toLocaleString('en-US', {valute: 'USD',minimumFractionDigits: decimalsToKeep});
  }
  else if (convertedBalance >= 10000 && convertedBalance < 999999) {
    truncatedValue = (parseFloat(balance) / 1000).toFixed(decimalsToKeep);
    return `${truncatedValue}K`;
  } else if (convertedBalance >= 1000000000 && convertedBalance < 9999999999) {
    truncatedValue = (parseFloat(balance) / 1000000000).toFixed(decimalsToKeep);
    return `${truncatedValue}B`;
  } else if (
    convertedBalance >= 1000000000000 &&
    convertedBalance < 9999999999999
  ) {
    truncatedValue = (parseFloat(balance) / 1000000000000).toFixed(
      decimalsToKeep
    );
    return `${truncatedValue}T`;
  } else if (convertedBalance === 0) {
    return "0";
  } else if (convertedBalance < 0.0001) {
    return "<"+convertedBalance.toFixed(decimalsToKeep).toString();
  } else if (convertedBalance < 1) {
    var stringBalance = convertedBalance.toString();
    if (stringBalance.split(".")[1].length > 9) {
      return convertedBalance.toFixed(9);
    } else {
      return stringBalance;
    }
  } else {
    return convertedBalance.toFixed(decimalsToKeep);
  }
}

function dataSize(data) {
  var size = data ? ethUtil.stripHexPrefix(data).length : 0;
  return size + " bytes";
}

// Takes a BN and an ethereum currency name,
// returns a BN in wei
function normalizeToWei(amount, currency) {
  try {
    return amount.mul(bnTable.wei).div(bnTable[currency]);
  } catch (e) {}
  return amount;
}

function normalizeEthStringToWei(str) {
  const parts = str.split(".");
  let eth = new ethUtil.BN(parts[0], 10).mul(bnTable.wei);
  if (parts[1]) {
    var decimal = parts[1];
    while (decimal.length < 18) {
      decimal += "0";
    }
    if (decimal.length > 18) {
      decimal = decimal.slice(0, 18);
    }
    const decimalBN = new ethUtil.BN(decimal, 10);
    eth = eth.add(decimalBN);
  }
  return eth;
}

var multiple = new ethUtil.BN("10000", 10);

function normalizeNumberToWei(n, currency) {
  var enlarged = n * 10000;
  var amount = new ethUtil.BN(String(enlarged), 10);
  return normalizeToWei(amount, currency).div(multiple);
}

function readableDate(ms) {
  var date = new Date(ms);
  var month = date.getMonth();
  var day = date.getDate();
  var year = date.getFullYear();
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();

  var dateStr = `${day}/${month}/${year}`;
  var time = `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
  return `${dateStr} ${time}`;
}

function isHex(str) {
  return Boolean(str.match(/^(0x)?[0-9a-fA-F]+$/));
}
function ascii_to_hex(str)
  {
	var arr1 = [];
	for (var n = 0, l = str.length; n < l; n ++) 
     {
		var hex = Number(str.charCodeAt(n)).toString(16);
		arr1.push(hex);
	 }
	return arr1.join('');
}

function exportAsFile(filename, data) {
  // source: https://stackoverflow.com/a/33542499 by Ludovic Feltz
  const blob = new Blob([data], { type: "text/csv" });
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(blob, filename);
  } else {
    const elem = window.document.createElement("a");
    elem.target = "_blank";
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
  }
}

/**
 * returns the length of truncated significant decimals for fiat value
 *
 * @param {float} val The float value to be truncated
 * @param {number} len The length of significant decimals
 *
 * returns {number} The length of truncated significant decimals
 **/
function countSignificantDecimals(val, len) {
  if (!val || Math.floor(val) === val) {
    return 0;
  }
  const decimals = val.toString().split(".")[1];
  const decimalsArr = decimals.split("");
  let decimalsLen = decimalsArr.slice(0).reduce((res, val, ind, arr) => {
    if (Number(val) === 0) {
      res += 1;
    } else {
      arr.splice(1); // break reduce function
    }
    return res;
  }, 0);
  decimalsLen += len;
  const valWithSignificantDecimals = `${Math.floor(val)}.${decimalsArr
    .slice(0, decimalsLen)
    .join("")}`;
  decimalsLen = parseFloat(valWithSignificantDecimals)
    .toString()
    .split(".")[1].length;
  return decimalsLen || 0;
}

/**
 * retrieves the current unlocked keyring
 *
 * @param {string} address The current unlocked address
 * @param {array} keyrings The array of keyrings
 * @param {array} identities The array of identities
 *
 * returns {object} keyring object corresponding to unlocked address
 **/
function getCurrentKeyring(address, network, keyrings, identities) {
  const identity = identities[address];
  const simpleAddress = identity && identity.address.substring(2).toLowerCase();
  const keyring =
    keyrings &&
    keyrings.find((kr) => {
      const isAddressIncluded =
        kr.accounts.includes(simpleAddress) || kr.accounts.includes(address);
      if (ifContractAcc(kr)) {
        return kr.network === network && isAddressIncluded;
      } else {
        return isAddressIncluded;
      }
    });

  return keyring;
}

/**
 * checks, if keyring is imported account
 *
 * @param {object} keyring
 *
 * returns {boolean} true, if keyring is importec and false, if it is not
 **/
function ifLooseAcc(keyring) {
  try {
    // Sometimes keyrings aren't loaded yet:
    const type = keyring.type;
    const isLoose = type !== "HD Key Tree";
    return isLoose;
  } catch (e) {
    return;
  }
}

/**
 * checks, if keyring is contract
 *
 * @param {object} keyring
 *
 * returns {boolean} true, if keyring is contract and false, if it is not
 **/
function ifContractAcc(keyring) {
  try {
    // Sometimes keyrings aren't loaded yet:
    const type = keyring.type;
    const isContract = type === "Simple Address";
    return isContract;
  } catch (e) {
    return;
  }
}

/**
 * checks, if keyring is of hardware type
 *
 * @param {object} keyring
 *
 * returns {boolean} true, if keyring is of hardware type and false, if it is not
 **/
function ifHardwareAcc(keyring) {
  if (keyring && keyring.type.search("Hardware") !== -1) {
    return true;
  }
  return false;
}

function getAllKeyRingsAccounts(keyrings, network) {
  const accountOrder = keyrings.reduce((list, keyring) => {
    if (ifContractAcc(keyring) && keyring.network === network) {
      list = list.concat(keyring.accounts);
    } else if (!ifContractAcc(keyring)) {
      list = list.concat(keyring.accounts);
    }
    return list;
  }, []);
  return accountOrder;
}

function ifXDC(network) {
  if (!network) return false;
  const numericNet = isNaN(network) ? network : parseInt(network);
  return (
    numericNet === XDC_CODE ||
    numericNet === XDC_TESTNET_CODE ||
    numericNet === XDC_DEVNET_CODE
  );
}

function toChecksumAddressXDC(address, chainId = null) {
  const zeroX = "xdc";
  const stripAddress = ethUtil.stripHexPrefix(address).toLowerCase();
  const prefix = chainId !== null ? chainId.toString() + zeroX : "";
  const keccakHash = ethUtil.sha3(prefix + stripAddress).toString("hex");
  let output = "xdc";

  for (let i = 0; i < stripAddress.length; i++) {
    output +=
      parseInt(keccakHash[i], 16) >= 8
        ? stripAddress[i].toUpperCase()
        : stripAddress[i];
  }
  return output.toLowerCase();
}

function toChecksumAddress(network, address, chainId = null) {
  if (ifXDC(network)) {
    return toChecksumAddressXDC(address, parseInt(network));
  } else {
    return ethUtil.toChecksumAddress(address, chainId);
  }
}

function isValidChecksumAddress(network, address) {
  return (
    isValidAddress(address, network) &&
    toChecksumAddress(network, address) === address
  );
}
