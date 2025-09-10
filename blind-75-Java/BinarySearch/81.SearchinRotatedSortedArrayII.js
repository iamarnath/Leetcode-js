/*
81. Search in Rotated Sorted Array II

There is an integer array nums sorted in non-decreasing order (not necessarily with distinct values).

Before being passed to your function, nums is rotated at an unknown pivot index k (0 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,4,4,5,6,6,7] might be rotated at pivot index 5 and become [4,5,6,6,7,0,1,2,4,4].

Given the array nums after the rotation and an integer target, return true if target is in nums, or false if it is not in nums.

You must decrease the overall operation steps as much as possible.

 

Example 1:

Input: nums = [2,5,6,0,0,1,2], target = 0
Output: true
Example 2:

Input: nums = [2,5,6,0,0,1,2], target = 3
Output: false
 

Constraints:

1 <= nums.length <= 5000
-104 <= nums[i] <= 104
nums is guaranteed to be rotated at some pivot.
-104 <= target <= 104

*/


var findPivot = function (nums, left, right) {
    while (left < right) {
        // remove duplicates from left side
        //This loop skips over duplicate values on the left end
        //  to ensure no repeated values interfere with the binary search.
        while(left < right && nums[left] === nums[left+1]){
            left++;
        }
         // remove duplicates from right side
         //this loop skips over duplicate values at the right end of the current search range.
        while(left < right && nums[right] === nums[right-1]){
            right--;
        }
        let mid = left + Math.floor((right - left) / 2);
        //If the middle element is greater than the rightmost,
        //  the pivot must be to the right of mid, so the new left
        //  boundary becomes mid + 1.
        if (nums[mid] > nums[right]) {
            left = mid + 1;
        }
        else {
            //Otherwise, the pivot is at mid or to its left,
            //  so update the right boundary to mid.
            right = mid;
        }
    }
    return right;
}
var binarySearch = function (nums, left, right, target) {
    while (left <= right) {
        let mid = left + Math.floor((right - left) / 2);
        if (nums[mid] === target) {
            return mid;
        }
        else if (nums[mid] < target) {
            left = mid + 1;
        }
        else {
            right = mid - 1;
        }
    }
    return -1;
}
var search = function (nums, target) {
    const n = nums.length;
    const pivot = findPivot(nums, 0, n - 1);
    if (nums[pivot] === target) {
        return true;
    }
    let idx = binarySearch(nums, pivot + 1, n - 1, target);
  
    idx2 = binarySearch(nums, 0, pivot - 1, target);
    if(idx != -1 || idx2 != -1){
        return true;
    }
    return false;
};
//let nums = [2, 5, 6, 0, 0, 1, 2], target = 0;
let nums = [2,5,6,0,0,1,2], target = 3;
let res = search(nums, target);
console.log("res==",res);