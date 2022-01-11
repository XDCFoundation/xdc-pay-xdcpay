// const connect = require('react-redux').connect
// const actions = require('../../ui/app/actions')
// const React = require('react')

// class NetworkSettings extends React.Component {

//   onDeleteRPCNetwork = (networkObj) => {
//     const state = this.props
//     state.dispatch(actions.delRpcTarget(networkObj))
//     if (state.metamask.network === networkObj.chainId) {
//       state.dispatch(actions.setProviderType('xdc'))
//     }
//   }

//   render () {
//     const state = this.props
//     const networkList = state.metamask.networkList
//     const frequentRPCList = state.metamask.frequentRpcList
//     const netList = [...networkList, ...frequentRPCList]
//     return (
//       <div className="flex-column flex-grow" style={{
//         maxHeight: '585px',
//         overflowY: 'auto',
//       }}>
//         <div className="section-title flex-row" style={{borderBottom: '1px solid #E3E7EB', paddingBottom: '17px'}}>
//           <img src="/images/Assets/BackArrow.svg" style={{marginLeft: '12px', cursor: 'pointer'}} onClick={() => {
//             state.dispatch(actions.goConfig())
//           }}/>
//           <h2 style={{marginLeft: '80px', fontFamily: 'Inter-bold'}}>Network Settings</h2>
//           <img src="/images/Assets/Add.svg" style={{cursor: 'pointer', position: 'absolute', right: '21px'}}
//                onClick={() => {
//                  state.dispatch(actions.showAddNetworkPage())
//                }}/>
//         </div>
//         {netList.map((networkObj) =>

//           <div style={{
//             padding: ' 11px 17px 11px 13px ',
//             borderBottom: '1px solid #E3E7EB',
//             fontFamily: 'inter-medium',
//             fontSize: '14px',
//           }} key={networkObj.chainId}>  <svg height="16px" width="26px" position="absolute" left="17px">
//               <circle style={{ cx: '10' ,cy:"10", r:"6" , fill:networkObj.colorCode ? networkObj.colorCode : '#E58A0F' }} key={networkObj.isPermanent}/>
//        </svg>  {networkObj.name}
//             <img src={networkObj.isPermanent ? '/images/Assets/Lock.png' : '/images/Assets/Delete.svg'}
//                  style={{position: 'absolute', right: '30px', cursor: networkObj.isPermanent ? 'normal' : 'pointer'}}
//                  onClick={() => !networkObj.isPermanent && this.onDeleteRPCNetwork(networkObj)}/>
//             <img src="/images/Assets/Arrow.svg" onClick={() => state.dispatch(actions.viewNetwork(networkObj))}
//               style={{ position: 'absolute', right: '15px', marginTop: '6px', cursor: 'pointer' }} />

//           </div>)
//         }
//       </div>
//     )
//   }
// }

// function mapStateToProps (state) {
//   return {
//     metamask: state.metamask,
//     warning: state.appState.warning,
//   }
// }

// module.exports = connect(mapStateToProps)(NetworkSettings)





const connect = require('react-redux').connect
const actions = require('../../ui/app/actions')
const React = require('react')
const CopyButton = require('./components/copy/copy-button')

const { toChecksumAddress } = require('./util')



class NetworkSettings extends React.Component {

  onDeleteRPCNetwork = (networkObj) => {
    const state = this.props
    state.dispatch(actions.delRpcTarget(networkObj))
    if (state.metamask.network === networkObj.chainId) {
      state.dispatch(actions.setProviderType('xdc'))
    }
  }

