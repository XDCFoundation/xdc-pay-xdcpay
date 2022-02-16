const EventEmitter = require('events').EventEmitter
const connect = require('react-redux').connect
const h = require('react-hyperscript')
const actions = require('../../../ui/app/actions')
const React = require('react')
import PasswordStrengthMeter, {checkPassword} from '../../../old-ui/app/components/PasswordStrengthMeter'

class InitializeMenuScreen extends React.Component {
  constructor (props) {
    super(props)
    this.animationEventEmitter = new EventEmitter()
    this.state = {
      class: 'JIII',
      password: '',
      passwordStrength: 0,
    }
  }

  componentDidMount = () => {
    document.getElementById('password-box').focus()
  }

  componentWillUnmount = () => {
    // eslint-disable-next-line react/prop-types
    this.props.dispatch(actions.displayWarning(''))
  }

  showRestoreVault = () => {
    this.props.dispatch(actions.showRestoreVault())
  }

  onPasswordChange = (e) => {
    this.setState({password: e.target.value})
    this.setState({passwordStrength: checkPassword(e.target.value)})
  }

  createVaultOnEnter = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      this.createNewVaultAndKeychain()
    }
  }

  createNewVaultAndKeychain = () => {
    const passwordBox = document.getElementById('password-box')
    const password = passwordBox.value

    const passwordConfirmBox = document.getElementById('password-box-confirm')
    const passwordConfirm = passwordConfirmBox.value
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
    this.props.dispatch(actions.createNewVaultAndKeychain(password))
  }

  render () {
    const state = this.props
    return (
      <RenderMenu state={state}
                  password={this.state.password}
                  createVaultOnEnter={this.createVaultOnEnter}
                  showRestoreVault={this.showRestoreVault}
                  createNewVaultAndKeychain={this.createNewVaultAndKeychain}
                  onPasswordChange={this.onPasswordChange}/>
    )
  }
}

const RenderMenu = (props) => {
  const {state, password, onPasswordChange, createVaultOnEnter, createNewVaultAndKeychain, showRestoreVault} = props
  return h('.initialize-screen.flex-column.flex-center.flex-grow', [
    h('.logo'),
    h(
      'div',
      {
        style: {
          marginTop: '40px',
          display: 'flex',
          flexDirection: 'row-reverse',
          marginLeft: '-22px',
        },
      },
      [
        h(
          'h3',
          {
            style: {
              fontSize: '15px',
              color: '#2a2a2a',
              display: 'inline',
              fontWeight: 'bold',
            },
          },
          'Encrypt your new DEN',
        ),
        h('div', {className: 'tooltip'}, [
          h('img', {
            src: '/images/Assets/QuestionMark.svg',
            style: {
              marginRight: '-22px',
              paddingTop: '3px',
              paddingLeft: '5px',
            },
          }),
          h(
            'span',
            {className: 'tooltiptext'},
            'Your DEN is your password-encrypted Storage within XDC Pay',
          ),
        ]),
      ],
    ),

    state.warning
      ? h(
        'div',
        {
          style: {
            width: '260px',
            padding: '20px 0 0',
          },
        },
        [h('div.error', state.warning)],
      )
      : null,

    // password
    h('input.large-input', {
      type: 'password',
      id: 'password-box',
      placeholder: 'New Password (min 8 chars)',
      onChange: onPasswordChange,
      style: {
        width: 265,
        height: 40,
        marginTop: 15,
        border: '2px solid #C7CDD8',
        borderRadius: 4,
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
      onKeyPress: createVaultOnEnter,
      style: {
        width: 265,
        height: 40,
        marginTop: 15,
        border: '2px solid #C7CDD8',
        borderRadius: 4,
      },
    }),

    h(
      'button',
      {
        onClick: createNewVaultAndKeychain,
        style: {
          marginTop: 29,
          width: 265,
          height: 40,
        },
      },
      'Create',
    ),

    h('.flex-row.flex-center.flex-grow', [
      h(
        'p.pointer',
        {
          onClick: showRestoreVault,
          style: {
            fontSize: '14px',
            color: '#2149B9',
            marginTop: '74px',
          },
        },
        'Import Existing Den',
      ),
    ]),
  ])
}

function mapStateToProps (state) {
  return {
    // state from plugin
    currentView: state.appState.currentView,
    warning: state.appState.warning,
  }
}

module.exports = connect(mapStateToProps)(InitializeMenuScreen)
