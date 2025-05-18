/*
53. Maximum Subarray

Given an array of integers nums, find the subarray with the largest sum
 and return the sum.

A subarray is a contiguous non-empty sequence of elements within an array.

Example 1:

Input: nums = [2,-3,4,-2,2,1,-1,4]

Output: 8
Explanation: The subarray [4,-2,2,1,-1,4] has the largest sum 8.

Example 2:

Input: nums = [-1]

Output: -1
Constraints:

1 <= nums.length <= 1000
-1000 <= nums[i] <= 1000

*/

function maxSubArray(nums) {
    let max_so_far = nums[0];
    let curr_max = nums[0];
    for (let i = 1; i < nums.length; i++) {
        curr_max = Math.max(nums[i], nums[i] + curr_max);
        max_so_far = Math.max(curr_max, max_so_far);
    }
    return max_so_far;
}

var maxSubArray = function(nums) {
    // Helper function to find the maximum crossing sum
    function maxCrossingSum(arr, low, mid, high) {
        let leftSum = Number.NEGATIVE_INFINITY; // Initialize to negative infinity
        let sum = 0;

        // Calculate maximum sum of the left half
        for (let i = mid; i >= low; i--) {
            sum += arr[i];
            if (sum > leftSum) {
                leftSum = sum; // Update leftSum if current sum is greater
            }
        }

        let rightSum = Number.NEGATIVE_INFINITY; // Initialize to negative infinity
        sum = 0;

        // Calculate maximum sum of the right half
        for (let i = mid + 1; i <= high; i++) {
            sum += arr[i];
            if (sum > rightSum) {
                rightSum = sum; // Update rightSum if current sum is greater
            }
        }

        return leftSum + rightSum; // Return combined maximum crossing sum
    }

    // Recursive function to find maximum subarray sum
    function maxSubArrayHelper(arr, low, high) {
        if (low === high) {
            return arr[low]; // Base case: only one element
        }

        const mid = Math.floor((low + high) / 2);

        const leftMax = maxSubArrayHelper(arr, low, mid); // Maximum in left half
        const rightMax = maxSubArrayHelper(arr, mid + 1, high); // Maximum in right half
        const crossingMax = maxCrossingSum(arr, low, mid, high); // Maximum crossing middle

        return Math.max(leftMax, rightMax, crossingMax); // Overall maximum
    }

    return maxSubArrayHelper(nums, 0, nums.length - 1); // Call helper with initial indices
};
//let nums = [2, -3, 4, -2, 2, 1, -1, 4];
let nums = [-1];
let res = maxSubArray(nums);
console.log("res==", res);