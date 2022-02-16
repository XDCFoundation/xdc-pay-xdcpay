// const inherits = require("util").inherits;
// const Component = require("react").Component;
// const h = require("react-hyperscript");
// const connect = require("react-redux").connect;
// const actions = require("../../ui/app/actions");
// const LoadingIndicator = require("./components/loading");
// const Web3 = require("web3");
// const infuraCurrencies = require("./infura-conversion.json").objects.sort(
//   (a, b) => {
//     return a.quote.name
//       .toLocaleLowerCase()
//       .localeCompare(b.quote.name.toLocaleLowerCase());
//   }
// );
// const validUrl = require("valid-url");
// const exportAsFile = require("./util").exportAsFile;
// const Modal = require("../../ui/app/components/modals/index").Modal;
// const ethNetProps = require("xdc-net-props");
// const { networks } = require("../../app/scripts/controllers/network/util");

// module.exports = connect(mapStateToProps)(ConfigScreen);

// function mapStateToProps(state) {
//   return {
//     metamask: state.metamask,
//     warning: state.appState.warning,
//   };
// }

// inherits(ConfigScreen, Component);
// function ConfigScreen() {
//   this.state = {
//     loading: false,
//   };
//   Component.call(this);
// }

// ConfigScreen.prototype.render = function () {
//   const state = this.props;
//   const metamaskState = state.metamask;
//   const warning = state.warning;

//   return h(
//     ".flex-column.flex-grow",
//     {
//       style: {
//         maxHeight: "585px",
//         overflowY: "auto",
//       },
//     },
//     [
//       h(LoadingIndicator, {
//         isLoading: this.state.loading,
//       }),

//       h(Modal, {}, []),

//       // subtitle and nav
//       h(".section-title.flex-row", [
//         h("img", {
//           onClick: () => {
//             state.dispatch(actions.goHome());
//           },
//           src: "/images/Assets/BackArrow.svg",
//           style: {
//             position: "static",
//             marginLeft: "15px",
//             cursor: "pointer",
//           },
//         }),
//         h(
//           "h2",
//           {
//             style: {
//               marginLeft: "114px",
//               fontWeight: "600",
//               // fontFamily: "Nunito Regular",
//             },
//           },
//           "Settings"
//         ),
//       ]),

//       h(
//         "div",
//         {
//           style: {
//             marginLeft: "9px",
//           },
//         },
//         [
//           h(
//             ".error",
//             {
//               style: {
//                 display: warning ? "block" : "none",
//                 width: "324px",
//                 marginBottom: "-20px",
//               },
//             },
//             warning
//           ),
//         ]
//       ),

//       // conf view
//       h(".flex-column.flex-justify-center.flex-grow.select-none", [
//         h(
//           ".flex-space-around",
//           {
//             style: {
//               padding: "0",
//               overflow: "auto",
//             },
//           },
//           [
//             currentProviderDisplay(metamaskState, state),

//             h(
//               "div",
//               {
//                 style: {
//                   display: "flex",
//                   flex: "wrap",
//                   width: "100%",
//                 },
//               },
//               [
//                 h("input#new_rpc", {
//                   placeholder: "New RPC URL",
//                   style: {
//                     flex: "1 0 auto",
//                     width: "238px",
//                     height: "40px",
//                     margin: "15px 0 0 9px",
//                     borderRadius: "4px",
//                     border: "2px solid #C7CDD8",
//                     padding: "10px",
//                   },
//                   onKeyPress: (event) => {
//                     if (event.key === "Enter") {
//                       const element = event.target;
//                       const newRpc = element.value;
//                       this.rpcValidation(newRpc, state);
//                     }
//                   },
//                 }),
//                 h(
//                   "button",
//                   {
//                     style: {
//                       // alignSelf: 'center',
//                       margin: "15px 7px 0 9px",
//                       width: "74px",
//                       height: "40px",
//                       background: "#FFFFFF",
//                       color: "#0CBE46",
//                       border: "2px solid #0CBE46",
//                       fontWeight: "600",
//                     },
//                     onClick: (event) => {
//                       event.preventDefault();
//                       const element = document.querySelector("input#new_rpc");
//                       const newRpc = element.value;
//                       this.rpcValidation(newRpc, state);
//                     },
//                   },
//                   "Save"
//                 ),
//               ]
//             ),

