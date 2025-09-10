/*
 * Given an n x n array of integers matrix, return
 *  the minimum sum of any falling path through matrix.

A falling path starts at any element in the first
 row and chooses the element in the next row that is either
  directly below or diagonally left/right. Specifically,
   the next element from position (row, col) will be
    (row + 1, col - 1), (row + 1, col), or (row + 1, col + 1).

Example 1:


Input: matrix = [[2,1,3],[6,5,4],[7,8,9]]
Output: 13
Explanation: There are two falling paths with a minimum sum as shown.
Example 2:


Input: matrix = [[-19,57],[-40,-5]]
Output: -59
Explanation: The falling path with a minimum sum is shown.
 

Constraints:

n == matrix.length == matrix[i].length
1 <= n <= 100
-100 <= matrix[i][j] <= 100
 * 
*/
package DynamicP2D;

import java.util.Arrays;

public class MinimumFallingPathSum931 {

    // public int minFallingPathSum(int[][] matrix) {
    // int n = matrix.length;
    // int[] prev = new int[n];

    // // Initialize the first row of prev array
    // for (int col = 0; col < n; col++) {
    // prev[col] = matrix[0][col];
    // }

    // // Iterate over the remaining rows
    // for (int row = 1; row < n; row++) {
    // int[] curr = new int[n];
    // for (int col = 0; col < n; col++) {
    // curr[col] = matrix[row][col]
    // + Math.min(Math.min(prev[Math.max(0, col - 1)], prev[col]), prev[Math.min(n -
    // 1, col + 1)]);
    // }
    // prev = curr;
    // }

    // // Return the minimum element in the last row of the dp array
    // int minPathSum = Integer.MAX_VALUE;
    // for (int value : prev) {
    // minPathSum = Math.min(minPathSum, value);
    // }

    // return minPathSum;
    // }

    /*
     * for recursive and memoization solution
     * 4. Time Complexity Analysis
     * In the ideal case (if memo size matches matrix size),
     * Each (row, col) is computed once, and each computation does at most 3
     * recursive calls.
     * 
     * Time complexity:
     * O(m × n) where m = rows, n = columns
     * → For square matrix: O(n²)
     * 
     * In your hardcoded 101x101 case on big matrices,
     * memoization fails → exponential blow-up O(3^m) (worst case).
     * 
     * 5. Space Complexity
     * With correct memo size:
     * 
     * Memo table: O(m × n)
     * 
     * Recursive call stack: O(m) depth (one call per row)
     * 
     * Total = O(m × n)
     * 
     * With your hardcoded 101x101:
     * 
     * Memo uses constant space O(1)
     * 
     * Call stack: O(m)
     * 
     * But runtime suffers from recomputation.
     * 
     * ✅ Key takeaway:
     * 
     * The logic is fine, but the fixed 101×101 memo makes it useless for large
     * inputs.
     * 
     * Replace:
     * 
     * java
     * int[][] t = new int[101][101];
     * with:
     * 
     * java
     * int[][] t = new int[m][n];
     * … and you’ll get proper O(n²) performance without TLE.
     * 
     * If you want, I can rewrite this exact code with correct memo sizing and also
     * show how many function calls you save with proper memoization vs. your
     * current one.
     * Do you want me to do that?
     * 
     */
    // public int minFallingPathSum(int[][] matrix) {
    // //m = number of rows.

    // //n is set equal to m here, meaning you assume the matrix is n x n (square).

    // int m = matrix.length;
    // int n = m;// column
    // //t is the memoization array to store already computed results for MFS(row,
    // col).

    // // Hardcoding 101x101 means if your matrix is larger, you'll run into no
    // memoization for extra cells → huge recomputation → TLE.

    // // The correct approach would be:
    // // new int[m][n]; so it matches matrix size.

    // int[][] t = new int[101][101];
    // //-1 marks that the value for that (row, col) hasn’t been computed.
    // for (int[] row : t) {
    // Arrays.fill(row, -1);
    // }
    // //Holds the minimum falling path sum among all starting positions in row 0.
    // int result = Integer.MAX_VALUE;
    // //Loop over each possible starting column in the first row.

    // // Call MFS recursively to get the minimum falling path starting from (0,
    // col).

    // // Take the minimum across all these starting points.
    // for (int col = 0; col < n; col++) {
    // result = Math.min(result, MFS(matrix, 0, col, t));
    // }
    // return result;
    // }

