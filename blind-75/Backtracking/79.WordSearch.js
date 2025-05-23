/*
79. Word Search
Given a 2-D grid of characters board and a string word,
 return true if the word is present in the grid, 
 otherwise return false.

For the word to be present it must be possible 
to form it with a path in the board with horizontally or
 vertically neighboring cells. The same cell may not
  be used more than once in a word.

Example 1:

Input: 
board = [
  ["A","B","C","D"],
  ["S","A","A","T"],
  ["A","C","A","E"]
],
word = "CAT"

Output: true
Example 2:



Input: 
board = [
  ["A","B","C","D"],
  ["S","A","A","T"],
  ["A","C","A","E"]
],
word = "BAT"

Output: false
Constraints:

1 <= board.length, board[i].length <= 5
1 <= word.length <= 10
board and word consists of only lowercase and uppercase English letters.

*/
/*
Time Complexity:
Worst case is approximately O(m * n * 4^l), where:

m and n are the board dimensions,

l is the length of the word,

Because from each cell, DFS explores up to 4 directions
 for each character in the word.

Space Complexity:
O(l) due to the recursion stack depth (maximum length of the word).
*/
const directions = [
    [0, 1], //right
    [0, -1],//left
    [1, 0],//down
    [-1, 0] //up
];
let m, n, l;
//idx: current index in the word that we want to match.

function find(board, i, j, word, idx) {
   //Base case: if idx equals or exceeds the word length, it means all characters have been successfully matched.

//Returns true indicating the word exists along the current path.
    if (idx >= l) return true;
    // Boundary and character check
    //If (i, j) is outside the board, return false.

//If the character at board[i][j] does not match the current character
//  word[idx], return false.
    if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] != word[idx]) {
        return false;
    }
    // Mark this cell as visited by temporarily changing the character
    //Temporarily stores the current character in temp.

//Marks the current cell as visited by replacing its character
//  with a special marker ('$').

//This prevents revisiting the same cell in the current path,
//  avoiding cycles.
    const temp = board[i][j];
    board[i][j] = "$";
    // Explore all four directions
    /*
    Iterates over all four possible directions.
        Calculates the new cell coordinates (newI, newJ) by
         adding direction offsets.
        Recursively calls find to match the next character
         (idx + 1) from the new cell.
        If any recursive call returns true, the word is found:
        Restores the original character at (i, j) before returning.
        Returns true immediately to stop further searching.
    */
    for (const [dx, dy] of directions) {
        const newI = i + dx;
        const newJ = j + dy;
        if (find(board, newI, newJ, word, idx + 1)) {
            // Restore the original character before returning
            board[i][j] = temp;
            return true;
        }
    }
    // Restore the original character after exploring all directions
    //Restores the original character at (i, j) to allow other paths to use this cell.

    //Returns false indicating the word cannot be formed starting from this cell and index.
    board[i][j] = temp;
    return false;
}
function exist(board, word) {
    m = board.length;
    n = board[0].length;
    l = word.length;
    // Quick check: if total cells < word length, no need to search
    //Quick optimization: if the total number of cells in the
    //  board is less than the length of the word,
    //  it's impossible to form the word.


    if (m * n < l) return false;
    /*
    Nested loops iterate over every cell (i, j) in the board.
        For each cell, it checks if the character matches
         the first character of the word.
        If it matches, calls the find function starting
         from that cell and index 0.
        If find returns true, the word exists in the board,
         so exist returns true.
    */
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            //last param in find is word index
            if (board[i][j] === word[0] && find(board, i, j, word, 0)) {
                return true;
            }
        }
    }
    return false;
}

// let board = [
//   ["A","B","C","D"],
//   ["S","A","A","T"],
//   ["A","C","A","E"]
// ],
// word = "BAT";
let board =[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]],word ="ABCCED";

// let board = [
//     ["A", "B", "C", "D"],
//     ["S", "A", "A", "T"],
//     ["A", "C", "A", "E"]
// ],
//     word = "CAT";



console.log(exist(board, word));