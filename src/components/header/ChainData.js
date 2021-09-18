import React, {useState, useEffect} from 'react'
import styled from "styled-components"

function ChainData() {
    const [address, setAddress] = useState("")

    useEffect(() => {

        try {
            setAddress(truncate(window.ethereum.selectedAddress))
        } catch{setAddress("Please connect to MetaMask")}
    }, [])

    useEffect(() => {
        const metamaskEvent = () => {
          window.ethereum.on('accountsChanged', (accounts) => {
            setAddress(truncate(window.ethereum.selectedAddress))
          });
          window.ethereum.on('chainChanged', (chainId) => {
            window.location.reload();
          });
          
        }
         metamaskEvent();
        return () => {
            window.ethereum.removeAllListeners()
        }
        
      }, [window.ethereum])

    const connect = async () => {

        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAddress(truncate(window.ethereum.selectedAddress))
    }

    const truncate = (str) => {
        if (str !== undefined) {
            return str.substr(0, 6) + '...' + str.substr(str.length - 4);
        } else {
          return  
        }
        
        
    };


    return (
        <Box>
            {address}
            <Button onClick={connect}>{window.ethereum.selectedAddress === null ? ("Connect") : ("Connected")}</Button>
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


