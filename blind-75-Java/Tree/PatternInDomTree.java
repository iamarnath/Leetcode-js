
/*
 * Find Pattern Across Text Nodes in a DOM Tree
 * 
 * Given a DOM-like tree (see your diagram), where each text node
 *  contains a string, implement a function:
 * 
You're parsing the HTML:
 <span><b>This</b> is very<i> funny</i></span>

 This DOM tree, from your diagram, looks like this:

Node 1: <span>
├── Node 2: <b>
│   └── Node 4: "This"      <-- text node
├── Node 5: "is very"       <-- text node
└── Node 3: <i>
    └── Node 6: "funny"     <-- text node

So, in document (left-to-right) order, the text nodes are:

Node 4 → "This"

Node 5 → "is very"

Node 6 → "funny"

So, in document (left-to-right) order, the text nodes are:

Node 4 → "This"

Node 5 → "is very"

Node 6 → "funny"

🔍 Example Searches and Expected Outputs
Let’s now look at what your findText function will return for various search strings.

🔎 Search: "hi"
Text flow:

"This" → contains "hi" ✅
✅ Output: [[Node 4]]

🔎 Search: "his is very"
Text flow:

"This" + "is very" = "Thisis very" (No space between due to how DOM text nodes concatenate)

So "Thisis very" doesn't match "his is very" ❌

But if "This" has a trailing space (e.g., "This "), then:

"This " + "is very" → "This is very" ✅

So if:

Node 4 = "This "

Node 5 = "is very"

✅ Output: [[Node 4, Node 5]]

Otherwise, if Node 4 = "This" (no space), it won’t match "his is very".

🔎 Search: "is very fun"
Node 5: "is very"

Node 6: "funny"

Combined: "is veryfunny" ❌
But if Node 6 = " funny" (with space), then:

"is very funny" ✅

So output will be:
✅ [[Node 5, Node 6]]

| Search Pattern  | Matching Nodes                  | Note                   |
| --------------- | ------------------------------- | ---------------------- |
| `"hi"`          | `[Node 4]`                      | inside `"This"`        |
| `"his is very"` | `[Node 4, Node 5]` *(if space)* | only if `"This "`      |
| `"is very fun"` | `[Node 5, Node 6]` *(if space)* | `"is very" + " funny"` |


java
public List<List<Node>> findText(Node head, String search)
Return all lists of consecutive text nodes (in document order) whose concatenated text contains the search string as a substring. Each list should represent one occurrence of the search string (spanning one or more consecutive text nodes).

Example
Given the tree:

text
<span>
  <b>
    "This"
  </b>
  " is very"
  <i>
    " funny"
  </i>
</span>
Text nodes in order:

Node 4: "This"

Node 5: " is very"

Node 6: " funny"

Search:

"hi" → matches in "This" → [Node 4]

"his is very" → matches in "This is very" → [Node 4, Node 5]

"is very fun" → matches in " is very funny" → [Node 5, Node 6]

<span>
  <b>
    "This"
  </b>
  " is very"
  <i>
    " funny"
  </i>
</span>

*/
/*
 * 📈 Time & Space Complexity
Let n = number of text nodes, and L = average length of text strings.

Time Complexity:
collectTextNodes: O(N) where N = total nodes in tree.

Matching phase:

Outer loop = n

Inner loop = max n (each end)

Inside loop:

sb.append takes O(L) per append

contains also takes O(L)

So overall:
Worst-case: O(n² * L)
But in practice efficient due to:

Early termination via breaks

Skipping unnecessary checks

Space Complexity:
O(n) for storing textNodes + texts

O(n) for StringBuilder in worst case

O(k*m) for final result, if k matches of size m
 * 
*/
import java.util.*;

class Node {
    private String text;
    private List<Node> children = new ArrayList<>();

    Node(String text) {
        this.text = text;
    }

    Node() {
        this.text = null;// non text node
    }

    public boolean isText() {
        return text != null;
    }

    public String getText() {
        return text;
    }

    public List<Node> getChildren() {
        return children;
    }

    public void addChild(Node child) {
        children.add(child);
    }

