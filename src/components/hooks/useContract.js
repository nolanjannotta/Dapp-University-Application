import { useState, useEffect } from "react"
import { ethers } from "ethers";
// import HTBOAR from "../ABI/HTBOAR.json"

// const contractAddress = "0xE65e520C45414dbF4E504206b4d1d2Bc8d505e21";
// const contractAddresshardhat = "0x172076E0166D1F9Cc711C77Adf8488051744980C";
const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()
const contract = new ethers.Contract(contractAddresshardhat, HTBOAR, provider)



const useContract = () => {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})
    

    // useEffect( () => {
    //     const fetchData = async () => {
            
            
    //     }

    //     fetchData()

        


    // }, [])

    
    
    return {contract, loading, setLoading, data, setData, provider, signer}
}

export default useContract