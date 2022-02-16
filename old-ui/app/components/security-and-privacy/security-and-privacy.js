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
    // const securityandprivacy = this.props.metamask.securityandprivacy
    // // const [toggle, setToggle] = useState(false);
    // // toggle ? setToggle(false) : setToggle(true);
    // // this.setState({ securityandprivacy: !securityandprivacy })
    // this.props.dispatch(actions.securityandprivacy(!securityandprivacy))
  };
  static contextTypes = {
    t: PropTypes.func,
  };
  render() {
    const state = this.props;
    const metamaskState = state.metamask;
    const { t } = this.context;

    return (
      <div
        className="flex-column flex-grow"
        style={{ maxHeight: "585px", overflowY: "auto" }}
      >
        <div
          className="section-title flex-row"
          style={{ borderBottom: "1px solid #E3E7EB", paddingBottom: "17px" }}
        >
          <img
            src="/images/Assets/BackArrow.svg"
            style={{ marginLeft: "12px", cursor: "pointer" }}
            onClick={() => {
              state.dispatch(actions.goConfig());
            }}
          />
          <h2 style={{ marginLeft: "39px", fontFamily: "Inter-bold" }}>
            Security and Privacy Settings
          </h2>
        </div>
        <div
          style={{
            padding: " 15px 17px 20px 15px ",
            borderBottom: "1px solid #E3E7EB",
          }}
        >
          <span
            style={{ fontWeight: "bold", fontSize: "14px", color: "#2149B9" }}
          >{`${t("revealSeedWords")}`}</span>
          <br />
          <p
            style={{
              fontSize: "14px",
              marginBottom: "15px",
              fontFamily: "Inter-medium",
            }}
          >
            Get your secret seed words by entering your password.
          </p>
          <button
            style={{
              width: "324px",
              height: "40px",
              color: "#03BE46",
              background: "#FFFFFF",
              border: "2px solid #03BE46",
              fontWeight: "600",
            }}
            onClick={(event) => {
              event.preventDefault();
              state.dispatch(actions.revealSeedConfirmation());
            }}
          >
            Reveal Seed Words
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
            Auto-Lock Timer
          </span>
          <br />
          <p
            style={{
              fontSize: "14px",
              marginBottom: "15px",
              fontFamily: "Inter-medium",
            }}
          >
            Set the idle time in minutes before the wallet will be locked.
          </p>

          <CustomDropdown
            placeholder={TimePeriod}
            options={TimePeriod}
            selectedOption={TimePeriod}
            // onSelect={}
          />
        </div> */}
        {/* <div
          style={{
            padding: " 15px 17px 20px 15px ",
          }}
        >
          <span
            style={{ fontWeight: "bold", fontSize: "14px", color: "#2149B9" }}
          >
            Show Incoming Transactions
          </span>
          <br />
          <p
            style={{
              fontSize: "14px",
              marginBottom: "15px",
              fontFamily: "Inter-medium",
            }}
          >
            Select this to use Etherscan to show incoming transactions in the
            transactions list
          </p>
          <label className="switch">
            <input
              type="checkbox"
              onChange={this.handleCheckBox} */}
              {/* // checked={securityandprivacy}
            />
            <span className="slider round"></span>
          </label>
          <span style={{ marginLeft: "8px" }}> */}
            {/* {showIncomingTransaction ? "On" : "Off"} */}
          {/* </span> */}
        {/* </div> */}
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
