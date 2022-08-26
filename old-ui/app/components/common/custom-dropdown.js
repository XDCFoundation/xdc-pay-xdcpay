import React from 'react'

class CustomDropDown extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isOptionsVisible: false,
    }
  }

  toggleDropDown = () => {
    this.setState({isOptionsVisible: !this.state.isOptionsVisible})
  }

  render () {
    // eslint-disable-next-line react/prop-types
    const {options, onSelect, selectedOption} = this.props
    const selectedOptionData = options ? options.find(data => data.value === selectedOption) : null

    return (
      <div className="container">
        <div className="selected-value-container" onClick={this.toggleDropDown}>
          <span>{selectedOptionData ? selectedOptionData.displayValue : '2 minutes'}</span>
          <img src="/images/Assets/DownArrow.svg"/>
        </div>
        {this.state.isOptionsVisible && options &&
          <div className="custom-dropdown-options" style={{ overflowY: "auto"}}>
          {options.map((data, index) => {
            return (
              <span className="custom-dropdown-option" key={data.key}
                    onClick={() => {
                      this.toggleDropDown()
                      onSelect(data.value)
                    }}>{data.displayValue}</span>)
          })}
        </div>}
      </div>)
  }
}

export default CustomDropDown
