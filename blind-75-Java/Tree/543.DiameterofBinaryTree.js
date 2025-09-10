/*
543. Diameter of Binary Tree
Given the root of a binary tree, 
return the length of the diameter of the tree.

The diameter of a binary tree is the length of the
 longest path between any two nodes in a tree. 
 This path may or may not pass through the root.

The length of a path between two nodes is represented 
by the number of edges between them.

Example 1:

Input: root = [1,2,3,4,5]
Output: 3
Explanation: 3 is the length of the path [4,2,1,3] or [5,2,1,3].
Example 2:

Input: root = [1,2]
Output: 1
 
Constraints:

The number of nodes in the tree is in the range [1, 104].
-100 <= Node.val <= 100

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
Time and Space Complexity
Time Complexity
O(N) where N is the number of nodes in the tree.

Each node is visited exactly once during the recursive 
traversal, and all operations performed per node are O(1).

Space Complexity
O(H) where H is the maximum depth (height) of the tree,
 due to the recursion stack.

In the worst case (for a skewed tree), this could 
be O(N). In a balanced tree, it is O(log N)
*/
// actual code

var diameterOfBinaryTree = function (root) {
    // Checks if the tree is empty. If the root is null,
    // the diameter is 0 because there are no nodes to connect.
    if (!root) return 0;
    //Initializes a variable to store the maximum diameter
    //  found during the traversal. 
    // It starts with the smallest possible value 
    // so that any path will be larger.
    let result = -Infinity;
    function diameter(node) {
        if (!node) {
            return 0;
        }
        let left = diameter(node.left);
        let right = diameter(node.right);
        //The diameter passing through this node is the sum of
        //  the left and right heights (i.e., edges traversed 
        // from the leftmost descendant through node to the 
        // rightmost descendant). If this local diameter is
        //  larger than the current result, update it.
        result = Math.max(result, left + right);
        //Returns the height of the current node, 
        // which is one more than the greater of the
        //  left or right subtree heights. This value 
        // bubbles up to be used by its parent.
        return Math.max(left,right) +1;
    }
    diameter(root);
    return result;
}

let root = [1, 2, 3, 4, 5];

let tree = buildTreeFromArray(root);

let res = diameterOfBinaryTree(tree);

console.log("res==", res);