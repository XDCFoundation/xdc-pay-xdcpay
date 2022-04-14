const inherits = require("util").inherits;
const Component = require("react").Component;
const h = require("react-hyperscript");
const connect = require("react-redux").connect;
const actions = require("../../ui/app/actions");
const LoadingIndicator = require("./components/loading");
const Web3 = require("web3");
import { Checkbox } from '@material-ui/core';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
const infuraCurrencies = require("./infura-conversion.json").objects.sort(
  (a, b) => {
    return a.quote.name
      .toLocaleLowerCase()
      .localeCompare(b.quote.name.toLocaleLowerCase());
  }
);
const validUrl = require("valid-url");
const exportAsFile = require("./util").exportAsFile;
const Modal = require("../../ui/app/components/modals/index").Modal;
const ethNetProps = require("xdc-net-props");
const { networks } = require("../../app/scripts/controllers/network/util");
// const React = require('react');

class AdvanceSettings extends React.Component{
    // constructor() {
    //     super()
    //     this.state = {showGasFields: false}
    // }
    // state = { checked : false }

    // onChange = newValue => {
    //   this.setState({ checked: newValue });
    // }
    handleCheckBox = () => {
        const showGasFields = this.props.metamask.showGasFields
        // const [toggle, setToggle] = useState(false);
        // toggle ? setToggle(false) : setToggle(true);
        // this.setState({ showGasFields: !showGasFields })
        this.props.dispatch(actions.showGasFields(!showGasFields))
        
    }
    
    static contextTypes = {
        t: PropTypes.func,
    };
    render(){
        const state = this.props;
        const metamaskState = state.metamask;
        const showGasFields = metamaskState.showGasFields;
        const { t } = this.context;
        return(
        <div className="flex-column flex-grow" style={{maxHeight: "585px",
        overflowY: "auto",}}>
            <div className="section-title flex-row"
                 style={{ borderBottom: "1px solid #E3E7EB", paddingBottom: "17px" } }>
            <img src="/images/Assets/BackArrow.svg" style={{marginLeft:'12px', cursor:'pointer'}} onClick={() => { state.dispatch(actions.goConfig()) }} />
            <h2 style={{ marginLeft:'88px',fontFamily:'Inter-bold'}}>Advance Settings</h2>
            </div>
            <div style={{
                padding: ' 14px 17px 14px 17px ',
                borderBottom: '1px solid #E3E7EB',
            }}>
                <span style={{ fontWeight: "bold", fontSize: "14px", color: "#2149B9" }}>{`${t('stateLogs')}`}</span><br />
                <p style={{fontSize:'14px', marginBottom:'15px',fontFamily:'Inter-medium'}}>{`${t('stateLogsDescription')}`} </p>
                <button style={{ width: "324px", height: "40px", color: "#03BE46", background: "#FFFFFF", border: "2px solid #03BE46", fontWeight: "600", }}
                    onClick={(event) => {
                        window.logStateString((err, result) => {
                                        if (err) {
                                            state.dispatch(
                                                actions.displayWarning(
                                                    "Error in retrieving state logs."
                                                )
                                            );
                                        } else {
                                            exportAsFile("XDCPay State Logs.json", result);
                                        }
                                    }) }}>{`${t('downloadStateLogs')}`}</button>
                
                </div>
                <div style={{
                padding: ' 14px 17px 14px 17px ',
                borderBottom: '1px solid #E3E7EB',
            }}>
                    <span style={{ fontWeight: "bold", fontSize: "14px", color: "#2149B9" }}>{`${t('resetAccount')}` }</span><br />
                <p style={{fontSize:'14px',marginBottom:'15px',fontFamily:'Inter-medium'}}>Resetting your account will clear your transaction history. This will not change the balances in your accounts or require you to re-enter your Secret Recovery Phrase.</p>
                    <button style={{ width: "324px", height: "40px", color: "#FF0035", background: "#FFFFFF", border: "2px solid #FF0035", fontWeight: "600", }}
                        onClick={(event) => {
                            event.preventDefault();
                            state.dispatch(actions.resetAccount());
                        }}>Reset Account</button>
                </div>
                      
               <div style={{
                    padding: ' 14px 17px 14px 17px',
                    // borderBottom: '1px solid #E3E7EB',
                }}>
                <span style={{ fontWeight: "bold", fontSize: "14px", color: "#2149B9" }}>Advanced gas controls</span><br />
                <p style={{fontSize:'14px',marginBottom:'15px',fontFamily:'Inter-medium'}}>Select this to show gas price and limit controls directly on the send and confirm screens.</p>
                    <label className="switch">
                        <input type="checkbox" onChange={this.handleCheckBox} checked={showGasFields }/>
                <span className="slider round" ></span>
                        
                    </label>
                    <span style={{marginLeft:'8px',}}>{showGasFields?"On":"Off"}</span>
                        {/* {toggle? <span>ON</span> :<span> OFF</span>} */}
            </div>    
            
      </div>
            
            )
        }
    }
   
    module.exports = connect(mapStateToProps)(AdvanceSettings);
    
    function mapStateToProps(state) {
      return {
        metamask: state.metamask,
        warning: state.appState.warning,
      };
    }
    // const ToggleSwitch = ({checked, onChange}) => (
        //     <div>
