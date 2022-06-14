import {isValidAddress} from '../../util'

const connect = require('react-redux').connect
const actions = require('../../../../ui/app/actions')
import React from 'react'
import PropTypes from 'prop-types'

const {toChecksumAddress} = require('../../util')
const AddContactComponent = require('./add-contacts')

export default class AddContact extends React.Component {
  constructor (props) {
    super(props)
    // eslint-disable-next-line react/prop-types
    var contactObj = this.props.viewContactObj
    !contactObj ? contactObj = this.props.detailObj : contactObj
    this.state = {
      contactAddress: contactObj ? contactObj.address : '',
      contactName: contactObj ? contactObj.name : '',
    }
  }

  onBackToContacts = () => {
    // eslint-disable-next-line react/prop-types
    this.props.backToContacts ? this.props.backToContacts() : this.props.dispatch(actions.Contacts())
    this.props.dispatch(actions.displayWarning(''))
  }

  onStateChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  onAddContactClicked = async () => {
    const {network, selectedAddress, addressBook} = this.props
    const { contactAddress, contactName } = this.state
    console.log(contactAddress,contactName,'state working')
    const address = contactAddress.replace('xdc', '0x')
    if (!contactAddress || !contactAddress.trim().length || !isValidAddress(address, network)) {
      return this.props.dispatch(actions.displayWarning('Contact address is invalid.'))
    }
    if (contactName.trim().length > 30) {
      return this.props.dispatch(actions.displayWarning('Contact name must be less than 30 characters.'))
    }
    // if(address === selectedAddress) {
    //   return this.props.dispatch(actions.displayWarning('You cannot add your own wallet address.'))
    // }
    if (!contactName || !contactName.trim().length) {
      return this.props.dispatch(actions.displayWarning('Contact name is invalid.'))
    }
    await this.props.dispatch(actions.addToAddressBook(contactName, contactAddress))
    this.onBackToContacts()
  }

  onDeleteClicked = async (viewContactObj) => {
    await this.props.dispatch(actions.addToAddressBook(viewContactObj.name, viewContactObj.address, true))
    this.onBackToContacts()
    this.props.dispatch(actions.displayWarning(''))
  }

  static contextTypes = {
    t: PropTypes.func,
  }

  render () {
    const {t} = this.context
    // eslint-disable-next-line react/prop-types
    const {warning, viewContactObj,detailObj} = this.props
    return (
      <AddContactComponent
        t={t}
        state={this.state}
        props={this.props}
        viewContactObj={viewContactObj}
        warningMsg={warning}
        onBackClick={this.onBackToContacts}
        onStateChange={this.onStateChange}
        onDeleteClicked={this.onDeleteClicked}
        detailObj={detailObj}
        onAddContactClicked={this.onAddContactClicked}

      />
    )
  }
}

function mapStateToProps (state) {
  return {
    metamask: state.metamask,
    network: state.metamask.network,
    warning: state.appState.warning,
    viewContactObj: state.appState.currentViewContactObj,
    addressBook: state.metamask.addressBook,
    selectedAddress: state.metamask.selectedAddress,
    accounts: state.metamask.accountss,
    identities: state.metamask.identities,
  }
}

module.exports = connect(mapStateToProps)(AddContact)
