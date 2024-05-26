/*
1302. Deepest Leaves Sum

Solution - https://leetcode.com/problems/deepest-leaves-sum/solutions/5195524/optimisedbfs/


Description
Given the root of a binary tree, return the sum of values of its deepest leaves.

Example 1:
Input: root = [1,2,3,4,5,null,6,7,null,null,null,null,8]
Output: 15
Example 2:

Input: root = [6,7,8,2,7,1,3,9,null,1,4,null,null,null,5]
Output: 19

Constraints:

The number of nodes in the tree is in the range [1, 104].
1 <= Node.val <= 100
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

Approach to Find the Sum of the Deepest Leaves in a Binary Tree

The JavaScript function deepestLeavesSum calculates the sum of the deepest leaves in a binary tree using a level-order traversal approach with a queue. It iterates through the tree level by level, keeping track of the sum of the nodes at the current level. The final sum returned is the sum of the deepest leaves.

The key steps of the approach are:
If the root is null, return 0 as there are no nodes.
Initialize a queue with the root node.
While the queue is not empty:
Get the number of nodes at the current level and initialize currLevelSum to 0.
Process all nodes at the current level:
Remove the next node from the queue.
Add the node's value to currLevelSum.
If the node has a left child, add it to the queue for the next level.
If the node has a right child, add it to the queue for the next level.
After processing all nodes at the current level, update currLevelSum with the sum of the deepest leaves.
Return currLevelSum as the final result.

Time Complexity

The time complexity of this function is O(n), where n is the number of nodes in the binary tree. The function performs a level-order traversal, visiting each node once. In the worst-case scenario, the function traverses all nodes to find the deepest leaves.

Space Complexity
The space complexity of this function is O(n) in the worst case. This is because the function uses a queue to perform level-order traversal, potentially storing all nodes at a particular level before moving to the next level. The space required is proportional to the maximum number of nodes at any level, which could be all nodes in the tree in the case of a complete binary tree.
*/
function deepestLeavesSum(root) {
    // If the root is null, return 0 as there are no nodes.
    if (!root) {
        return 0;
    }
    // Initialize a queue to perform a level-order traversal of the tree.

    let q = [root];
    let currLevelSum = 0;
    // Perform a level-order traversal to find the deepest leaves.
    while (q.length != 0) {
        let nodesAtCurrLevel = q.length;
        currLevelSum = 0;
        // Process all nodes at the current level.
        for (let i = 0; i < nodesAtCurrLevel; i++) {
            // Get the next node from the queue.
            const node = q.shift();
            if (node) {
                // Accumulate the values of nodes at this level.
                currLevelSum += node.val;
                // If the node has a left child, add it to the queue for the next level.
                if (node.left) {
                    q.push(node.left);
                }
                if (node.right) {
                    q.push(node.right);
                }
            }
        }
    }
    return currLevelSum;
}

let root2 = [1, 2, 3, 4, 5, null, 6, 7, null, null, null, null, 8];
//root2 =  [6,7,8,2,7,1,3,9,null,1,4,null,null,null,5]
let tree2 = buildTreeFromArray(root2);

console.log(deepestLeavesSum(tree2))