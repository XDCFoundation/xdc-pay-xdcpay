const inherits = require('util').inherits
const Component = require('react').Component
const h = require('react-hyperscript')
const connect = require('react-redux').connect
const actions = require('../../ui/app/actions')
const { checkExistingAddresses } = require('./components/add-token/util')
const Tooltip = require('./components/tooltip.js')
const ethUtil = require('ethereumjs-util')
const Copyable = require('./components/copy/copyable')
const {addressSummary, toChecksumAddress, isValidAddress} = require('./util')


module.exports = connect(mapStateToProps)(AddSuggestedTokenScreen)

function mapStateToProps (state) {
  return {
    identities: state.metamask.identities,
    suggestedTokens: state.metamask.suggestedTokens,
    tokens: state.metamask.tokens,
  }
}

inherits(AddSuggestedTokenScreen, Component)

function AddSuggestedTokenScreen () {
  this.state = {
    warning: null,
  }
  Component.call(this)
}

AddSuggestedTokenScreen.prototype.render = function () {
  const {warning} = this.state
  const {network, suggestedTokens, dispatch} = this.props
  const key = Object.keys(suggestedTokens)[0]
  const {address, symbol, decimals} = suggestedTokens[key]

  return (
    h('.flex-column.flex-grow', [

      // subtitle and nav
      h('.section-title.flex-row.flex-center', [
        h('h2.page-subtitle',{ style: {
          display: 'flex',
          justifyContent: 'Center',
          color: '#2A2A2A',
          marginTop: '4px',
          fontWeight: 'bold',
        },
      }, 'Add Suggested Token' ),
      ]),

      h('.error', {
        style: {
          display: warning ? 'block' : 'none',
          padding: '0 20px',
          textAlign: 'center',
        },
      }, warning),

      // conf view
      h('.flex-column.flex-justify-center.flex-grow.select-none', [
        h('.flex-space-around', {
          style: {
            padding: '20px 48px 0 50px',
          },
        }, [

          h('div', 
                [
                h('span',{
                  style: { fontWeight: 'bold',fontSize: '12px',},
                }, 'Token Contract Address  '),
                
              ]),
            
          // ),

          h('div', {
            style: {display: 'flex',margin:'8px 0 17px 0'},
          }, [
            h(Copyable, {
              value: toChecksumAddress(network, address),
            }, [
              h('span#token-address', {
                style: {
                  width: '100%',
                  border: '2px solid #c7cdd8',
                  borderRadius: '4px',
                  padding:'4px',
                },
              }, addressSummary(network, address, 24, 4, false)),
            ]),
          ]),

          h('div', [
            h('span', {
              style: { fontWeight: 'bold',fontSize: '12px',},
            }, 'Token Symbol'),
          ]),

          h('div', {style: {display: 'flex',margin:'4px 0 17px 0'}}, [
            h('p#token_symbol', {
              style: {
                width: '100%',
                border: '2px solid #c7cdd8',
                borderRadius: '4px',
                padding: '4px',
              },
            }, symbol),
          ]),

          h('div', [
            h('span', {
              style: { fontWeight: 'bold',fontSize: '12px',},
            }, 'Decimals of Precision'),
          ]),

          h('div', {style: {display: 'flex',margin:'4px 0 17px 0'}}, [
            h('p#token_decimals', {
              type: 'number',
              style: {
              width: '100%',
              border: '2px solid #c7cdd8',
                borderRadius: '4px',
              padding:'4px'
              },
            }, decimals),
          ]),
          h('div', { style: { display: 'flex', justifyContent: 'space-between',marginTop:'42px' } }, [
            
            h('button', {
              style: {
                alignSelf: 'center',
                backgroundColor: 'red',
                width: '120px',
              height: '40px',
              },
              onClick: (event) => {
                dispatch(actions.removeSuggestedTokens())
              },
            }, 'Cancel'),
            
            h('button', {
              style: {
                alignSelf: 'center',
                width: '120px',
              height: '40px',
              },
              onClick: (event) => {
                const valid = this.validateInputs({ address, symbol, decimals })
                if (!valid) return
                
                dispatch(actions.addToken(address.trim(), symbol.trim(), decimals))
                .then(() => {
                  dispatch(actions.removeSuggestedTokens())
                })
              },
            }, 'Add'),
          ]),
          ]),
        ]),
    ])
  )
}

AddSuggestedTokenScreen.prototype.componentWillMount = function () {
  if (typeof global.ethereumProvider === 'undefined') return
}

AddSuggestedTokenScreen.prototype.validateInputs = function (opts) {
  const { network, identities,tokens } = this.props
  let msg = ''
  const identitiesList = Object.keys(identities)
  const { address, symbol, decimals } = opts
  const standardAddress = ethUtil.addHexPrefix(address).toLowerCase()

  const validAddress = isValidAddress(address, network)
  if (!validAddress) {
    msg += 'Address is invalid.'
  }
  
  const check = checkExistingAddresses(address, tokens)
  console.log("Check working", check,tokens,address)
  if (check) {
    msg += 'Token has already been added.'
  }
  const validDecimals = decimals >= 0 && decimals < 36
  if (validDecimals) {
    msg += 'Decimals must be at least 0 and not over 36. '
  }

  const symbolLen = symbol.trim().length
  const validSymbol = symbolLen > 0
  // && symbolLen < 10
  if (!validSymbol) {
    // msg += ' ' + 'Symbol must be between 0 and 10 characters.'
    msg += ' ' + 'Symbol can not be empty. '
  }

  const ownAddress = identitiesList.includes(standardAddress)
  if (ownAddress) {
    msg = 'Personal address detected. Input the token contract address.'
  }

  const isValid = validAddress && validDecimals && !ownAddress

  if (!isValid) {
    this.setState({
      warning: msg,
    })
  } else {
    this.setState({ warning: null })
  }

  return isValid

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
    case checkExistingAddresses(address, this.props.tokens):
      warning = 'Token has already been added.'
      this.setState({
        warning,
        customAddressError: warning /* this.context.t('tokenAlreadyAdded')*/,
      })
  
      break
  }
}

