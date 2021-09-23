import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import useContract from "./hooks/useContract.js"

function SupplyAPY() {
    // const contractAddress = "0x61968FB410644B1642bC0FDC4d6503F1437FaE2A"
    const [amount, setAmount] = useState(0)
    const [allowance, setAllowance] = useState({
        aaveAllowance: 0,
        cDaiAllowance: 0})
    const { Contract, LendingPoolContract, account, daiContract, data, setData, web3 } = useContract();

    const cDaiAddress = "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643"
    const aaveAddress = "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9"
    
    const getAllowance = async () => {
        let accounts = await web3.eth.getAccounts()
        let account = accounts[0]
    
        try {
            const aaveAllowance = await daiContract.methods.allowance(account, aaveAddress).call()
            const cDaiAllowance = await daiContract.methods.allowance(account, cDaiAddress).call()
        setAllowance({
            aaveAllowance: aaveAllowance / 1000000000000000000,
            cDaiAllowance: cDaiAllowance / 1000000000000000000
        })
        } catch {
            return
        }
    }


    useEffect(() => {
        console.log(window.ethereum._metamask.isUnlocked()) 
        
        const getBalance = async () => {
            let accounts = await web3.eth.getAccounts()
            let account = accounts[0]
            const daiBalance =  await daiContract.methods.balanceOf(account).call()
            setData({
                ...data,
                daiBalance: daiBalance
            })
        }

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




    const getCompoundRate = async() => {
        const compoundRate = await Contract.methods.getCompoundDaiSupplyRate().call();
        let apy = getCompoundAPY(compoundRate)
        setData({
            ...data,
            compoundApy: apy.toFixed(2)

        })
    }

    const getAaveRate = async () => {
        const results = await Contract.methods.getAaveRate().call();
        const aaveRate = results[3]
        let apy = aaveRate / 1000000000000000000000000000 // rate is returned in a "ray"
        setData({
            ...data,
            aaveApy: (apy * 100).toFixed(2)
        
        })
    }

    const getCompoundAPY = (compoundRate) => {
        const ethMantissa = 1e18;
        const blocksPerDay = 6570; // 13.15 seconds per block
        const daysPerYear = 365;

        const supplyApy = (((Math.pow((compoundRate / ethMantissa * blocksPerDay) + 1, daysPerYear))) - 1) * 100;
        console.log(`Supply APY for ETH ${supplyApy} %`);
        // setApy(supplyApy)
        return supplyApy 

    }

    const approve = async (addressApproved, amount) => {
        let accounts = await web3.eth.getAccounts()
        let account = accounts[0]
        const result = await daiContract.methods.approve(addressApproved, amount).send({ from: account })
        console.log(result)
        getAllowance()
        // setAllowance(allowance / 1000000000000000000)
    }
    



    return (
        
        <Box>
            <Approve>
            <Title>
                Rates:
                </Title>
                
                <Section>
                    <Button onClick={getCompoundRate}>get Compound rate</Button>
                    <Data>    
                    {data.compoundApy}   
                    </Data>
                
                    <Button onClick={getAaveRate}>get Aave rate</Button>
                    <Data>
                    {data.aaveApy}    
                    </Data>
                </Section>     
           </Approve> 

            <Approve>
            
                <Title>
                    Approve:
                </Title>
                <i>
                Available Dai Balance: {data.daiBalance / 1000000000000000000}
  
                </i>

                <Section>
                   <input
                    placeholder="enter amount: (in wei)"
                    onChange={(e) => { setAmount(e.target.value) }}
                    >
                    </input>
    
   
                    
                    

                </Section>
                <i>
                    you have {allowance.aaveAllowance} DAI approved for Aave
                <br></br>
                    you have {allowance.cDaiAllowance} DAI approved for Cdai
                    
   
                </i>

                        
                   
                <Section>

                <Button onClick={() => { approve(aaveAddress, amount) }}> approve aave</Button>
                <Button onClick={() => { approve(cDaiAddress, amount) }}> approve compound</Button>
   
                </Section>

                
            </Approve>
            
            <Approve>
            <Title>
                Manual Deposit:
            </Title>
            <Section>
                <input
                    placeholder="enter amount:"
                    onChange={(e) => { setAmount(e.target.value) }}
                    // value={amount}
                >
                    </input>
                    </Section>
                    <Section>
                        <Button onClick={depositCompound}> Deposit into compound</Button>
                        <Button onClick={depositAave}> Deposit into aave</Button> 
                    </Section>
                
                
                
            </Approve>
            <Approve>
                <Title> Automatic Deposit ;)</Title>
                <Section>
                <input
                    placeholder="enter amount:"
                    onChange={(e) => { setAmount(e.target.value) }}
                    // value={amount}
                >
                    </input>
                </Section>
                <Section>
                    <Button>Deposit into protocol with highest APY</Button>
                    <Button>re check</Button>
                    
                </Section>
                
            </Approve>
            
        </Box>
    )
}

export default SupplyAPY

const Button = styled.button`
padding: 0 10px;
margin: auto;
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
width: 20px;
/* padding: 5px; */

`

const Approve = styled.div`
    padding: 10px 10px;
    justify-content: center;

`
const Section = styled.div`
    padding: 5px 10px;
    display: flex;
    justify-content: center;

`

const Title = styled.h4`
    padding: 5px 5px;
    text-align: center; 

`