const { networkIDs } = require('./enum')
const {
	MAINNET_CODE,
	ROPSTEN_CODE,
	RINKEBY_CODE,
	GOERLI_CODE,
	KOVAN_CODE,
	SOKOL_CODE,
	POA_CORE_CODE,
	XDAI_CODE,
	XDC_CODE,
	CLASSIC_CODE,
	XDC_TESTNET_CODE,
	XDC_DEVNET_CODE,
} = networkIDs

const xdcLink = (prefix) => `https://explorer.${prefix}.network`
const devLink = (prefix) =>  `https://${prefix}.apothem.network`


const getExplorerAccountLinkFor = (account, network) => {
	const prefix = getExplorerPrefix(network)
	if (prefix === 'devnetscan') {
		return `${devLink(prefix)}/address/${account}`
	}
	else if (prefix === 'xinfin') {
		return `https://observer.xdc.org/address-details/${account}`
	}
	else
	return `${xdcLink(prefix)}/address/${account}`
}


const getExplorerTxLinkFor = (hash, network) => {
	const prefix = getExplorerPrefix(network)
	// const chain = getExplorerChain(network)
	if (prefix === 'devnetscan') {
		return `${devLink(prefix)}/tx/${account}`
	}
	else if (prefix === 'xinfin') {
		return `https://observer.xdc.org/address-details/${account}`
	}
	else
	return `${xdcLink(prefix)}/tx/${hash}`
}



const getExplorerTokenLinkFor = (tokenAddress, account, network,symbol) => {
	const prefix = getExplorerPrefix(network)
	// const chain = getExplorerChain(network)
	if (prefix === 'devnetscan') {
		return `${devLink(prefix)}/tokens/${tokenAddress}`
	}
	else if (prefix === 'xinfin') {
		return `https://observer.xdc.org/token-data/${tokenAddress}/${symbol}`
	}
	else
	return `${xdcLink(prefix)}/tokens/${tokenAddress}`
}


function getExplorerChain (network) {
	const net = parseInt(network)
	let chain
	switch (net) {
	case MAINNET_CODE: // main net
	case ROPSTEN_CODE: // ropsten testnet
	case RINKEBY_CODE: // rinkeby testnet
	case KOVAN_CODE: // kovan testnet
	case GOERLI_CODE: // Goerli testnet
		chain = 'eth'
		break
	case SOKOL_CODE: // POA Sokol testnet
	case POA_CORE_CODE: // POA Core
	case XDAI_CODE: // xDai chain
		chain = 'poa'
		break
	case CLASSIC_CODE: // ETC
		chain = 'etc'
		break
	case XDC_CODE: // XDC mainnet
		chain = 'xdc'
		break
	default:
		chain = ''
	}
	return chain
}

function getExplorerPrefix (network) {
	const net = parseInt(network)
	let prefix
	switch (net) {
	case MAINNET_CODE: // main net
	case CLASSIC_CODE: // ETC
	case XDC_CODE: // XDC mainnet
		prefix = 'xinfin'
		break
	case ROPSTEN_CODE: // ropsten testnet
		prefix = 'ropsten'
		break
	case RINKEBY_CODE: // rinkeby testnet
		prefix = 'rinkeby'
		break
	case KOVAN_CODE: // kovan testnet
		prefix = 'kovan'
		break
	case SOKOL_CODE: // POA Sokol testnet
		prefix = 'sokol'
		break
	case POA_CORE_CODE: // POA Core
		prefix = 'core'
		break
	case XDAI_CODE: // xDai chain
		prefix = 'dai'
		break
	case GOERLI_CODE: // Goerli testnet
		prefix = 'goerli'
		break
	case XDC_TESTNET_CODE:
		prefix = 'apothem'
		break
	case XDC_DEVNET_CODE:
		prefix = 'devnetscan'
		break	
	default:
		prefix = ''
	}
	return prefix
}

module.exports = {
	getExplorerAccountLinkFor,
	getExplorerTxLinkFor,
	getExplorerTokenLinkFor,
	
}
