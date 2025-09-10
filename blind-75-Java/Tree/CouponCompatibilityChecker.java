/*
 * Problem: Coupon Compatibility Verification in Category-Region Tree

Description
You are given a tree-like data structure representing categories
 of products and regions arranged hierarchically.
  Internal nodes represent categories or regions at various levels.
     Leaf nodes represent specific products or specific regions.
Each leaf node may have a set of coupons applicable to it.

You are also given a set of default coupons that apply generally.

Your task is to verify coupon compatibility for a particular
 combination of category and region:

Given a starting node for a category and a starting node for 
a region, traverse the tree down to the leaf nodes in the
 corresponding category and region subtrees.
For each pair of leaf nodes from category and region subtrees,
 check if there is any incompatible coupon with the set of default coupons.
 
  Return true if all leaf node pairs are compatible
   (i.e., no incompatible coupons found with default coupons), else false.

Notes:
  The tree nodes are structured such that each node has:  
   A name String ,
  Zero or more children,
  A set of coupons (applicable only at leaf nodes).
  Coupon compatibility means no coupon on a leaf node conflicts
   with any default coupon.
  You need to explore all leaf node pairs formed by leaf 
  descendants of the category node and the region node.

Example
Suppose you have the following trees: Category Tree:


Region Tree:

Default Coupons: {"C1", "C2"}

Query: Check compatibility starting from "Phones" and "Asia".

  Leaf category nodes under "Phones": iPhone, Samsung
  Leaf region nodes under "Asia": Delhi, Tokyo
Coupon pairs to examine:

(iPhone: {"C1"}, Delhi: {"C1"})
(iPhone: {"C1"}, Tokyo: {"C4"})
 Samsung: {"C3"}, Delhi: {"C1"})
 Samsung: {"C3"}, Tokyo: {"C4"})
 
Incompatibility check against default coupons {"C1", "C2"}:

  "Samsung" coupon "C3" is NOT in default coupons → incompatible.   So result should be false.

 * 
*/
/*
 * 1. Time Complexity Analysis
Stages:
getLeafNodes(categoryNode)

Traverses the whole subtree under categoryNode.

Visits every node once, O(M), where M = number of nodes in 
categoryNode's subtree.

getLeafNodes(regionNode)

Similarly O(N), where N = number of nodes in regionNode's subtree.

Compatibility checks

For every pair of category-leaf and region-leaf:

Suppose:

L1 = # of leaf nodes under categoryNode

L2 = # of leaf nodes under regionNode

Each leaf pair runs areCouponsCompatible

Each compatibility check is O(S), where S = total coupon 
count per leaf (O(1) if coupon sets are small, 
else O(max leaf coupon set size)).

Total: O(L1 * L2 * S)

Total Time Complexity:
O(M+N+L1×L2×S)
O(M + N) for traversing to collect leaves.

O(L1 * L2 * S) for pairwise compatibility checks.

If every node is a leaf, this becomes O(M * N * S).

2. Space Complexity Analysis
getLeafNodes stores leaves: O(L1) and O(L2)

The stack for traversal: O(depth of tree) (but usually O(M) if 
very deep tree)

No extra space beyond these lists

Total Space Complexity:

O(M+N)
(for the lists of nodes and traversal stack)
 * 
*/
import java.util.*;

public class CouponCompatibilityChecker {
  //Node represents a node in either a Category tree or a Region tree.
  // Fields:
  // name → the name of the category or region.
  // children → list of child nodes (subcategories or subregions).
  // coupons → set of coupon codes applicable to this node.
  static class Node {
    String name;
    List<Node> children;
    Set<String> coupons;
    //Initializes the node with a given name.
// Creates empty children and coupons collections.
    Node(String name) {
      this.name = name;
      this.children = new ArrayList<>();
      this.coupons = new HashSet<>();
    }
    //Returns true if the node has no children (meaning it’s a leaf node).
    boolean isLeaf() {
      return children.isEmpty();
    }
  }

  // collect all leaf nodes
  // approach 1 using DFS
  // private List<Node> getLeafNodes(Node node) {
  //   List<Node> leaves = new ArrayList<>();
  //   //Returns a list of all leaf nodes under a given node (subtree).
  //   if (node == null)
  //     return leaves;
  //   if (node.isLeaf()) {
  //     leaves.add(node);
  //   } else {
  //     for (Node child : node.children) {
  //       leaves.addAll(getLeafNodes(child));
  //     }
  //   }
  //   return leaves;
  // }
  // approach 2 using BFS Deque

