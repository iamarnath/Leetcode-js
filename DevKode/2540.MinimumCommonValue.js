/*
2540. Minimum Common Value

Solution - https://leetcode.com/problems/minimum-common-value/solutions/5087001/optimised/


Description
Given two integer arrays nums1 and nums2, sorted in non-decreasing order, return the minimum integer common to both arrays. If there is no common integer amongst nums1 and nums2, return -1.

Note that an integer is said to be common to nums1 and nums2 if both arrays have at least one occurrence of that integer.

 

Example 1:

Input: nums1 = [1,2,3], nums2 = [2,4]
Output: 2
Explanation: The smallest element common to both arrays is 2, so we return 2.
Example 2:

Input: nums1 = [1,2,3,6], nums2 = [2,3,4,5]
Output: 2
Explanation: There are two common elements in the array 2 and 3 out of which 2 is the smallest, so 2 is returned.
 

Constraints:

1 <= nums1.length, nums2.length <= 105
1 <= nums1[i], nums2[j] <= 109
Both nums1 and nums2 are sorted in non-decreasing order.

*/
/*
The time complexity of this function is O(n + m) where n is the length of nums1 and m is the length of nums2. This is because in the worst-case scenario, the function will iterate through both arrays once, comparing elements at each step until a common element is found or until the end of one of the arrays is reached.

The space complexity of this function is O(1) because it uses a constant amount of extra space regardless of the input size. The function only uses a few variables to store array lengths and indices, and does not create any additional data structures that grow with the input size.

*/

function getCommon(nums1, nums2) {
    let len1 = nums1.length;
    let len2 = nums2.length;
    // Initialize pointers for both arrays.
    let index1 = 0, index2 = 0;
    while (index1 < len1 && index2 < len2) {
        // Check if the current elements are the same.
        if (nums1[index1] === nums2[index2]) {
            return nums1[index1]
        }
        else if (nums1[index1] < nums2[index2]) {
            index1++
        }
        else {
            index2++
        }
    }
    // If no common element is found, return -1.
    return -1
}

let nums1 = [1,2,3], nums2 = [2,4];
nums1 = [1,2,3,6], nums2 = [2,3,4,5]
console.log(getCommon(nums1,nums2));