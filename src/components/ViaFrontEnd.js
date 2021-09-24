import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import useContract from "./hooks/useContract.js"
import useAPY from "./hooks/useAPY"

function SupplyAPY() {
    // const contractAddress = "0x61968FB410644B1642bC0FDC4d6503F1437FaE2A"
    const [amount, setAmount] = useState(0)
    const [deposit, seteposit] = useState(0)
    const { compoundAPY, aaveAPY } = useAPY()
    console.log(compoundAPY, aaveAPY)

    const [allowance, setAllowance] = useState({
        aaveAllowance: 0,
        cDaiAllowance: 0
    })
    
    const {
        Contract,
        aDaiContract,
        LendingPoolContract,
        cDaiContract,
        daiContract,
        data,
        setData,
        web3
    } = useContract();

    const cDaiAddress = "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643"
    const aaveAddress = "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9"
    
    const getAllowance = async () => {
        let accounts = await web3.eth.getAccounts()
        let account = accounts[0]
    
        try {
            const aaveAllowance = await daiContract.methods.allowance(account, aaveAddress).call()
            const cDaiAllowance = await daiContract.methods.allowance(account, cDaiAddress).call()
        setAllowance({
            aaveAllowance: aaveAllowance / 1e18,
            cDaiAllowance: cDaiAllowance / 1e18
        })
        } catch {
            return
        }
    }
    const getBalance = async () => {
        let accounts = await web3.eth.getAccounts()

        // COMPOUND BALANCE DATA
        const cDaiBalance = await cDaiContract.methods.balanceOf(Contract._address).call()
        const valueUnderlying = await cDaiContract.methods.balanceOfUnderlying(Contract._address).call()
        // AAVE BALANCE DATA
        const aDaiBalance = await aDaiContract.methods.balanceOf(Contract._address).call()

        console.log(aDaiBalance / 1e18)
        setData({
            ...data,
            cDaiBalance: cDaiBalance / 1e8,
            daiCompound: valueUnderlying / 1e18,
            aDaiBalance: aDaiBalance
        })
    }


    useEffect(() => {
        console.log(window.ethereum._metamask.isUnlocked()) 
        
        

            getBalance()
            getAllowance()



        
    }, [])


    const withdrawAave = async () => {
        let accounts = await web3.eth.getAccounts()
        let account = accounts[0]
        const aDaiBalance = await aDaiContract.methods.balanceOf(Contract._address).call() // gets most recent balance
        // console.log()
        await Contract.methods.withdrawAave().send({from: account})
    }


    const withdrawCompound = async() => {
        let accounts = await web3.eth.getAccounts()
        let account = accounts[0]
        const cDaiBalance = await cDaiContract.methods.balanceOf(Contract._address).call()
        await Contract.methods.withdrawCompound(cDaiBalance).send({from: account})
    }

    const automaticDeposit = async () => {
            let accounts = await web3.eth.getAccounts()
            let account = accounts[0]
        if (compoundAPY >= aaveAPY) {
            
            await Contract.methods.depositCompound(amount).send({ from: account })
        } else {
            await Contract.methods.depositAave(amount).send({ from: account })
        }        
    }

    



    return (
        
        <Box>
            <Block>
                <Title> Automatic Deposit:</Title>
                <Section>
                <input
                    placeholder="enter amount:"
                    onChange={(e) => { setAmount(e.target.value) }}
                    // value={amount}
                >
                    </input>
                </Section>
                <Section>
                    <Button onClick={automaticDeposit}>Deposit into protocol with highest APY</Button>
                    <Button>rebalance</Button>
                    
                </Section>
                
            </Block>
            <Block>
                <Title>dashboard:</Title>
                <Italic>
                    Total Dai invested into Aave: {data.aDaiBalance / 1e18}
                    <TextButton onClick={withdrawAave}>withdraw</TextButton>
                    <br />
                    Total aDai balance: {data.aDaiBalance / 1e18}
                    <br />
                    Total Dai invested into Compound: {data.daiCompound}
                    <TextButton onClick={withdrawCompound}>withdraw</TextButton>
                    <br />
                    your cDai balance: {data.cDaiBalance}
                    <br />
                    
                    

                    
                </Italic>
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
    width: 20px;
    /* padding: 5px; */

    `

const Block = styled.div`
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
const Italic = styled.i`
    font-size: 16px;
    line-height: 2;

`