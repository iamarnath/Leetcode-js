/*
637. Average of Levels in Binary Tree

Solution - https://leetcode.com/problems/average-of-levels-in-binary-tree/solutions/5186772/optimised/

Description
Given the root of a binary tree, return the average value of the nodes on each level in the form of
 an array. Answers within 10-5 of the actual answer will be accepted.

Example 1:
Input: root = [3,9,20,null,null,15,7]
Output: [3.00000,14.50000,11.00000]
Explanation: The average value of nodes on level 0 is 3, on level 1 is 14.5, and on level 2 is 11.
Hence return [3, 14.5, 11].
Example 2:
Input: root = [3,9,20,15,7]
Output: [3.00000,14.50000,11.00000]

Constraints:

The number of nodes in the tree is in the range [1, 104].
-231 <= Node.val <= 231 - 1

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
The averageOfLevels function calculates the average value of each level in a binary tree using a breadth-first search (BFS) approach with a queue. Let's analyze the time and space complexity, as well as the approach used.

Approach:

The function initializes a queue with the root node of the binary tree.
It also initializes an empty array ans to store the averages of each level.
The function enters a loop that continues until the queue is empty.
Inside the loop, it calculates the number of nodes at the current level using queue.length.
It initializes a variable sum to keep track of the sum of values at the current level.
The function then iterates over the nodes at the current level using a for loop.
For each node, it checks if the node is not null. If the node is not null, it adds the node's value to sum.
If the node has a left child, it adds the left child to the queue.
If the node has a right child, it adds the right child to the queue.
After processing all nodes at the current level, it calculates the average by dividing sum by the number of nodes at the level (levelSize).
The calculated average is pushed into the ans array.
The loop continues until all levels have been processed.
Finally, the function returns the ans array containing the averages of each level.

Time Complexity:

The time complexity of the averageOfLevels function is O(n), where n is the total number of nodes in the binary tree.
The function visits each node exactly once during the BFS traversal.
It processes all nodes at each level before moving on to the next level.

Space Complexity:

The space complexity of this function is O(w), where w is the maximum number of nodes at any level in the binary tree.
The function uses a queue to store the nodes at each level during the BFS traversal.
In the worst case, the queue may contain all the nodes at the widest level of the tree, leading to a space complexity proportional to the maximum width of the tree.


*/
var averageOfLevels = function (root) {
    // Initialize the queue with the root node.
    let queue = [root];
    // Initialize the array to hold averages of each level.
    let ans = [];
    while (queue.length > 0) {
        let levelSize = queue.length;  // The number of nodes at current level.
        let sum = 0;
        for (let i = 0; i < levelSize; i++) {
            let currNode = queue.shift();
            if (currNode) {
                sum+=currNode.val;
                if(currNode.left){
                    queue.push(currNode.left);
                }
                if(currNode.right){
                    queue.push(currNode.right);
                }
            }
        }
        ans.push(sum/levelSize);
    }
    return ans;
}

let root1 = [3, 9, 20, null, null, 15, 7]
root1 = [3,9,20,15,7]
let tree1 = buildTreeFromArray(root1);
console.log(averageOfLevels(tree1));