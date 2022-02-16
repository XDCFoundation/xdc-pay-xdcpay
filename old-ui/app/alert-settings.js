// const inherits = require("util").inherits;
// const Component = require("react").Component;
// const h = require("react-hyperscript");
// const connect = require("react-redux").connect;
// const actions = require("../../ui/app/actions");

// import React, { useState } from 'react';
// import { showAlert } from '../../ui/app/actions';




// class AlertSettings extends React.Component{
   
//     handleCheckBox = () => {
//         const showAlert = this.props.metamask.showAlert
//         // this.setState({ showGasFields: !showGasFields })
//         this.props.dispatch(actions.showAlert(!showAlert))
//    }
//     render(){
//         const state = this.props;
//         const metamaskState = state.metamask;
//         const warning = state.warning;
//         const showAlert = metamaskState.showAlert;
//         // let [checked, setChecked] = useState(false);
    
//         return(
//         <div className="flex-column flex-grow" style={{maxHeight: "585px",
//         overflowY: "auto",}}>
//             <div className="section-title flex-row"
//                  style={{ borderBottom: "1px solid #E3E7EB", paddingBottom: "17px" } }>
//             <img src="/images/Assets/BackArrow.svg" style={{marginLeft:'12px', cursor:'pointer'}} onClick={() => { state.dispatch(actions.goConfig()) }} />
//             <h2 style={{ marginLeft:'88px', fontFamily:'inter-bold'}}>Alert Settings</h2>
//             </div>
//             <div style={{
//                 padding: ' 15px 17px 20px 15px ',
//                 // borderBottom: '1px solid #E3E7EB',
//             }}>
//                 <span style={{ fontWeight: "bold", fontSize: "14px", color: "#2149B9" }}>Browsing a website with an unconnected account selected</span>
//                 <p style={{fontSize:'14px',marginTop:'11px', marginBottom:'20px',fontFamily:'Inter-Medium'}}>This alert is shown in the popup when you are browsing a connected web3 site, but the currently selected account is not connected.</p>
               
//                 <label className="switch">
//                 <input type="checkbox"  onChange={this.handleCheckBox} />
//                         <span className="slider round" ></span>
                        
//                     </label>
//                     <span style={{ marginLeft: '8px', }}>{showAlert ? "On" : "Off"}</span>
                
//                 </div>
           
            
//       </div>
            
//             )
//         }
//     }
   
//     module.exports = connect(mapStateToProps)(AlertSettings);
    
//     function mapStateToProps(state) {
//       return {
//         metamask: state.metamask,
//         warning: state.appState.warning,
//       };
//     }



/*      <------Alert UI------>    */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dropdown, DropdownMenuItem } from '../../old-ui/app/components/dropdown'
import actions from '../../ui/app/actions'
import { connect } from 'react-redux'

class MainMenu extends Component {
  static propTypes = {
    showConfigPage: PropTypes.func.isRequired,
    lockMetamask: PropTypes.func.isRequired,
    showInfoPage: PropTypes.func.isRequired,
    changeState: PropTypes.func.isRequired,
    openMainMenu: PropTypes.func.isRequired,
    isMainMenuOpen: PropTypes.bool,
  }

  render () {
    const isOpen = this.props.isMainMenuOpen
    const isMainMenuOpen = !isOpen

    return (
      <Dropdown
        useCssTransition={true}
        isOpen={isOpen}
        zIndex={11}
        constOverflow={true}
        onClickOutside={(event) => {
          const classList = event.target.classList
          const parentClassList = event.target.parentElement.classList

          const isToggleElement = classList.contains('sandwich-expando') ||
            parentClassList.contains('sandwich-expando')

          if (isOpen && !isToggleElement) {
            this.props.openMainMenu()
          }
        }}
        style={{
          position: 'absolute',
          bottom: '18px',
          width: '317px',
          maxHeight: isOpen ? '186px' : '0px',
          overflow: 'hidden',
          marginLeft: '19px',
        }}
      >
        <div className='wallet-options-list'>
          Wallet Options
          <img className='wallet-options-close-icon' onClick={() => this.props.changeState(isMainMenuOpen)} src='/images/Assets/Close.svg'></img>
        </div>
        <DropdownMenuItem
          closeMenu={() => this.props.changeState(isMainMenuOpen)}
          onClick={() => { this.props.showConfigPage() }}
        >
          <img className='wallet-options-icon' src='/images/Assets/Settings.svg'></img>
         Website Name</DropdownMenuItem>

        <DropdownMenuItem
          closeMenu={() => this.props.changeState(isMainMenuOpen)}
          onClick={() => { this.props.showInfoPage() }}
        >
          <img className='wallet-options-icon' src='/images/Assets/Info.svg'></img>
          Info/Help</DropdownMenuItem>

        <DropdownMenuItem
          closeMenu={() => this.props.changeState(isMainMenuOpen)}
          onClick={() => { this.props.lockMetamask() }}
        >
          <img className='wallet-options-icon' src='/images/Assets/Logout.svg'></img>
          Logout</DropdownMenuItem>
      </Dropdown>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showConfigPage: () => dispatch(actions.showConfigPage()),
    lockMetamask: () => dispatch(actions.lockMetamask()),
    showInfoPage: () => dispatch(actions.showInfoPage()),
  }
}

export default connect(null, mapDispatchToProps)(MainMenu)
