/*
347. Top K Frequent Elements

Solution - https://leetcode.com/problems/top-k-frequent-elements/solutions/5140270/optimised/

Description
Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

Example 1:

Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
Example 2:

Input: nums = [1], k = 1
Output: [1]
 

Constraints:

1 <= nums.length <= 105
-104 <= nums[i] <= 104
k is in the range [1, the number of unique elements in the array].
It is guaranteed that the answer is unique.

*/

/*
Approach Explanation:
The code first creates a Map to store the frequency of each number in the input array.
It then converts this Map into an array of key-value pairs to facilitate sorting based on frequency.
The array is sorted in descending order based on the frequency of each number.
Finally, it extracts the top k frequent elements from the sorted array and returns them.
Time Complexity:
Populating the Map with the frequency of each number takes O(n) time, where n is the number of elements in the input array.
Converting the Map into an array of key-value pairs using Array.from() takes O(n) time.
Sorting the array based on frequency using sort() takes O(n log n) time.
Extracting the top k elements from the sorted array takes O(k) time.
The overall time complexity is O(n) + O(n) + O(n log n) + O(k) = O(n log n).
Space Complexity:
The Map used to store the frequency of each number takes O(n) space in the worst case.
The array of key-value pairs also takes O(n) space.
The array to hold the top k frequent elements takes O(k) space.
The total space complexity is O(n) + O(n) + O(k), which simplifies to O(n) if k is a constant factor of n.

*/

function topKFrequent(nums, k) {
    const map = new Map();
    for (const num of nums) {
        map.set(num, (map.get(num) || 0) + 1);
    }
    // Convert the Map into an array of key-value pairs
    const frqArr = Array.from(map);
    console.log("map==",map)
    console.log("frqArr==",frqArr)
    // Sort the array based on frequency in descending order
    frqArr.sort((a, b) => b[1] - a[1]);
    const topElem = [];
    for (let i = 0; i < k; i++) {
        topElem.push(frqArr[i][0])//0 represents number,1 represents the frequency
    }
    return topElem;
}
/*
function topKFrequent(nums, k) {
    const map = new Map();
    let maxCount = 0;
    for (const num of nums) {
        map.set(num, (map.get(num) || 0) + 1);
        maxCount = Math.max(maxCount, map.get(num))
    }
    const topElem = [];
    while (k > 0) {
        for (const key of map.keys()) {
            if (map.get(key) === maxCount) {
                topElem.push(key);
                k--;
            }
        }
        maxCount--;
    }
    return topElem;
}
*/
let nums = [1, 1, 1, 2, 2, 3], k = 2;
console.log(topKFrequent(nums, k))