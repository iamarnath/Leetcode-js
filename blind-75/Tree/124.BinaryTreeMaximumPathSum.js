/*
124. Binary Tree Maximum Path Sum
Given the root of a non-empty binary tree,
 return the maximum path sum of any non-empty path.

A path in a binary tree is a sequence of nodes where
 each pair of adjacent nodes has an edge connecting them.
  A node can not appear in the sequence more than once. 
  The path does not necessarily need to include the root.

The path sum of a path is the sum of the node's values in the path.

Input: root = [1,2,3]
Output: 6

Input: root = [-15,10,20,null,null,15,5,-5]
Output: 40

Explanation: The path is 15 -> 20 -> 5 with a sum of 15 + 20 + 5 = 40.

Constraints:

1 <= The number of nodes in the tree <= 1000.
-1000 <= Node.val <= 1000

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
// Initialize a global variable to hold the maximum path sum
let maxPathSumValue = -Infinity;
/**
 * Helper function to calculate the maximum path sum starting from the current node.
 * @param {TreeNode|null} node - The current node of the binary tree.
 * @return {number} The maximum sum from the current node down to any leaf.
 */

function maxPathSumDfs(node) {
    if (node === null) {
        return 0;
    }
    // Recursively compute max path
    //  sum of left subtree; ignore negative sums by taking max with 0
    const leftMax = Math.max(0, maxPathSumDfs(node.left));
    // Recursively compute max path sum of right subtree;
    //  ignore negative sums by taking max with 0
    const rightMax = Math.max(0, maxPathSumDfs(node.right));
    // Update global maxPathSumValue with 
    // the maximum sum including current node and both children
    maxPathSumValue = Math.max(maxPathSumValue, leftMax + rightMax + node.val);
    // Return max path sum going down from current node
    // to one of its subtrees
    return Math.max(leftMax, rightMax) + node.val;
}
/**
 * Main function to find the maximum path sum in the binary tree.
 * @param {TreeNode|null} root - The root of the binary tree.
 * @return {number} The maximum path sum in the binary tree.
 */
function maxPathSum(root) {
    maxPathSumValue = -Infinity; // Reset global max before computation
    maxPathSumDfs(root);
    return maxPathSumValue;
}

//let root1 = [1,2,3];
let root1 = [-15,10,20,null,null,15,5,-5]

let tree1 = buildTreeFromArray(root1);

console.log(maxPathSum(tree1))
