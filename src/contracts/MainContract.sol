pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

// import "../protocols/compound-protocol/contracts/CTokenInterfaces.sol";
// import "../protocols/compound-protocol/contracts/CErc20Interface.sol";
import "./CTokenInterface.sol";
// import "../protocols/aave-protocol/contracts/lendingpool/LendingPool.sol";
import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import {ILendingPool} from "@aave/protocol-v2/contracts/interfaces/ILendingPool.sol";
import {DataTypes} from '@aave/protocol-v2/contracts/protocol/libraries/types/DataTypes.sol';


contract MainContract {
    // TRY THIS
    // using SafeERC20Upgradeable for IERC20Upgradeable;

    mapping(address => uint) public userToDaiBalance;
    
    
    CTokenInterface public cDai;
    // CErc20Interface public cDaiInterface;
    address public cDaiAddress;

    ILendingPool public aaveLendingPool;

    address public daiAddress;
    IERC20 public daiToken;



    constructor(address _cDai, address _LendingPool, address _daiAddress) public {
        cDai = CTokenInterface(_cDai);
        cDaiAddress = _cDai;
        // cDaiInterface = CErc20Interface(_cDai);
        aaveLendingPool = ILendingPool(_LendingPool);
        daiAddress = _daiAddress;        
        daiToken = IERC20(_daiAddress);

        // FUND CONTRACT WITH DAI

    }
    function fundContract(uint amount) public {
        // address user = msg.sender;
        require(daiToken.transferFrom(msg.sender, address(this), (amount)), "DAI Transfer failed!");
        userToDaiBalance[msg.sender] += amount;
    }

        // APY FUNCTIONS

   

    function getCompoundDaiSupplyRate() public view returns (uint) {
        uint daiSupplyRate = cDai.supplyRatePerBlock(); 
        return daiSupplyRate;
    
    }

    function getAaveRate() public view returns (DataTypes.ReserveData memory) {
        DataTypes.ReserveData memory data;
        data = aaveLendingPool.getReserveData(daiAddress);
        return data;

    }


    

   
    // DEPOSIT FUNCTIONS
    function depositCompound(uint amount) public {
                // UNTESTED CODE
        uint cDaiBalance = (cDai.exchangeRateCurrent()) * amount;


        daiToken.approve(address(cDaiAddress), (amount)); 
        userToDaiBalance[msg.sender] -= amount;  

        cDai.mint(amount);

    }

    
    
    function depositAave(uint amount) public  {
        address user = msg.sender;
        daiToken.approve(address(aaveLendingPool), amount);
        userToDaiBalance[msg.sender] -= amount; 
        aaveLendingPool.deposit(daiAddress, (amount), address(this), 0);
    
    }
    // WITHDRAW FUNCTIONS

    function withdrawCompound(uint amount) public {
        cDai.redeem(amount);
        userToDaiBalance[msg.sender] += amount;
    }

    function withdrawAave() public {
        uint newBalance = aaveLendingPool.withdraw(address(daiToken), uint256(-1), address(this));

        userToDaiBalance[msg.sender] += newBalance;

    }


}