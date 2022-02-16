const Component = require('react').Component
const h = require('react-hyperscript')
const inherits = require('util').inherits
const ethNetProps = require('xdc-net-props')
const { networks } = require('../../../app/scripts/controllers/network/util')
// const { rcpName } = require(ui/app/actions)
module.exports = Network

inherits(Network, Component)

function Network() {
  Component.call(this)
}

Network.prototype.render = function () {
  const props = this.props
  const { provider, network: networkNumber, networkList, frequentRpcList } = props
  let displayName, hoverText
    
  if (provider.type === 'rpc' && frequentRpcList  ) {
    displayName = frequentRpcList.find((netObj) => netObj.rpcURL === provider.rpcTarget) ? frequentRpcList.find((netObj) => netObj.rpcURL === provider.rpcTarget).name : ''
    hoverText = `Private Network (${provider.rpcTarget})`
  } else if(networkList) {
    displayName = networkList.find((netObj) => netObj.providerType === provider.type) ? networkList.find((netObj) => netObj.providerType === provider.type).name : ''
    hoverText = ethNetProps.props.getNetworkDisplayName(networkList.find((netObj) => netObj.providerType === provider.type).chainId)
  }
  if (networkNumber === 'loading') {
    return h('span.pointer', {
      className: props.onClick && 'pointer',
      style: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
      },
      onClick: (event) => props.onClick && props.onClick(event),
    }, [
      props.onClick && h('img', {
        title: 'Attempting to connect to blockchain.',
        style: {
          width: '27px',
        },
        src: 'images/loading.svg',
      }),
      h('img', { className: '', src: "/images/Assets/DownArrow.svg" }),
    ])
  }

  return (
    h('#network_component', {
      className: props.onClick && 'pointer',
      title: hoverText,
      onClick: (event) => props.onClick && props.onClick(event),
    }, [
      (function () {
        return h(props.isUnlocked ? '.network-indicator' : '.network-indicator.hidden', [
          h('.network-name',
            displayName),
          props.onClick && h('img', { className: '', src: "/images/Assets/DownArrow.svg" }),
        ])
      })(),
    ])
  )
}
