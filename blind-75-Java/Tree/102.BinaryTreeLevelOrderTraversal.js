/*
102. Binary Tree Level Order Traversal

Given a binary tree root, return the level order traversal of it as a nested list, where each sublist contains the values of nodes at a particular level in the tree, from left to right.

Input: root = [1,2,3,4,5,6,7]
Output: [[1],[2,3],[4,5,6,7]]

Input: root = [1]
Output: [[1]]

Input: root = []
Output: []

Constraints:

0 <= The number of nodes in both trees <= 1000.
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
function levelOrder(root) {
    // Initialize the result array.
    const result = [];
    // If the root is null, the tree is empty,
    //  and we return the empty result.
    if (root === null) {
        return result;
    }
    // Initialize a queue to hold nodes at each level.
    /*
    A queue is used to keep track of nodes to visit.
    Initially, the queue contains only the root node.
    The queue helps us process nodes level by level.
    */
    const queue = [root];
    // Iterate until the queue is empty.
    while (queue.length != 0) {
        // Get the number of nodes at the current level.
        /*
        levelLength stores how many nodes are at the current level.
        This is important because the queue will grow as we add child nodes,
        but we only want to process nodes that were originally at this level.
        */
        const levelLength = queue.length;
        // Process all nodes at the current level.
        //This array will hold the values of all nodes at the current level.
        const currentLevelValues = [];
        console.log("queue==",queue);
        for (let i = 0; i < levelLength; i++) {
            // Shift the first node from the queue.
            /*
            For each node at this level:
                Remove it from the front of the queue (shift()).
                Add its value to currentLevelValues.
                Add its children to the queue for processing in the
                next iteration (next level).
            */
            const currentNode = queue.shift();
            // Proceed if the currentNode is not null.
            if (currentNode) {
                currentLevelValues.push(currentNode.val);
                // Add left and right children if they exist.
                if (currentNode.left) {
                    queue.push(currentNode.left);
                }
                if (currentNode.right) {
                    queue.push(currentNode.right);
                }
            }// end of if

        } // end of for
        console.log("result==",result);
        console.log("currentLevelValues==",currentLevelValues)
        // Add the current level's values to the overall result array.
        result.push(currentLevelValues);
    }
    return result;
}


let root1 = [3, 9, 20, null, null, 15, 7];

let tree1 = buildTreeFromArray(root1);

levelOrder(tree1)