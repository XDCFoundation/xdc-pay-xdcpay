import React, {Component} from 'react'
import PropTypes from 'prop-types'
import actions from '../../../../ui/app/actions'
import {connect} from 'react-redux'
import {Dropdown, DropdownMenuItem} from '../dropdown'
import copyToClipboard from 'copy-to-clipboard'
import ethNetProps from 'xdc-net-props'
import {
  getCurrentKeyring,
  ifContractAcc,
  ifHardwareAcc,
  getAllKeyRingsAccounts,
  toChecksumAddress,
} from '../../util'
import {importTypes} from '../../accounts/import/enums'
import {getFullABI} from '../../accounts/import/helpers'
import log from 'loglevel'
import Web3 from 'web3'
import {AccountsDropdownItemView} from './accounts-dropdown-item-view'
import Identicon from '../identicon'

class AccountsDropdownItemWrapper extends DropdownMenuItem {
  render () {
    return (
      <DropdownMenuItem
        style={{
          padding: '6px 16px',
        }}
        closeMenu={() => {
        }}
        onClick={() => this.props.onClick()}
      >
        <img className="my-accounts-icon" src={this.props.path}></img>
        <span className="acc-dd-menu-item-text">{this.props.label}</span>
      </DropdownMenuItem>
    )
  }
}

class AccountDropdowns extends Component {
  static defaultProps = {
    enableAccountsSelector: false,
    enableAccountOptions: false,
  }

  static propTypes = {
    identities: PropTypes.objectOf(PropTypes.object),
    selected: PropTypes.string,
    keyrings: PropTypes.array,
    actions: PropTypes.objectOf(PropTypes.func),
    network: PropTypes.string,
    style: PropTypes.object,
    enableAccountOptions: PropTypes.bool,
    enableAccountsSelector: PropTypes.bool,
  }

  constructor (props) {
    super(props)
    this.state = {
      accountSelectorActive: false,
      optionsMenuActive: false,
      isProxy: false,
      contractProps: null,
    }
    this.accountSelectorToggleClassName = 'accounts-selector'
    this.optionsMenuToggleClassName = 'account-dropdown'
    this.web3 = new Web3(global.ethereumProvider)
  }
  
  renderAccounts () {
    const {identities, selected, keyrings, network} = this.props
    console.log(identities, 'renderAccounts')
    const accountOrder = getAllKeyRingsAccounts(keyrings, network)

    const accountsViews = accountOrder.map((address, index) => {
      const identity = identities[address]
      if (!identity) {
        return null
      }
      const isSelected = identity.address === selected

      const keyring = getCurrentKeyring(address, network, keyrings, identities)

      let accountsDropdownItemView = (
        <AccountsDropdownItemView
          key={`AccountsDropdownItemView_${index}`}
          isSelected={isSelected}
          keyring={keyring}
          identity={identity}
          closeMenu={() => this.closeMenu()}
        />
      )

      // display contract acc only for network where it was created
      if (ifContractAcc(keyring)) {
        if (keyring.network !== network) {
          accountsDropdownItemView = null
        }
      }

      return accountsDropdownItemView
    })

    return accountsViews
  }

  closeMenu () {
    this.setState({
      accountSelectorActive: false,
      optionsMenuActive: false,
    })
  }

  renderAccountSelector () {
    const {actions} = this.props
    const {accountSelectorActive} = this.state
    let menuItems = []
    menuItems = Object.assign(menuItems, this.renderAccounts())
    const bottomMenuItems = [
      <AccountsDropdownItemWrapper
        key="AccountsDropdownItemAdd"
        onClick={() => actions.addNewAccount()}
        label="Create Account"
        path="/images/Assets/CreateAccount.svg"
      ></AccountsDropdownItemWrapper>,
      <AccountsDropdownItemWrapper
        key="AccountsDropdownItemImport"
        onClick={() => actions.showImportPage()}
        label="Import Account"
        path="/images/Assets/ImportAccount.svg"
      />,
      <AccountsDropdownItemWrapper
        key="AccountsDropdownItemConnectHD"
        onClick={() => actions.showConnectHWWalletPage()}
        label="Connect hardware wallet"
        path="/images/Assets/ConnectHardware.svg"
      />,
    ]
    menuItems = menuItems.concat(bottomMenuItems)

    return (
      <Dropdown
        useCssTransition={true} // Hardcoded because account selector is temporarily in app-header
        style={{
          position: 'absolute',
          left: '0',
          bottom: '-543px',
          minWidth: '180px',

          width: '317px',
        }}
        innerStyle={
          {
            // padding: '8px 25px',
          }
        }
        isOpen={accountSelectorActive}
        onClickOutside={(event) => {
          const {classList} = event.target
          const isNotToggleElement = !classList.contains(
            this.accountSelectorToggleClassName,
          )
          if (accountSelectorActive && isNotToggleElement) {
            this.setState({accountSelectorActive: false})
          }
        }}
      >
        <div className="my-accounts-list">
          My Accounts
          <img
            className="my-accounts-close-icon"
            src="/images/Assets/Close.svg"
          ></img>
        </div>
        <div style={{
          maxHeight: accountSelectorActive ? '271px' : '0px',
          height: '100%',
          overflowY: 'auto',

        }}>
          {menuItems}
        </div>
      </Dropdown>
    )
  }

