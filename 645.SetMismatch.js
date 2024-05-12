/*
645. Set Mismatch

Solution - https://leetcode.com/problems/set-mismatch/solutions/5147728/optimised/

Description
You have a set of integers s, which originally contains all the numbers from 1 to n. Unfortunately, due to some error, one of the numbers in s got duplicated to another number in the set, which results in repetition of one number and loss of another number.

You are given an integer array nums representing the data status of this set after the error.

Find the number that occurs twice and the number that is missing and return them in the form of an array.

 

Example 1:

Input: nums = [1,2,2,4]
Output: [2,3]
Example 2:

Input: nums = [1,1]
Output: [1,2]
 

Constraints:

2 <= nums.length <= 104
1 <= nums[i] <= 104


*/

/*
Time and Space Complexity Analysis
Time Complexity: The time complexity of this algorithm is O(n), where n is the number of elements in the input array nums. This is because the algorithm iterates through the array once to count the occurrences of each element and then iterates through the numbers from 1 to n to find the missing and duplicate numbers.
Space Complexity: The space complexity of this algorithm is O(n) as well. This is due to the use of a Map to store the count of each element in the input array and an array of size 2 to store the result.
Approach
The algorithm first counts the occurrences of each element in the input array using a Map.
It then iterates through the numbers from 1 to n, checking the count of each number in the Map to identify the duplicate and missing numbers.
The duplicate number is the one with a count of 2, and the missing number is the one with a count of 0.
Finally, the algorithm returns an array containing the duplicate and missing numbers.
*/

function findErrorNums(nums) {
    const n = nums.length;
    const count = new Map();
    for (const x of nums) {
        count.set(x, (count.get(x) || 0) + 1);
    }
    const result = new Array(2).fill(0);
    for (let x = 1; x <= n; ++x) {
        const t = count.get(x) || 0;
        if (t === 2) {
            result[0] = x;
        } else if (t === 0) {
            result[1] = x;
        }
    }
    return result;
}

nums = [1, 2, 2, 4]
console.log(findErrorNums(nums));