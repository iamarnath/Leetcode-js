/*
36. Valid Sudoku

Description
You are given a 9 x 9 Sudoku board board. 
A Sudoku board is valid if the following rules are followed:

Each row must contain the digits 1-9 without duplicates.
Each column must contain the digits 1-9 without duplicates.
Each of the nine 3 x 3 sub-boxes of the grid must
 contain the digits 1-9 without duplicates.
Return true if the Sudoku board is valid, otherwise return false

Note: A board does not need to be full or be solvable to be valid.

Example 1:
Input: board = 
[["1","2",".",".","3",".",".",".","."],
 ["4",".",".","5",".",".",".",".","."],
 [".","9","8",".",".",".",".",".","3"],
 ["5",".",".",".","6",".",".",".","4"],
 [".",".",".","8",".","3",".",".","5"],
 ["7",".",".",".","2",".",".",".","6"],
 [".",".",".",".",".",".","2",".","."],
 [".",".",".","4","1","9",".",".","8"],
 [".",".",".",".","8",".",".","7","9"]]

Output: true
Example 2:

Input: board = 
[["1","2",".",".","3",".",".",".","."],
 ["4",".",".","5",".",".",".",".","."],
 [".","9","1",".",".",".",".",".","3"],
 ["5",".",".",".","6",".",".",".","4"],
 [".",".",".","8",".","3",".",".","5"],
 ["7",".",".",".","2",".",".",".","6"],
 [".",".",".",".",".",".","2",".","."],
 [".",".",".","4","1","9",".",".","8"],
 [".",".",".",".","8",".",".","7","9"]]

Output: false
Explanation: There are two 1's in the top-left 3x3 sub-box.

Constraints:

board.length == 9
board[i].length == 9
board[i][j] is a digit 1-9 or '.'.

*/

/*
validSub(board, sr, er, sc, ec): This helper function checks if a 3x3 sub-box in the Sudoku board is valid. It iterates over the cells from row sr to er and column sc to ec, skipping empty cells ('.'). It uses a Set to track digits seen in this sub-box. If a digit repeats, it returns false; otherwise, true.

isValidSudoku(board): This function validates the entire Sudoku board by checking:

Rows: For each row, it checks if any digit repeats by using a Set.

Columns: For each column, it similarly checks for duplicates.

3x3 sub-boxes: It divides the board into nine 3x3 boxes and uses validSub to verify each box.

If any of these checks fail, the function returns false. If all pass, it returns true.

This approach ensures the board adheres to Sudoku rules: no repeated digits in any row, column, or 3x3 box.

Time Complexity
The board is a fixed size 9x9 grid.

Row validation: Iterates over 9 rows × 9 columns = 81 cells.

Column validation: Similarly, 81 cells.

Sub-box validation: Checks 9 sub-boxes, each 3x3 = 81 cells total.

Overall, each cell is visited a constant number of times
 (3 times: once for row, once for column, once for box).

Thus, the time complexity is O(1) in practice because the board
 size is fixed. More generally, if the board size is 
n×n with sub-boxes of size 
SQRT(n) × SQRT(n), the complexity would be O(n²) since each cell is checked 
 a constant number of times.

Space Complexity
The code uses auxiliary space mainly for the 
Set data structures used during validation.

For each row, column, or sub-box, the Set can hold up to 9 digits.

Since sets are recreated for each row, column, and sub-box,
 the maximum space used at any time is proportional 
 to the size of one row/column/sub-box, which is 9.

Therefore, the space complexity is O(1) due to fixed
 board size and limited auxiliary storage. For a general 

n×n board, it would be O(n) for the sets used in validation.

Summary
Aspect	Explanation
Algorithm	Check rows, columns, and 3x3 sub-boxes for duplicates using sets
Time Complexity	O(1) (fixed 9x9 board), generally O(n²) for n×n board
Space Complexity	O(1) (fixed board), generally O(n) for n×n board

*/
function validSub(board, sr, er, sc, ec) {
    const st = new Set();
    for (let row = sr; row <= er; row++) {
        for (let col = sc; col <= ec; col++) {
            const ch = board[row][col];
            if (ch === ".") continue;
            if (st.has(ch)) return false;
            st.add(ch);
        }
    }
    return true;
}

var isValidSudokuOld = function (board) {
    // validate rows
    for (let row = 0; row < 9; row++) {
        const st = new Set();
        for (let col = 0; col < 9; col++) {
            const ch = board[row][col];
            if (ch === ".") continue;
            if (st.has(ch)) return false;
            st.add(ch);
        }
    }
    //validate columns
    for (let col = 0; col < 9; col++) {
        const st = new Set();
        for (let row = 0; row < 9; row++) {
            const ch = board[row][col];
            if (ch === ".") continue;
            if (st.has(ch)) return false;
            st.add(ch);
        }
    }
    // Validate each 3x3 box
    for (let sr = 0; sr < 9; sr += 3) {
        const er = sr + 2;
        for (let sc = 0; sc < 9; sc += 3) {
            const ec = sc + 2;
            if (!validSub(board, sr, er, sc, ec)) return false;
        }
    }
    return true;
}

