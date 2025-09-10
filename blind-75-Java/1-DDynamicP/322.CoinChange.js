/*
322. Coin Change

Description
You are given an integer array coins representing coins of different
 denominations (e.g. 1 dollar, 5 dollars, etc) and an integer amount
  representing a target amount of money.

Return the fewest number of coins that you need to make up the
 exact target amount. If it is impossible to make up the amount, return -1.

You may assume that you have an unlimited number of each coin.

Example 1:

Input: coins = [1,5,10], amount = 12

Output: 3
Explanation: 12 = 10 + 1 + 1. Note that we do not have to use every
 kind coin available.

Example 2:

Input: coins = [2], amount = 3

Output: -1
Explanation: The amount of 3 cannot be made up with coins of 2.

Example 3:

Input: coins = [1], amount = 0

Output: 0
Explanation: Choosing 0 coins is a valid way to make up 0.

Constraints:

1 <= coins.length <= 10
1 <= coins[i] <= 2^31 - 1
0 <= amount <= 10000

*/
// Knapsack unbounded problem
function max(a,b){
    return (a>b)?a:b;
}
function knapsackUnboundRecursive(wt,val,w,n){
     // Base Case
    if(n === 0 || w === 0){
        return 0;
    }
     /*
    once we have visited any item,we will include/exclude it.
    we will call next function with n-1
    if value is taken,we will make next call with  n-1 and val[n-1] is added
   val[n-1]+knapsackUnboundRecursive(wt,val,w-wt[n-1],n-1) will be replaced by 
   val[n-1]+knapsackUnboundRecursive(wt,val,w-wt[n-1],n)
   .we can take the same nth value again
    */
    if(wt[n-1] <= w){
        return max(
            val[n-1]+knapsackUnboundRecursive(wt,val,w-wt[n-1],n),
            //Add its value val[n-1] and reduce the capacity by its 
            // weight w - wt[n-1]. Since you can use unlimited items,
            //  you call the function again with the same n (same item).
        knapsackUnboundRecursive(wt,val,w,n-1)
        //Move to the next item (n-1) without changing the capacity.
    )
    }
 
    else{
        //If the item's weight is more than the capacity,
        //  you cannot include it, so you move to the next item.
       return knapsackUnboundRecursive(wt,val,w,n-1);
    }
}
// let wt = [ 10, 20, 30 ];
// let val = [ 60, 100, 120 ];

// let w = 50;
// let wt = [ 1, 3, 4, 5 ];
// let val = [10, 40, 50, 70 ];

// let w = 8;
// let n = val.length;
var w = 100;
var val = [10, 30, 20];
var wt = [5, 10, 15];
var n = val.length;


// console.log("knapsackUnboundRecursive");

// console.log(knapsackUnboundRecursive(wt,val,w,n));

