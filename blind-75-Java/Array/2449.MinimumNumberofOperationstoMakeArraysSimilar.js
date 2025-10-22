/*
2449. Minimum Number of Operations to Make Arrays Similar

You are given two positive integer arrays nums and target, of the same length.

In one operation, you can choose any two distinct indices i and j where 0 <= i, j < nums.length and:

set nums[i] = nums[i] + 2 and
set nums[j] = nums[j] - 2.
Two arrays are considered to be similar if the frequency of each element is the same.

Return the minimum number of operations required to make nums similar to target. The test cases are generated such that nums can always be similar to target.

 

Example 1:

Input: nums = [8,12,6], target = [2,14,10]
Output: 2
Explanation: It is possible to make nums similar to target in two operations:
- Choose i = 0 and j = 2, nums = [10,12,4].
- Choose i = 1 and j = 2, nums = [10,14,2].
It can be shown that 2 is the minimum number of operations needed.
Example 2:

Input: nums = [1,2,5], target = [4,1,3]
Output: 1
Explanation: We can make nums similar to target in one operation:
- Choose i = 1 and j = 2, nums = [1,4,3].
Example 3:

Input: nums = [1,1,1,1,1], target = [1,1,1,1,1]
Output: 0
Explanation: The array nums is already similiar to target.
 

Constraints:

n == nums.length == target.length
1 <= n <= 105
1 <= nums[i], target[i] <= 106
It is possible to make nums similar to target.
*/

/**
 * @param {number[]} nums
 * @param {number[]} target
 * @return {number}
 */
var makeSimilar = function(nums, target) {
    // Sort both arrays in ascending order for optimal pairing
    nums.sort((a, b) => a - b);
    target.sort((a, b) => a - b);

    // Arrays to store even and odd numbers from nums
    const evenNumbersFromNums = [];
    const oddNumbersFromNums = [];
  
    // Arrays to store even and odd numbers from target
    const evenNumbersFromTarget = [];
    const oddNumbersFromTarget = [];

    // Separate nums array into even and odd numbers
    for (const value of nums) {
        if (value % 2 === 0) {
            evenNumbersFromNums.push(value);
        } else {
            oddNumbersFromNums.push(value);
        }
    }

    // Separate target array into even and odd numbers
    for (const value of target) {
        if (value % 2 === 0) {
            evenNumbersFromTarget.push(value);
        } else {
            oddNumbersFromTarget.push(value);
        }
    }

    // Calculate total difference for transformation
    let totalDifference = 0;
  
    // Sum up absolute differences between paired even numbers
    for (let i = 0; i < evenNumbersFromNums.length; ++i) {
        totalDifference += Math.abs(evenNumbersFromNums[i] - evenNumbersFromTarget[i]);
    }

    // Sum up absolute differences between paired odd numbers
    for (let i = 0; i < oddNumbersFromNums.length; ++i) {
        totalDifference += Math.abs(oddNumbersFromNums[i] - oddNumbersFromTarget[i]);
    }

    // Divide by 4 because each swap operation affects 2 elements
    // and we count each difference twice (once from each perspective)
    return totalDifference / 4;
}
