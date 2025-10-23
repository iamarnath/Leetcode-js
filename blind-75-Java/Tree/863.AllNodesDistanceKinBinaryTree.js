/*
863. All Nodes Distance K in Binary Tree

Given the root of a binary tree, the value of a target node target, and an integer k, return an array of the values of all nodes that have a distance k from the target node.

You can return the answer in any order.

 

Example 1:


Input: root = [3,5,1,6,2,0,8,null,null,7,4], target = 5, k = 2
Output: [7,4,1]
Explanation: The nodes that are a distance 2 from the target node (with value 5) have values 7, 4, and 1.
Example 2:

Input: root = [1], target = 1, k = 3
Output: []
 

Constraints:

The number of nodes in the tree is in the range [1, 500].
0 <= Node.val <= 500
All the values Node.val are unique.
target is the value of one of the nodes in the tree.
0 <= k <= 1000
*/


/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/*
Here’s a detailed line-by-line explanation of the plain JavaScript distance K solution for binary trees:

javascript
function distanceK(root, target, k) {
    // Map to hold parent pointers
    const parent = new Map();
Declares the main function distanceK, which takes root (binary tree root), target (the node to start from), and k (distance).

Creates a Map called parent to keep track of each node’s parent, allowing traversal upwards in the tree.

javascript
    // Build parent mapping by traversing the tree
    function addParent(node, par = null) {
        if (!node) return;
        if (par) parent.set(node, par);
        addParent(node.left, node);
        addParent(node.right, node);
    }
Defines addParent, a helper to recursively record each node’s parent.

If node is null, return (base case).

If a parent exists, store the mapping in parent.

Recursively call addParent on left and right children to fill the mapping for the entire tree.

javascript
    // Collect nodes K distance away using BFS
    function collectKDistanceNodes(target) {
        const result = [];
        const queue = [target];
        const visited = new Set();
        visited.add(target);

        let currentK = k;
        while (queue.length > 0) {
            let size = queue.length;
            if (currentK === 0) break;

            for (let i = 0; i < size; i++) {
                const curr = queue.shift();
                if (curr.left && !visited.has(curr.left)) {
                    queue.push(curr.left);
                    visited.add(curr.left);
                }
                if (curr.right && !visited.has(curr.right)) {
                    queue.push(curr.right);
                    visited.add(curr.right);
                }
                if (parent.has(curr) && !visited.has(parent.get(curr))) {
                    queue.push(parent.get(curr));
                    visited.add(parent.get(curr));
                }
            }
            currentK--;
        }

        // Collect values from nodes left in queue
        while (queue.length > 0) {
            result.push(queue.shift().val);
        }
        return result;
    }
Defines a breadth-first search helper, collectKDistanceNodes.

Initializes an output array result.

A queue is used for the BFS, starting with the target node.

Uses a Set visited to track nodes already seen, preventing loops/revisits.

While the queue isn’t empty:

If the current distance (currentK) is 0, break: nodes remaining are at exact distance k from target.

For each node at the current layer:

Visit left child if it exists and is unvisited; add to queue and visited set.

Visit right child if it exists and is unvisited; add to queue and visited set.

Visit parent if it exists and is unvisited; add to queue and visited set.

After finishing the current layer, decrement the distance (currentK--).

When the loop ends, all nodes still in the queue are distance K from the target.

Collect their values into result and return.

javascript
    addParent(root);
    return collectKDistanceNodes(target);
}
Builds the parent map for the whole tree by calling addParent.

Calls BFS helper from the target node and returns the result (values of nodes at distance K).


*/
/*
The time complexity and space complexity of the "distance K nodes in a binary tree" algorithm in JavaScript are both O(n), where 
n
n is the number of nodes in the tree.

Time Complexity
Building parent mapping: The addParent function traverses every node exactly once, resulting in O(n).

BFS to collect distance K nodes: The BFS also visits each node at most once, so it is O(n).

Total: Each major step traverses the tree, and there are no nested traversals over the full tree structure, so overall time is O(n).

Any small constant-time operations—such as checking set or map membership—do not change the asymptotic complexity.

Space Complexity
Parent map: Stores a reference for each node, O(n).

Visited set: To avoid revisiting nodes; could grow to O(n) in worst case.

Queue for BFS: At maximum, holds all nodes on the current layer and possibly one branch; never exceeds O(n).

Result array: In the worst case, if every node is exactly K away, it would be O(n).

Total auxiliary space: O(n) due to parent map, visited set, queue, and result.

This algorithm is optimal for binary trees and performs efficiently on large inputs, leveraging linear time and space proportional to the number of nodes in the tree

*/
var distanceK = function(root, target, k) {
    // Map to hold parent pointers
    const parent = new Map();
    // Creates a Map called parent to keep track 
    // of each node’s parent, allowing traversal upwards in the tree.
    // Build parent mapping by traversing the tree
    //Defines addParent, a helper to recursively record each node’s parent.
    function addParent(node, par = null) {
        //If node is null, return (base case).
        if (!node) return;
        //If a parent exists, store the mapping in parent.
        if (par) parent.set(node, par);
        //Recursively call addParent on left and right children
        //  to fill the mapping for the entire tree.
        addParent(node.left, node);
        addParent(node.right, node);
    }

    // Collect nodes K distance away using BFS
    //Defines a breadth-first search helper, collectKDistanceNodes.
    function collectKDistanceNodes(target) {
        //Initializes an output array result.
        const result = [];
        //A queue is used for the BFS, starting with the target node.
        const queue = [target];
        //Uses a Set visited to track nodes already seen, preventing loops/revisits
        const visited = new Set();
        visited.add(target);

        let currentK = k;
        //While the queue isn’t empty:
        while (queue.length > 0) {
            let size = queue.length;
            //If the current distance (currentK) is 0,
            //  break: nodes remaining are at exact distance k from target.
            if (currentK === 0) break;

            for (let i = 0; i < size; i++) {
                //For each node at the current layer:
                const curr = queue.shift();
                //Visit left child if it exists and is unvisited; 
                // add to queue and visited set.
                if (curr.left && !visited.has(curr.left)) {
                    queue.push(curr.left);
                    visited.add(curr.left);
                }
                //Visit right child if it exists and is unvisited;
                //  add to queue and visited set.
                if (curr.right && !visited.has(curr.right)) {
                    queue.push(curr.right);
                    visited.add(curr.right);
                }
                //Visit parent if it exists and is unvisited; 
                // add to queue and visited set.
                if (parent.has(curr) && !visited.has(parent.get(curr))) {
                    queue.push(parent.get(curr));
                    visited.add(parent.get(curr));
                }
            }
            //After finishing the current layer, 
            // decrement the distance (currentK--).
            currentK--;
        }

        // Collect values from nodes left in queue
        //When the loop ends, all nodes still in the queue
        //  are distance K from the target.
        while (queue.length > 0) {
            result.push(queue.shift().val);
        }
        return result;
    }
    //Builds the parent map for the whole tree by calling addParent.
    addParent(root);
    //Calls BFS helper from the target node and returns the result (values of nodes at distance K).
    return collectKDistanceNodes(target);
};