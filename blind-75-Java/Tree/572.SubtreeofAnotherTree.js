/*
Given the roots of two binary trees root and subRoot,
 return true if there is a subtree of root with the same
  structure and node values of subRoot and false otherwise.

A subtree of a binary tree tree is a tree that consists 
of a node in tree and all of this node's descendants.
 The tree tree could also be considered as a subtree of itself.

Input: root = [1,2,3,4,5], subRoot = [2,4,5]
Output: true

Input: root = [1,2,3,4,5,null,null,6], subRoot = [2,4,5]
Output: false
0 <= The number of nodes in both trees <= 100.
-100 <= root.val, subRoot.val <= 100


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

var isSameTree = function (root, subRoot) {
    // Check if both nodes are null, which implies that we've reached the end of both trees.
    if (!root && !subRoot) return true;
    // If one of the nodes is null or if the values of the nodes do not match, the trees aren't the same.
    if (!root || !subRoot || root.val !== subRoot.val) {
        return false;
    }
    // Recursively check the left and right subtrees.
    return isSameTree(root.left, subRoot.left) && isSameTree(root.right, subRoot.right);
};
/*
Line 1: if (!subRoot) return true;
Handles empty subtree case
A null subtree (subRoot) is technically a subtree of any tree
 (including null root), per problem constraints.

Line 2: if (!root) return false;
Handles empty main tree case
If root is null but subRoot isn't, there's no possible match.

Line 3: if (isSameTree(root, subRoot)) return true;
Check for exact match at current nodes
Uses the helper function isSameTree to compare:

Node values

Tree structure (left/right children must match recursively)

Line 4: return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
Recursive exploration
If no match at current node, check if subRoot exists in:

Left subtree (root.left)

Right subtree (root.right)

Uses logical OR (||) to return true if either subtree contains subRoot.

*/
function isSubtree (root,subRoot){
    // Case 1: If subRoot is null, it's a subtree of any tree 
    // (including null root)
    if(!subRoot){
        return true;
    }
    // Case 2: If root is null but subRoot isn't, no possible match
    if(!root){
        return false;
    }
    // Case 3: Check if current root and subRoot form identical trees
    if(isSameTree(root,subRoot)){
        return true;
    }
    // Case 4: Recursively check if subRoot exists in left or right subtrees
    return (isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot));

};