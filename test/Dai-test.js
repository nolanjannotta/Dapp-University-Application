import { contracts_build_directory } from "../truffle-config"

const IERC20 = artifacts.require("IERC20")


contracts_build_directory("IERC20", (account) => {
    const recipient = "0xF12250797381247E90B5e7A653dcDB2a67255056"
    const unlockedAddress = "0xB60C61DBb7456f024f9338c739B02Be68e3F545C"
    const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F"

    it("gets dai balance", async () => {
        const dai = await IERC20.at(daiAddress)
        const balance = await dai.balanceOf(unlockedAddress)
        console.log(balance)
    })
})