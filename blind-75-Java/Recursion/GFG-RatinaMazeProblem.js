/*
Rat in a Maze Problem - I

Consider a rat placed at position (0, 0) in 
an n x n square matrix mat[][]. The rat's goal is 
to reach the destination at position (n-1, n-1). 
The rat can move in four possible
 directions: 'U'(up), 'D'(down), 'L' (left), 'R' (right).

The matrix contains only two possible values:

0: A blocked cell through which the rat cannot travel.
1: A free cell that the rat can pass through.
Your task is to find all possible paths the rat can
 take to reach the destination, starting 
 from (0, 0) and ending at (n-1, n-1), under the 
 condition that the rat cannot revisit any cell 
 along the same path. Furthermore, the rat can only 
 move to adjacent cells that are within the bounds of 
 the matrix and not blocked.
If no path exists, return an empty list.

Note: Return the final result vector in lexicographically smallest order.

Examples:

Input: mat[][] = [[1, 0, 0, 0], [1, 1, 0, 1], [1, 1, 0, 0], [0, 1, 1, 1]]
Output: ["DDRDRR", "DRDDRR"]
Explanation: The rat can reach the destination 
at (3, 3) from (0, 0) by two paths - DRDDRR and DDRDRR,
 when printed in sorted order we get DDRDRR DRDDRR.
Input: mat[][] = [[1, 0], [1, 0]]
Output: []
Explanation: No path exists as the destination cell is blocked.
Input: mat = [[1, 1, 1], [1, 0, 1], [1, 1, 1]]
Output: ["DDRR", "RRDD"]
Explanation: The rat has two possible paths to reach the 
destination: 1. "DDRR" 2. "RRDD", These are returned in 
lexicographically sorted order.
Constraints:
2 ≤ mat.size() ≤ 5
0 ≤ mat[i][j] ≤ 1


*/
/*
How the Algorithm Works
isSafe(i, j, n):
Checks whether the given cell is within grid boundaries.

Backtracking with solve():

If the current cell is invalid or blocked, it abandons that path.

When it reaches the destination cell, adds the built path to the result.

Otherwise, marks the cell as visited (by making it 0), explores all directions (D, R, U, L), and then undoes the visit for backtracking.

The path is constructed as a string, appending the direction at each recursive step.

findPath():
Initializes the pathfinding from (0,0) and returns all valid paths by calling solve() recursively.

Key Concepts
This approach leverages backtracking: exploring all possible moves from a cell, recursing deeper upon valid moves, and backtracking (undoing the last step) if a dead end is reached.

The use of direction letters ("D", "R", "U", "L") records each step for a path.

The grid is restored (unmarked) after each search branch to allow other paths to use the cell in further searches

*/
/*
Time Complexity
Worst-case: 
O(3^(N^2))
For each cell in an 
N×N grid, the rat can try up to 4 directions (down, right, up, left) exceptfrom where it is coming.

This results in 3 possible moves from each cell, 
and if all cells are open, the number of recursive calls grows exponentially.

The time complexity is thus 

O(3^(N^2)).

Space complexity: 
O(N^2) 

This is mainly due to:

The recursion stack, which, in the worst case, can be up to 

O(N^2)  deep.

The result storage (for all possible paths).

Any auxiliary matrices or markers used to track visited paths also take 

O(N^2) space.

So, while the algorithm is elegant and solves the problem, it is not efficient for large mazes due to its exponential time complexity.

*/
function isSafe(i, j, n) {
    return i >= 0 && i < n && j >= 0 && j < n;
}
/*
Defines the function solve with parameters:
i, j: current cell's row and column indices.
m: the maze (2D array).
n: size of the maze (n×n).
temp: current path as a string.
result: array to store all valid paths
*/
function solve(i, j, m, n, temp, result) {
    //Checks if the current cell is out of bounds 
    // (isSafe(i, j, n)) or blocked (m[i][j] === 0).

//If true, this path is invalid, so exit (stop recursion here)
    if (!isSafe(i, j, n) || m[i][j] === 0) {
        return;
    }
    //If reached the bottom-right cell, 
    // add the current path (temp) to result and return
    if (i === n - 1 && j === n - 1) {
        result.push(temp);
        return;
    }
    //Mark as visited:
    //Temporarily mark the current cell as blocked 
    // (so recursion doesn't revisit it in this path)
    // Each call explores all paths starting from the next cell,
    // appending the corresponding direction letter to the path.
    m[i][j] = 0;
    //Calls solve recursively in four directions:
    // Move Down
    //Down: i+1, j and add 'D' to path
    solve(i + 1, j, m, n, temp + 'D', result);
    // Move Right
    //Right: i, j+1 and add 'R'
    solve(i, j + 1, m, n, temp + 'R', result);
    // Move Up
    //Up: i-1, j and add 'U'
    solve(i - 1, j, m, n, temp + 'U', result);
    // Move Left
    //Left: i, j-1 and add 'L'
    solve(i, j - 1, m, n, temp + 'L', result);
    //Unmark the current cell (reset to open) 
    // so it can be used in different
    //  paths during other recursive calls
    m[i][j] = 1;
}

function findPath(m, n) {
    const result = [];
    console.log("m ==",m);
    console.log("n ==",n);
    solve(0, 0, m, n, '', result);
    return result;
}

//const maze = [[1, 0, 0, 0], [1, 1, 0, 1], [1, 1, 0, 0], [0, 1, 1, 1]];
const maze = [[1, 1, 1], [1, 0, 1], [1, 1, 1]]
console.log(findPath(maze, maze.length));
