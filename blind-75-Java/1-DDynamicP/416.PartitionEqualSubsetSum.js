/*
416. Partition Equal Subset Sum

Given an integer array nums, return true if
 you can partition the array into two subsets such
 that the sum of the elements in both 
 subsets is equal or false otherwise.
 
Example 1:

Input: nums = [1,5,11,5]
Output: true
Explanation: The array can be 
partitioned as [1, 5, 5] and [11].
Example 2:

Input: nums = [1,2,3,5]
Output: false
Explanation: The array cannot be
 partitioned into equal sum subsets.
 Constraints:

1 <= nums.length <= 200
1 <= nums[i] <= 100

*/
/*
The goal is to determine if an array can be partitioned
 into two subsets with equal sums. This reduces 
 to checking if a subset exists with a sum equal
  to half the total sum of the array.

2. Key Steps
Sum Check: If the total sum is odd, partitioning is impossible.
Memoization: Stores intermediate results to avoid redundant computations.
Recursive Subset Check: Explores two choices at each step:
Include current element (if it doesn’t exceed the target).

Exclude current element.

3. Code Breakdown
Base Cases:

x === 0: Target achieved (return true).

i >= n: All elements processed without success (return false).

Memoization Check: Reuse precomputed results to optimize performance.

Recursive Logic:

Take: Proceed only if nums[i] <= current target.

Skip: Always explore skipping the current element.

4. Complexity
Time: O(n × target), where target = sum/2. 
Each (index, remaining-sum) pair is computed once.

Space: O(n × target) for the memoization table.

*/
var canPartitionRec = function (nums) {
    const sum = nums.reduce((acc, num) => acc + num, 0);
    if (sum % 2 !== 0) return false;
    const target = sum / 2;
    const n = nums.length;
    // Initialize memoization table with -1
   // const memo = new Array(n).fill().map(() => new Array(target + 1).fill(-1));
    const memo = [];
    for (let i = 0; i < n; i++) {
        memo[i] = [];
        for (let j = 0; j < target + 1; j++) {
            memo[i][j] = -1;
        }
    }
 
   function solve(i, x) {
        if (x === 0) return true;
        if (i >= n) return false;
        if (memo[i][x] !== -1) return memo[i][x];
        let take = false;
        if (nums[i] <= x) {
            take = solve(i + 1, x - nums[i]);
            // take the current element then that element be subtracted
        }
        const notTake = solve(i + 1, x);
        return (memo[i][x] = take || notTake); // skip the current element
    }
    return solve(0, target);
};

var canPartition = function (nums) {
    const sum = nums.reduce((acc, num) => acc + num, 0);
    if (sum % 2 != 0) return false;
    const target = sum / 2;
    function subsetSum(nums, S) {
        const n = nums.length;
        //t[row] = true: Zero sum is always achievable with any number of elements.

//t[col] = false (implicit): No elements can form a non-zero sum.
       // const t = new Array(n + 1).fill().map(() => new Array(S + 1).fill(false));
       // const t = Array.from({ length: n + 1 }, () => Array.from({ length: S + 1 }, () => false));
        const t = [];
        for (let i = 0; i <= n; i++) {
            t[i] = [];
            for (let j = 0; j <= S; j++) {
                t[i][j] = false;
            }
        }

        // Base case: sum 0 is always achievable
        for (let row = 0; row <= n; row++) {
            t[row][0] = true;
        }
        //For each element nums[i-1] and possible sum j:
        //Include the element if it doesn't exceed j (t[i-1][j - nums[i-1]]).
        //Exclude the element (t[i-1][j]).
        /*
        Case 1: nums[i - 1] <= j (Current element can be included in the subset)

We have two choices:

Include the current element (nums[i-1]):
 If we include it, we need to check if it's
  possible to form the remaining sum j - nums[i-1]
   with the previous i-1 elements (t[i-1][j-nums[i-1]]).
Exclude the current element: We check if 
it's possible to form the sum j without the current element (t[i-1][j]).
If either choice is possible, we set t[i][j] to true.

Case 2: nums[i - 1] > j (Current element
 is too large to be included)
We can only exclude the current element,
 so t[i][j] depends solely on whether the sum j 
 can be formed from the previous i-1 elements (t[i-1][j]).

        */
        for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= S; j++) {
                if (nums[i - 1] <= j) {
                    t[i][j] = t[i - 1][j - nums[i - 1]] || t[i - 1][j];

                }
                else {
                    t[i][j] = t[i - 1][j];
                }
            }
        }
        return t[n][S];
    }
    return subsetSum(nums, target);
}
let nums = [1, 5, 11, 5];
//let nums = [1, 2, 3, 5];
let res = canPartition(nums);
console.log("canPartition==", res);