  render() {

    function shorten(b, amountL = 7, /*amountR = 4,*/ stars = 3) {

      return `${b.slice(0, amountL)}${'.'.repeat(stars)}${b.slice(
        b.length - 4,

        b.length,
      )}`
    }
    var props = this.props
    const { network, conversionRate, currentCurrency, networkList } = props
    var selected = props.address || Object.keys(props.accounts)[0]
    var checksumAddress = selected && toChecksumAddress(network, selected)



    return (
      <div className="flex-column flex-grow" style={{
        maxHeight: '585px',
        overflowY: 'auto',
      }}>
        <div style={{ paddingBottom: '17px'}}>
          <div className="section-title flex-row" style={{ justifyContent: 'space-between', width: '64%' }}>
            <div> <img src="/images/Assets/BackArrow.svg" style={{ marginLeft: '25px', marginTop:'14', cursor: 'pointer' }} onClick={() => {
              state.dispatch(actions.goConfig())
            }} />
            </div>
            <div>
              <div style={{ fontFamily: 'Inter-Medium', marginLeft: '30px', fontSize: '14px', color: '#1F1F1F' }}>Sent</div>

              <div className='trasaction-details-from-to' style={{ display: 'flex' }}> {shorten(checksumAddress)}
                <CopyButton value={checksumAddress} isWhite={true} />
              </div>
            </div>
          </div>
        </div>

        <h2 style={{ marginLeft: '17px', color: '#2149B9', opacity: '1', fontSize:'14' }}>Details</h2>

        {/* flexbox */}

        <div style={{
          backgroundColor: '#FAFAFA',
          padding: '8px 12px',
          margin: '10px 15px',
          display: 'block'
        }}>
          <div className='trasaction-details-from-to'>From</div>
          <div className='trasaction-details-from-to-accounts'>{shorten(checksumAddress)}</div>
          <img src="/images/Assets/DownArrow.svg" />
          <div className='trasaction-details-from-to'>To</div>
          <div className='trasaction-details-from-to-accounts'>Alexa Appleseed</div>
        </div>

        {/* all trasaction details  */}

        <div style={{ paddingBottom: '17px', borderBottom: '1px solid #E3E7EB' }}>
          <div className='trasaction-details-amount'>
            <div style={{ marginLeft: '17px' }}>Amount</div>
            <div style={{ marginLeft: '170px' }}>100.00</div>
            <h1 style={{color: '#848484'}}>XDC</h1>
          </div></div>

        <div style={{ paddingBottom: '17px', borderBottom: '1px solid #E3E7EB' }}>
          <div className='trasaction-details-amount'>
            <div style={{ marginLeft: '16px' }}>Gas Limit</div>
            <div>21000</div>
          </div></div>

          <div style={{ paddingBottom: '17px', borderBottom: '1px solid #E3E7EB' }}>
          <div className='trasaction-details-amount'>
            <div style={{ marginLeft: '16px' }}>Gas Price (GWEI)</div>
            <div>1.00</div>
          </div></div>

          <div style={{ paddingBottom: '17px', borderBottom: '1px solid #E3E7EB' }}>
          <div className='trasaction-details-amount'>
            <div style={{ marginLeft: '16px' }}>Total</div>
            <div style={{ marginLeft: '200px' }}>101.00 </div>
            <h1 style={{color: '#848484'}}>XDC</h1>
          </div></div>

          <h2 style={{ marginLeft: '17px', marginTop: '25px', color:'#2149B9', opacity: '1', fontSize:'14', width:'91%', paddingBottom:'11px', borderBottom:'1px solid #E3E7EB' }}>Transaction Log</h2>
      
      <div style={{fontSize: '12px', padding: '6px 6px 50px 6px' }}>

        <div style={{ display:'flex'}}>
        <div style={{display: 'flex', flexDirection: 'column'}} >
        <img style={{ marginRight:'10px'}} src="/images/Assets/TransactionCreated.svg"/>
        <div className='vl' ></div>
        </div>
        <div> Transaction created with a value of 100 XDC at 16:29 on 10/11/2021.</div>
        </div>
        <div style={{ display:'flex'}}>
        <div style={{display: 'flex', flexDirection: 'column'}} >
        <img style={{ marginRight:'10px'}} src="/images/Assets/TransactionCreated.svg"/>
        <div className='vl' ></div>
        </div>
        <div> trasaction submitted with estimated gas fee of 1.00 GWEI at 16.29 on 10/11/2021. </div>
        </div>

        <div style={{ display:'flex'}}>
        <div style={{display: 'flex', flexDirection: 'column'}} >
        <img style={{ marginRight:'10px'}} src="/images/Assets/TransactionCreated.svg"/>
        </div>
        <div> trasaction confirmed at 16:30 on 10/11/2021. </div>
        </div>
      </div>



      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    metamask: state.metamask,
    warning: state.appState.warning,
    address: state.metamask.selectedAddress,
    network: state.metamask.network,
  }
}

module.exports = connect(mapStateToProps)(NetworkSettings)

