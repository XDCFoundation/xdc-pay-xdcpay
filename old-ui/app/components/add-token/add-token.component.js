const React = require('react')
const { Component } = React
const h = require('react-hyperscript')
const Tooltip = require('../tooltip.js')
const TabBar = require('../tab-bar')
const { checkExistingAddresses } = require('./util')
const { getCurrentKeyring, ifContractAcc, isValidAddress } = require('../../util')
const TokenList = require('./token-list')
const TokenSearch = require('./token-search')
const { tokenInfoGetter } = require('../../../../ui/app/token-util')
const ethUtil = require('ethereumjs-util')
const abi = require('human-standard-token-abi')
const Eth = require('ethjs-query')
const EthContract = require('ethjs-contract')
const PropTypes = require('prop-types')

const emptyAddr = '0x0000000000000000000000000000000000000000'
const SEARCH_TAB = 'SEARCH'
const CUSTOM_TOKEN_TAB = 'CUSTOM_TOKEN'

const { POA_CODE, MAINNET_CODE } = require('../../../../app/scripts/controllers/network/enums')

class AddTokenScreen extends Component {

  static contextTypes = {
    t: PropTypes.func,
  }

  static propTypes = {
    goHome: PropTypes.func,
    setPendingTokens: PropTypes.func,
    pendingTokens: PropTypes.object,
    clearPendingTokens: PropTypes.func,
    showConfirmAddTokensPage: PropTypes.func,
    displayWarning: PropTypes.func,
    tokens: PropTypes.array,
    identities: PropTypes.object,
    keyrings: PropTypes.array,
    address: PropTypes.string,
    dispatch: PropTypes.func,
    network: PropTypes.string,
  }

  constructor (props) {
    super(props)
    this.state = {
      warning: null,
      customAddress: '',
      customSymbol: '',
      customDecimals: 0,
      searchResults: [],
      selectedTokens: {},
      tokenSelectorError: null,
      customAddressError: null,
      customSymbolError: null,
      customDecimalsError: null,
      autoFilled: false,
      forceEditSymbol: false,
    symbolAutoFilled: false,
    decimalAutoFilled: false,
      displayedTab: SEARCH_TAB,
    }
    Component.call(this)
  }

  componentDidMount () {
    this.tokenInfoGetter = tokenInfoGetter()
    const { pendingTokens = {} } = this.props
    const pendingTokenKeys = Object.keys(pendingTokens)

    if (pendingTokenKeys.length > 0) {
      let selectedTokens = {}
      let customToken = {}

      pendingTokenKeys.forEach(tokenAddress => {
        const token = pendingTokens[tokenAddress]
        const { isCustom } = token

        if (isCustom) {
          customToken = { ...token }
        } else {
          selectedTokens = { ...selectedTokens, [tokenAddress]: { ...token } }
        }
      })

      const {
        address: customAddress = '',
        symbol: customSymbol = '',
        decimals: customDecimals = 0,
      } = customToken

      // const displayedTab = Object.keys(selectedTokens).length > 0 ? SEARCH_TAB : CUSTOM_TOKEN_TAB
      this.setState({ selectedTokens, customAddress, customSymbol, customDecimals, displayedTab })
    }
  }

  render () {
    const { network } = this.props
    const props = this.props
    const {goHome} = props
    const networkID = parseInt(network)
    let views = []
    const isProdNetworkWithKnownTokens = networkID === MAINNET_CODE || networkID === POA_CODE
    isProdNetworkWithKnownTokens ? views = [h(TabBar, {
      style: {
        paddingTop: '0px',
      },
      tabs: [
        { content: 'Search', key: SEARCH_TAB },
        { content: 'Custom', key: CUSTOM_TOKEN_TAB },
      ],
      defaultTab: this.state.displayedTab || CUSTOM_TOKEN_TAB,
      tabSelected: (key) => this.setCurrentAddTokenTab(key),
    }),
    this.tabSwitchView()] : views = [this.renderAddToken()]

    return (
      h('.flex-column.flex-grow', {
        style: {
          width: '100%',
        },
      }, [
        // subtitle and nav
      
          h('h2.page-subtitle', {
            style: {
              display: 'flex',
              justifyContent: 'Center',
              color: '#2A2A2A',
              marginTop: '26px',
              fontWeight: 'bold',
            },
          },
          [ h('img',{
            onClick: () => {
              goHome()
            },
            style: {
              position: 'absolute',
              left: '18px',
              cursor: 'pointer',
              width: '14px',
            },
            src:"/images/Assets/Close.svg",
            
          } ),
          
          'Add Token'
        
        ]),

        ...views,
      ])
    )
  }

