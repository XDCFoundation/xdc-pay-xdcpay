import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MenuDroppo from './menu-droppo'
import extend from 'xtend'
import classnames from 'classnames'

const noop = () => {}

class Dropdown extends Component {
  static defaultProps = {
    isOpen: false,
    onClick: noop,
    useCssTransition: false,
  }

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node,
    style: PropTypes.object,
    className: PropTypes.string,
    onClickOutside: PropTypes.func,
    innerStyle: PropTypes.object,
    useCssTransition: PropTypes.bool,
    constOverflow: PropTypes.bool,
  }

  render () {
    const {
      isOpen,
      onClickOutside,
      style,
      className,
      innerStyle,
      children,
      useCssTransition,
      constOverflow,
    } = this.props

    const innerStyleDefaults = extend({
      // padding: '0px 12px 0 0',
      background: 'transparent',
      // filter: 'contrast(0.6)',
      boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 2px 2px',
      color: '#2A2A2A',
    }, innerStyle)

    const styleDefaults = extend({
      borderRadius: '8px',
      background: '#ffffff',
      
      // boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 30px',
      overflowY: 'auto',
      transition: 'max-height 300ms ease-in-out',
      // marginLeft: '19px',
    }, style)

    return (
      <div className="container1">
        

      <MenuDroppo
        useCssTransition={useCssTransition}
        isOpen={isOpen}
        zIndex={11}
        constOverflow={constOverflow}
        onClickOutside={onClickOutside}
          style={styleDefaults}
          className={className}
        innerStyle={innerStyleDefaults}
        >
        <style>
        {`
          li.dropdown-menu-item:hover { color:#2A2A2A; }
          li.dropdown-menu-item { color: #2A2A2A; position: relative }
        `}
        </style>
        {children}
      </MenuDroppo>
        
      </div>
    )
  }
}

class DropdownMenuItem extends Component {
  static propTypes = {
    closeMenu: PropTypes.func,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node,
    style: PropTypes.object,
    className: PropTypes.string,
  }

  render () {
    const { onClick, closeMenu, children } = this.props
    const style = Object.assign({
      listStyle: 'none',
      padding: (this.props.style && this.props.style.padding) ? this.props.style.padding : '9px 0px',
      fontSize: '14px',
      fontStyle: 'normal',
      fontFamily: 'Inter-Regular',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      borderTop: '1px solid #E3E7EB'
    }, this.props.style)

    return (
      <li
        className={classnames('dropdown-menu-item', this.props.className)}
        onClick={() => {
          onClick()
          closeMenu()
        }}
        style={style}
      >
        {children}
      </li>
    )
  }

}

module.exports = {
  Dropdown,
  DropdownMenuItem,
}
