/*
1425.ConstrainedSubsequenceSum

Given an integer array nums and an integer k, return 
the maximum sum of a non-empty subsequence of that array 
such that for every two consecutive integers in the 
subsequence, nums[i] and nums[j], where i < j, 
the condition j - i <= k is satisfied.

A subsequence of an array is obtained by deleting 
some number of elements (can be zero) from the array,
leaving the remaining elements in their original order.

Example 1:

Input: nums = [10,2,-10,5,20], k = 2
Output: 37
Explanation: The subsequence is [10, 2, 5, 20].
Example 2:

Input: nums = [-1,-2,-3], k = 1
Output: -1
Explanation: The subsequence must be non-empty, so 
we choose the largest number.
Example 3:

Input: nums = [10,-2,-10,-5,20], k = 2
Output: 23
Explanation: The subsequence is [10, -2, -5, 20].
 

Constraints:

1 <= k <= nums.length <= 105
-104 <= nums[i] <= 104

*/

class Solution {
    constructor() {
        this.n = 0;
        this.k = 0;
        this.mp = new Map();
    }

    solve(nums, lastChosenIndex, currIndex) {
        if (currIndex >= this.n)
            return 0;

        const key = lastChosenIndex + "_" + currIndex;

        if (this.mp.has(key))
            return this.mp.get(key);

        let result = 0;

        if (lastChosenIndex === -1 || currIndex - lastChosenIndex <= this.k) {
            // take currIndex element
            let taken = nums[currIndex] + this.solve(nums, currIndex, currIndex + 1);

            // don't take currIndex element
            let notTaken = this.solve(nums, -1, currIndex + 1);

            result = Math.max(taken, notTaken);
        }

        this.mp.set(key, result);
        return result;
    }

    constrainedSubsetSum(nums, k) {
        this.n = nums.length;
        this.k = k;

        let val = this.solve(nums, -1, 0);
        if (val === 0)
            return -1;
        return val;
    }
}
/*
nums = [10, 2, -10, 5, 20], k = 2
Initialization:
t = [10, 2, -10, 5, 20], maxR = 10.

i = 1 (nums = 2)

Check j = 0 → t = max(2, 2 + 10) = 12
→ maxR = max(10, 12) = 12

i = 2 (nums = -10)

Check j = 1 → t = max(-10, -10 + 12) = 2

Check j = 0 → t = max(2, -10 + 10 = 0) = 2
→ maxR = max(12, 2) = 12

i = 3 (nums = 5)

Check j = 2 → t = max(5, 5 + 2) = 7

Check j = 1 → t = max(7, 5 + 12 = 17)
→ maxR = max(12, 17) = 17

i = 4 (nums = 20)

Check j = 3 → t = max(20, 20 + 17 = 37)

Check j = 2 → t = max(37, 20 + 2 = 22)
→ maxR = max(17, 37) = 37

Final Output = 37

🔑 Complexity
Time: O(n * k) → double loop (bad for large n,k).

Space: O(n) DP array.
*/
function constrainedSubsetSumBottomUp(nums, k) {
    const n = nums.length;

    // initialize dp array same as nums
    //Create a new array t, initialized as a copy of nums.
    //Initially, the best sum ending at i is just nums[i] (select only that element).
    const t = Array.from(nums);
    //t[i] will hold the maximum subsequence sum ending at index i.
    //maxR will store the global maximum result seen so far.
    //Initially, the best is t[0] (the first element).
    let maxR = t[0];

    for (let i = 1; i < n; i++) {
        //Look back at last k elements
        //For each i, we check previous indices j such that distance i - j <= k.
        //This ensures that if we extend the subsequence 
        // with index j, it respects the constraint.
        for (let j = i - 1; i - j <= k && j >= 0; j--) {
            //Update t[i] as the maximum of:
            // itself (t[i]),
            // or extending a subsequence ending at j (nums[i] + t[j]).
            //for all j within k back
            t[i] = Math.max(t[i], nums[i] + t[j]);
        }
        //After calculating the best ending at i, 
        // check if it improves the global answer maxR.
        maxR = Math.max(maxR, t[i]);
    }

    return maxR;
}
/*
Time and Space Complexity
Time Complexity: O(n)
Each index is pushed and popped from the deque at most once.

All other per-index operations are O(1).

Thus, single pass O(n).

Space Complexity: O(n)
The copy array t uses O(n) space.

The deque deq can hold at most k indices, so O(k) (which is O(n) in worst case).

So, total space is O(n).
*/
function constrainedSubsetSumMonotonic(nums, k) {
    const n = nums.length;
    //deq: will be used as a double-ended queue (deque) to store indices, not values.
    const deq = [];
    //a copy of nums (this will hold the best sum ending at index i).
    const t = nums.slice(); // make a copy of nums
    // Keeps track of the global maximum result found so far.
    //Initially set to t[0] firts element
    let maxR = t[0];
    //For each index i from 0 to n - 1:
    for (let i = 0; i < n; i++) {
        // Remove indices that are out of the current window [i - k, i]
        //Any index less than i - k is out of the allowed window and is removed (deq.shift()).
        while (deq.length && deq[0] < i - k)
            deq.shift();

        // If deque is not empty, use the best previous sum in range
        //
        if (deq.length)
            t[i] = Math.max(t[i], nums[i] + t[deq[0]]);

        // Maintain the deque in decreasing order of t[i]
        //Pop indices from back as long as their 
        // sum is less than or equal to t[i].
        //This way, the front always gives you the best (max) sum.
        while (deq.length && t[i] >= t[deq[deq.length - 1]]){
            deq.pop();
        }
            
        //Finished processing i, so add it to the deque.
        deq.push(i);

        maxR = Math.max(maxR, t[i]);
    }

    return maxR;
}

// Example usage:
const sol = new Solution();
let nums = [10, 2, -10, 5, 20], k = 2;

//console.log(sol.constrainedSubsetSum(nums, k)); // Example input

let res1 = constrainedSubsetSumBottomUp(nums,k);

//console.log("constrainedSubsetSumBottomUp==",res1)

let res2 = constrainedSubsetSumMonotonic(nums,k);
console.log("constrainedSubsetSumMonotonic==",res2)
