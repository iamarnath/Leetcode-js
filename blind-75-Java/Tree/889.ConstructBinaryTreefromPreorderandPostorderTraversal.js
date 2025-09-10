/*
889. Construct Binary Tree from Preorder and Postorder Traversal

Given two integer arrays, preorder and postorder where
 preorder is the preorder traversal of a binary tree of
  distinct values and postorder is the postorder traversal of 
  the same tree, reconstruct and return the binary tree.

If there exist multiple answers, you can return any of them.

Example 1:
Input: preorder = [1,2,4,5,3,6,7], postorder = [4,5,2,6,7,3,1]
Output: [1,2,3,4,5,6,7]
Example 2:

Input: preorder = [1], postorder = [1]
Output: [1]
 

Constraints:

1 <= preorder.length <= 30
1 <= preorder[i] <= preorder.length
All the values of preorder are unique.
postorder.length == preorder.length
1 <= postorder[i] <= postorder.length
All the values of postorder are unique.
It is guaranteed that preorder and postorder are the preorder 
traversal and postorder traversal of the same binary tree.

*/

function TreeNode(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}
/*
Parameters:

prestart: Start index in preorder list
poststart: Start index in postorder list
preend: End index in preorder list
preorder: The preorder traversal array
postorder: The postorder traversal array
mp: A Map from node values to their indices in postorder for quick lookup
*/
function constructBT(prestart, poststart, preend, preorder, postorder, mp) {
    //Base case: If preorder start > end, there is no node in this subtree, so return null.
    if (prestart > preend) {
        return null;
    }
    //Create a new node: The first value in preorder for the 
    // current range is always the root of this subtree. 
    // A new TreeNode is created with this value.
    let root = new TreeNode(preorder[prestart]);
    //Base case (single node): If start equals end, 
    // there’s only one node left for this subtree; return the root node.
    if (prestart === preend) {
        return root;
    }
    //Identify left subtree root: The next value in 
    // preorder is the root of the left subtree.
    let nextNode = preorder[prestart + 1]; // root of left subtree
    //Find position of left subtree root in postorder:
    //  Use the map to get the index j of the 
    // left subtree root in postorder.
    let j = mp.get(nextNode);
    //Number of nodes in the left subtree: Subtract
    //  the start index of the postorder range from j and
    //  add one to get the count.
    let num = j - poststart + 1;
    //Recursively build the left subtree:
    //The new preorder range is prestart + 1 to prestart + num
    //The new postorder range is poststart to j
    /*
    Parameter Breakdown
prestart + 1:

The preorder index immediately after the root is always the root of the left subtree.

poststart:

The postorder segment for the left subtree starts at the current subtree's postorder start.

prestart + num:

num (calculated as j - poststart + 1) is the number of nodes in the left subtree.

The preorder segment for the left subtree ends at this index, so the recursive call includes all left subtree nodes in both traversals.

preorder, postorder, mp:

The main arrays and map for value-to-index lookups in postorder.

What This Achieves
This call extracts and uses only the nodes belonging to the left subtree according to the traversal order properties.

It ensures correct alignment of nodes between preorder (which lists roots first) and postorder (which lists roots last) for the recursive subtree construction.
    */
    root.left = constructBT(prestart + 1, poststart, prestart + num, preorder, postorder, mp);
    //Recursively build the right subtree:
    // The new preorder range is prestart + num + 1 to preend
    // The new postorder range is j + 1 to preend
    //In postorder traversal, the segment from poststart to j contains all nodes of the left subtree, since j is the index of the left subtree root (which is found next in preorder).

// Therefore, starting the right subtree with poststart = j + 1 excludes these left subtree nodes, correctly marking the beginning of the right subtree segment in postorder.

// prestart + num + 1 similarly skips past the left subtree in preorder to begin with the right subtree's root.

// This slicing ensures that the recursive building of the right subtree only uses the correct nodes from both traversals, avoiding overlap with the left subtree
/*
Parameter Breakdown
prestart + num + 1:

In the preorder array, this skips over the root node (prestart) and all left subtree nodes (num computed as j - poststart + 1), so it points to the start of the right subtree’s root in preorder.

j + 1:

In the postorder array, this skips over all left subtree nodes (which ended at index j), so this marks the start index for the right subtree nodes in postorder.

preend:
The right subtree in preorder goes up to the current subtree’s end index, so this marks the last node for this entire subtree.

preorder, postorder, mp:

The traversal arrays and the postorder value-to-index map for quick lookups.

What This Line Does
This call ensures that the right subtree for the current root node is built only from the nodes that are not part of the left subtree (as determined in the previously explained calculations).

It accurately slices both traversal arrays, aligning preorder and postorder pointers to the right subtree region, allowing recursive tree construction to continue for the right child.
*/
    root.right = constructBT(prestart + num + 1, j + 1, preend, preorder, postorder, mp);
    //Return the constructed subtree root node.
    return root;
}

function constructFromPrePost(preorder, postorder) {
    const n = preorder.length;
    const mp = new Map();
    for (let i = 0; i < n; i++) {
        mp.set(postorder[i], i);
    }
    return constructBT(0, 0, n - 1, preorder, postorder, mp);
}

// using 4 indices

function constructBT(prestart, preend, poststart, postend, preorder, postorder, mp) {
    if (prestart > preend) {
        return null;
    }

    // Root is always the first element in preorder slice
    let root = new TreeNode(preorder[prestart]);

    // Base case: if only one element, return it
    if (prestart === preend) {
        return root;
    }

    // The next element in preorder is the left child root
    let nextNode = preorder[prestart + 1];

    // Find its index in postorder
    let j = mp.get(nextNode);

    // Number of nodes in the left subtree
    let leftSize = j - poststart + 1;

    // Recursively construct left and right subtrees
    root.left = constructBT(
        prestart + 1, prestart + leftSize,         // preorder slice for left
        poststart, j,                             // postorder slice for left
        preorder, postorder, mp
    );

    root.right = constructBT(
        prestart + leftSize + 1, preend,          // preorder slice for right
        j + 1, postend - 1,                       // postorder slice for right
        preorder, postorder, mp
    );

    return root;
}

var constructFromPrePost = function(preorder, postorder) {
    const n = preorder.length;
    const mp = new Map();

    // Build map of postorder values -> index
    for (let i = 0; i < n; i++) {
        mp.set(postorder[i], i);
    }

    return constructBT(0, n - 1, 0, n - 1, preorder, postorder, mp);
};
