/*
200. Number of Islands
Description
Given a 2D grid grid where '1' represents land and '0'
 represents water, count and return the number of islands.

An island is formed by connecting adjacent lands horizontally
 or vertically and is surrounded by water. You may assume water
  is surrounding the grid (i.e., all the edges are water).

Input: grid = [
    ["0","1","1","1","0"],
    ["0","1","0","1","0"],
    ["1","1","0","0","0"],
    ["0","0","0","0","0"]
  ]
Output: 1

Input: grid = [
    ["1","1","0","0","1"],
    ["1","1","0","0","1"],
    ["0","0","1","0","0"],
    ["0","0","0","1","1"]
  ]
Output: 4

Constraints:

1 <= grid.length, grid[i].length <= 100
grid[i][j] is '0' or '1'.
*/

function numIslands(grid) {
  const numOfRows = grid.length;
  const numOfColumns = grid[0].length;
  let numOfIslands = 0;
  // The Depth-First Search function, 
  // which marks visited land sections as '0'
  function dfs(row, column) {
    // Set the current location to '0' to mark as visited
    grid[row][column] = 0;
    const directions = [-1, 0, 1, 0, -1];
    // Array representing the 4 directions (up, right, down, left)
    /*
       is a compact way to represent the four cardinal directions 
     (up, right, down, left) for grid traversal.
     How It Works
     The array is used to calculate new coordinates when exploring
      neighbors in a 2D grid (like a board).
     Each pair of consecutive elements represents a direction:
     (dx, dy) for each direction.
    Direction	dx	dy	directions index
     Up	       -1	0	   0, 1
     Right	     0	1	   1, 2
     Down	     1	0	   2, 3
     Left	     0	-1	 3, 4
     */

    // Iterate over each direction
    for (let k = 0; k < 4; ++k) {
      // Calculate the new coordinates based on the current direction
      const newRow = row + directions[k];
      const newCol = column + directions[k + 1];
      // Check if the new coordinates are within bounds
      //  and the cell contains '1'
      if (newRow >= 0 && newRow < numOfRows && newCol >= 0 && newCol < numOfColumns
        && grid[newRow][newCol] === "1"
      ) {
        // If so, perform DFS on the adjacent cell
        dfs(newRow, newCol)
      }
    }
  }

  // Iterate over every cell in the grid
  for (let row = 0; row < numOfRows; ++row) {
    for (let column = 0; column < numOfColumns; ++column) {
      // If the cell contains '1' (land), an island is found
      if (grid[row][column] == "1") {
        dfs(row, column);
        numOfIslands++;
      }
    }
  }
  // Return the total number of islands found
  return numOfIslands;
}

// let grid = [
//     ["0","1","1","1","0"],
//     ["0","1","0","1","0"],
//     ["1","1","0","0","0"],
//     ["0","0","0","0","0"]
//   ]
let grid = [
  ["1", "1", "0", "0", "1"],
  ["1", "1", "0", "0", "1"],
  ["0", "0", "1", "0", "0"],
  ["0", "0", "0", "1", "1"]
]
console.log(numIslands(grid))

// bfs solution
class Solution {
    constructor() {
        this.dir = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1]
        ];
    }

    bfs(grid, i, j, queue) {
        queue.push([i, j]);
        grid[i][j] = '$';

        const isSafe = (i, j) => {
            return i >= 0 && i < grid.length &&
                   j >= 0 && j < grid[0].length &&
                   grid[i][j] === '1';
        };

        while (queue.length > 0) {
            const [currI, currJ] = queue.shift();
            for (const [di, dj] of this.dir) {
                const i_ = currI + di;
                const j_ = currJ + dj;
                if (isSafe(i_, j_)) {
                    queue.push([i_, j_]);
                    grid[i_][j_] = '$';
                }
            }
        }
    }

    numIslands(grid) {
        if (!grid || grid.length === 0) return 0;

        const m = grid.length;
        const n = grid[0].length;
        let count = 0;
        const queue = [];

        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (grid[i][j] === '1') {
                    this.bfs(grid, i, j, queue);
                    count++;
                }
            }
        }

        return count;
    }
}
