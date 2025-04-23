/*
3127. Make a Square with the Same Color

Solution - https://leetcode.com/problems/make-a-square-with-the-same-color/solutions/5161641/optimised/

Description
You are given a 2D matrix grid of size 3 x 3 consisting only of characters 'B' and 'W'. Character 'W' represents the white color, and character 'B' represents the black color.

Your task is to change the color of at most one cell so that the matrix has a 2 x 2 square where all cells are of the same color.

Return true if it is possible to create a 2 x 2 square of the same color, otherwise, return false.

Example 1:

Input: grid = [["B","W","B"],["B","W","W"],["B","W","B"]]

Output: true

Explanation:

It can be done by changing the color of the grid[0][2].

Example 2:

Input: grid = [["B","W","B"],["W","B","W"],["B","W","B"]]

Output: false

Explanation:

It cannot be done by changing at most one cell.

Example 3:

Input: grid = [["B","W","B"],["B","W","W"],["B","W","W"]]

Output: true

Explanation:

The grid already contains a 2 x 2 square of the same color.

Constraints:

grid.length == 3
grid[i].length == 3
grid[i][j] is either 'W' or 'B'.

*/
/*
Approach

The approach used in this code is as follows:
The function iterates through the first 2 rows and the first 2 columns of the grid.
For each 2x2 sub-grid, it counts the number of 'W' (white) and 'B' (black) characters.
If the maximum of the white and black counts is greater than or equal to 3, it means that a square can be formed, and the function returns true.
If the function completes the loop without finding a suitable 2x2 sub-grid, it returns false.

Time Complexity

The time complexity of this solution is O(1), as the function always iterates through a fixed-size 2x2 sub-grid, regardless of the size of the input grid.

Space Complexity

The space complexity of this solution is O(1), as the function does not use any additional data structures that scale with the size of the input grid.
The only variables used are w and b, which store the counts of white and black characters in the current 2x2 sub-grid. These variables are constant and do not depend on the size of the input grid.
*/
var canMakeSquare = function(grid) {
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            let w = (grid[i][j] === 'W') + (grid[i][j + 1] === 'W') + (grid[i + 1][j] === 'W') + (grid[i + 1][j + 1] === 'W');
            let b = (grid[i][j] === 'B') + (grid[i][j + 1] === 'B') + (grid[i + 1][j] === 'B') + (grid[i + 1][j + 1] === 'B');
            console.log(w,b)
            if (Math.max(w, b) >=3) {
                return true;
            }
        }
    }
    return false;
};

 let grid = [["B","W","B"],["B","W","W"],["B","W","B"]];
 grid = [["B","W","B"],["B","W","W"],["B","W","W"]];
 grid = [["B","W","B"],["W","B","W"],["B","W","B"]]

console.log(canMakeSquare(grid));