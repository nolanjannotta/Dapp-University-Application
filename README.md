Hello! Welcome to my Dapp University developer application!


To demo:

to start, clone this repo. find your way to an empty directory and in your terminal paste this:

 `git clone https://github.com/nolanjannotta/Dapp-University-Application application_name`
 
 change "application_name" to anything you like.
 
 
 Then, install the dependencies with:
 
 `npm install`
 
 then, in another terminal window, paste this:
 
 `ganache-cli --fork https://mainnet.infura.io/v3/YOUR_INFURA_KEY_HERE --unlock 0x6f6c07d80d0d433ca389d336e6d1febea2489264 --port 7545`
 
replace infura url with your own key, and if you like, you can choose a different address to unlock. At the time of this writing, the address above has about 46,000,000 Dai and a few thousand Ether, which is plenty for this purpose. 


then, to deploy the contract, paste this:

`truffle migrate --reset`

at this point youll probably run into some errors, to fix them, remane the open zeppelin node module folder from "@openzeppelin/contracts" to "openzeppelin-solidity"

theres also probably some errors about solidity versions, to fix them we need to change the solidity version to "^0.5.16" in (i believe) 3 files; ILendingPool.sol, DataTypes.sol and ILendingPoolAddressesProvider.sol, all in the @aave node module. the errors will tell you exactly where they are. (in hindsight, probably easier to put these files in their own contracts folder) you might also see "Duplicate contract names" warnings, these im not sure about, but it should still compile and deploy, if not, reach out to me.

next, paste this into a new terminal window: 

`truffle exec src/scripts/sendDai.js`

this runs a script which transfers Dai from the unlocked account into the first account provided by ganache.

next, start the app with:

`npm run start`

this should open up a browser and start loading the application. 
after a minute, you should see the front end.



next we need to import the account that we funded with the script, go back to the first terminal window that we forked the mainnet in and scroll up until you see the list of private keys. copy the first one, and import it into metamask. (click on the top right circle, and click on import, and paste in the private key).

NEXT, we need to connect metamask to the ganache mainnet fork. go into metamask, click on the top network tab, scroll down and click custom RPC. 
give it a creative name, like "ganache mainnet fork" the RPC url in our case is http://localhost:7545 and the chain ID is 1337, then click save.

all thats left now is to navigate back to the app page, click on connect on the top right corner, follow instructions on metamask, then refresh.

and voilà, if all went according to plan you should have the app up and running and ready to interact with.

video walk though: https://drive.google.com/file/d/1gN34SX_U0FEtQYL-b4eCi6FDOS8Y3R9a/view?usp=sharing







Things to improve:

add event listeners to automatically update front end
make fetching data on page load more reliable 
add metamask event listener
add error handling (ex. disabling buttons with empty inputs)

