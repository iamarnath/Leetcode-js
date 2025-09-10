/*
54. Spiral Matrix

Given an m x n matrix of integers matrix,
 return a list of all elements within the matrix in spiral order.

Example 1:
Input: matrix = [[1,2],[3,4]]

Output: [1,2,4,3]
Example 2:
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]

Output: [1,2,3,6,9,8,7,4,5]
Example 3:

Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]

Output: [1,2,3,4,8,12,11,10,9,5,6,7]
Constraints:

1 <= matrix.length, matrix[i].length <= 10
-100 <= matrix[i][j] <= 100

*/
/*
Direction	    Action	                                       Boundary Updated
Left to Right	Traverse top row left->right	                 top++
Top to Bottom	Traverse right column top->bottom	             right--
Right to Left	Traverse bottom row right->left (if needed)	      bottom--
Bottom to Top	Traverse left column bottom->top (if needed)	  left++

Boundary Variables:
Four variables (top, bottom, left, right) define the current 
boundaries of the untraversed part of the matrix.

top: the current topmost row index

bottom: the current bottommost row index

left: the current leftmost column index

right: the current rightmost column index

Traversal Logic:
The function uses a loop to traverse the matrix in 
four directions, shrinking the boundaries after each pass:

Left to Right: Traverse the top row from the left
 boundary to the right boundary, then move the top boundary down.

Top to Bottom: Traverse the rightmost column 
from the new top to the bottom, then move the
 right boundary left.

Right to Left: If there are still rows left,
 traverse the bottom row from the new right to the left,
  then move the bottom boundary up.

Bottom to Top: If there are still columns left,
 traverse the leftmost column from the new bottom 
 to the top, then move the left boundary right.

This process repeats, peeling off the outer
 "layer" of the matrix each time, until all
  elements are traversed.

Key Points:

The loop continues as long as the top boundary
 is less than or equal to bottom and left is 
 less than or equal to right.

After each direction, the corresponding boundary 
is adjusted inward to avoid revisiting elements.

This approach works for both square and rectangular
 matrices, and for matrices of any size

*/
function spiralOrder(matrix) {
    if (matrix.length == 0) return [];
    const m = matrix.length;
    const n = matrix[0].length;
    let result = [];
    let top = 0, down = m - 1, left = 0, right = n - 1;
    let id = 0;
    // id:
    // 0 -> left to right
    // 1 -> top to down
    // 2 -> right to left
    // 3 -> down to top
    while (top <= down && left <= right) {
        if (id === 0) {
            //left to right
            //constant row (top)
            for (let i = left; i <= right; i++) {
                result.push(matrix[top][i])
            }
            top++;
        }
        // top to down
        //constant : column(right)
        else if (id === 1) {
            for (let i = top; i <= down; i++) {
                result.push(matrix[i][right])
            }
            right--;
        }
        //right to left
        //constant : row(down)
        else if (id === 2) {
            for (let i = right; i >= left; i--) {
                result.push(matrix[down][i])
            }
            down--;
        }
        //down to top
        //constant : column(left)
        else if (id === 3) {
            for (let i = down; i >= top; i--) {
                result.push(matrix[i][left])
            }
            left++;
        }
        id++;
        if (id == 4) {
            id = 0;
        }
    }
    return result;
}

let matrix = [[1,2],[3,4]];
console.log("spiralOrder==",spiralOrder(matrix));