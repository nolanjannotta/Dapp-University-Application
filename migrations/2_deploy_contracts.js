const MainContract = artifacts.require("MainContract");
console.log("hello")



module.exports = async function (deployer, development, accounts) {
    const cDai = '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643';
    const aaveLendingPool = '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9';
    const dai = '0x6B175474E89094C44Da98b954EedeAC495271d0F';

    await deployer.deploy(MainContract);
    const contract = await MainContract.deployed()
    // console.log(contract)
};

