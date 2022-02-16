const inherits = require('util').inherits
const EventEmitter = require('events').EventEmitter
const PersistentForm = require('../../../lib/persistent-form')
const connect = require('react-redux').connect
const h = require('react-hyperscript')
const actions = require('../../../../ui/app/actions')
import {props} from 'bluebird'
import {construct} from 'ramda'
import React, {useState, useEffect} from 'react'
import PasswordStrengthMeter, {checkPassword} from '../../components/PasswordStrengthMeter'


// RestoreVaultScreen.prototype.render = function () {
class RestoreVaultScreen extends React.Component {

  constructor (props) {
    super(props)
    this.animationEventEmitter = new EventEmitter()
    this.state = {
      password: '',
      passwordStrength: 0,
    }
  }

  onPasswordChange = (e) => {
    this.setState({password: e.target.value})
    this.setState({passwordStrength: checkPassword(e.target.value)})
  }

  render () {


    var state = this.props
    this.persistentFormParentId = 'restore-vault-form'

    const password = this.state.password
    return h('div', {
      style: {
        width: '100%',
      },
    }, [
      h('.section-title', {
        style: {
          width: '100%',
          height: '38px',
          background: '#E3E7EB',
          marginTop: '-43px',
        }
      },
        h('img', { style: { marginTop: '8px', marginLeft: '9px' }, src: "/images/Assets/xdc-icon-16X16.png" }),
      ),
      h('.initialize-screen.flex-column.flex-center.flex-grow', {
        style: {
          paddingLeft: '30px',
          paddingRight: '30px',
        },
      }, [
        h('h3.flex-center', {
          style: {
            fontFamily: 'Nunito SemiBold',
            background: '#ffffff',
            color: '#2A2A2A',
            width: '100%',
            fontSize: '15px',
            paddingTop: 40,
          },
        }, [
          h('.page-subtitle', {style: {fontWeight: 600}}, 'Restore Vault'),
        ]),

        // wallet seed entry
        // h('h3.flex-left', {
        //   style: {
        //     width: '100%',
        //     marginBottom: '20px',
        //     fontFamily: 'Nunito SemiBold',
        //   },
        // }, 'Wallet Seed'),
        h('textarea.twelve-word-phrase1', {
          style: {marginTop: '24px'},
          placeholder: 'Enter your secret twelve word phrase here to restore your vault.',
        }),

        // password
        h('input.large-input', {
          type: 'password',
          id: 'password-box',
          onChange: this.onPasswordChange,
          placeholder: 'New Password (min 8 chars)',
          dataset: {
            persistentFormId: 'password',
          },
          style: {
            width: '265px',
            height: '40px',
            marginTop: 20,
            border: '2px solid #C7CDD8',
          },
        }),

        h(
          PasswordStrengthMeter, {
            password: password,
          },
        ),

        // confirm password
        h('input.large-input', {
          type: 'password',
          id: 'password-box-confirm',
          placeholder: 'Confirm Password',
          onKeyPress: this.createOnEnter.bind(this),
          dataset: {
            persistentFormId: 'password-confirmation',
          },
          style: {
            width: '265px',
            height: '40px',
            marginTop: 20,
            border: '2px solid #C7CDD8',
          },
        }),

        (state.warning) && (
          h('div', {
            style: {
              // marginLeft: '46px',
              marginTop: '20px',
              width: '265px',
            },
          }, [
            h('div.error.in-progress-notification', state.warning),
          ])
        ),

        // submit

        h('.flex-row.flex-space-between.flex-right', {
          style: {
            marginTop: 24,
            width: '265px',
          },
        }, [

          // cancel
          h('button.btn-violet', {
            onClick: this.showInitializeMenu.bind(this),
            style: {
              width: '120px',
              height: '40px',
              background: '#E3E7EB',
              color: '#2A2A2A',
              marginRight: '25px',
            },
          }, 'Cancel'),

          // submit
          h('button', {
            onClick: this.createNewVaultAndRestore.bind(this),
            style: {
              width: '120px',
              height: '40px',
              background: '#03BE46',
            },
          }, 'Restore'),

        ]),
      ]),
    ])
  }
}


RestoreVaultScreen.prototype.showInitializeMenu = function () {
  if (this.props.forgottenPassword) {
    this.props.dispatch(actions.backToUnlockView())
  } else {
    this.props.dispatch(actions.showInitializeMenu())
  }
}

RestoreVaultScreen.prototype.createOnEnter = function (event) {
  if (event.key === 'Enter') {
    this.createNewVaultAndRestore()
  }
}

RestoreVaultScreen.prototype.createNewVaultAndRestore = function () {
  // check password
  const passwordBox = document.getElementById('password-box')
  const password = passwordBox.value
  var passwordConfirmBox = document.getElementById('password-box-confirm')
  var passwordConfirm = passwordConfirmBox.value
  if (this.state.passwordStrength < 2) {
    this.warning = 'Password strength is poor'
    this.props.dispatch(actions.displayWarning(this.warning))
    return
  }
  if (password !== passwordConfirm) {
    this.warning = 'Password does not match'
    this.props.dispatch(actions.displayWarning(this.warning))
    return
  }
  // check seed
  const seedBox = document.querySelector('textarea.twelve-word-phrase1')
  const seed = seedBox.value.trim()
  // var seed = seedBox.value.split('  ')
  // true if the string has more than a space between words.
  if (seed.split('  ').length > 1) {
    this.warning = 'There can only be a space between words'
    this.props.dispatch(actions.displayWarning(this.warning))
    return
  }
  // true if seed contains a character that is not between a-z or a space
  if (!seed.match(/^[a-z ]+$/)) {
    this.warning = 'Seed words only have lowercase characters'
    this.props.dispatch(actions.displayWarning(this.warning))
    return
  }
  if (seed.split(' ').length !== 12) {
    this.warning = 'Seed phrases are 12 words long'
    this.props.dispatch(actions.displayWarning(this.warning))
    return
  }
  // submit
  this.warning = null
  this.props.dispatch(actions.displayWarning(this.warning))
  this.props.dispatch(actions.createNewVaultAndRestore(password, seed))
}


module.exports = connect(mapStateToProps)(RestoreVaultScreen)

// inherits(RestoreVaultScreen, PersistentForm)
// function RestoreVaultScreen () {

//   PersistentForm.call(this)
// }

function mapStateToProps (state) {
  return {
    currentView: state.appState.currentView,
    warning: state.appState.warning,
    forgottenPassword: state.appState.forgottenPassword,
  }
}
