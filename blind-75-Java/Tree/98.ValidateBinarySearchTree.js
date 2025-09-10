/*
98. Validate Binary Search Tree

Given the root of a binary tree, return true if it is a valid 
binary search tree, otherwise return false.

A valid binary search tree satisfies the following constraints:

The left subtree of every node contains only nodes with keys
 less than the node's key.
The right subtree of every node contains only nodes with keys
 greater than the node's key.
Both the left and right subtrees are also binary search trees.

Input: root = [2,1,3]
Output: true

Input: root = [1,2,3]
Output: false

Explanation: The root node's value is 1 but its left child's value is 2 which is greater than 1.

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

function valid(node, left, right) {
    if (node === null) {
        return true;
    }
    if (!(left < node.val && node.val < right)) {
        return false;
    }
    return (valid(node.left, left, node.val) && valid(node.right, node.val, right));
}
var isValidBST = function(root) {
     return valid(root, -Infinity, Infinity);
};

function isValidBST(root) {
    const stack = [];
    let prev = -Infinity;
    let current = root;

    while (stack.length > 0 || current !== null) {
        // Go as left as possible
        while (current !== null) {
            stack.push(current);
            current = current.left;
        }

        current = stack.pop();

        // If current node's value is not greater than previous, invalid BST
        if (current.val <= prev) {
            return false;
        }
        prev = current.val;

        // Move to right subtree
        current = current.right;
    }

    return true;
}

/*
Certainly! Here's an alternative approach to validate a Binary 
Search Tree (BST) using inorder traversal logic.

Idea: Inorder Traversal of a BST is Sorted
When you do an inorder traversal (left → root → right) on a BST,
 the node values should appear in strictly increasing order.

So, we can traverse the tree inorder and check if the 
current node's value is greater than the previous node's value.

If not, the tree is not a valid BST.

*/
let root1 = [3, 9, 20, null, null, 15, 7];

let tree1 = buildTreeFromArray(root1);

levelOrder(tree1)


class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function checkBST(root) {
  const inOrderList = [];
  helper(root, inOrderList);
  
  if (inOrderList.length === 0) return true; // Empty tree is BST
  
  let isBST = true;
  let prev = inOrderList[0];
  
  for (let i = 1; i < inOrderList.length; i++) {
    if (inOrderList[i] <= prev) {
      isBST = false;
      break; // Optimization: exit early if invalid
    }
    prev = inOrderList[i];
  }
  return isBST;
}

function helper(node, arr) {
  if (!node) return;
  helper(node.left, arr);
  arr.push(node.val);
  helper(node.right, arr);
}
