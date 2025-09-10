/*
11. Container With Most Water

Solution- https://leetcode.com/problems/container-with-most-water/solutions/5142195/optimsed/

You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.

Example 1:

Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
Example 2:

Input: height = [1,1]
Output: 1
 
Constraints:

n == height.length
2 <= n <= 105
0 <= height[i] <= 104

*/
/*
Approach

Initialize two pointers, left and right, pointing to the first and last indices of the height array, respectively.
Initialize a variable maxArea to keep track of the maximum area found so far.
Iterate while left is less than right (until the two pointers meet):
Calculate the current area currArea using the formula (right - left) * Math.min(height[right], height[left]). This formula calculates the area of the rectangle formed by the two vertical lines at indices left and right.
Update maxArea if currArea is greater than the current value of maxArea.
Move the pointer that points to the shorter line inwards:
If the height at the left pointer is less than the height at the right pointer, increment left by 1.
Otherwise, decrement right by 1.
After the loop, return the maxArea found.

Time Complexity:
The time complexity of this approach is O(n), where n is the length of the height array.
 This is because the function iterates through the array once using the two pointers, and each 
 iteration takes constant time.
Space Complexity:
The space complexity of this approach is O(1), which means the space required does not grow 
with the size of the input. This is because the function only uses a constant amount of space to
 store the variables left, right, and maxArea, regardless of the size of the height array.
*/

var maxArea = function (height) {
    let left = 0;
    let right = height.length - 1;
    let maxArea = 0;
    // Iterate until the two pointers meet
    while (left < right) {
        // Calculate the area with the current pair of lines
        const currArea = (right - left) * Math.min(height[right], height[left]);
        //update maxArea if currArea is bigger;
        maxArea = Math.max(maxArea, currArea);
        // Move the pointer that's at the shorter line inwards
        // If the left line is shorter than the right line
        if (height[left] < height[right]) {
            left++;
        }
        else {
            right--;
        }
    }
    // Return the maximum area found
    return maxArea;
};
height = [1, 8, 6, 2, 5, 4, 8, 3, 7];
height = [1, 1];
console.log(maxArea(height))