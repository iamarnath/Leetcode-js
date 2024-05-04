/*
704. Binary Search

Solution - https://leetcode.com/problems/binary-search/solutions/5111035/optimised/

Description
Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.

 

Example 1:

Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4
Example 2:

Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
Explanation: 2 does not exist in nums so return -1
 

Constraints:

1 <= nums.length <= 104
-104 < nums[i], target < 104
All the integers in nums are unique.
nums is sorted in ascending order.
*/

/*
Time Complexity
The time complexity of the binary search algorithm is O(log N), where N is the number of elements in the nums array.
The search space is halved in each iteration, leading to a logarithmic time complexity.
Space Complexity
The space complexity of the search function is O(1) as it uses a constant amount of extra space regardless of the input size.
It only requires a few variables (left, right, mid) to perform the search, and the space used does not increase with the size of the input array.

*/

var search = function (nums, target) {
    let left = 0;
    let right = nums.length - 1;
    while (left < right) {
       // const mid = left + (right - left) / 2;
       const mid =  (left + right) >> 1;// equivalent to Math.floor((left+right)/2)
        // If the middle element is greater or equal to target, move the right pointer to the middle.
        if (nums[mid] >= target) {
            right = mid;
        }
        else {
        // If the middle element is less than the target, move the left pointer past the middle.
            left = mid + 1
        }
    }// end of while
    // Once the search space is narrowed down to a single element,
    // check if it's equal to the target and return the appropriate index or -1.
    return nums[left] === target ? left:-1

}

let nums = [-1,0,3,5,9,12], target = 9;
nums = [-1,0,3,5,9,12], target = 2;
console.log(search(nums,target));