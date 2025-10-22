/*
2870. Minimum Number of Operations to Make Array Empty
You are given a 0-indexed array nums consisting of positive integers.

There are two types of operations that you can apply on the array any number of times:

Choose two elements with equal values and delete them from the array.
Choose three elements with equal values and delete them from the array.
Return the minimum number of operations required to make the array empty, or -1 if it is not possible.

 

Example 1:

Input: nums = [2,3,3,2,2,4,2,3,4]
Output: 4
Explanation: We can apply the following operations to make the array empty:
- Apply the first operation on the elements at indices 0 and 3. The resulting array is nums = [3,3,2,4,2,3,4].
- Apply the first operation on the elements at indices 2 and 4. The resulting array is nums = [3,3,4,3,4].
- Apply the second operation on the elements at indices 0, 1, and 3. The resulting array is nums = [4,4].
- Apply the first operation on the elements at indices 0 and 1. The resulting array is nums = [].
It can be shown that we cannot make the array empty in less than 4 operations.
Example 2:

Input: nums = [2,1,2,2,3,3]
Output: -1
Explanation: It is impossible to empty the array.
 

Constraints:

2 <= nums.length <= 105
1 <= nums[i] <= 106
*/


/*
Time Complexity
O(n): Creating the frequency map is a single pass through the nums array (n is array length).

O(k): Iterating through all unique numbers (k is the number of unique elements). In the worst case, k can be up to n, but generally k ≤ n.

Other operations (get, set in Map, Math.ceil) are O(1).

Total: O(n + k) = O(n), since k cannot exceed n.

Space Complexity
O(k): Storing frequencies for up to k unique numbers in the map.

Other variables use constant space.

Total: O(k), where k is the number of unique elements.

*/
var minOperations = function(nums) {
    //Stores the length of the input array
    //  into variable n for easy reference throughout the function.
    const n = nums.length;
    //Initializes a new Map object called freqMap to
    //  store each unique number and its frequency 
    // (count) from the input array. A Map 
    // is used since it efficiently handles 
    // keys and values of any type and maintains insertion order
    const freqMap = new Map();

    // Count frequencies
    //Iterates through the entire nums array once.
//     For each element nums[i], it increases its count
//  by 1 in freqMap using Map.get.

// If the number is not present, 
// freqMap.get(nums[i]) returns undefined 
// (which is falsy), so the code uses 0 as default, then adds 1.

// After this loop, each unique number is a 
// key in the map, and its value is the count 
// of how many times it appears in nums.


    for (let i = 0; i < n; i++) {
        freqMap.set(nums[i], (freqMap.get(nums[i]) || 0) + 1);
    }
    //Initializes result to 0. 
    // This variable will store the total minimum number of operations needed.
    let result = 0;
    //Starts a loop that goes through all the entries 
    // ([key, value] pairs) in freqMap.
    //Here, num is the unique number, and freq is its count.
    for (let [num, freq] of freqMap.entries()) {
        //Checks if any unique number occurs only once in the array.

//If so, it's impossible to remove that number in
//  batches of 2 or 3 (as per the problem’s implied
//  batch-removal rule), so it returns -1 right away.
        if (freq === 1) {
            return -1; // cannot remove single occurrence
        }
        //For other counts (2 or higher), calculates how
        //  many operations are needed to remove all occurrences.

    //The most efficient is to remove in groups of 3 as
    //  much as possible. If there are leftovers (e.g.,
    //  4 is 3 + 1, so two operations are needed), 
    // Math.ceil(freq / 3) gives the required minimum operations.
        result += Math.ceil(freq / 3);
    }

    return result;
};
let nums = [2,3,3,2,2,4,2,3,4];
let res = minOperations(nums)
console.log("res==",res); // 4