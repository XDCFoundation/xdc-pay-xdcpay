const Component = require('react').Component
const h = require('react-hyperscript')
const inherits = require('util').inherits
const TokenTracker = require('eth-token-watcher')
const TokenCell = require('./token-cell.js')
const connect = require('react-redux').connect
const selectors = require('../../../ui/app/selectors')
const log = require('loglevel')
import {
  XDC_TESTNET_CODE,
  GOERLI_TESTNET_CODE,
  XDC_CODE,
  XDC_DEVNET_CODE,
} from '../../../app/scripts/controllers/network/enums'
import {showTokens} from '../../../ui/app/actions'
import tokenBalance from './token-balance'

function mapStateToProps (state) {
  return {
    network: state.metamask.network,
    showTokens: state.metamask.showTokens,
    tokens: state.metamask.tokens,
    userAddress: selectors.getSelectedAddress(state),
  }
}

const defaultTokens = []

const contractsETH = require('eth-contract-metadata')
const contractsPOA = require('poa-contract-metadata')
for (const address in contractsETH) {
  const contract = contractsETH[address]
  if (contract.erc20) {
    contract.address = address
    defaultTokens.push(contract)
  }
}
for (const address in contractsPOA) {
  const contract = contractsPOA[address]
  if (contract.erc20) {
    contract.address = address
    defaultTokens.push(contract)
  }
}

module.exports = connect(mapStateToProps)(TokenList)

inherits(TokenList, Component)

function TokenList () {
  this.state = {
    tokens: [],
    isLoading: true,
    network: null,
  }
  Component.call(this)
}

TokenList.prototype.render = function () {
  const state = this.state
  const {tokens, isLoading, error, showTokens} = state
  const {userAddress, network, address} = this.props
  const isTestnet = parseInt(network) === XDC_TESTNET_CODE
  const isMainnet = parseInt(network) === XDC_CODE || parseInt(network) === GOERLI_TESTNET_CODE
  const isDevnet = parseInt(network) === XDC_DEVNET_CODE
  if (isLoading) {
    return this.message('Loading')
  }

  if (error && isMainnet) {
    log.error(error)
    return h('.hotFix', {
      style: {
        padding: '30px',
      },
    }, [
      'We had trouble loading your token balances. Please try again. ',
      h('span.hotFix', {
        style: {
          color: '#60db97',
          cursor: 'pointer',
        },
        onClick: () => {
          global.platform.openWindow({
            url: `https://explorer.xinfin.network/token/${address.replace('0x', 'xdc')}`,
          })
        },
      }, 'here'),
    ])
  }


  if (error && isTestnet) {
    log.error(error)
    return h('.hotFix', {
      style: {
        padding: '30px',
      },
    }, [
      'We had trouble loading your token balances. Please try again. ',
      h('span.hotFix', {
        style: {
          color: '#60db97',
          cursor: 'pointer',
        },
        onClick: () => {
          global.platform.openWindow({
            url: `https://explorer.apothem.network/token/${address.replace('0x', 'xdc')}`,
          })
        },
      }, 'here'),
    ])
  }

  if (error && isDevnet) {
    log.error(error)
    return h('.hotFix', {
      style: {
        padding: '30px',
      },
    }, [
      'We had trouble loading your token balances. Please try again. ',
      h('span.hotFix', {
        style: {
          color: '#60db97',
          cursor: 'pointer',
        },
        onClick: () => {
          global.platform.openWindow({
            url: `https://devnet.apothem.network/tokens/${address.replace('0x', 'xdc')}`,
          })
        },
      }, 'here'),
    ])
  }

  let tokensFromCurrentNetwork = tokens.filter(token => (parseInt(token.network) === parseInt(network) || !token.network))
  if (!this.props.showTokens) {
    tokensFromCurrentNetwork = tokensFromCurrentNetwork.filter(token => token.balance !== '0')
  }

  const tokenViews = tokensFromCurrentNetwork.map((tokenData, ind) => {
    tokenData.userAddress = userAddress
    const isLastTokenCell = ind === (tokensFromCurrentNetwork.length - 1)
    const menuToTop = true
    return h(TokenCell, {
      ind,
      ...tokenData,
      isLastTokenCell,
      menuToTop,
      removeToken: this.props.removeToken,
      network: this.props.network,
    })

  })

  return h('.full-flex-height', [
    this.renderTokenStatusBar(),

    h('ol.full-flex-height.flex-column', {
      style: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0 0 27px 0'
      },
    }, [
      h('style', `

        li.token-cell {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 10px;
          min-height: 50px;
        }

        li.token-cell > h3 {
          margin-left: 22px;
        }

        li.token-cell:hover {
          background: white;
          cursor: pointer;
        }

      `),
      ...tokenViews,
      h('.flex-grow'),
    ]),
  ])
}

