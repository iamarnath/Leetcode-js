/*
75. Sort Colors
solution : 
https://leetcode.com/problems/sort-colors/solutions/5059830/optimised/

Description
Given an numsay nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.

You must solve this problem without using the library's sort function.

 

Example 1:

Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]
Example 2:

Input: nums = [2,0,1]
Output: [0,1,2]
*/

// function swap(nums, first, sec) {
//     var temp = nums[first];
//     nums[first] = nums[sec];
//     nums[sec] = temp;
// }
var sortColors = function (nums) {
    const swap = (nums, first, sec) => {
        var temp = nums[first];
        nums[first] = nums[sec];
        nums[sec] = temp;
    };
    var low = 0, mid = 0, high = nums.length - 1;
    while (mid <= high) {
        switch (nums[mid]) {
            case 0: {
                swap(nums, low, mid);
                low++;
                mid++
                break;
            }
            case 1: {
                mid++;
                break;
            }
            case 2: {
                swap(nums, mid, high);
                high--;
                break;
            }
        }
    }
    return nums;
};


console.log(sortColors([0, 2, 0, 2, 2, 0, 0, 0, 1, 1]));