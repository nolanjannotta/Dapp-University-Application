const MainContract = artifacts.require("MainContract");
console.log("hello")



module.exports = async function (deployer, development, accounts) {

    const cDai = '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643';

    const aaveLendingPool = '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9';

    const dai = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
    const kovanDai = "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa";
    const rinkebyDai = "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa";

    await deployer.deploy(MainContract, cDai, aaveLendingPool, dai);
    const contract = await MainContract.deployed()
    // console.log(contract)
};

