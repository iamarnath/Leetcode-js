/*
63. Unique Paths II
You are given an m x n integer array grid. There is a robot 
initially located at the top-left corner (i.e., grid[0][0]). 
The robot tries to move to the bottom-right corner 
(i.e., grid[m - 1][n - 1]). The robot can only move either 
down or right at any point in time.

An obstacle and space are marked as 1 or 0 respectively in grid.
 A path that the robot takes cannot include any square that is an obstacle.

Return the number of possible unique paths that the robot can 
take to reach the bottom-right corner.

The testcases are generated so that the answer will be less 
than or equal to 2 * 109.

 

Example 1:


Input: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
Output: 2
Explanation: There is one obstacle in the middle of the 3x3 grid above.
There are two ways to reach the bottom-right corner:
1. Right -> Right -> Down -> Down
2. Down -> Down -> Right -> Right
Example 2:


Input: obstacleGrid = [[0,1],[0,0]]
Output: 1
 

Constraints:

m == obstacleGrid.length
n == obstacleGrid[i].length
1 <= m, n <= 100
obstacleGrid[i][j] is 0 or 1.
*/

/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
    const m = obstacleGrid.length;
    const n = obstacleGrid[0].length;
    // Initialize memoization table with -1
    const t = Array.from({ length: m }, () => Array(n).fill(-1));

    function solve(i, j) {
        if (i < 0 || i >= m || j < 0 || j >= n || obstacleGrid[i][j] !== 0) {
            return 0;
        }
        // Destination reached
        if (i === m - 1 && j === n - 1) {
            return 1;
        }
        // Already computed
        if (t[i][j] !== -1) {
            return t[i][j];
        }
        // Move right and down
        const right = solve(i, j + 1);
        const down = solve(i + 1, j);
        return t[i][j] = right + down;
    }
    return solve(0, 0);

};

function uniquePathsWithObstaclesDP(obstacleGrid) {
    const m = obstacleGrid.length;
    const n = obstacleGrid[0].length;
    // Create DP table initialized to 0
    const t = Array.from({ length: m }, () => Array(n).fill(0));
    // If the start cell is blocked, return 0
    if (obstacleGrid[0][0] === 1) return 0;
    // Fill the first row
    for (let col = 0; col < n; col++) {
        if (col > 0 && obstacleGrid[0][col - 1] === 1) {
            t[0][col] = 0;
            obstacleGrid[0][col] = 1;// Mark as unreachable from here onwards
        }
        else if (obstacleGrid[0][col] === 1) {
            t[0][col] = 0;
        }
        else {
            t[0][col] = 1;
        }
    }
    // Fill the first column
    for (let row = 0; row < m; row++) {
        if (row > 0 && obstacleGrid[row - 1][0] === 1) {
            t[row][0] = 0;
            obstacleGrid[row][0] = 1;// Mark as unreachable from here onwards
        }
        else if (obstacleGrid[row][0] === 1) {
            t[row][0] = 0;
        }
        else {
            t[row][0] = 1;
        }
    }
    // Fill the rest of the table
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (obstacleGrid[i][j] === 1) {
                t[i][j] = 0;
            }
            else {
                t[i][j] = t[i - 1][j] + t[i][j - 1];
            }
        }
    }
    return t[m - 1][n - 1];
}




const grid = [[0, 0, 0], [0, 1, 0], [0, 0, 0]];
console.log("uniquePathsWithObstaclesNew =",uniquePathsWithObstaclesDP(grid));