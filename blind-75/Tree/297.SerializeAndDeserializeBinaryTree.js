/*
297. Serialize And Deserialize Binary Tree

Implement an algorithm to serialize and deserialize a binary tree.

Serialization is the process of converting an in-memory structure
 into a sequence of bits so that it can be stored or sent across
  a network to be reconstructed later in another computer environment.

You just need to ensure that a binary tree can be serialized
 to a string and this string can be deserialized to the
original tree structure. There is no additional restriction
on how your serialization/deserialization algorithm should work.

Note: The input/output format in the examples is the
same as how NeetCode serializes a binary tree.
You do not necessarily need to follow this format.

Input: root = [1,2,3,null,null,4,5]
Output: [1,2,3,null,null,4,5]

Input: root = []
Output: []

Constraints:

0 <= The number of nodes in the tree <= 1000.
-1000 <= Node.val <= 1000

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

function serialize(root) {
    if (root === null) {
        return "#";
    }
    return root.val + "," + serialize(root.left) + "," + serialize(root.right);
}
/*
The serialized data is a string representing a preorder
 traversal of the tree with # for null nodes.

The deserialization function uses a helper function that 
calls values.pop() to get the next value to process.

How .pop() works
.pop() removes and returns the last element of an array.

If you don't reverse the array, the first element of the
 preorder traversal (which should be processed first) is at
  index 0, i.e., at the start of the array.

Without reversing, using .pop() would process the last
 element first, which is incorrect for preorder.

By reversing
The first element of the preorder traversal moves to the
 end of the array.

Now, .pop() removes and returns the first element of the
 preorder traversal correctly.

This allows you to process the serialized data in the correct
 order using .pop().

*/
function deserialize(data) {
    console.log("data==",data)
    const values = data.split(",").reverse();

    console.log("values--",values);
    // console.log("values- reverse-",values.reverse())
    function buildTree() {
        const current = values.pop();
        console.log("current==",current);
        if (current == undefined || current == "#") {
            return null;
        }
        const node = new TreeNode(Number(current));
        node.left = buildTree(); // Recursively assign left/right children
        node.right = buildTree(); // Recursively assign left/right children
        /*
        How do these lines work?
            After creating a node with the current value, the code
             recursively assigns its left and right children by
              calling buildTree() for each.
            Each call to buildTree() consumes the next value 
            from the serialized data (typically from an array
             using .pop() or .shift()).
            The recursion mirrors the tree structure:
            First, assign the left child (which itself may have children).
            Then, assign the right child.
            If the next value is a null marker, 
            buildTree() returns null,
             so the child pointer is set to null.

            This process ensures that the tree is
             reconstructed in the same structure as it was serialized
        */
        return node;
    }
    return buildTree();
}


let root1 = [1, 2, 3, null, null, 4, 5]

let tree1 = buildTreeFromArray(root1);
//console.log("original tree==", tree1);
let encode = serialize(tree1);

//console.log("encode==", encode);

let decode = deserialize(encode);

//console.log("decode==", decode);

