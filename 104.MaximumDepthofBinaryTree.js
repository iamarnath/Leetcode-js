/*
104. Maximum Depth of Binary Tree

Solution - https://leetcode.com/problems/maximum-depth-of-binary-tree/solutions/5186624/optimised/

https://leetcode.com/problems/maximum-depth-of-binary-tree/solutions/5186641/optimised-memoisation/


Description
Given the root of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

Example 1:

Input: root = [3,9,20,null,null,15,7]
Output: 3
Example 2:

Input: root = [1,null,2]
Output: 2

Constraints:

The number of nodes in the tree is in the range [0, 104].
-100 <= Node.val <= 100

*/
/*
Approach:
The function checks if the current node (root) is null. If it is, it means we have reached the end of a branch, so we return 0 to indicate a depth of 0.
If the current node is not null, we recursively call maxDepth on the left and right subtrees of the current node.
The maximum depth is calculated as 1 + Math.max(maxDepth(root.left), maxDepth(root.right)). This means we add 1 to the maximum depth of the left and right subtrees to get the depth of the current node.
The recursion continues until we reach the base case (null nodes) at the end of each branch.
Time Complexity:
The time complexity of this solution is O(n), where n is the number of nodes in the binary tree. This is because we visit each node exactly once during the recursive traversal.
In the worst case scenario, the binary tree is skewed (either completely left-skewed or right-skewed), and the recursion will go all the way down to the leaf nodes, visiting each node once. In the best case scenario, the binary tree is balanced, and the recursion will be evenly distributed among the left and right subtrees, still resulting in a time complexity of O(n).
Space Complexity:
The space complexity depends on the maximum depth of the binary tree. In the average case, when the tree is balanced, the space complexity is O(log n) due to the recursive calls on the call stack. However, in the worst case, when the tree is skewed, the space complexity becomes O(n) because the call stack will contain all the nodes in the tree.
The space used by the recursive calls on the call stack is proportional to the maximum depth of the tree. In a balanced tree, the maximum depth is approximately log n, while in a skewed tree, the maximum depth is n.


*/
/**
 * Definition for a binary tree node.

 */

function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
    if (root === null) {
        return 0;
    }
    // Recursively compute the depth of the left and right subtree
    // and return the greater one increased by 1 for the current node
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};

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
The function maxDepth takes a root node of the binary tree and an optional depthMap parameter, which is a Map used for memoization.
If the root is null, it means we have reached the end of a branch, so we return 0 to indicate a depth of 0.
Before recursively calculating the depth, we check if the root node's depth is already stored in the depthMap. If so, we return the stored depth.
If the depth is not found in the depthMap, we recursively call maxDepth on the left and right subtrees of the current node.
We calculate the current node's depth as 1 + Math.max(leftDepth, rightDepth), where leftDepth and rightDepth are the depths of the left and right subtrees, respectively.
We store the calculated depth of the current node in the depthMap using root as the key.
Finally, we return the calculated depth of the current node.
Time Complexity:
The time complexity of this optimized maxDepth function is O(n), where n is the number of nodes in the binary tree.
The memoization technique ensures that each node's depth is calculated only once, reducing redundant calculations and improving efficiency.
In the worst case, where the tree is skewed, the function will still visit each node once, resulting in a time complexity of O(n).
Space Complexity:
The space complexity of this optimized function is O(n) in the worst case, where n is the number of nodes in the binary tree.
The space is used for storing the depth of each node in the depthMap, which can grow linearly with the number of nodes in the tree.
Additionally, the recursive calls on the call stack will also consume space proportional to the height of the tree, which can be up to O(n) in the worst case for a skewed tree.

*/
//approach 2
var maxDepth2 = function(root, depthMap = new Map()) {
    if (root === null) {
        return 0;
    }

    if (depthMap.has(root)) {
        return depthMap.get(root);
    }

    let leftDepth = maxDepth(root.left, depthMap);
    let rightDepth = maxDepth(root.right, depthMap);

    let currentDepth = 1 + Math.max(leftDepth, rightDepth);
    depthMap.set(root, currentDepth);

    return currentDepth;
}


// Example usage:
let root1 = [1, null, 2];
let root2 = [3, 9, 20, null, null, 15, 7];

let tree1 = buildTreeFromArray(root1);
//console.log("tree1--",tree1);
let tree2 = buildTreeFromArray(root2);
//console.log("tree2--",tree2);
console.log(maxDepth(tree1));