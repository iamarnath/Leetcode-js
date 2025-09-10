/*
239. Sliding Window Maximum

You are given an array of integers nums, 
there is a sliding window of size k which is
 moving from the very left of the array to 
 the very right. You can only see the k
  numbers in the window. Each time the 
  sliding window moves right by one position.

Return the max sliding window.

Example 1:

Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
Explanation: 
Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
Example 2:

Input: nums = [1], k = 1
Output: [1]
 

Constraints:

1 <= nums.length <= 105
-104 <= nums[i] <= 104
1 <= k <= nums.length

*/

var maxSlidingWindow = function (nums, k) {
    let n = nums.length;
    //Edge case: if the array is empty,
    //  return an empty array (no windows are possible).
    if (n === 0) return [];
    //Initialize an empty deque (array used as a queue).

    //Important: it stores indices of elements,
    //  not the actual values.
    //Storing indices helps us quickly check if an 
    // element is outside the current window.
    let deq = [];   // will store indices
    //Initialize an empty array result to
    // store the maximum of each sliding window.
    let result = [];

    for (let i = 0; i < n; i++) {
        // remove elements out of the current window
        //deq is the index of the oldest element in the deque.
//If this index is outside the current window 
// (<= i - k), remove it (shift() removes from the front).
//This ensures that all indices in deq are 
// within the current window of size k.
        while (deq.length > 0 && deq[0] <= i - k) {
            deq.shift();
        }
//While the deque is not empty and the current element 
// nums[i] is greater than the element corresponding
//  to the index at the back of deque, pop from the back.

//Why? Because if nums[i] is bigger, then 
// the older smaller elements cannot ever be
//  the maximum in this or any future 
// window → they are useless, so we discard them.
        // maintain deque in descending order (by values in nums)
        //deq.length - 1 gets the last index in the deque.
// deq[deq.length - 1] gives you the last value stored in the deque, which is an index in nums.
// nums[deq[deq.length - 1]] accesses the actual value in the nums array at the position pointed to by that index.

        while (deq.length > 0 && nums[i] > nums[deq[deq.length - 1]]) {
          
            deq.pop();
        }
//Add the current index i to the back of the deque.
//Now deq contains candidate indices for the maximum,
//  in descending order of their corresponding nums values.
        deq.push(i);
        //Once we've processed at least k elements
        //  (i.e., formed a full window), we can record a maximum.
        // add result when window is at least size k
        //deq is the index of the maximum element for the current window, because:

        // The deque is kept in decreasing order,

        // The front always represents the largest
        //  element that’s still inside the window.

        // Push that maximum (nums[deq]) into the result array.
        if (i >= k - 1) {
            result.push(nums[deq[0]]);
        }
    }

    return result;
}

let nums = [1,3,-1,-3,5,3,6,7], k = 3;
let res = maxSlidingWindow(nums,k);

console.log("maxSlidingWindow==",res)