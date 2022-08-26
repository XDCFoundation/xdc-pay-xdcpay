const connect = require('react-redux').connect
const actions = require('../../../../ui/app/actions')
const Web3 = require('web3')
import React from 'react'
import PropTypes from 'prop-types'

const validUrl = require('valid-url')
const AddNetworkComponent = require('./add-network')

export default class AddNetwork extends React.Component {
  constructor (props) {
    super(props)
    // eslint-disable-next-line react/prop-types
    var viewNetworkObj = this.props.viewNetworkObj
    !viewNetworkObj ? viewNetworkObj = this.props.detailObj : viewNetworkObj
    this.state = {
      rpcNetworkId: viewNetworkObj ? viewNetworkObj.rpcNetworkId : '',
      networkName: viewNetworkObj ? viewNetworkObj.name : '',
      rpcUrl: viewNetworkObj ? viewNetworkObj.rpcURL : '',
      chainId: viewNetworkObj ? viewNetworkObj.chainId : '',
      currencySymbol: viewNetworkObj ? viewNetworkObj.currencySymbol : '',
      explorerLink: viewNetworkObj ? viewNetworkObj.blockExplorer : '',
    }
  }
  static contextTypes = {
    t: PropTypes.func,
  }


  onBackClick = () => {
    // eslint-disable-next-line react/prop-types
    this.props.dispatch(actions.displayWarning(''))
    this.props.backToNetwork ? this.props.backToNetwork() : this.props.dispatch(actions.networkSettings())
  }

  onStateChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  validateRPC = async (isToUpdate) => {
    this.props.dispatch(actions.displayWarning(''))
    const {frequentRpcList} = this.props
    const networkList=this.props.metamask.networkList;
    const {rpcNetworkId, networkName, rpcUrl, chainId, currencySymbol, explorerLink} = this.state
    const networkId = rpcNetworkId || 'rpc_network_' + new Date().getTime()
    const rpcNetworkObj = {
      rpcNetworkId: networkId,
      name: networkName,
      rpcURL: rpcUrl,
      chainId,
      currencySymbol,
      blockExplorer: explorerLink,
      isPermanent: false,
      providerType: 'rpc',
    }
    if (!networkName) {
      return this.props.dispatch(actions.displayWarning('Invalid network name.'))
    } else if (!validUrl.isWebUri(rpcUrl)) {
      return this.props.dispatch(actions.displayWarning(!rpcUrl.startsWith('http') ? 'URIs require the appropriate HTTP/HTTPS prefix.' : 'Invalid RPC URI'))
    }
    try {
      const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl))
      web3.eth.getBlockNumber((err, res) => {
        if (err) {
          this.props.dispatch(actions.displayWarning('Invalid RPC endpoint'))
        }
        else if (chainId === '') {
          return this.props.dispatch(actions.displayWarning('Invalid chain ID'))
        } else {
          if ((frequentRpcList && frequentRpcList.length) || networkList.length) {
             const isRPCAlreadyExists = frequentRpcList.find(netObj => netObj.rpcURL === rpcUrl)
             const isXDCNetworkExists = networkList.find(netObj => netObj.rpcURL === rpcUrl)
            if (isRPCAlreadyExists && !isToUpdate) {
              return this.props.dispatch(actions.displayWarning('RPC Network already exists'))
            }
            if (isXDCNetworkExists && !isToUpdate) {
              return this.props.dispatch(actions.displayWarning('RPC Network already exists'))
            }
          }
          this.props.dispatch(actions.setRpcTarget(rpcNetworkObj))
          !isToUpdate && this.props.dispatch(actions.addNetwork(rpcNetworkObj))
          this.onBackClick()
        }
      })
    } catch (e) {
      console.log(e, 'catch')
      return this.props.dispatch(actions.displayWarning('Invalid RPC endpoint'))
    }
  }

  validateChainId = async (rpcUrl, chainId, rpcNetworkObj) => {
    const networkChainId = await web3.eth.getChainId()
    if (chainId && Number(chainId) !== networkChainId) {
      this.props.dispatch(actions.displayWarning('Invalid Chain Id'))
      return false
    }
    rpcNetworkObj.chainId = networkChainId
    return true
  }

  onAddNetworkClicked = (isToUpdate) => {
    this.validateRPC(isToUpdate)
  }
  static contextTypes = {
    t: PropTypes.func,
  }

  render () {
    const { t } = this.context
    // eslint-disable-next-line react/prop-types
    const {warning, viewNetworkObj,detailObj} = this.props
    return (
      <AddNetworkComponent
        t={t}
        state={this.state}
        viewNetworkObj={viewNetworkObj}
        warningMsg={warning}
        detailObj = {detailObj}
        onBackClick={this.onBackClick}
        onStateChange={this.onStateChange}
        onAddNetworkClicked={this.onAddNetworkClicked}/>
    )
  }
}

function mapStateToProps (state) {
  return {
    metamask: state.metamask,
    frequentRpcList: state.metamask.frequentRpcList,
    warning: state.appState.warning,
    viewNetworkObj: state.appState.currentViewNetworkObj,
  }
}

module.exports = connect(mapStateToProps)(AddNetwork)