  setCurrentAddTokenTab (key) {
    this.setState({displayedTab: key})
  }

  tabSwitchView () {
    const state = this.state
    const { displayedTab } = state
    switch (displayedTab) {
      case CUSTOM_TOKEN_TAB:
        return this.renderAddToken()
      default:
        return this.renderTabBar()
    }
  }

  renderAddToken () {
    const props = this.props
    const state = this.state
    const { warning, customAddress, customSymbol, customDecimals, customDecimalsError, autoFilled } = state
    const { network, goHome, addToken } = props
    return h('.flex-column.flex-justify-center.flex-grow.select-none', [
        warning ? h('div', {
          style: {
            margin: '20px 30px 0 30px',
          },
        }, [
          h('.error', {
            style: {
              display: 'block',
              width: '265px',
              marginLeft: '16px'
            },
          }, warning),
        ]) : null,
      h('.flex-space-around', {
        style: {
          padding: '0 46px',
        },
      }, [

        h('div', {style:{marginTop: '24px'}},[
          // h(Tooltip, {
            //   position: 'top',
            //   title: 'The contract of the actual token contract.',
            // }, [
              h('span', {
                style: { fontWeight: 'bold',fontSize: '12px',},
              }, 'Token Address' /* this.context.t('tokenAddress')*/),
              // ]),
            ]),
            
            h('section.flex-row.flex-center', [
              h('input.large-input#token-address', {
                name: 'address',
                placeholder: 'Token Contract Address',
                value: customAddress,
                style: {
                  width: '100%',
                  marginTop: '-4px',
                  border: '2px solid #c7cdd8',
                  borderRadius: '4px',
                },
                onChange: e => this.handleCustomAddressChange(e.target.value),
                  // this.addSuggestedERC20Asset(e.target.value) },
          }),
        ]),

        h('div', {style:{marginTop: '30px'}}, [
          h('span', {
            style: { fontWeight: 'bold', fontSize: '12px'},
          }, 'Token Symbol' /* this.context.t('tokenSymbol')*/),
        ]),

        h('div', { style: {display: 'flex'} }, [
          h('input.large-input#token_symbol', {
            placeholder: `Like 'XDC'`,
            value: customSymbol,
            style: {
              width: '100%',
              marginTop: '-4px',
              border: '2px solid #c7cdd8',
              borderRadius: '4px',
              onChange: e => this.handleCustomSymbolChange(e.target.value),
            },
          }),
        ]),

        h('div', {style:{marginTop: '30px'}}, [
          h('span', {
            style: { fontWeight: 'bold', fontSize: '12px' },
          }, 'Decimals of Precision' /* this.context.t('decimal')*/),
        ]),

        h('div', { style: {display: 'flex'} }, [
          h('input.large-input#token_decimals', {
            placeholder: '0',
            value: customDecimals,
            readOnly: true,
            type: 'number',
            min: 0,
            max: 36,
            // onChange: e => this.handleCustomDecimalsChange(e.target.value),
            style: {
              width: '100%',
              marginTop: '-4px',
              border: '2px solid #c7cdd8',
              borderRadius: '4px',
            },
            error: customDecimals ? customDecimalsError : null ,  
          }),
        ]),

        h('div', {
          key: 'buttons',
          style: {
            // alignSelf: 'center',
            // float: 'right',
            marginTop: '36px',
          },
        }, [
          // h('button.btn-violet', {
          //   onClick: () => {
          //     goHome()
          //   },
          // }, 'Cancel'),
          h('button', { style: {width: '265px', height: '40px'},
            onClick: (event) => {
              const valid = this.validateInputs()
              console.log("Run")
              if (!valid) return

              const { customAddress, customSymbol, customDecimals } = this.state
              addToken(customAddress.replace('xdc', '0x').trim(), customSymbol.trim(), customDecimals, network)
                .then(() => {
                  goHome()
                })
            },
          }, 'Add' /* this.context.t('addToken')*/),
        ]),
      ]),
    ])
  }