// Time Complexity: O(N*W). 
// As redundant calculations of states are avoided.
// Auxiliary Space: O(N*W). 
// The use of 2D array data structure for storing intermediate states-:
/*
How it works:
Base Case: If no items are left (n === 0) or capacity is 0 (w === 0),
 max value is 0.

If the weight of the current item wt[n-1] is less than or equal
 to the current capacity w, you have two choices:

Include the item: Add its value val[n-1] and reduce the capacity
 by its weight w - wt[n-1]. Since you can use unlimited items, 
 you call the function again with the same n (same item).

Exclude the item: Move to the next item (n-1) without changing the capacity.

If the item's weight is more than the capacity, you cannot include it,
 so you move to the next item.

*/
/*
dp[i][j] represents the maximum value 
achievable with the first i items and knapsack capacity j.

Initialize dp[j] = 0 and dp[i] = 0 because with zero items
 or zero capacity, max value is zero.

For each item i (from 1 to n) and each capacity j (from 1 to W):

If the item's weight wt[i-1] is less than or
 equal to j, you have two choices:

Include the item: Add its value val[i-1] and 
look up dp[i][j - wt[i-1]] (notice i stays the same because
 you can reuse the item).

Exclude the item: Use the value from dp[i-1][j], which 
is the best value without the current item.

Take the maximum of these two choices.

If the item cannot fit (wt[i-1] > j), just carry forward
 the value from dp[i-1][j].
*/
function knapsackUnboundedDP(wt,val,w,n){
    // Base Case
    //var dp=[];
    // for(let k=0;k<n+1;k++){
    //     dp[k] = [];
    //     for(let m=0;m<w+1;m++){
    //         dp[k][m] = -1;
    //     } 
    // }
   var dp = new Array(n+1);

    for(let i=0;i<n+1;i++){
        dp[i] = new Array(w + 1);
        for(let j=0;j<w+1;j++){
            if(i === 0 || j === 0){
                dp[i][j] =0;
            }
            else if(wt[i-1] <= j){
                  /*
    once we have visited any item,we will include/exclude it.
    we will call next function with n-1
    if value is taken,we will make next call with  n-1 and val[n-1] is added
    dp[i-1] will be replaced by dp[i].we can take same nth value again
    */
                dp[i][j] = max(
                    val[i-1]+dp[i][j-wt[i-1]] , // Include item i (stay at i)
                    dp[i-1][j] // Exclude item i (move to previous item)
                )
               // return max(val[n-1]+knapsackUnboundRecursive(wt,val,w-wt[n-1],n),knapsackUnboundRecursive(wt,val,w,n-1))
            }
            else{
                // Can't include item i
                dp[i][j] = dp[i-1][j];
             //  return knapsackUnboundRecursive(wt,val,w,n-1);
            }
        }
    }
 return dp[n][w];
}
//console.log(knapsackUnboundedDP(wt,val,w,n));
/*
What the Table Represents
Rows (k): The number of coins considered so far (from none up to all coins).

Columns (m): The target sum from 0 up to the required amount.

Each cell dp[k][m] holds the minimum number of coins needed to make sum m using the first k coins.

How the Initialization Works
For zero coins (k===0), all positive sums are set to "infinity" (effectively impossible).

For zero amount (m===0), zero coins are needed.

The first row (k==1) checks if the sum is a multiple of the first coin, filling the cell accordingly.

Filling the Table
For each coin (starting from the second, since the first is handled in initialization) and for each possible sum:

If current coin ≤ target sum:
Choose the minimum between:

Including the coin: 1 more than the solution for j - coins[i-1]

Excluding the coin: Solution without current coin (dp[i-1][j])

If current coin > sum:
Just copy the solution without using this coin.

Example Visualization
Suppose coins = and amount = 5.
The table would look like this (with partial entries):

    0	1	2	3	4	5
0	0	∞	∞	∞	∞	∞
1	0	1	2	3	4	5
2	0	1	1	2	2	3
3	0	1	1	2	2	1
The answer is found at dp[n][amount] (lower right). Here: 1 coin (5).

Key Takeaways
The approach builds solutions for every sub-amount, combining all possibilities up to the current coin.

Cells are filled using previously-computed results, reusing subproblem solutions (core idea of dynamic programming).

If the target cell is still "infinity" at the end, the amount isn't possible; return -1.

This 2D table can be visualized as a grid where each cell methodically builds towards the final answer using a bottom-up approach
*/
function coinChangeMin(coins,amount){
    let n= coins.length;
    // Base Case
    // we have to fill first row with Infinity.with 0 array,to find 
    // number having sum 0 ,1,2..,we need infinite elements
    var dp=[];
    // k== i,m==j
    /*
    for getting sum 0,we will need min 0 coins in 2d matrix.
    with 0 coins,we need Infinity coins to make sum 0,1,2,3
    */
    for(let k=0;k<n+1;k++){
        dp[k] = [];
        for(let m=0;m<amount+1;m++){
            if(k===0){
                dp[k][m] = Number.MAX_SAFE_INTEGER - 1;
            }
            if(m===0){
                dp[k][m] = 0;
            }
            //we have to fill row with i===1 and all j to find min no
            if(k===1){
                if(m % coins[0] === 0){
                    dp[k][m] = m/coins[0]; 
                }
                else{
                    dp[k][m] =  Number.MAX_SAFE_INTEGER - 1;
                }
            }
        } 
    }
   
    for(let i=2;i<n+1;i++){
       
        for(let j=1;j<amount+1;j++){
           
             if(coins[i-1] <= j){
                /*
                as we have taken coin dp[i][j-coins[i-1]]
                we should add 1 to get the count.in knapsack,val[n-1] was used.
                we will replace it by 1
                when coin is not taken,count will be 0,0+dp[i-1][j]
                */
                dp[i][j] =  Math.min(1+dp[i][j-coins[i-1]], dp[i-1][j]);
               // return max(val[n-1]+knapsackRecursive(coins,val,w-coins[n-1],n),knapsackRecursive(coins,val,w,n-1))
            }
            else{
                dp[i][j] = dp[i-1][j];
             
            }
        }
    }
    //console.log(dp);
    if(dp[n][amount] === Number.MAX_SAFE_INTEGER-1){
        return -1;
    }
 return dp[n][amount];
}

function coinChangeMin2(coins, amount) {
     // Create a 1D array of size amount+1, initialize with a value 
     // greater than any possible result
    // We use amount+1 as our "infinity" value since the maximum
    //  number of coins needed
    // can't be more than the amount itself (if using all 1-value coins)
    const dp= new Array(amount+1).fill(amount+1);
    // Base case: 0 coins needed to make amount 0
    dp[0]=0;
    // For each coin denomination
    for(let coin of coins){
        // For each amount from coin value up to target amount
        for(let i=coin;i<=amount;i++){
            // Either keep the current solution for amount i,
            // or use the current coin + solution for (i-coin)
            dp[i]= Math.min(1+dp[i-coin],dp[i]);
        }
    }
// If dp[amount] is still amount+1, it means we couldn't make the amount
    return dp[amount]=== amount+1?-1:dp[amount];
}
// let coins = [1], amount = 0;
let coins = [1,5,10], amount = 12;
//let coins = [2], amount = 3;
 console.log("min coin 2==",coinChangeMin2(coins,amount));