    // private int MFS(int[][] A, int row, int col, int[][] t) {
    // //If we are on the last row, the minimum path sum from here is just the
    // cell’s value.
    // if (row == A.length - 1) {
    // return A[row][col];
    // }
    // if (t[row][col] != -1) {
    // return t[row][col];
    // }
    // int minSum = Integer.MAX_VALUE;
    // //Explore three possible moves from (row, col):

    // // shift = -1 → down-left
    // // shift = 0 → straight down
    // // shift = +1 → down-right
    // // Check bounds before moving.

    // // Recursively compute MFS for the next row and add the current cell value.

    // for (int shift = -1; shift <= 1; shift++) {
    // if (col + shift >= 0 && col + shift < A[row].length) {
    // minSum = Math.min(minSum, A[row][col] + MFS(A, row + 1, col + shift, t));
    // }
    // }
    // // if (col + shift >= 0 && col + shift < A[row].length) is shortcut for below
    // // conditions

    // // if(row+ 1< n && col-1 >=0){
    // //minSum = Math.min(minSum, A[row][col] + MFS(A, row + 1, col-1, t));
    // //}
    // //if(row+ 1< n ){
    // //minSum = Math.min(minSum, A[row][col] + MFS(A, row + 1, col, t));
    // //}

    // // if(row+ 1< n && col+1 <=n){
    // // minSum = Math.min(minSum, A[row][col] + MFS(A, row + 1, col+1, t));
    // // }
    // return t[row][col] = minSum;
    // }

    /*
     * Details for bottom up 2d matrix approach
     * If:
     * 
     * text
     * matrix = [
     * [2, 1, 3],
     * [6, 5, 4],
     * [7, 8, 9]
     * ]
     * Step 1: Initialize first row of t:
     * 
     * text
     * t = [
     * [2, 1, 3],
     * [0, 0, 0],
     * [0, 0, 0]
     * ]
     * Step 2: Compute row 1:
     * 
     * text
     * t[1][0] = 6 + min(2, MAX, 1) = 6 + 1 = 7
     * t[1][1] = 5 + min(1, 2, 3) = 5 + 1 = 6
     * t[1][2] = 4 + min(3, 1, MAX) = 4 + 1 = 5
     * Result after row 1:
     * 
     * text
     * t = [
     * [2, 1, 3],
     * [7, 6, 5],
     * [0, 0, 0]
     * ]
     * Step 3: Compute row 2:
     * 
     * text
     * t[2][0] = 7 + min(7, MAX, 6) = 7 + 6 = 13
     * t[2][1] = 8 + min(6, 7, 5) = 8 + 5 = 13
     * t[2][2] = 9 + min(5, 6, MAX) = 9 + 5 = 14
     * Final t:
     * 
     * text
     * [
     * [2, 1, 3],
     * [7, 6, 5],
     * [13, 13, 14]
     * ]
     * Answer: min(13, 13, 14) = 13
     * 
     * Time Complexity
     * We process each cell once, and for each cell we do O(1) work.
     * 
     * There are m * m cells in an m x m matrix.
     * 
     * Time complexity = O(m²)
     * 
     * Space Complexity
     * You are using an extra m x m DP array t, so:
     * 
     * Space complexity = O(m²)
     * 
     * 
     * 
     */
    // using 2d matrix and bottom up
    // public int minFallingPathSum(int[][] matrix) {
    // int m = matrix.length;
    // int[][] t = new int[m][m];
    // //Initialization step: The first row of t is identical to the first row of
    // the input matrix, since there is no previous step for the first row.
    // //(The falling path starts at the first row.)
    // for (int col = 0; col < m; col++) {
    // t[0][col] = matrix[0][col];
    // }
    // //This nested loop goes row by row (starting from the second row),
    // //column by column, to compute the minimum path sum for each position.
    // for (int row = 1; row < m; row++) {
    // for (int col = 0; col < m; col++) {
    // /*
    // * t[row-1][col-1] - out of bound when col=0
    // * t[row-1][col] - safe hai
    // * t[row-1][col+1] - out of bound when col=n-1
    // */
    // int a = Integer.MAX_VALUE;
    // int b = Integer.MAX_VALUE;
    // //If not at the first column (col - 1 >= 0), take value from top-left
    // diagonal.
    // if (col - 1 >= 0) {
    // a = t[row - 1][col - 1];
    // }
    // //If not at last column (col + 1 < m), take value from top-right diagonal.
    // if (col + 1 < m) {
    // b = t[row - 1][col + 1];
    // }
    // //The minimum falling path sum for the current cell =
    // // value in current matrix cell + minimum of:

