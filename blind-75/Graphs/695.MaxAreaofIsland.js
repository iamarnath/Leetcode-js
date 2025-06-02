/*
695. Max Area of Island

You are given a matrix grid where grid[i] is 
either a 0 (representing water) or 1 (representing land).

An island is defined as a group of 1's connected
 horizontally or vertically. You may assume all four
  edges of the grid are surrounded by water.

The area of an island is defined as the number 
of cells within the island.

Return the maximum area of an island in grid.
 If no island exists, return 0.

Example 1:
Input: grid = [
  [0,1,1,0,1],
  [1,0,1,0,1],
  [0,1,1,0,1],
  [0,1,0,0,1]
]

Output: 6
Explanation: 1's cannot be connected diagonally,
 so the maximum area of the island is 6.

Constraints:

1 <= grid.length, grid[i].length <= 50

*/
/*
This function calculates the maximum area of an island in a 2D grid where:

1 represents land

0 represents water
Islands are connected vertically/horizontally (not diagonally).

Uses Depth-First Search (DFS) to explore islands:

Directions Array: Defines 4 possible movements (up, down, left, right).

DFS Helper Function:
Returns 0 if out of bounds or on water.
Marks visited cells as 0 to avoid revisiting.
Recursively checks all 4 directions and sums the area.

Grid Traversal:
Iterates through every cell.
Calls dfs() on land cells and updates the maximum area.

Time Complexity
O(ROWS × COLS)
Every cell is visited exactly once.
Each DFS call marks cells as visited (0), preventing redundant checks.

Space Complexity
O(ROWS × COLS) in the worst case
Caused by the recursion stack depth when the entire
 grid is a single large island (e.g., all 1s).

In practice, it’s often closer to O(max(ROWS, COLS)) for typical islands.

*/
var maxAreaOfIsland = function (grid) {
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const ROWS = grid.length, COLS = grid[0].length;
    const dfs = (r, c) => {
        if (r < 0 || c < 0 || r >= ROWS ||
            c >= COLS || grid[r][c] == 0) {
            return 0;
        }
        grid[r][c] = 0;
        let res = 1;
        for (const [dr, dc] of directions) {
            res += dfs(r + dr, c + dc);
        }
        return res;
    };
    let area = 0;
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            area = Math.max(area, dfs(r, c));
        }
    }
    return area;
};

let grid = [
    [0, 1, 1, 0, 1],
    [1, 0, 1, 0, 1],
    [0, 1, 1, 0, 1],
    [0, 1, 0, 0, 1]
];

console.log(maxAreaOfIsland(grid));
