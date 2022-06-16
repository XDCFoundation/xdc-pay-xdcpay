const inherits = require("util").inherits;
const Component = require("react").Component;
const h = require("react-hyperscript");
const connect = require("react-redux").connect;
const actions = require("../../../../ui/app/actions");
// const LoadingIndicator = require("../../components/loading");
// const Web3 = require("web3");
const exportAsFile = require("../../util").exportAsFile;
import IdleTimer from "../idle-timer-container/idleTimer";
import React, { useState } from "react";
import CustomDropdown from "../../../../old-ui/app/components/common/custom-dropdown";
import PropTypes from "prop-types";

import timePeriodOption from "./timePeriod.json";

// Dropdown.......
// const timePeriod = ['1 minutes', '2 minutes', '5 minutes']
const TimePeriod = timePeriodOption.map((timePeriod) => {
  return {
    displayValue: timePeriod.name,
    key: timePeriod.code,
    value: timePeriod.code,
  };
});


class SecurityAndPrivacySettings extends React.Component {
  handleCheckBox = () => {
    
    const showIncomingTransaction = this.props.metamask.showIncomingTransaction
    this.props.dispatch(actions.showIncomingTransaction(!showIncomingTransaction))
  };

  autoLock = (time) => {
    var Data = time
    setTimeout(() => {
      this.props.dispatch(actions.lockMetamask())
      console.log('Lock-Metamask',Data)
    },Data)
  }
  static contextTypes = {
    t: PropTypes.func,
  };
  render() {
    const state = this.props;
    const metamaskState = state.metamask;
    const {t} = this.context;
    const showIncomingTransaction = metamaskState.showIncomingTransaction
    const currentTime = '2 min'
    return (
      <div
        className="flex-column flex-grow"
        style={{ maxHeight: "585px", overflowY: "auto" }}
      >
        <div
          className="section-title flex-row"
          style={{ borderBottom: "1px solid #E3E7EB", paddingBottom: "17px", display: 'flex',justifyContent: 'center',
      }}
        >
          <img
            className="image-display"
            src="/images/Assets/BackArrow.svg"
            style={{ position: 'absolute',
              left: '16px', cursor: "pointer" ,width:"19px",height:"17px"}}
            onClick={() => {
              state.dispatch(actions.goConfig());
            }}
          />
          <h2 style={{ fontFamily: navigator.userAgent.indexOf("Firefox") != -1 ?"Inter-semiBold":"Inter-Bold" ,fontSize:"15px"}}>
          {`${t('securityandPrivacySettings')}`}
          </h2>
        </div>
        <div
          style={{
            padding: " 15px 17px 20px 15px ",
            borderBottom: "1px solid #E3E7EB",
          }}
        >
          <span
            style={{ fontSize: "14px", color: "#2149B9",fontFamily: navigator.userAgent.indexOf("Firefox") != -1 ?"Inter-semiBold":"Inter-Medium" }}
          >{`${t('revealSeedWords')}`}</span>
          <br />
          <p
            style={{
              fontSize: "14px",
              marginBottom: "15px",
              fontFamily: "Inter-medium",
            }}
          >
             {`${t('getYourSeedWords')}`}
          </p>
          <button
            style={{
              width: "324px",
              height: "40px",
              color: "#03BE46",
              background: "#FFFFFF",
              border: "2px solid #03BE46",
              fontWeight: "600",
              fontFamily:"Inter-semiBold",
            }}
            onClick={(event) => {
              event.preventDefault();
              // state.onAddContactClicked()
              state.dispatch(actions.revealSeedConfirmation());
            }}
          >
            Reveal Secret Seed Phrase
          </button>
        </div>
         {/* <div
          style={{
            padding: " 15px 17px 20px 15px ",
            borderBottom: "1px solid #E3E7EB",
          }}
        >
          <span
            style={{ fontWeight: "bold", fontSize: "14px", color: "#2149B9" }}
          >
           {`${t('autoLockTimer')}`} 
          </span>
          <br />
          <p
            style={{
              fontSize: "14px",
              marginBottom: "15px",
              fontFamily: "Inter-medium",
            }}
          >
           {`${t('autoLockTimerDesc')}`} 
          </p>

          <CustomDropdown
            placeholder={currentTime}
            options={TimePeriod}
            selectedOption={TimePeriod.name}
            onSelect={time => this.autoLock(time)}
          />
        </div> 
        <div
          style={{
            padding: " 15px 17px 20px 15px ",
          }}
        >
          <span
            style={{ fontWeight: "bold", fontSize: "14px", color: "#2149B9" }}
          >
           {`${t('showIncomingTransactions')}`}  
          </span>
          <br />
          <p
            style={{
              fontSize: "14px",
              marginBottom: "15px",
              fontFamily: "Inter-medium",
            }}
          >
             {`${t('showIncomingTransactionsDesc')}`}  
          </p>
          <label className="switch">
            <input
              type="checkbox"
              onChange={this.handleCheckBox}
             checked={showIncomingTransaction}
            />
            <span className="slider round"></span>
          </label>
          <span style={{ marginLeft: "8px" }}> 
            {showIncomingTransaction ? "On" : "Off"}
          </span>
        </div> */}
      </div>
    );
  }
}

// function currentConversionInformation (metamaskState, state) {
//     const currentCurrency = metamaskState.currentCurrency
//     const conversionDate = metamaskState.conversionDate
//     // const { t } = this.context;
//     const setCurrentCurrency = metamaskState.setCurrentCurrency
//     return (
//       <div>
//         <span style={{fontFamily: 'Inter-Medium', fontSize: '14px', color: '#2149B9'}}>
//         Current Conversion
//           </span>
//         <br/>
//         <span style={{fontSize: '14px', color: '#2A2A2A', fontFamily: 'Inter-Medium'}}>
//             {`Updated ` + Date(conversionDate)}
//           </span>
//         <br/>
//         <CustomDropdown
//           placeholder={(currentCurrency)}
//           options={infuraCurrencyOptions}
//           selectedOption={currentCurrency}
//           onSelect={newCurrency => setCurrentCurrency(newCurrency)}
//         />
//         <div className="settings-page__content-item-col">
//         </div>
//       </div>
//     )
//   }

module.exports = connect(mapStateToProps)(SecurityAndPrivacySettings);

function mapStateToProps(state) {
  return {
    metamask: state.metamask,
    warning: state.appState.warning,
  };
}
