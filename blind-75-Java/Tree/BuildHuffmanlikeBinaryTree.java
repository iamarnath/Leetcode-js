/*
 * Problem: Build Huffman-like Binary Tree from Character-Value Map and Compute Node Levels

Description
You are given a map of characters to their integer codes, where each code is a binary string (composed of '0' and '1'). This map represents a prefix-free encoding similar to Huffman codes.
Your task is to:

 Construct a binary tree using these codes, where:   The root is at level 0.
  For each character's binary code, traverse the tree starting from the root, going left for
'0' and right for '1'.
  Create new nodes as needed.
  Each tree node stores an integer value equal to its level (the root's level is 0, its children are level 1, and so on).
  After building the tree, return the sum of all node values in the constructed tree.
 
Notes
  The input codes form a valid prefix-free set (no code is a prefix of another).
  You do not need to store the characters themselves in the nodes, only build the structure and assign levels accordingly.
  The sum should include all nodes created in the tree.

Example

Input:
codes = { 'a': "0",
'b': "10",
'c': "11"
}

Explanation:
-	Root level = 0
-	'a' path: "0" → left child of root (level 1)
-	'b' path: "10" → right child of root (level 1) → left child (level 2)
-	'c' path: "11" → right child of root (level 1) → right child (level 2)

Constructed Tree Nodes & Levels:
-	root: 0
-	root.left: 1 (for 'a')
-	root.right: 1 (shared prefix for 'b' and 'c')
-	root.right.left: 2 (for 'b')
-	root.right.right: 2 (for 'c') Sum = 0 + 1 + 1 + 2 + 2 = 6
Output: 6

We are given a map of characters → binary codes.
Each binary code is prefix-free (like Huffman codes). Example:

arduino
Copy
Edit
'a' → "0"
'b' → "10"
'c' → "11"
We need to:

Build a binary tree where:

The root node is at level 0.

'0' in a code means go left; '1' means go right.

Create new nodes if they don't exist.

Each node stores its level number (distance from the root).

Calculate the sum of all levels in the tree after inserting all codes.

Example
Input:

arduino
Copy
Edit
'a' → "0"
'b' → "10"
'c' → "11"
Step-by-step tree building:

Start with root (level 0).

Insert "0" for 'a':

Root → Left (level 1)
Tree:

Copy
Edit
  (0)
 /
(1)

Copy
Edit
Insert "10" for 'b':

Root → Right (level 1) → Left (level 2)
Tree:

Copy
Edit
  (0)
 /   \
(1) (1)
/
(2)

Copy
Edit
Insert "11" for 'c':

Root → Right (level 1) → Right (level 2)
Tree:

Copy
Edit
  (0)
 /   \
(1) (1)
/
(2) (2)

Copy
Edit
Sum of all node levels:

sql
Copy
Edit
0 (root) + 1 (left) + 1 (right) + 2 (right-left) + 2 (right-right)
= 6
Input:
codes = {
  'a': "0",
  'b': "10",
  'c': "11"
}

Explanation:
- Root level = 0
- 'a' path: "0" → left child of root (level 1)
- 'b' path: "10" → right child of root (level 1) → left child (level 2)
- 'c' path: "11" → right child of root (level 1) → right child (level 2)

Constructed Tree Nodes & Levels:
- root: 0
- root.left: 1 (for 'a')
- root.right: 1 (shared prefix for 'b' and 'c')
- root.right.left: 2 (for 'b')
- root.right.right: 2 (for 'c')

Sum = 0 + 1 + 1 + 2 + 2 = 6

Output: 6

 * 
*/

import java.util.HashMap;
import java.util.Map;

/*
 * How the Tree Looks for This Example
From the codes:

"0": root → left

"10": root → right → left

"11": root → right → right

Tree diagram with levels:

        (lvl 0)
        Root
       /    \
 (lvl 1)   (lvl 1)
   a       Internal
          /        \
     (lvl 2)     (lvl 2)
       b            c

 * 
*/
/*
 * Time Complexity
For building:

Let N = number of codes, and Lmax = maximum code length.

Inserting all codes: O(N · Lmax).

For summing levels:

Visits every node once: O(M) where M is number of nodes (≤ N·Lmax).

Overall: O(N·Lmax)

Space Complexity
Tree storage: O(M) ≤ O(N·Lmax)

Recursion call stack: O(height) ≤ O(Lmax)
 * 
*/
/*
 * Explanation of for (Map.Entry<Character, String> entry : codes.entrySet()) {
What is codes?
codes is a **Map<Character,String>`, e.g.:

java
{
  'a' -> "0",
  'b' -> "10",
  'c' -> "11"
}
What is .entrySet()?
entrySet() returns a Set of key–value pairs from the map.

Each element in that set is a Map.Entry<Character, String> object containing:

entry.getKey() → the character (e.g., 'a')

entry.getValue() → the binary string (e.g., "10")

What does the loop do?
The enhanced for loop iterates through each (Character, String) pair in the map.

On each iteration:

entry holds the current key–value pair.

The code calls:

insertCode(root, entry.getValue());
to insert that value path into the binary tree.
 * 
*/
/*
 * 1. Why are buildTreeAndSumLevels and insertCode written that way?
Design Overview:
These two functions are separated by their responsibilities:

a. buildTreeAndSumLevels(Map<Character, String> codes)
Purpose:
This is the high-level driver. It

Creates the root of the tree (level 0),

Loops over all binary codes in the codes map,

Calls insertCode to place each code’s path into the tree, one by one,

After all insertions, calls sumLevels to add up all node levels and returns the sum.

Why this structure?

Separation of concerns: It doesn’t care about how codes are inserted. It just manages which codes to insert and when to sum.

This makes it modular—if you later want to change how insertion works, you only change insertCode.

b. insertCode(Node root, String code)
Purpose:
This handles the actual insertion of a path (described by a string of '0's and '1's) into the tree.

For each bit:

If '0': Go left. If the left child doesn’t exist, create it.

If '1': Go right. If the right child doesn’t exist, create it.

Move one level deeper each time.

Each new node’s level is always parent’s level plus 1.

It doesn’t need to know which character’s code it is, just the path itself.

Why this way?

Because codes are variable length and can overlap (e.g., “0”, “10”, “11”), you build out the paths step by step.

By processing bit by bit, you naturally build a prefix tree (trie) and assign levels easily.
 * 
*/
// class Node {
//     int level;
//     Node left, right;

