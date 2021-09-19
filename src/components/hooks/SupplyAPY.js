import React, {useState} from 'react'

function SupplyAPY() {

    const [apy, setApy] = useState(0)

    const getAPY = () => {
        const ethMantissa = 1e18;
        const blocksPerDay = 6570; // 13.15 seconds per block
        const daysPerYear = 365;

        const supplyApy = (((Math.pow((11445313964 / ethMantissa * blocksPerDay) + 1, daysPerYear))) - 1) * 100;
        console.log(`Supply APY for ETH ${supplyApy} %`);
        setApy(supplyApy)

    }



    return (
        <div>
            hello

            <button onClick={getAPY}>get apy</button>
            {apy} %

        </div>
    )
}

export default SupplyAPY