//             h("hr.horizontal-line", {
//               style: {
//                 marginTop: "26px",
//               },
//             }),

//             currentConversionInformation(metamaskState, state),

//             h("hr.horizontal-line", {
//               style: {
//                 marginTop: "20px",
//               },
//             }),

//             h(
//               "div",
//               {
//                 style: {
//                   margin: "26px 0 0 9px",
//                 },
//               },
//               [
//                 h(
//                   "p",
//                   {
//                     style: {
//                       fontFamily: "Nunito Regular",
//                       fontSize: "14px",
//                       lineHeight: "18px",
//                       marginBottom: "-11px",
//                     },
//                   },
//                   `State logs contain your public account addresses and sent transactions.`
//                 ),
//                 h("br"),
//                 h(
//                   "button",
//                   {
//                     style: {
//                       width: "324px",
//                       height: "40px",
//                       color: "#03BE46",
//                       background: "#FFFFFF",
//                       border: "2px solid #03BE46",
//                       fontWeight: "600",
//                     },
//                     onClick(event) {
//                       window.logStateString((err, result) => {
//                         if (err) {
//                           state.dispatch(
//                             actions.displayWarning(
//                               "Error in retrieving state logs."
//                             )
//                           );
//                         } else {
//                           exportAsFile("XDCPay State Logs.json", result);
//                         }
//                       });
//                     },
//                   },
//                   "Download State Logs"
//                 ),
//               ]
//             ),

//             h("hr.horizontal-line", {
//               style: {
//                 marginTop: "17px",
//               },
//             }),

//             h(
//               "div",
//               {
//                 style: {
//                   margin: "17px 0 0 9px",
//                 },
//               },
//               [
//                 h(
//                   "button",
//                   {
//                     style: {
//                       // alignSelf: 'center',
//                       width: "324px",
//                       height: "40px",
//                       color: "#03BE46",
//                       background: "#FFFFFF",
//                       border: "2px solid #03BE46",
//                       fontWeight: "600",
//                       marginBottom: "6px",
//                     },
//                     onClick(event) {
//                       event.preventDefault();
//                       state.dispatch(actions.revealSeedConfirmation());
//                     },
//                   },
//                   "Reveal Seed Words"
//                 ),
//               ]
//             ),

//             h("hr.horizontal-line", {
//               style: {
//                 marginTop: "20px",
//               },
//             }),

//             h(
//               "div",
//               {
//                 style: {
//                   marginTop: "20px",
//                 },
//               },
//               [
//                 h(
//                   "p",
//                   {
//                     style: {
//                       fontFamily: "Nunito Regular",
//                       fontSize: "14px",
//                       lineHeight: "18px",
//                       marginLeft: "9px",
//                     },
//                   },
//                   ["Resetting is for developer use only. "]
//                 ),
//                 h("br"),

//                 h(
//                   "button",
//                   {
//                     style: {
//                       // alignSelf: "center",
//                       width: "324px",
//                       height: "40px",
//                       color: "#03BE46",
//                       background: "#FFFFFF",
//                       border: "2px solid #03BE46",
//                       fontWeight: "600",
//                       marginLeft: "9px",
//                     },
//                     onClick(event) {
//                       event.preventDefault();
//                       state.dispatch(actions.resetAccount());
//                     },
//                   },
//                   "Reset Account"
//                 ),

//                 h("hr.horizontal-line", {
//                   style: {
//                     marginTop: "20px",
//                   },
//                 }),

