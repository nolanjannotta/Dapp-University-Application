
module.exports = async function (callback) {
    const Web3 = require('web3');
    const web3 = new Web3("http://localhost:7545")

    const accounts = await web3.eth.getAccounts()
    console.log(accounts[0])

    const ABI = require('../ABIs/daiABI.json')
    const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F"
    const daiContract = new web3.eth.Contract(ABI, daiAddress)

    const recipient = accounts[0]
    const unlockedAddress = "0x6f6c07d80d0d433ca389d336e6d1febea2489264"

    
    const fundAccount = async () => {
        daiContract.methods.balanceOf(unlockedAddress).call((error, result) => {
            result ? console.log("Whale balance after transfer:", web3.utils.fromWei(result))
                : console.log(error)
        })
        daiContract.methods.transfer(recipient, "46000000000000000000000000").send({ from: unlockedAddress }, (error, result) => {
            result ? console.log("Hash:", result) : console.log(error)
        })

        
        

        // daiContract.methods.balanceOf(recipient).call((error, result) => {
        //     result ? console.log("My balance after transfer:", web3.utils.fromWei(result))
        //         : console.log(error)
        // })

            //  why doesnt this work?
        // const starting_balance =  daiToken.methods.balanceOf(recipient).call();
        // console.log(starting_balance)

    }

    
    fundAccount()
    

};
