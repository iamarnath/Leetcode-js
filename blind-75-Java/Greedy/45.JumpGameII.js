/*
45. Jump Game II

You are given a 0-indexed array of integers 
nums of length n. You are initially positioned at nums[0].

Each element nums[i] represents the 
maximum length of a forward jump from index i. 
In other words, if you are at nums[i], 
you can jump to any nums[i + j] where:

0 <= j <= nums[i] and
i + j < n
Return the minimum number of jumps to 
reach nums[n - 1]. The test cases are generated
 such that you can reach nums[n - 1].

Example 1:

Input: nums = [2,3,1,1,4]
Output: 2
Explanation: The minimum number of jumps to
 reach the last index is 2. Jump 1 step
  from index 0 to 1, then 3 steps to the last index.
Example 2:

Input: nums = [2,3,0,1,4]
Output: 2
 

Constraints:

1 <= nums.length <= 104
0 <= nums[i] <= 1000
It's guaranteed that you can reach nums[n - 1].

*/

/*
totalJumps: Keeps track of the number of jumps made so far.

destination: The index of the last element in the array (the goal to reach).

coverage: The farthest index that can be reached with the current number of jumps.

lastJumpIdx: The boundary of the current jump (where the current jump started).

*/
/*
The time complexity of the given code is O(n), where 

n is the length of the array, because each index is visited only once.
The space complexity is O(1), meaning it uses a 
constant amount of extra space for variables regardless of the input size

*/
var jump = function (nums) {
    let totalJumps = 0;
    // destination is last index
    let destination = nums.length - 1;
    let coverage = 0;
    let lastJumpIdx = 0;
    // Base case
    //Early exit: If the array has only one element,
    //  you are already at the destination, so return 0 jumps.
    if (nums.length === 1) return 0;
    // Greedy strategy: extend coverage as long as possible
    for (let i = 0; i < nums.length; i++) {
        //For each index i, update coverage to be the maximum 
        // between its current value and the farthest index 
        // reachable from i (which is i + nums[i]).
        coverage = Math.max(coverage, i + nums[i]);
        console.log("coverage==",{ i, lastJumpIdx, coverage});

        //Check if reached the boundary of the current jump:
        //  If you reach the index where the last jump ended,
        //  update lastJumpIdx to the new farthest reachable
        //  index (coverage), and increment the jump count.
        if (i === lastJumpIdx) {
            lastJumpIdx = coverage;
            totalJumps++;
            // check if we reached destination already
            if (coverage >= destination) {
                return totalJumps;
            }
        }
    }
    return totalJumps;
}
nums = [2, 3, 1, 1, 4];

let res = jump(nums);

console.log("jump==", res);
