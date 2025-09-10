/*
Description
You are given an integer array prices where prices[i] is
the price of NeetCoin on the ith day.

You may choose a single day to buy one NeetCoin and
choose a different day in the future to sell it.

Return the maximum profit you can achieve.
You may choose to not make any transactions,
in which case the profit would be 0.

Example 1:

Input: prices = [10,1,5,6,7,1]

Output: 6
Explanation: Buy prices[1] and sell prices[4], profit = 7 - 1 = 6.

Example 2:

Input: prices = [10,8,7,5,2]

Output: 0
Explanation: No profitable transactions can be made, thus the max profit is 0.

Constraints:

1 <= prices.length <= 100
0 <= prices[i] <= 100

*/

class Solution {
    maxProfit(prices) {
        let maxProfit = 0;
        let minBuyPrice = prices[0];
        // for (let sell of prices) {
        //     maxProfit = Math.max(maxProfit, sell - minBuyPrice);
        //     minBuyPrice = Math.min(minBuyPrice, sell)
        // }
        let pLen = prices.length;
        for (let i = 1; i < pLen; i++) {
            if (prices[i] < minBuyPrice) {
                minBuyPrice = prices[i];
            }
            else {
                let curr_Profit = prices[i] - minBuyPrice;
                maxProfit = Math.max(curr_Profit, maxProfit);
            }
        }
        return maxProfit;
    }
}

const sol = new Solution();

// Example array to test
let prices = [10, 1, 5, 6, 7, 1];

//let prices = [10, 8, 7, 5, 2];

// Call the method and store the result

const result = sol.maxProfit(prices);

// Print the result
console.log(result);
