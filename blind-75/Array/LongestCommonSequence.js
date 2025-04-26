/*

Given an array of integers nums, return the length of the longest consecutive sequence of elements that can be formed.

A consecutive sequence is a sequence of elements in which each element is exactly 1 greater than the previous element. The elements do not have to be consecutive in the original array.

You must write an algorithm that runs in O(n) time.

Example 1:

Input: nums = [2,20,4,10,3,4,5]

Output: 4
Explanation: The longest consecutive sequence is [2, 3, 4, 5].

Example 2:

Input: nums = [0,3,2,5,4,6,1,1]

Output: 7
Constraints:

0 <= nums.length <= 1000
-10^9 <= nums[i] <= 10^9

*/
/*
Explanation of Logic
Check if num is already processed:
If num is already in mp, skip it to avoid duplicates.

Find lengths of adjacent sequences:

left = length of consecutive sequence ending just before num (at num - 1).

right = length of consecutive sequence starting just after num (at num + 1).

Calculate the total length sum:
This is the length of the new merged sequence formed by connecting the left sequence, current number, and right sequence.

Update the map for current number:
Store the total length at num.

Update the boundaries:
Set the length at the left boundary (num - left) and right boundary (num + right) to the total length sum.
This ensures that the boundaries of the merged sequence know the full length, which helps when future numbers connect sequences.

Update the result:
Keep track of the maximum sequence length found so far.

Example Walkthrough
For input: [100, 4,0]

Start with empty map.

Process 100:

left = 0 (no 99), right = 0 (no 101), sum = 1

mp = {100: 1}

boundaries: 100 → 1

res = 1

Process 4:

left = 0 (no 3), right = 0 (no 5), sum = 1

mp = {100:1, 4:1}

boundaries: 4 → 1

res = 1

Process 200:

left = 0, right = 0, sum = 1

mp = {100:1, 4:1, 200:1}

res = 1

Process 1:

left = 0, right = 0, sum = 1

mp = {100:1, 4:1, 200:1, 1:1}

res = 1

Process 3:

left = mp.get(2) = 0 (2 not processed yet), right = mp.get(4) = 1

sum = 0 + 1 + 1 = 2

mp.set(3, 2)

boundaries:

left boundary = 3 - 0 = 3 → 2

right boundary = 3 + 1 = 4 → 2

mp = {100:1, 4:2, 200:1, 1:1, 3:2}

res = 2

Process 2:

left = mp.get(1) = 1, right = mp.get(3) = 2

sum = 1 + 2 + 1 = 4

mp.set(2, 4)

boundaries:

left boundary = 2 - 1 = 1 → 4

right boundary = 2 + 2 = 4 → 4

mp = {100:1, 4:4, 200:1, 1:4, 3:2, 2:4}

res = 4

The longest consecutive sequence length is 4 (`[1, 2, 3,

Why Does This Work Efficiently?
Each number is processed once.

The map keeps track of sequence lengths only at boundaries and the current number.

When a new number bridges two sequences, the sequences are merged by updating the boundary lengths.

This avoids scanning the entire sequence repeatedly.

*/
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    longestConsecutive(nums) {
        const mp = new Map();
        let res = 0;

        for (let num of nums) {
          if(!mp.has(num)){
                    // Calculate the length of sequences adjacent to 'num'
            const left = mp.get(num-1) || 0; // length of sequence ending at num-1
            const right = mp.get(num+1) || 0; // length of sequence starting at num+1
            // Total length of new sequence including 'num'

            const sum = left +right +1;
            console.log("left--",left,right,sum,num)
            // Store the length for 'num'
            mp.set(num,sum);
            // Update the boundary lengths of the merged sequence
            mp.set(num-left,sum);
            mp.set(num+right,sum);
            // Update the result with the longest sequence found
            res = Math.max(res,sum);
          }
        }
        return res;
    }
}

// Create an instance of Solution
const solution = new Solution();

// Example array to test
//let nums = [1,2,4,6]
let nums =  [2,20,4,10,3,4,5];
// Call the method and store the result
const result = solution.longestConsecutive(nums);

// Print the result
console.log(result);