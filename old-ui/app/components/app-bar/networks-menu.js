import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Dropdown, DropdownMenuItem} from '../dropdown'
import actions from '../../../../ui/app/actions'
import {LOCALHOST} from '../../../../app/scripts/controllers/network/enums'
import {networks} from '../../../../app/scripts/controllers/network/util'
import {connect} from 'react-redux'

const LOCALHOST_RPC_URL = 'http://localhost:8545'

class NetworksMenu extends Component {
  static propTypes = {
    setRpcTarget: PropTypes.func.isRequired,
    updateNetworksMenuOpenState: PropTypes.func.isRequired,
    provider: PropTypes.any.isRequired,
    frequentRpcList: PropTypes.array.isRequired,
    isNetworkMenuOpen: PropTypes.bool,
  }

  render () {
    const props = this.props
    const {networkList, frequentRpcList} = props
    const isOpen = props.isNetworkMenuOpen
    const networksView = this._renderNetworksView([...networkList, ...frequentRpcList])

    return (
      <Dropdown
        useCssTransition={true}
        isOpen={isOpen}
        onClickOutside={(event) => {
          const {classList} = event.target
          const isNotToggleElement = [
            classList.contains('menu-icon'),
            classList.contains('network-name'),
            classList.contains('network-indicator'),
          ].filter(bool => bool).length === 0
          if (isNotToggleElement) {
            this.props.updateNetworksMenuOpenState(false)
          }
        }}
        zIndex={11}
        // style={{
        //   position: 'absolute',
        //   bottom: '18px',
        //   width: '317px',
        //   maxHeight: isOpen ? '524px' : '0px',
        //   marginLeft: '19px',
        // }}
        className={"selectNetworkExpanded"}
        innerStyle={{padding: 0,}}
      >
        <div className="select-network-list">
          Select Network
          <img className="select-network-close-icon dropdownCloseImage" src="/images/Assets/Close.svg"
               onClick={() => this.props.updateNetworksMenuOpenState(!isOpen)}/>
        </div>
        <div style={{maxHeight: isOpen ? '166px' : '0px',overflowY:'auto'}}>
        {networksView}

        <DropdownMenuItem
          closeMenu={() => this.props.updateNetworksMenuOpenState(!isOpen)}
          onClick={() => this.props.showAddNetworkPage()}
          className={'app-bar-networks-dropdown-custom-rpc'}
          >Custom RPC</DropdownMenuItem>
          </div>
      </Dropdown>
    )
  }

  _renderNetworksView (_networks) {
    const props = this.props
    const {provider: {type: providerType, rpcTarget}} = props
    const state = this.state || {}
    const isOpen = state.isNetworkMenuOpen

    const onNetworkClicked = (networkObj) => {
      if (networkObj.providerType === LOCALHOST || networkObj.providerType === 'rpc') {
        props.setRpcTarget(networkObj)
      } else {
        props.setProviderType(networkObj.providerType)
      }
    }

    const isNetworkSelected = (providerType, rpcTarget, networkObj) => {
      switch (providerType) {
        case 'rpc':
          return rpcTarget === networkObj.rpcURL
        default:
          return providerType === networkObj.providerType
      }
    }

    return _networks
      .map((networkObj,index) => {
        return (
          <DropdownMenuItem
            key={index}
            closeMenu={() => this.props.updateNetworksMenuOpenState(!isOpen)}
            onClick={() => onNetworkClicked(networkObj)}
            style={{
              paddingLeft: '20px',
              color: isNetworkSelected(providerType, rpcTarget, networkObj) ? '#2149B9' : '',
            }}
          >
            {isNetworkSelected(providerType, rpcTarget, networkObj) ? <div className="selected-network"/> : null}
            {networkObj.name}
          </DropdownMenuItem>
        )
      })
  }

}

const mapDispatchToProps = dispatch => {
  return {
    showAddNetworkPage: () => dispatch(actions.showAddNetworkPage()),
    setRpcTarget: (rpcTarget) => dispatch(actions.setRpcTarget(rpcTarget)),
    setProviderType: (providerType) => dispatch(actions.setProviderType(providerType)),
    showDeleteRPC: (label) => dispatch(actions.showDeleteRPC(label)),
  }
}

const mapStateToProps = ({metamask}) => {
  const {networkList, frequentRpcList} = metamask
  return {
    networkList, frequentRpcList,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NetworksMenu)
