const inherits = require('util').inherits
const extend = require('xtend')
const Component = require('react').Component
const h = require('react-hyperscript')
const connect = require('react-redux').connect
const actions = require('../../ui/app/actions')
const {getCurrentKeyring, ifContractAcc, valuesFor, toChecksumAddress} = require('./util')
const EthBalance = require('./components/eth-balance')
const TransactionList = require('./components/transaction-list')
const ExportAccountView = require('./components/account-export')
const EditableLabel = require('./components/editable-label')
const TabBar = require('./components/tab-bar')
const TokenList = require('./components/token-list')
const AccountDropdowns = require('./components/account-dropdowns/account-dropdowns.component').AccountDropdowns
const CopyButton = require('./components/copy/copy-button')
const ToastComponent = require('./components/toast')
import { getMetaMaskAccounts } from '../../ui/app/selectors'


module.exports = connect(mapStateToProps)(AccountDetailScreen)

function mapStateToProps (state) {
  const accounts = getMetaMaskAccounts(state)
  return {
    metamask: state.metamask,
    identities: state.metamask.identities,
    keyrings: state.metamask.keyrings,
    warning: state.appState.warning,
    accounts,
    address: state.metamask.selectedAddress,
    accountDetail: state.appState.accountDetail,
    network: state.metamask.network,
    networkList: [...state.metamask.networkList, ...state.metamask.frequentRpcList],
    unapprovedMsgs: valuesFor(state.metamask.unapprovedMsgs),
    shapeShiftTxList: state.metamask.shapeShiftTxList,
    transactions: state.metamask.selectedAddressTxList || [],
    conversionRate: state.metamask.conversionRate,
    currentCurrency: state.metamask.currentCurrency,
    currentAccountTab: state.metamask.currentAccountTab,
    tokens: state.metamask.tokens,
    suggestedTokens: state.metamask.suggestedTokens,
    computedBalances: state.metamask.computedBalances,
  }
}

inherits(AccountDetailScreen, Component)

function AccountDetailScreen () {
  Component.call(this)

}

