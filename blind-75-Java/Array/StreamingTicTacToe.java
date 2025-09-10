/*
 * Streaming Tic-Tac-Toe: Detect Full Row or Column of 1s
Problem Statement
You are implementing a streaming version of Tic-Tac-Toe 
on an n x n board. The board is initially empty.
You receive a stream of integers, each either 0 or 1,
 and fill the board in row-major order (left to right, top to bottom).
After each input, implement a function that returns 
true if there is any row or column that is completely
 filled with 1s; otherwise, return false.
Write a class with the following API:
public class StreamingTicTacToe {
    public StreamingTicTacToe(int n);
    public boolean add(int val); // Receives next value in the stream, 
    returns true if any row or column is all 1s
}

Example
Input:
n = 3
Stream: 0,0,1, 0,0,1, 0,0,0, 1,1,1
Output:
false, false, false, false, false, false, false, false,
 false, true, true, true
Explanation:
•	After the first 9 inputs, the board is filled, but no 
row or column is all 1s.
•	After the next 3 inputs (which overwrite the first row), 
the first row becomes ``, so the function returns true.
Constraints
•	1 <= n <= 10^3
•	The stream can be arbitrarily long (the board wraps around: 
after filling the board, the next input overwrites the first cell,
 then the second, etc.)
•	Each call to add must run in O(1) time.

 * 
*/
/*
 * add(int val) — Explained

public boolean add(int val) {
➡️ Called with next stream value val (0 or 1).
Returns true if any row or column becomes fully filled with 1s after inserting val.


int row = idx / n;
int col = idx % n;
➡️ Convert the flat index idx to 2D row/col coordinates:

Example: if n = 3 and idx = 5, then row = 1, col = 2.


int oldVal = board[row][col];
if (oldVal == 1) {
    rowOnes[row]--;
    colOnes[col]--;
}
➡️ Since we’re overwriting a cell (remember: board wraps around), we must:

Check the existing value at that cell.

If it’s a 1, we had previously incremented rowOnes and colOnes.

So now we decrement them to undo the old 1.

📝 Why? Imagine the cell had a 1, but we now set it to 0. 
The row and column will lose a 1, so their counters must reflect that change.


board[row][col] = val;
if (val == 1) {
    rowOnes[row]++;
    colOnes[col]++;
}
➡️ Set the new value to the board and update the counts if it's a 1.

rowOnes[row] = how many 1s in that row

colOnes[col] = how many 1s in that column


idx = (idx + 1) % (n * n);
➡️ Move to the next cell (wraps around after the last cell).
Example: for n = 3, when idx goes from 8 → 0, we start overwriting again.


return rowOnes[row] == n || colOnes[col] == n;
➡️ The most important step:

After inserting val, we check:

Is this row now completely full of 1s? → rowOnes[row] == n

Or is this column completely full of 1s? → colOnes[col] == n

If yes, return true. Otherwise, return false.

🧠 Why It’s O(1)
Every step:

Accesses constant-sized arrays (rowOnes, colOnes)

Only checks one row and one column

Does not loop over the board

So the add() function runs in constant time: O(1) — even if the board has millions of cells!

✅ Example Dry Run
For n = 3 (3x3 board):

Let’s stream: 1, 1, 1, 0, 0, 0, 0, 0, 0

Steps:

Step	idx	val	row	col	rowOnes	colOnes	Result
1	    0	1	0	0	[1,0,0]	[1,0,0]	false
2	    1	1	0	1	[2,0,0]	[1,1,0]	false
3	    2	1	0	2	[3,0,0]	[1,1,1]	✅ true (row 0 full of 1s)

💡 Summary
Track counts of 1s per row/column.

Undo old value before writing new.

After each update, check just the affected row and column.

Wrap around to simulate streaming.

All in O(1) time!
 * 
*/
package Array;

/*
public class StreamingTicTacToe {
    private final int n;
    private final int[][] board;
    private final int[] rowOnes;
    private final int[] colOnes;
    private int idx;

    public StreamingTicTacToe(int n) {
        this.n = n;
        this.board = new int[n][n];
        this.rowOnes = new int[n];
        this.colOnes = new int[n];
        this.idx = 0;
    }

    public boolean add(int val) {
        int row = idx / n;
        int col = idx % n;

        // Remove old value effect
        int oldVal = board[row][col];
        if (oldVal == 1) {
            rowOnes[row]--;
            colOnes[col]--;
        }

        // Set new value
        board[row][col] = val;
        if (val == 1) {
            rowOnes[row]++;
            colOnes[col]++;
        }

        idx = (idx + 1) % (n * n);

        return rowOnes[row] == n || colOnes[col] == n;
    }

    // Optional: print board (for debugging)
    public void printBoard() {
        for (int[] row : board) {
            for (int val : row) {
                System.out.print(val + " ");
            }
            System.out.println();
        }
        System.out.println();
    }

    // Test Runner
    public static void main(String[] args) {
        int n = 3;
        StreamingTicTacToe game = new StreamingTicTacToe(n);

        int[] stream = {0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1};
        System.out.println("Streamed Values and Row/Col Check:");
        for (int i = 0; i < stream.length; i++) {
            boolean result = game.add(stream[i]);
            System.out.printf("Input: %d → Row/Col All 1s? %s\n", stream[i], result);
            // Optional: game.printBoard(); // uncomment to view board
        }
    }
}
*/
public class StreamingTicTacToe {
    private final int n;
    private final int[][] board;
    private final int[] rowOnes;
    private final int[] colOnes;
    private int idx;

    public StreamingTicTacToe(int n) {
        this.n = n;
        this.board = new int[n][n];
        this.rowOnes = new int[n];
        this.colOnes = new int[n];
        this.idx = 0;
    }

    public boolean add(int val) {
        int row = idx / n;
        int col = idx % n;
        System.out.println("row ==" + row + "= col ==" + col);
        // remove old value
        int oldVal = board[row][col];
        if (oldVal == 1) {
            rowOnes[row]--;
            colOnes[col]--;
        }
        // set new value
        board[row][col] = val;
        if (val == 1) {
            rowOnes[row]++;
            colOnes[col]++;
        }
        idx = (idx + 1) % (n * n);
        System.out.println("idx =="+idx);
        return rowOnes[row] == n || colOnes[col] == n;
    }

    public void printBoard() {
        for (int[] row : board) {
            for (int val : row) {
                System.out.println(val + " ");
            }
            System.out.println(" ");

        }
        System.out.println(" ");
    }

    public static void main(String[] args) {
        int n = 3;
        StreamingTicTacToe sol = new StreamingTicTacToe(n);
        int[] stream = { 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1 };
        for (int i = 0; i < stream.length; i++) {
            boolean result = sol.add(stream[i]);
           // System.out.printf("Input: %d → Row/Col All 1s? %s\n", stream[i], result);
        }
    }

}
