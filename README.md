Hello! Welcome to my Dapp University developer application!

more details to come


Disclaimer:

the deposit functions do not work as of writing this. I get strange errors that I cant figure out. It might have something to do with approving dai. Does calling Dai.approve(protocol, amount) mean that MainContract is calling the approve function, not my EOA? I also tried approving from my account through the front end and still get errors. Could it have to with forking the mainnet? I am also unsure how to compare APY from within solidity, each protocol returns different values. Compound returns a number which reqiures a formula to get APY, which uses decimals, Aave returns a huge number but only needs to be divided by 1e27 and that multiplied by 100 ( or just /1e25) in this case, I compare APY using javascript.


Things to try:
deploy this application to a test net, see if it gives different results.



Things to improve:

add event listeners to automatically update front end
make fetching data on page load more reliable 
add metamask event listener


