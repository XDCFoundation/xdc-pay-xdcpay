import React, {Component} from 'react'
import { connect } from 'react-redux'
import Identicon from '../identicon'
import { addressSummary , nameSummary} from '../../util'
import EthBalance from '../eth-balance-send'
import TokenBalance from '../token-balance-send'
import { getMetaMaskAccounts } from '../../../../ui/app/selectors'

class SendProfile extends Component {
	render () {
		const props = this.props
		const {
			address,
			account,
			identity,
			network,
			networkList,
			conversionRate,
			currentCurrency,
			isToken,
			token,
		} = props
		const Profile = () => {
		
			return (
				<div
					className="account-data-subsection flex-column flex-grow settingsCollapsed sendFields"
					style={{
						// marginLeft: '46px',
						// marginTop: '37px',
						margin: '37px auto 0 auto '
					}}
				>
					{/* header - identicon + nav */}
					{/* <div className="flex-row flex-space-between">
					{/* large identicon*/}
					{/* <div */}
					{/* className="identicon-wrapper flex-column flex-center select-none" */}
					{/* style={{ display: 'inline-block' }} */}
					{/* > */}
					{/* <Identicon diameter={62} address={address} /> */}
					{/* </div> */}
					{/* invisible place holder */}
					{/* <i className="fa fa-users fa-lg invisible" style={{ marginTop: '28px' }} /> */}
					{/* </div> */}
					{/* account label */}
					<div style={{
						textAlign: 'left',
						fontSize: '12px',
						fontFamily: 'Inter-Semibold',
						lineHeight: '15px',
					}}>
						Send From
					</div>
					<div className='sendFields' style={{
						background: '#F8F8F8',
						border: '2px solid #C7CDD8',
						borderRadius: '4px',
						// width:'265px',
						height: '32px',
						paddingLeft: '9px',
						paddingTop: '4px',
					}}>
						<div className="flex-row" style={{ alignItems: 'flex-start' }} >
							<div
								className="send-profile-identity-name font-medium flex-center"
								style={{
									color: '#2A2A2A',
									fontSize: '14px',
									// marginLeft: '-1px',
								}}
							>{identity && nameSummary(identity.name)}</div>
							{/* address and getter actions */}
							<div
								className="flex-row flex-center"
								style={{
									color: '#2A2A2A',
									fontSize: '14px',
									paddingLeft: '1.9px',
									// paddingRight: '4px',
								}}
							>
								-
							</div>
							<div className="send-profile-address" style={{ fontSize: '14px', }}>
								{addressSummary(network, address)}
							</div>
						</div>
						{/* balance */}
						<div className="send-eth-container">
							{isToken ? <TokenBalance token={token} /> : <EthBalance {...{
								value: account && account.balance,
								conversionRate,
								shorten: false,
								currentCurrency,
								network,
								networkList,
							}} />}
						</div>
					</div>
				</div>
			);
		};
		const ExpandProfile = () => {
		
			return (
				<div
					className="account-data-subsection flex-column flex-grow settingsExpanded sendFields"
					style={{
						// marginLeft: '46px',
						// marginTop: '37px',
						margin: '37px auto 0 auto '
					}}
				>
					{/* header - identicon + nav */}
					{/* <div className="flex-row flex-space-between">
					{/* large identicon*/}
					{/* <div */}
					{/* className="identicon-wrapper flex-column flex-center select-none" */}
					{/* style={{ display: 'inline-block' }} */}
					{/* > */}
					{/* <Identicon diameter={62} address={address} /> */}
					{/* </div> */}
					{/* invisible place holder */}
					{/* <i className="fa fa-users fa-lg invisible" style={{ marginTop: '28px' }} /> */}
					{/* </div> */}
					{/* account label */}
					<div style={{
						textAlign: 'left',
						fontSize: '12px',
						fontFamily: 'Inter-Semibold',
						lineHeight: '15px',
					}}>
						Send From
					</div>
					<div className='sendFields' style={{
						background: '#F8F8F8',
						border: '2px solid #C7CDD8',
						borderRadius: '4px',
						// width:'265px',
						height: '32px',
						paddingLeft: '9px',
						paddingTop: '4px',
					}}>
						<div className="flex-row" style={{ alignItems: 'flex-start' }} >
							<div
								className="send-profile-identity-name font-medium flex-center"
								style={{
									color: '#2A2A2A',
									fontSize: '14px',
									// marginLeft: '-1px',
								}}
							>{identity && identity.name}</div>
							{/* address and getter actions */}
							<div
								className="flex-row flex-center"
								style={{
									color: '#2A2A2A',
									fontSize: '14px',
									paddingLeft: '1.9px',
									// paddingRight: '4px',
								}}
							>
								-
							</div>
							<div className="send-profile-address" style={{ fontSize: '14px', }}>
								{address.replace('0x','xdc')}
							</div>
						</div>
						{/* balance */}
						<div className="send-eth-container">
							{isToken ? <TokenBalance token={token} /> : <EthBalance {...{
								value: account && account.balance,
								conversionRate,
								shorten: false,
								currentCurrency,
								network,
								networkList,
							}} />}
						</div>
					</div>
				</div>
			);
		};

		return (
			<div style={{width:'100%'}}>
				<Profile />
				<ExpandProfile/>
				
			</div>
		);
	}
}

function mapStateToProps (state) {
	const accounts = getMetaMaskAccounts(state)
	var result = {
		address: state.metamask.selectedAddress,
		accounts,
		identities: state.metamask.identities,
		network: state.metamask.network,
		networkList: [...state.metamask.networkList, ...state.metamask.frequentRpcList],
		conversionRate: state.metamask.conversionRate,
		currentCurrency: state.metamask.currentCurrency,
	}

	result.account = result.accounts[result.address]
	result.identity = result.identities[result.address]

	return result
}

module.exports = connect(mapStateToProps)(SendProfile)
