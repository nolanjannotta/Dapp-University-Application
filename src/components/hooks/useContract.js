import { useState } from "react"
import Web3 from 'web3';
import MainContractABI from "../../ABIs/MainContractABI.json";




const useContract = () => {
    const web3 = new Web3(window.ethereum)
    const contractAddress = "0xc4dbd8B5Aa87EB02dF514816608262aCEf542494"
    console.log(MainContractABI)
    const MainContract = new web3.eth.Contract(MainContractABI, contractAddress)


    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})
    
    
    
    return {MainContract, loading, setLoading, data, setData, web3}
}

export default useContract