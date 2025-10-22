/*
2541. Minimum Operations to Make Array Equal II
You are given two integer arrays nums1 and nums2
 of equal length n and an integer k. You 
 can perform the following operation on nums1:

Choose two indexes i and j and increment nums1[i]
 by k and decrement nums1[j] by k.
  In other words, nums1[i] = nums1[i] + k and nums1[j] = nums1[j] - k.
nums1 is said to be equal to nums2 
if for all indices i such that 0 <= i < n, nums1[i] == nums2[i].

Return the minimum number of operations 
required to make nums1 equal to nums2. If it is impossible to make them equal, return -1.

Example 1:

Input: nums1 = [4,3,1,4], nums2 = [1,3,7,1], k = 3
Output: 2
Explanation: In 2 operations, we can transform nums1 to nums2.
1st operation: i = 2, j = 0. After applying the operation, nums1 = [1,3,4,4].
2nd operation: i = 2, j = 3. After applying the operation, nums1 = [1,3,7,1].
One can prove that it is impossible to make arrays equal in fewer operations.
Example 2:

Input: nums1 = [3,8,5,2], nums2 = [2,4,1,6], k = 1
Output: -1
Explanation: It can be proved that it is impossible to make the two arrays equal.
 

Constraints:
*/

/*

Time Complexity
O(n), where n is the length of the input arrays.

.every() is O(n).

A single for loop traverses the arrays once.

All indexing and arithmetic operations inside the loop are O(1).

Space Complexity
O(1) (constant space).

All variables (posSum, negSum, etc.) use a fixed amount of memory.

No additional data structures grow with input size.


*/
var minOperations = function (nums1, nums2, k) {
    //Initializes two variables: posSum to accumulate 
    // positive differences, negSum for negative; sets 
    // arrLen to the input array length 
    // (both arrays must be the same length).

    let posSum = 0, negSum = 0;
    let arrLen = nums1.length;
    //If k is zero (no allowed increment/decrement), 
    // it checks if both arrays are identical using 
    // the .every() method. If so, returns 0 
    // (no operations needed), else -1 (impossible).

    if (k === 0) {
        const areArraysIdentical = nums1.every((value, index) => value === nums2[index]);
        return areArraysIdentical ? 0 : -1;
    }
    //Iterates over each index of both arrays.
    // Computes the difference between matching elements.
    // If the difference is not divisible by k, 
    // returns -1 (can't be transformed with k-interval steps).
    // Adds positive differences to posSum and negative to negSum.
    for (let i = 0; i < arrLen; i++) {
        let diff = nums1[i] - nums2[i];
        if (diff % k !== 0) return -1;
        diff > 0 ? posSum += diff : negSum += diff;
    }
    //If all differences are zero (arrays match), returns 0.
    if (posSum === 0 && negSum === 0) return 0;
    //If posSum + negSum !== 0, the total increase does not 
    // match total decrease (thus, impossible).

//If posSum < k or posSum % k, not enough or 
// not a multiple of k to perform valid steps — return -1.

    if (posSum + negSum !== 0 || posSum < k || posSum % k) return -1;
    //If none of the above, returns the minimum number
    //  of k-interval operations needed.
    return posSum / k;
};
nums1 = [4, 3, 1, 4], nums2 = [1, 3, 7, 1], k = 3;
let res = minOperations(nums1, nums2, k);
console.log("res=", res);