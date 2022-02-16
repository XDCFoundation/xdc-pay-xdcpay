import React, {Component} from 'react'
const ProgressBarWidth = 264

const ProgressWidth = {
  0: '0px',
  1: `${ProgressBarWidth * 0.25}px`,
  2: `${ProgressBarWidth * 0.6}px`,
  3: `${ProgressBarWidth}px`,
}
const ProgressColor = {
  0: '#eee',
  1: '#F25F5C',
  2: '#0CBE46',
  3: 'green',
}

class PasswordStrengthMeter extends Component {

  createPasswordLabel = (result) => {
    switch (result) {
      case 0:
        return ''
      case 1:
        return 'Poor'
      case 2:
        return 'Moderate'
      case 3:
        return 'Strong'
      // case 4:
      //   return 'Strong'
      default:
        return 'Poor'
    }
  }

  render () {
    // eslint-disable-next-line react/prop-types
    const {password} = this.props
    const testedResult = checkPassword(password)

    return (
      <div className="password-strength-meter" style={{marginTop: '5px'}}>
        <div style={{backgroundColor: '#eee', borderRadius: '5px', width: '264px', height: '5px'}}>
          <div
            style={{backgroundColor: ProgressColor[testedResult], width: ProgressWidth[testedResult], height: '5px'}}/>
        </div>
        <label
          className="password-strength-meter-label"
        >
          {password && password.trim().length !== 0 && (
            <div style={{
              display: 'flex', justifyContent: 'space-between',
            }}>
              <div style={{fontSize: '10px', color: '#9FA9BA'}}>Password strength</div>
              <div style={{fontSize: '10px', color: '#2A2A2A'}}> {this.createPasswordLabel(testedResult)}</div>
            </div>
          )}
        </label>
      </div>
    )
  }
}

export function checkPassword (password) {
  if (!password || !password.trim().length) {
    return 0
  }
  if (password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)) {
    return 3
  } else if (password.match(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[^a-zA-Z]).{8,}$/)) {
    return 2
  } else {
    return 1
  }
}

export default PasswordStrengthMeter
