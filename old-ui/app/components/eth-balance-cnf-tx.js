const Component = require('react').Component
const h = require('react-hyperscript')
const inherits = require('util').inherits
const formatBalance = require('../util').formatBalance
const generateBalanceObject = require('../util').generateBalanceObject
const Tooltip = require('./tooltip.js')
const FiatValue = require('./fiat-value1.js')

module.exports = EthBalanceComponent

inherits(EthBalanceComponent, Component)
function EthBalanceComponent () {
  Component.call(this)
}

EthBalanceComponent.prototype.render = function () {
  var props = this.props
  let { value } = props
  const { style, width, network, isToken, tokenSymbol } = props
  var needsParse = this.props.needsParse
    // !== undefined ? this.props.needsParse : true
  value = value ? formatBalance(value, 6, needsParse, network, isToken, tokenSymbol) : '...'

  return (

    h('.ether-balance.ether-balance-amount', {
      style: {
        border: '2px solid #C7CDD8',
        borderRadius: '4px',
        height: '32px',
        width: '265px',
        padding: '10px',
        marginBottom:'8px'
    },
    }, [
      h('div', {
        style: {
          display: 'inline',
          width,
        },
      }, this.renderBalance(value)),
    ])

  )
}
EthBalanceComponent.prototype.renderBalance = function (value) {
  var props = this.props
  const { conversionRate, shorten, incoming, currentCurrency } = props
  if (value === 'None') return value
  if (value === '...') return value
  var balanceObj = generateBalanceObject(value, shorten ? 1 : 3)
  var balance
  var splitBalance = value.split(' ')
  var ethNumber = splitBalance[0]
  var ethSuffix = splitBalance[1]
  const showFiat = 'showFiat' in props ? props.showFiat : true

  if (shorten) {
    balance = balanceObj.shortBalance
  } else {
    balance = balanceObj.balance
  }

  var label = balanceObj.label
  const valueStyle = props.valueStyle ? props.valueStyle : {
    color: '#848484',
    width: '100%',
    fontSize: props.fontSize || '12px',
    textAlign: 'right',
  }
  const dimStyle = props.dimStyle ? props.dimStyle : {
    color: ' #848484',
    fontSize: props.fontSize || '12px',
    marginLeft: '5px',
  }

  return (
    h(Tooltip, {
      position: 'bottom',
      title: `${ethNumber} ${ethSuffix}`,
    }, h('div', {style:{display: 'flex', justifyContent: 'space-between'}}, [
      h('.flex-row', {
        style: {
        //   alignItems: 'flex-end',
        //   textRendering: 'geometricPrecision',
        // position: 'absolute',
        // right : '48px',
        },
      }, [
        h('div', {
          style: valueStyle,
        }, incoming ? `+${balance}` : balance),
        h('div', {
          style: dimStyle,
        }, label),
      ]),

      showFiat ? h(FiatValue, { valueStyle, dimStyle, value: props.value, conversionRate, currentCurrency, network: props.network }) : null,
    ]))
  )
}
