/*
746. Min Cost Climbing Stairs

You are given an integer array cost where cost[i] 
is the cost of ith step on a staircase. Once you 
pay the cost, you can either climb one or two steps.

You can either start from the step with index 0, 
or the step with index 1.

Return the minimum cost to reach the top of the floor.

Example 1:

Input: cost = [10,15,20]
Output: 15
Explanation: You will start at index 1.
- Pay 15 and climb two steps to reach the top.
The total cost is 15.
Example 2:

Input: cost = [1,100,1,1,1,100,1,1,100,1]
Output: 6
Explanation: You will start at index 0.
- Pay 1 and climb two steps to reach index 2.
- Pay 1 and climb two steps to reach index 4.
- Pay 1 and climb two steps to reach index 6.
- Pay 1 and climb one step to reach index 7.
- Pay 1 and climb two steps to reach index 9.
- Pay 1 and climb one step to reach the top.
The total cost is 6.
 

Constraints:

2 <= cost.length <= 1000
0 <= cost[i] <= 999


*/

/*
Time Complexity: O(n)
Each index i in the cost array is processed
 exactly once due to memoization.

The recursive solve function computes results
 for all n indices through memoized lookups (O(1) per check).

Despite two recursive calls (idx+1 and idx+2),
 the total number of operations scales linearly with input size.

Space Complexity: O(n)
Memoization array: Uses O(n) space to 
store results for all n indices.

Call stack: Recursion depth reaches O(n)
 in worst-case scenarios (e.g., single-step traversal)
*/

var minCostClimbingStairsRec = function (cost) {
    const t = new Array(cost.length + 1).fill(undefined);
    function solve(idx) {
        if (idx >= cost.length) return 0;
        if (t[idx] != undefined) return t[idx];
        const move_one = cost[idx] + solve(idx + 1);
        const move_two = cost[idx] + solve(idx + 2);
        t[idx] = Math.min(move_one, move_two);
        return t[idx];
    }
    return Math.min(solve(0), solve(1));
};

/*
Time Complexity: O(n)
The for-loop runs from i = 2 to i < n, so it executes (n - 2) times.

Each iteration does a constant amount of work:
 addition and two comparisons.

Therefore, the overall time complexity is O(n),
 where n is the length of the cost array.

Space Complexity: O(1) (Constant Space)
The algorithm modifies the input array cost
 in-place to store the minimum cost to reach each step.

No extra space is used that scales with 
input size (ignoring the input array itself).

Only a few variables (n, i) are used, which is constant space.

Therefore, the space complexity is O(1).
*/
var minCostClimbingStairs = function (cost) {
    let n = cost.length;
    if (n === 2) {
        return Math.min(cost[0], cost[1]);
    }
    for (let i = 2; i < n; i++) {
        cost[i] = cost[i] + Math.min(cost[i - 1], cost[i - 2]);
    }
    return Math.min(cost[n - 1], cost[n - 2]);
}
console.log(minCostClimbingStairs([10, 15, 20])); // Output: 15
