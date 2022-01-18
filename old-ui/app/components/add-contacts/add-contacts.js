import { config } from 'bluebird'
import React from 'react'
import { setGasPrice } from '../../../../ui/app/actions'
const actions = require('../../../../ui/app/actions')


const AddContactComponent = (props) => {
  // eslint-disable-next-line react/prop-types
  const { onStateChange, onAddContactClicked, warningMsg, onBackClick, t,viewContactObj,onDeleteClicked, state } = props

  const { contactAddress, contactName } = state
  
  return (
    <div
      className="flex-column flex-grow"
      style={{maxHeight: '585px', overflowY: 'auto'}}
    >
      <div
        className="section-title flex-row"
        style={{
          justifyContent: 'space-between',
          borderBottom: '1px solid #E3E7EB',
          paddingBottom: '17px',
        }}
      >
        <img
          src="/images/Assets/BackArrow.svg"
          style={{marginLeft: '17px', cursor: 'pointer'}}
          onClick={onBackClick}
        />
        <h2 style={{fontFamily: 'Inter-bold', fontSize:'15px', marginLeft:'28px'}}>
          {`${viewContactObj ? 'Edit' : 'Add'} Contact`}
        </h2>
        <h2 style={{color:'#FF0035', fontSize:'15px' , fontFamily:"Inter-Medium", marginRight:'15px', cursor:'pointer'}}  onClick={() => onDeleteClicked(viewContactObj)}>
        {`${viewContactObj ? 'Delete' : ' '}`}
        </h2>
      </div>
      {warningMsg && <div className="error">{warningMsg}</div>}
      <div style={{margin: '25px 42px'}}>
        <label className="word" style={{fontFamily: 'Inter-Medium'}}>
          {`Wallet Address`}
        </label>
        <br/>
        <div
          style={{
            marginBottom: '24px',
            border: '1px solid #C7CDD8',
            borderRadius: '4px',
          }}
        >
          <input
            className="input large-input"
            type="text"
            name="contactAddress"
            value={contactAddress}
            placeholder="Contact's Wallet Address"
            onChange={onStateChange}
            style={{width: '252px', border: 'none', color: '#2A2A2A'}}
          />
          <img
            src="/images/Assets/Scan.svg"
            style={{position: 'absolute', right: '49px', top: '161px'}}
          />
        </div>
        <label className="word" style={{fontFamily: 'Inter-Medium'}}>
          {`Username`}
        </label>
        <br/>
        <div
          style={{
            marginBottom: '24px',
            border: '1px solid #e2e2e2',
            borderRadius: '4px',
          }}
        >
          <input
            className="input large-input"
            placeholder="Contact's Name"
            type="text"
            name="contactName"
            value={contactName}
            onChange={onStateChange}
            style={{width: '265px', border: 'none', color: '#2A2A2A'}}
          />
        </div>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <div
            className="button"
            // onClick={onBackClick}
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
            }}
            onClick={() => {
            onBackClick()
            }}
          >
            {`${ t('cancel')}`}

          </div>

          <div
            className="button"
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
            }}
            onClick={(event) => {
              event.preventDefault()
              onAddContactClicked(!!viewContactObj)
            }}
          >
          {`${!!viewContactObj ? 'Update' : 'Add'}`}
          </div>
        </div>
      </div>
    </div>
  )
}

module.exports = AddContactComponent
