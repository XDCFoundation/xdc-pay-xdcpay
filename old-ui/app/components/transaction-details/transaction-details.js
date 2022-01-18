
const connect = require('react-redux').connect
const actions = require('../../../../ui/app/actions')
const React = require('react')
const CopyButton = require('../../components/copy/copy-button')
const { toChecksumAddress } = require('../../util')


class TransactionDetails extends React.Component {


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


    const {
      transactions,
    } = this.props
    // const currentContactTxn = transactions.filter((txnObj) => txnObj.txReceipt.to === address)
    const To = transactions[5].txParams.to
    const Gas = transactions[0].txParams.gas
    const Value = transactions[0].txParams.value
    // const To = transactions.filter((txnObj) => txnObj.txParams.to === transaction,selected)
    console.log(To, '//')


    return (
      <div className="flex-column flex-grow" style={{
        maxHeight: '585px',
        overflowY: 'auto',
      }}>
        <div style={{ paddingBottom: '17px' }}>
          <div className="section-title flex-row" style={{ justifyContent: 'space-between', width: '64%' }}>
            <div> <img src="/images/Assets/BackArrow.svg" style={{ marginLeft: '25px', marginTop: '14', cursor: 'pointer' }} onClick={() => {
              props.dispatch(actions.goHome())
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

        <div className='details'>Details</div>

        {/* flexbox */}
        <div className='flexbox'>
          <div className='trasaction-details-from-to'>From</div>
          <div className='trasaction-details-from-to-accounts'>{shorten(checksumAddress)}</div>
          <img src="/images/Assets/DownArrow.svg" />
          <div className='trasaction-details-from-to'>To</div>
          <div className='trasaction-details-from-to-accounts'>{shorten(To)}</div>
        </div>

        {/* all trasaction details  */}
        <div className='trasaction-details-amount'>
          <div style={{ marginLeft: '17px' }}>Amount</div>
          <div style={{ marginLeft: '170px' }}>{Value}</div>
          <h1 style={{ color: '#848484' }}>XDC</h1>
        </div>

        <div className='trasaction-details-amount'>
          <div style={{ marginLeft: '16px' }}>Gas Limit</div>
          <div>{Gas}</div>
        </div>

        <div className='trasaction-details-amount'>
          <div style={{ marginLeft: '16px' }}>Gas Price (GWEI)</div>
          <div>1.00</div>
        </div>

        <div className='trasaction-details-amount'>
          <div style={{ marginLeft: '16px' }}>Total</div>
          <div style={{ marginLeft: '200px' }}>101.00 </div>
          <h1 style={{ color: '#848484' }}>XDC</h1>
        </div>

        {/* Transaction-log */}

        <h2 className='transaction-log-heading'>Transaction Log</h2>
  
        <div className='transaction-log-main'>

          <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }} >
              <img style={{ marginRight: '10px' }} src="/images/Assets/TransactionCreated.svg" />
              <div className='transaction-border' ></div>
            </div>
            <div> Transaction created with a value of 100 XDC at 16:29 on 10/11/2021.</div>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }} >
              <img style={{ marginRight: '10px' }} src="/images/Assets/TransactionSubmitted.svg" />
              <div className='transaction-border' ></div>
            </div>
            <div> trasaction submitted with estimated gas fee of 1.00 GWEI at 16.29 on 10/11/2021. </div>
          </div>

          <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }} >
              <img style={{ marginRight: '10px' }} src="/images/Assets/TransactionComplete.svg" />
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
    transactions: state.metamask.selectedAddressTxList || [],
  }
}

module.exports = connect(mapStateToProps)(TransactionDetails)
