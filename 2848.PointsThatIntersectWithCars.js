/*
2848. Points That Intersect With Cars

Solution - https://leetcode.com/problems/points-that-intersect-with-cars/solutions/5115756/optimised/

Description
You are given a 0-indexed 2D integer array nums representing the coordinates of the cars parking on a number line. For any index i, nums[i] = [starti, endi] where starti is the starting point of the ith car and endi is the ending point of the ith car.

Return the number of integer points on the line that are covered with any part of a car.

 

Example 1:

Input: nums = [[3,6],[1,5],[4,7]]
Output: 7
Explanation: All the points from 1 to 7 intersect at least one car, therefore the answer would be 7.
Example 2:

Input: nums = [[1,3],[5,8]]
Output: 7
Explanation: Points intersecting at least one car are 1, 2, 3, 5, 6, 7, 8. There are a total of 7 points, therefore the answer would be 7.
 

Constraints:

1 <= nums.length <= 100
nums[i].length == 2
1 <= starti <= endi <= 100

*/

/*
Approach

The approach used in this function is based on the concept of sweep line algorithm. It involves iterating through each interval pair, updating a difference array to mark the start and end points of each interval, and then calculating the total number of points where at least one interval overlaps.
The key steps are:
Initialize Difference Array: Create an array diff of size 110 (assuming the maximum value of end in the intervals is 100) filled with zeros. This array will be used to mark the start and end points of each interval.
Iterate Through Interval Pairs:
For each interval [start, end] in the input nums, increment diff[start] and decrement diff[end + 1]. This marks the start and end points of each interval in the diff array.
Calculate Overlaps:
Initialize totalPoints to 0 to hold the total number of points with overlaps.
Initialize overlapCount to 0 to keep track of the current overlap count as we traverse the diff array.
Iterate through the diff array:
Add the current difference d to the overlapCount.
If overlapCount is greater than 0, it implies a point where intervals overlap, so increment totalPoints.
Return Total Points: Return the totalPoints, which represents the total number of points where at least one interval overlaps.

Time Complexity
The time complexity of this solution is O(n), where n is the number of interval pairs in the input nums.
The key steps contributing to this time complexity are:
Iterating through each interval pair to update the diff array: This takes O(n) time.
Iterating through the diff array to calculate the total number of points with overlaps: This also takes O(n) time.
Overall, the time complexity is linear, O(n).

Space complexity
The space complexity of this solution is O(1), as the extra space used is constant and does not depend on the input size. The diff array of size 110 is fixed and does not grow with the input size, making the space complexity constant.

*/


var numberOfPoints = function (nums) {
    const diff = Array(110).fill(0);
    // Iterate through each interval pair [start, end].
    for (const [start, end] of nums) {
        diff[start]++;
        diff[end + 1]--;
    }
    let totalPoints = 0;//This will hold the total number of points with overlaps.
    let overlapCount = 0;//keep track of current overlap count as we traverse
    for (let d of diff) {
        // Add the current difference to the overlap counter.
        overlapCount += d;
        // Each time the overlap count is positive, it implies a point where intervals overlap.
        if (overlapCount > 0) {
            totalPoints++;
        }
    }
    // Return the total number of points where at least one interval overlaps.
    return totalPoints;
};


let nums = [[3, 6], [1, 5], [4, 7]];
console.log(numberOfPoints(nums));