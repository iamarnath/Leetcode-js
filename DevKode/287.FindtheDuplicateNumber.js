/*
287. Find the Duplicate Number

Solution - https://leetcode.com/problems/find-the-duplicate-number/solutions/5143460/optimised/

Description
Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.

There is only one repeated number in nums, return this repeated number.

You must solve the problem without modifying the array nums and uses only constant extra space.

Example 1:

Input: nums = [1,3,4,2,2]
Output: 2
Example 2:

Input: nums = [3,1,3,4,2]
Output: 3
Example 3:

Input: nums = [3,3,3,3,3]
Output: 3
 

Constraints:

1 <= n <= 105
nums.length == n + 1
1 <= nums[i] <= n
All the integers in nums appear only once except for precisely one integer which appears two or more times.
 

Follow up:

How can we prove that at least one duplicate number must exist in nums?
Can you solve the problem in linear runtime complexity?
*/
/*
Approach:
Initialize left to 1 and right to nums.length - 1.
Perform a binary search within the range [1, nums.length - 1].
Calculate the midpoint mid of the range.
Count the number of elements in nums that are less than or equal to mid.
If the count is greater than mid, the duplicate number must be in the left half of the range, so update right to mid.
Otherwise, the duplicate number must be in the right half of the range, so update left to mid + 1.
Repeat the binary search until left and right converge, then return left as the duplicate number.

Time Complexity:

The time complexity of this approach is O(n log n), where n is the length of the nums array.
The binary search iterates log n times, and for each iteration, it counts the elements in nums, which takes O(n) time in the worst case.

Space Complexity:

The space complexity of this approach is O(1) because the function uses a constant amount of extra space regardless of the input size.
The function only requires space for a few variables like left, right, mid, and cnt.

*/
function findDuplicate(nums) {
    let left = 1;
    let right = nums.length - 1;
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        let cnt = 0;
        // Count how many numbers in the array are less than or equal to the midpoint
        for (const val of nums) {
            if (val <= mid) {
                cnt++;
            }
        }
        // If the count is greater than the midpoint, this indicates that the duplicate
        // is within the range [left, mid], so we focus the search there.
        // Otherwise, the duplicate is in the range [mid + 1, right].
        if (cnt > mid) {
            right = mid;//search in left half
        }
        else {
            left = mid + 1;//search in left half
        }
    }
    return left;
}

nums = [1, 3, 4, 2, 2];
nums = [3, 1, 3, 4, 2]
console.log(findDuplicate(nums));