TokenList.prototype.renderTokenStatusBar = function () {
  const {tokens} = this.state
  const {network} = this.props
  const tokensFromCurrentNetwork = tokens.filter(token => (parseInt(token.network) === parseInt(network) || !token.network))

  let msg
  let noTokens = false
  if (tokensFromCurrentNetwork.length === 1) {
    msg = `You own 1 token`
  } else if (tokensFromCurrentNetwork.length > 1) {
    msg = `You own ${tokensFromCurrentNetwork.length} tokens`
  } else {
    msg = `No token balance`
    noTokens = true
  }

  if (msg === 'No token balance') {
    return h('div', [
      h('div', {
        style: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '70px',
          flexFlow: 'column',
          padding: '0px 30px 10px',
          // borderBottom: '1px solid #E3E7EB',
          margin: '0 6px',
        },
      }, [
        h('span', {
            style: {
              fontSize: '14px',
              margin: '65px 0 10px 0',
              // fontFamily: 'Inter',
              color: '#9FA9BA',
            },
          },
          msg),
        h('button.btn-primary.wallet-view__add-token-button', {
          key: 'reveal-account-bar',
          onClick: (event) => {
            event.preventDefault()
            this.props.addToken()
          },
          style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '34px',
            // fontFamily: 'Inter',
            width: '148px',
          },
        }, [
          'Add Token',
        ]),
      ]),
      noTokens ? h('div', {
        style: {
          height: '70px',
        },
      }) : null,
    ])
  } else {
    return h('div', [
      h('div', {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          minHeight: '70px',
          // flexFlow: 'column',
          padding: '0px 18px ',
          margin: '0 13px',
          borderBottom: '1px solid #E3E7EB',
        },
      }, [
        h('span', {
            style: {
              fontSize: '14px',
              // fontFamily: 'Inter',
              color: '#9FA9BA',
            },
          },
          msg),
        h('button.btn-primary.wallet-view__add-token-button', {
          key: 'reveal-account-bar',
          onClick: (event) => {
            event.preventDefault()
            this.props.addToken()
          },
          style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // fontFamily: 'Inter',
            height: '34px',
            width: '108px',
          },
        }, [
          'Add Token',
        ]),
      ]),
      noTokens ? h('div', {
        style: {
          height: '70px',
        },
      }) : null,
    ])

  }
}

TokenList.prototype.message = function (body) {
  return h('div', {
    style: {
      display: 'flex',
      height: '250px',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '30px',
    },
  }, body)
}

TokenList.prototype.componentDidMount = function () {
  this.createFreshTokenTracker()
}

TokenList.prototype.createFreshTokenTracker = function () {
  if (this.tracker) {
    // Clean up old trackers when refreshing:
    this.tracker.stop()
    this.tracker.removeListener('update', this.balanceUpdater)
    this.tracker.removeListener('error', this.showError)
  }

  if (!global.ethereumProvider) return
  // !showTokens && updateSendTokenBalance

  const {userAddress} = this.props

  const tokensFromCurrentNetwork = this.props.tokens.filter(token => (parseInt(token.network) === parseInt(this.props.network) || !token.network))
  this.tracker = new TokenTracker({
    userAddress,
    provider: global.ethereumProvider,
    tokens: tokensFromCurrentNetwork,
    pollingInterval: 8000,
  })


  // Set up listener instances for cleaning up
  this.balanceUpdater = this.updateBalances.bind(this)
  this.showError = (error) => {
    this.setState({error, isLoading: false})
  }
  this.tracker.on('update', this.balanceUpdater)
  this.tracker.on('error', this.showError)

  this.tracker.updateBalances()
    .then(() => {
      this.updateBalances(this.tracker.serialize())
    })
    .catch((reason) => {
      log.error(`Problem updating balances`, reason)
      this.setState({isLoading: false})
    })
}

TokenList.prototype.componentDidUpdate = function (nextProps) {
  const {
    network: oldNet,
    userAddress: oldAddress,
    tokens,
  } = this.props
  const {
    network: newNet,
    userAddress: newAddress,
    tokens: newTokens,
  } = nextProps

  const isLoading = newNet === 'loading'
  const missingInfo = !oldNet || !newNet || !oldAddress || !newAddress
  const sameUserAndNetwork = oldAddress === newAddress && oldNet === newNet
  const shouldUpdateTokens = isLoading || missingInfo || sameUserAndNetwork

  const oldTokensLength = tokens ? tokens.length : 0
  const tokensLengthUnchanged = oldTokensLength === newTokens.length

  if (tokensLengthUnchanged && shouldUpdateTokens) return

  this.setState({isLoading: true})
  this.createFreshTokenTracker()
}

TokenList.prototype.updateBalances = function (tokens) {

  if (!this.tracker.running) {
    return
  }
  this.setState({tokens, isLoading: false})
}

TokenList.prototype.componentWillUnmount = function () {
  if (!this.tracker) return
  this.tracker.stop()
  this.tracker.removeListener('update', this.balanceUpdater)
  this.tracker.removeListener('error', this.showError)
}
