import React, {useState, useEffect} from 'react'
import styled from "styled-components"
import useContract from "../hooks/useContract"

function Address() {
    const { account, data, setData } = useContract({})

    const truncate = (str) => {
        if (str !== null) {
            return str.substr(0, 6) + '...' + str.substr(str.length - 4);
        } else {
          return  
        }
        
        
    };

    const connect = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        
    }

    

    

    


    return (
        <Box>

            {account}
            <Button onClick={connect}>{account === null ? <div>Connect</div> : <div>Connected</div>}</Button>
        </Box>
    )
}

export default Address



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


