/*
427. Construct Quad Tree

Given a n * n matrix grid of 0's and 1's only. 
We want to represent grid with a Quad-Tree.

Return the root of the Quad-Tree representing grid.

A Quad-Tree is a tree data structure in which 
each internal node has exactly four children. 
Besides, each node has two attributes:

val: True if the node represents a grid of 1's or
 False if the node represents a grid of 0's.
  Notice that you can assign the val to True or False 
  when isLeaf is False, and both are accepted in the answer.
isLeaf: True if the node is a leaf node on the tree or
 False if the node has four children.
class Node {
    public boolean val;
    public boolean isLeaf;
    public Node topLeft;
    public Node topRight;
    public Node bottomLeft;
    public Node bottomRight;
}
We can construct a Quad-Tree from a two-dimensional 
area using the following steps:

If the current grid has the same value (i.e all 1's or all 0's)
 set isLeaf True and set val to the value of the grid 
 and set the four children to Null and stop.
If the current grid has different values, set isLeaf to 
False and set val to any value and divide the current grid 
into four sub-grids as shown in the photo.
Recurse for each of the children with the proper sub-grid.

If you want to know more about the Quad-Tree, you can refer to the wiki.

Quad-Tree format:

You don't need to read this section for solving the problem.
 This is only if you want to understand the output format here.
  The output represents the serialized format of a Quad-Tree
   using level order traversal, where null signifies
    a path terminator where no node exists below.

It is very similar to the serialization of the binary tree.
 The only difference is that the node is represented
 as a list [isLeaf, val].

If the value of isLeaf or val is True we represent it 
as 1 in the list [isLeaf, val] and if the value of
 isLeaf or val is False we represent it as 0.

Example 1:


Input: grid = [[0,1],[1,0]]
Output: [[0,1],[1,0],[1,1],[1,1],[1,0]]
Explanation: The explanation of this example is shown below:
Notice that 0 represents False and 1 represents 
True in the photo representing the Quad-Tree.

Example 2:



Input: grid = [[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0]]
Output: [[0,1],[1,1],[0,1],[1,1],[1,0],null,null,null,null,[1,0],[1,0],[1,1],[1,1]]
Explanation: All values in the grid are not the same.
 We divide the grid into four sub-grids.
The topLeft, bottomLeft and bottomRight 
each has the same value.
The topRight have different values so we divide 
it into 4 sub-grids where each has the same value.
Explanation is shown in the photo below:

 

Constraints:

n == grid.length == grid[i].length
n == 2x where 0 <= x <= 6
'''
'''
Time Complexity
Worst case:
Every cell is different, so the grid is subdivided 
until each cell is a leaf.

At each level, the function checks all cells in the 
current region using isAllSame, which is 

O(n ^2) for the root, 

O((n/2)^ 2) for each quadrant, and so on.

The total number of recursive calls is proportional to 
the number of nodes in the QuadTree, which is 

O(N) in the worst case.

However, due to the repeated checking of overlapping regions,
 the total work done is 

O(NlogN) in the worst case.

Best case:
All cells are the same, so only one call to isAllSame is
made for the whole grid: 
O(N).

Space Complexity
Auxiliary space:

The recursion depth is 

O(logn) (since the grid is halved each time).

The number of nodes in the tree is 

O(N) in the worst case (each cell becomes a leaf).

So, total space is 

O(N) for the tree nodes.

Aspect	                    Best Case	   Worst Case
Time Complexity	            O(N)	        O(NlogN)
Space Complexity	        O(N)	         O(N)
*/
function isAllSame(grid, x, y, n) {
    const val = grid[x][y];
    // The outer loop (i) is responsible for moving through 
    //  each row in the specified subgrid area. It starts
    //   at row index x and continues up to, but does not 
    //  include, x + n. This ensures it covers exactly n rows,
    //   starting from x.
    // For each row selected by the outer loop, the inner loop (j)
    //   moves through each column in that row, starting at 
    //  column index y and continuing up to, but not 
     // including, y + n. This covers exactly n columns in each row, 
    // starting from y.
     //The nested loops together visit every cell in the rectangular region of the grid that starts at position (x, y) and has size n x n.
     //For every single row in the subgrid, the inner loop checks every column in that row, so every cell in the subgrid is visited once
    for (let i = x; i < x + n; i++) {
        for (let j = y; j < y + n; j++) {
            if (grid[i][j] !== val) return false;
        }
    }
    return true;
}
/*
Base Case:

Calls isAllSame(grid, x, y, n).
If true, creates and returns a leaf node with value grid[x][y].

Recursive Case:
If not all values are the same, creates an internal node.
Subdivides the current region into four quadrants of size n/2 x n/2:
topLeft: (x, y)
topRight: (x, y + n/2)
bottomLeft: (x + n/2, y)
bottomRight: (x + n/2, y + n/2)
Recursively calls solve on each quadrant and 
assigns the results to the corresponding child nodes.

*/
function solve(grid, x, y, n) {
    
    if (isAllSame(grid, x, y, n)) {
        return new Node(Boolean(grid[x][y]), true)
    }
    else {
        //half is half the size, so you can split the 
        // current square into four equal smaller squares (quadrants)
        const half = n / 2;
        const root = new Node(true, false);
        //Starts at the same (x, y)
        //Covers rows x to x + half - 1 and columns y to y + half - 1
        root.topLeft = solve(grid, x, y, half);
        //Starts at (x, y + half)
        //Rows remain the same (x), columns start at y + half
        //Covers rows x to x + half - 1 and columns y + half to y + n - 1
        root.topRight = solve(grid, x, y + half, half);
        //Starts at (x + half, y)
        // Rows start at x + half, columns remain the same (y)
        // Covers rows x + half to x + n - 1 and columns y to y + half - 1
        root.bottomLeft = solve(grid, x + half, y, half);
        //Starts at (x + half, y + half)
        // Both rows and columns start at half offset from the original
        // Covers rows x + half to x + n - 1 and columns y + half to y + n - 1
        root.bottomRight = solve(grid, x + half, y + half, half);
        return root;

    }
}

var construct = function (grid) {
    return solve(grid, 0, 0, grid.length);
};

function printQuadTree(node, indent = "") {
    if (!node) return;
    if (node.isLeaf) {
        console.log(indent + `Leaf: val=${node.val}`);
    } else {
        console.log(indent + `Node:`);
        printQuadTree(node.topLeft, indent + "  topLeft-> ");
        printQuadTree(node.topRight, indent + " topRight-> ");
        printQuadTree(node.bottomLeft, indent + "bottomLeft-> ");
        printQuadTree(node.bottomRight, indent + "bottomRight-> ");
    }
}