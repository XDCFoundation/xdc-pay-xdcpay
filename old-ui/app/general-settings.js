const connect = require('react-redux').connect
const actions = require('../../ui/app/actions')
const React = require('react')
import SimpleDropdown from '../../ui/app/components/dropdowns/simple-dropdown'
import CustomDropDown from '../app/components/common/custom-dropdown'
import locales from '../../app/_locales/index1.json'
import PropTypes from 'prop-types'

const localeOptions = locales.map(locale => {
  return {
    displayValue: `${locale.name}`,
    key: locale.code,
    value: locale.code,
  }
})

const infuraCurrencies = require('./infura-conversion.json').objects.sort(
  (a, b) => {
    return a.quote.name
      .toLocaleLowerCase()
      .localeCompare(b.quote.name.toLocaleLowerCase())
  },
)

const infuraCurrencyOptions = infuraCurrencies.map(({quote: {code, name}}) => {
  return {
    displayValue: `${code.toUpperCase()} - ${name}`,
    key: code,
    value: code,
  }
})

class GeneralSettings extends React.Component {
  static contextTypes = {
    t: PropTypes.func,
  }

  static PropTypes = {
    updateCurrentLocale: PropTypes.func,
  }
  handleCheckBox = () => {
    // eslint-disable-next-line react/prop-types
    const showTokens = this.props.metamask.showTokens
    // eslint-disable-next-line react/prop-types
    this.props.dispatch(actions.showTokens(!showTokens))
  }

  render() {
    
    const state = this.props
    const {t} = this.context
    const metamaskState = state.metamask
    const showTokens = metamaskState.showTokens
    

    const onLanguageSelect = (key) => {
      this.props.dispatch(actions.updateCurrentLocale(key))
    }

    return (
      <div className="flex-column flex-grow">
        {/* <LoadingIndicator/> */}
        <div className="section-title flex-row" style={{paddingBottom: '17px'}}>
          <img src="/images/Assets/BackArrow.svg" style={{marginLeft: '34px', cursor: 'pointer'}} onClick={() => {
            state.dispatch(actions.goConfig())
          }}/>
          <h2 style={{ marginLeft: '88px', fontFamily: 'Inter-Bold' }}>General Settings</h2>
        </div>
        <div style={{borderTop: '1px solid #E3E7EB', padding: '20px 40px'}}>
          {currentConversionInformation(metamaskState, state,t)}
        </div>
        <div style={{borderTop: '1px solid #E3E7EB', padding: '20px 40px'}}>
          {currentLanguage(metamaskState, onLanguageSelect,t)}
        </div>
        <div style={{padding: '20px 40px', borderTop: '1px solid #E3E7EB'}}>
          <div style={{color: '#2149B9', fontSize: '14px', fontFamily: 'Inter-Medium'}}>Hide Tokens Without Balance  
          </div>
          <br/>
          <label className="switch">
            {/* <input type="checkbox" id="checked" /> */}
            <input type="checkbox" id="checked" onChange={this.handleCheckBox} checked={!showTokens}/>
            <span className="slider round"/>
          </label>
          <span style={{marginLeft: '8px'}}>{!showTokens ? 'On' : 'Off'}</span>
        </div>
      </div>
    )
  }
}

module.exports = connect(mapStateToProps)(GeneralSettings)

function mapStateToProps (state) {
  return {
    metamask: state.metamask,
    warning: state.appState.warning,
  }
}


function currentConversionInformation (metamaskState, state,t) {
  // const { t } = this.context;
  const currentCurrency = metamaskState.currentCurrency
  const conversionDate = metamaskState.conversionDate

  const setCurrentCurrency = metamaskState.setCurrentCurrency
  return (
    <div>
      <span style={{fontFamily: 'Inter-Medium', fontSize: '14px', color: '#2149B9'}}>
     {`${t('currentConversion')}`} 
        </span>
      <br/>
      <span style={{fontSize: '14px', color: '#2A2A2A', fontFamily: 'Inter-Medium'}}>
          {`Updated ` + Date(conversionDate)}
        </span>
      <br/>
      <CustomDropDown
        placeholder={(currentCurrency)}
        options={infuraCurrencyOptions}
        selectedOption={currentCurrency}
        onSelect={newCurrency => setCurrentCurrency(newCurrency)}
      />
      <div className="settings-page__content-item-col">
      </div>
    </div>
  )
}

function currentLanguage (metamaskState, onLanguageSelect,t) {
  const {currentLocale} = metamaskState
  const currentLocaleMeta = locales.find(locale => locale.code === currentLocale)
  const currentLocaleName = currentLocaleMeta ? currentLocaleMeta.name : ''
  // const t = this.context
  return (
    <div>
      <div className="settings-page__content-row">
        <div className="settings-page__content-item">
          <div style={{fontFamily: 'Inter-Medium', color: '#2149B9', fontSize: '14px', height: '34px'}}>
           {`${t('currentLanguage')}`} 
          </div>
         {/* <span className="settings-page__content-description">
            {currentLocaleName}
          </span>*/}
        </div>
        <div className="settings-page__content-item" style={{
          height: '40px',
          width: '324',
        }}>
          <div className="settings-page__content-item-col">
            <CustomDropDown
              placeholder={currentLocaleName}
              options={localeOptions}
              selectedOption={currentLocale}
              onSelect={onLanguageSelect}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

