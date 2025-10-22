/*
221. Maximal Square
Given an m x n binary matrix filled with 0's and 1's, find the largest square containing only 1's and return its area.
Example 1:


Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
Output: 4
Example 2:


Input: matrix = [["0","1"],["1","0"]]
Output: 1
Example 3:

Input: matrix = [["0"]]
Output: 0
 

Constraints:

m == matrix.length
n == matrix[i].length
1 <= m, n <= 300
matrix[i][j] is '0' or '1'.

*/

var maximalSquare = function(matrix) {
    let rows = matrix.length;
    if(rows === 0) return 0;
    let cols = matrix[0].length;
    //The dp[i][j] stores the largest square side length ending at cell (i, j).
    let dp =[];
    //Loops through all rows and cols.
    //Initializes a 2D DP table with the same dimensions as the input matrix.
    //Initially, every cell is set to 0.
    for(let i=0;i<rows;i++){
        dp[i]=[];
        for(let j=0;j<cols;j++){
            dp[i][j] = 0;
        }
    }
    let maxSide =0;
    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            //If the current cell contains '1',
            //  then it may contribute to forming a square.
            if(matrix[i][j] === '1'){
                //If the current cell is in the first row (i=0) or 
                // the first column (j=0), the largest square
                //  ending at (i, j) can only be of side 1.
                //So assign dp[i][j] = 1.
                if(i ===0 || j ===0){
                    dp[i][j] = 1;
                }
                else{
                    //For other cells (i, j), the side length 
                    // of the largest square ending here is:
// 1 + min(top, left, top-left)
// dp[i-1][j] → above cell
// dp[i][j-1] → left cell
// dp[i-1][j-1] → top-left diagonal cell
// This ensures that if a square can expand, it only
//  expands as much as its smallest neighboring square.

                    dp[i][j] = 1+
                            Math.min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1]);
                }
                maxSide = Math.max(maxSide,dp[i][j]);
            }
        }
    }
    //Updates the maximum square side length if the current square is larger.
    return maxSide * maxSide;
};

let matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]];
let res = maximalSquare(matrix);
console.log("maximalSquare==",res);