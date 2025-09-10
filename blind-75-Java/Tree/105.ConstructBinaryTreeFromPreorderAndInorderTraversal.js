/*
105. Construct Binary Tree From Preorder And Inorder Traversal
You are given two integer arrays preorder and inorder.

preorder is the preorder traversal of a binary tree
inorder is the inorder traversal of the same tree
Both arrays are of the same size and consist of unique values.
Rebuild the binary tree from the preorder and inorder traversals and return its root.

Input: preorder = [1,2,3,4], inorder = [2,1,3,4]
Output: [1,2,3,null,null,null,4]

Input: preorder = [1], inorder = [1]
Output: [1]

Constraints:

1 <= inorder.length <= 1000.
inorder.length == preorder.length
-1000 <= preorder[i], inorder[i] <= 1000

*/

function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

function buildTreeFromArray(arr, index = 0) {
    if (index >= arr.length || arr[index] === null) {
        return null;
    }
    let node = new TreeNode(arr[index]);
    node.left = buildTreeFromArray(arr, 2 * index + 1);
    node.right = buildTreeFromArray(arr, 2 * index + 2);
    return node;
}
/*
The first element in the preorder array is always the root of the tree
 (or subtree).

Using the root value, you can find its position in the inorder array.

Elements to the left of the root in inorder belong to the left subtree.

Elements to the right belong to the right subtree.

Recursively apply the same logic to build left and right subtrees.

Problem Recap
You are given two arrays:

preorder: Nodes visited in root → left → right order.

inorder: Nodes visited in left → root → right order.

Goal: Rebuild the original binary tree from these traversals.

Key Points
The first element in the preorder array is always the root of the tree (or subtree).

Using the root value, you can find its position in the inorder array.

Elements to the left of the root in inorder belong to the left subtree.

Elements to the right belong to the right subtree.

Recursively apply the same logic to build left and right subtrees.

Detailed Steps
Create a map (indexMap) to store the index of each value in the inorder array for O(1) lookups.

Define a recursive function buildSubTree(preStart, inStart, size):

preStart: Starting index in preorder array for current subtree.

inStart: Starting index in inorder array for current subtree.

size: Number of nodes in current subtree.

Base case:
If size is 0 or less, return null (no subtree).

Find the root:

The root value is preorder[preStart].

Find its index inOrderRootIndex in inorder using indexMap.

Calculate left subtree size:

leftSize = inOrderRootIndex - inStart.

Recursively build left subtree:

Preorder start for left subtree is preStart + 1 (next element after root).

Inorder start remains inStart.

Size is leftSize.

Recursively build right subtree:

Preorder start for right subtree is preStart + 1 + leftSize (skip root and left subtree).

Inorder start is inOrderRootIndex + 1.

Size is size - 1 - leftSize (total size minus root and left subtree).

Create and return the root node with left and right children.

Visualization Example
For:

js
preorder = [3, 9, 20, 15, 7]
inorder = [9, 3, 15, 20, 7]
Root is 3 (first preorder element).

Inorder index of 3 is 1.

Left subtree inorder: `` (size = 1)

Right subtree inorder: `[15,ize = 3)

Recursively build left and right subtrees similarly.

Summary

*/

/*
The time and space complexity of the buildTree function (constructing a binary tree from preorder and inorder traversals using a hashmap for index lookups) is as follows:

Time Complexity
O(N), where N is the number of nodes in the tree.

Why:

Each node is processed exactly once to create the tree node.

The use of a hashmap (indexMap) allows for constant-time lookup of the root index in the inorder array, avoiding repeated O(N) searches.

Thus, the entire tree is built in a single pass over the nodes.

Space Complexity
O(N)

Why:

The hashmap (indexMap) stores N entries (one for each node value).

The recursion stack will be O(N) in the worst case (completely skewed tree), but O(log N) for a balanced tree.

The total space is dominated by the hashmap and recursion stack, both O(N

*/
/*
Step-by-Step Construction
Initial Setup
The first element of preorder is always the root.

inorder divides left and right subtrees relative to this root.

Iterative Breakdown
First Call

preorder = 3 ⇒ root

Index of 3 in inorder: 1

Left Subtree: inorder[0..0] ⇒

Right Subtree: inorder[2..4] ⇒

Tree so far:

text
  3
 / \
?   ?
Build Left Subtree (for root 3)

preorder = 9 ⇒ root of left

Index of 9 in inorder: 0

Left/Right Subtree: none (base case)

Tree now:

text
  3
 / \
9   ?
Build Right Subtree (for root 3)

preorder = 20 ⇒ root of right

Index of 20 in inorder: 3

Left Subtree: inorder[2..2] ⇒

Right Subtree: inorder[4..4] ⇒

Tree so far:

text
  3
 / \
9   20
    / \
   ?   ?
Build Left Subtree (for root 20)

preorder = 15 ⇒ root

Index of 15 in inorder: 2

Left/Right Subtree: none (base case)

Tree now:

text
    3
   / \
  9   20
      / \
    15   ?
Build Right Subtree (for root 20)

preorder = 7 ⇒ root

Index of 7 in inorder: 4

Left/Right Subtree: none (base case)

Final Tree:

text
    3
   / \
  9   20
      / \
    15   7
Final Tree Structure
The resulting binary tree is:

text
    3
   / \
  9   20
      / \
    15   7
Traversals for Verification
Preorder (Root-Left-Right): 3, 9, 20, 15, 7

Inorder (Left-Root-Right): 9, 3, 15, 20, 7

This matches the initial traversals provided, confirming the tree was built correctly.

Visualization Table
Step	Preorder Index	Root Value	Inorder Range	Left Subtree Range	Right Subtree Range
1	0	3	0–4	0–0	2–4
2	1	9	0–0	-	-
3	2	20	2–4	2–2	4–4
4	3	15	2–2	-	-
5	4	7	4–4	-	-


*/