//                 h(
//                   "button",
//                   {
//                     style: {
//                       // alignSelf: "center",
//                       width: "324px",
//                       height: "40px",
//                       color: "#03BE46",
//                       background: "#FFFFFF",
//                       border: "2px solid #03BE46",
//                       fontWeight: "600",
//                       marginLeft: "9px",
//                       marginBottom: "50px",
//                     },
//                     onClick(event) {
//                       event.preventDefault();
//                       state.dispatch(actions.confirmChangePassword());
//                     },
//                   },
//                   "Change password"
//                 ),
//                 // h("hr.horizontal-line", {
//                 //   style: {
//                 //     marginTop: "20px",
//                 //   },
//                 // }),
//                 // h("hr.horizontal-line", {
//                 //   style: {
//                 //     marginTop: "20px",
//                 //   },
//                 // }),
//               ]
//             ),
//           ]
//         ),
//       ]),
//     ]
//   );
// };

// ConfigScreen.prototype.componentWillUnmount = function () {
//   this.props.dispatch(actions.displayWarning(""));
// };

// ConfigScreen.prototype.rpcValidation = function (newRpc, state) {
//   if (validUrl.isWebUri(newRpc)) {
//     this.setState({
//       loading: true,
//     });
//     const web3 = new Web3(new Web3.providers.HttpProvider(newRpc));
//     web3.eth.getBlockNumber((err, res) => {
//       if (err) {
//         state.dispatch(actions.displayWarning("Invalid RPC endpoint"));
//       } else {
//         state.dispatch(actions.setRpcTarget(newRpc));
//       }
//       this.setState({
//         loading: false,
//       });
//     });
//   } else {
//     if (!newRpc.startsWith("http")) {
//       state.dispatch(
//         actions.displayWarning(
//           "URIs require the appropriate HTTP/HTTPS prefix."
//         )
//       );
//     } else {
//       state.dispatch(actions.displayWarning("Invalid RPC URI"));
//     }
//   }
// };

// ConfigScreen.prototype.networkNameValidation = function (networkName, state) {
//   if (networkName != null) {
//     state.dispatch(actions.setNetworkName(networkName));
//   }
// };
// function currentConversionInformation(metamaskState, state) {
//   const currentCurrency = metamaskState.currentCurrency;
//   const conversionDate = metamaskState.conversionDate;
//   return h(
//     "div",
//     {
//       style: {
//         marginTop: "15px",
//         marginLeft: "9px",
//       },
//     },
//     [
//       h(
//         "span",
//         { style: { fontWeight: "bold", fontSize: "14px", color: "#2149B9" } },
//         "Current Conversion"
//       ),
//       h("br"),
//       h(
//         "span",
//         { style: { fontSize: "14px", color: "#2A2A2A" } },
//         `Updated ${Date(conversionDate)}`
//       ),
//       h("br"),
//       h(
//         "select#currentCurrency",
//         {
//           style: {
//             width: "324px",
//             height: "40px",
//             border: "2px solid #C7CDD8",
//             borderRadius: "4px",
//             paddingLeft: "5px",
//             marginTop: "10px",
//           },
//           onChange(event) {
//             event.preventDefault();
//             const element = document.getElementById("currentCurrency");
//             const newCurrency = element.value;
//             state.dispatch(actions.setCurrentCurrency(newCurrency));
//           },
//           defaultValue: currentCurrency,
//         },
//         infuraCurrencies.map((currency) => {
//           return h(
//             "option",
//             { key: currency.quote.code, value: currency.quote.code },
//             `${currency.quote.code.toUpperCase()} - ${currency.quote.name}`
//           );
//         })
//       ),
//     ]
//   );
// }

// function currentProviderDisplay(metamaskState, state) {
//   const provider = metamaskState.provider;
//   let title, value;

//   if (networks[provider.type]) {
//     title = "Current Network";
//     value = ethNetProps.props.getNetworkDisplayName(
//       networks[provider.type].networkID
//     );
//   } else {
//     title = "Current RPC";
//     value = metamaskState.provider.rpcTarget;
//   }

//   return h(
//     "div",
//     {
//       style: {
//         marginTop: "20px",
//         marginLeft: "9px",
//       },
//     },
//     [
//       h(
//         "span",
//         { style: { fontWeight: "bold", fontSize: "14px", color: "#2149B9" } },
//         title
//       ),
//       h("br"),
//       h("span", { style: { fontSize: "14px", color: "#2A2A2A" } }, value),
//       provider.type === "rpc" &&
//         h(
//           "button",{
//             style: {
//               // alignSelf: 'center',
//               margin: "15px 2px 0 9px",
//               width: "74px",
//               height: "40px",
//               background: "#FFFFFF",
//               color: "#0CBE46",
//               border: "2px solid #0CBE46",
//               fontWeight: "600",
//             },