//=======================Method 2
/*
This code checks if a given 9x9 Sudoku board is valid by ensuring that:

Each digit (1-9) appears only once in each row.

Each digit appears only once in each column.

Each digit appears only once in each 3x3 sub-box.

How It Works
Initialization:
A single Set (st) is used to keep track of all
 the digits seen so far in their respective rows, columns, and boxes.

Iteration:
The code loops over every cell in the 9x9 board.

Skip Empty Cells:
If a cell contains '.', it is ignored.

Encoding Constraints:
For each digit, three unique strings are created:

row: e.g., "5_row_0" means digit 5 in row 0.

col: e.g., "5_col_4" means digit 5 in column 4.

box: e.g., "5_box_1_2" means digit 5 in the 3x3
 box at (row group 1, column group 2).

These strings uniquely identify the presence 
of a digit in a row, column, or box.

Duplicate Check:
If any of these strings are already in the Set,
 it means the digit has already appeared in 
 that row, column, or box, so the board is 
 invalid and the function returns false.

Record Seen Digits:
If no duplicates are found, all three strings are added to the Set.

Final Result:
If the loop completes without finding 
duplicates, the board is valid and the function returns true.

Why Use Row/Col/Box Strings?
Purpose:
These strings uniquely encode the constraint
 that a digit must not repeat in any row, column, or 3x3 box.

How:
By combining the digit with its location type
 (row, col, box) and its index, you can use a
  single Set to track all constraints, rather
   than using three separate data structures.

Example:
If you see "5_row_0" in the Set, you know that
 digit 5 has already appeared in row 0. 
 If you see "5_box_1_2", you know that digit 5 
 has already appeared in the middle-right 3x3 box.

Time Complexity
Each cell is visited once (9 rows × 9 columns = 81 iterations).

For each non-empty cell, three strings are 
created and checked/added to the Set (constant time operations).

Total time complexity:

O(1) (since the board size is fixed at 9x9),
or more generally, 

O(n ^2) for an 

n×n board.

Space Complexity
Set size:
At most, for a full board, you could store 3 
entries per cell (row, col, box), so up to 243 strings (3 × 81).

Each string is of constant size 
(since digits and indices are small, max 2 digits).

Total space complexity:
O(1) for a standard Sudoku board,
or more generally, 
O(n ^ 2) for an 
n×n board.

Summary Table
Aspect	                  Explanation
Logic	                  Use a Set to track digits in rows, columns, 
                          and boxes via unique strings
Why strings?	          Uniquely encode digit-location constraints 
                          in a single Set
Time Complexity	          O(1) (fixed board), generally O(n²)
Space Complexity	      O(1) (fixed board), generally O(n²)

*/
var isValidSudoku = function (board) {
    const st = new Set();
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === ".") continue;
            const val = board[i][j];
            const row = `${val}_row_${i}`;
            const col = `${val}_col_${j}`;
            console.log("i values==",i,Math.floor(i/3));
            const box = `${val}_box_${Math.floor(i / 3)}_${Math.floor(j / 3)}`;
            console.log("box==",box);
            if (st.has(row) || st.has(col) || st.has(box)) return false;
            st.add(row);
            st.add(col);
            st.add(box);
        }
    }
    return true;
}
let board =
    [["5", "3", ".", ".", "7", ".", ".", ".", "."]
        , ["6", ".", ".", "1", "9", "5", ".", ".", "."]
        , [".", "9", "8", ".", ".", ".", ".", "6", "."]
        , ["8", ".", ".", ".", "6", ".", ".", ".", "3"]
        , ["4", ".", ".", "8", ".", "3", ".", ".", "1"]
        , ["7", ".", ".", ".", "2", ".", ".", ".", "6"]
        , [".", "6", ".", ".", ".", ".", "2", "8", "."]
        , [".", ".", ".", "4", "1", "9", ".", ".", "5"]
        , [".", ".", ".", ".", "8", ".", ".", "7", "9"]];

// let board =
//     [["8", "3", ".", ".", "7", ".", ".", ".", "."]
//         , ["6", ".", ".", "1", "9", "5", ".", ".", "."]
//         , [".", "9", "8", ".", ".", ".", ".", "6", "."]
//         , ["8", ".", ".", ".", "6", ".", ".", ".", "3"]
//         , ["4", ".", ".", "8", ".", "3", ".", ".", "1"]
//         , ["7", ".", ".", ".", "2", ".", ".", ".", "6"]
//         , [".", "6", ".", ".", ".", ".", "2", "8", "."]
//         , [".", ".", ".", "4", "1", "9", ".", ".", "5"]
//         , [".", ".", ".", ".", "8", ".", ".", "7", "9"]];

let res = isValidSudoku(board);

console.log("result==", res);