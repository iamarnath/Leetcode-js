/*
230. Kth Smallest Element In a Bst
Given the root of a binary search tree, and an integer k,
return the kth smallest value (1-indexed) in the tree.

A binary search tree satisfies the following constraints:

The left subtree of every node contains only nodes with keys 
less than the node's key.
The right subtree of every node contains only nodes with keys
 greater than the node's key.
Both the left and right subtrees are also binary search trees.

Input: root = [2,1,3], k = 1
Output: 1

Input: root = [4,3,5,2,null], k = 4
Output: 5

Constraints:

1 <= k <= The number of nodes in the tree <= 1000.
0 <= Node.val <= 1000

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


function dfs(node, arr) {
    if (!node) return;
    dfs(node.left, arr);
    arr.push(node.val);
    dfs(node.right, arr);
}

var kthSmallest = function(root, k) {
    const arr = [];
    dfs(root, arr);
    return arr[k - 1];
};

//let root1 = [3,1,4,null,2], k = 1;

let root1 = [5,3,6,2,4,null,null,1], k = 3;

let tree1 = buildTreeFromArray(root1);
console.log(kthSmallest(tree1,k))



// Morris Traversal

class Solution {
    /**
     * @param {TreeNode} root
     * @param {number} k
     * @return {number}
     */
    kthSmallest(root, k) {
        let curr = root;
    
        while (curr) {
            if (!curr.left) {
                k--;
                if (k === 0) return curr.val;
                curr = curr.right;
            } else {
                let pred = curr.left;
                while (pred.right && pred.right !== curr) 
                    pred = pred.right;
                
                if (!pred.right) {
                    pred.right = curr;
                    curr = curr.left;
                } else {
                    pred.right = null;
                    k--;
                    if (k === 0) return curr.val;
                    curr = curr.right;
                }
            }
        }
        return -1;
    }
}

