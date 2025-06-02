/*

130. Surrounded Regions

You are given a 2-D matrix board containing 'X' and 'O' characters.

If a continous, four-directionally connected group
 of 'O's is surrounded by 'X's, it is considered to be surrounded.

Change all surrounded regions of 'O's to 'X's 
and do so in-place by modifying the input board.

Example 1:

Input: board = [
  ["X","X","X","X"],
  ["X","O","O","X"],
  ["X","O","O","X"],
  ["X","X","X","O"]
]

Output: [
  ["X","X","X","X"],
  ["X","X","X","X"],
  ["X","X","X","X"],
  ["X","X","X","O"]
]
Explanation: Note that regions that are on the border
 are not considered surrounded regions.

Constraints:

1 <= board.length, board[i].length <= 200
board[i][j] is 'X' or 'O'.

*/
// use DFS

/*
Initialization

rows, columns: Get the dimensions of the board.

dfs(r, c): A helper function that performs 
a depth-first search (DFS) to mark all "O" cells
 connected to the current cell as "T" (temporary marker).

Mark Border Regions

First for-loop: For each row, check the first 
and last column. If a cell is "O", start DFS
 to mark all connected "O"s as "T".

Second for-loop: For each column, check the
 first and last row. Again, if a cell is "O", 
 start DFS to mark connected "O"s as "T".

Note: There is a small error in the code: 
if (board[r][columns - 1]) should be 
if (board[r][columns - 1] === "O") to ensure only "O" are processed.

Capture Surrounded Regions

Double for-loop: Iterate over all cells.

If a cell is "O" (not marked as "T"), it is
 surrounded and should be flipped to "X".

If a cell is "T", it was connected to the
 border and should be restored to "O".

Time Complexity
DFS Traversal: Each cell is visited at most
 once during the DFS calls from the borders.

Double for-loop: Each cell is visited again to update the values.

Overall:

Time Complexity: O(m × n)
(where m = number of rows, n = number of columns)

Space Complexity
Recursive DFS Calls:

In the worst case, the call stack can grow up to
 O(m × n) (for a board filled with "O").

However, in practice, the recursion depth is'
 limited by the length of the longest path from
  the border, which is at most O(m + n) in most cases.

But the worst-case space complexity is O(m × n) due to recursion stack.

No additional data structures (except the call stack) are used.

*/
var solve = function(board) {
        let rows = board.length, columns = board[0].length;
    const dfs = (r, c) => {
        if (r < 0 || c < 0 || r >= rows || c >= columns || board[r][c] !== "O") {
            return;
        }
        board[r][c] = "T";
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    }
    for (let r = 0; r < rows; r++) {
        if (board[r][0] === "O") dfs(r, 0);
        if (board[r][columns - 1]) dfs(r, columns - 1);
    }
    for (let c = 0; c < columns; c++) {
        if (board[0][c] === "O") dfs(0, c);
        if (board[rows - 1][c] === "O") dfs(rows - 1, c);
    }
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] === "O") board[r][c] = "X";
            else if (board[r][c] === "T") board[r][c] = "O";
        }
    }
};

// let board = [
//     ["X", "X", "X", "X"],
//     ["X", "O", "O", "X"],
//     ["X", "O", "O", "X"],
//     ["X", "X", "X", "O"]
// ];
let board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]];
solve(board);