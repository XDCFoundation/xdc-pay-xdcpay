const Component = require('react').Component
const h = require('react-hyperscript')
const connect = require('react-redux').connect
const actions = require('../../../../ui/app/actions')
const FileInput = require('react-simple-file-input').default
const PropTypes = require('prop-types')

class JsonImportSubview extends Component {
  constructor(props) {
    super(props)

    this.state = {
      file: null,
      fileContents: '',
    }
  }

  render() {
    const { error } = this.props

    return (
      h('div.cover', {
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0 20px',
        },
      }, [

        h('p', { style: { fontSize: '14.5px', fontfamily: 'Inter-Regular' } }, 'Used by a variety of different clients'),

        h(FileInput, {
          readAs: 'text',
          onLoad: this.onLoad.bind(this),
          style: {
            marginTop: '25px',
            fontSize: '15px',
            width: '257px',
            fontFamily: 'Inter-Regular',
          },
        }),

        h('input.large-input', {
          type: 'password',
          placeholder: 'Enter current password',
          id: 'json-password-box',
          onKeyPress: this.createKeyringOnEnter.bind(this),
          style: {
            width: '100%',
            marginTop: '25px',
            height: '36px',
            border: '1px solid #C7CDD8',
            font: navigator.userAgent.indexOf("Firefox") != -1 ? 'icon' : ''
          },
        }),

        h('button', {
          onClick: this.createNewKeychain.bind(this),
          style: {
            marginTop: '25px',
            width: '257px',
            height: '40px',
          },
        }, 'Import'),

        error ? h('span.error.importError', { style: { marginTop: '20px', } }, error) : null,
      ])
    )
  }

  onLoad(event, file) {
    this.setState({ file: file, fileContents: event.target.result })
  }

  createKeyringOnEnter(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      this.createNewKeychain()
    }
  }

  createNewKeychain() {
    const { fileContents } = this.state

    if (!fileContents) {
      const message = 'You must select a file to import.'
      return this.props.displayWarning(message)
    }

    const passwordInput = document.getElementById('json-password-box')
    const password = passwordInput.value

    if (!password) {
      const message = 'You must enter a password for the selected file.'
      return this.props.displayWarning(message)
    }

    this.props.importNewAccount([fileContents, password])
      // JS runtime requires caught rejections but failures are handled by Redux
      .catch()
  }
}

JsonImportSubview.propTypes = {
  error: PropTypes.string,
  displayWarning: PropTypes.func,
  importNewAccount: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    error: state.appState.warning,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    goHome: () => dispatch(actions.goHome()),
    displayWarning: warning => dispatch(actions.displayWarning(warning)),
    importNewAccount: options => dispatch(actions.importNewAccount('JSON File', options)),
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(JsonImportSubview)
