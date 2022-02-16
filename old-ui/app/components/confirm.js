import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class ConfirmScreen extends Component {
	static propTypes = {
		subtitle: PropTypes.string.isRequired,
		renderAdditionalData: PropTypes.func,
		question: PropTypes.string.isRequired,
		withDescription: PropTypes.bool,
		description: PropTypes.string,
		onCancelClick: PropTypes.func.isRequired,
		onNoClick: PropTypes.func.isRequired,
		onYesClick: PropTypes.func.isRequired,
	}

	render () {
		return (
		<div
			className="flex-column flex-grow"
			style={{
				overflowX: 'auto',
				overflowY: 'hidden',
			}}
		>
			<div className="section-title flex-row flex-center">
				<img className="cursor-pointer"
					src='/images/Assets/Close.svg'
					onClick={() => this.props.onCancelClick()}
					style={{
					position: 'absolute',
					left: '18px',
					width: '14px'
				}}
				/>
				<h2 className="page-subtitle">{this.props.subtitle}</h2>
			</div>
			{this.props.withDescription ? (
				<div style={{
					margin: '30px 30px 0px ',
				}}>
					<div className="error">{this.props.description}</div>
				</div>
			) : null}
			{this.props.renderAdditionalData ? this.props.renderAdditionalData() : null}
			<p className="confirm-label"
				style={{
					textAlign: 'center',
					margin: '30px 46px 33px',
					background: '#FFF2F5',
					color: '#FF0035',
					border: '1px solid',
					padding: '20px 20px',
				}}
			>{this.props.question}
			</p>
			<div className="flex-row flex-right"
				style={{
					marginRight: '30px',
				}}
			>
				<button className="btn-violet"
					onClick={() => this.props.onNoClick()}
					style={{
						display: 'flex',
            			position: 'absolute',
            			left: '46px',
            			height: '40px',
        			    width: '119px',
        			    paddingLeft: '51px',
        			    paddingTop: '12px',
            			background: '#FF0035',
					}}
					>
					No
				</button>
				<button
					onClick={() => this.props.onYesClick()}
					style={{
						display: 'flex',
            			position: 'absolute',
            			right: '46px',
            			height: '40px',
        			    width: '119px',
        			    paddingLeft: '49px',
        			    paddingTop: '12px',
					}}
				>
					Yes
				</button>
			</div>
		</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		metamask: state.metamask,
		warning: state.appState.warning,
	}
}

module.exports = connect(mapStateToProps)(ConfirmScreen)
