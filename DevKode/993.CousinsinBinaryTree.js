/*
993. Cousins in Binary Tree

Solution - https://leetcode.com/problems/cousins-in-binary-tree/solutions/5191350/optimised/

Description
Given the root of a binary tree with unique values and the values of two different nodes of the tree x and y, return true if the nodes corresponding to the values x and y in the tree are cousins, or false otherwise.

Two nodes of a binary tree are cousins if they have the same depth with different parents.

Note that in a binary tree, the root node is at the depth 0, and children of each depth k node are at the depth k + 1.

Example 1:

Input: root = [1,2,3,4], x = 4, y = 3
Output: false
Example 2:

Input: root = [1,2,3,null,4,null,5], x = 5, y = 4
Output: true
Example 3:

Input: root = [1,2,3,null,4], x = 2, y = 3
Output: false
 
Constraints:

The number of nodes in the tree is in the range [2, 100].
1 <= Node.val <= 100
Each node has a unique value.
x != y
x and y are exist in the tree.

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
Approach:
The function uses Depth-First Search (DFS) to traverse the binary tree and find the target nodes x and y.
It keeps track of the parent node and depth of each target node while traversing the tree.
If the parent nodes of the target nodes are different and their depths are the same, the function returns true, indicating that the nodes are cousins.
Time Complexity:
The time complexity of this function is O(n), where n is the number of nodes in the binary tree.
The DFS traversal visits each node once, and the operations within the traversal are constant time.
The function performs a single pass through all nodes in the tree to find the target nodes and their respective depths.
Space Complexity:
The space complexity is O(n) in the worst case, where n is the number of nodes in the binary tree.
The function uses additional space for the recursive call stack during the DFS traversal.
It also stores variables to keep track of the parent nodes and depths of the target nodes, which require additional space proportional to the height of the tree.
Overall, the space complexity is dominated by the recursive stack space and the variables used to track the target nodes and their depths.

*/
var isCousins = function (root, x, y) {
    // Variable to keep track of a target node's parent
    let parentNodeX;
    let parentNodeY;

    // Variables to keep track of each target node's depth
    let depthNodeX;
    let depthNodeY;
    function dfs(node, parent, depth) {
        if (!node) return;
        if (node.val === x) {
            parentNodeX = parent;
            depthNodeX = depth;
        }
        if (node.val === y) {
            parentNodeY = parent;
            depthNodeY = depth;
        }
        if (parentNodeX && parentNodeY) return; 
        // Recursive calls to search in the left and right subtrees, increasing depth by 1
        dfs(node.left, node, depth + 1);
        dfs(node.right, node, depth + 1);
    }
    dfs(root, null, 0);
    return parentNodeX != parentNodeY && depthNodeX === depthNodeY;
};
let root = [1,2,3,null,4,null,5], x = 5, y = 4

let tree2 = buildTreeFromArray(root);

console.log(isCousins(tree2, x, y))
