pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

import "../protocols/compound-protocol/contracts/CTokenInterfaces.sol";
import "../protocols/aave-protocol/contracts/lendingpool/LendingPool.sol";
import {ILendingPool} from "@aave/protocol-v2/contracts/interfaces/ILendingPool.sol";
import {DataTypes} from '@aave/protocol-v2/contracts/protocol/libraries/types/DataTypes.sol';


contract MainContract {

    CTokenInterface public cDai;
    ILendingPool public aaveLendingPool;
    address public daiToken;



    constructor() public {
        cDai = CTokenInterface(0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643);
        aaveLendingPool = ILendingPool(0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9);
        daiToken = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
    }

    function getCompoundDaiSupplyRate() public view returns (uint) {
        uint daiSupplyRate = cDai.supplyRatePerBlock(); 
        return daiSupplyRate;
    
    }

    function getAaveRate() public view returns (DataTypes.ReserveData memory) {
        DataTypes.ReserveData memory data;
        // (,,,,uint reserve,,,,,,,,) = aaveLendingPool.getReserveData(daiToken);
        data = aaveLendingPool.getReserveData(daiToken);
 

        return data;
        // return aaveLendingPool;

    }
        
    
    
    
}