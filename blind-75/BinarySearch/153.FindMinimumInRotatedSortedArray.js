/*
153. Find Minimum In Rotated Sorted Array
Suppose an array of length n sorted in ascending 
order is rotated between 1 and n times. For example,
 the array nums = [0,1,2,4,5,6,7] might become:

[4,5,6,7,0,1,2] if it was rotated 4 times.
[0,1,2,4,5,6,7] if it was rotated 7 times.
Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]]
 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].

Given the sorted rotated array nums of unique elements,
 return the minimum element of this array.

You must write an algorithm that runs in O(log n) time.

Example 1:

Input: nums = [3,4,5,1,2]
Output: 1
Explanation: The original array was [1,2,3,4,5] rotated 3 times.
Example 2:

Input: nums = [4,5,6,7,0,1,2]
Output: 0
Explanation: The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.
Example 3:

Input: nums = [11,13,15,17]
Output: 11
Explanation: The original array was [11,13,15,17] and it was rotated 4 times. 
 

Constraints:

n == nums.length
1 <= n <= 5000
-5000 <= nums[i] <= 5000
All the integers of nums are unique.
nums is sorted and rotated between 1 and n times.
*/
/*
1. Initialize Pointers
left points to the start of the array.

right points to the end.

2. Binary Search Loop
While left < right, repeat:

Calculate mid as the middle index between left and right.

In JavaScript, let mid = left + Math.floor((right - left) / 2); is safer (see note below).

Compare nums[mid] with nums[right]:

Case 1: If nums[mid] > nums[right]

The minimum must be to the right of mid (because the left part is strictly greater than the rightmost element, so the rotation point is to the right).

Move left to mid + 1.

Case 2: Otherwise (nums[mid] <= nums[right])

The minimum is at mid or to the left of mid.

Move right to mid.

3. Loop Ends
When left == right, the loop stops.

At this point, both pointers point to the minimum element.

4. Return the Result
Return nums[right] (or nums[left] — both are the same here).


Time Complexity: O(log n) — Binary search halves the search space
 every iteration.

Space Complexity: O(1) — Only a few variables are used.
*/
var findMin = function (nums) {
    let n = nums.length;
    let left = 0, right = n - 1;
    while (left < right) {
        let mid = left + Math.floor((right - left) / 2);
        if (nums[mid] > nums[right]) {
            left = mid + 1;//move right
        }
        else {
            right = mid;
        }
    }
    return nums[right];
};

let nums = [4, 5, 6, 7, 0, 1, 2];
nums = [11, 13, 15, 17]
console.log("findMin==", findMin(nums));