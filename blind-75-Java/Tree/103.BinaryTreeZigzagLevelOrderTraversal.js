/*
103. Binary Tree Zigzag Level Order Traversal

Given the root of a binary tree, return 
the zigzag level order traversal of its nodes' values.
 (i.e., from left to right, then right to left for
  the next level and alternate between).
Example 1:


Input: root = [3,9,20,null,null,15,7]
Output: [[3],[20,9],[15,7]]
Example 2:

Input: root = [1]
Output: [[1]]
Example 3:

Input: root = []
Output: []
Constraints:

The number of nodes in the tree is in the range [0, 2000].
-100 <= Node.val <= 100

*/

/*
Time and Space Complexity
Time Complexity
O(n), where 
n is the number of nodes in the tree, 
since every node is visited once.

Space Complexity
O(w), where 
w is the maximum width (maximum number of nodes at any level) 
of the tree, for the queue and level buffers.

In the worst case, for a complete binary tree, 
w could be approximately 
n/2, so space is O(n).

Summary Table
Operation	Complexity
Time Complexity	O(n) 
Space Complexity	O(n) 
This approach efficiently

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
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function(root) {
    if (!root) return [];
    // Initializes a queue q for breadth-first search (BFS),
    // an output array result for results, and a level 
    // indicator (0 for left-to-right, 1 for right-to-left).

    const result = [];
    let level = 0;
    //Pushes the root node onto the queue
    const queue = [root];
    while (queue.length > 0) {
        //While the queue isn’t empty, store 
        // the count of currentLevelValuesent level nodes (levelLength).
        const levelLength = queue.length;
        //Prepare an array currentLevelValues to store node values for this level.
        const currentLevelValues = new Array(levelLength);
       // console.log("currentLevelValues size ",currentLevelValues,levelLength);
        //Iterate through nodes in the currentLevelValuesent level (levelLength times), popping nodes from the queue.
        for (let i = 0; i < levelLength; i++) {
            const currentNode = queue.shift();
            //If traversing left-to-right (level===0), 
            // fill currentLevelValues from start to end.
            if (level === 0) {
                currentLevelValues[i] = currentNode.val;
            } else {
            // If right-to-left, fill currentLevelValues from end
            // to start (creating the zigzag effect).
                currentLevelValues[levelLength - i - 1] = currentNode.val;
            }
            //For each node, if there’s a left or right child, enqueue them for the next level.
            if (currentNode.left) queue.push(currentNode.left);
            if (currentNode.right) queue.push(currentNode.right);
        }
        //Add the currentLevelValuesent level's result to result.
        result.push(currentLevelValues);
        //Flip the traversal direction for the next level.
        level = 1 - level; // Toggle between 0 and 1
    }
    return result;
};

let root1 = [3, 9, 20, null, null, 15, 7];

let tree1 = buildTreeFromArray(root1);

let res  = zigzagLevelOrder(tree1);

console.log("zigzagLevelOrder ==",res);