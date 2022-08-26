import React from 'react'

const AddNetworkComponent = (props) => {
  // eslint-disable-next-line react/prop-types
  const {onBackClick, onStateChange, onAddNetworkClicked, warningMsg, viewNetworkObj, state, t,detailObj} = props
  const {networkName, rpcUrl, chainId, currencySymbol, explorerLink} = state
 var networkObj = viewNetworkObj
  !networkObj ? networkObj = detailObj : networkObj
  const isPermanentNetwork = networkObj && networkObj.isPermanent
  return (
    <div className="flex-column flex-grow" style={{maxHeight: '585px', overflowY: 'auto'}}>
      <div className="section-title flex-row " style={{borderBottom: '1px solid #E3E7EB', paddingBottom: '17px',display:'flex', justifyContent:'center'}}>
        <img src="/images/Assets/BackArrow.svg" style={{position:'absolute',left: 20 , cursor: 'pointer'}} onClick={onBackClick}/>
        <h2 style={{fontFamily: 'Inter-bold'}}>{`${networkObj ? 'View' : 'Add'} Network`}</h2>
      </div>
      <div style={{margin: '20px 50px'}} className='addNetworkExpand' >
        <div className="word" style={{fontFamily: 'Inter-Medium',marginTop:"0px",marginBottom:"-5px"}}>{`${t('networkName')}`}</div>
        
        <div className='addNetworkFields' style={{marginBottom: '28px', border: '1px solid #C7CDD8', borderRadius: '4px'}}>
          <input disabled={isPermanentNetwork} autoComplete='off' className="input large-input" type="text" name="networkName"
                 value={networkName}
                 onChange={onStateChange} maxLength={24} style={{border: 'none', color: '#2A2A2A', width: '100%'}}/>
        </div>
        <div className="word" style={{fontFamily: 'Inter-Medium',marginTop:"0px",marginBottom:"-5px"}}>New RPC URL</div>
        
        <div className='addNetworkFields' style={{
          marginBottom: "28px",
          border: '1px solid #C7CDD8',
          borderRadius: '4px',
          
        }}>
          <input disabled={isPermanentNetwork} autoComplete='off' className="input large-input" id="new_rpc" type="text" name="rpcUrl"
                 value={rpcUrl}
                 onChange={onStateChange} style={{border: 'none', color: '#2A2A2A', width: '100%'}}/>
        </div>
        <div className="word" style={{fontFamily: 'Inter-Medium',marginTop:"0px",marginBottom:"-5px"}}>{`${t('chainID')}`}</div>
        
        <div className='addNetworkFields' style={{marginBottom: '28px', border: '1px solid #C7CDD8', borderRadius: '4px'}}>
          <input disabled={isPermanentNetwork} autoComplete='off' className="input large-input" type="number"
                 style={{border: 'none', color: '#2A2A2A', width: '100%'}}
                 name="chainId" onChange={onStateChange} value={chainId}/>
        </div>
        <div className="word" style={{fontFamily: 'Inter-Medium',marginTop:"0px",marginBottom:"-5px"}}>{`${t('currencySymbol')}`} </div>
        
        <div className='addNetworkFields' style={{marginBottom: '28px', border: '1px solid #C7CDD8', borderRadius: '4px'}}>
          <input disabled={isPermanentNetwork} autoComplete='off' className="input large-input" type="text"
                 style={{border: 'none', color: '#2A2A2A', width: '100%'}}
                 name="currencySymbol" onChange={onStateChange} value={currencySymbol}/>
        </div>
        <div className="word" style={{fontFamily: 'Inter-Medium',marginTop:"0px",marginBottom:"-5px"}}>{`${t('blockExplorer')}`} </div>
        
        <div className='addNetworkFields' style={{marginBottom: '2px', border: '1px solid #C7CDD8', borderRadius: '4px'}}>
          <input disabled={isPermanentNetwork} autoComplete='off' className="input large-input" type="text"
                 style={{border: 'none', color: '#2A2A2A', width: '100%'}}
                 name="explorerLink" onChange={onStateChange} value={explorerLink}/>
        </div>
        <div style={{height:'45px',marginBottom:'2px',display:'flex', justifyContent: 'center', alignItems: 'center'}}>
          {warningMsg && <div className="error" style={{width:'265px' ,marginBottom:'0px'}}>{warningMsg}</div>}
        </div>
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
                  //  marginRight: '-8px',

                 }}
                 onClick={(event) => {
                   event.preventDefault()
                   onAddNetworkClicked(!!networkObj)
                 }}
            >{`${networkObj ? 'Update' : 'Add'}`}
            </div>
          </div>}
      </div>
    </div>
  )
}
module.exports = AddNetworkComponent
