/*
35. Search Insert Position

Solution - https://leetcode.com/problems/search-insert-position/solutions/5111747/optimised/

Description
Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with O(log n) runtime complexity.
Example 1:

Input: nums = [1,3,5,6], target = 5
Output: 2
Example 2:

Input: nums = [1,3,5,6], target = 2
Output: 1
Example 3:

Input: nums = [1,3,5,6], target = 7
Output: 4
 

Constraints:

1 <= nums.length <= 104
-104 <= nums[i] <= 104
nums contains distinct values sorted in ascending order.
-104 <= target <= 104
*/
/*
Approach:
The searchInsert function performs a binary search on a sorted array nums to find the index where the target should be inserted if it is not already present in the array.
It maintains two pointers, left and right, to define the search range within the array.
The function iteratively adjusts the pointers based on the comparison of the middle element with the target, narrowing down the search range until the correct insertion position is found.

Time Complexity:
The time complexity of the searchInsert function is O(log n), where n is the number of elements in the nums array.
This complexity arises from the binary search algorithm, which divides the search range in half at each step, leading to a logarithmic time complexity.

Space Complexity:
The space complexity of the searchInsert function is O(1) as it uses a constant amount of extra space regardless of the input size.
The function does not create any additional data structures that grow with the input size, resulting in a constant space complexity.

*/
var searchInsert = function (nums, target) {
    let left = 0;
    let right = nums.length;
    while (left < right) {
        //const mid = (left + right) >> 1;
        const mid = Math.floor(left+(right-left) / 2);
        if (nums[mid] >= target) {
            right = mid;
        }
        else {
            left = mid + 1;
        }
    }
    return left;
}
let nums = [1,3,5,6], target = 5;
//nums = [1,3,5,6], target = 2;
//nums = [1,3,5,6], target = 7;
console.log(searchInsert(nums,target))