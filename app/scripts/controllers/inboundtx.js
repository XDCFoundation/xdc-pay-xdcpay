const Web3 = require("web3");

class Inboundtransaction {

    fetchInbound = async (myaccount) => {
        try {
            const response = await fetch(`https://xdc.blocksscan.io/api/txs/listByAccount/${myaccount}?page=1&limit=20&tx_type=in`)
            const json = await response.json()
            return json.items;
        } catch (error) {
            return "no result found"
        }
    }

    // startListener = async (myaccount, rpcurl) => {
    //     var endBlockNumber, startBlockNumber, callback;

    //     const web3 = new Web3(new Web3.providers.HttpProvider(rpcurl))
    //     await this.inboundTransactions(web3).then(block => {
    //         endBlockNumber = block.number
    //     });
    //     startBlockNumber = endBlockNumber - 4;
    //     // console.log("Searching for transactions to/from account \"" + myaccount + "\" within blocks " + startBlockNumber + " and " + endBlockNumber);
    //     for (var i = startBlockNumber; i <= endBlockNumber; i++) {
    //         await this.blockResult(i, web3, myaccount).then(result => {
    //             if (typeof result != "undefined") {
    //                 callback = result;
    //             }
    //         })
    //     }
    //     return callback;
    // };

    // async inboundTransactions(web3) {
    //     let block = await web3.eth.getBlock('latest')
    //     return block;
    // }

    // async blockResult(i, web3, myaccount) {
    //     var result;
    //     var block = await web3.eth.getBlock(i, true);
    //     if (block != null && block.transactions != null) {
    //         block.transactions.forEach((e) => {
    //             if (myaccount == e.to.toLowerCase()) {
    //                 result = e;
    //             }
    //         })
    //     }
    //     return result;
    // }
}

module.exports = Inboundtransaction