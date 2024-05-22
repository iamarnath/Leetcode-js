/*
257. Binary Tree Paths

Solution - https://leetcode.com/problems/binary-tree-paths/editorial/

Description
Given the root of a binary tree, return all root-to-leaf paths in any order.

A leaf is a node with no children.

Example 1:
Input: root = [1,2,3,null,5]
Output: ["1->2->5","1->3"]
Example 2:

Input: root = [1]
Output: ["1"]
 

Constraints:

The number of nodes in the tree is in the range [1, 100].
-100 <= Node.val <= 100

*/
/*
Approach 

The approach is to use a depth-first search (DFS) to traverse the binary tree. The DFS is implemented using a recursive helper function findPath. This function takes a node and the current path as arguments. It adds the node's value to the current path and checks if the node is a leaf node. If it is, the current path is added to the result. If the node has children, the function recursively calls itself for the children, appending "->" to the current path.

The base case check for root is removed from the main function. Instead, the null check is moved inside the findPath helper function. This allows us to start the recursion directly from the root node without passing it as an argument.
The "->" is appended to the current path before recursing to the left and right children. This helps to avoid appending "->" to the last node in the path, as it is not needed for leaf nodes.
The helper function returns early when a leaf node is encountered, avoiding unnecessary function calls and improving performance.

Time Complexity:
The time complexity remains O(n), where n is the number of nodes in the binary tree. Each node is still visited once during the DFS traversal.
Space Complexity:
The space complexity is also O(n), where n is the number of nodes in the binary tree. The maximum depth of the recursion call stack can still be n in the worst case (when the tree is skewed to one side), and the result array can store up to n paths.

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

/**
 * @param {TreeNode} root
 * @return {string[]}
 */
var binaryTreePaths = function(root) {
    // Initialize an empty array to store the result
    const result = [];

    // Define a helper function to find the path
    function findPath(node, currentPath) {
        // If the current node is null, return
        if (!node) {
            return;
        }

        // Append the current node's value to the current path
        currentPath += node.val;

        // If the current node is a leaf node (both left and right children are null)
        if (!node.left && !node.right) {
            // Add the current path to the result
            result.push(currentPath);
            return;
        }

        // Append "->" to the current path
        currentPath += "->";

        // Recursively call findPath for the left child
        findPath(node.left, currentPath);

        // Recursively call findPath for the right child
        findPath(node.right, currentPath);
    };

    // Start the path finding from the root node with an empty path
    findPath(root, "");

    // Return the result
    return result;
};
let root2 = [1, 2, 3, null, 5];
let tree2 = buildTreeFromArray(root2);
console.log(binaryTreePaths(tree2));

