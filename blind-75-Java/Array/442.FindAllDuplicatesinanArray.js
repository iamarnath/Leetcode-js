/*
442. Find All Duplicates in an Array

Given an integer array nums of length n where all the integers of nums are in the range [1, n] and each integer appears at most twice, return an array of all the integers that appears twice.

You must write an algorithm that runs in O(n) time and uses only constant auxiliary space, excluding the space needed to store the output

 

Example 1:

Input: nums = [4,3,2,7,8,2,3,1]
Output: [2,3]
Example 2:

Input: nums = [1,1,2]
Output: [1]
Example 3:

Input: nums = [1]
Output: []
 

Constraints:

n == nums.length
1 <= n <= 105
1 <= nums[i] <= n
Each element in nums appears once or twice.
*/

/**
 * @param {number[]} nums
 * @return {number[]}
 */
/*
The provided JavaScript code finds all duplicate numbers in an array of integers, using an in-place marking technique. Here’s a line-by-line explanation, along with the time and space complexity:

Code Walkthrough
javascript
var findDuplicates = function(nums) {
    const result = [];
Declares an empty array called result to store duplicate numbers found in nums.

javascript
    for (let i = 0; i < nums.length; i++) {
        let num = Math.abs(nums[i]);
Loops over the entire nums array.

Takes the absolute value of the current integer; this is important since some numbers may already have been marked negative in previous steps.

javascript
        if (nums[num - 1] < 0) {
            result.push(num);
        } else {
            nums[num - 1] *= -1;
        }
Uses the value num (from the array) to reference the (num-1)th index in the array.

If the value at that index is already negative, this means num has been encountered before and is a duplicate, so it is added to result.

If the value at that index is positive, it is marked negative to indicate that num has been seen once.

javascript
    }
    return result;
};
End of the loop. Returns the array of duplicates in result.

Time Complexity
The algorithm runs in 

O(n) time, where 

n is the length of the nums array.

This is because there's a single pass through the array, and all operations within the loop are constant time.

Space Complexity
The algorithm uses 

O(1) extra space (in-place marking) apart from the output array. No set, object, or map is used.

Note: The space to hold duplicates in result is not counted as extra auxiliary space in time complexity analysis since it's required for the output.

Key Points

*/
var findDuplicates = function(nums) {
    const result = [];
    for (let i = 0; i < nums.length; i++) {
        let num = Math.abs(nums[i]);
        if (nums[num - 1] < 0) {
            result.push(num);
        } else {
            nums[num - 1] *= -1;
        }
    }
    return result;
};