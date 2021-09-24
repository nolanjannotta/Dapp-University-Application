import { useState } from "react"
import Web3 from 'web3';
import MainContract from "../../ABIs/MainContract.json";
import LendingPool from "../../ABIs/LendingPool.json";
import CTokenInterface from "../../ABIs/CTokenInterface.json";
import IAToken from "@aave/protocol-v2/artifacts/contracts/interfaces/IAToken.sol/IAToken.json";

import IERC20 from "../../ABIs/IERC20.json";




const useContract = () => {
    
    const web3 = new Web3(window.ethereum)
    const lendingPoolAddress = "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9";
    const cDai = "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643"
    const aDai = "0x028171bca77440897b824ca71d1c56cac55b68a3"
    const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    const networkData = MainContract.networks[1]

    const Contract = new web3.eth.Contract(MainContract.abi, networkData.address) //main contract
    const aDaiContract = new web3.eth.Contract(IAToken.abi, aDai)
    const daiContract = new web3.eth.Contract(IERC20.abi, daiAddress)
    const cDaiContract = new web3.eth.Contract(CTokenInterface.abi, cDai)
    const LendingPoolContract = new web3.eth.Contract(LendingPool.abi, lendingPoolAddress)
    

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})
    // console.log(networkData.address)

    // const getAccount = async () => {
    //     let accounts = await web3.eth.getAccounts()
    //     let account = accounts[0]
    //     return account
        
    // }
    // const account = getAccount()
    
    
    return {
        Contract,
        aDaiContract,
        cDaiContract,
        LendingPoolContract,
        daiContract,
        loading,
        setLoading,
        data,
        setData,
        web3
    }
}

export default useContract