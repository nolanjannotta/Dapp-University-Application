import React, { useState } from 'react'
import MainContract from "../ABIs/MainContract.json"
import useContract from "./hooks/useContract.js"

function SupplyAPY() {
    // const contractAddress = "0x61968FB410644B1642bC0FDC4d6503F1437FaE2A"

    const [apy, setApy] = useState(0);
    const { MainContract, data, setData } = useContract();

    console.log(MainContract)

    const getCompoundRate = async() => {
        const compoundRate = await MainContract.methods.getCompoundDaiSupplyRate().call();
        const apy = getAPY(compoundRate)
        setData({
            ...data,
            compoundApy: apy

        })
    }
    const getAaveRate = async () => {
        const aaveRate = await MainContract.methods.getAaveRate().call();
        const apy = aaveRate
        console.log(aaveRate)
        // setData({
        //     ...data,
        //     aaveApy: aaveRate.toString()
        
        // })
    }

    const getAPY = (compoundRate) => {
        const ethMantissa = 1e18;
        const blocksPerDay = 6570; // 13.15 seconds per block
        const daysPerYear = 365;

        const supplyApy = (((Math.pow((compoundRate / ethMantissa * blocksPerDay) + 1, daysPerYear))) - 1) * 100;
        console.log(`Supply APY for ETH ${supplyApy} %`);
        setApy(supplyApy)

    }



    return (
        <div>
            hello

            <button onClick={getCompoundRate}>get Compound rate</button>
            <button onClick={getAaveRate}>get Aave rate</button>

            {apy} %
            {data.compoundApy}
            {data.aaveApy}

        </div>
    )
}

export default SupplyAPY
