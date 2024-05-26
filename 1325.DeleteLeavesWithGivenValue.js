/*
1325. Delete Leaves With a Given Value

Solution - https://leetcode.com/problems/delete-leaves-with-a-given-value/solutions/5211764/optimised/

Description-

Given a binary tree root and an integer target, delete all the leaf nodes with value target.

Note that once you delete a leaf node with value target, if its parent node becomes a leaf node and has the value target, it should also be deleted (you need to continue doing that until you cannot).

Example 1:

Input: root = [1,2,3,2,null,2,4], target = 2
Output: [1,null,3,null,4]
Explanation: Leaf nodes in green with value (target = 2) are removed (Picture in left). 
After removing, new nodes become leaf nodes with value (target = 2) (Picture in center).
Example 2:

Input: root = [1,3,3,3,2], target = 3
Output: [1,3,null,null,2]
Example 3:

Input: root = [1,2,null,2,null,2], target = 2
Output: [1]
Explanation: Leaf nodes in green with value (target = 2) are removed at each step.
 
Constraints:

The number of nodes in the tree is in the range [1, 3000].
1 <= Node.val, target <= 1000

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
Approach to removeLeafNodes Function

The removeLeafNodes function takes a binary tree represented by its root node and a target value as input. It recursively traverses the tree and removes all leaf nodes (nodes with no children) that have a value equal to the target value. The approach involves the following steps:
If the current node is null, return null.
Recursively call removeLeafNodes on the left subtree and update the left pointer of the current node.
Recursively call removeLeafNodes on the right subtree and update the right pointer of the current node.
If the current node is a leaf node (both left and right are null) and its value is equal to the target value, return null to remove the node.
Otherwise, return the current node.

Time Complexity

Let N be the number of nodes in the binary tree.
The time complexity of this function is O(N), where N is the number of nodes in the binary tree.
The function visits each node exactly once during the recursive traversal.
For each node, it performs constant-time operations, such as checking for null, comparing values, and updating pointers.
Therefore, the overall time complexity is linear in terms of the number of nodes in the binary tree.

Space Complexity

The space complexity of this function is O(H), where H is the height of the binary tree.
The function uses recursion, and the maximum depth of the recursive calls is equal to the height of the binary tree.
In the worst case, when the binary tree is skewed (i.e., all nodes have either a left child or a right child), the height of the tree becomes N, and the space complexity becomes O(N).
However, in a balanced binary tree, the height is approximately log N, and the space complexity is O(log N).


*/
var removeLeafNodes = function (root, target) {
    if (!root) {
        return null;
    }
    root.left = removeLeafNodes(root.left, target);
    root.right = removeLeafNodes(root.right, target);
  // Check if the current node has become a leaf node with the value equal to target.
  // If so, remove this node by returning null; otherwise, return the current node.
    if (!root.left && !root.right && root.val === target) {
        return null;
    }
    return root;
};


//let root = [1, 2, 3, 2, null, 2, 4], target = 2;

root = [1,3,3,3,2], target = 3

let tree = buildTreeFromArray(root);

console.log(removeLeafNodes(tree, target));