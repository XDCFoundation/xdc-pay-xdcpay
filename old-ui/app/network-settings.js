const connect = require('react-redux').connect
const actions = require('../../ui/app/actions')
const React = require('react')

class NetworkSettings extends React.Component {

  onDeleteRPCNetwork = (networkObj) => {
    const state = this.props
    state.dispatch(actions.delRpcTarget(networkObj))
  }

  render () {
    const state = this.props
    const networkList = state.metamask.networkList
    const frequentRPCList = state.metamask.frequentRpcList
    const netList = [...networkList, ...frequentRPCList]
    return (
      <div className="flex-column flex-grow" style={{
        maxHeight: '585px',
        overflowY: 'auto',
      }}>
        <div className="section-title flex-row" style={{borderBottom: '1px solid #E3E7EB', paddingBottom: '17px'}}>
          <img src="/images/Assets/BackArrow.svg" style={{marginLeft: '12px', cursor: 'pointer'}} onClick={() => {
            state.dispatch(actions.goConfig())
          }}/>
          <h2 style={{marginLeft: '80px', fontFamily: 'Inter-bold'}}>Network Settings</h2>
          <img src="/images/Assets/Add.svg" style={{cursor: 'pointer', position: 'absolute', right: '21px'}}
               onClick={() => {
                 state.dispatch(actions.showAddNetworkPage())
               }}/>
        </div>
        {netList.map((networkObj) =>
          
          <div style={{
            padding: ' 11px 17px 11px 13px ',
            borderBottom: '1px solid #E3E7EB',
            fontFamily: 'inter-medium',
            fontSize: '14px',
          }} key={networkObj.chainId}>  <svg height="16px" width="26px" position="absolute" left="17px">
              <circle style={{ cx: '10' ,cy:"10", r:"6" , fill:networkObj.colorCode ? networkObj.colorCode : '#E58A0F' }} key={networkObj.isPermanent}/>
       </svg>  {networkObj.name}
            <img src={networkObj.isPermanent ? '/images/Assets/Lock.svg' : '/images/Assets/Delete.svg'}
                 style={{position: 'absolute', right: '30px', cursor: networkObj.isPermanent ? 'normal' : 'pointer'}}
                 onClick={() => !networkObj.isPermanent && this.onDeleteRPCNetwork(networkObj)}/>
            <img src="/images/Assets/Arrow.svg" onClick={() => state.dispatch(actions.viewNetwork(networkObj))}
              style={{ position: 'absolute', right: '15px', marginTop: '6px', cursor: 'pointer' }} />
           
          </div>)
        }
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    metamask: state.metamask,
    warning: state.appState.warning,
  }
}

module.exports = connect(mapStateToProps)(NetworkSettings)
