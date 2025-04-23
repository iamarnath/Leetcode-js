/*
2500. Delete Greatest Value in Each Row

Solution - https://leetcode.com/problems/delete-greatest-value-in-each-row/solutions/5211671/optimised/


Description
You are given an m x n matrix grid consisting of positive integers.

Perform the following operation until grid becomes empty:

Delete the element with the greatest value from each row. If multiple such elements exist, delete any of them.
Add the maximum of deleted elements to the answer.
Note that the number of columns decreases by one after each operation.

Return the answer after performing the operations described above.

Example 1:

Input: grid = [[1,2,4],[3,3,1]]
Output: 8
Explanation: The diagram above shows the removed values in each step.
- In the first operation, we remove 4 from the first row and 3 from the second row (notice that, there are two cells with value 3 and we can remove any of them). We add 4 to the answer.
- In the second operation, we remove 2 from the first row and 3 from the second row. We add 3 to the answer.
- In the third operation, we remove 1 from the first row and 1 from the second row. We add 1 to the answer.
The final answer = 4 + 3 + 1 = 8.
Example 2:

Input: grid = [[10]]
Output: 10
Explanation: The diagram above shows the removed values in each step.
- In the first operation, we remove 10 from the first row. We add 10 to the answer.
The final answer = 10.
 

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 50
1 <= grid[i][j] <= 100
*/

/*
Approach to deleteGreatestValue Function

The deleteGreatestValue function takes a 2D grid of integers as input and returns the sum of the greatest values in each column after removing the greatest value from each row. The approach involves the following steps:
Sort each row of the grid in ascending order using the sort method.
Iterate over each column of the grid.
For each column, find the greatest value by iterating over the rows and keeping track of the maximum value encountered.
Accumulate the greatest values of each column in the ans variable.
Return the final sum stored in ans.

Time Complexity

Let m be the number of rows and n be the number of columns in the grid.
The time complexity of this function is O(m * n * log n), where m is the number of rows and n is the number of columns in the grid.
Sorting each row of the grid takes O(n * log n) time, as we are sorting n elements in each of the m rows.
Iterating over each column and finding the greatest value in each column takes O(m) time, as we iterate over m rows for each of the n columns.
The dominant operation is sorting the rows, which contributes O(m * n * log n) to the overall time complexity.

Space Complexity

The space complexity of this function is O(1), as it does not use any additional data structures that grow with the size of the input.
The function operates in-place on the input grid and only uses a constant amount of extra space to store the ans variable and loop variables.


*/
function deleteGreatestValue(grid) {
    for (const row of grid) {
        row.sort((a, b) => a - b);
    }
    //console.log("grid--", grid);
    let ans = 0;
    let colLen = grid[0].length;
    let rowLen = grid.length;
    // Iterate over each column of the grid
    for (let colIndex = 0; colIndex < colLen; colIndex++) {
        // Initialize a variable to keep track of the greatest value in the current column
        let bigValInColm = 0;
        // Iterate over each row to find the greatest value in the current column
        for (let rowIndex = 0; rowIndex < rowLen; rowIndex++) {
            bigValInColm = Math.max(bigValInColm, grid[rowIndex][colIndex]);
        }
        // Accumulate the greatest values of each column
        ans += bigValInColm;
    }
    return ans;
}

let grid = [[1, 2, 4], [3, 3, 1]];
grid = [[10]];
console.log(deleteGreatestValue(grid));