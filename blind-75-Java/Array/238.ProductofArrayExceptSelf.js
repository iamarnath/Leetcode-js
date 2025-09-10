/*

Description
Given an integer array nums, return an array output where output[i] is the product of all the elements of nums except nums[i].

Each product is guaranteed to fit in a 32-bit integer.

Follow-up: Could you solve it in 

O(n) time without using the division operation?

Example 1:

Input: nums = [1,2,4,6]

Output: [48,24,12,8]
Example 2:

Input: nums = [-1,0,1,2,3]

Output: [0,-6,0,0,0]
Constraints:

2 <= nums.length <= 1000
-20 <= nums[i] <= 20

*/

// use prefix suffix approach

class Solution {
    productExceptSelf(nums) {
        const n = nums.length;
        const res = new Array(n);
        const pref = new Array(n);
        const suff = new Array(n);
        pref[0] = 1;
        suff[n - 1] = 1;
        //Start from the second element (i = 1).
        // Each pref[i] stores the product of all numbers to
        //  the left of index i in the original array.
        // For each i:
        // Multiply the value in pref[i - 1] (product of 
        // everything before i - 1) with nums[i - 1] 
        // (the element just left of i).
        // Example:
        // For i = 2 → pref = pref * nums,
        // which is (product of nums) * nums = product of nums and nums.

        for (let i = 1; i < n; i++) {
            pref[i] = pref[i - 1] * nums[i - 1];
        }
        console.log("pref==",pref);
        //Start from the second-last element (i = n - 2) and go backwards.
        // Each suff[i] stores the product of all numbers to 
        // the right of index i in the original array.
        // For each i:
        // Multiply the value in suff[i + 1] (product of everything after i + 1)
        //  with nums[i + 1] (the element just right of i).
        // Example:
        // For i = n-2 → suff[n-2] = suff[n-1] * nums[n-1],
        // which is (1) * nums[n-1] = nums[n-1].

        for (let i = n - 2; i >= 0; i--) {
            suff[i] = suff[i + 1] * nums[i + 1];
        }
        console.log("suff==",suff)
        for (let i = 0; i < n; i++) {
            res[i] = pref[i] * suff[i];
        }
        return res;
    }
}

// Create an instance of Solution
const solution = new Solution();

// Example array to test
//let nums = [1,2,4,6]
let nums = [-1,0,1,2,3]
// Call the method and store the result
const result = solution.productExceptSelf(nums);

// Print the result
console.log(result);