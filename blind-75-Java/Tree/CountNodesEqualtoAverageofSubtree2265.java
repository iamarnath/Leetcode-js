
/*
 2265. Count Nodes Equal to Average of Subtree

Given the root of a binary tree, return the
 number of nodes where the value of the node
  is equal to the average of the values in its subtree.

Note:

The average of n elements is the sum of the 
n elements divided by n and rounded down to the nearest integer.
A subtree of root is a tree consisting 
of root and all of its descendants.
 

Example 1:


Input: root = [4,8,5,0,1,null,6]
Output: 5
Explanation: 
For the node with value 4: The average of its 
subtree is (4 + 8 + 5 + 0 + 1 + 6) / 6 = 24 / 6 = 4.
For the node with value 5: The average of its 
subtree is (5 + 6) / 2 = 11 / 2 = 5.
For the node with value 0: The average of
 its subtree is 0 / 1 = 0.
For the node with value 1: The average of
 its subtree is 1 / 1 = 1.
For the node with value 6: The average of 
its subtree is 6 / 1 = 6.
Example 2:


Input: root = [1]
Output: 1
Explanation: For the node with value 1: The average 
of its subtree is 1 / 1 = 1.
 

Constraints:

The number of nodes in the tree is in the
 range [1, 1000].
0 <= Node.val <= 1000

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

class Pair<K, V> {
    private K key;
    private V value;

    public Pair(K key, V value) {
        this.key = key;
        this.value = value;
    }

    public K getKey() {
        return key;
    }

    public V getValue() {
        return value;
    }
}

public class CountNodesEqualtoAverageofSubtree2265 {
    private int result;

    private Pair<Integer, Integer> solve(TreeNode root) {
        if (root == null) {
            return new Pair<>(0, 0);
        }

        Pair<Integer, Integer> left = solve(root.left);
        Pair<Integer, Integer> right = solve(root.right);
        int leftSum = left.getKey();
        int leftCount = left.getValue();

        int rightSum = right.getKey();
        int rightCount = right.getValue();
        int SUM = leftSum + rightSum + root.val;
        int COUNT = leftCount + rightCount + 1;
        int avg = SUM / COUNT;
        if (avg == root.val) {
            result++;
        }
        return new Pair<>(SUM, COUNT);
    }

    public int averageOfSubtree(TreeNode root) {
        result = 0;
        solve(root);
        return result;

    }

    // Helper function to build a tree from array (level order)
    public static TreeNode buildTree(Integer[] arr) {
        if (arr.length == 0 || arr[0] == null)
            return null;
        TreeNode root = new TreeNode(arr[0]);
        java.util.Queue<TreeNode> queue = new java.util.LinkedList<>();
        queue.offer(root);
        int i = 1;
        while (!queue.isEmpty() && i < arr.length) {
            TreeNode current = queue.poll();
            if (i < arr.length && arr[i] != null) {
                current.left = new TreeNode(arr[i]);
                queue.offer(current.left);
            }
            i++;
            if (i < arr.length && arr[i] != null) {
                current.right = new TreeNode(arr[i]);
                queue.offer(current.right);
            }
            i++;
        }
        return root;
    }

    // Main method to run the code
    public static void main(String[] args) {
        Integer[] arr = { 4, 8, 5, 0, 1, null, 6 };
        TreeNode root = buildTree(arr);
        CountNodesEqualtoAverageofSubtree2265 solution = new CountNodesEqualtoAverageofSubtree2265();
        int result = solution.averageOfSubtree(root);
        System.out.println("Number of nodes equal to average of subtree: " + result);
    }

}
