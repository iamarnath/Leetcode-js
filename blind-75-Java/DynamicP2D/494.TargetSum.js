/*
494. Target Sum

You are given an integer array nums and an integer target.

You want to build an expression out of
 nums by adding one of the symbols '+' and '-' 
 before each integer in nums and then 
 concatenate all the integers.

For example, if nums = [2, 1], you can 
add a '+' before 2 and a '-' before 1 and
 concatenate them to build the expression "+2-1".
Return the number of different expressions
 that you can build, which evaluates to target.
Example 1:

Input: nums = [1,1,1,1,1], target = 3
Output: 5
Explanation: There are 5 ways to assign symbols 
to make the sum of nums be target 3.
-1 + 1 + 1 + 1 + 1 = 3
+1 - 1 + 1 + 1 + 1 = 3
+1 + 1 - 1 + 1 + 1 = 3
+1 + 1 + 1 - 1 + 1 = 3
+1 + 1 + 1 + 1 - 1 = 3
Example 2:

Input: nums = [1], target = 1
Output: 1
 

Constraints:

1 <= nums.length <= 20
0 <= nums[i] <= 1000
0 <= sum(nums[i]) <= 1000
-1000 <= target <= 1000
*/

/*
Function Explanation
Memoization Setup

Creates memo[i][sum + S] to store computed results for 
index i and current sum sum

S = total sum of nums (handles negative indices via offset)

Base Case
When reaching the end of the array:

javascript
if (i === n) return sum === target ? 1 : 0
Recursive Case
Explores both possible operations at each step:

javascript
const add = solve(i + 1, sum + nums[i])
const subtract = solve(i + 1, sum - nums[i])
Complexity Analysis
Aspect               	Complexity	            Explanation
Time	                  O(n * S)	             - n = array length
                                                 - S = sum of all elements
                                                 - Each (index, sum) pair computed once

Space	                  O(n * S)	              - Memoization table storage
                                                  - Recursion stack depth O(n)


*/

var findTargetSumWays = function (nums, target) {
    const n = nums.length;
    const S = nums.reduce((acc, num) => acc + num, 0);
    const memo = Array.from({ length: n }, () => Array(2 * S + 1).fill(null));
    const solve = (i, sum) => {
        if (i === n) return sum === target ? 1 : 0;
        if (memo[i][sum + S] !== null) return memo[i][sum + S];
        const add = solve(i + 1, sum + nums[i]);
        const subtract = solve(i + 1, sum - nums[i]);
        return memo[i][sum + S] = add + subtract;
    };
    return solve(0, 0);
};

/*
Logic Explanation
Initial Checks:

Calculate the sum of nums and count zeros.

If target exceeds the total sum or (sum - target) is odd,
 return 0 (no valid subsets possible).

Subset Sum Transformation:

Compute s1 = (sum - target) / 2, converting the
 problem into finding subsets that sum to s1.

Memoization Table:

A 2D array t caches results for subproblems of
 using the first n elements to reach sum s.

Recursive Subset Counting:

Base Cases: Return 1 if target sum s is 0, 0 if no elements remain.

Zero Handling: Skip zeros during recursion
 (handled later via 2^zeros multiplier).

Include/Exclude Choices: For non-zero elements,
 recursively check subsets that include or exclude the current element.

Zero Multiplier:

Multiply the result by 2^zeros to account for all
 combinations of assigning +/- to zeros.

Complexity Analysis
Time: 

O(n*s1), where 

n is the array length and 

 s1=(sum−target)/2. Each subproblem is solved once.

Space: 
O(n*s1) for the memoization table, plus recursion stack depth 

O(n).
*/
var findTargetSumWays = function (nums, target) {
    const sum = nums.reduce((acc, num) => acc + num, 0);
    const zeros = nums.filter(x => x === 0).length;
    
    if (target > sum || (sum - target) % 2 !== 0) return 0;
    
    const s1 = (sum - target) / 2;
    const n = nums.length;
    const t = Array.from({ length: n + 1 }, () => Array(s1 + 1).fill(-1));
    
    const subsetSum = (n, s) => {
        if (t[n][s] !== -1) return t[n][s];
        if (s === 0) return 1;
        if (n === 0) return 0;
        
        const current = nums[n - 1];
        if (current === 0) {
            return t[n][s] = subsetSum(n - 1, s);
        }
        
        if (current <= s) {
            return t[n][s] = subsetSum(n - 1, s - current) + subsetSum(n - 1, s);
        }
        return t[n][s] = subsetSum(n - 1, s);
    };
    
    return subsetSum(n, s1) * Math.pow(2, zeros);
}


let nums = [1, 1, 1, 1, 1], target = 3;
//console.log(findTargetSumWays([1,1,1,1,1], 3)); // Output: 5
let res = findTargetSumWays(nums, target);
console.log("findTargetSumWays==", res);
