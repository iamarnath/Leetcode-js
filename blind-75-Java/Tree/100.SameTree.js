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
If the values are equal and both nodes are not null, the function recursively checks the left and right subtrees of p and q` to determine if the trees are the same.
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
/*
Overview of the Approach
Uses Breadth-First Search (BFS) traversal on both trees simultaneously.

Compares nodes level-by-level.

Uses two queues (q1 and q2) to keep track of nodes from each tree.

If at any point nodes differ, returns false.

If traversal completes without mismatches, returns true.

*/
function isSameTreeBFS(p, q) {
    const q1 = new Queue();
    const q2 = new Queue();
        //Two queues are created, one for each tree.

    //The root nodes p and q are pushed into their respective queues.
    q1.push(p);
    q2.push(q);
    //Continue looping as long as both queues are not empty.

    //This ensures we traverse both trees in parallel.
    while (!q1.isEmpty() && !q2.isEmpty()) {
        for (let i = q1.size(); i > 0; i--) {
            /*
            For each node currently in q1 (and q2), process them one by one.
            q1.size() gives the number of nodes at the current level.
            Pop nodes from both queues to compare.
            */
            let nodeP = q1.pop();
            let nodeQ = q2.pop();
            //If both nodes are null, they are identical at this position, so continue.
            if (nodeP === null && nodeQ === null) continue;
            //If one node is null and the other is not, or their values differ, trees are not the same → return false.
            if (nodeP === null || nodeQ === null || nodeP.val !== nodeQ.val) {
                return false;
            }
            /*
            Add the left and right children of both nodes to their respective queues.
            This prepares for the next level of BFS traversal.
            */
            q1.push(nodeP.left);
            q1.push(nodeP.right);
            q2.push(nodeQ.left);
            q2.push(nodeQ.right);
        }
    }

    return true;
}
/*
The function assumes Queue supports push() to enqueue and pop() to dequeue.

The BFS traverses both trees level by level, comparing corresponding nodes.

Checking both null nodes ensures structural similarity.

The function returns early on any mismatch, optimizing performance.
*/
let p = [1, 2, 3], q = [1, 2, 3];
p = [1, 2], q = [1, null, 2];
let treep = buildTreeFromArray(p);
//console.log("tree1--",tree1);
let treeq = buildTreeFromArray(q);

console.log(isSameTree(treep, treeq))