  renderTabBar () {
    const { tokenSelectorError, selectedTokens, searchResults } = this.state
    const { clearPendingTokens, goHome, network } = this.props
    return h('div', [
      h('.add-token__search-token', [
       h(TokenSearch, {
        onSearch: ({ results = [] }) => this.setState({ searchResults: results }),
        error: tokenSelectorError,
        network: network,
       }),
       h('.add-token__token-list', {
          style: {
            marginTop: '20px',
            height: '250px',
            overflow: 'auto',
          },
        }, [
          h(TokenList, {
            results: searchResults,
            selectedTokens: selectedTokens,
            network: network,
            onToggleToken: token => this.handleToggleToken(token),
          }),
        ]),
      ]),
      h('.page-container__footer', [
        h('.page-container__footer-container', [
          h('button.btn-violet', {
            onClick: () => {
              clearPendingTokens()
              goHome()
            },
          }, 'Cancel' /* this.context.t('cancel')*/),
          h('button.btn-primary', {
            onClick: () => this.handleNext(),
            disabled: !this.hasSelected(),
          }, 'Next' /* this.context.t('next')*/),
        ]),
      ]),
    ])
  }

  componentWillMount () {
    if (typeof global.ethereumProvider === 'undefined') return

    this.eth = new Eth(global.ethereumProvider)
    this.contract = new EthContract(this.eth)
    this.TokenContract = this.contract(abi)
  }

  componentWillUnmount () {
    const { displayWarning } = this.props
    displayWarning('')
  }

  componentWillUpdate (nextProps) {
    const {
      network: oldNet,
    } = this.props
    const {
      network: newNet,
    } = nextProps

    if (oldNet !== newNet) {
      this.tokenInfoGetter = tokenInfoGetter()
      this.setState({
        selectedTokens: {},
        searchResults: [],
        customAddress: '',
        customSymbol: '',
        customDecimals: '',
      })
    }
  }

  validateInputs () {
    let msg = ''
    const { network, keyrings, identities, tokens } = this.props
    const state = this.state
    const identitiesList = Object.keys(this.props.identities)
    const { customAddress: address, customSymbol: symbol, customDecimals: decimals } = state
    const standardAddress = ethUtil.addHexPrefix(address.replace('xdc', '0x')).toLowerCase()

    const validAddress = isValidAddress(address.replace('xdc', '0x'), network)
    if (!validAddress) {
      msg += 'Address is invalid. '
    }
    const customAdd = address.replace('xdc', '0x').toLowerCase();
    const check = checkExistingAddresses(customAdd, tokens)
    console.log("Check working", check)
    if (check) {
           msg += 'Token has already been added.'
    }
   

    const validDecimals = decimals >= 0 && decimals <= 36
    if (!validDecimals) {
      msg += 'Decimals must be at least 0 and not over 36. '
    }

    const symbolLen = symbol.trim().length
    const validSymbol = symbolLen > 0 
    if (!validSymbol) {
      msg += 'Symbol can not be empty.'
    }

    let ownAddress = identitiesList.includes(standardAddress)
    if (ownAddress) {
      const keyring = getCurrentKeyring(standardAddress, network, keyrings, identities)
      if (!ifContractAcc(keyring)) {
        msg = 'Personal address detected. Input the token contract address.'
      } else {
        ownAddress = false
      }
    }

    const isValid = validAddress && validDecimals && validSymbol && !ownAddress && !check

    if (!isValid) {
      this.setState({
        warning: msg,
      })
    } else {
      this.setState({ warning: null })
    }

    return isValid
  }

  handleToggleToken = (token) => {
    const { address } = token
    const { selectedTokens = {} } = this.state
    const selectedTokensCopy = { ...selectedTokens }

    if (address in selectedTokensCopy) {
      delete selectedTokensCopy[address]
    } else {
      selectedTokensCopy[address] = token
    }

    this.setState({
      selectedTokens: selectedTokensCopy,
      tokenSelectorError: null,
    })
  }

  hasError = () => {
    const {
      tokenSelectorError,
      customAddressError,
      customSymbolError,
      customDecimalsError,
    } = this.state;

    return (
      tokenSelectorError ||
      customAddressError ||
      customSymbolError ||
      customDecimalsError
    );
    // const {
    //   tokenSelectorError,
    //   customAddressError,
    //   customSymbolError,
    //   customDecimalsError,
    // } = this.state

    // return tokenSelectorError || customAddressError || customSymbolError || customDecimalsError
  }

  hasSelected = () => {
    const { customAddress = '', selectedTokens = {} } = this.state;
    return customAddress || Object.keys(selectedTokens).length > 0;
    // const { customAddress = '', customDecimals = '', customSymbol = '', selectedTokens = {} } = this.state
    // const validDecimals = this.isValidDecimals(customDecimals)
    // return (customAddress && validDecimals && customSymbol) || Object.keys(selectedTokens).length > 0
  }

