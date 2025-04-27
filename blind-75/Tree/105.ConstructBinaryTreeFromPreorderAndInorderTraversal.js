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

Find its index rootIndex in inorder using indexMap.

Calculate left subtree size:

leftSize = rootIndex - inStart.

Recursively build left subtree:

Preorder start for left subtree is preStart + 1 (next element after root).

Inorder start remains inStart.

Size is leftSize.

Recursively build right subtree:

Preorder start for right subtree is preStart + 1 + leftSize (skip root and left subtree).

Inorder start is rootIndex + 1.

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
function buildTree(preorder, inorder) {
    const indexMap = new Map();
    const nodeCount = inorder.length;
    // Map each value to its index in inorder traversal for quick lookup
    for (let i = 0; i < nodeCount; ++i) {
        indexMap.set(inorder[i], i);
    }
    /**
    * Recursive helper function to build the subtree.
    * 
    * @param {number} preStart - Start index in preorder array.
    * @param {number} inStart - Start index in inorder array.
    * @param {number} size - Number of nodes in the current subtree.
    * @return {TreeNode | null} Root node of the constructed subtree.
    */
    function buildSubTree(preStart, inStart, size) {
        if (size <= 0) return null;

        // Root value is the first element in preorder segment
        const rootValue = preorder[preStart];
        // Find root index in inorder traversal to split 
        // left and right subtrees
        const rootIndex = indexMap.get(rootValue);
        // Number of nodes in the left subtree
        const leftSize = rootIndex - inStart;
        // Recursively build left subtree
        /*
        preStart + 1:
                In the preorder array, the root is at preStart.
                 The next element (preStart + 1) is the root of the 
                 left subtree.

        inStart:
        The left subtree in inorder starts at the same inStart
         as the current subtree (since left elements come before
          the root in inorder).

        leftSize:
        The size of the left subtree is rootIndex - inStart
         (number of nodes between inStart and the root's position in inorder).
        */
        const leftSubtree = buildSubTree(preStart + 1, inStart, leftSize);
        // Recursively build right subtree
        /*
        preStart + 1 + leftSize:
            After skipping the root (preStart) and the left subtree
             (leftSize nodes), the right subtree's root starts
              at preStart + 1 + leftSize in the preorder array.

        rootIndex + 1:
            In the inorder array, the right subtree starts 
            immediately after the root (rootIndex + 1).

        size - 1 - leftSize:
            Total nodes in the current subtree = size.
            Subtract the root (1) and left subtree nodes (leftSize), 
            leaving size - 1 - leftSize nodes for the right subtree.

        */
        const rightSubtree = buildSubTree(preStart + 1 + leftSize, rootIndex + 1, size - 1 - leftSize);
        // Create root node with left and right children
        return new TreeNode(rootValue, leftSubtree, rightSubtree)
    }
    return buildSubTree(0, 0, nodeCount);
}