   /** Collect all leaf nodes under a subtree rooted at `node`. */
    private List<Node> getLeafNodes(Node node) {
        List<Node> leaves = new ArrayList<>();
        if (node == null) return leaves;
        Deque<Node> stack = new ArrayDeque<>();
        //Uses an explicit stack for DFS traversal instead of recursion.
// (DFS = Depth First Search)

// Starts by pushing the given node onto the stack.
        stack.push(node);
//Loops until all nodes are processed.

// Pops the latest node from the stack.
        while (!stack.isEmpty()) {
            Node curr = stack.pop();
            System.out.println("Visiting node: " + curr.name);
            //If the current node is a leaf, add it to the result list.
            if (curr.isLeaf()) {
                System.out.println("Found leaf: " + curr.name + ", coupons: " + curr.coupons);
                leaves.add(curr);
            } else {
              //If it’s not a leaf, push all its children onto the stack for further traversal.
                for (Node child : curr.children) {
                    stack.push(child);
                }
            }
        }
        return leaves;
    }
//Gets all possible leaf combinations from both trees:

// categoryLeaves → all products/subcategories without children.

// regionLeaves → all smallest subregions.
  public boolean checkCouponCompatibility(Node categoryNode, Node regionNode, Set<String> defaultCoupons) {
    System.out.println("Finding leaf nodes in category tree rooted at: " + categoryNode.name);
    List<Node> categoryLeaves = getLeafNodes(categoryNode);
    System.out.println("Finding leaf nodes in region tree rooted at: " + regionNode.name);
    List<Node> regionLeaves = getLeafNodes(regionNode);

    for (Node cLeaf : categoryLeaves) {
      for (Node rLeaf : regionLeaves) {
        //For each pair, check if both coupon sets are 
        //compatible with defaultCoupons.
        // If any pair is incompatible, return false
        // immediately (short circuit).
          System.out.println("Category leaf: " + cLeaf.name + ", coupons: " + cLeaf.coupons +
                               " | Region leaf: " + rLeaf.name + ", coupons: " + rLeaf.coupons);
            boolean compatible = areCouponsCompatible(cLeaf.coupons, rLeaf.coupons, defaultCoupons);
            System.out.println("Compatible? " + compatible);
            if (!compatible) {
                System.out.println("Incompatible pair found! Stopping check.");
                return false;
            }
      }
    }
     System.out.println("All pairs compatible!");
    return true;
  }
  //This checks both coupon sets against the default allowed list (defaultCoupons).

  //If any coupon is not in the default set, the pair is incompatible.
  private boolean areCouponsCompatible(Set<String> coupons1, Set<String> coupons2, Set<String> defaultCoupons) {
    for (String c : coupons1) {
       if (!defaultCoupons.contains(c)) {
            System.out.println("Coupon " + c + " from coupons1 not in defaultCoupons");
            return false;
        }
    }
    for (String c : coupons2) {
        if (!defaultCoupons.contains(c)) {
            System.out.println("Coupon " + c + " from coupons2 not in defaultCoupons");
            return false;
        }
    }
    return true;
  }


  // Example usage
  // example false
  // public static void main(String[] args) {
  // CouponCompatibilityChecker checker = new CouponCompatibilityChecker();

  // // Build Category Tree
  // Node electronics = new Node("Electronics");
  // Node phones = new Node("Phones");
  // Node laptops = new Node("Laptops");
  // Node iphone = new Node("iPhone"); iphone.coupons.add("C1");
  // Node samsung = new Node("Samsung"); samsung.coupons.add("C3");
  // Node macbook = new Node("MacBook"); macbook.coupons.add("C2");

  // electronics.children.add(phones);
  // electronics.children.add(laptops);
  // phones.children.add(iphone);
  // phones.children.add(samsung);
  // laptops.children.add(macbook);

  // // Build Region Tree
  // Node asia = new Node("Asia");
  // Node india = new Node("India");
  // Node japan = new Node("Japan");
  // Node delhi = new Node("Delhi");
  // delhi.coupons.add("C1");
  // Node tokyo = new Node("Tokyo");
  // tokyo.coupons.add("C4");

  // asia.children.add(india);
  // //asia.children.add(japan);
  // india.children.add(delhi);
  // // japan.children.add(tokyo);

  // Set<String> defaultCoupons = new HashSet<>(Arrays.asList("C1", "C2"));

  // boolean result = checker.checkCouponCompatibility(phones, asia,
  // defaultCoupons);
  // System.out.println("Compatibility: " + result); // Expected: false
  // }
  //result true
  public static void main(String[] args) {
  CouponCompatibilityChecker checker = new CouponCompatibilityChecker();

  // Build Category Tree
  Node electronics = new Node("Electronics");
  Node phones = new Node("Phones");
  Node laptops = new Node("Laptops");

  Node iphone = new Node("iPhone");
  iphone.coupons.add("C1"); // ✅ in default

  Node samsung = new Node("Samsung");
  samsung.coupons.add("C2"); // ✅ in default

  Node macbook = new Node("MacBook");
  macbook.coupons.add("C1"); // ✅ in default

  electronics.children.add(phones);
  electronics.children.add(laptops);
  phones.children.add(iphone);
  phones.children.add(samsung);
  laptops.children.add(macbook);

  // Build Region Tree
  Node asia = new Node("Asia");
  Node india = new Node("India");
  Node japan = new Node("Japan");

  Node delhi = new Node("Delhi");
  delhi.coupons.add("C2"); // ✅ in default

  Node tokyo = new Node("Tokyo");
  tokyo.coupons.add("C1"); // ✅ in default

  asia.children.add(india);
  asia.children.add(japan);
  india.children.add(delhi);
  japan.children.add(tokyo);

  // Default coupons include ALL used leaf coupons
  Set<String> defaultCoupons = new HashSet<>(Arrays.asList("C1", "C2"));

  boolean result = checker.checkCouponCompatibility(phones, asia,
  defaultCoupons);
  System.out.println("Compatibility result: " + result); // Expected: true
  }

}
