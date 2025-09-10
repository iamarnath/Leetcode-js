/*
309. Best Time to Buy and Sell Stock with Cooldown

You are given an array prices where prices[i] is 
the price of a given stock on the ith day.

Find the maximum profit you can achieve.
 You may complete as many transactions as you 
 like (i.e., buy one and sell one share of 
 the stock multiple times) with the following restrictions:

After you sell your stock, you cannot buy stock
 on the next day (i.e., cooldown one day).
Note: You may not engage in multiple transactions 
simultaneously (i.e., you must sell the stock before you buy again).

 

Example 1:

Input: prices = [1,2,3,0,2]
Output: 3
Explanation: transactions = [buy, sell, cooldown, buy, sell]
Example 2:

Input: prices = [1]
Output: 0
 

Constraints:

1 <= prices.length <= 5000
0 <= prices[i] <= 1000

*/
/*
Key Components:

prices: Array of stock prices by day.

t: 2D memoization table, where t[day][buy]
 stores the maximum profit from day onward, 
 given whether you can buy (buy == 1) or must sell (buy == 0).

maxP(day, buy): Recursive helper function.

Base case: If day >= n (past the last day),
 return 0 (no profit possible).

Memoization: If result for t[day][buy]
 is already computed, return it.

If buy is true (1):

Option 1: Buy on this day, so subtract 
prices[day] and move to next day with buy = 0 (must sell next).

Option 2: Skip buying, move
 to next day with buy = 1.

Take the maximum of these options.

If buy is false (0):

Option 1: Sell on this day, add prices[day] 
and move to day + 2 with buy = 1 (must cooldown one day before next buy).

Option 2: Skip selling, move
 to next day with buy = 0.

Take the maximum of these options.

Store and return the result in t[day][buy].

Start recursion: maxP(0, 1) (start at day 0, can buy).

Time and Space Complexity
Time Complexity:

There are at most n days and 2 possible buy states (0 or 1).

Each state is computed once due to memoization.

So, total states: O(n * 2) = O(n).

Each state does constant work,
 so the overall time complexity is O(n).

Space Complexity:

Memoization table: O(n * 2) = O(n)

Call stack: At most O(n) deep due to recursion.
Total space complexity is O(n).

*/

var maxProfitRec = function (prices) {
    const n = prices.length;
    // Initialize memoization table with -1
    const t = Array.from({ length: 5001 }, () => Array(2).fill(-1));
    function maxP(day, buy) {
        if (day >= n) return 0;
        if (t[day][buy] !== -1) {
            return t[day][buy];
        }
        let profit = 0;
        /*
        If buy is true (1):
            Option 1: Buy on this day, so subtract 
            prices[day] and move to next day with buy = 0 (must sell next).
            Option 2: Skip buying, move
            to next day with buy = 1.
        */
        if (buy) {
            // purchase on that day then i need to sell in future
            const take = maxP(day + 1, 0) - prices[day];// sell price -today's  buy price
            const not_take = maxP(day + 1, 1);//buying
            profit = Math.max(profit, take, not_take)
        }
        //sell
        /*
        If buy is false (0):
            Option 1: Sell on this day, add prices[day] 
            and move to day + 2 with buy = 1 (must cooldown
             one day before next buy).
            Option 2: Skip selling, move
            to next day with buy = 0.
        */
        else {
            const sell = maxP(day + 2, 1) + prices[day];// if sold today,price from 
            // today's date + buy after 2 days

            const not_sell = maxP(day + 1, 0);//sell on next day
            profit = Math.max(profit, sell, not_sell);
        }
        t[day][buy] = profit;
        return profit;
    }
    return maxP(0, 1)
};

/*
How it works:

prices is an array where prices[i] is the stock price on day i.

t[i] stores the maximum profit achievable by the end of day i.

Step-by-step logic:

Edge Cases:
If there are 0 or 1 days, no transactions can be made, so return 0.

Initialization:

t = 0: No profit on the first day.

t[1] = Math.max(prices[1] - prices, 0): On
 the second day, the profit is either 0 (no transaction)
  or the difference between the first two days if it's positive.

Dynamic Programming Loop:

For each day i from 2 to n-1, you consider two options:

Cooldown: Do nothing, so profit is the same as the previous day (t[i-1]).

Sell on day i: Try every earlier day j (0 to i) as the buy day.

If you buy on day j and sell on day i,
 today's profit is prices[i] - prices[j].

If you had profit before day j (specifically, 
up to day j-2 to account for the cooldown), 
add it: prev_profit = j >= 2 ? t[j-2] : 0.

Update t[i] with the maximum profit found.

Return:

The answer is t[n-1], the maximum profit by the last day.

Time and Space Complexity
Time Complexity:

The outer loop runs for each day (n times).

The inner loop tries every possible buy day for
 each sell day (i+1 times for each i).

In total, this is 


O(n ^2) time complexity.

Space Complexity:

The auxiliary array t is of size n, so the space complexity is 

O(n).
*/
var maxProfit = function (prices) {
    const n = prices.length;
    if (n === 0 || n === 1) return 0;
    const t = Array(n).fill(0);
    //t[i] = max profit until day i
    // No profit on the first day
    t[0] = 0;
    // Max profit on the second day (either buy on day 0 and sell on day 1, or do nothing)
    t[1] = Math.max(prices[1] - prices[0], 0);
    //for every i ,i have to choose best j to sell.
    //at i ,i am purchasing the share,then 
    for (let i = 2; i < n; i++) { //sell
        // t[i] ko bhrana hai
        // Cooldown: carry forward the previous day's profit
        t[i] = t[i - 1];
        // Try selling on day i after buying on some earlier day j
        for (let j = 0; j <= i; j++) {
            const today_profit = prices[i] - prices[j];
            //person is buying on jth day
            //so he can't sell on j-1 as there is cool down
            // on jth day,i am buying stock,
            //so can't sell of j-1 as it is cooldown day
            //can't buy on j-1 also as buying on j i.e. two consequtive buys is not allowed
            //so j-1 is colldown
            const prev_profit = j >= 2 ? t[j - 2] : 0;
            
            t[i] = Math.max(t[i], today_profit + prev_profit);
        }
    }
    return t[n - 1];
}
let prices = [1, 2, 3, 0, 2];
//let prices = [1];
let res = maxProfit(prices);
console.log("maxProfit==", res);