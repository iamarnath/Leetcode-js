package DynamicP2D;
/*
 * 1289. Minimum Falling Path Sum II
 * Given an n x n integer matrix grid, return the
 *  minimum sum of a falling path with non-zero shifts.

A falling path with non-zero shifts is a choice of 
exactly one element from each row of grid such that
 no two elements chosen in adjacent rows are in the same column.

 

Example 1:


Input: grid = [[1,2,3],[4,5,6],[7,8,9]]
Output: 13
Explanation: 
The possible falling paths are:
[1,5,9], [1,5,7], [1,6,7], [1,6,8],
[2,4,8], [2,4,9], [2,6,7], [2,6,8],
[3,4,8], [3,4,9], [3,5,7], [3,5,9]
The falling path with the smallest sum is [1,5,7], so the answer is 13.
Example 2:

Input: grid = [[7]]
Output: 7
 

Constraints:

n == grid.length == grid[i].length
1 <= n <= 200
-99 <= grid[i][j] <= 99
 * 
*/

/*
 * Time and Space Complexity
Time Complexity
Let 
n be the size of the grid.

For each of the 
n×n entries in the memoization table, you can recurse to 

n−1 other columns.

Total unique solve(row, col) calls: 

n×n

Each call iterates over 

n−1 next columns.

Time Complexity: 
O(n ^3)

Space Complexity
Memoization table: 
O(n^2)

Recursion call stack: 

O(n)

Overall space complexity: 
O(n^2)

Summary Table
Aspect	Description
What it Does	Min falling path sum (no same col)
Time Complexity	  O(n ^3)
Space Complexity	O(n^2)
 * 
*/
import java.util.Arrays;
// using recursion and memoization
/* 
public class MinimumFallingPathSumII1289 {
    int n;
    int[][] t = new int[201][201]; // Memoization table

    public int solve(int row, int col, int[][] grid) {
        //System.out.println("Entering solve: row=" + row + ", col=" + col);
        // row may go out of bound.
        //stop at last row.select the value from last row and col is passed from
        // main function
        if (row == n - 1) {
            System.out.println("Base case reached at (" + row + ", " + col + "), value: " + grid[row][col]);
            return grid[row][col];
        }
        if (t[row][col] != -1) {
            System.out.println("Returning memoized value at (" + row + ", " + col + "): " + t[row][col]);
            return t[row][col];
        }

        int ans = Integer.MAX_VALUE;
        // search from next column.it will start from 0 and go till n
        //note - do not use the col which is alraedy passed from top
        for (int nextCol = 0; nextCol < n; nextCol++) {
            if (nextCol != col) { // Can't pick the same column as previous
               // System.out.println("Trying move from (" + row + ", " + col + ") to (" + (row + 1) + ", " + nextCol + ")");
                ans = Math.min(ans, solve(row + 1, nextCol, grid));
            }
        }
        //current element is  grid[row][col]
        // ans came from below rows not the current ones
        // so need to add current row value with ans
        t[row][col] = grid[row][col] + ans;
        System.out.println("Computed t[" + row + "][" + col + "] = " + t[row][col]);
        return t[row][col];
    }

    public int minFallingPathSum(int[][] grid) {
        n = grid.length;
        //The Outer Loop:
//for (int i = 0; i < t.length; i++)
//This loops through each row of the 2D array t.
//t.length is the number of rows (201).
//Arrays.fill:
//Arrays.fill(t[i], -1);
//This sets every element in the current row (t[i]) to -1.
//This is a fast way to initialize or reset an entire row in a 2D array.
//Each row in t is processed one after the other, but Arrays.fill operates on the entire row at once, so the loop is only needed for the rows—not every individual element.

        for (int i = 0; i < t.length; i++) {
            Arrays.fill(t[i], -1); // Initialize memoization with -1
        }
        int result = Integer.MAX_VALUE;
        for (int col = 0; col < n; col++) {
            System.out.println("Starting at top row, column: " + col);
            result = Math.min(result, solve(0, col, grid));
            System.out.println("Current result after column " + col + ": " + result);
        }
        System.out.println("Final result: " + result);
        return result;
    }

    public static void main(String[] args) {
        int[][] grid = {{1,2,3},{4,5,6},{7,8,9}};
        MinimumFallingPathSumII1289 sol = new MinimumFallingPathSumII1289();
        int result =  sol.minFallingPathSum(grid);
        System.out.println("Minimum Falling Path Sum: " + result);
    }
}
*/

