/*
53. Maximum Subarray
Given an integer array nums, find the 
subarray with the largest sum, and return its sum.

Example 1:

Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.
Example 2:

Input: nums = [1]
Output: 1
Explanation: The subarray [1] has the largest sum 1.
Example 3:

Input: nums = [5,4,-1,7,8]
Output: 23
Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.

Constraints:

1 <= nums.length <= 105
-104 <= nums[i] <= 104
 
Follow up: If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let maxSum = Number.MIN_SAFE_INTEGER;
    let currSum=0;
    for(let num of nums){
        currSum += num;
        maxSum = Math.max(currSum,maxSum);
      if(currSum <0){
        currSum =0;
      }

    }
    return maxSum;
};

//Divide and conquer approach

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