const ObservableStore = require('obs-store')
const extend = require('xtend')
const log = require('loglevel')

class AddressBookController {


  /**
   * Controller in charge of managing the address book functionality from the
   * recipients field on the send screen. Manages a history of all saved
   * addresses and all currently owned addresses.
   *
   * @typedef {Object} AddressBookController
   * @param {object} opts Overrides the defaults for the initial state of this.store
   * @property {array} opts.initState  initializes the the state of the AddressBookController. Can contain an
   * addressBook property to initialize the addressBook array
   * @property {object} opts.preferencesStore the {@code PreferencesController} store
   * @property {object} store The the store of the current users address book
   * @property {array} store.addressBook An array of addresses and nicknames. These are set by the user when sending
   * to a new address.
   *
   */
  constructor ({initState, preferencesStore}) {
    this.store = new ObservableStore(extend({
      addressBook: [],
    }, initState))
    this._preferencesStore = preferencesStore
  }

  //
  // PUBLIC METHODS
  //

  /**
   * Sets a new address book in store by accepting a new address and nickname.
   *
   * @param {string} address A hex address of a new account that the user is sending to.
   * @param {string} name The name the user wishes to associate with the new account
   * @param {boolean} remove boolean variable in case it's a delete method call
   * @returns {Promise<void>} Promise resolves with undefined
   *
   */
  setAddressBook (name, address, remove = false) {
    return this._addToAddressBook(name, address, remove)
    .then((addressBook) => {
      this.store.updateState({
        addressBook,
      })
      return Promise.resolve()
    })
  }

  /**
   * Performs the logic to add the address and name into the address book. The pushed object is an object of two
   * fields. Current behavior does not set an upper limit to the number of addresses.
   *
   * @private
   * @param {string} address A hex address of a new account that the user is sending to.
   * @param {string} name The name the user wishes to associate with the new account
   * @param {boolean} remove boolean variable in case it's a delete method call
   * @returns {Promise<array>} Promises the updated addressBook array
   *
   */
  _addToAddressBook (name, address, remove = false) {
    const addressBook = this._getAddressBook()
    const {identities} = this._preferencesStore.getState()

    const addressBookIndex = addressBook.findIndex((element) => { return element.address.toLowerCase() === address.toLowerCase() || element.name === name })
    const identitiesIndex = Object.keys(identities).findIndex((element) => { return element.toLowerCase() === address.toLowerCase() })
    // trigger this condition if we own this address--no need to overwrite.
    if (identitiesIndex !== -1 && !remove) {
      return Promise.resolve(addressBook)
    // trigger this condition if we've seen this address before--may need to update nickname.
    }
    if (addressBookIndex !== -1) {
      addressBook.splice(addressBookIndex, 1)
    }
    if (addressBook.length < 15 && !remove) {
      addressBook.push({name, address})
    }
    return Promise.resolve(addressBook)
  }

  /**
   * Internal method to get the address book. Current persistence behavior should not require that this method be
   * called from the UI directly.
   *
   * @private
   * @returns {array} The addressBook array from the store.
   *
   */
  _getAddressBook () {
    return this.store.getState().addressBook
  }
}

module.exports = AddressBookController