public class MinimumFallingPathSumII1289 {
    // using bottom up approach 2
    /*
     * public int minFallingPathSum(int[][] grid) {
     * int n = grid.length;
     * int[][] t = new int[n][n];
     * // Each row in t is processed one after the other, but Arrays.fill operates
     * on
     * // the entire row at once, so
     * // the loop is only needed for the rows—not every individual element.
     * for (int[] row : t) {
     * Arrays.fill(row, Integer.MAX_VALUE);
     * }
     * // in the last row,we will have values of last row only
     * for (int col = 0; col < n; col++) {
     * t[n - 1][col] = grid[n - 1][col];
     * }
     * for (int row = n - 2; row >= 0; row--) {
     * for (int col = 0; col < n; col++) {
     * int ans = Integer.MAX_VALUE;
     * for (int nextCol = 0; nextCol < n; nextCol++) {
     * if (nextCol != col) {
     * ans = Math.min(ans, t[row + 1][nextCol]);
     * }
     * }
     * t[row][col] = grid[row][col] + ans;
     * }
     * }
     * int result = Integer.MAX_VALUE;
     * for (int col = 0; col < n; col++) {
     * result = Math.min(result, t[0][col]);
     * }
     * return result;
     * }
     */
    /*
     * //approach 3
     * 
     * public int minFallingPathSum(int[][] grid) {
     * int n = grid.length;
     * int[][] t = new int[n][n];
     * // Each row in t is processed one after the other, but Arrays.fill operates
     * on
     * // the entire row at once, so
     * // the loop is only needed for the rows—not every individual element.
     * for (int[] row : t) {
     * Arrays.fill(row, Integer.MAX_VALUE);
     * }
     * int nextMin1Col = -1;
     * int nextMin2Col = -1;
     * for (int col = 0; col < n; col++) {
     * t[n - 1][col] = grid[n - 1][col];
     * if (nextMin1Col == -1 || t[n - 1][col] <= t[n - 1][nextMin1Col]) {
     * nextMin2Col = nextMin1Col;
     * nextMin1Col = col;
     * } else if (nextMin2Col == -1 || t[n - 1][col] <= t[n - 1][nextMin2Col]) {
     * nextMin2Col = col;
     * }
     * }
     * for (int row = n - 2; row >= 0; row--) {
     * int min1Col = -1;
     * int min2Col = -1;
     * for (int col = 0; col < n; col++) {
     * // we can't choose same column in next row
     * if (col != nextMin1Col) {
     * t[row][col] = grid[row][col] + t[row + 1][nextMin1Col];
     * } else {
     * t[row][col] = grid[row][col] + t[row + 1][nextMin2Col];
     * }
     * 
     * if (min1Col == -1 || t[row][col] <= t[row][min1Col]) {
     * min2Col = min1Col;
     * min1Col = col;
     * } else if (min2Col == -1 || t[row][col] <= t[row][min2Col]) {
     * min2Col = col;
     * }
     * 
     * }
     * nextMin1Col = min1Col;
     * nextMin2Col = min2Col;
     * }
     * int result = Integer.MAX_VALUE;
     * for (int col = 0; col < n; col++) {
     * result = Math.min(result, t[0][col]);
     * }
     * return result;
     * }
     */
    public int minFallingPathSum(int[][] grid) {
        int n = grid.length;
        int nextMin1Col = -1;
        int nextMin2Col = -1;
        int nextMin1Val = -1;
        int nextMin2Val = -1;
        // considering only last row in this loop.
        for (int col = 0; col < n; col++) {
            if (nextMin1Col == -1 || grid[n - 1][col] <= nextMin1Val) {
                nextMin2Col = nextMin1Col;
                nextMin2Val = nextMin1Val;

                nextMin1Col = col;
                nextMin1Val = grid[n - 1][col];
            } else if (nextMin2Col == -1 || grid[n - 1][col] <= nextMin2Val) {
                nextMin2Col = col;
                nextMin2Val = grid[n - 1][col];
            }
        }
        for (int row = n - 2; row >= 0; row--) {
            int min1Col = -1;
            int min2Col = -1;
            
            int min1Val = -1;
            int min2Val = -1;

            for (int col = 0; col < n; col++) {
                int ans;
                if(col != nextMin1Col){
                    ans = grid[row][col] + nextMin1Val;
                }
                else{
                    ans = grid[row][col] + nextMin2Val;
                }
                if(min1Col == -1 || ans <= min1Val){
                    min2Col = min1Col;
                    min2Val = min1Val;

                    min1Col = col;
                    min1Val = ans;
                }
                else if(min2Col == -1 || ans <= min2Val){
                    min2Col = col;
                    min2Val = ans;
                }
            }
            nextMin1Col = min1Col;
            nextMin1Val = min1Val;

            nextMin2Col = min2Col;
            nextMin2Val = min2Val;
        }
        return nextMin1Val;
    }

    public static void main(String[] args) {
        int[][] grid = { { 1, 2, 3 }, { 4, 5, 6 }, { 7, 8, 9 } };
        MinimumFallingPathSumII1289 sol = new MinimumFallingPathSumII1289();
        int result = sol.minFallingPathSum(grid);
        System.out.println("Minimum Falling Path Sum: " + result);
    }
}