/*
94. Binary Tree Inorder Traversal
Given the root of a binary tree, 
return the inorder traversal of its nodes' values.
Example 1:

Input: root = [1,null,2,3]

Output: [1,3,2]

Explanation:
Example 2:

Input: root = [1,2,3,4,5,null,8,null,null,6,7,9]

Output: [4,2,6,5,7,1,3,9,8]

Explanation:
Example 3:

Input: root = []

Output: []

Example 4:

Input: root = [1]

Output: [1]
Constraints:

The number of nodes in the tree is in the range [0, 100].
-100 <= Node.val <= 100
Follow up: Recursive solution is trivial, could you do it iteratively?
*/

/*
What is Morris Inorder Traversal?
Morris traversal is an inorder traversal that uses no recursion and no stack.

It achieves O(1) space complexity by temporarily
 modifying the tree’s structure during traversal.

After traversal, the tree is restored to its original structure.

Morris Inorder Traversal Algorithm
Initialize current node as root.

While current is not null:

If current has no left child:

Visit current node (process its value).

Move to right child.

Else:

Find the inorder predecessor of current (rightmost node in left subtree).

If predecessor's right is null:

Make current the right child of predecessor (threading).

Move current to its left child.

Else (thread already exists):

Remove the thread (set predecessor's right to null).

Visit current node.

Move current to its right child.
=======================================
Morris traversal allows inorder traversal without extra space.

It temporarily modifies the tree by creating "threads" to predecessors.

After traversal, the tree is restored to its original shape.

Useful when minimizing space usage is critical.
*/

function morrisInorderTraversal(root) {
    let current = root;
    const result = [];

    while (current !== null) {
        if (current.left === null) {
            // Visit the node with no left child
            result.push(current.val);
            current = current.right;
        } else {
            // Find the inorder predecessor of current
            let predecessor = current.left;
            while (predecessor.right !== null && predecessor.right !== current) {
                predecessor = predecessor.right;
            }

            if (predecessor.right === null) {
                // Make current the right child of its inorder predecessor
                predecessor.right = current;
                current = current.left;
            } else {
                // Revert the changes (remove the thread)
                predecessor.right = null;
                result.push(current.val);
                current = current.right;
            }
        }
    }

    return result;
}

// Morris travaersal approach

/*
The key trick in Morris Traversal is to temporarily 
modify the tree by creating threads (links) from the 
rightmost node in the left subtree (called the "predecessor")
 back to the current node. This allows us to go back to the 
 current node after finishing the left subtree — mimicking the
  behavior of a stack but without using one.


*/

function inorderTraversal(root) {
    const result = [];
    //curr: our current node as we traverse the tree.
    let curr = root;
    //pre: used to find the inorder
    //  predecessor (rightmost node in the left subtree of curr).
    let pre;

    while (curr !== null) {
        if (curr.left === null) {
            // If no left child, visit this node and go right
            /*
            If the current node does not have a left child, 
            we can visit it directly.
            We add curr.val to result.
            Move to the right child.
            This aligns with inorder traversal: if there’s no left 
            subtree, we visit the root, then go right.
            */
            result.push(curr.val);
            curr = curr.right;
        } else {
            // Find the rightmost node in left subtree (predecessor)
            //We go to the left child of curr.
            pre = curr.left;
            //Then we keep moving to the rightmost node of this
            //  left subtree (pre).
            //This pre node is the inorder predecessor of curr.
            while (pre.right !== null) {
                pre = pre.right;
            }

            // Make current node the right child of its predecessor
            pre.right = curr;
            //We create a temporary thread by pointing pre.right = curr.
            // Move current to its left child and remove the left link
            let temp = curr;
            //Then move curr to curr.left to keep going down the left subtree.
            curr = curr.left;
            //We set temp.left = null so that when 
            // we revisit curr, we know it was already 
            // threaded and not a true left child anymore. 
            // This acts like a visited flag.
            //This lets us return to curr later when we finish the left subtree.
            temp.left = null;
        }
    }
/*
When the traversal comes back 
(because of the thread we created), 
curr.left will be null, so the code will go 
into the Case 1 block and visit curr, then proceed 
to curr.right — which is already set to the correct 
next node because of our thread.
*/
    return result;
}

/*
Step-by-Step Explanation
1.Initialization
    result is an array to store the inorder traversal values.
    curr starts at the root of the tree.

2.Main Loop (while (curr !== null))
    The loop continues until we have traversed all nodes.

3.Case 1: No Left Child (curr.left === null)

    If the current node has no left child:
        Visit the current node by adding curr.val to result.
        Move to the right child (curr = curr.right).
    This is the standard inorder visit: left → node → right.
        Since no left subtree exists, we visit the node and move right.

4.Case 2: Left Child Exists
    Find the inorder predecessor of the current node:
        The predecessor is the rightmost node in the 
        current node's left subtree.

    This is done by:

    pre = curr.left;
    while (pre.right !== null) {
        pre = pre.right;
    }
    Create a temporary thread (link) from the predecessor's 
    right pointer to the current node:
        pre.right = curr;

    This "thread" allows us to return to the current node
    after finishing the left subtree traversal without using
    a stack or recursion.

    Move curr to its left child to continue traversal:

    let temp = curr;
    curr = curr.left;
    temp.left = null; // Remove the left link to avoid loops

    Removing the left link (temp.left = null) ensures we don't 
    revisit the same subtree infinitely.

How Does This Achieve Inorder Traversal?
    By creating a temporary link from the predecessor to the 
    current node, the algorithm can:

    Traverse down the left subtree.
    When it reaches the leftmost node, it visits it.
    Then it follows the thread back to the parent node.
    Visits the parent node.
    Then moves to the right subtree.
    This simulates the recursive call stack without actually using one.

Key Points
No Recursion or Stack: Uses tree modification to keep track of nodes.

Space Efficient: Uses O(1) extra space besides the output list.

Restores Tree Structure: By removing the left link after moving left, the tree is restored to its original form.

Example Walkthrough
For a tree:


    1
   / \
  2   3
 / \
4   5
Start at 1, has left subtree → find predecessor in left subtree (5).

Create thread 5.right = 1.

Move to 2, has left subtree → find predecessor (4).

Create thread 4.right = 2.

Move to 4, no left child → visit 4.

Follow thread back to 2 → visit 2.

Move to 5, no left child → visit 5.

Follow thread back to 1 → visit 1.

Move to 3, no left child → visit 3.

*/
