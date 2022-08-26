//  /*Latest Settings UI **/

const inherits = require('util').inherits
const Component = require('react').Component
const h = require('react-hyperscript')
const connect = require('react-redux').connect
const actions = require('../../ui/app/actions')
const LoadingIndicator = require('./components/loading')
import ConfigScreenExpanded from './configExpanded'
import React, {useState} from 'react'
import propTypes from 'prop-types'

const infuraCurrencies = require('./infura-conversion.json').objects.sort(
  (a, b) => {
    return a.quote.name
      .toLocaleLowerCase()
      .localeCompare(b.quote.name.toLocaleLowerCase())
  },
)
const Modal = require('../../ui/app/components/modals/index').Modal

module.exports = connect(mapStateToProps)(ConfigScreen)

function mapStateToProps (state) {
  return {
    metamask: state.metamask,
    warning: state.appState.warning,
    expandUi: state.metamask.expandUi,
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
  const ConfigComponent = () => {
    return (
      h(
        '.flex-column.flex-grow.settingsCollapsed',
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
                },
              ),
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

            //   h('.settings', {onClick: () => state.dispatch(actions.alertSettings())}, ['Alert Settings',
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


    )
  }
  return (
    <div style={{width: '100%'}}>
      <ConfigComponent/>
      <ConfigScreenExpanded/>
    </div>
  )
}



