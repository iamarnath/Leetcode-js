/*
2032. Two Out of Three

https://leetcode.com/problems/two-out-of-three/solutions/5075423/optimised/


Description
Given three integer arrays nums1, nums2, and nums3, return a distinct array containing all the values that are present in at least two out of the three arrays. You may return the values in any order.

 

Example 1:

Input: nums1 = [1,1,3,2], nums2 = [2,3], nums3 = [3]
Output: [3,2]
Explanation: The values that are present in at least two arrays are:
- 3, in all three arrays.
- 2, in nums1 and nums2.
Example 2:

Input: nums1 = [3,1], nums2 = [2,3], nums3 = [1,2]
Output: [2,3,1]
Explanation: The values that are present in at least two arrays are:
- 2, in nums2 and nums3.
- 3, in nums1 and nums2.
- 1, in nums1 and nums3.
Example 3:

Input: nums1 = [1,2,2], nums2 = [4,3,3], nums3 = [5]
Output: []
Explanation: No value is present in at least two arrays.
 

Constraints:

1 <= nums1.length, nums2.length, nums3.length <= 100
1 <= nums1[i], nums2[j], nums3[k] <= 100

*/
/*
Solution 1: Array + Enumeration
We can first put each element of the arrays into an array, then enumerate each number i from 1 to 100, and check whether 
 i appears in at least two arrays. If so, add i to the answer array.

The time complexity is O(n1+n2+n3)
, and the space complexity is O(n1+n2+n3)
. Here, n1,n2,n3 are the lengths of the arrays nums1, nums2, and nums3, respectively.


Converting nums1, nums2, and nums3 into sets s1, s2, and s3. This step has a time complexity of O(n) for each list, where n is the length of the longest list among nums1, nums2, and nums3.
Iterating through the range [1, 101] and checking the presence of each number in the sets takes O(100) time, since it iterates over a fixed range of numbers.
The presence checks i in s1, i in s2, and i in s3 are O(1) operations due to set lookup properties. Since these checks are done for each number in [1, 101], this does not change the overall fixed time iteration.
Considering these steps, the overall time complexity can be approximated to O(n + 100), which simplifies to O(n) because, typically, the constant factors are dropped in complexity analysis.


The additional sets s1, s2, and s3 each have a maximum space complexity of O(n), assuming all elements are unique in the original lists.
The final list comprehension doesn't store more than 100 integers since it's constrained by the range [1, 101], which accounts for O(1) space.
Hence, the total space complexity of the code is O(3n + 1), which simplifies to O(n) as constant factors and coefficients are omitted in Big O notation.
*/
function twoOutOfThree(nums1, nums2, nums3) {
    const count = new Array(101).fill(0);
    // Loop through unique values of nums1 and increment the count
    new Set(nums1).forEach(val => count[val]++);
    // Loop through unique values of nums2 and increment the count
    new Set(nums2).forEach(val => count[val]++);
    // Loop through unique values of nums3 and increment the count
    new Set(nums3).forEach(val => count[val]++);
    const result = [];
    // Iterate over 'counts' and push the numbers with a count of 2 or more to 'result'
    count.forEach((val, idx) => {
        if (val >= 2) {
            result.push(idx);
        }
    });
    return result;
}

let nums1 = [1, 1, 3, 2], nums2 = [2, 3], nums3 = [3]
// nums1 = [3,1], nums2 = [2,3], nums3 = [1,2];
// nums1 = [1,2,2], nums2 = [4,3,3], nums3 = [5]
console.log(twoOutOfThree(nums1, nums2, nums3));