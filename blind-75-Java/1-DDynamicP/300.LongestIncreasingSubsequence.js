/*
300. Longest Increasing Subsequence

Description
Given an integer array nums, return the length of the 
longest strictly increasing subsequence.

A subsequence is a sequence that can be derived from 
the given sequence by deleting some or no elements 
without changing the relative order of the remaining characters.

For example, "cat" is a subsequence of "crabt".
Example 1:

Input: nums = [9,1,4,2,3,3,7]

Output: 4
Explanation: The longest increasing subsequence is [1,2,3,7], 
which has a length of 4.

Example 2:

Input: nums = [0,3,1,3,2,3]

Output: 4
Constraints:

1 <= nums.length <= 1000
-1000 <= nums[i] <= 1000

*/
/*
Explanation of the Code
The code solves the Longest Increasing Subsequence (LIS) problem using 
recursion with memoization (top-down dynamic programming).

The function lengthOfLIS(nums) initializes a memoization table 
and calls the recursive helper lis(prev_idx, curr_idx).

lis(prev_idx, curr_idx) returns the length of the longest 
increasing subsequence starting at curr_idx, where the previous 
element in the subsequence is at prev_idx.

At each step, you have two choices:

Take the current number if it is greater than the previous number 
in the subsequence (or if there is no previous number).
 Then, move both prev_idx and curr_idx forward.

Not take the current number and move only curr_idx forward.

The result is memoized in a 2D array to avoid redundant calculations.

Memoization Table:

The memoization table t is a 2D array of size (n+1) x n 
(since prev_idx can be -1 to n-1, and curr_idx from 0 to n-1).

We use prev_idx + 1 as the first index to handle the -1 case.

Time Complexity
The recursive function has two parameters: prev_idx 
(can range from -1 to n-1, i.e., n possibilities) and curr_idx (from 0 to n-1, i.e., n possibilities).

Therefore, the total number of unique states is 

O(n ^2).

Each state is computed once due to memoization, and each computation does 

O(1) work (apart from the recursive calls).

Total Time Complexity:

O(n ^2 )
Space Complexity
The memoization table t uses 

O(n ^2) space.

The recursion stack can go up to 

O(n) deep in the worst case.

Total Space Complexity:

O(n^ 2)
*/
var lengthOfLIS = function(nums) {
  const n=  nums.length;
      // t[prev_idx+1][curr_idx] for memoization, since prev_idx can be -1
   const t= Array.from({length:n+1},()=>Array(n).fill(-1));
    function lis(prev,curr){
        if(curr == n) return 0;
        // Shift prev_idx by 1 to handle -1 index
        if(prev !==-1 && t[prev][curr] !== -1){
            return t[prev][curr];
        }
        let taken=0;
        if(prev === -1 || nums[curr] > nums[prev]){
            taken = 1+ lis(curr,curr+1);
        }
        const not_taken=lis(prev,curr+1);
        if(prev !=-1){
            t[prev][curr] = Math.max(taken,not_taken);
        }
        return Math.max(taken,not_taken);
    }
    return lis(-1,0);

};

const nums = [10, 9, 2, 5, 3, 7, 101, 18];
//console.log(lengthOfLIS(nums));
/*
Initialization:

t[i] stores the length of the LIS ending at index i.

All values are initialized to 1 because the smallest LIS ending at each index is the element itself.

Nested Loops:

For each element nums[i], check all previous elements nums[j] where j < i.

If nums[j] < nums[i], it means you can extend the increasing subsequence ending at j to include i.

Update t[i] as the maximum of its current value and t[j] + 1.

Track Maximum:

After updating t[i], update maxL if t[i] is greater.

Result:

The answer is the maximum value in t, which is stored in maxL.

Example
Given nums = [10, 9, 2, 5, 3, 7, 101, 18]; LIS is [2,5,7,101],[2,3,7,101] both of length 4.

Time and Space Complexity
Time Complexity:

O(n ^2)
(Two nested loops over the array.)

Space Complexity:

O(n)
(For the t array.)


*/