//             onClick(event) {
//               event.preventDefault();
//               state.dispatch(actions.showDeleteRPC());
//             },
//           },
//           "Delete"
//         ),
//     ]
//   );
// }


/*Latest Settings UI **/


const inherits = require('util').inherits
const Component = require('react').Component
const h = require('react-hyperscript')
const connect = require('react-redux').connect
const actions = require('../../ui/app/actions')
const LoadingIndicator = require('./components/loading')
const Web3 = require('web3')
const infuraCurrencies = require('./infura-conversion.json').objects.sort(
  (a, b) => {
    return a.quote.name
      .toLocaleLowerCase()
      .localeCompare(b.quote.name.toLocaleLowerCase())
  },
)
const validUrl = require('valid-url')
const exportAsFile = require('./util').exportAsFile
const Modal = require('../../ui/app/components/modals/index').Modal
const ethNetProps = require('xdc-net-props')
const {networks} = require('../../app/scripts/controllers/network/util')

module.exports = connect(mapStateToProps)(ConfigScreen)

function mapStateToProps (state) {
  return {
    metamask: state.metamask,
    warning: state.appState.warning,
  }
}

inherits(ConfigScreen, Component)

function ConfigScreen () {
  this.state = {
    loading: false,
  }
  Component.call(this)
}

ConfigScreen.prototype.render = function () {
  const state = this.props
  const metamaskState = state.metamask
  const warning = state.warning


  return h(
    '.flex-column.flex-grow',
    {
      style: {
        maxHeight: '585px',
        overflowY: 'auto',
      },
    },
    [
      h(LoadingIndicator, {
        isLoading: this.state.loading,
      }),

      h(Modal, {}, []),

      // subtitle and nav
      h('.section-title.flex-row', {style: {borderBottom: '1px solid #E3E7EB', paddingBottom: '17px'}}, [
        h('img', {
          onClick: () => {
            state.dispatch(actions.goHome())
          },
          src: '/images/Assets/BackArrow.svg',
          style: {
            position: 'static',
            marginLeft: '15px',
            cursor: 'pointer',
          },
        }),
        h(
          'h2',
          {
            style: {
              marginLeft: '94px',
              fontWeight: '600',
              minHeight: '20px',
              padding: '0px 18px ',
            },
          },
          'Settings',
        ),
      ]),
      [


        h('.settings', {onClick: () => state.dispatch(actions.generalSettings())}, ['General Settings',
          h('img', {
            src: '/images/Assets/Arrow.svg',

          }),


        ]),

        h('.settings', {onClick: () => state.dispatch(actions.advanceSettings())}, ['Advance Settings',
          h('img', {
            src: '/images/Assets/Arrow.svg',

          }),
        ]),

        h('.settings', {onClick: () => state.dispatch(actions.securityAndPrivacy())}, ['Security and Privacy Settings',
          h('img', {
            src: '/images/Assets/Arrow.svg',
          }),
        ]),

        h('.settings', {onClick: () => state.dispatch(actions.Contacts())}, ['Contacts',
          h('img', {
            src: '/images/Assets/Arrow.svg',
          }),
        ]),

        // h('.settings', {onClick: () => state.dispatch(actions.alertSettings())}, ['Alert Settings',
        //   h('img', {
        //     src: '/images/Assets/Arrow.svg',
        //   }),
        // ]),

        h('.settings', {onClick: () => state.dispatch(actions.networkSettings())}, ['Network Settings',
          h('img', {
            src: '/images/Assets/Arrow.svg',
          }),
        ]),

        h('.settings', {onClick: () => state.dispatch(actions.showInfoPage())}, ['About',
          h('img', {
            src: '/images/Assets/Arrow.svg',
          }),
        ]),

      ],
    ])

}