//     public Node(int level) {
//         this.level = level;
//     }
// }

public class BuildHuffmanlikeBinaryTree {
    /*
     * Node is an inner static class that represents each tree node.
     * 
     * Fields:
     * 
     * level: Integer indicating the depth (distance from root).
     * left, right: References to the left and right child nodes.
     * 
     * Constructor Node(int level):
     * 
     * When creating a node, you must supply its level.
     * No children initially (left and right are null by default).
     * 
     */
    static class Node {
        int level;
        Node left, right;

        Node(int level) {
            this.level = level;
        }
    }

    /*
     * Purpose: Builds the binary tree from the given codes
     * map and returns the sum of all node levels.
     * root = new Node(0):
     * Start with a root node at level 0.
     * Loop over codes:
     * For each character mapping ('a' -> "0", 'b' -> "10", etc.),
     * insert that binary path into the tree.
     * Finally: Return the sum of all levels by calling sumLevels(root).
     * 
     */
    // public int buildTreeAndSumLevels(Map<Character, String> codes) {
    // Node root = new Node(0);
    // for (Map.Entry<Character, String> entry : codes.entrySet()) {
    // insertCode(root, entry.getValue());
    // }
    // return sumLevels(root);
    // }
    public int buildTreeAndSumLevels(Map<Character, String> codes) {
        Node root = new Node(0);
        System.out.println("Starting to build tree...");
        System.out.println("Codes to insert: " + codes);

        for (Map.Entry<Character, String> entry : codes.entrySet()) {
            char ch = entry.getKey();
            String code = entry.getValue();
            System.out.printf("Inserting code for character '%c': %s%n", ch, code);
            insertCode(root, code);
        }

        System.out.println("Tree built. Now summing levels...");
        int sum = sumLevels(root);
        System.out.println("Sum of all node levels: " + sum);
        return sum;
    }

    /*
     * Traverses the tree according to code characters:
     * '0' means go left.
     * '1' means go right.
     * If the required child does not exist yet, create it at the next level
     * (current.level + 1).
     * Move current down the path until all bits of the code are processed.
     * Throws an exception if code contains an invalid character (not '0' or '1').
     * 
     */
    private void insertCode(Node root, String code) {
        Node current = root;
        System.out.println("code "+ code);
        for (int i = 0; i < code.length(); i++) {
            char c = code.charAt(i);
            System.out.printf("  Reading bit '%c' at level %d%n", c, current.level);
            if (c == '0') {
                if (current.left == null) {
                    current.left = new Node(current.level + 1);
                    System.out.printf("    Created LEFT child at level %d%n", current.left.level);
                }
                current = current.left;
            } else if (c == '1') {
                if (current.right == null) {
                    current.right = new Node(current.level + 1);
                    System.out.printf("    Created RIGHT child at level %d%n", current.right.level);
                }
                current = current.right;
            } else {
                throw new IllegalArgumentException("Invalid code char (must be '0' or '1')");
            }
        }
    }

    /*
     * Purpose: Return the sum of level values for all nodes in the subtree rooted
     * at node.
     * Base case: If node is null, contribute 0.
     * Otherwise, sum the current node’s level and recursively sum the levels in
     * left and right children.
     * 
     */
    private int sumLevels(Node node) {
        if (node == null) {
            return 0;
        }
        return node.level + sumLevels(node.left) + sumLevels(node.right);
    }

    public static void main(String[] args) {
        BuildHuffmanlikeBinaryTree sol = new BuildHuffmanlikeBinaryTree();
        Map<Character, String> codes = new HashMap<>();
        codes.put('a', "0");
        codes.put('b', "10");
        codes.put('c', "11");
        int sum = sol.buildTreeAndSumLevels(codes);
        System.out.println(sum);
    }
}
