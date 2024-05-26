/*
226. Invert Binary Tree

Solution - https://leetcode.com/problems/invert-binary-tree/solutions/5193888/optimised/

Description
Given the root of a binary tree, invert the tree, and return its root.

Example 1:

Input: root = [4,2,7,1,3,6,9]
Output: [4,7,2,9,6,3,1]
Example 2:

Input: root = [2,1,3]
Output: [2,3,1]
Example 3:

Input: root = []
Output: []

Constraints:

The number of nodes in the tree is in the range [0, 100].
-100 <= Node.val <= 100
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

Approach to Invert a Binary Tree
The provided JavaScript function invertTree uses a recursive approach to invert a binary tree. It defines a helper function dfs that traverses the tree in a depth-first manner and swaps the left and right children of each node. The function starts from the root node and recursively inverts the left and right subtrees.
Time Complexity
The time complexity of inverting a binary tree using this approach is O(n), where n is the number of nodes in the tree. This is because the function visits each node once and performs a constant amount of work (swapping the children) at each node.
Space Complexity
The space complexity of this function is also O(n) in the worst-case scenario. This is due to the recursive nature of the function, which can potentially lead to a recursive call stack with a depth equal to the height of the tree. In the worst case, where the tree is skewed (essentially a linked list), the space complexity could be O(n).

*/
function invertTree(root) {
    // Recursive function to traverse the tree and swap children
    const dfs = (node)=>{
        if(node === null){
            return
        }
        [node.left,node.right] = [node.right,node.left];
        dfs(node.left); // Recursively invert the left subtree
        dfs(node.right);// Recursively invert the right subtree
    }
    dfs(root); // Start inverting from the root node
    return root;
}
let root2 = [4,2,7,1,3,6,9];

let tree2 = buildTreeFromArray(root2);
console.log(invertTree(tree2))