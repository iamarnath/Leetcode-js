/*
518. Coin Change II
You are given an integer array coins representing coins 
of different denominations and an integer amount 
representing a total amount of money.

Return the number of combinations that make up that 
amount. If that amount of money cannot be made up by any 
combination of the coins, return 0.

You may assume that you have an infinite number of each kind of coin.

The answer is guaranteed to fit into a signed 32-bit integer.

 

Example 1:

Input: amount = 5, coins = [1,2,5]
Output: 4
Explanation: there are four ways to make up the amount:
5=5
5=2+2+1
5=2+1+1+1
5=1+1+1+1+1
Example 2:

Input: amount = 3, coins = [2]
Output: 0
Explanation: the amount of 3 cannot be made up just with coins of 2.
Example 3:

Input: amount = 10, coins = [10]
Output: 1
 

Constraints:

1 <= coins.length <= 300
1 <= coins[i] <= 5000
All the values of coins are unique.
0 <= amount <= 5000
*/
/*
Core Idea
Count all combinations by making two choices at each step:

Take current coin: Use same coin again (unbounded supply)

Skip current coin: Move to next coin in list

Complexity
Time: O(n * amount) - Each (coin_index, amount) pair computed once

Space: O(n * amount) - Memoization table storage

Base Cases
remaining === 0: Valid combination found (return 1)

i === n: No coins left (return 0)

remaining < 0: Invalid combination (return 0)

Memoization Strategy
Stores computed results for (coin_index, remaining_amount) pairs

Prevents redundant calculations of same subproblems

Initialized with -1 to indicate uncomputed states
*/
var change = function (amount, coins) {
    if (amount === 0) return 1;
    const n = coins.length;
    const memo = new Array(n).fill().map(() => new Array(amount + 1).fill(-1));
    function solve(i, remaining) {
        if (remaining == 0) return 1;
        if (i == n || remaining < 0) return 0;
        if (memo[i][remaining] !== -1) {
            return memo[i][remaining];
        }
        if (coins[i] > remaining) {
            memo[i][remaining] = solve(i + 1, remaining);
        }
        const take = solve(i, remaining - coins[i]);
        const skip = solve(i + 1, remaining);
        memo[i][remaining] = take + skip;
        return memo[i][remaining];
    }
    return solve(0, amount);

};

function change(amount, coins) {
    const n = coins.length;
    /*
    t[i] = 1 for all i, because there is always 1 way to make
     amount 0 (by choosing no coins).

    t[j] = 0 for all j > 0, meaning with 0 coins, you cannot make any positive amount.
    */
    // Create a (n+1) x (amount+1) DP table filled with 0s
    const t = Array.from({ length: n + 1 }, () => Array(amount + 1).fill(0));

    // Base case: There is 1 way to make amount 0 (use no coins)
    for (let i = 0; i <= n; i++) {
        t[i][0] = 1;
    }
/*
If the current coin (coins[i-1]) can be used (coins[i-1] <= j),

You can use it (t[i][j - coins[i-1]]) or skip it (t[i-1][j]).

Otherwise, you can only skip it (t[i-1][j]).
*/
    // Fill the DP table
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= amount; j++) {
            if (coins[i - 1] <= j) {
                t[i][j] = t[i][j - coins[i - 1]] + t[i - 1][j];
            } else {
                t[i][j] = t[i - 1][j];
            }
        }
    }

    return t[n][amount];
}
/*
ways = 1: There is exactly one way to make amount 0 (by choosing no coins).

For each coin, you update the number of ways to make every 
amount from coin up to amount.

For each j, you add the number of ways to make j - coin to ways[j],
 because you can reach j by adding coin to all the 
 ways you can make j - coin.

The final answer is ways[amount].
*/
function change(amount, coins) {
    const n = coins.length;
    // ways[i] = total # ways to get amount = i;
    // so, for amount = 0, we have one way: {}
    const ways = new Array(amount + 1).fill(0);
    ways[0] = 1;

    // Take each coin one by one and see
    for (let i = 0; i < n; i++) {
        const curr_coin = coins[i];
        // For each amount from curr_coin up to amount
        for (let j = curr_coin; j <= amount; j++) {
            const remain_amount = j - curr_coin; // For amount j, how many ways to make remain_amount
            ways[j] = ways[j] + ways[remain_amount];
        }
    }

    return ways[amount];
}


let amount = 5, coins = [1, 2, 5];
console.log(change(amount, coins));
