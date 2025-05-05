/*
70. Climbing Stairs

You are given an integer n representing the number of steps 
to reach the top of a staircase. You can climb with either 1 or 2
 steps at a time.

Return the number of distinct ways to climb to the top of the staircase.

Example 1:

Input: n = 2

Output: 2
Explanation:

1 + 1 = 2
2 = 2
Example 2:

Input: n = 3

Output: 3
Explanation:

1 + 1 + 1 = 3
1 + 2 = 3
2 + 1 = 3
Constraints:

1 <= n <= 30

*/
/*
Time & Space Complexity
Time complexity: O(n)
Space complexity: O(n)
*/
var climbStairs = function(n) {
    if(n<2){
        return n;
    }
    let dp = new Array(n+1).fill(0);
    dp[1]=1;
    dp[2]=2;
    for(let i=3;i<=n;i++){
        dp[i] = dp[i-1]+dp[i-2];
    }
    return dp[n];
}
/*
(Space Optimized)

*/
function climbStairs2(n) {
    /*
    one represents the number of ways to reach the current step.

two represents the number of ways to reach the previous step.
Initially, both are set to 1 because:
There is 1 way to climb 0 steps (do nothing).
There is 1 way to climb 1 step (just take one step).
    */
    let one = 1, two = 1;

    for (let i = 0; i < n - 1; i++) {
        let temp = one;
        one = one + two;
        two = temp;
    }
    /*
    The loop runs n-1 times.

    In each iteration:
    temp stores the current value of one.
    one = one + two; updates one to be the sum of ways to reach the 
    previous step (one) and the step before that (two).
    two = temp; updates two to the old value of one.
    */
   //After the loop, one contains the number of
   //  ways to climb to the nth step.
    return one;
}
let n=4;
let result = climbStairs(n);

console.log("result==",result);