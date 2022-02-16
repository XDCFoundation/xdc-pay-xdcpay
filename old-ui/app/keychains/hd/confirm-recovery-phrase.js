const connect = require('react-redux').connect
const actions = require('../../../../ui/app/actions')
const React = require('react')

class ConfirmRecoveryPhrase extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      seed1: this.randomInteger(1, 4),
      seed2: this.randomInteger(5, 8),
      seed3: this.randomInteger(9, 12),
      firstWord: '',
      secondWord: '',
      thirdWord: '',
    }

    // this.state = {value: ''};
  }

  randomInteger (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  render () {
    const state = this.props
    const seed = state.seed || state.cachedSeed || ''
    const seedArr = seed.split(' ')
    // const img = () => (<img src='/images/Assets/Check-Green.svg' />);

    return (
      <div>
        <div>
          <img style={{position: 'absolute', left: '18px', cursor: 'pointer'}} src={'/images/Assets/BackArrow.svg'}
               onClick={() => this.props.dispatch(actions.showSeedWords())}
          />
          <row className="h3 flex-center section-title" style={{
            color: '#333333',
            fontWeight: '600',
            justifyContent: 'center',
            margin: '29px 0 36px 0 ',
          }}>

            Confirm Recovery Phrase
          </row>
        </div>

        <div style={{marginLeft: '19px'}}>

          <div>
            <label className="word">
              {`Word ${this.state.seed1 + 1}`}

            </label><br/>
            <div style={{marginBottom: '24px', border: '1px solid #e2e2e2', borderRadius: '4px'}}>
              <input className="input large-input" type="text" placeholder="word" id="password-box1"
                     style={{width: '265px', border: 'none', color: '#2A2A2A'}}
                     onChange={(e) => this.setState({firstWord: e.target.value})}
              />
              {this.state.firstWord === seedArr[this.state.seed1] ? <img src="/images/Assets/Check-Green.svg" style={{
                position: 'absolute',
                right: '13%',
                marginTop: '9px',
              }}/> : ' '}
            </div>
          </div>


          <div>
            <label className="word">
              {`Word ${this.state.seed2 + 1}`}
            </label><br/>
            <div style={{marginBottom: '24px', border: '1px solid #e2e2e2', borderRadius: '4px'}}>
              <input className="input large-input" type="text" placeholder="word" id="password-box2"
                     style={{width: '265px', border: 'none', color: '#2A2A2A'}}
                     onChange={(e) => this.setState({secondWord: e.target.value})}/>
              {this.state.secondWord === seedArr[this.state.seed2] ? <img src="/images/Assets/Check-Green.svg" style={{
                position: 'absolute',
                right: '13%',
                marginTop: '9px',
              }}/> : ' '}
            </div>
          </div>


          <div>
            <label className="word">
              {`Word ${this.state.seed3}`}
            </label><br/>
            <div style={{marginBottom: '24px', border: '1px solid #e2e2e2', borderRadius: '4px'}}>
              <input className="input large-input" type="text" placeholder="word" id="password-box3"
                     style={{width: '265px', border: 'none', color: '#2A2A2A'}}
                     onChange={(e) => this.setState({thirdWord: e.target.value})}/>
              {this.state.thirdWord === seedArr[this.state.seed3 - 1] ? <img src="/images/Assets/Check-Green.svg"
                                                                             style={{
                                                                               position: 'absolute',
                                                                               right: '13%',
                                                                               marginTop: '9px',
                                                                             }}/> : ' '}
            </div>
          </div>
          <div>
            {state.warning ? <div style={{width: '260px', padding: '20px 0 0'}}>
              <div className="error">{state.warning}</div>
            </div> : null}

          </div>

          <div className="button"
            //
               style={{

                 marginTop: '34px',
                 fontSize: '14px',
                 background: '#03BE46',
                 width: '265px',
                 height: '40px',
                 border: 'none',
                 padding: '8px 48px',

               }}
            // disabled={!isValid}


               onClick={() => this.confirmSeedWords()}> Confirm Recovery Phrase
          </div>
        </div>
      </div>

    )
  }
}

function mapStateToProps (state) {
  return {
    seed: state.appState.currentView.seedWords,
    cachedSeed: state.metamask.seedWords,
    warning: state.appState.warning,
  }
}

