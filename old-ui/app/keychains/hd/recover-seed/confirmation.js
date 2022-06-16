const inherits = require('util').inherits

const Component = require('react').Component
const connect = require('react-redux').connect
const h = require('react-hyperscript')
const actions = require('../../../../../ui/app/actions')
const log = require('loglevel')
module.exports = connect(mapStateToProps)(RevealSeedConfirmation)

inherits(RevealSeedConfirmation, Component)
function RevealSeedConfirmation() {
  Component.call(this)
}

function mapStateToProps(state) {
  return {
    warning: state.appState.warning,
  }
}

RevealSeedConfirmation.prototype.render = function () {
  const props = this.props
  const warning = props.warning
  return (

    h('.initialize-screen.flex-column.flex-center.flex-grow', {
      style: { maxWidth: '100%' },
    }, [

      h('h3.flex-center.section-title', {
        style: {
          background: '#ffffff',
          color: '#333333',
          width: '100%',
          fontSize: '16px',
          padding: 6,
          fontFamily: 'Nunito  bold',
        },
      }, [
        h('img.image-display2', {
          src: '/images/Assets/Close.svg',
          onClick: () =>
                  props.dispatch(
                    actions.goConfig()
            ),
          style:{
            position: 'absolute',
            left: '23px',
            height: '14px',
            width:'14px',
          },
          
        },),
        h('.page-subtitle', 'Secret Seed Phrase'),
      ]),

      h('div.cover', {
        style: {
          display: 'flex',
          flexDirection: 'column',
          padding: '30px 46px',
          justifyContent: 'center',
        },
      }, [

        h('.errorReveal', 'Do not recover your seed phrase in a public place! These words can be used to steal all your accounts.'),

        // confirmation
        h('input.large-input', {
          type: 'password',
          id: 'password-box',
          placeholder: 'Enter your password to confirm',
          onKeyPress: this.checkConfirmation.bind(this),
          style: {
            marginTop: '20px',
            border: '2px solid #C7CDD8',
            height: '40px',
            font: navigator.userAgent.indexOf("Firefox") != -1 ? 'icon' : ''
          },
        }),

        h('.error-login', {
          style: {
            display: warning ? 'block' : 'none',
            marginTop: '20px',
          },
        }, 'Incorrect Password', warning),

        // (props.warning) && (
        //   h('span.error', {
        //     style: {
        //       margin: '20px 0',
        //     },
        //   }, props.warning.split('-'))
        // ),

        props.inProgress && (
          h('span.in-progress-notification', 'Generating Seed...')
        ),

        h('.flex-row.flex-start.flex-right', {
          style: {
            marginTop: 30,
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between'
          },
        }, [
          // cancel
          h('button.btn-violet.btn-Width', {
            style: {
              // position: 'absolute',
              // left: '46px',
              // display: 'flex',
              // justifyContent: 'center',
              // alignItems:'center',
              // height: '40px',
              // width: '119px',
              // paddingLeft: '37px',
              // paddingTop: '12px',
              background: '#FF0035',
            },
            onClick: this.goHome.bind(this),
          }, 'Cancel'),

          // submit
          h('button.btn-Width', {
            // style: {
            //   display: 'flex',
              // position: 'absolute',
              // right: '46px',
              // justifyContent: 'center',
              // alignItems:'center',
              // height: '40px',
              // width: '119px',
              // paddingLeft: '51px',
              // paddingTop: '12px',
            // },
            onClick: this.revealSeedWords.bind(this),
          }, 'OK'),

        ]),
      ]),
    ])
  )
}

RevealSeedConfirmation.prototype.componentDidMount = function () {
  document.getElementById('password-box').focus()
}

RevealSeedConfirmation.prototype.goHome = function () {
  // this.props.onAddContactClicked ? this.props.onAddContactClicked() :
    this.props.dispatch(actions.goConfig())
}

// create vault

RevealSeedConfirmation.prototype.checkConfirmation = function (event) {
  if (event.key === 'Enter') {
    event.preventDefault()
    this.revealSeedWords()
  }
}

RevealSeedConfirmation.prototype.revealSeedWords = function () {
  var password = document.getElementById('password-box').value
  console.log(password, '12345')
  try {
    this.props.dispatch(actions.requestRevealSeed1(password))
  } catch (e) {
    log.error(e)
  }
}
