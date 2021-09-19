pragma solidity ^0.5.16;

// import "./CTokenInterface.sol";
import "../compound-protocol/contracts/CTokenInterfaces.sol";

contract MainContract {
        
        
        
        function getCompoundSupplyRate(address _cToken) public view returns (uint) {
            CTokenInterface cToken = CTokenInterface(_cToken);
            uint supplyRateMantissa = cToken.supplyRatePerBlock(); 
            return supplyRateMantissa;
      
        }
    
    
    
}