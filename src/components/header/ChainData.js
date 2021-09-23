import React, {useState, useEffect} from 'react'
import styled from "styled-components"
import Web3 from 'web3';
import useContract from "../hooks/useContract"

function ChainData() {
    // const [address, setAddress] = useState("")
    const { daiContract, data, setData, web3 } = useContract({})

    // const loadDai = async() => {

    //     daiContract.methods.balanceOf(window.ethereum.selectedAddress.toString()).call((error, result) => {
    //         result ? setData({
    //             ...data,
    //             daiBalance: web3.utils.fromWei(result).toString()
    //         })
    //             : console.log(error)
    //     })
    //     const ethBalance = await web3.eth.getBalance(window.ethereum.selectedAddress.toString())
    //     setData({
    //         ...data,
    //         ethBalance: web3.utils.fromWei(ethBalance)
    //     })
        
    // }
    // loadDai()


    
    // displayed selected address if any on page load
    useEffect(() => {
        // loadDai()
        window.ethereum.setMaxListeners(0)

        // if (window.ethereum.selectedAddress !== null) {
        //     loadAddress()
        // } else {
        //      setData({
        //         ...data,
        //         address: "Please connect to MetaMask"})
        // }
           
        // loadDai()
    }, [])


    // handles accounts and chain change events:
    // useEffect(() => {
        
    // const metamaskEvent = () => {
    //     //   window.ethereum.removeAllListeners()  
        
    //         window.ethereum.once('accountsChanged', (accounts) => {
    //             setData({
    //                 ...data,
    //                 address: truncate(window.ethereum.selectedAddress)})
    //         });
    //         window.ethereum.once('chainChanged', (chainId) => {
    //             window.location.reload();
    //         });
          
    //             }
        
    //      metamaskEvent();
    //     return () => {
            
            
    //     }
        
    //   }, [window.ethereum])

    const connect = async () => {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setData({
            ...data,
            address: truncate(window.ethereum.selectedAddress)
        })

       
    }

    const truncate = (str) => {
        if (str !== null) {
            return str.substr(0, 6) + '...' + str.substr(str.length - 4);
        } else {
          return  
        }
        
        
    };


    return (
        <Box>
            <div>
            </div>

            {/* {window.ethereum.selectedAddress !== null && data.address} */}
            <Button onClick={connect}>{window.ethereum.selectedAddress === null ? <div>Connect</div> : <div>{data.address} Connected</div>}</Button>
        </Box>
    )
}

export default ChainData



const Button = styled.div`
    background-color: transparent;
    cursor: pointer;
    padding: 0 15px;
    /* margin-top: 20px; */


`
const Box = styled.div`
    /* background-color: orange; */
    display: flex;
    width: 50%;
    justify-content: right;




`


