/*
48. Rotate Image
Given a square n x n matrix of integers matrix,
 rotate it by 90 degrees clockwise.

You must rotate the matrix in-place.
 Do not allocate another 2D matrix and do the rotation.

Example 1:
Input: matrix = [
  [1,2],
  [3,4]
]

Output: [
  [3,1],
  [4,2]
]
Example 2:

Input: matrix = [
  [1,2,3],
  [4,5,6],
  [7,8,9]
]

Output: [
  [7,4,1],
  [8,5,2],
  [9,6,3]
]
Constraints:

n == matrix.length == matrix[i].length
1 <= n <= 20
-1000 <= matrix[i][j] <= 1000

*/

/*
1. Transpose the Matrix
What is Transposing?
Swapping rows with columns. For every element at (i, j), swap it with (j, i).

Why?
It prepares the matrix for rotation.

2. Flip Horizontally (for Clockwise Rotation)
How?
Reverse each row using matrix[i].reverse().

Why?
This completes the 90-degree clockwise rotation.

2. Alternative: Flip Vertically (for Anticlockwise Rotation)
How?
Swap the elements in each column from top to bottom.

Why?
This would complete a 90-degree anticlockwise rotation


*/

/*

Time Complexity:
Transposing the matrix uses two nested loops, each running up to 

N times, so it takes O(N ^ 2) time.

Reversing each row also takes 
O(N ^ 2) time in total, as each row of length 

N is reversed and there are 

N rows.

Total time complexity: 

O(N ^ 2).

Space Complexity:

The algorithm modifies the matrix in-place and does not
 use any additional data structures that scale with input size.

Space complexity: O(1) (in-place)

*/
function rotate(matrix) {
    const N = matrix.length;
    // Step 1: Transpose the matrix
    /*
    The outer loop iterates through each row.

    The inner loop starts at j = i to avoid swapping elements
     twice or swapping diagonal elements.

    Each iteration swaps matrix[i][j] with matrix[j][i],
     effectively flipping the matrix over
      its main diagonal (transposing it).

    After this, all rows become columns and vice versa.

    */
    for(let i=0;i<N;i++){
        for(let j=i;j<N;j++){
            // Swap matrix[i][j] and matrix[j][i]
            [matrix[i][j],matrix[j][i]] = [matrix[j][i],matrix[i][j]];
        }   
    }
    console.log("before matrix==",matrix);
    // Step 2: Reverse each row (flip horizontally for clockwise rotation)
    /*
    Iterates through each row.

    Uses the built-in reverse() method to reverse the
     elements of each row, flipping the matrix horizontally.

    This completes the 90-degree clockwise rotation.
    */
    for(let i=0;i<N;i++){

        matrix[i].reverse();
    }
        console.log("after matrix==",matrix);

        /*
    // Step 2 alternative: Reverse each column (flip vertically for anticlockwise rotation)
    //This loop iterates over each column of the matrix.
    for (let col = 0; col < N; col++) {
        let row = 0;
        //row is initialized to 0, starting from the top of the column.

        //mid is the halfway point of the matrix. We only need to swap
        //  until the middle to avoid undoing swaps.
        let mid = Math.floor(N / 2);
        //This loop runs while row is less than mid, 
        // so each swap only happens once per pair.
        while (row < mid) {
        //This line swaps the element at the top (row) of
        //  the column with the corresponding element at the bottom (N - row - 1).
            [matrix[row][col], matrix[N - row - 1][col]] =
             [matrix[N - row - 1][col], matrix[row][col]];
            // Moves to the next pair in the column.
            row++;
        }
    }
    */
}

let matrix = [
  [1,2,3],
  [4,5,6],
  [7,8,9]
];

let res = rotate(matrix);

console.log("res==",res);