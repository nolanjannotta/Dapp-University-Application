module.exports = function(callback) {    
    const Web3 = require('web3');
    const web3 = new Web3("http://localhost:7545")

    const ABI = require('../ABIs/daiABI.json')
    const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F"
    const daiContract = new web3.eth.Contract(ABI, daiAddress)

    const recipient = "0xc440829c412f289EB10EE1d269A737CD6C7039BD"
    const unlockedAddress = "0xB60C61DBb7456f024f9338c739B02Be68e3F545C"

    
    const fundAccount = async () => {
        daiContract.methods.balanceOf(unlockedAddress).call((error, result) => {
            result ? console.log("Whale balance after transfer:", web3.utils.fromWei(result))
                : console.log(error)
        })
        daiContract.methods.transfer(recipient, "100000000000000000000000").send({ from: unlockedAddress }, (error, result) => {
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
