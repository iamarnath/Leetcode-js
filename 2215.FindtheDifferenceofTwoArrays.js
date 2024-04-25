/*
2215. Find the Difference of Two Arrays
Description
Given two 0-indexed integer arrays nums1 and nums2, return a list answer of size 2 where:

answer[0] is a list of all distinct integers in nums1 which are not present in nums2.
answer[1] is a list of all distinct integers in nums2 which are not present in nums1.
Note that the integers in the lists may be returned in any order.

 

Example 1:

Input: nums1 = [1,2,3], nums2 = [2,4,6]
Output: [[1,3],[4,6]]
Explanation:
For nums1, nums1[1] = 2 is present at index 0 of nums2, whereas nums1[0] = 1 and nums1[2] = 3 are not present in nums2. Therefore, answer[0] = [1,3].
For nums2, nums2[0] = 2 is present at index 1 of nums1, whereas nums2[1] = 4 and nums2[2] = 6 are not present in nums2. Therefore, answer[1] = [4,6].
Example 2:

Input: nums1 = [1,2,3,3], nums2 = [1,1,2,2]
Output: [[3],[]]
Explanation:
For nums1, nums1[2] and nums1[3] are not present in nums2. Since nums1[2] == nums1[3], their value is only included once and answer[0] = [3].
Every integer in nums2 is present in nums1. Therefore, answer[1] = [].
 

Constraints:

1 <= nums1.length, nums2.length <= 1000
-1000 <= nums1[i], nums2[i] <= 1000
*/
/*
Time Complexity:
The function uses two Set objects to store unique elements from nums1 and nums2, which takes O(m) and O(n) time, respectively, where 
m is the length of nums1 and n is the length of nums2.
The forEach loop iterates over nums1 and nums2 to remove common elements from the Set objects, which takes 
O(m) and O(n) time, respectively.
Converting the Set objects to arrays using Array.from takes 
O(m) and O(n) time.
Therefore, the overall time complexity of the function is O(m+n).

Space Complexity:

The function uses two Set objects s1 and s2 to store unique elements from nums1 and nums2, which contributes to the space complexity.
The space complexity is primarily determined by the size of the input arrays nums1 and nums2, as well as the additional space used by the Set objects.
Converting the Set objects to arrays also contributes to the space complexity.
Therefore, the space complexity of the function is O(m+n), where m is the space used by nums1 and n is the space used by nums2, in addition to the space used by the Set objects
*/
var findDifference = function (nums1, nums2) {
    const s1 = new Set(nums1);
    const s2 = new Set(nums2);
    nums1.forEach(num => {
        s2.delete(num);
    });
    nums2.forEach((num) => {
        s1.delete(num);
    });
    return [Array.from(s1), Array.from(s2)]
}

let nums1 = [1,2,3], nums2 = [2,4,6];
console.log(findDifference(nums1,nums2));
