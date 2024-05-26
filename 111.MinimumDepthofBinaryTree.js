/*
111. Minimum Depth of Binary Tree

Solution -https://leetcode.com/problems/minimum-depth-of-binary-tree/solutions/5194037/optimised1/
using level order traversal
https://leetcode.com/problems/minimum-depth-of-binary-tree/solutions/5194074/optimised2/

Description
Given a binary tree, find its minimum depth.

The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.

Note: A leaf is a node with no children.

Example 1:

Input: root = [3,9,20,null,null,15,7]
Output: 2
Example 2:

Input: root = [2,null,3,null,4,null,5,null,6]
Output: 5

Constraints:

The number of nodes in the tree is in the range [0, 105].
-1000 <= Node.val <= 1000

*/

function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

// function buildTreeFromArray(arr, index = 0) {
//     if (index >= arr.length || arr[index] === null) {
//         return null;
//     }
//     let node = new TreeNode(arr[index]);
//     node.left = buildTreeFromArray(arr, 2 * index + 1);
//     node.right = buildTreeFromArray(arr, 2 * index + 2);

//     return node;
// }
/*
Approach to Find Minimum Depth of a Binary Tree
The JavaScript function minDepth calculates the minimum depth of a binary tree using a recursive approach. It checks for different scenarios where the current node has no left child, no right child, or both children. It recursively calculates the minimum depth by considering the minimum depth of the left and right subtrees.

Time Complexity
The time complexity of this function is O(n), where n is the number of nodes in the binary tree. In the worst-case scenario, the function visits each node once, and the recursive calls traverse the entire tree. The time complexity is linear with respect to the number of nodes in the tree.

Space Complexity
The space complexity of this function is O(h), where h is the height of the binary tree. This is because the function makes recursive calls that add frames to the call stack proportional to the height of the tree. In the worst case, where the tree is skewed, the space complexity could be O(n) if the tree resembles a linked list.

*/
var minDepth = function (root) {
    if (!root) {
        return 0;
    }
    if (!root.left) {
        return 1 + minDepth(root.right);
    }
    if (!root.right) {
        return 1 + minDepth(root.left);
    }
    return 1 + Math.min(minDepth(root.left), minDepth(root.right))
}
/*

Approach to Find Minimum Depth of a Binary Tree (Alternative Implementation)
The JavaScript function minDepth2 calculates the minimum depth of a binary tree using a level-order traversal approach with a queue. It iterates through the tree level by level, incrementing the depth until a leaf node is encountered, at which point it returns the current depth.
Time Complexity
The time complexity of this function is O(n), where n is the number of nodes in the binary tree. The function performs a level-order traversal, visiting each node once. In the worst-case scenario, the function traverses all nodes to find the minimum depth.
Space Complexity
The space complexity of this function is O(n) in the worst case. This is because the function uses a queue to perform level-order traversal, potentially storing all nodes at a particular level before moving to the next level. The space required is proportional to the maximum number of nodes at any level, which could be all nodes in the tree in the case of a complete binary tree.

*/
var minDepth2 = function (root) {
    if (!root) {
        return 0;
    }
    let depth = 1;
    let q = [];
    q.push(root);
    // Level order traversal
    while (q.length != 0) {
        let size = q.length;
        for (let i = 0; i < size; i++) {
            let node = q.shift();
            // If a leaf node is found just return depth
            if (!node.left && !node.right) {
                return depth;
            }
            if (node.left) {
                q.push(node.left);
            }
            if (node.right) {
                q.push(node.right);
            }
        }
        depth++;
    }
    return depth;
};
let root2 = [2, null, 3, null, 4, null, 5, null, 6];

//root2 = [2,null,3,null,4,null,5,null,6]

let tree2 = buildTreeFromArray(root2);
console.log(minDepth2(tree2))