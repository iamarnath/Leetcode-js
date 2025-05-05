/*
337. House Robber III
The thief has found himself a new place for his thievery again. There is only one entrance to this area, called root.

Besides the root, each house has one and only one parent house. After a tour, the smart thief realized that all houses in this place form a binary tree. It will automatically contact the police if two directly-linked houses were broken into on the same night.

Given the root of the binary tree, return the maximum amount of money the thief can rob without alerting the police.

 

Example 1:


Input: root = [3,2,3,null,3,null,1]
Output: 7
Explanation: Maximum amount of money the thief can rob = 3 + 3 + 1 = 7.
Example 2:


Input: root = [3,4,5,1,3,null,1]
Output: 9
Explanation: Maximum amount of money the thief can rob = 4 + 5 = 9.
 

Constraints:

The number of nodes in the tree is in the range [1, 104].
0 <= Node.val <= 104
*/
/*
Time Complexity
Each node is visited once.

At each node, only a constant amount of work is done (no nested loops or repeated visits).

Let n be the number of nodes in the tree.

Time Complexity:O(n)
Space Complexity
Call Stack: The recursion stack can go as deep as the height of the tree.

In the worst case (skewed tree), height = n ⇒ O(n).

In the best case (balanced tree), height = log n ⇒ O(log n).

Auxiliary Space: No extra data structures are used except
 for the call stack and a few variables.

Space Complexity:
O(h)
where h is the height of the tree (worst case O(n), best case O(log n)).
*/
function rob(root){
    /*
    Base Case: If the node is null, return `` (nothing to rob).

    Recursive Case: For each node, recursively compute the
     max values for the left and right children.

    options: The max money if you rob this node. 
    You must skip both children.

    options: The max money if you skip this node.
     You can choose to rob or skip each child independently.

    Return: An array [robCurrent, skipCurrent], representing
     the two choices for the current node.
*/
    function travel(node){
        // Base case: if node is null, return [0, 0]
        if(node === null){
            return [0,0];
        }
        const leftnodechoices = travel(node.left);
        const rightnodechoices = travel(node.right);
        // If we rob this node, we cannot rob its children
        const withRoot  = node.val + leftnodechoices[1]+rightnodechoices[1];
        // If we skip this node, we can rob or skip its children
        const withoutRoot = Math.max(leftnodechoices[0],leftnodechoices[1]) +
        Math.max(rightnodechoices[0],rightnodechoices[1]);
        return [withRoot,withoutRoot];
    }
    const options = travel(root);
    return Math.max(options[0],options[1]);
}