/*
1219. Path with Maximum Gold

https://leetcode.com/problems/path-with-maximum-gold/solutions/5059659/dfs-solution/

Description
In a gold mine grid of size m x n, each cell in this mine has an integer representing the amount of gold in that cell, 0 if it is empty.

Return the maximum amount of gold you can collect under the conditions:

Every time you are located in a cell you will collect all the gold in that cell.
From your position, you can walk one step to the left, right, up, or down.
You can't visit the same cell more than once.
Never visit a cell with 0 gold.
You can start and stop collecting gold from any position in the grid that has some gold.
*/
/*
Time Complexity:
The function uses a Depth-First Search (DFS) approach to explore all possible paths in the grid.
The DFS function is called for each cell in the grid, resulting in a total of rowCount * colCount calls.
Within each DFS call, the function explores up to 4 neighboring cells (up, down, left, right).
The time complexity of the DFS function is O(4^k), where k is the maximum length of a path in the grid.
Since each cell is visited at most once, the overall time complexity of the function is O(rowCount * colCount * 4^k), where k is the maximum path length.
Space Complexity:
The space complexity of the function is determined by the recursive calls made during the DFS traversal.
The recursive calls consume space on the call stack proportional to the maximum depth of the recursion, which is the length of the path.
The space complexity of the DFS function is O(k), where k is the maximum length of a path in the grid.
Additionally, the function uses a constant amount of extra space for variables and parameters.
Therefore, the overall space complexity of the function is O(k), where k is the maximum path length.
*/

var getMaximumGold = function (grid) {
    const rowCount = grid.length;
    const colCount = grid[0].length;
    const memo = new Array(rowCount).fill().map(() => new Array(colCount).fill(-1));
    const dfs = (row, col) => {
        if (row < 0 || row >= rowCount || col < 0 || col >= colCount || grid[row][col] === 0) {
            return 0;
        }
        if (memo[row][col] !== -1) {
            return memo[row][col];
        }
        const currentGold = grid[row][col];
        grid[row][col] = 0;

        let maxGoldFromDFS = currentGold + Math.max(dfs(row - 1, col), dfs(row + 1, col), dfs(row, col - 1), dfs(row, col + 1));
        grid[row][col] = currentGold;
        memo[row][col] = maxGoldFromDFS;
        return maxGoldFromDFS;
    }
    let maxGold = 0;
    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
            maxGold = Math.max(maxGold, dfs(i, j));
        }
    }
    return maxGold;

};

let grid = [[0, 6, 0], [5, 8, 7], [0, 9, 0]];
//grid = [[1,0,7],[2,0,6],[3,4,5],[0,3,0],[9,0,20]]
console.log(getMaximumGold(grid));