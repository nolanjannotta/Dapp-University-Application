import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import useContract from "./hooks/useContract.js"
import useAPY from "./hooks/useAPY"

function SupplyAPY() {
         

    
    const [amount, setAmount] = useState(null)
    const [allowance, setAllowance] = useState(0)
    const { Contract, LendingPoolContract, account, daiContract, data, setData, web3 } = useContract();
    const {compoundAPY, aaveAPY} = useAPY()
    const cDaiAddress = "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643"
    const aaveAddress = "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9"
    
    const getAllowance = async () => {
        let accounts = await web3.eth.getAccounts()
        let account = accounts[0]
        const allowance = await daiContract.methods.allowance(account, Contract._address).call()
        setAllowance(allowance / 1e18)
    }
    const getBalance = async () => {
        let accounts = await web3.eth.getAccounts()
        let account = accounts[0]
        const walletDai = await daiContract.methods.balanceOf(account).call()
        const contractDai = await daiContract.methods.balanceOf(Contract._address).call()
        console.log(contractDai)
        setData({
            ...data,
            walletDai: walletDai,
            contractDai: contractDai
        })
    }


    useEffect(() => {        
        getBalance()
        getAllowance()

    }, [])


    const depositAave = async () => {
        let accounts = await web3.eth.getAccounts()
        let account = accounts[0]
        console.log("hello")
        const dai = await Contract.methods.depositAave(amount).send({ from: account })
        console.log(dai)
    }


    const depositCompound = async () => {
        let accounts = await web3.eth.getAccounts()
        let account = accounts[0]
        await Contract.methods.depositCompound(amount).send({ from: account })
   
    }


    const fundContract = async (amount) => {
        let accounts = await web3.eth.getAccounts()
        let account = accounts[0]
        await Contract.methods.fundContract(amount).send({ from: account })
        getBalance()
        getAllowance()
        
    }
    const approve = async (addressApproved, amount) => {
        let accounts = await web3.eth.getAccounts()
        let account = accounts[0]
        const result = await daiContract.methods.approve(Contract._address, amount).send({ from: account })
        console.log(result)
        getAllowance()
        
        // setAllowance(allowance / 1000000000000000000)
    }
    



    return (
        
        <Box>
            <Block>
            <Title>
                Rates:
                </Title>
                
                <Section>
                    <Data>
                    Compound: {compoundAPY} %
                    </Data>
                
                    <Data>
                        Aave: {aaveAPY} %   
                    </Data>
                </Section>     
           </Block> 

            <Block>
            
                <Title>
                    Approve and fund contract:
                </Title>
                
                

                <Section>
                   <input
                    placeholder="enter amount: (in wei)"
                    onChange={(e) => { setAmount(e.target.value)}}
                    >
                    </input>
                    
                </Section>
                
                
                {/* <i>
                    you have {allowance.aaveAllowance} DAI approved for Aave
                <br></br>
                    you have {allowance.cDaiAllowance} DAI approved for Cdai
                    
   
                </i> */}

                        
                   
                <Section>

                <Button onClick={() => { approve(aaveAddress, amount) }}> approve</Button>
                <Button onClick={() => { fundContract(amount) }}>fund contract </Button>
   
                </Section>
                <Italic>Wallet Dai Balance: {(data.walletDai / 1000000000000000000)}</Italic>

                <br/>
                <Italic>Deposited Dai Balance: {(data.contractDai / 1000000000000000000)}</Italic>
                <br/>
                <Italic>{allowance} approved</Italic>
            

                
            </Block>
            
            <Block>
            <Title>
                Manual Deposit:
            </Title>
            <Section>
                <input
                    placeholder="enter amount:"
                    onChange={(e) => { setAmount(e.target.value)}}
                    // value={amount}
                >
                    </input>
                    </Section>
                    <Section>
                        <Button onClick={depositCompound}> Deposit into compound</Button>
                        <Button onClick={depositAave}> Deposit into aave</Button>
                        
                </Section>
                
                
                
            </Block>
            
            
        </Box>
    )
}

export default SupplyAPY

const Button = styled.button`
    padding: 0 10px;
    margin: auto;
    
    `
const TextButton = styled.button`
    background-color: transparent;
    border: none;
    font-size: 14px;

`


const Box = styled.div`
margin-top: 20px;
width: 500px;
height: 700px;
background-color: pink;
/* display: flex; */
/* align-items: center; */

`
const Data = styled.i`
position: relative;
/* width: 20px; */
/* padding: 5px; */

`

const Block = styled.div`
    padding: 10px 10px;
    justify-content: center;

`
const Section = styled.div`
    padding: 5px 10px;
    display: flex;
    justify-content: space-around;

`

const Title = styled.h4`
    padding: 5px 5px;
    text-align: center; 

`
const Italic = styled.i`
    font-size: 14px;

`