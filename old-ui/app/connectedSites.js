const connect = require('react-redux').connect
const actions = require('../../ui/app/actions')
const React = require('react')

class ConnectedSites extends React.Component {

  

  render () {
    const state = this.props
   
    return (
      <div className="flex-column flex-grow" style={{
        maxHeight: '585px',
        overflowY: 'auto',
      }}>
        <div className="section-title flex-row" style={{borderBottom: '1px solid #E3E7EB', paddingBottom: '17px'}}>
          <img src="/images/Assets/BackArrow.svg" style={{marginLeft: '12px', cursor: 'pointer'}} onClick={() => {
            state.dispatch(actions.goHome())
          }}/>
          <h2 style={{marginLeft: '80px', fontFamily: 'Inter-bold'}}>Connected Sites</h2>
           
          </div>

          <div style={{
          padding: ' 11px 17px 11px 13px ',
          borderBottom: '1px solid #E3E7EB',
          fontFamily: 'inter-medium',
          fontSize: '14px',
        }}  >
          <img src={'/images/Assets/Delete.svg'} style={{ position: 'absolute', left: '18px', top: '112px', cursor: 'pointer' }} />

          <div style={{marginLeft: '40px' }} ><h1>XDCVoting.com</h1></div>
          
          <img src={'/images/Assets/Delete.svg'} style={{ position: 'absolute', right: '30px', top: '112px', cursor: 'pointer' }} />
        </div>

        <div style={{
          padding: ' 11px 17px 11px 13px ',
          borderBottom: '1px solid #E3E7EB',
          fontFamily: 'inter-medium',
          fontSize: '14px',
        }}  >
          <img src={'/images/Assets/Delete.svg'} style={{ position: 'absolute', left: '18px', top: '158px', cursor: 'pointer' }} />

          <div style={{marginLeft: '40px' }} ><h1>opensea.io</h1></div>
          
          <img src={'/images/Assets/Delete.svg'} style={{ position: 'absolute', right: '30px', top: '158px', cursor: 'pointer' }} />
        </div>

        <div style={{
          padding: ' 11px 17px 11px 13px ',
          borderBottom: '1px solid #E3E7EB',
          fontFamily: 'inter-medium',
          fontSize: '14px',
        }}  >
          <img src={'/images/Assets/Delete.svg'} style={{ position: 'absolute', left: '18px', top: '204px', cursor: 'pointer' }} />

          <div style={{marginLeft: '40px' }} ><h1>app.uniswap.com</h1></div>
          
          <img src={'/images/Assets/Delete.svg'} style={{ position: 'absolute', right: '30px', top: '204px', cursor: 'pointer' }} />
        </div>
        
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

module.exports = connect(mapStateToProps)(ConnectedSites)
