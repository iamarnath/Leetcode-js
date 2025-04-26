/*
Description
Given an integer array nums and an integer k, 
return the k most frequent elements within the array.

The test cases are generated such that the answer is always unique.

You may return the output in any order.

Example 1:

Input: nums = [1,2,2,3,3,3], k = 2

Output: [2,3]
Example 2:

Input: nums = [7,7], k = 1

Output: [7]
Constraints:

1 <= nums.length <= 10^4.
-1000 <= nums[i] <= 1000
1 <= k <= number of distinct elements in nums.

*/

function topKFrequent(nums, k) {
    const map = new Map();
    for (const num of nums) {
        map.set(num, (map.get(num) || 0) + 1);
    }
    // Convert the Map into an array of key-value pairs
    const frqArr = Array.from(map);
    console.log("map==", map)
    console.log("frqArr==", frqArr)
    // Sort the array based on frequency in descending order
    frqArr.sort((a, b) => b[1] - a[1]);
    console.log("frqArr sorted ==", frqArr);
    const topElem = [];
    for (let i = 0; i < k; i++) {
        topElem.push(frqArr[i][0]) //0 represents number,1 represents the frequency
    }
    return topElem;
}


class Solution {
    topKfrequentElement(nums, k) {
        const count = {};
        const freq = Array.from({ length: nums.length + 1 }, () => []);
        console.log("freq initial==",freq);
        // freq initial== [
        //   [], [], [], [],
        //   [], [], [], []
        // ]
        for (const n of nums) {
            count[n] = (count[n] || 0) + 1;
        }
        // console.log("count==", count);//count== { '2': 2, '4': 1, '5': 2, '6': 2 }
        for (const n in count) {
            freq[count[n]].push(parseInt(n));
        }
        console.log("freq final==",freq);
        //freq final== [ [], [ 4 ], [ 2, 5, 6 ], [], [], [], [], [] ]
        const res = [];
        for (let i = freq.length - 1; i > 0; i--) {
            // console.log("outer loop-",i,freq[i]);
            // outer loop- 7 []
            // outer loop- 6 []
            // outer loop- 5 []
            // outer loop- 4 []
            // outer loop- 3 []
            // outer loop- 2 [ 2, 5, 6 ]
            for (const n of freq[i]) {
                // console.log("freq==",{ i,n,res});
                // freq== { i: 2, n: 2, res: [] }
                // freq== { i: 2, n: 5, res: [ 2 ] }
                res.push(n);
                if (res.length === k) {
                    return res;
                }
            }
        }
    }
}


// let nums = [2,2,5,5,6,6,4], k = 2

// let result = topKFrequent(nums,k);

// console.log(result)

// Create an instance of Solution
const solution = new Solution();

// Example array to test
let nums = [2,2, 5, 5, 6, 6, 4], k = 2

// Call the method and store the result
const result = solution.topKfrequentElement(nums, k);

// Print the result
console.log(result);