import React from 'react'

const AddNetworkComponent = (props) => {
  // eslint-disable-next-line react/prop-types
  const {onBackClick, onStateChange, onAddNetworkClicked, warningMsg, viewNetworkObj, state, t} = props
  const {networkName, rpcUrl, chainId, currencySymbol, explorerLink} = state

  const isPermanentNetwork = viewNetworkObj && viewNetworkObj.isPermanent

  return (
    <div className="flex-column flex-grow" style={{maxHeight: '585px', overflowY: 'auto'}}>
      <div className="section-title flex-row" style={{borderBottom: '1px solid #E3E7EB', paddingBottom: '17px'}}>
        <img src="/images/Assets/BackArrow.svg" style={{marginLeft: '12px', cursor: 'pointer'}} onClick={onBackClick}/>
        <h2 style={{marginLeft: '88px', fontFamily: 'Inter-bold'}}>{`${viewNetworkObj ? 'View' : 'Add'} Network`}</h2>
      </div>
      <div style={{margin: '18px 50px'}}>
        <label className="word" style={{fontFamily: 'Inter-Medium'}}>Network Name</label>
        <br/>
        <div style={{marginBottom: '24px', border: '1px solid #C7CDD8', borderRadius: '4px', width: '265px'}}>
          <input disabled={isPermanentNetwork} className="input large-input" type="text" name="networkName"
                 value={networkName}
                 onChange={onStateChange} style={{border: 'none', color: '#2A2A2A', width: '260px'}}/>
        </div>
        <label className="word" style={{fontFamily: 'Inter-Medium'}}>New RPC URL</label>
        <br/>
        <div style={{
          marginBottom: warningMsg ? '12px' : '24px',
          border: '1px solid #C7CDD8',
          borderRadius: '4px',
          width: '265px',
        }}>
          <input disabled={isPermanentNetwork} className="input large-input" id="new_rpc" type="text" name="rpcUrl"
                 value={rpcUrl}
                 onChange={onStateChange} style={{border: 'none', color: '#2A2A2A', width: '260px'}}/>
        </div>
        <label className="word" style={{fontFamily: 'Inter-Medium'}}>Chain ID</label>
        <br/>
        <div style={{marginBottom: '24px', border: '1px solid #C7CDD8', borderRadius: '4px', width: '265px'}}>
          <input disabled={isPermanentNetwork} className="input large-input" type="number"
                 style={{border: 'none', color: '#2A2A2A', width: '260px'}}
                 name="chainId" onChange={onStateChange} value={chainId}/>
        </div>
        <label className="word" style={{fontFamily: 'Inter-Medium'}}>Currency Symbol (Optional)</label>
        <br/>
        <div style={{marginBottom: '24px', border: '1px solid #C7CDD8', borderRadius: '4px', width: '265px'}}>
          <input disabled={isPermanentNetwork} className="input large-input" type="text"
                 style={{border: 'none', color: '#2A2A2A', width: '260px'}}
                 name="currencySymbol" onChange={onStateChange} value={currencySymbol}/>
        </div>
        <label className="word" style={{fontFamily: 'Inter-Medium'}}>Block Explorer (Optional)</label>
        <br/>
        <div style={{marginBottom: '14px', border: '1px solid #C7CDD8', borderRadius: '4px', width: '265px'}}>
          <input disabled={isPermanentNetwork} className="input large-input" type="text"
                 style={{border: 'none', color: '#2A2A2A', width: '260px'}}
                 name="explorerLink" onChange={onStateChange} value={explorerLink}/>
        </div>
        {warningMsg && <div className="error">{warningMsg}</div>}
        {isPermanentNetwork ? '' :
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div className="button" onClick={onBackClick}
                 style={{
                   fontFamily: 'Inter-Medium',
                   display: 'flex',
                   justifyContent: 'center',
                   alignItems: 'center',
                   fontSize: '14px',
                   background: '#E3E7EB',
                   width: '120px',
                   height: '40px',
                   border: 'none',
                   color: '#2a2a2a',
                 }}> {`Cancel`}
            </div>

            <div className="button"
                 style={{
                   fontFamily: 'Inter-Medium',
                   display: 'flex',
                   justifyContent: 'center',
                   alignItems: 'center',
                   fontSize: '14px',
                   background: '#03BE46',
                   width: '120px',
                   height: '40px',
                   border: 'none',
                   marginRight: '-6px',

                 }}
                 onClick={(event) => {
                   event.preventDefault()
                   onAddNetworkClicked(!!viewNetworkObj)
                 }}
            >{`${viewNetworkObj ? 'Update' : 'Add'}`}
            </div>
          </div>}
      </div>
    </div>
  )
}
module.exports = AddNetworkComponent
