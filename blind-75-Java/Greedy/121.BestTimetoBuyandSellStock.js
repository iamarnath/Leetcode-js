/*
121. Best Time to Buy and Sell Stock
You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

 

Example 1:

Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
Example 2:

Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.
 

Constraints:

1 <= prices.length <= 105
0 <= prices[i] <= 104

*/

/*
var maxProfit = function(prices) {
Defines a function named maxProfit that takes an array prices, where each element represents the stock price on a given day.

let l = 0, r = 1;
Initializes two pointers:

l (left pointer) marks the buy day.

r (right pointer) marks the sell day (starts one day after the buy day).

let maxP = 0;
Initializes a variable to keep track of the maximum profit found so far.

while (r < prices.length) {
Begins a loop that continues as long as r is within the array bounds — meaning we still have days left to evaluate potential sales.

if (prices[l] < prices[r]) {
Checks if the stock price on day l (buy day) is lower than on day r (sell day). This ensures a profitable trade.

let profit = prices[r] - prices[l];
Calculates the profit if you buy at price l and sell at price r.

maxP = Math.max(maxP, profit);
Updates maxP to store the maximum between the current maxP and the newly computed profit.

else { l = r; }
If prices[l] >= prices[r], it’s not profitable to sell; so move the buy pointer l to r — meaning a new potential buy day.

r++;
Moves the sell pointer one day forward in every iteration to evaluate the next possible sale.

return maxP;
After scanning all pairs, returns the maximum profit that could have been made from exactly one transaction.

Example Walkthrough
Suppose prices = [7][1][5][3][6][4]:

Start with l = 0 (price 7), r = 1 (price 1) → not profitable → l moves to 1.

r = 2 → prices[l] = 1, prices[r] = 5 → profit = 4 → maxP = 4.

r = 3 → profit = 2 → keep maxP = 4.

r = 4 → profit = 5 → maxP = 5.

r = 5 → profit = 3 → final maxP = 5.

Complexity Analysis
Time Complexity:
The algorithm makes one pass through the prices array using two pointers → O(n).

Space Complexity:
Only a few variables (l, r, maxP, profit) are used → O(1).

*/

var maxProfit = function(prices) {
    let l = 0,
        r = 1;
    let maxP = 0;

    while (r < prices.length) {
        if (prices[l] < prices[r]) {
            let profit = prices[r] - prices[l];
            maxP = Math.max(maxP, profit);
        } else {
            l = r;
        }
        r++;
    }
    return maxP;
}
prices = [7,1,5,3,6,4]
let res = maxProfit(prices);
console.log("result ==",res);