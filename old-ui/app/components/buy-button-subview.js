import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../../ui/app/actions";
import CoinbaseForm from "./coinbase-form";
import ShapeshiftForm from "./shapeshift-form";
import Loading from "./loading";
import AccountPanel from "./account-panel";
import RadioList from "./custom-radio-list";
import { getNetworkDisplayName } from "../../../app/scripts/controllers/network/util";
import { getFaucets, getExchanges } from "../../../app/scripts/lib/buy-eth-url";
import { MAINNET_CODE } from "../../../app/scripts/controllers/network/enums";
import ethNetProps from "xdc-net-props";
import PropTypes from "prop-types";
import { getMetaMaskAccounts } from "../../../ui/app/selectors";
import { transform } from "lodash";
// import { toChecksumAddress } from "ethereumjs-util";
const { toChecksumAddress } = require('../util')


class BuyButtonSubview extends Component {
  render() {
    return (
      <div style={{ width: "100%", maxHeight:'574px',overflowX:'scroll' }}>
        {this.headerSubview()}
        {this.primarySubview()}
      </div>
    );
  }

  headerSubview() {
    const props = this.props;
    const { network, conversionRate, currentCurrency } = props;
    var selected = props.address || Object.keys(props.accounts)[0]
    var checksumAddress = selected && toChecksumAddress(network, selected)
    const isLoading = props.isSubLoading;
    const coinName = ethNetProps.props.getNetworkCoinName(network);
    
    return (
      <div className="flex-column">
        {/* loading indication*/}

        <div>
          <Loading isLoading={isLoading} />
        </div>
        <div
          className="flex-row section-title"
          style={{
            alignItems: "center",
          }}
        >
          <img
            src="/images/Assets/Close.svg"
            onClick={() => this.backButtonContext()}
            style={{
              position: "absolute",
              left: "15px",
              cursor: "pointer",
              transformOrigin: "center center",
              transition: "transform 50ms ease-in-out",
              width: "14px",
            }}
          />



          <h2
            className="flex-center buy-title"
            style={{
              fontWeight: "700",
              // fontFamily: "Inter",
              fontSize: "15px",
            }}
          >{`Buy `}</h2>
        </div>
        {/* account panel*/}
        <div>
          <AccountPanel
            {...{
              showFullAddress: true,
              identity: props.identity,
              account: props.account,
              network: props.network,
              // value: account && account.balance,
              conversionRate,
              currentCurrency,
              checksumAddress,
              
              // network,
            }}
          />
        </div>
        {/* header bar (back button, label)*/}

        <div>
          <h3
            className="flex-center select-service"
            style={{
              fontSize: "12px",
              fontWeight: "600",            
            }}
          >
            Select Service
          </h3>
        </div>
      </div>
    );
  }

  primarySubview() {
    const props = this.props;
    const network = props.network;

    switch (network) {
      case "loading":
        return;

      case "1":
        return this.mainnetSubview();

      default:
        return (
          <div className="flex-column" style={{ margin: "0px 20px " }}>
            {this._getBuyOptionsView(network)}
          </div>
        );
    }
  }

  _getBuyOptionsView(network) {
    const isTestnet = ethNetProps.props.isTestnet(network);
    if (isTestnet) {
      return this._getFaucetsView(network);
    } else {
      return this._getExchangesView(network);
    }
  }

  _getExchangesView(network) {
    const exchanges = getExchanges({ network });
    return exchanges.map((exchange, ind) => {
      return (
        <div
          style={{
            border: "1px solid #C7CDD8",
            height: "57px",
            borderRadius: "9px",
            padding: "11px",
            // fontFamily: "Inter",
            fontSize: "14px",
            marginBottom: '10px',
            color: "black",
            textAlign: "left",
            fontFamily: "Inter-Semibold",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          key={`buy-option${ind}`}
          className="buy-option cursor-pointer"
          onClick={() => this.props.dispatch(actions.buyEth({ network, ind }))}
        >
          {exchange.name}
          <img
            style={{width: "7px" }}
            src="/images/Assets/RightArrow.svg"
          />
        </div>
      );
    });
  }

  _getFaucetsView(network) {
    const faucets = getFaucets(network);
    if (faucets.length === 0) {
      return <h2 className="error">Unknown network ID</h2>;
    }
    const networkName = getNetworkDisplayName(network);
    return faucets.map((faucet, ind) => {
      const faucetNum = faucets.length > 1 ? ind + 1 : "";
      const faucetLabel = `${networkName} Test Faucet ${faucetNum}`;
      return (
        <p
          key={`buy-option${ind}`}
          style={{
            border: "1px solid #C7CDD8",
            height: "57px",
            borderRadius: "9px",
            padding: "11px",
            // fontFamily: "Inter",
            color: "black",
            fontSize: "14px",
            textAlign: "left",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="buy-option cursor-pointer"
          onClick={() => this.props.dispatch(actions.buyEth({ network, ind }))}
        >
          {faucetLabel}
          <img
            style={{width: "7px" }}
            src="/images/Assets/RightArrow.svg"
          />
        </p>
      );
    });
  }

  mainnetSubview() {
    const props = this.props;

    return (
      <div className="flex-column">
        <div className="flex-row selected-exchange">
          <RadioList
            defaultFocus={props.buyView.subview}
            labels={["Coinbase", "ShapeShift"]}
            subtext={{
              Coinbase: "Crypto/FIAT (USA only)",
              ShapeShift: "Crypto",
            }}
            onClick={(event) => this.radioHandler(event)}
          />
        </div>
        <h3
          className="select-service"
          style={{
            borderTop: "1px solid #e2e2e2",
            paddingTop: "20px",
          }}
        >
          {props.buyView.subview}
        </h3>
        {this.formVersionSubview()}
      </div>
    );
  }

  formVersionSubview() {
    const { network } = this.props;
    if (Number(network) === MAINNET_CODE) {
      if (this.props.buyView.formView.coinbase) {
        return <CoinbaseForm {...this.props} />;
      } else if (this.props.buyView.formView.shapeshift) {
        return <ShapeshiftForm {...this.props} />;
      }
    }
  }

  backButtonContext() {
    if (this.props.context === "confTx") {
      this.props.dispatch(
        actions.showConfTxPage({
          isContractExecutionByUser: this.props.isContractExecutionByUser,
        })
      );
    } else {
      this.props.dispatch(actions.goHome());
    }
  }

  radioHandler(event) {
    switch (event.target.title) {
      case "Coinbase":
        return this.props.dispatch(actions.coinBaseSubview());
      case "ShapeShift":
        return this.props.dispatch(
          actions.shapeShiftSubview(this.props.provider.type)
        );
    }
  }
}

BuyButtonSubview.propTypes = {
  dispatch: PropTypes.func,
  network: PropTypes.string,
  buyView: PropTypes.object,
  context: PropTypes.string,
  provider: PropTypes.object,
  isContractExecutionByUser: PropTypes.bool,
};

function mapStateToProps(state) {
  const accounts = getMetaMaskAccounts(state);
  return {
    identity: state.appState.identity,
    account: accounts[state.appState.buyView.buyAddress],
    warning: state.appState.warning,
    buyView: state.appState.buyView,
    network: state.metamask.network,
    provider: state.metamask.provider,
    address: state.metamask.selectedAddress,
    context: state.appState.currentView.context,
    conversionRate: state.metamask.conversionRate,
    currentCurrency: state.metamask.currentCurrency,
    isSubLoading: state.appState.isSubLoading,

    isContractExecutionByUser: state.appState.buyView.isContractExecutionByUser,
  };
}

module.exports = connect(mapStateToProps)(BuyButtonSubview);
