/*
62. Unique Paths

Description
There is an m x n grid where you are allowed to move
 either down or to the right at any point in time.

Given the two integers m and n, return the number of
 possible unique paths that can be taken from the
  top-left corner of the grid (grid[0][0]) to the
   bottom-right corner (grid[m - 1][n - 1]).

You may assume the output will fit in a 32-bit integer.

Example 1:

Input: m = 3, n = 6

Output: 21
Example 2:

Input: m = 3, n = 3

Output: 6

*/
/*

const t = Array.from({ length: m }, () => Array(n).fill(-1));
Creates a 2D array t of size m x n initialized with -1
 to store intermediate results (memoization).


function solve(i, j) {
Defines a recursive helper function solve that 
returns the number of unique paths from cell (i, j) to the destination.


if (i === m - 1 && j === n - 1) {
    return 1;
}
Base case: If the current cell is the bottom-right corner,
 there is exactly one path (stay there).


if (i < 0 || i >= m || j < 0 || j >= n) {
    return 0;
}
If the current cell is out of bounds, there are no valid paths.

javascript
if (t[i][j] !== -1) {
    return t[i][j];
}
If the number of paths from (i, j) has already been computed, return the cached value to avoid redundant calculations.

javascript
const right = solve(i, j + 1);
const down = solve(i + 1, j);
Recursively calculate the number of paths by moving right (i, j+1) and down (i+1, j).

javascript
t[i][j] = right + down;
return t[i][j];
Store the sum of paths from right and down moves in t[i][j] and return it.

javascript
return solve(0, 0);
Starts the recursion from the top-left corner (0, 0).

Time Complexity	

O(m×n)
Space Complexity	
O(m×n)
Each cell (i, j) is computed once and stored in the memo table.

The recursion stack depth can go up to m + n in the worst case.


*/
function uniquePaths(m, n) {
    // Initialize memoization array with -1
    const t= Array.from({length:m},()=>Array(n).fill(-1));
    function solve(i,j){
    // If reached bottom-right corner, found one path
        if(i==m-1 && j==n-1){
            return 1;
        }
    // If out of grid bounds, no path
        if(i<0 || i>=m || j<0 || j>=n){
            return 0;
        }
    // If already computed, return cached value
        if(t[i][j] !== -1){
            return t[i][j];
        }
        // Move right and down recursively
        const right = solve(i,j+1);
        const down = solve(i+1,j);
        // Store result in memo table and return
        t[i][j] = right+down;
        return t[i][j];

    }
    return solve(0, 0);
}

function uniquePathsDP(m, n) {
    // Create a 2D array t with m rows and n columns, initialized to 0
    const t=Array.from({length:m},()=>Array(n).fill(0));
    // There is exactly 1 way to reach the starting cell [0][0]
    t[0][0] = 1;
     // Fill the first row: only one way to reach any cell 
     // in the first row (move right)
     for(let col=0;col<n;col++){
        t[0][col] = 1;
     }
      // Fill the first column: only one way
      //  to reach any cell in the first column (move down)
     for(let row=0;row<m;row++){
        t[row][0] = 1;
     }
     for(let i=1;i<m;i++){
        for(let j=1;j<n;j++){
            t[i][j] = t[i-1][j] + t[i][j-1];
        }
     }
    // The answer is the number of ways to reach the bottom-right cell
     return t[m-1][n-1];
}

let m = 3, n = 3;
console.log("rec and memo==",uniquePathsDP(m,n));