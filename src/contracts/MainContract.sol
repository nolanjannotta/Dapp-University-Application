pragma solidity ^0.5.16;

// import "./CTokenInterface.sol";
import "../compound-protocol/contracts/CTokenInterfaces.sol";

contract MainContract {

    CTokenInterface cDai;

    constructor(address _cDai) public {
        cDai = CTokenInterface(_cDai);


    }

        
        
        
    function getCompoundDaiSupplyRate() public view returns (uint) {
        uint daiSupplyRate = cDai.supplyRatePerBlock(); 
        return daiSupplyRate;
    
    }
    
    
    
}