import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dropdown, DropdownMenuItem } from '../dropdown'
import actions from '../../../../ui/app/actions'
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
        // style={{
        //   position: 'absolute',
        //   bottom: '18px',
        //   width: '317px',
        //   maxHeight: isOpen ? '186px' : '0px',
        //   overflow: 'hidden',
        //   marginLeft: '19px',
        // }}
        className={"walletOptionsExpanded"}
      >
        <div className='wallet-options-list'>
          Wallet Options
          <img className='wallet-options-close-icon dropdownCloseImage' onClick={() => this.props.changeState(isMainMenuOpen)} src='/images/Assets/Close.svg'></img>
        </div>
        <DropdownMenuItem
          closeMenu={() => this.props.changeState(isMainMenuOpen)}
          onClick={() => { this.props.showConfigPage() }}
        >
          <img className='wallet-options-icon' src='/images/Assets/Settings.svg'></img>
          Settings</DropdownMenuItem>

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
