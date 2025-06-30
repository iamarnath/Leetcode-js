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

//let height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
let height = [4, 2, 0, 3, 2, 5]
let result = trap(height);
console.log("trap rainwater==", result);