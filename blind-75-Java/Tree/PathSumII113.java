/*
 * 113. Path Sum II
 * Given the root of a binary tree and an integer
 *  targetSum, return all root-to-leaf paths where 
 * the sum of the node values in the path equals targetSum.
 *  Each path should be returned as a list of the node values,
 *  not node references.

A root-to-leaf path is a path starting from the root and ending 
at any leaf node. A leaf is a node with no children.

Example 1:


Input: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
Output: [[5,4,11,2],[5,8,4,5]]
Explanation: There are two paths whose sum equals targetSum:
5 + 4 + 11 + 2 = 22
5 + 8 + 4 + 5 = 22
Example 2:


Input: root = [1,2,3], targetSum = 5
Output: []
Example 3:

Input: root = [1,2], targetSum = 0
Output: []

Constraints:

The number of nodes in the tree is in the range [0, 5000].
-1000 <= Node.val <= 1000
-1000 <= targetSum <= 1000
 * 
*/
/*
 * Time Complexity
The algorithm visits every node once due to DFS traversal.
For each leaf node that forms a valid path, it copies
 the current path temp into results.
In worst case (a balanced tree), the number of 
root-to-leaf paths can be around O(N/2) (~ number of leaves).

Each path length in worst case is O(H) where H = tree height.
So:

Time complexity is O(N * H), where:

N = number of nodes

H = height of the tree (path copy operation)

 Space Complexity
Recursion stack goes as deep as tree height → O(H)
Temporary path list temp length is O(H)
The result list stores all qualifying paths:
Number of paths can be O(N) in worst case (very skewed tree)
Each path can be length O(H)

So:

Space complexity is O(H + P * H), where:

H = height of the tree (stack + path)

P = number of valid paths found

Summary
Aspect	Complexity
Time Complexity	O(N * H)
Space Complexity	O(H + P * H)
 * 
*/
import java.util.ArrayList;
import java.util.List;
/*
 * Defines a class TreeNode, representing each node in the binary tree.

Each node holds an integer val.

Each node has two references: left and right pointing to its left and right children respectively.
 * 
*/
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    //Default constructor. Creates an empty node (no initial value).
    TreeNode() {
    }
    //Constructor to create a node with a specified integer value val.
    TreeNode(int val) {
        this.val = val;
    }
    //Constructor to create a node with a value and specified left and right children.
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

public class PathSumII113 {
    private void collectPaths(TreeNode root, int targetSum, List<Integer> temp, List<List<Integer>> result) {
        //Base case: if current node is null, stop exploration and return.
        if (root == null)
            return;
        //Add the current node value to the current path list temp.
        temp.add(root.val);
        /*
         * Check if the current node is a leaf (no left or right children).
            Also check if the path sum equals the targetSum.
            If yes, add a copy of the current path (temp) to 
            the result list.
            new ArrayList<>(temp) makes a copy because temp
             will change during backtracking.
         * 
        */
        if (root.left == null && root.right == null && root.val == targetSum) {
            result.add(new ArrayList<>(temp));
        }
        //Recursively explore the left and right children.
        //Update targetSum by subtracting current node value because 
        //we have included the current node in the path.
        collectPaths(root.left, targetSum - root.val, temp, result);
        collectPaths(root.right, targetSum - root.val, temp, result);
        //Backtracking step: remove the last added node value before returning to explore other paths.
        temp.remove(temp.size() - 1);
    }

    public List<List<Integer>> pathSum(TreeNode root, int targetSum) {
        //result to collect all valid paths.
        //temp to store the current path during traversal.
        List<List<Integer>> result = new ArrayList<>();
        List<Integer> temp = new ArrayList<>();
        collectPaths(root, targetSum, temp, result);
        return result;
    }

    public static void main(String[] args) {
        PathSumII113 ps = new PathSumII113();

        // Build the tree:
        // root = [5,4,8,11,null,13,4,7,2,null,null,5,1]
        //example 1
        TreeNode root = new TreeNode(5);
        root.left = new TreeNode(4);
        root.right = new TreeNode(8);
        root.left.left = new TreeNode(11);
        root.left.left.left = new TreeNode(7);
        root.left.left.right = new TreeNode(2);
        root.right.left = new TreeNode(13);
        root.right.right = new TreeNode(4);
        root.right.right.left = new TreeNode(5);
        root.right.right.right = new TreeNode(1);

        int targetSum = 22;

        //example 2
        // TreeNode root = new TreeNode(1);
        // root.left = new TreeNode(2);
        // root.right = new TreeNode(3);
        // int targetSum = 5;

        List<List<Integer>> res = ps.pathSum(root, targetSum);

        System.out.println("Paths with sum " + targetSum + ":" + res);
        // for (List<Integer> path : res) {
        //     System.out.println(path);
        // }
    }
}

/*
// javascript version
 // Definition for a binary tree node.
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class PathSumII113 {
  collectPaths(root, targetSum, temp, result) {
    // Base case: if current node is null, return
    if (root === null) return;

    // Add current node value to 'temp' path
    temp.push(root.val);

    // If it's a leaf node and targetSum matches
    if (root.left === null && root.right === null && root.val === targetSum) {
      // Push a *copy* of temp into result (not a reference!)
      result.push([...temp]);
    }

    // Recurse left and right with updated targetSum
    this.collectPaths(root.left, targetSum - root.val, temp, result);
    this.collectPaths(root.right, targetSum - root.val, temp, result);

    // Backtrack: remove last element
    temp.pop();
  }

  pathSum(root, targetSum) {
    let result = [];
    let temp = [];
    this.collectPaths(root, targetSum, temp, result);
    return result;
  }
}

// ===== Example Usage =====
function main() {
  let ps = new PathSumII113();

  // Build example tree:
  // root = [5,4,8,11,null,13,4,7,2,null,null,5,1]
  let root = new TreeNode(5);
  root.left = new TreeNode(4);
  root.right = new TreeNode(8);
  root.left.left = new TreeNode(11);
  root.left.left.left = new TreeNode(7);
  root.left.left.right = new TreeNode(2);
  root.right.left = new TreeNode(13);
  root.right.right = new TreeNode(4);
  root.right.right.left = new TreeNode(5);
  root.right.right.right = new TreeNode(1);

  let targetSum = 22;
  let res = ps.pathSum(root, targetSum);

  console.log("Paths with sum " + targetSum + ":", res);

  // Example 2:
  // let root = new TreeNode(1);
  // root.left = new TreeNode(2);
  // root.right = new TreeNode(3);
  // let targetSum = 5;
  // console.log(ps.pathSum(root, targetSum));
}

main();
 
 
*/