  renderAccountOptions () {
    const {actions, selected, network, keyrings, identities, networkList} = this.props
    const {optionsMenuActive, isProxy} = this.state

    const keyring = getCurrentKeyring(selected, network, keyrings, identities)

    return (
      <div>

        <Dropdown
          style={{
            position: 'absolute',
            minWidth: '180px',
            left: '0',
            bottom: '18px',
            width: '317px',
          }}
          isOpen={optionsMenuActive}
          onClickOutside={(event) => {
            const {classList} = event.target
            const isNotToggleElement = !classList.contains(
              this.optionsMenuToggleClassName,
            )
            if (optionsMenuActive && isNotToggleElement) {
              this.setState({optionsMenuActive: false})
            }
          }}
        >
          <div className="account-options-list">
            Account Options
            <img
              className="account-options-close-icon"
              src="/images/Assets/Close.svg"
            />
          </div>
          {/* <DropdownMenuItem
            closeMenu={() => {
            }}
            onClick={() => global.platform.openExtensionInBrowser()}
          >
            <img
              className="account-options-icon"
              src="/images/Assets/ExpandedView.svg"
            />
            Expanded View
          </DropdownMenuItem>
          <DropdownMenuItem
            closeMenu={() => {
            }}
            onClick={() => actions.connectedSites()}
          >
            <img
              className="account-options-icon"
              src="/images/Assets/ConnectedSites.svg"
            />
            Connected Sites
          </DropdownMenuItem> */}
          <DropdownMenuItem
            closeMenu={() => {
            }}
            onClick={() => this.viewOnBlockExplorer()}
          >
            <img
              className="account-options-icon"
              src="/images/Assets/ViewOnExplorer.svg"
            />
            {network==50?'View on observer':"View on block explorer"}
          </DropdownMenuItem>
          <DropdownMenuItem
            closeMenu={() => {
            }}
            onClick={() => this.showQRCode()}
          >
            <img
              className="account-options-icon"
              src="/images/Assets/QRCode.svg"
            />
            Show QR Code
          </DropdownMenuItem>
          <DropdownMenuItem
            closeMenu={() => {
            }}
            onClick={() => this.copyAddress()}
          >
            <img
              className="account-options-icon"
              src="/images/Assets/CopyClipboard.svg"
            />
            Copy address to clipboard
          </DropdownMenuItem>
          {ifContractAcc(keyring) ? (
            <DropdownMenuItem closeMenu={() => {
            }} onClick={() => this.copyABI()}>
              Copy ABI to clipboard
            </DropdownMenuItem>
          ) : null}
          {isProxy ? (
            <DropdownMenuItem
              closeMenu={() => {
              }}
              onClick={() => this.updateABI()}
            >
              Update implementation ABI
            </DropdownMenuItem>
          ) : null}
          {!ifHardwareAcc(keyring) && !ifContractAcc(keyring) ? (
            <DropdownMenuItem
              closeMenu={() => {
              }}
              onClick={() => actions.requestAccountExport()}
            >
              <img
                className="account-options-icon"
                src="/images/Assets/ExportPvtKey.svg"
              />
              Export Private Key
            </DropdownMenuItem>
          ) : null}
        </Dropdown>
      </div>
    )
  }

  viewOnBlockExplorer = () => {
    const {selected, network, networkList} = this.props
    let networkData=0
    networkList.find((networkObj) =>{ if(networkObj.chainId == network){
      networkData=networkObj
    }})
    const address = networkData && networkData.providerType === 'rpc' ? 'address' : networkData.providerType==='xdc'?'address-details':'address'
    const accountAddress = networkData && networkData.providerType === 'rpc' ? selected : selected.replace('0x', 'xdc')
    const url = networkData ? `${networkData.blockExplorer}/${address}/${accountAddress}` : ethNetProps.explorerLinks.getExplorerAccountLinkFor(
      selected.replace('0x', 'xdc'),
      network,
    )
    global.platform.openWindow({url})
  }

