/*
329. Longest Increasing Path In a Matrix

Given an m x n integers matrix, return the length 
of the longest increasing path in matrix.

From each cell, you can either move in 
four directions: left, right, up, or down.
 You may not move diagonally or move outside
  the boundary (i.e., wrap-around is not allowed).

Example 1:

Input: matrix = [[9,9,4],[6,6,8],[2,1,1]]
Output: 4
Explanation: The longest increasing path is [1, 2, 6, 9].
Example 2:


Input: matrix = [[3,4,5],[3,2,6],[2,2,1]]
Output: 4
Explanation: The longest increasing path is [3, 4, 5, 6].
 Moving diagonally is not allowed.
Example 3:

Input: matrix = [[1]]
Output: 1

Constraints:

m == matrix.length
n == matrix[i].length
1 <= m, n <= 200
0 <= matrix[i][j] <= 231 - 1

*/
/*
The array const directions = [[-1,0],[1,0],[0,-1],[0,1];
 represents the four primary movement directions in a 2D grid:

[-1, 0]: Move up (decrease the row index)

[1, 0]: Move down (increase the row index)

[0, -1]: Move left (decrease the column index)

[0, 1]: Move right (increase the column index)

Array.from({length: ROWS}, ...)
This constructs a new array with ROWS elements.
Each element will be created by the function
 provided as the second argument.

() => Array(COLS).fill(-1)
For each row, this function creates an inner
 array of length COLS, where every element is initialized to -1.

Result:
The end result is a 2D array (dp) with ROWS rows
 and COLS columns, where every cell contains -1.

*/
/*
Key Components
directions:
[[−1,0],[1],[0,−1],[0,] represents movement in
 the four cardinal directions: up, down, left, and right.

dp:
A 2D memoization array (ROWS x COLS), 
initialized to -1, used to store the length of
 the longest increasing path starting from each cell.

dfs(r, c, prevVal):
A recursive function that:

Returns 0 if the current cell is out of 
bounds or its value is not greater than prevVal.

Returns the cached value if already computed (dp[r][c] !== -1).

Otherwise, for each direction, recursively
 computes the longest increasing path from
  the neighboring cell, only if the move is
   valid (the next cell is strictly greater).

Stores and returns the result in dp[r][c].

Main Loop:
Iterates over every cell in the matrix, computes 
the longest increasing path starting from that 
cell using dfs, and keeps track of the maximum found.

How It Works
For each cell, the code tries to move in all
 four directions to find increasing paths.

It uses memoization (dp) to avoid 
recomputing results for the same cell, greatly improving efficiency.

The result is the maximum path length found from any cell.

Time and Space Complexity
Time Complexity:

Each cell is visited once, and the result is memoized.

For each cell, up to 4 directions are checked.

Thus, the overall time complexity is O(ROWS × COLS),
 where ROWS and COLS are the matrix dimensions.

Space Complexity:

The dp table uses O(ROWS × COLS) space.

The recursion stack can go as deep as O(ROWS × COLS)
 in the worst case (if the path visits every cell once),
  but typically will be less due to memoization.


Aspect	                Value

Time Complexity	        O(ROWS × COLS)

Space Complexity	    O(ROWS × COLS)

*/
/*
Time and Space Complexity
Aspect	Complexity
Time	
O(M×N)
Every cell is visited once, and each DFS call only 
processes up to 4 directions. Memoization guarantees
 each cell is computed once.
Space
O(M×N)
The dp array of size 
ROWS×COLS used for memoization. The call stack for recursion is at most 

O(M+N) (path length in a worst-case increasing chain).
Where 
M= number of rows, 
N= number of columns in your matrix.
*/
var longestIncreasingPath = function (matrix) {
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    const ROWS = matrix.length, COLS = matrix[0].length;
    //Initializes a 2D array dp the same size as matrix, 
    // filled with -1 for memoization (to save and reuse 
    // previously computed results).
    let dp = Array.from({ length: ROWS }, () =>
        Array(COLS).fill(-1));
    //Helper function, dfs, performs depth-first search from 
    // cell (r, c), where prevVal is the value from the 
    // previous cell in the path.
    const dfs = (r, c, prevVal) => {
        //Checks boundaries. If (r, c) is out of bounds or
        //  if matrix[r][c] is not greater than prevVal, 
        // return 0 (cannot proceed).
        if (r < 0 || r >= ROWS || c < 0 ||
            c >= COLS || matrix[r][c] <= prevVal
        ) {
            return 0;
        }
        if (dp[r][c] !== -1) return dp[r][c];
        let res = 1;
        //For each direction, moves to the next cell.
        //  If the move is valid and leads to a longer
        //  increasing path, updates res.
        for (let d of directions) {
            res = Math.max(res, 1 + dfs(r + d[0], c + d[1], matrix[r][c]));
        }
        dp[r][c] = res;
        return dp[r][c];
    };
    let LIP = 0;
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            //Starts DFS from every cell in the matrix. 
            // Uses -Infinity as initial prevVal so the first cell is always valid.
            LIP = Math.max(LIP, dfs(r, c, -Infinity))
        }
    }
    return LIP;
}

//let matrix = [[9, 9, 4], [6, 6, 8], [2, 1, 1]];
//let matrix = [[3,4,5],[3,2,6],[2,2,1]];
let matrix = [[1]];

let res = longestIncreasingPath(matrix);
console.log("longestIncreasingPath--", res);