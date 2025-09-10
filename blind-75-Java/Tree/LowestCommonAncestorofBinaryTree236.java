import java.util.LinkedList;
import java.util.Queue;

public class LowestCommonAncestorofBinaryTree236 {
    public static class TreeNode {
        int val;
        TreeNode left;
        TreeNode right;

        TreeNode(int x) {
            val = x;
        }
    }

    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null)
            return null;
        if (root.val == p.val || root.val == q.val)
            return root;
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        if (left != null && right != null)
            return root;
        return left != null ? left : right;
    }

    public static TreeNode findNode(TreeNode root, int val) {
        if (root == null)
            return null;
        if (root.val == val)
            return root;
        TreeNode left = findNode(root.left, val);
        if (left != null)
            return left;
        return findNode(root.right, val);
    }

    public static TreeNode buildTree(Integer[] data) {
        if (data.length == 0 || data[0] == null)
            return null;
        TreeNode root = new TreeNode(data[0]);
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        int i = 1;
        while (!queue.isEmpty() && i < data.length) {
            TreeNode current = queue.poll();
            if (i < data.length && data[i] != null) {
                current.left = new TreeNode(data[i]);
                queue.offer(current.left);
            }
            i++;
            if (i < data.length && data[i] != null) {
                current.right = new TreeNode(data[i]);
                queue.offer(current.right);
            }
            i++;
        }
        return root;
    }

    public static void main(String[] args) {
        Integer[] nodeVals = { 3, 5, 1, 6, 2, 0, 8, null, null, 7, 4 };
        TreeNode root = buildTree(nodeVals);

        TreeNode p = findNode(root, 5);
        TreeNode q = findNode(root, 4);

        LowestCommonAncestorofBinaryTree236 sol = new LowestCommonAncestorofBinaryTree236();
        TreeNode lca = sol.lowestCommonAncestor(root, p, q);
        System.out.println("Lowest Common Ancestor: " + (lca != null ? lca.val : "null"));
    }
}
