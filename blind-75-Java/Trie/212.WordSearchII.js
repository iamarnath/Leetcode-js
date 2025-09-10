/*
212. Word Search II
Given a 2-D grid of characters board and
 a list of strings words, return all
  words that are present in the grid.

For a word to be present it must be possible
 to form the word with a path in the board
  with horizontally or vertically
   neighboring cells. The same cell may
    not be used more than once in a word.

Example 1:
Input:
board = [
  ["a","b","c","d"],
  ["s","a","a","t"],
  ["a","c","k","e"],
  ["a","c","d","n"]
],
words = ["bat","cat","back","backend","stack"]

Output: ["cat","back","backend"]

Input:
board = [
  ["x","o"],
  ["x","o"]
],
words = ["xoxo"]

Output: []

Constraints:

1 <= board.length, board[i].length <= 10
board[i] consists only of lowercase English letter.
1 <= words.length <= 100
1 <= words[i].length <= 10
words[i] consists only of lowercase English letters.
All strings within words are distinct.

*/

// Define the trie node structure globally.

let trieNodes = [];
let nodeIdCounter = 0;

// Function to create a new trie node.
/*
trieNodes: Array of trie nodes. Each node is an object 
with children (array of 26 slots for each letter) and
 ref (index of the word in the words array if this node marks
  the end of a word, else -1).

nodeIdCounter: Used to assign unique IDs to nodes.
*/
function createTrieNode() {
    const newNodeId = nodeIdCounter++;
    trieNodes[newNodeId] = { children: Array(26).fill(null), ref: -1 };
    return newNodeId;
}

// Function to insert a word into the trie.
// For each word, walks through the trie, creating nodes as
// needed, and marks the end node with its word index.

function insertIntoTrie(word, ref) {
    let nodeId = 0;
    for (const char of word) {
        const index = char.charCodeAt(0) - "a".charCodeAt(0);
        if (trieNodes[nodeId].children[index] === null) {
            trieNodes[nodeId].children[index] = createTrieNode();
        }
        nodeId = trieNodes[nodeId].children[index];
    }
    trieNodes[nodeId].ref = ref;
}

// Function to find words on the board that exist in the trie.
function findWords(board, words) {
    /*
    Reset and initialize the trie for each call.

Insert all words into the trie.

Set up board dimensions and an array to collect found words.

directions array helps to easily compute the four adjacent cells.

    */
    // Reset the global trie nodes
    trieNodes=[];
    nodeIdCounter = 0;
    createTrieNode();//create the root node
    //insert each word from the list into trie

    words.forEach((word,index)=>insertIntoTrie(word,index));
    const rows = board.length;
    const cols = board[0].length;
    const foundWords = [];
    // Define directions for adjacent cells: up, right, down, left
    const directions = [-1,0,1,0,-1];
        /*
        is a compact way to represent the four cardinal directions 
        (up, right, down, left) for grid traversal.
        How It Works
        The array is used to calculate new coordinates when exploring
         neighbors in a 2D grid (like a board).
        Each pair of consecutive elements represents a direction:
        (dx, dy) for each direction.

       Direction	dx	dy	directions index
        Up	        -1	0	0, 1
        Right	     0	1	1, 2
        Down	     1	0	2, 3
        Left	     0	-1	3, 4
        */
    // Depth-first search function to search for words in the board
    /*
    Prunes search early if the path does not exist in the trie.
    Adds to foundWords if a word is completed
    (and marks as found to avoid duplicates).
    Marks cells as visited by setting to '#' 
    (prevents revisiting in the current path).
    Restores the cell after backtracking.

    */
    function dfs(nodeId,x,y,currWord){
        const charIndex = board[x][y].charCodeAt(0) - "a".charCodeAt(0);
        const nextNodeId = trieNodes[nodeId].children[charIndex];
        if(nextNodeId === null){
            return;
        }
        currWord +=board[x][y];
        if(trieNodes[nextNodeId].ref !== -1){
            foundWords.push(words[trieNodes[nextNodeId].ref]);
            trieNodes[nextNodeId].ref= -1;//mark word as discovered

        }
        const originalChar = board[x][y];
        board[x][y] = "#";
        //explore all possible directions
        for(let i=0;i<4;++i){
            const newX = x+directions[i];
            const newY = y+directions[i+1];
            // Continue DFS if the new position is within boundaries and not visited
            if(newX>=0 && newX<rows && newY>=0 && newY<cols && 
                board[newX][newY] !=="#" 
            ){
                dfs(nextNodeId,newX,newY,currWord);
            }
        }
        board[x][y] = originalChar;
    
    }
     // Iterate over the entire board to start DFS from each cell
    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            dfs(0,i,j,"");
        }
    }
    return foundWords;
}

// let board = [
//     ["a","b","c","d"],
//     ["s","a","a","t"],
//     ["a","c","k","e"],
//     ["a","c","d","n"]
//   ],
//   words = ["bat","cat","back","backend","stack"];
let board = [
    ["x","o"],
    ["x","o"]
  ],
  words = ["xoxo"];
console.log(findWords(board,words));

/*
time and space complexity analysis for the findWords
 function using a Trie and DFS:

Time Complexity
1. Trie Construction
Inserting all words:
Each word of length up to 
L
L is inserted character by character.

For 
W
W words, each of average length 
L
L:
O(W \times L)

2. Searching the Board with DFS
For each cell in the board (

n cells), a DFS is started.

At each DFS step, you can move in up to 4 directions,
 but you cannot revisit the same cell in a path.

For each cell, the maximum number of DFS calls is bounded
 by the number of possible paths of length up to 
L
L (the maximum word length).

But after the first move, you can't go back,
 so the branching factor is at most 3 (not 4) after the first step.

Total DFS time:
For a board with 
n cells and max word length 

L:
O(n \times 3^L)

Overall time complexity:


O(W×L+n×3^L)
Where:

W = number of words
L = maximum word length

n = number of cells in the board

Space Complexity
1. Trie Storage
Each unique prefix creates a new node.

In the worst case (no shared prefixes), each word of length 

L creates 

L new nodes.

O(W \times L)

2. DFS Recursion Stack
At most 
L recursive calls on the stack at once (the maximum word length).

O(L)

3. Board and Output
The board uses O(n) space (already given).

The output array can store up to O(W) words.

Total auxiliary space:

O(W×L+n)
Summary Table
Phase	Time Complexity	Space Complexity
Trie Build	O(W × L)	O(W × L)
DFS Search	O(n × 3^L)	O(L) (stack)
Total	O(W × L + n × 3^L)	O(W × L + n)

*/