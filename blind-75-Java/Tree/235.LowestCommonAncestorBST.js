/*
Given a binary search tree (BST) where all node
values are unique, and two nodes from the tree p and q,
return the lowest common ancestor (LCA) of the two nodes.

The lowest common ancestor between two nodes p and q
is the lowest node in a tree T such that both p and q
as descendants. The ancestor is allowed to be a descendant of itself.

Input: root = [5,3,8,1,4,7,9,null,2], p = 3, q = 8
Output: 5

Explanation: The LCA of nodes 3 and 4 is 3, since a node can 
be a descendant of itself.

Constraints:

2 <= The number of nodes in the tree <= 100.
-100 <= Node.val <= 100
p != q
p and q will both exist in the BST.

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

function lowestCommonAncestor(root, p, q) {
    let curr = root;
    while (curr) {
        if (p.val > curr.val && q.val > curr.val) {
            curr = curr.right;
        }
        else if (p.val < curr.val && q.val < curr.val) {
            curr = curr.left;
        }
        else {
            return curr;
        }
    }
    return null;
}