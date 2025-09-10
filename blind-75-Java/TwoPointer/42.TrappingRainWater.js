/*
42. Trapping Rain Water

You are given an array of non-negative integers height
 which represent an elevation map. Each value height[i] 
 represents the height of a bar, which has a width of 1.

Return the maximum area of water that can
 be trapped between the bars.

Example 1:
Input: height = [0,2,0,3,1,0,1,3,2,1]

Output: 9
Constraints:

1 <= height.length <= 1000
0 <= height[i] <= 1000

*/
/*
Time Complexity
getLeftMax:

O(n): One loop through the array of size n.

getRightMax:

O(n): One loop through the array of size n.

trap (main function):

O(n): One more loop through the array of size n
 to calculate the trapped water.

Total:

O(3n) = O(n), since constants don't affect Big-O notation.

→ Overall Time Complexity: O(n)

Space Complexity
getLeftMax:

O(n): Stores an array of size n.

getRightMax:

O(n): Stores another array of size n.

trap:

O(1): Uses a few variables for sum and loop counters.

Total:

O(n): (for the two extra arrays)

→ Overall Space Complexity: O(n)

Summary Table
Function	    Time Complexity	    Space Complexity
getLeftMax	    O(n)	                O(n)
getRightMax	    O(n)	                O(n)
trap	        O(n)	                O(1)
Total	        O(n)	                O(n)

*/
/*
This code calculates the total amount of water trapped between heights after raining, commonly known as the "Trapping Rain Water" problem.

Overview
The code uses three main steps:

Compute the maximum bar height to the left of each position.

Compute the maximum bar height to the right of each position.

For each position, calculate the water trapped based on the minimum of left and right maximum heights minus the current height.

Detailed Explanation
getLeftMax Function
Purpose: For each index in the array, finds the highest bar to the left (including itself).

Process:

Initializes leftMax with height.

Iterates through the array, setting leftMax[i] to the greater of leftMax[i-1] and height[i].

getRightMax Function
Purpose: For each index, finds the highest bar to the right (including itself).

Process:

Initializes rightMax[n-1] with height[n-1].

Iterates backwards through the array, setting rightMax[i] to the greater of rightMax[i+1] and height[i].

trap Function
Purpose: Calculates the total water trapped across all positions.

Logic:

Edge Case: If height array is empty or has only one value (n === 0 || n === 1), returns 0, since water can't be trapped.

Uses the above two functions to get leftMax and rightMax arrays.

For each index i, computes the trapped water as Math.min(leftMax[i], rightMax[i]) - height[i].

This ensures that only the minimum boundary height is used.

Sums up the trapped water for all positions and returns this value.

Key Points
Efficiency: The approach ensures efficient 

O(n) time with 

O(n) space.

Concept: For each index, trapped water is the difference between the smaller of its tallest left/right boundary and its own height, if that difference is positive.

Visual Example
If height = [2,1,2]:

leftMax = [2,2,2]

rightMax = [2,2,2]

Water at index 1: Math.min(2,2) - 1 = 1

Total trapped water: 1 unit.
*/
/*
Why At Index i?
For each position i:

leftMax[i] stores the maximum bar height from the start up to index i.

rightMax[i] stores the maximum bar height from index i to the end.

The water at position i is trapped by 
the smallest of these two heights, because 
water will overflow from the lower side.

Not Just Before and After
If one only considered "before" or "after"
 index i, it would miss the current position itself,
  which might be the highest point so far and 
  should be included in the boundary.
Using leftMax[i] and rightMax[i] ensures that
 the calculation always includes the current position,
  which is essential for accurate water trapping computation.

Core Logic
At position i, trapped water is:

Water i=min(leftMax[i],rightMax[i])−height[i]
This formula ensures the trapped water never
 exceeds the minimum boundary at position i,
  where both boundaries include the current index.

So, the algorithm computes both left and 
right barriers up to the current position 
so that the trapped water is always determined 
by the local maximum boundaries for each column.


*/
function getLeftMax(height, n) {
    let leftMax = new Array(n);
    leftMax[0] = height[0];
    for (let i = 1; i < n; i++) {
        leftMax[i] = Math.max(leftMax[i - 1], height[i]);
    }
    return leftMax;
}

function getRightMax(height, n) {
    let rightMax = new Array(n);
    rightMax[n - 1] = height[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        rightMax[i] = Math.max(rightMax[i + 1], height[i]);
    }
    return rightMax;
}

var trap = function (height) {
    const n = height.length;
    if (n === 0 || n === 1) return 0;
    const leftMax = getLeftMax(height, n);
    const rightMax = getRightMax(height, n);
    let sum = 0;
    for (let i = 0; i < n; i++) {
        sum += Math.min(leftMax[i], rightMax[i]) - height[i];
    }
    return sum;
};

let height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
//let height = [4, 2, 0, 3, 2, 5]
let result = trap(height);
console.log("trap rainwater==", result);