  showQRCode = () => {
    const {selected, identities, actions} = this.props
    const identity = identities[selected]
    actions.showQrView(selected, identity ? identity.name : '')
  }

  // connectedsites = () => {
    
  // }

  copyAddress = () => {
    const {selected, network} = this.props
    const checkSumAddress = selected && toChecksumAddress(network, selected)
    copyToClipboard(checkSumAddress)
  }

  copyABI = async () => {
    const {contractProps} = this.state
    const abi = contractProps && contractProps.abi
    copyToClipboard(JSON.stringify(abi))
  }

  updateABI = async () => {
    const {actions, selected, network} = this.props
    actions.showLoadingIndication()
    getFullABI(this.web3.eth, selected, network, importTypes.CONTRACT.PROXY)
      .then((finalABI) => {
        actions
          .updateABI(selected, network, finalABI)
          .then()
          .catch((e) => {
            log.debug(e)
          })
          .finally(() => actions.hideLoadingIndication())
      })
      .catch((e) => {
        log.debug(e)
        actions.hideLoadingIndication()
      })
  }

  checkIfProxy () {
    this.ifProxyAcc().then((isProxy) => {
      this.setState({isProxy})
    })
  }

  ifProxyAcc () {
    const {selected} = this.props
    return new Promise((resolve, reject) => {
      this.props.actions
        .getContract(selected)
        .then((contractProps) => {
          this.setState({contractProps})
          resolve(
            contractProps &&
            contractProps.contractType === importTypes.CONTRACT.PROXY,
          )
        })
        .catch((e) => reject(e))
    })
  }

  componentDidMount () {
    this.checkIfProxy()
  }

  // switch to the first account in the list on network switch, if unlocked account was contract before change
  componentDidUpdate (prevProps) {
    const {selected} = this.props
    if (prevProps.selected !== selected) {
      this.checkIfProxy()
    }

    if (!isNaN(this.props.network)) {
      const {network} = this.props
      if (network !== prevProps.network) {
        const {keyrings, identities} = this.props
        const keyring = getCurrentKeyring(
          selected,
          this.props.network,
          keyrings,
          identities,
        )
        const firstKeyring = keyrings && keyrings[0]
        const firstKeyRingAcc =
          firstKeyring && firstKeyring.accounts && firstKeyring.accounts[0]
        if (!keyring || (ifContractAcc(keyring) && firstKeyRingAcc)) {
          return this.props.actions.showAccountDetail(firstKeyRingAcc)
        }
      }
    }
  }

  render () {
    const {
      style,
      enableAccountsSelector,
      enableAccountOptions,
      networkList,
      selected,
    } = this.props
    const {optionsMenuActive, accountSelectorActive} = this.state

    const accountSelector = enableAccountsSelector && (
      <div
        className="accounts-selector accounts-selector-additional-style"
        onClick={(event) => {
          event.stopPropagation()
          this.setState({
            accountSelectorActive: !accountSelectorActive,
            optionsMenuActive: false,

          })

        }}
      >
        {this.renderAccountSelector()}
        <Identicon
          diameter={24}
          address={selected}

        />
      </div>
    )
    const accountOptions = enableAccountOptions && (
      <div
        className="address-dropdown account-dropdown"
        onClick={(event) => {
          event.stopPropagation()
          this.setState({
            accountSelectorActive: false,
            optionsMenuActive: !optionsMenuActive,
          })
        }}
      >
        {this.renderAccountOptions()}
      </div>
    )
    return (
      <span style={style}>
        {accountSelector}
        {accountOptions}
      </span>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      showLoadingIndication: () => dispatch(actions.showLoadingIndication()),
      hideLoadingIndication: () => dispatch(actions.hideLoadingIndication()),
      requestAccountExport: () => dispatch(actions.requestExportAccount()),
      showAccountDetail: (address) =>
        dispatch(actions.showAccountDetail(address)),
      addNewAccount: () => dispatch(actions.addNewAccount()),
      showImportPage: () => dispatch(actions.showImportPage()),
      connectedSites: () =>dispatch(actions.connectedSites()),
      showConnectHWWalletPage: () =>
        dispatch(actions.showConnectHWWalletPage()),
      showQrView: (selected, identity) =>
        dispatch(actions.showQrView(selected, identity)),
      getContract: (addr) => dispatch(actions.getContract(addr)),
      updateABI: (address, network, abi) =>
        dispatch(actions.updateABI(address, network, abi)),
    },
  }
}

module.exports = {
  AccountDropdowns: connect(null, mapDispatchToProps)(AccountDropdowns),
}