AccountDetailScreen.prototype.render = function () {
  var props = this.props
  const {network, conversionRate, currentCurrency, networkList} = props
  var selected = props.address || Object.keys(props.accounts)[0]
  var checksumAddress = selected && toChecksumAddress(network, selected)
  var identity = props.identities[selected]
  var account = props.accounts[selected]

  if (Object.keys(props.suggestedTokens).length > 0) {
    this.props.dispatch(actions.showAddSuggestedTokenPage())
  }

  const currentKeyring = getCurrentKeyring(props.address, network, props.keyrings, props.identities)

  function shorten (b, amountL = 7, /*amountR = 4,*/ stars = 3) {

    return `${b.slice(0, amountL)}${'.'.repeat(stars)}${b.slice(
      b.length - 4,

      b.length,
    )}`
  }

  return (

    h('.account-detail-section.full-flex-height', [

      h(ToastComponent, {
        isSuccess: false,
      }),

      // identicon, label, balance, etc
      h('.account-data-subsection', {
        style: {
          padding: '8px 0 0',
          flex: '1 0 auto',
          background: '#ffffff',
          width: '100%',
        },
      }, [

        // header - identicon + nav
        h('div', {
          style: {

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            borderBottom: '1px solid #E3E7EB',
          },
        }, [

          // large identicon and addresses
          // h('.identicon-wrapper.select-none', [
          //   h(Identicon, {
          //     diameter: 60,
          //     address: selected,
          //   }),
          // ]),
          h('flex-column', {
            style: {
              lineHeight: '7px',
              // marginLeft: '107px',
              width: '100%',
            },
          }, [
            h(EditableLabel, {
              textValue: identity ? identity.name : '',
              state: {
                isEditingLabel: false,
              },
              saveText: (text) => {
                props.dispatch(actions.setAccountLabel(selected, text))
              },
            }, [

              // What is shown when not editing + edit text:
              h('label.editing-label', [h('.edit-text', {
                style: {
                  cursor: 'pointer',
                },
              }, 'edit')]),
              h(
                'div',
                {
                  style: {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                },
                [
                  h(
                    'div.font-medium.color-forest',
                    {

                      name: 'edit',
                    },
                    [
                      h('h2', {
                        style: {
                          // maxWidth: '180px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          padding: '8px 0 6px 0',
                          fontWeight: '600',
                          textAlign: 'left',

                          // lineHeight: '25px',
                          fontSize: '14px',
                          // fontFamily: 'Inter',
                          color: '#1F1F1F',
                        },
                      }, [
                        identity && identity.name,
                      ]),
                    ],
                  ),

                ],
              ),

              h('.flex-row', {
                style: {
                  width: '100%',
                  justifyContent: 'space-between',
                  // alignItems: 'baseline',
                  marginTop: '3px',
                },
              }, [

                // address

                h('div', {
                  style: {
                    width: '8em',
                    display: 'inline-flex',
                    margin: ' 0 0 15px 112px',
                  },
                }, [
                  h('span', {
                    style: {
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      paddingTop: '5px',
                      width: '9em',
                      height: '15px',
                      fontSize: '12px',
                      fontFamily: 'Inter-Regular',
                      textRendering: 'geometricPrecision',
                      color: '#848484',
                      marginLeft: '18px',
                    },
                  }, shorten(checksumAddress)),
                  h(CopyButton, {
                    style: {
                      marginLeft: '-11px',
                    },
                    value: checksumAddress,
                    isWhite: true,
                  }),
                ]),
                [
                  h(
                    AccountDropdowns,
                    {
                      style: {
                        // marginRight: '10px',
                        // margintop: '10px',
                        // marginLeft: '73px',

                        cursor: 'pointer',
                      },
                      selected,
                      network,
                      networkList,
                      identities: props.identities,
                      keyrings: props.keyrings,
                      enableAccountOptions: true,
                    },
                  ),
                ],
              ]),

              // account ballance

            ]),
          ]),
        ]),


        h('.flex-row', {
          style: {
            justifyContent: 'space-between',
            alignItems: 'center',
            flexFlow: 'column',
            margin: '45px 0 45px 0',
          },
        }, [

          h(EthBalance, {
            value: account && account.balance,
            conversionRate,
            currentCurrency,
            network,
            networkList,
            style: {
              lineHeight: '7px',
              // marginBottom: '42px',
            },
          }),
        ]),

        h('.flex-grow'),


        !ifContractAcc(currentKeyring) ? h('button',


          {
            onClick: () => props.dispatch(actions.buyEthView(selected)),

            style: {
              margin: '0 10px 20px 100px',
              width: '74px',
              height: '29px',
              background: '#2149B9',
              borderRadius: '4px',
              opacity: '1',
              // image: 'url(/images/Assets/downarrow-2.svg)',
              // img:'/images/Assets/downarrow-2.svg',
            },
          }, [h('img',
            {
              style: {
                marginRight: '8px',
                marginTop: '0.5px',

              }, src: '/images/Assets/downarrow-2.svg',
            },
          ), 'Buy']) : null,


        // h('img',
        //   {src: "/images/Assets/downarrow-2.svg" },
        // ),


        h('button', {
          onClick: () => {
            if (ifContractAcc(currentKeyring)) {
              return props.dispatch(actions.showSendContractPage({}))
            } else {
              return props.dispatch(actions.showSendPage())
            }
          },
          style: {

            width: '74px',
            height: '29px',
            background: '#2149B9',
            borderRadius: '4px',
            opacity: '1',


          },
        }, [h('img',
          {
            style: {
              marginRight: '8px',

            }, src: '/images/Assets/downarrow-2-1.svg',
          },
        ), ifContractAcc(currentKeyring) ? 'Execute methods' : 'Send']),

        // ]),
      ]),

      // subview (tx history, pk export confirm, buy eth warning)
      this.subview(),

    ])
  )

}

AccountDetailScreen.prototype.subview = function () {
  var subview
  try {
    subview = this.props.accountDetail.subview
  } catch (e) {
    subview = null
  }

  switch (subview) {
    case 'transactions':
      return this.tabSections()
    case 'export':
      var state = extend({key: 'export'}, this.props)
      return h(ExportAccountView, state)
    default:
      return this.tabSections()
  }
}

AccountDetailScreen.prototype.tabSections = function () {
  const {currentAccountTab} = this.props

  return h('section.tabSection.full-flex-height.grow-tenx', [

    h(TabBar, {
      tabs: [
        {content: 'Transactions', key: 'history', id: 'wallet-view__tab-history'},
        {content: 'Tokens', key: 'tokens', id: 'wallet-view__tab-tokens'},
      ],
      defaultTab: currentAccountTab || 'history',
      tabSelected: (key) => {
        this.props.dispatch(actions.setCurrentAccountTab(key))
      },
    }),

    this.tabSwitchView(),
  ])
}

AccountDetailScreen.prototype.tabSwitchView = function () {
  const props = this.props
  const {address, network} = props
  const {currentAccountTab, tokens} = this.props

  switch (currentAccountTab) {
    case 'tokens':
      return h(TokenList, {
        userAddress: address,
        network,
        tokens,
        addToken: () => this.props.dispatch(actions.showAddTokenPage()),
        removeToken: (token) => this.props.dispatch(actions.showRemoveTokenPage(token)),
      })
    default:
      return this.transactionList()
  }
}

AccountDetailScreen.prototype.transactionList = function () {
  const {
    transactions, unapprovedMsgs, address,
    network, shapeShiftTxList, conversionRate,
  } = this.props

  return h(TransactionList, {
    transactions: transactions.sort((a, b) => b.time - a.time),
    network,
    unapprovedMsgs,
    conversionRate,
    address,
    shapeShiftTxList,
    viewPendingTx: (txId) => {
      this.props.dispatch(actions.viewPendingTx(txId))
    },
    viewTxDetails: (txId) => {
      this.props.dispatch(actions.transactionDetails(txId))
    },
  })
}