  handleNext = () => {
    if (!this.hasSelected()) {
      this.setState({ tokenSelectorError: 'Must select at least 1 token.' /* this.context.t('mustSelectOne')*/ })
      return
    }

    const { setPendingTokens, network, showConfirmAddTokensPage } = this.props
    const {
      customAddress: address,
      customSymbol: symbol,
      customDecimals: decimals,
      selectedTokens,
    } = this.state

    const customToken = {
      address,
      symbol,
      decimals,
      network: network,
    }

    setPendingTokens({ customToken, selectedTokens })
    showConfirmAddTokensPage()
  }

  async attemptToAutoFillTokenParams (address) {
    const { symbol = '', decimals = '' } = await this.tokenInfoGetter(address)
    const symbolAutoFilled = Boolean(symbol);
    const decimalAutoFilled = Boolean(decimals);
    this.setState({ symbolAutoFilled, decimalAutoFilled });
    // const autoFilled = Boolean(symbol && decimals)
    // this.setState({
    //   autoFilled,
    //   warning: '',
    //   customAddressError: null,
    // })
    this.handleCustomSymbolChange(symbol || '')
    this.handleCustomDecimalsChange(decimals || '')
  }

  handleCustomAddressChange = (value) => {
    const { identities, keyrings, tokens, network } = this.props
    console.log(customAddress, ">>>>>>>>>>>>>")
    let customAddress = value.trim();
    this.setState({
      customAddress,
      customAddressError: null,
      tokenSelectorError: null,
      // autoFilled: false,
      symbolAutoFilled: false,
      decimalAutoFilled: false,
    })

    customAddress = customAddress.replace('xdc', '0x').toLowerCase();
    const validAddress = isValidAddress(customAddress, network)
    const standardAddress = ethUtil.addHexPrefix(customAddress).toLowerCase()

    let warning
    switch (true) {
      case !validAddress:
        warning = 'Invalid address'
        this.setState({
          warning,
          customAddressError: warning /* this.context.t('invalidAddress')*/,
          customSymbol: '',
          customDecimals: 0,
          customSymbolError: null,
          customDecimalsError: null,
        })

        break
      case Boolean(identities[standardAddress]):
        const keyring = getCurrentKeyring(standardAddress, network, keyrings, identities)
        if (!ifContractAcc(keyring)) {
          warning = 'Personal address detected. Input the token contract address.' /* this.context.t('personalAddressDetected')*/
          this.setState({
            warning,
            customAddressError: warning /* this.context.t('personalAddressDetected')*/,
          })
        } else {
          this.attemptToAutoFillTokenParams(customAddress)
        }
        break
      case checkExistingAddresses(customAddress,this.props.tokens):
        warning = 'Token has already been added.'
        this.setState({
          warning,
          customAddressError: warning /* this.context.t('tokenAlreadyAdded')*/,
        })

        break
      default:
        if (customAddress !== emptyAddr) {
          this.attemptToAutoFillTokenParams(customAddress)
        }
    }
  }

  handleCustomSymbolChange = (value) => {
    const customSymbol = value.trim()
    const symbolLength = customSymbol.length
    let customSymbolError = null

    if (symbolLength <= 0 ) {
      customSymbolError = 'Symbol can not be empty.' /* this.context.t('symbolBetweenZeroTen')*/
    }

    this.setState({ customSymbol, customSymbolError })
  }

  handleCustomDecimalsChange = (value) => {
    let customDecimals = Number(value && value.toString().trim())
    customDecimals = isNaN(customDecimals) ? '' : customDecimals
    const validDecimals = this.isValidDecimals(customDecimals)
    let customDecimalsError = null

    if (!validDecimals) {
      customDecimalsError = 'Decimals must be at least 0 and not over 36.' /* this.context.t('decimalsMustZerotoTen')*/
    }

    this.setState({ customDecimals, customDecimalsError })
  }

  

  /**
   * Returns validity status of token decimals
   *
   * @param {number} customDecimals A token decimals number to validate
   * @returns {boolean} The status of validatity of token decimals
   *
   */
  isValidDecimals = (customDecimals) => {
    const validDecimals = customDecimals !== null &&
      customDecimals !== '' &&
      customDecimals >= 0 &&
      customDecimals <= 36
    return validDecimals
  }
}

module.exports = AddTokenScreen
