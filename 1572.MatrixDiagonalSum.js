/*
1572. Matrix Diagonal Sum

Solution : https://leetcode.com/problems/matrix-diagonal-sum/solutions/5075472/optimised/

Description
Given a square matrix mat, return the sum of the matrix diagonals.

Only include the sum of all the elements on the primary diagonal and all the elements on the secondary diagonal that are not part of the primary diagonal.

 

Example 1:



Input: mat = [[1,2,3],
              [4,5,6],
              [7,8,9]]
Output: 25
Explanation: Diagonals sum: 1 + 5 + 9 + 3 + 7 = 25
Notice that element mat[1][1] = 5 is counted only once.
Example 2:

Input: mat = [[1,1,1,1],
              [1,1,1,1],
              [1,1,1,1],
              [1,1,1,1]]
Output: 8
Example 3:

Input: mat = [[5]]
Output: 5
 

Constraints:

n == mat.length == mat[i].length
1 <= n <= 100
1 <= mat[i][j] <= 100

*/
/*
[[a00,a01,a02],
[a10,a11,a12], => a00+a11+a22+a20+a02
[a20,a21,a22]]

[[a00,a01,a02,a03],
[a10,a11,a12,a13],
[a20,a21,a22,a23]   =>a00+a11+a22+a33 +a30+a21+a12+a03
[a30,a31,a32,a33]]

*/
/*
The  code traverses each row only once, and within each row, it accesses two elements directly by their index, which is an (O(1)) operation. Since there are n rows in a square matrix with size (n \times n), the overall time complexity of the code is (O(n)) where (n) is the number of rows (and also the number of columns) in the matrix.
The code uses a fixed number of variables (ans, n, i, j, row). It does not depend on the size of the input matrix, therefore the space complexity is (O(1)), that is, constant space complexity.
*/
var diagonalSum = function (mat) {
    let sum = 0;
    let matrixSize = mat.length;
    for (let row = 0; row < matrixSize; row++) {
        const col = matrixSize - 1 - row;
        sum += mat[row][row] + (row === col ? 0 : mat[row][col]);
    }
    return sum;
};

let mat = [[1,2,3],
              [4,5,6],
              [7,8,9]];
    mat = [[1,1,1,1],
    [1,1,1,1],
    [1,1,1,1],
    [1,1,1,1]]

    mat = [[5]]

console.log(diagonalSum(mat))