//       <input
//         type="checkbox"
//         className="toggle-switch-checkbox"
//         checked={checked}
//         onChange={e => onChange(e.target.checked)}
//       />
//     </div>
//   );
  
//   export default ToggleSwitch;
    
//   function AdvanceSettings() {
//       let [checked, setChecked] = useState(false);
    
//       return (
//         <ToggleSwitch id="toggleSwitch" checked={checked} onChange={setChecked} />
//       )
//     }

// inherits(AdvanceSettings, Component);
// function AdvanceSettings() {
//   this.state = {
//     loading: false,
//   };
//   Component.call(this);
// }

// AdvanceSettings.prototype.render = function () {
//     const state = this.props;
//     const metamaskState = state.metamask;
//     const warning = state.warning;

//     return h(
//         ".flex-column.flex-grow",
//         {
//             style: {
//                 maxHeight: "585px",
//                 overflowY: "auto",
//             },
//         },
//         [
//             // (LoadingIndicator, {
//             //   isLoading: this.state.loading,
//             // }),

//             h(Modal, {}, []),

//             // subtitle and nav
//             h(
//                 ".section-title.flex-row",
//                 { style: { borderBottom: "1px solid #E3E7EB", paddingBottom: "17px" } },
//                 [
//                     h("img", {
//                         onClick: () => {
//                             state.dispatch(actions.goConfig());
//                         },
//                         src: "/images/Assets/BackArrow.svg",
//                         style: {
//                             position: "static",
//                             marginLeft: "15px",
//                             cursor: "pointer",
//                         },
//                     }),

//                     h(
//                         "h2",
//                         {
//                             style: {
//                                 marginLeft: "82px",
//                                 fontWeight: "600",
//                                 minHeight: "20px",
//                                 //   padding: '0px 18px ',
//                             },
//                         },
//                         "Advance Settings"
//                     ),
//                 ]
//             ),
//             [
//                 h(
//                     "div",
//                     {
//                         style: {
//                             // margin: "26px 0 0 9px",
//                             padding: ' 27px 17px 22px 15px ',
//                             borderBottom: '1px solid #E3E7EB',
//                         },
//                     },
//                     [
//                         h(
//                             "span",
//                             {
//                                 style: {
//                                     fontWeight: "bold",
//                                     fontSize: "14px",
//                                     color: "#2149B9",
//                                 },
//                             },
//                             "State Logs"
//                         ),
//                         h("br"),
//                         h(
//                             "p",
//                             {
//                                 style: {
//                                     fontFamily: "Nunito Regular",
//                                     fontSize: "14px",
//                                     lineHeight: "18px",
//                                     marginBottom: "-11px",
//                                 },
//                             },
//                             `State logs contain your public account addresses and sent transactions.`
//                         ),
//                         h("br"),
//                         h(
//                             "button",
//                             {
//                                 style: {
//                                     width: "324px",
//                                     height: "40px",
//                                     color: "#03BE46",
//                                     background: "#FFFFFF",
//                                     border: "2px solid #03BE46",
//                                     fontWeight: "600",
//                                 },
//                                 onClick(event) {
//                                     window.logStateString((err, result) => {
//                                         if (err) {
//                                             state.dispatch(
//                                                 actions.displayWarning(
//                                                     "Error in retrieving state logs."
//                                                 )
//                                             );
//                                         } else {
//                                             exportAsFile("XDCPay State Logs.json", result);
//                                         }
//                                     });
//                                 },
//                             },
//                             "Download State Logs"
//                         ),
//                     ]
//                 ),
//             ],
//             [
//                 h(
//                     "div",
//                     {
//                         style: {
//                             // margin: "26px 0 0 9px",
//                             padding: ' 27px 17px 22px 15px ',
//                            borderBottom: '1px solid #E3E7EB',

//                         },
//                     },
//                     [
//                         h(
//                             "span",
//                             {
//                                 style: {
//                                     fontWeight: "bold",
//                                     fontSize: "14px",
//                                     color: "#2149B9",
//                                 },
//                             },
//                             "State Logs"
//                         ),
//                         h("br"),
//                         h(
//                             "p",
//                             {
//                                 style: {
//                                     fontFamily: "Nunito Regular",
//                                     fontSize: "14px",
//                                     lineHeight: "18px",
//                                     marginBottom: "-11px",
//                                 },
//                             },
//                             `Resetting your account will clear your transaction history. This will not change the balances in your accounts or require you to re-enter your Secret Recovery Phrase.`
//                         ),
//                         h("br"),
//                     h(
//                         "button",
//                         {
//                             style: {
//                                 // alignSelf: "center",
//                                 width: "324px",
//                                 height: "40px",
//                                 color: "#FF0035",
//                                 background: "#FFFFFF",
//                                 border: "2px solid #FF0035",
//                                 fontWeight: "600",
//                                 marginLeft: "9px",
//                             },
//                             onClick(event) {
//                                 event.preventDefault();
//                                 state.dispatch(actions.resetAccount());
//                             },
//                         },
//                         "Reset Account"
//                     )],
//         ),
//       ],
//     ]
//   );
// };
