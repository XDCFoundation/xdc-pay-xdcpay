import R from 'ramda'

export function checkExistingAddresses (address, tokenList = []) {
    console.log('Running', address, tokenList)
    if (!address) {
        return false
    }

    const matchesAddress = existingToken => {
        console.log(existingToken, address)
        return existingToken.address.toLowerCase() === address.toLowerCase()
    }

    return R.any(matchesAddress)(tokenList)
}
