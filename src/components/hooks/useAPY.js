import { useState, useEffect } from "react";
import useContract from "./useContract"

const useAPY = () => {

    const { Contract } = useContract();
    const [compoundAPY, setCompoundAPY] = useState(0)
    const [aaveAPY, setAaveAPY] = useState(0)

    const getCompoundAPY = (compoundRate) => {
        const ethMantissa = 1e18;
        const blocksPerDay = 6570; // 13.15 seconds per block
        const daysPerYear = 365;

        const supplyApy = (((Math.pow((compoundRate / ethMantissa * blocksPerDay) + 1, daysPerYear))) - 1) * 100;
        console.log(`Supply APY for ETH ${supplyApy} %`);
        // setApy(supplyApy)
        return supplyApy 

    }
    const getCompoundRate = async() => {
        const compoundRate = await Contract.methods.getCompoundDaiSupplyRate().call();
        let apy = getCompoundAPY(compoundRate)
        setCompoundAPY(apy.toFixed(2))
    }

    const getAaveRate = async () => {
        const results = await Contract.methods.getAaveRate().call();
        const aaveRate = results[3]
        let apy = aaveRate / 1e27 // rate is returned in a "ray"
        setAaveAPY((apy * 100).toFixed(2))
    }

    useEffect(() => {
        getAaveRate()
        getCompoundRate()
        
    }, [])


    return {
        compoundAPY, aaveAPY

    }
}

export default useAPY