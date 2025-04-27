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
Root value is taken from postorder[postEnd] 
(last element in current postorder segment).

We calculate the size of left subtree as before.

For right subtree, the postorder segment ends 
at postEnd - 1 (just before the root).

For left subtree, the postorder segment ends at 
postEnd - (size - leftSize) 
because the right subtree size is size - 1 - leftSize.

Recursively build left and right subtrees accordingly.

postEnd: The index of the root node in the current 
postorder segment (last element of the current subtree's postorder slice).

inStart: The start index of the current subtree in the inorder array.

size: The total number of nodes in the current subtree.

rootIndex: The index of the root node in the inorder array.

leftSize: Number of nodes in the left subtree (rootIndex - inStart).

*/

function buildTree(inorder, postorder) {
    const indexMap = new Map();
    const nodeCount = inorder.length;
    // Map each value to its index in inorder traversal for quick lookup
    for (let i = 0; i < nodeCount; ++i) {
        indexMap.set(inorder[i], i);
    }
    /**
     * Recursive helper function to build the subtree.
     * 
     * @param {number} postEnd - End index in postorder array.
     * @param {number} inStart - Start index in inorder array.
     * @param {number} size - Number of nodes in the current subtree.
     * @return {TreeNode | null} Root node of the constructed subtree.
     */
    function buildSubTree(postEnd, inStart, size) {
        if (size <= 0) {
            return null;
        }
        // Root value is the last element in postorder segment
        const rootValue = postorder[postEnd];
        // Find root index in inorder traversal to split left and
        //  right subtrees
        const rootIndex = indexMap.get(rootValue);
        // Number of nodes in the left subtree
        const leftSize = rootIndex - inStart;
        // Recursively build left subtree
        // Left subtree's postorder segment ends at:
        //  postEnd - 1 - (size - 1 - leftSize)
        const leftSubtree = buildSubTree(postEnd - (size - leftSize), inStart, leftSize);
        // Right subtree's postorder segment ends at: postEnd - 1
        const rightSubtree = buildSubTree(postEnd - 1, rootIndex + 1, size - 1 - leftSize);
        // Create root node with left and right children
        return new TreeNode(rootValue, leftSubtree, rightSubtree);
    }
    return buildSubTree(nodeCount - 1, 0, nodeCount)
}