function lengthOfLISDP(nums) {
    const n=  nums.length;
    if(n==0) return 0;
    const t= new Array(n).fill(1);
    let maxL=1;
    for(let i=0;i<n;i++){
        for(let j=0;j<i;j++){
            if(nums[j] < nums[i]){
                t[i] = Math.max(t[i],t[j]+1);
            }
        }
        maxL = Math.max(maxL,t[i]);
    }
    return maxL;
}
// Example usage:
const nums2 = [10, 9, 2, 5, 3, 7, 101, 18];
console.log(lengthOfLISDP(nums2));

/*
How It Works
Binary Search for Efficiency:

The binarySearch function finds the lower bound 
(first element ≥ target) in the sorted array.

This allows us to maintain a "virtual" increasing subsequence efficiently.

Building the Subsequence:

For each number in nums, find its position in sorted:

If the number is larger than all elements in sorted, append it.

Otherwise, replace the first element in sorted that is ≥ the current number.

This ensures sorted always reflects the smallest possible tail values for the longest subsequence.

Example
For `nums = [10, 9, 2, 5, 3, 7,es as:
→ → → → → → →.
Final length = 4.

Time & Space Complexity
Aspect	Complexity
Time Complexity	
O
(
n
log
⁡
n
)
O(nlogn)
Space Complexity	

O(n)
Why?
Binary Search: Each of the n elements triggers a 
binary search over a list of size ≤ n, giving 

O(nlogn) time.

Space: The sorted array grows to at most size n.
*/
//patience sorting
function lengthOfLIS(nums) {
    const sorted = [];
    
    function binarySearch(target) {
        let left = 0;
        let right = sorted.length;
        let result = right; // Default to inserting at the end
        
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (sorted[mid] < target) {
                left = mid + 1;
            } else {
                result = mid; // Potential insertion point
                right = mid;
            }
        }
        return result;
    }
    
    for (const num of nums) {
        const index = binarySearch(num);
        if (index === sorted.length) {
            sorted.push(num);
        } else {
            sorted[index] = num;
        }
    }
    
    return sorted.length;
}

// Example usage:
//const nums = [10, 9, 2, 5, 3, 7, 101, 18];
console.log(lengthOfLIS(nums)); // Output: 4

/*
function lengthOfLIS(nums) {
Declares a function named lengthOfLIS that takes an array nums as input.

javascript
    const sorted = [];
Initializes an empty array sorted. This array will store the smallest possible tail elements for increasing subsequences of different lengths.

javascript
    function binarySearch(target) {
Declares an inner helper function binarySearch that finds the first index in sorted where the value is greater than or equal to target (the "lower bound").

javascript
        let left = 0;
        let right = sorted.length;
        let result = right; // Default to inserting at the end
Initializes left to 0 and right to the length of sorted. result is set to right, which is the default insertion position if no element in sorted is greater than or equal to target.

javascript
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (sorted[mid] < target) {
                left = mid + 1;
            } else {
                result = mid; // Potential insertion point
                right = mid;
            }
        }
        return result;
    }
Performs a binary search:

If sorted[mid] is less than target, move left up (search the right half).

Otherwise, update result to mid and move right down (search the left half).

Returns the index where target should be inserted or replaced to maintain sorted order.

javascript
    for (const num of nums) {
        const index = binarySearch(num);
        if (index === sorted.length) {
            sorted.push(num);
        } else {
            sorted[index] = num;
        }
    }
Iterates through each num in the input array nums:

Finds the position index in sorted where num should go.

If index is at the end of sorted, append num (start a new longer subsequence).

Otherwise, replace sorted[index] with num (maintain the smallest possible tail for a subsequence of that length).

javascript
    return sorted.length;
}
Returns the length of the sorted array, which is the length of the longest increasing subsequence found.


*/