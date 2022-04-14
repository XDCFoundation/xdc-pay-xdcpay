const React = require('react')
const connect = require('react-redux').connect
const actions = require('../../ui/app/actions')
import Identicon from '../../ui/app/components/identicon'

class Contacts extends React.Component {

  render () {
    const state = this.props
    const contactList = state.metamask.addressBook
    contactList.sort(function (a, b) {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1
      }
      return 0
    })

    return (
      <div className="flex-column flex-grow" style={{maxHeight: '585px', overflowY: 'auto'}}>
        <div className="section-title flex-row"
             style={{
               borderBottom: '1px solid #E3E7EB',
               paddingBottom: '17px',
               display: 'flex',
               justifyContent: 'space-between',
             }}
        >
          <img src="/images/Assets/BackArrow.svg" style={{marginLeft: '17px', cursor: 'pointer'}}
               onClick={() => state.dispatch(actions.goConfig())}/>
          <h2 style={{fontFamily: 'Inter-bold',color:"#2A2A2A"}}>Contacts</h2>
          <img src="/images/Assets/Add.svg"
               style={{cursor: 'pointer', marginRight: '11px'}}
               onClick={() => state.dispatch(actions.showAddContactsPage())}
          />
        </div>
        <div className="list" >
          {contactList.length ?            
              contactList.map((contactObj, index) => (
                <div key={index}
                  style={{
                    borderBottom: '1px solid #E3E7EB',
                    fontFamily: 'inter-medium',
                    fontSize: '14px',
                  }}>
                  {index === 0 || contactList[index].name.charAt(0).toLowerCase() !== contactList[index - 1].name.charAt(0).toLowerCase() ?
                    <div style={{
                      backgroundColor: '#F4F6FA',
                      height: '24px',
                      width: '100%',
                      padding: '0 21px',
                    }}>{contactList[index].name.charAt(0).toUpperCase()}
                    </div> : ''}
                  <div style={{ padding: '10px 20px', display: 'flex', flexDirection: 'row', gap: '10px' }}>
                    <Identicon
                      overflow="none"
                      address={contactObj.address.replace("xdc","0x")}
                      diameter={27}
                      style={{ marginLeft: '10px', cursor: 'pointer', overflow: 'inherit' }}
                    />
                    <div style={{ width: 'fit-content', cursor: 'pointer',padding:'3px 0 0 0' }} onClick={() => state.dispatch(actions.contactDetails(contactObj))}>
                      {contactObj.name}
                    </div>
                  </div>
                </div>
              ))
            : <p style={{ margin: '182px 113px',
            color: '#9FA9BA',
            fontSize: '14px',}}>
              No Contacts Added
              </p> }  </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    metamask: state.metamask,
    warning: state.appState.warning,
    identities: state.metamask.identities,
  }
}
module.exports = connect(mapStateToProps)(Contacts)
