/*
Given two integer arrays inorder and postorder where inorder
is the inorder traversal of a binary tree and postorder
is the postorder traversal of the same tree,
construct and return the binary tree.

Input: inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
Output: [3,9,20,null,null,15,7]

Input: inorder = [-1], postorder = [-1]
Output: [-1]

1 <= inorder.length <= 3000
postorder.length == inorder.length
-3000 <= inorder[i], postorder[i] <= 3000
inorder and postorder consist of unique values.
Each value of postorder also appears in inorder.
inorder is guaranteed to be the inorder traversal of the tree.
postorder is guaranteed to be the postorder traversal of the tree.

*/

/*
Step 1: Find the Root
The last element in postorder is always the root.

→ Root = 3

text
      3
Step 2: Split Inorder Array
Find 3 in inorder: index 1

Left subtree inorder: ``

Right subtree inorder: [15, 20, 7]

Step 3: Split Postorder Arrays for Left and Right
For left subtree (size = 1): left postorder = ``

For right subtree (size = 3): right postorder = [15, 7, 20]

Step 4: Build Left Subtree
Inorder: ``

Postorder: ``

Root is last of postorder: 9

text
      3
     /
    9
Step 5: Build Right Subtree
Inorder: [15, 20, 7]

Postorder: [15, 7, 20]

Root is 20

Index in inorder: 1

Left: , right: 

Left postorder: , right postorder: 

text
      3
     / \
    9  20
      /  \
    15    7
Final Tree Structure
text
      3
     / \
    9  20
       / \
     15   7
Detailed Steps Table
Subtree	Inorder	Postorder	Root	Left Children	Right Children
Whole tree	9,3,15,20,7	9,15,7,20,3	3	in: 	in: 
Left of 3	9	9	9	- (none)	- (none)
Right of 3	15,20,7	15,7,20	20	in:	in: 
Left of 20	15	15	15	- (none)	- (none)
Right of 20	7	7	7	- (none)	- (none)
Each recursive split divides the inorder and postorder arrays to find subtrees and attaches them as left and right children to the new root node identified at each recursion level.

Visualization tools, like VisuAlgo, allow you to input such arrays and see an animation of this process step-by-step.

*/
class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

//Defines a recursive function to build the binary tree 
// from traversal arrays within specified subarray indices, using a map (indexMap) for quick index lookup.
function buildBT(inorder, postorder, inStart, inEnd, postStart, postEnd,indexMap) {
    //Base case: If the current subtree’s start index is
    //  past its end (empty subtree), return null.
    if (inStart > inEnd) {
        return null;
    }
    //The last element in the current postorder segment 
    // is always the root of the current (sub)tree.
    const rootVal = postorder[postEnd];
    //Create a new tree node for the root value just found.
    const root = new TreeNode(rootVal);
    //Find the index of root value in the inorder array using the map for O(1) time.
    let inOrderRootIndex = indexMap.get(rootVal);
    //Calculate the sizes of the left and right subtrees based on inorder index:
    //number of nodes in the left subtree.
    const leftSize = inOrderRootIndex - inStart;
    //number of nodes in the right subtree.
    const rightSize = inEnd - inOrderRootIndex;
    //Recursively build the left subtree:
    // Inorder: from inStart to inOrderRootIndex - 1
    // Postorder: from postStart to postStart + leftSize - 1
    // Pass along the indexMap.
    root.left = buildBT(inorder, postorder, inStart, inOrderRootIndex - 1, postStart, postStart + leftSize - 1,indexMap);
    //Recursively build the right subtree:
    // Inorder: from inOrderRootIndex + 1 to inEnd
    // Postorder: from postEnd - rightSize to postEnd - 1
    // Pass along the indexMap.
    root.right = buildBT(inorder, postorder, inOrderRootIndex + 1, inEnd, postEnd - rightSize, postEnd - 1,indexMap);

    return root;
}

var buildTree = function(inorder, postorder) {
    const n = postorder.length;
    //Edge case: If either traversal is empty, return null as there is no tree.
    if (n === 0) return null;
    const indexMap = new Map();
    const nodeCount = inorder.length;
    for (let i = 0; i < nodeCount; ++i) {
        indexMap.set(inorder[i], i);
    }
    //Build a Map from value to its index in inorder for O(1) lookups during recursion.
   //(inorder, postorder, inStart, inEnd, postStart, postEnd,indexMap)
    return buildBT(inorder, postorder, 0, n - 1, 0, n - 1,indexMap);
}


// Input: inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
// Output: [3,9,20,null,null,15,7]