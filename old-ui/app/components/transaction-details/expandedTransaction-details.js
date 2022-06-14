const connect = require("react-redux").connect;
const actions = require("../../../../ui/app/actions");
const React = require("react");
const CopyButton = require("../../components/copy/copy-button");
const { toChecksumAddress } = require("../../util");
const vreme = new (require("vreme"))();
const hexToBn = require("../../../../app/scripts/lib/hex-to-bn");
const EthBalanceComponent = require("../eth-balance-cnf-tx");
const { pick, view } = require("ramda");
import moment from "moment";
import {
  XDC_TESTNET_CODE,
  XDC_CODE
} from "../../../../app/scripts/controllers/network/enums";
export default class ExpandedTransactionDetails extends React.Component {
  render() {
    function shorten(b, amountL = 7, /*amountR = 4,*/ stars = 3) {
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
      frequentRpcList
    } = props;
    var selected = props.address || Object.keys(props.accounts)[0];
    var checksumAddress = selected && toChecksumAddress(network, selected);
    const isTestnet =
      parseInt(network) === XDC_TESTNET_CODE || parseInt(network) === XDC_CODE;
    const { transactions } = this.props;
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
      // if (viewTrans === pickData) {
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
      // toAdd = detailsOf.txParams.to
      value = detailsOf.txParams.value;
      gas = detailsOf.txParams.gas;
      gasPrice = detailsOf.txParams.gasPrice;
      createdTime = formatTime(detailsOf.time);
      createdDate = formatDate(detailsOf.time);
    }
    if (typeof submitTime === "undefined") {
      submitTime = createdTime;
    }

    function formatDate(date) {
      return moment(new Date(date)).format("DD/MM/YYYY");
    }
    function formatTime(date) {
      return moment(new Date(date)).format("HH:mm");
    }

    var symbol = "XDC";
    rpcList.filter(netObj => {
      console.log(symbol, rpcList, netObj, "symbol>>");
      if (netObj.chainId === network) {
        symbol = netObj.currencySymbol;
      }
    });

    //value calculated
    value = parseInt(value, 16);
    value = value / Math.pow(10, 18);

    //gas Calculated
    gas = parseInt(gas, 16);

    //gasPrice calculated
    gasPrice = parseInt(gasPrice, 16);
    gasPrice = gasPrice / Math.pow(10, 9);

    return (
      <div
        className="flex-column flex-grow settingsExpanded"
        style={{
          // maxHeight: '585px',
          overflowY: "auto"
        }}
      >
        <div
          style={{
            width: "100%",
            borderBottom: "2px solid #EDEDED",
            display: "flex",
            height: "57px",
            justifyContent: "center"
          }}
        >
          <div
            style={{
              display: "flex",
              // justifyContent: "flex-start",
              width: "100%",
              alignItems: "center"
            }}
          >
            <div style={{ maxWidth: "100%", width: "36%" }}>
              {" "}
              <img
                src="/images/Assets/BackArrow.svg"
                style={{
                  marginLeft: "29px",
                  marginTop: "14",
                  cursor: "pointer"
                }}
                onClick={() => {
                  props.dispatch(actions.goHome());
                }}
              />
            </div>
            <div
              style={{
                display: "flex"
              }}
            >
              <div>
                {/* style={{ margin: '0 0 0 371px' }} */}
                <div
                  style={{
                    fontFamily: "Inter-Medium",
                    marginLeft: "142px",
                    fontSize: "14px",
                    color: "#1F1F1F"
                  }}
                >
                  Sent
                </div>

                <div
                  className="trasaction-details-from-to"
                  style={{ display: "flex" }}
                >
                  {" "}
                  {checksumAddress}
                  <CopyButton value={checksumAddress} isWhite={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            minHeight: "745px"
          }}
        >
          <div
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "center",
              borderRight: "2px solid #EDEDED"
            }}
          >
            <div style={{ width: "100%", padding: "24px 13px" }}>
              <div className="details">Details</div>
              <div className="flexbox" style={{ backgroundColor: "#FAFAFA" }}>
                <div className="trasaction-details-from-to">From</div>
                <div className="trasaction-details-from-to-accounts">
                  {isTestnet ? fromAdd.replace("0x", "xdc") : fromAdd}
                </div>
                <div
                  style={{
                    width: "20px",
                    margin: "9px 0px 7px 2px",
                    height: "20px"
                  }}
                >
                  <img src="/images/Assets/DownArrow.svg" />
                </div>
                <div className="trasaction-details-from-to">To</div>
                <div className="trasaction-details-from-to-accounts">
                  {isTestnet ? toAdd.replace("0x", "xdc") : toAdd}
                </div>
              </div>

              {/* all trasaction details  */}
              <div className="trasaction-details-amount">
                <div >Amount</div>
                <div style={{ marginRight: "6px", marginLeft: "auto" }}>
                  {value}
                </div>
                <h1 style={{ color: "#848484" }}>{symbol}</h1>
              </div>

              <div className="trasaction-details-amount">
                <div >Gas Limit</div>
                <div>{gas}</div>
              </div>

              <div className="trasaction-details-amount">
                <div >Gas Price (GWEI)</div>
                <div>{gasPrice}</div>
              </div>

              <div className="trasaction-details-amount">
                <div >Total</div>
                <div style={{ marginRight: "6px", marginLeft: "auto" }}>
                  {value}
                </div>
                <h1 style={{ color: "#848484" }}>{symbol}</h1>
              </div>
            </div>
          </div>

          <div
            style={{ width: "50%", display: "flex", justifyContent: "center" }}
          >
            <div style={{ width: "100%", padding: "0px 13px " }}>
              <div>
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
                      Trasaction submitted with estimated gas fee of 1.00 GWEI
                      at {submitTime} on {submitDate}.
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
                      Trasaction confirmed at {submitTime} on {submitDate}.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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

module.exports = connect(mapStateToProps)(ExpandedTransactionDetails);
