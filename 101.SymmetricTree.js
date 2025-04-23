/*
101. Symmetric Tree

Solution -https://leetcode.com/problems/symmetric-tree/solutions/5194302/optimisedrecursive/

https://leetcode.com/problems/symmetric-tree/solutions/5195424/optimisediterative/

Description
Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).

Example 1:

Input: root = [1,2,2,3,4,4,3]
Output: true
Example 2:

Input: root = [1,2,2,null,3,null,3]
Output: false
 

Constraints:

The number of nodes in the tree is in the range [1, 1000].
-100 <= Node.val <= 100
 

Follow up: Could you solve it both recursively and iteratively?

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
Approach to Check if a Binary Tree is Symmetric
The JavaScript function isSymmetric determines if a binary tree is symmetric by comparing the left and right subtrees of the root using a helper function dfs. The dfs function recursively checks if the corresponding nodes in the left and right subtrees are symmetric by comparing their values and positions.
Time Complexity
The time complexity of this approach is O(n), where n is the number of nodes in the binary tree. The function dfs is called on each pair of corresponding nodes in the left and right subtrees, and each node is visited once. In the worst-case scenario, the function traverses all nodes to determine symmetry.
Space Complexity
The space complexity of this approach is O(n) in the worst case. This is because the function dfs makes recursive calls that add frames to the call stack proportional to the height of the tree. In the worst case, where the tree is skewed, the space complexity could be O(n) if the tree resembles a linked list.



*/
//recursive
const dfs = (root1, root2) => {
    if (root1 === root2) {
        return true;
    }
    if (root1 == null || root2 == null || root1.val != root2.val) {
        return false;
    }
    return dfs(root1.left, root2.right) && dfs(root1.right, root2.left);
}
var isSymmetric = function (root) {
    return dfs(root.left, root.right);
};
/*
Approach to Check if a Binary Tree is Symmetric (Iterative)
The JavaScript function isSymmetric checks if a binary tree is symmetric using an iterative approach with a queue. It compares the left and right subtrees of the root by adding the left and right children of the root to a queue. It then processes the queue by removing pairs of nodes and comparing their values and positions. If the corresponding nodes are not symmetric, the function returns false. If all pairs of nodes are symmetric, the function returns true.

Time Complexity
The time complexity of this iterative approach is O(n), where n is the number of nodes in the binary tree. The function visits each node once and performs constant time operations on each node.

Space Complexity
The space complexity is O(n) in the worst case, where the tree is skewed, and all nodes need to be stored in the queue before processing them. In the best case, when the tree is balanced, the space complexity is O(log n), as the maximum size of the queue will be proportional to the number of nodes at the deepest level.

The key steps of the iterative approach are:
If the root is null, return true since an empty tree is considered symmetric.
Initialize a queue with the left and right children of the root.
While the queue is not empty:
Remove the first two nodes from the queue and assign them to left and right.
If both left and right are null, continue to the next pair of nodes.
If only one of left or right is null, or if their values are not equal, return false.
If both left and right are not null and their values are equal, add their children to the queue in the following order: left.left, right.right, left.right, right.left.
If the queue becomes empty and all pairs of nodes were found to be symmetric, return true.


*/
var isSymmetricIterative = function (root) {

    if (!root) {
        return true;
    }

    /* This allows adding null 
    elements to the queue */
    /* Initially, add left and 
right nodes of root */
    let queue = [root.left, root.right];
    while (queue.length > 0) {
        /* Remove the front 2 nodes to
       check for equality */
        let left = queue.shift();
        let right = queue.shift();
        /* If both are null, continue and check
       for further elements */
        if (!left && !right) {
            continue;
        }
        /* If only one is null---inequality, return false */
        if (!left || !right || left.val != right.val) {
            return false;
        }
        /* Note the order of insertion of elements
    to the queue :
    1) left child of left subtree
    2) right child of right subtree
    3) right child of left subtree
    4) left child of right subtree */
    //left of left and right of right is equidistant from mirror
        queue.push(left.left);
        queue.push(right.right);
    //right of left and left of right is equidistant from mirror
        queue.push(left.right);
        queue.push(right.left);
    }
    return true;
};

let root2 = [1, 2, 2, 3, 4, 4, 3];
//root2 = [1,2,2,null,3,null,3]
let tree2 = buildTreeFromArray(root2);

console.log(isSymmetricIterative(tree2))