Hello! Welcome to my Dapp University developer application!



Disclaimer:

the deposit functions do not work as of writing this. I get strange errors that I cant figure out. It might have something to do with approving dai. Does calling Dai.approve(protocol, amount) mean that MainContract is calling the approve function, not my EOA? I also tried approving from my account through the front end and still get errors. Ive read and watched tutorials on this, and tried the two main ways that ive seen, both give errors. I also tried calling the mint() and deposit functions directly from the front end, still no luck. Could it have to do with forking the mainnet? I am also unsure how to compare APY from within solidity, each protocol returns different values. Compound returns a number which reqiures a formula using decimals, to get APY, Aave returns a number but only needs to be divided by 1e27 and then multiplied by 100 (or just /1e25). In my project, I opted for calculating APY in the frontend.


Things to try:

deploy this smart contract to a test net, see if it gives different results.



Things to improve:

add event listeners to automatically update front end
make fetching data on page load more reliable 
add metamask event listener


strange behaviors:
Aave lending pool does not give me a withdraw function??

