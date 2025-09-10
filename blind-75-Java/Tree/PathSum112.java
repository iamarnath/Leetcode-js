/*
112. Path Sum
 * Given the root of a binary tree and an integer targetSum,
 *  return true if the tree has a root-to-leaf path such that 
 * adding up all the values along the path equals targetSum.

A leaf is a node with no children.

Example 1:
         5
        / \
       4   8
      /   / \
    11   13  4
   /  \        \
  7    2        1

  Explanation of result
Let's check root-to-leaf paths and their sums:

5 → 4 → 11 → 7 = 27 (not 22)

5 → 4 → 11 → 2 = 22 (matches targetSum)

5 → 8 → 13 = 26 (not leaf)

5 → 8 → 4 → 1 = 18 (not 22)

Because the path 5 → 4 → 11 → 2 sums to 22, the method hasPathSum will return true.

Input: root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
Output: true
Explanation: The root-to-leaf path with the target sum is shown.
Example 2:
    1
   / \
  2   3


Input: root = [1,2,3], targetSum = 5
Output: false
Explanation: There are two root-to-leaf paths in the tree:
(1 --> 2): The sum is 3.
(1 --> 3): The sum is 4.
There is no root-to-leaf path with sum = 5.
Example 3:

Input: root = [], targetSum = 0
Output: false
Explanation: Since the tree is empty, there are no root-to-leaf paths.
 

Constraints:

The number of nodes in the tree is in the range [0, 5000].
-1000 <= Node.val <= 1000
-1000 <= targetSum <= 1000
 * 
*/
/*
 * Time: O(n), where n = number of nodes, as every node is visited once.

Space: O(h), where h = height of the tree due to recursion stack in worst case (skewed tree, h = n; balanced tree, h = log n).

 * 
*/
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode() {
    }

    TreeNode(int val) {
        this.val = val;
    }

    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

public class PathSum112 {
    public boolean pathSum(TreeNode root, int sum, int curr) {
        //If the current node is null (empty tree or reached 
        //child of leaf), this path can't sum to target. Return false.
        if (root == null)
            return false;
        //If the node is a leaf (no left or right child), 
        //check if the value from root to here adds up to the target. 
        //Return true if equal, false otherwise.
        if (root.left == null && root.right == null) {
            // It's a leaf node
            return (curr + root.val) == sum;
        }
        //Otherwise, call recursively on left and right children,
        // passing along the path sum so far (curr + root.val).
        boolean l = pathSum(root.left, sum, curr + root.val);
        boolean r = pathSum(root.right, sum, curr + root.val);
        //Return true if either left or right subtree has a path that matches.
        return l || r;
    }

    public boolean hasPathSum(TreeNode root, int targetSum) {
        //Entry point: start from root, target sum as given, accumulated sum as 0.
        return pathSum(root, targetSum, 0);
    }

    public static void main(String[] args) {
        // example 1
        // TreeNode root = null; // Empty tree
        // int targetSum = 0;
        // example 2
        // TreeNode root = new TreeNode(1);
        // root.left = new TreeNode(2);
        // root.right = new TreeNode(3);
        // Example 3
        TreeNode root = new TreeNode(5);
        root.left = new TreeNode(4);
        root.right = new TreeNode(8);

        root.left.left = new TreeNode(11);

        root.left.left.left = new TreeNode(7);
        root.left.left.right = new TreeNode(2);

        root.right.left = new TreeNode(13);
        root.right.right = new TreeNode(4);

        root.right.right.right = new TreeNode(1);

        int targetSum = 5;
        PathSum112 solver = new PathSum112();
        boolean result = solver.hasPathSum(root, targetSum);
        System.out.println(result); // Expected output: false
    }

}
/* 
 // Definition for a binary tree node
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class PathSum112 {
  pathSum(root, sum, curr) {
    // If the current node is null, path can't sum to target
    if (root === null) return false;

    // If it's a leaf node
    if (root.left === null && root.right === null) {
      return (curr + root.val) === sum;
    }

    // Recurse left and right with updated cumulative sum
    let l = this.pathSum(root.left, sum, curr + root.val);
    let r = this.pathSum(root.right, sum, curr + root.val);

    return l || r;
  }

  hasPathSum(root, targetSum) {
    return this.pathSum(root, targetSum, 0);
  }
}

// ===== Example Usage =====
function main() {
  // Example 3 tree (same as Java code)
  let root = new TreeNode(5);
  root.left = new TreeNode(4);
  root.right = new TreeNode(8);

  root.left.left = new TreeNode(11);
  root.left.left.left = new TreeNode(7);
  root.left.left.right = new TreeNode(2);

  root.right.left = new TreeNode(13);
  root.right.right = new TreeNode(4);
  root.right.right.right = new TreeNode(1);

  let targetSum = 5;

  let solver = new PathSum112();
  let result = solver.hasPathSum(root, targetSum);

  console.log(result); // Expected output: false
}

main();
 
 
*/