var buildTree = function(preorder, inorder) {
    // Create a map to quickly find the index of any value in the inorder array.
    let mp = new Map();

    // Fill hashmap: value -> its index in the inorder traversal.
    for (let i = 0; i < inorder.length; i++) {
        mp.set(inorder[i], i);
    }

    // Mutable wrapper to simulate a "reference" to the current index in preorder.
    // This lets all recursive calls share and update the same index.
    let preStart = { value: 0 };

    // Recursively build a subtree that corresponds to inorder[inStart..inEnd].
    function construct(preorder, inorder, inStart, inEnd, preStart) {
        // Base case: no elements in this inorder slice -> no node.
        if (inStart > inEnd) return null;

        // The next element in preorder is the root of the current subtree.
        let rootVal = preorder[preStart.value];

        // Advance the preorder pointer for the next recursive calls.
        preStart.value++;

        // Find the root's position in inorder to split left/right subtrees.
        let inOrderRootIndex = mp.get(rootVal);

        // Create the current root node.
        let root = new TreeNode(rootVal);

        // Build the left subtree from the inorder slice left of inOrderRootIndex.
        //This constructs the left child (and all its descendants) 
        // for the current node.
        //It uses the portion of the inorder array to the left of 
        // the current root's index, i.e., from inStart to inOrderRootIndex - 1.
        //The overload of preStart ensures the preorder 
        // traversal keeps progressing as nodes are consumed.
        root.left = construct(preorder, inorder, inStart, inOrderRootIndex - 1, preStart);

        // Build the right subtree from the inorder slice right of inOrderRootIndex.
        //This constructs the right child (and all its descendants) for the current node.
        //It uses the portion of the inorder array to the right 
        // of the current root's index, i.e., from inOrderRootIndex + 1 to inEnd.
        //preStart continues to track the current position 
        // in preorder as new nodes are created.
        root.right = construct(preorder, inorder, inOrderRootIndex + 1, inEnd, preStart);

        // Return the constructed subtree rooted at 'root'.
        return root;
    }

    // Start constructing using the full inorder range.
    return construct(preorder, inorder, 0, inorder.length - 1, preStart);
};
// using 4 indices
function buildTree(preorder, inorder) {
    // Build a map: value -> index in inorder for O(1) lookups
    let mp = new Map();
    for (let i = 0; i < inorder.length; i++) {
        mp.set(inorder[i], i);
    }

    function construct(preStart, preEnd, inStart, inEnd) {
        // Base case: empty range
        if (preStart > preEnd || inStart > inEnd) {
            return null;
        }

        // Root is always the first element in the preorder slice
        let rootVal = preorder[preStart];
        let root = new TreeNode(rootVal);

        // Find root index in inorder
        let inRootIndex = mp.get(rootVal);

        // Count of nodes in left subtree
        let leftSize = inRootIndex - inStart;

        // Build left subtree:
        // Preorder slice: preStart+1 .. preStart+leftSize
        // Inorder slice:  inStart .. inRootIndex-1
        root.left = construct(
            preStart + 1,
            preStart + leftSize,
            inStart,
            inRootIndex - 1
        );

        // Build right subtree:
        // Preorder slice: preStart+leftSize+1 .. preEnd
        // Inorder slice:  inRootIndex+1 .. inEnd
        root.right = construct(
            preStart + leftSize + 1,
            preEnd,
            inRootIndex + 1,
            inEnd
        );

        return root;
    }

    return construct(0, preorder.length - 1, 0, inorder.length - 1);
}

 preorder = [3,9,20,15,7], inorder = [9,3,15,20,7];