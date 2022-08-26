const connect = require("react-redux").connect;
const actions = require("../../../../ui/app/actions");
const React = require("react");
const CopyButton = require("../../components/copy/copy-button");
const { toChecksumAddress } = require("../../util");
const vreme = new (require("vreme"))();
import moment from "moment";
const hexToBn = require("../../../../app/scripts/lib/hex-to-bn");
const EthBalanceComponent = require("../eth-balance-cnf-tx");
const { pick, view } = require("ramda");
import ExpandedTransactionDetails from "./expandedTransaction-details";
import {
  XDC_TESTNET_CODE,
  XDC_CODE
} from "../../../../app/scripts/controllers/network/enums";
class TransactionDetails extends React.Component {
  render() {
    function shorten(b, amountL = 10, /*amountR = 4,*/ stars = 3) {
      return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
        b.length - 4,
        b.length
      )}`;
    }

    var props = this.props;
    const contactList = props.metamask.addressBook;
    const viewTrans = props.viewTransaction;
    const {
      network,
      conversionRate,
      currentCurrency,
      networkList,
      transactions,
      frequentRpcList
    } = props;

    const isTestnet =
      parseInt(network) === XDC_TESTNET_CODE || parseInt(network) === XDC_CODE;

    var selected = props.address || Object.keys(props.accounts)[0];
    var checksumAddress = selected && toChecksumAddress(network, selected);

    const rpcList = frequentRpcList;
    var fromAdd;
    var toAdd;
    var value;
    var gas;
    var gasPrice;
    var submitTime;
    var submitDate;
    var createdTime;
    var createdDate;
    {
      const transactionList = transactions.sort((a, b) => a.time - b.time);
      var detailsOf;

      transactionList.filter(txObj => {
        if (txObj.id === viewTrans) {
          detailsOf = txObj;
        }
      });
      if (typeof detailsOf.submittedTime == "undefined") {
        submitTime = formatTime(detailsOf.submittedTime);
        submitDate = formatDate(detailsOf.submittedTime);
      } else {
        submitTime = formatTime(detailsOf.submittedTime);
        submitDate = formatDate(detailsOf.submittedTime);
      }

      if (detailsOf.txParams.to == null) {
        toAdd = detailsOf.txReceipt.contractAddress;
      } else {
        toAdd = detailsOf.txParams.to;
      }
      fromAdd = detailsOf.txParams.from;
      value = detailsOf.txParams.value;
      gas = detailsOf.txParams.gas;
      gasPrice = detailsOf.txParams.gasPrice;
      createdTime = formatTime(detailsOf.time);
      createdDate = formatDate(detailsOf.time);
    }

    var symbol = "XDC";
    rpcList.filter(netObj => {
      console.log(symbol, rpcList, netObj, "symbol>>");
      if (netObj.chainId === network) {
        symbol = netObj.currencySymbol;
      }
    });

    function formatDate(date) {
      return moment(new Date(date)).format("DD/MM/YYYY");
    }
    function formatTime(date) {
      return moment(new Date(date)).format("HH:mm");
    }

    //value calculated
    value = parseInt(value, 16);
    value = value / Math.pow(10, 18);

    //gas Calculated
    gas = parseInt(gas, 16);

    //gasPrice calculated
    gasPrice = parseInt(gasPrice, 16);
    gasPrice = gasPrice / Math.pow(10, 9);
    const TransactionComponent = () => {
      return (
        <div
          className="flex-column flex-grow settingsCollapsed"
          style={{
            // maxHeight: "585px",
            overflowY: "auto"
          }}
        >
          <div style={{ paddingBottom: "17px" }}>
            <div
              className="section-title flex-row"
              style={{ justifyContent: "space-between", width: "75%" }}
            >
              <div>
                {" "}
                <img
                  src="/images/Assets/BackArrow.svg"
                  style={{
                    marginLeft: "17px",
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    props.dispatch(actions.goHome());
                  }}
                />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "Inter-Medium",
                    margin: "0 0 0 40px",
                    fontSize: "14px",
                    color: "#1F1F1F"
                  }}
                >
                  Sent
                </div>

                <div
                  className="trasaction-details-from-to"
                  style={{ display: "flex", margin: " 0px 2px 0px 0px" }}
                >
                  {" "}
                  {shorten(checksumAddress)}
                  <CopyButton value={checksumAddress} isWhite={true} />
                </div>
              </div>
            </div>
          </div>

          <div className="details">Details</div>

          {/* flexbox */}
          <div className="flexbox" style={{ backgroundColor: "#FAFAFA" }}>
            <div className="trasaction-details-from-to">From</div>
            <div className="trasaction-details-from-to-accounts">
              {isTestnet
                ? shorten(fromAdd.replace("0x", "xdc"))
                : shorten(fromAdd)}
            </div>
            <img src="/images/Assets/DownArrow.svg" />
            <div className="trasaction-details-from-to">To</div>
            <div className="trasaction-details-from-to-accounts">
              {isTestnet ? shorten(toAdd.replace("0x", "xdc")) : shorten(toAdd)}
            </div>
          </div>

          {/* all trasaction details  */}
          <div className="trasaction-details-amount">
            <div>Amount</div>
            <div style={{ marginRight: "6px", marginLeft: "auto" }}>
              {value}
            </div>
            <h1 style={{ color: "#848484" }}>{symbol}</h1>
          </div>

          <div className="trasaction-details-amount">
            <div>Gas Limit</div>
            <div style={{ marginRight: "0px", marginLeft: "auto" }}>{gas}</div>
          </div>

          <div className="trasaction-details-amount">
            <div>Gas Price (GWEI)</div>
            <div style={{ marginRight: "6px", marginLeft: "auto" }}>
              {gasPrice}
            </div>
          </div>

          <div className="trasaction-details-amount">
            <div>Total</div>
            <div style={{ marginRight: "6px", marginLeft: "auto" }}>
              {value}
            </div>
            <h1 style={{ color: "#848484" }}>{symbol}</h1>
          </div>

          {/* Transaction-log */}

          <h2 className="transaction-log-heading">Transaction Log</h2>

          <div className="transaction-log-main">
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <img
                  style={{ marginRight: "10px" }}
                  src="/images/Assets/TransactionCreated.svg"
                />
                <div className="transaction-border"></div>
              </div>
              <div>
                {" "}
                Transaction created with a value of {value} {symbol} at{" "}
                {createdTime} on {createdDate}.
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <img
                  style={{ marginRight: "10px" }}
                  src="/images/Assets/TransactionSubmitted.svg"
                />
                <div className="transaction-border"></div>
              </div>
              <div>
                Trasaction submitted with estimated gas fee of 1.00 GWEI at{" "}
                {submitTime} on {submitDate}.
              </div>
            </div>

            <div style={{ display: "flex" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <img
                  style={{ marginRight: "10px" }}
                  src="/images/Assets/TransactionComplete.svg"
                />
              </div>
              <div>
                {" "}
                Trasaction confirmed at {submitTime} on {submitDate}.{" "}
              </div>
            </div>
          </div>
        </div>
      );
    };
    return (
      <div style={{ width: "100%" }}>
        <TransactionComponent />
        <ExpandedTransactionDetails />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    metamask: state.metamask,
    warning: state.appState.warning,
    txId: state.appState.txId,
    address: state.metamask.selectedAddress,
    network: state.metamask.network,
    transactions: state.metamask.selectedAddressTxList || [],
    addressBook: state.metamask.addressBook || [],
    viewTransaction: state.appState.currentViewTransactionObj,
    frequentRpcList: state.metamask.frequentRpcList
  };
}

module.exports = connect(mapStateToProps)(TransactionDetails);
