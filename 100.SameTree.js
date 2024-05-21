/*
100. Same Tree

Solution - https://leetcode.com/problems/same-tree/solutions/5186681/optimised/

Description
Given the roots of two binary trees p and q, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

Example 1:

Input: p = [1,2,3], q = [1,2,3]
Output: true
Example 2:

Input: p = [1,2], q = [1,null,2]
Output: false
Example 3:

Input: p = [1,2,1], q = [1,1,2]
Output: false

Constraints:

The number of nodes in both trees is in the range [0, 100].
-104 <= Node.val <= 104

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
The optimized isSameTree function first checks if both p and q are null. If they are both null, it returns true, indicating that the trees are the same.
It then checks if either p or q is null, or if the values of the current nodes p.val and q.val are not equal. If any of these conditions are met, it returns false, indicating that the trees are not the same.
If the values are equal and both nodes are not null, the function recursively checks the left and right subtrees of pandq` to determine if the trees are the same.
The function returns true only if all corresponding nodes in both trees are the same.
Time Complexity:

The time complexity of this isSameTree function is O(n), where n is the total number of nodes in the smaller of the two input trees.
The function compares the values of each corresponding node in the two trees and recursively traverses both trees in a depth-first manner.
In the worst-case scenario, where both trees are identical, the function will need to traverse all nodes to confirm their equality.

Space Complexity:

The space complexity of this function is O(n) in the worst case, where n is the total number of nodes in the smaller of the two input trees.
The space complexity is determined by the recursive calls on the call stack as the function traverses the trees.
In the worst-case scenario, the function may need to store the recursive calls for each node in both trees, leading to a space complexity proportional to the height of the smaller tree.


*/
var isSameTree = function (p, q) {
    // Check if both nodes are null, which implies that we've reached the end of both trees.
    if (!p && !q) return true;
    // If one of the nodes is null or if the values of the nodes do not match, the trees aren't the same.
    if (!p || !q || p.val !== q.val) {
        return false;
    }
    // Recursively check the left and right subtrees.
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};


let p = [1, 2, 3], q = [1, 2, 3];
p = [1, 2], q = [1, null, 2];
let treep = buildTreeFromArray(p);
//console.log("tree1--",tree1);
let treeq = buildTreeFromArray(q);

console.log(isSameTree(treep, treeq))