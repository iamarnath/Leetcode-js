/*
 * 1275. Find Winner on a Tic Tac Toe Game
 * Tic-tac-toe is played by two players A and B on a 3 x 3 grid.
 *  The rules of Tic-Tac-Toe are:

Players take turns placing characters into empty squares ' '.
The first player A always places 'X' characters, 
while the second player B always places 'O' characters.
'X' and 'O' characters are always placed into empty
 squares, never on filled ones.
The game ends when there are three of the same (non-empty)
 character filling any row, column, or diagonal.
The game also ends if all squares are non-empty.
No more moves can be played if the game is over.
Given a 2D integer array moves where 
moves[i] = [rowi, coli] indicates that the ith move will
 be played on grid[rowi][coli]. return the winner of the game
  if it exists (A or B). In case the game ends 
  in a draw return "Draw". If there are still movements to 
  play return "Pending".

You can assume that moves is valid (i.e., it follows
 the rules of Tic-Tac-Toe), the grid is initially empty, 
 and A will play first.

Example 1:
Input: moves = [[0,0],[2,0],[1,1],[2,1],[2,2]]
Output: "A"
Explanation: A wins, they always play first.
Example 2:


Input: moves = [[0,0],[1,1],[0,1],[0,2],[1,0],[2,0]]
Output: "B"
Explanation: B wins.
Example 3:

Input: moves = [[0,0],[1,1],[2,0],[1,0],[1,2],[2,1],[0,1],[0,2],[2,2]]
Output: "Draw"
Explanation: The game ends in a draw since there are no moves to make.
 

Constraints:

1 <= moves.length <= 9
moves[i].length == 2
0 <= rowi, coli <= 2
There are no repeated elements on moves.
moves follow the rules of tic tac toe.
 * 
*/
/*
 * Code Logic
Tracks moves for each player using counters for each line (row, column, and both diagonals).

On each move, it increments relevant counters and checks if any line has 3 marks (win condition).

Efficiently determines win, draw, or pending states after all moves.

Time Complexity
O(n), where 
n
n = number of moves (maximum 9 for 3x3 board).

Single pass through moves for updating counters.

Single pass through 8 counters for win check.

Space Complexity
O(1): Uses fixed-size arrays (length 8) and a constant number of variables, independent of moves.
*/
package Array;

public class FindWinneronTicTacToeGame1275 {
    public String tictactoe(int[][] moves) {
        /*
         * Declare two arrays a and b (length 8), one for each player (A and B).
         * Each array index represents:
         * 0, 1, 2 = rows 0, 1, 2
         * 3, 4, 5 = columns 0, 1, 2
         * 6 = main diagonal (top-left to bottom-right)
         * 7 = anti-diagonal (top-right to bottom-left)
         */
        int[] a = new int[8];
        int[] b = new int[8];
        for (int indx = 0; indx < moves.length; indx++) {
            int row = moves[indx][0];
            int col = moves[indx][1];
            int[] player;
            // Player A moves on even indices (0, 2, ...), Player B on odd.
            if (indx % 2 == 0) {
                player = a;
            } else {
                player = b;
            }
            /*
             * Increment the count in:
             * The appropriate row and column for that move (row and col+3).
             * The main diagonal if row == col.
             * The anti-diagonal if row + col == 2 (or row == 2-col).
             * 
             */
            // Row
            player[row] += 1;
            // Column
            player[col + 3] += 1;
            // primary diagonal
            if (row == col) {
                player[6] += 1;
            }
            // secondary diagonal
            if (row + col == 3 - 1) { // matrix n ,row + col = n-1 for secondary diagonal
                player[7] += 1;
            }
        } // end of for
        for (int i = 0; i < 8; i++) {
            if (a[i] == 3) {
                return "A";
            } else if (b[i] == 3) {
                return "B";
            }
        }
        // If all 9 moves are done and no winner: return "Draw".
        if (moves.length == 9) {
            return "Draw";
            // Otherwise: return "Pending" (game not finished yet).
        } else {
            return "Pending";
        }
    }

    public static void main(String[] args) {
        FindWinneronTicTacToeGame1275 sol = new FindWinneronTicTacToeGame1275();
        // int[][] moves = { { 0, 0 }, { 2, 0 }, { 1, 1 }, { 2, 1 }, { 2, 2 } };
        int[][] moves = { { 0, 0 }, { 1, 1 }, { 2, 0 }, { 1, 0 }, { 1, 2 }, { 2, 1 }, { 0, 1 }, { 0, 2 }, { 2, 2 } };
        System.out.println(sol.tictactoe(moves)); // Output: "A"
    }
}

/*
 Javascript code

 class FindWinnerOnTicTacToeGame1275 {
    tictactoe(moves) {
        // Create two arrays for players A and B for rows, columns, and diagonals
        // Indexes:
        // 0,1,2 → rows 0,1,2
        // 3,4,5 → columns 0,1,2
        // 6 → main diagonal
        // 7 → anti-diagonal
        let a = new Array(8).fill(0);
        let b = new Array(8).fill(0);

        for (let indx = 0; indx < moves.length; indx++) {
            const [row, col] = moves[indx];
            // Determine which player’s turn it is
            let player = indx % 2 === 0 ? a : b;

            // Row
            player[row] += 1;
            // Column
            player[col + 3] += 1;
            // Main diagonal
            if (row === col) player[6] += 1;
            // Anti-diagonal
            if (row + col === 2) player += 1;
        }

        // Check for a winner
        for (let i = 0; i < 8; i++) {
            if (a[i] === 3) return "A";
            if (b[i] === 3) return "B";
        }

        // Draw or Pending
        if (moves.length === 9) return "Draw";
        else return "Pending";
    }
}

// Example usage:
const sol = new FindWinnerOnTicTacToeGame1275();
const moves = [ [0,0], [1,1], [2,0], [1,0], [1,2], [2,1], [0,1], [0,2], [2,2] ];
console.log(sol.tictactoe(moves)); // Output: "A"

Here's a visual explanation for the main diagonal (index 6) and the anti-diagonal (index 7) in a 3x3 Tic Tac Toe board:

Tic Tac Toe Board (Cell Coordinates)
(0,0)	(0,1)	(0,2)
(1,0)	(1,1)	(1,2)
(2,0)	(2,1)	(2,2)
Index 6 – Main Diagonal (Top-Left to Bottom-Right)
Cells involved:

(0,0)

(1,1)

(2,2)

Criteria:

A cell is on this diagonal if row == col.

Visualization:

text
X |   |  
---------
  | X |  
---------
  |   | X
(X = on the main diagonal)

Index 7 – Anti-Diagonal (Top-Right to Bottom-Left)
Cells involved:

(0,2)

(1,1)

(2,0)

Criteria:

A cell is on this diagonal if row + col == 2 (for n=3, n-1=2).

Visualization:

text
  |   | X
---------
  | X |  
---------
X |   |  
(X = on the anti-diagonal)

Summary:

Index 6 counts moves on top-left to bottom-right (main diagonal), i.e., (0,0), (1,1), (2,2).

Index 7 counts moves on top-right to bottom-left (anti-diagonal), i.e., (0,2), (1,1), (2,0).

Whenever a move lands on one of these diagonal cells, you increment the respective counter to quickly detect a possible diagonal win
  
 * 
*/