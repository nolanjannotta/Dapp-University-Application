import { useState } from "react"
import Web3 from 'web3';
import daiABI from "../../ABIs/daiABI.json";




const useContract = () => {
    const web3 = new Web3(window.ethereum)
    const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F"
    const daiContract = new web3.eth.Contract(daiABI, daiAddress)


    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})
    
    
    
    return {daiContract, loading, setLoading, data, setData, web3}
}

export default useContract