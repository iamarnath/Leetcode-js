/*
33. Search In Rotated Sorted Array
Description
You are given an array of length n which was originally
 sorted in ascending order. It has now been rotated
  between 1 and n times. For example, 
  the array nums = [1,2,3,4,5,6] might become:

[3,4,5,6,1,2] if it was rotated 4 times.
[1,2,3,4,5,6] if it was rotated 6 times.
Given the rotated sorted array nums and an
 integer target, return the index of target within
  nums, or -1 if it is not present.

You may assume all elements in the sorted 
rotated array nums are unique,

A solution that runs in O(n) time is trivial,
 can you write an algorithm that runs in O(log n) time?

Example 1:

Input: nums = [3,4,5,6,1,2], target = 1

Output: 4
Example 2:

Input: nums = [3,5,6,0,1,2], target = 4

Output: -1
Constraints:

1 <= nums.length <= 1000
-1000 <= nums[i] <= 1000
-1000 <= target <= 1000

*/

/*
1. findPivot(nums, l, r)
Purpose: Finds the index of the smallest element (the "pivot")
 in the rotated array.

How: Uses binary search. If nums[mid] > nums[r],
 the pivot is to the right of mid. Otherwise, it's at mid or to the left.
Returns: The index of the pivot (smallest element).

2. binarySearch(nums, l, r, target)
Purpose: Standard binary search in a sorted subarray between indices l and r.
Returns: The index of target if found, otherwise -1.

3. search(nums, target)
Purpose: Main function to search for target in the rotated array.

Steps:

Find the pivot.
If the pivot element is the target, return its index.
Otherwise, search in the two subarrays divided by the pivot:
From pivot+1 to n-1
From 0 to pivot-1
Return the index if found, else -1.
*/
/*
Time Complexity

The search function first finds the pivot using binary search, which takes 
O(logn) time.

It then performs up to two binary searches (each on a subarray),
 each taking at most 
O(logn) time.

Therefore, the total time complexity is 

O(logn).

Space Complexity

The algorithm uses only a constant amount of extra space for 
variables and does not use any additional data structures.

Therefore, the space complexity is 

O(1)
*/
var findPivot = function (nums, left, right) {
    while (left < right) {
        let mid = left + Math.floor((right - left) / 2);
        if (nums[mid] > nums[right]) {
            left = mid + 1;
        }
        else {
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
        return pivot;
    }
    let idx = binarySearch(nums, pivot + 1, n - 1, target);
    if (idx != -1) {
        return idx;
    }
    idx = binarySearch(nums, 0, pivot - 1, target);
    return idx;
};

let nums = [3, 4, 5, 6, 1, 2], target = 1;

console.log("search==", search(nums, target));