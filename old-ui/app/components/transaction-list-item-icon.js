const Component = require('react').Component
import React from "react";
const h = require('react-hyperscript')
const inherits = require('util').inherits
import ReactTooltip from "react-tooltip";
const Identicon = require('./identicon')

module.exports = TransactionIcon

inherits(TransactionIcon, Component)
function TransactionIcon() {
  Component.call(this)
}

TransactionIcon.prototype.render = function () {
  const { transaction, txParams, isMsg } = this.props
  const randomnumber = Math.floor(Math.random() * 100);
  switch (transaction.status) {
    case 'unapproved':
      return h(!isMsg ? '.unapproved-tx-icon' : 'i.fa.fa-certificate.fa-lg')

    case 'rejected':
    case 'failed':
      return h('i.tx-warning')

    case 'submitted':
      return h('div', [
        <div data-tip data-for={`${randomnumber}`} className={'i.new-tx'}
          style={{
            marginLeft: '10px',
            // marginRight: '29px',
          }}
        > {"..."}
        </div>,
        <ReactTooltip
          id={`${randomnumber}`}
          place="right"
          type="dark"
          effect="solid"
        >
          {"Pending"}
        </ReactTooltip>,
      ])
  }

  if (isMsg) {
    return h('i.fa.fa-certificate.fa-lg', {
      style: {
        width: '40px',
      },
    })
  }

  if (txParams.to) {
    // return h('i.sent'
    return h(Identicon, {
      diameter: 40,

      address: txParams.to || transaction.hash,
    }
    )
  } else {
    return h('i.contract-small', {
      style: {
        marginLeft: '11px',
      },
    })
  }
}
