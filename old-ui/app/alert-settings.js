const inherits = require("util").inherits;
const Component = require("react").Component;
const h = require("react-hyperscript");
const connect = require("react-redux").connect;
const actions = require("../../ui/app/actions");

import React, { useState } from 'react';
import { showAlert } from '../../ui/app/actions';




class AlertSettings extends React.Component{
   
    handleCheckBox = () => {
        const showAlert = this.props.metamask.showAlert
        // this.setState({ showGasFields: !showGasFields })
        this.props.dispatch(actions.showAlert(!showAlert))
   }
    render(){
        const state = this.props;
        const metamaskState = state.metamask;
        const warning = state.warning;
        const showAlert = metamaskState.showAlert;
        // let [checked, setChecked] = useState(false);
    
        return(
        <div className="flex-column flex-grow" style={{maxHeight: "585px",
        overflowY: "auto",}}>
            <div className="section-title flex-row"
                 style={{ borderBottom: "1px solid #E3E7EB", paddingBottom: "17px" } }>
            <img src="/images/Assets/BackArrow.svg" style={{marginLeft:'12px', cursor:'pointer'}} onClick={() => { state.dispatch(actions.goConfig()) }} />
            <h2 style={{ marginLeft:'88px', fontFamily:'inter-bold'}}>Alert Settings</h2>
            </div>
            <div style={{
                padding: ' 15px 17px 20px 15px ',
                // borderBottom: '1px solid #E3E7EB',
            }}>
                <span style={{ fontWeight: "bold", fontSize: "14px", color: "#2149B9" }}>Browsing a website with an unconnected account selected</span>
                <p style={{fontSize:'14px',marginTop:'11px', marginBottom:'20px',fontFamily:'Inter-Medium'}}>This alert is shown in the popup when you are browsing a connected web3 site, but the currently selected account is not connected.</p>
               
                <label className="switch">
                <input type="checkbox"  onChange={this.handleCheckBox} />
                        <span className="slider round" ></span>
                        
                    </label>
                    <span style={{ marginLeft: '8px', }}>{showAlert ? "On" : "Off"}</span>
                
                </div>
           
            
      </div>
            
            )
        }
    }
   
    module.exports = connect(mapStateToProps)(AlertSettings);
    
    function mapStateToProps(state) {
      return {
        metamask: state.metamask,
        warning: state.appState.warning,
      };
    }