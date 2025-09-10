/*
 * Find All Leaf Nodes with Maximum Root-to-Leaf Path Value
 * Problem Statement
Given the root of a binary tree, return a list of all leaf nodes where the maximum value along the path from the root to that leaf is as large as possible among all root-to-leaf paths in the tree.
Example
Input:
    5
   / \
  4   8
 /   / \
1   6   9

Output:
[^15_1][^15_6][^15_9]
Explanation:
•	Path to leaf 1: 5 → 4 → 1, max value = 5
•	Path to leaf 6: 5 → 8 → 6, max value = 8
•	Path to leaf 9: 5 → 8 → 9, max value = 9
•	The maximum among all these is 9, so only leaf 9 is returned.
Constraints
•	The number of nodes in the tree is in the range [1, 10^4].
•	-10^4 <= Node.val <= 10^4

You are given a binary tree, and you have to return all leaf nodes where the maximum value along the path from the root to that leaf is as large as possible among all paths.

🌳 Example Tree:
markdown
Copy
Edit
        5
       / \
      4   8
     /   / \
    1   6   9
Let's look at each root-to-leaf path:
Path	Max Value in Path
5 → 4 → 1	5
5 → 8 → 6	8
5 → 8 → 9	9 ← highest

✅ Only leaf 9 has the highest max value (9) in its root-to-leaf path, so the output is:

java
Copy
Edit
[9]
✅ Goal
Find the maximum value among all root-to-leaf paths.

Return the leaf node(s) whose path has that maximum value.

Dry Run of Example Tree
markdown
Copy
Edit
        5
       / \
      4   8
     /   / \
    1   6   9
dfs(5, -∞) → currMax = 5

→ dfs(4, 5) → currMax = 5

→→ dfs(1, 5) → currMax = 5

leaf → 5 > -∞ → update globalMax = 5, result = [1]

dfs(8, 5) → currMax = 8

→→ dfs(6, 8) → leaf → 8 > 5 → update globalMax = 8, result = [6]

→→ dfs(9, 8) → leaf → 9 > 8 → update globalMax = 9, result = [9]

✅ Final result: [9]

*/
/*
 * Time Complexity
You visit every node once.

For n nodes: O(n).

Space Complexity
Recursive stack (O(h), where h is the tree height). In the worst case (h = n for a skewed tree).

result list: In the worst case, there could be up to O(l) leaf nodes, where l = number of leaves (at most n/2).

So, overall: O(h + l), but asymptotically O(n) in the worst case.
 * 
*/

import java.util.ArrayList;
import java.util.List;

class TreeNode {
    int val;
    TreeNode left, right;

    TreeNode(int x) {
        val = x;
    }
}

public class FindAllLeafNodeswithMaxiRoottoLeafPath {
    //globalMax: Stores the highest value seen along any root-to-leaf path.
    private int globalMax = Integer.MIN_VALUE;
    //result: Stores the values of leaf nodes where the maximum value along that path equals globalMax.
    private List<Integer> result = new ArrayList<>();

    public List<Integer> maxRootToLeafNodes(TreeNode root) {
        //Starts DFS from the root with the smallest possible value (Integer.MIN_VALUE).
        dfs(root, Integer.MIN_VALUE);
        return result;
    }

    private void dfs(TreeNode node, int currMax) {
        //If node == null, stop recursion.
        if (node == null)
            return;
        currMax = Math.max(currMax, node.val);
        if (node.left == null && node.right == null) {
            //If the maximum on this path (currMax) is bigger than the 
            //global maximum, clear previous results, update globalMax, and 
            //add this leaf’s value.
            if (currMax > globalMax) {
                globalMax = currMax;
                result.clear();
                result.add(node.val);
            } 
            //If equal, just add this leaf’s value.
            else if (currMax == globalMax) {
                result.add(node.val);
            }
        }
        dfs(node.left, currMax);
        dfs(node.right, currMax);
    }

    public static void main(String[] args) {
        // example 1
        // TreeNode root = new TreeNode(5);
        // root.left = new TreeNode(4);
        // root.right = new TreeNode(8);
        // root.left.left = new TreeNode(1);
        // root.right.left = new TreeNode(6);
        // root.right.right = new TreeNode(9);
        // example 2
        // TreeNode root = new TreeNode(3);
        // root.left = new TreeNode(1);
        // root.right = new TreeNode(4);
        // root.right.right = new TreeNode(8);
        // example 3
        // TreeNode root = new TreeNode(10);
        // root.left = new TreeNode(5);
        // root.right = new TreeNode(10);
        // root.right.right = new TreeNode(10);

        // example 4
        TreeNode root = new TreeNode(5);
        root.left = new TreeNode(5);
        root.right = new TreeNode(5);
        root.right.right = new TreeNode(5);
        FindAllLeafNodeswithMaxiRoottoLeafPath sol = new FindAllLeafNodeswithMaxiRoottoLeafPath();
        System.out.println(sol.maxRootToLeafNodes(root));
    }

}
