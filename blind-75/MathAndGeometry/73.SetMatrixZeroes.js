/*
73. Set Matrix Zeroes
Given an m x n matrix of integers matrix, if an element is 0, set its entire row and column to 0's.

You must update the matrix in-place.

Follow up: Could you solve it using O(1) space?

Example 1:
Input: matrix = [
  [0,1],
  [1,0]
]

Output: [
  [0,0],
  [0,0]
]
Example 2:

Input: matrix = [
  [1,2,3],
  [4,0,5],
  [6,7,8]
]

Output: [
  [1,0,3],
  [0,0,0],
  [6,0,8]
]
Constraints:

1 <= matrix.length, matrix[0].length <= 100
-2^31 <= matrix[i][j] <= (2^31) - 1
*/
/*
Time and Space Complexity
Time Complexity
The function makes three passes over the matrix:

First pass: O(mn) to mark rows/columns.

Second pass: O(mn) to set zeroes based on markers.

Third pass: O(m) for the first column and O(n) for the first row.

Total: O(mn).

Space Complexity
Only a constant amount of extra space is used
 (for the two boolean flags and a few variables).

No extra arrays or sets are used for marking (the matrix itself is used).

Total: O(1)

*/
var setZeroes = function (matrix) {
    let firstRow = false, firstCol = false;
    //m and n are the dimensions of the matrix.
    const m = matrix.length;
    const n = matrix[0].length;
    // Set markers in first row and first column
    /*
    This double loop scans the matrix.

If a zero is found:

Set firstRow or firstCol if the zero is
 in the first row or column.

Mark the entire row and column for zeroing by
 setting the first element of that row and column to 0.

The first row and column act as markers for which
 rows and columns need to be zeroed
    */
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] == 0) {
                if (i == 0) firstRow = true;
                if (j == 0) firstCol = true;
                matrix[0][j] = 0;
                matrix[i][0] = 0;
            }
        }
    }
    // Replace inner matrix
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            //For all cells (excluding the first row and column),
            //  if their row or column is marked (i.e., the first cell
            //  in their row or column is 0), set the cell to 0.
            if (matrix[i][0] === 0 || matrix[0][j] === 0) {
                matrix[i][j] = 0;
            }
        }
    }
    // Last remaining checks for first row
    //If the first row or column originally had a zero,
    //  set the entire first row or column to zero.


    if (firstRow) {
        for (let j = 0; j < n; j++) {
            matrix[0][j] = 0;
        }
    }
    if (firstCol) {
        for (let i = 0; i < m; i++) {
            matrix[i][0] = 0;
        }
    }

    console.log("matrix==", matrix)


};

// let matrix = [
//   [1,2,3],
//   [4,0,5],
//   [6,7,8]
// ];
let matrix = [
    [0, 1],
    [1, 0]
]
let res = setZeroes(matrix);

console.log("res==", res)