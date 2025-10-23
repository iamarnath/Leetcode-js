/*
117. Populating Next Right Pointers in Each Node II
Given a binary tree

struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL.

Initially, all next pointers are set to NULL.

 

Example 1:


Input: root = [1,2,3,4,5,null,7]
Output: [1,#,2,3,#,4,5,7,#]
Explanation: Given the above binary tree (Figure A), your function should populate each next pointer to point to its next right node, just like in Figure B. The serialized output is in level order as connected by the next pointers, with '#' signifying the end of each level.
Example 2:

Input: root = []
Output: []
 

Constraints:

The number of nodes in the tree is in the range [0, 6000].
-100 <= Node.val <= 100
 

Follow-up:

You may only use constant extra space.
The recursive approach is fine. You may assume implicit stack 
space does not count as extra space for this problem.
*/

/**
 * // Definition for a _Node.
 * function _Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {_Node} root
 * @return {_Node}
 */
/*
Outer while loop: Go level by level through the tree.

levelSize: Keeps track of how many nodes are at the current level.

prev: Ensures next pointers are set only within the same level.

Queue: Ensures FIFO order, so parents are processed before their children, and all nodes at a level are handled together and before any nodes at the next level.

This approach guarantees that only nodes in the same level are linked together using the next pointer.
*/
/*
Time complexity: 

O(N), where 

N is the number of nodes in the tree. Each node is visited exactly once, and each child is enqueued and dequeued one time.

Space complexity: 

O(N), for the queue in the worst case, which can hold all nodes at the widest level of the tree (up to half the nodes for a perfect binary tree).

Explanation
Time Complexity

The algorithm processes each node once (removing it from the queue and linking its next pointer), leading to a total of 

O(N) operations for 

N nodes.

Space Complexity

The queue stores nodes of one level at a time, 
so in the worst case (a perfectly balanced binary tree), the queue grows to 

O(N/2) = 

O(N) for the last level.

There are no other significant data
 structures using extra space (apart from a few pointers).
*/
var connect = function(root) {
    //If the root is null, return null—this covers the edge case where the tree is empty.
  if (!root) return root;
    //Create an empty list (queue) and add the root node to it.
//This queue will help process nodes level-by-level, as in a "breadth-first" (level order) traversal
    let queue = [];
    queue.push(root);
    //Continue looping while there are nodes in the queue.
    while (queue.length > 0) {
        //levelSize records how many nodes are currently 
        // in the queue—this represents how many are in the current level.
        let levelSize = queue.length; // Number of nodes at the current level
        //prev will track the previous node on the same level, to set its next pointer.
        let prev = null;
        //Repeat levelSize times (i.e., for each node in the current level),
        for (let i = 0; i < levelSize; i++) {
            //Remove (shift) a node from the front of the queue.
            let node = queue.shift();
            //If this isn't the first node in the level (prev is not null), 
            // set the previous node's next to the current node.
            if (prev) prev.next = node;
            //Update prev to the current node to connect future nodes.
            prev = node;
            //If the node has a left or right child, add them to the back 
            // of the queue—these are the nodes that will be processed in the next level.
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    //After all levels are processed,
    //  return the root node (the tree is now “wired” with next pointers).
    return root;
};