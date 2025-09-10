/*
55. Jump Game
You are given an integer array nums where each element nums[i]
 indicates your maximum jump length at that position.

Return true if you can reach the last index starting from index 0,
 or false otherwise.

Example 1:

Input: nums = [1,2,0,1,0]

Output: true
Explanation: First jump from index 0 to 1, then from index 1 to 3, 
and lastly from index 3 to 4.

Example 2:

Input: nums = [1,2,1,0,1]

Output: false
Constraints:

1 <= nums.length <= 1000
0 <= nums[i] <= 1000

*/
/*
Time Complexity
The time complexity of your recursive memoized canJump solution
 is O(n²) in the worst case.

For each index 

idx from 0 to n−1, you may try up to nums[idx] jumps.

In the worst case, if every nums[idx] is large (e.g., 
n), you could try up to 
n jumps from each position, leading to 
O(n^ 2) total recursive calls.

However, due to memoization, each index is only solved once,
 and each call may iterate over up to n possible jumps, so the total
  work is bounded by O(n^ 2).

Space Complexity
The space complexity is also O(n):

The memoization array t stores one value per index, so it uses 

O(n) space.

The maximum recursion depth is also 
O(n) in the worst case (if the recursion goes as deep as possible),
 but this does not increase the asymptotic space since the memoization 
 array dominates.

Thus, total space is O(n).
*/
function canJump(nums) {
    const n = nums.length;
    /*
    Creates a memoization array t of size n, initialized with -1.

    t[idx] will store whether it's possible to reach the end from
    index idx (true or false).

    -1 means the result for that index has not been computed yet.
    */
    const t = new Array(n).fill(-1);
    //Defines a helper function solve that will recursively 
    // determine if you can reach the end from index idx.


    function solve(idx) {
        //If idx is the last index, you have reached the end,
        //  so return true.
        if (idx === n - 1) return true;
        if (t[idx] !== -1) return t[idx];
        //Try all possible jumps:
        //Loop over all possible jump lengths from 1 up to nums[idx].
        //This represents all positions you can reach from the current index.

        for (let i = 1; i <= nums[idx]; i++) {
            /*
            For each possible jump, check if the destination index (idx + i)
             is within bounds.
            Recursively call solve(idx + i) to see if you can reach the
             end from the new position.
            If any jump leads to the end, the current index is also good.
            */
            if (idx + i < n && solve(idx + i)) {
                t[idx] = true;
                return true;
            }
        }
        t[idx] = false;
        return false;
    }
    return solve(0)
}
/*
Time Complexity: O(n²) in the worst case (due to the nested loops).
Space Complexity: O(n) for the DP array.
*/
function canJumpDP(nums) {
    const n = nums.length;
    const t = new Array(n).fill(false);
    // t[i] = true means you can reach index i
    t[0] = true;// Already at starting index
    /*
    For every index i from 1 to n-1, check if you can reach it.
    For each i, look back at all previous indices j (from i-1 down to 0):
    t[j] checks if index j is reachable.
    j + nums[j] >= i checks if you can jump from j to at least i.
    If both are true, set t[i] = true and break out of the inner loop
     (no need to check further).

    */
    for (let i = 1; i < n; i++) {
        for (let j = i - 1; j >= 0; j--) {
            if (j + nums[j] >= i && t[j]) {
                // If you can reach index j, and from j you can jump to i or beyond
                t[i] = true;
                break;
            }
        }
    }
    return t[n - 1];
}
//O(n) approach
/*
Time Complexity: O(n)
The function iterates through the array once, and each operation 
inside the loop is O(1).

Therefore, the overall time complexity is O(n).

Space Complexity: O(1)
Only a constant amount of extra space (maxReachable and n) is used,
 regardless of the input size.

No additional data structures (like arrays or objects) are used.

Therefore, the space complexity is O(1).
*/
function canJumpOptimal(nums) {
    //maxReachable keeps track of the farthest index you can reach so far.
    let maxReachable = 0;
    let n = nums.length;
    for (let i = 0; i < n; i++) {
        //If the current index i is beyond the farthest 
        // reachable index (maxReachable), you cannot proceed further,
        //  so return false.
        if (i > maxReachable) {
            return false;
        }
        //Update maxReachable to be the maximum of its current
        //  value or the farthest you can reach from the current
        //  index (nums[i] + i).
        maxReachable = Math.max(maxReachable, nums[i] + i);
    }
    //If you finish the loop without returning false,
    //  it means you can reach the end, so return true.
    return true;
}
console.log("true case==", canJumpOptimal([2, 3, 1, 1, 4])); // Output: true
console.log("false case==", canJumpOptimal([3, 2, 1, 0, 4])); // Output: false