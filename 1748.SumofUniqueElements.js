/*
1748. Sum of Unique Elements

https://leetcode.com/problems/sum-of-unique-elements/solutions/5059515/optimsed-javascript/

Description
You are given an integer array nums. The unique elements of an array are the elements that appear exactly once in the array.

Return the sum of all the unique elements of nums.

 

Example 1:

Input: nums = [1,2,3,2]
Output: 4
Explanation: The unique elements are [1,3], and the sum is 4.
Example 2:

Input: nums = [1,1,1,1,1]
Output: 0
Explanation: There are no unique elements, and the sum is 0.
Example 3:

Input: nums = [1,2,3,4,5]
Output: 15
Explanation: The unique elements are [1,2,3,4,5], and the sum is 15.
 

Constraints:

1 <= nums.length <= 100
1 <= nums[i] <= 100

*/

var sumOfUnique = function (nums) {
    // Creating an empty object 
    let freq = {}, n = nums.length, sum = 0;

    // Loop to create frequency object 
    for (let i = 0; i < n; i++) {
        if (!freq[nums[i]]) {
            sum += nums[i];
            freq[nums[i]] = 1;
        }
        else if (freq[nums[i]] === 1) {
            sum -= nums[i];
            freq[nums[i]] = 2;
        }
    }
    return sum;

};

let nums = [1, 2, 3, 2];
console.log(sumOfUnique(nums));