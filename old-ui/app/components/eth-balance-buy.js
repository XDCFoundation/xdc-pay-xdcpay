const Component = require("react").Component;
const h = require("react-hyperscript");
import React from "react";
const inherits = require("util").inherits;
const formatBalance = require("../util").formatBalance;
const generateBalanceObject = require("../util").generateBalanceObject;
import { Tooltip as ReactTooltip } from "react-tippy";
const FiatValue = require("./fiat-value.js");

module.exports = EthBalanceComponent;

inherits(EthBalanceComponent, Component);
function EthBalanceComponent() {
  Component.call(this);
}

EthBalanceComponent.prototype.render = function () {
  var props = this.props;
  let { value } = props;
  const { style, width, network, isToken, tokenSymbol } = props;
  var needsParse =
    this.props.needsParse !== undefined ? this.props.needsParse : true;
  value = value
    ? formatBalance(value, 6, needsParse, network, isToken, tokenSymbol)
    : "...";

  return h(
    ".ether-balance.ether-balance-amount",
    {
      style,
    },
    [
      h(
        "div",
        {
          style: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          },
        },
        this.renderBalance(value)
      ),
    ]
  );
};
EthBalanceComponent.prototype.renderBalance = function (value) {
  var props = this.props;
  const { conversionRate, shorten, incoming, currentCurrency } = props;
  if (value === "None") return value;
  if (value === "...") return value;
  var balanceObj = generateBalanceObject(value, shorten ? 1 : 3);
  var balance;
  var splitBalance = value.split(" ");
  var ethNumber = splitBalance[0];
  var ethSuffix = splitBalance[2];
  const showFiat = "showFiat" in props ? props.showFiat : true;

  if (shorten) {
    balance = balanceObj.shortBalance;
  } else {
    balance = balanceObj.balance;
  }

  var label = balanceObj.label;
  const valueStyle = props.valueStyle
    ? props.valueStyle
    : {
      color: "#1F1F1F",
      width: "100%",
      fontSize: "30px",
      textAlign: "right",
      fontFamily: "Inter",
      fontWeight: "600",
    };
  const dimStyle = props.dimStyle
    ? props.dimStyle
    : {
      color: " #1F1F1F",
      fontSize: "30px",
      marginLeft: "5px",
      fontFamily: "Inter",
      fontWeight: "600",
    };
  const randomnumber = Math.floor(Math.random() * 100);


  return h("div.flex-column", {
    style: {

      alignItems: 'center',
      width: '100%'
    },
  }, [
    h(
      ".flex-row",
      {
        style: {
          alignItems: "flex-end",
          lineHeight: "20px",
          textRendering: "geometricPrecision",
        },
      },
      [
        <ReactTooltip
          arrow={true}
          trigger={'mouseenter focus'}
          position='bottom'
          size='small'
          title={`${balance + " " + label}`}
          theme='dark'
        >
          <div style={{ display: "flex" }}>
            <div data-tip data-for={`${randomnumber}`} style={valueStyle} >{incoming ? `+${balance}` : balance}</div>,
            <div style={dimStyle} >{label}</div>
          </div>
        </ReactTooltip>,
      ]
    ),


    showFiat
      ? h(FiatValue, {
        valueStyle,
        dimStyle,
        value: props.value,
        conversionRate,
        currentCurrency,
        network: props.network,
      })
      : null,
  ]);
};