module.exports = connect(mapStateToProps)(ConfirmRecoveryPhrase)


ConfirmRecoveryPhrase.prototype.confirmSeedWords = function () {
  var passwordBox1 = document.getElementById('password-box1')
  var passwordBox2 = document.getElementById('password-box2')
  var passwordBox3 = document.getElementById('password-box3')
  var password1 = passwordBox1.value
  var password2 = passwordBox2.value
  var password3 = passwordBox3.value
  const state = this.props
  const seed = state.seed || state.cachedSeed || ''
  const seedArr = seed.split(' ')
  var passwordConfirm1 = seedArr[this.state.seed1]
  var passwordConfirm2 = seedArr[this.state.seed2]
  var passwordConfirm3 = seedArr[this.state.seed3 - 1]
  // var passwordConfirm = passwordConfirmBox.value

  if (passwordConfirm1 === password1 && passwordConfirm2 === password2 && passwordConfirm3 === password3) {
    return this.props.dispatch(actions.confirmSeedWords())
    //  (account) => this.showAccountDetail(account)
  } else {
    this.warning = 'Incorrect Seed Words'
    this.props.dispatch(actions.displayWarning(this.warning))
    return
  }
}


ConfirmRecoveryPhrase.prototype.showAccountDetail = function (account) {
  return this.props.dispatch(actions.showAccountDetail(account))
}

ConfirmRecoveryPhrase.prototype.exportAsFile = function (seed) {
  return this.props.dispatch(actions.exportAsFile(`XDCPay Seed Words`, seed))
}

// ConfirmRecoveryPhrase.prototype.confirmSeedWords = function () {
// const seedArr = this.state.seedArr
// const state = this.props
// const seed = state.seed || state.cachedSeed || ''
// const seedArr = seed.split(' ')
// const valid = this.state.firstWord === seedArr[this.state.seed1] && this.state.secondWord === seedArr[this.state.seed2] && this.state.thirdWord === seedArr[this.state.seed3]
// if (valid(true)) {
// return this.props.dispatch(actions.confirmSeedWords())
// }

// else {
//   return
// }


//       [
//         h('.word', `Word ${this.state.seed1}`),
//         h('img', {style:{width:'20px',position:'absolute',top:'25%',right:'15%'},src:'/images/Assets/Check-Green.svg'}),
//         h('input.large-input', {
//           placeholder: 'word',
//           type: 'text',
//           onChange: (e) => this.setState({ firstWord: e.target.value }),
//         },
//         this.state.firstWord === seedArr[seed1] ? h('img', {style:{width:'20px',position:'absolute',top:'25%',right:'15%'},src:'/images/Assets/Check-Green.svg'}) : ' ',


//         ),
//         h('.word', `Word ${this.state.seed2}`),
//         h('img', {style:{width:'20px',position:'absolute',top:'41%',right:'15%',},src:'/images/Assets/Check-Green.svg'}),
//         h('input.large-input', {

//           placeholder: 'word',
//           type: 'text',
//           style: {},
//           onChange: (e) => this.setState({secondWord: e.target.value}),
//         },
//         // this.state.secondWord === seedArr[seed2] ? h('img', {style:{width:'20px',position:'absolute',top:'41%',right:'15%'},src:'/images/Assets/Check-Green.svg'}) : ' ',
//         ),


//         h('.word', `Word ${this.state.seed3}`),
//         h('img', {style:{width:'20px',position:'absolute',top:'59%',right:'15%',},src:'/images/Assets/Check-Green.svg'}),
//         h('input.large-input', {

//           placeholder: 'word',
//           type: 'text',
//           style: {},
//           onChange: (e) => this.setState({thirdWord: e.target.value}),
//         },
//         // this.state.thirdWord === seedArr[seed3] ? h('img', {style:{width:'20px',position:'absolute',top:'59%',right:'15%'},src:'/images/Assets/Check-Green.svg'}) : ' ',

//         ),
//         h('button', {
//           onClick: () => this.confirmSeedWords()
//             .then(account => this.showAccountDetail(account)),
//           style: {
//             marginTop: '34px',
//             fontSize: '14px',
//             background: '#0CBE46',
//             width: '265px',
//             height: '40px',
//             border: 'none',
//           },
//         }, 'Confirm Recovery Phrase'),
//       ],
//     ])