    // // Top cell (t[row - 1][col])

    // // Top-left diagonal (a)

    // // Top-right diagonal (b)
    // t[row][col] = matrix[row][col] + Math.min(t[row - 1][col], Math.min(a, b));

    // }
    // }
    // //At the bottom row (t[m-1]), we have the min falling path sums ending at
    // each column.

    // //We take the minimum of them (the smallest path sum to reach the last row).
    // //.orElse(0) ensures the function returns 0 if somehow the row is empty
    // (though not possible here).
    // return Arrays.stream(t[m - 1]).min().orElse(0);
    // }

    /*
     * Time Complexity
     * We process each of the n × n cells exactly once.
     * O(n²) time.
     * 
     * Space Complexity
     * We use only two arrays of length n: prev and curr.
     * O(n) space (much better than O(n²) before).
     * 
     * ========
     * We want the minimum sum of any falling path in a square matrix A (n x n)
     * where from each cell (row, col) you can move to:
     * 
     * directly down (row+1, col)
     * down-left (row+1, col-1) (if col > 0)
     * down-right (row+1, col+1) (if col < n-1)
     * 
     * Here, we realize each cell only depends on the previous row,
     * so we maintain only:
     * 
     * prev[] → DP values for the previous row
     * 
     * curr[] → DP values for the current row
     * 
     * After each row, we replace prev with curr.
     * 
     * Example Walkthrough
Let:

text
A = [
  [2, 1, 3],
  [6, 5, 4],
  [7, 8, 9]
]
Initialization:

text
prev = [2, 1, 3]
Row 1 computation:

text
col 0 → 6 + min(prev[0], prev[0], prev[1]) = 6 + min(2,2,1) = 6+1 = 7
col 1 → 5 + min(prev[0], prev[1], prev[2]) = 5 + min(2,1,3) = 5+1 = 6
col 2 → 4 + min(prev[1], prev[2], prev[2]) = 4 + min(1,3,3) = 4+1 = 5

curr = [7, 6, 5]
prev = curr
Row 2 computation:

text
col 0 → 7 + min(prev[0], prev[0], prev[1]) = 7 + min(7,7,6) = 7+6 = 13
col 1 → 8 + min(prev[0], prev[1], prev[2]) = 8 + min(7,6,5) = 8+5 = 13
col 2 → 9 + min(prev[1], prev[2], prev[2]) = 9 + min(6,5,5) = 9+5 = 14

curr = [13, 13, 14]
prev = curr
Final step:

text
minPathSum = min(13, 13, 14) = 13
✅ Output: 13
     */
    public int minFallingPathSum(int[][] matrix) {
        int n = matrix.length;
        int[] prev = new int[n];
        for (int col = 0; col < n; col++) {
            prev[col] = matrix[0][col];
        }
        for (int row = 1; row < n; row++) {
            int[] curr = new int[n];
            for (int col = 0; col < n; col++) {
                int up = prev[col];
                // Value from top-left diagonal (or same column if col-1 < 0)
                int leftDiagonal = prev[Math.max(0, col - 1)];
                // Value from top-right diagonal (or same column if col+1 >= n)
                int rightDiagonal = prev[Math.min(n - 1, col + 1)];
                // Find minimum of the three possible paths
                int minPrev = Math.min(leftDiagonal, Math.min(up, rightDiagonal));
                // Add current cell's value
                curr[col] = matrix[row][col] + minPrev;
            }
            prev = curr;
        }
        // Return the minimum element in the last row of the dp array
        int minSumPath = Integer.MAX_VALUE;
        for (int value : prev) {
            minSumPath = Math.min(minSumPath, value);
        }
        return minSumPath;
    }

    public static void main(String[] args) {
        int[][] grid = { { 2, 1, 3 }, { 6, 5, 4 }, { 7, 8, 9 } };
        MinimumFallingPathSum931 sol = new MinimumFallingPathSum931();
        int result = sol.minFallingPathSum(grid);
        System.out.println("Minimum Falling Path Sum 1: " + result);
    }

}
