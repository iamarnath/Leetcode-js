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
/*

Approach Explanation for Sorting Colors
The given function sortColors is an implementation of the Dutch National Flag algorithm, commonly used to sort an array with three distinct values efficiently. In this case, the values are 0, 1, and 2, representing colors.
Steps in the Approach:
Initialization:
Initialize three pointers: low, mid, and high.
low points to the start of the array.
mid starts at the beginning of the array.
high points to the end of the array.
Sorting Process:
Iterate through the array using the mid pointer until it reaches the high pointer.
Use a switch statement to handle the different cases based on the value at nums[mid].
Case 0 (Color Red):
If the value at nums[mid] is 0, swap nums[low] with nums[mid].
Increment low and mid to move the pointers forward.
Case 1 (Color White):
If the value at nums[mid] is 1, simply increment mid to move to the next element.
Case 2 (Color Blue):
If the value at nums[mid] is 2, swap nums[mid] with nums[high].
Decrement high to move the high pointer towards the beginning of the array.
Completion:
Continue this process until mid crosses high, ensuring all elements are correctly placed.
Return:
Finally, return the sorted nums array.
Overall:
This approach efficiently sorts the array in-place with a single pass through the array, 
rearranging the elements based on their values. It optimizes the sorting process by grouping 
similar elements together, achieving a sorted array of colors in linear time complexity.

*/
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