    @Override
    public String toString() {
        return isText() ? "\"" + text + "\"" : "<element>";
    }
}
/*
 * You can’t simply search across single nodes because 
 * in a DOM-like tree, a full word or 
 * phrase can be split across many nodes.

By flattening the text nodes into a list, you
 can then look at every possible sequence of
  neighboring text nodes to check for the pattern.

This approach is universal for document trees 
where formatting/elements can break up logical
 phrases or words between nodes
 * 
*/
public class PatternInDomTree {
    //Given the root of the DOM tree and a search string,
    // return all matching sublists of consecutive text nodes that together contain the search string.
    public List<List<Node>> findText(Node head, String search) {
        System.out.println("[DEBUG] Starting findText with search = \"" + search + "\"");
        //textNodes: actual Node objects
        //texts: their string content
        List<Node> textNodes = new ArrayList<>();
        List<String> texts = new ArrayList<>();
       // System.out.println("[DEBUG] Collected textNodes: " + textNodes);
        //System.out.println("[DEBUG] Corresponding texts: " + texts);
        collectTextNodes(head, textNodes, texts);
        System.out.println("[DEBUG] Collected textNodes: " + textNodes);
        System.out.println("[DEBUG] Corresponding texts: " + texts);
        //Prepares an empty list result to store each sequence of text nodes giving a match.
        List<List<Node>> result = new ArrayList<>();
        int n = textNodes.size();
        //Outer loop: tries every possible starting position (index) among all text nodes.
        for (int start = 0; start < n; start++) {
            StringBuilder sb = new StringBuilder();
            //Inner loop: tries every ending position at or after start.
            //This way, every possible contiguous sub-sequence is examined,
            // one by one.
            for (int end = start; end < n; end++) {
                //Adds the text at the current end index to the builder.
                sb.append(texts.get(end));
                //Converts the builder to a string (current).
                String current = sb.toString();
                //Checks if the combined text from start to end contains the search substring.
            System.out.println("[DEBUG] Checking nodes from " + start + " to " + end +
                ": concatenated string = \"" + current + "\"");
                if (current.contains(search)) {
                    //If it matches, builds a list (match) containing all text nodes from start to end.
                    List<Node> match = new ArrayList<>();
                    for (int i = start; i <= end; i++) {
                        //Adds that matching group to result.
                        match.add(textNodes.get(i));
                    }
                         System.out.println("[DEBUG] Found match from index " + start + " to " + end +
                    ": nodes = " + match + ", text = \"" + current + "\"");
                    result.add(match);
                    //Breaks, so longer sequences starting at this start
                    // are not included if their sub-sequence already matched.
                    break;// add this to avoid overlapping longer matches
                }
                //If the current concatenated string is longer 
                //than the search string and still doesn’t contain it,
                //then extending it further won’t create a match—so 
                //break out of the inner loop early.

                if (sb.length() > search.length() && !current.contains(search)){
                            System.out.println(" Exiting early --"+ sb + " sb.length() "+sb.length()+ "=search.length()="+search.length()+"--search-- "+search + "--conatins --"+current.contains(search));
    
                    System.out.println("[DEBUG] Exiting early for start=" + start + " end=" + end + " as string too long and no match.");
                        break;
                    }
                   
            }
        }
        System.out.println("[DEBUG] Total matches found: " + result.size());
        return result;
    }
    //Recursively traverses the tree in pre-order fashion.
    //Only records non-empty text nodes.
    private void collectTextNodes(Node node, List<Node> textNodes, List<String> texts) {
        //If the node is null, do nothing.
        if (node == null) {
            System.out.println("[DEBUG] collectTextNodes called with null node.");
            return;
        }
        //If this node is a text node (not an element), and the text is not null/empty,
        //Add the node to textNodes,
        //Add its text to texts.
        if (node.isText() && node.getText() != null && !node.getText().isEmpty()) {
           // System.out.println("[DEBUG] Added text node: \"" + node.getText() + "\"");
            textNodes.add(node);
            texts.add(node.getText());
        }
        //For every child of this node, recursively call collectTextNodes.
        for (Node child : node.getChildren()) {
           // System.out.println("[DEBUG] Traversing child node: " + child);
            collectTextNodes(child, textNodes, texts);
        }
    }

    public static void main(String[] args) {
        Node span = new Node();// <span>
        Node b = new Node();// <b>
        Node i = new Node();
        Node n4 = new Node("This");
        Node n5 = new Node(" is very");
        Node n6 = new Node(" funny");
        b.addChild(n4);
        i.addChild(n6);

        span.addChild(b);
        span.addChild(n5);
        span.addChild(i);
        PatternInDomTree sol = new PatternInDomTree();

        // System.out.println("Search: \"hi\"");
        // printMatches(sol.findText(span, "hi"));

        // System.out.println("\nSearch: \"his is very\"");
        // printMatches(sol.findText(span, "his is very"));

        System.out.println("\nSearch: \"is very fun\"");
        printMatches(sol.findText(span, "is very fun"));

    }

    static void printMatches(List<List<Node>> matches) {
        for (List<Node> match : matches) {
            System.out.println(match);
        }
    }
}
