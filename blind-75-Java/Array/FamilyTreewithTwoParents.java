/*
 * Family Tree with Two Parents: Sibling, Cousin, and Common Ancestor Queries
 * 
 * Problem Statement
You are given an infinite ancestral tree where each person
 has exactly two parents (i.e., a paternal and a maternal parent). 
 The ancestry graph is a directed acyclic graph (DAG), not a tree.
Each person is represented by a unique integer id. 
You have access to the following API:

interface Person {
    int getId();
    Person getParent1(); // Returns one parent (could be null)
    Person getParent2(); // Returns the other parent (could be null)
}

Implement the following functions:
1.	isSibling(Person a, Person b):
Return true if a and b share at least one parent.
2.	isFirstCousin(Person a, Person b):
Return true if a and b are first cousins (i.e., their parents are siblings).
3.	lowestCommonAncestor(Person a, Person b):
Return the lowest common ancestor (LCA) of a and b 
(the ancestor closest to both, i.e., with minimal distance 
from both nodes). If there are multiple such ancestors, return any.
Assume the ancestry graph is infinite, but queries will only
 involve a finite number of persons (i.e., you never need to 
 traverse the whole infinite graph).


            ┌───────┐     ┌───────┐       ┌───────┐     ┌───────┐
           │ G1    │     │ G2    │       │ G3    │     │ G4    │
           └───────┘     └───────┘       └───────┘     └───────┘
               │           │               │           │
               ▼           ▼               ▼           ▼
           ┌───────┐     ┌───────┐       ┌───────┐     ┌───────┐
           │ P1    │     │ P2    │       │ P3    │     │ P4    │
           └───────┘     └───────┘       └───────┘     └───────┘
               │           │               │           │
               ▼           ▼               ▼           ▼
                 ┌─────────────┐         ┌─────────────┐
                 │ A           │         │ B           │
                 └─────────────┘         └─────────────┘

      1. 🔁 Sibling Check: isSibling(A, B)
A’s parents: P1, P2

B’s parents: P3, P4

Let’s say:

P1 and P3 are siblings (they share a parent)

P2 and P4 are siblings (they share a parent)

👉 A and B do not share any parent → ❌ Not siblings

2. 👨‍👩‍👧‍👦 First Cousin Check: isFirstCousin(A, B)
Now check if A's parent (P1 or P2) is a sibling of B's parent (P3 or P4):

P1 and P3 → ✅ Siblings

Therefore, A and B are first cousins → ✅ isFirstCousin(A, B) returns true

3. 🔍 Lowest Common Ancestor (LCA)
Now suppose we go one more level down:


                 ┌─────────────┐         ┌─────────────┐
                 │ A           │         │ B           │
                 └─────┬───────┘         └─────┬───────┘
                       │                         │
                       ▼                         ▼
                  ┌────────┐                ┌────────┐
                  │ X      │                │ Y      │
                  └────────┘                └────────┘
Let’s find lowestCommonAncestor(X, Y).

X → child of A

Y → child of B

A and B are first cousins

Their lowest common ancestors may be one of the grandparents like G1, G2, G3, or G4, depending on shared lineage.

If:

P1 and P3 are both children of G1, and

P2 and P4 are both children of G2

Then:

G1 and G2 are shared ancestors of both X and Y

But they’re 2 generations up

So BFS will compute:

Depth from X to G1 = 3 (X → A → P1 → G1)

Depth from Y to G1 = 3 (Y → B → P3 → G1)

Thus:
✅ LCA = G1 (or G2), with a total depth = 6

📌 Summary
Query	What to look for
isSibling(A, B)	A and B share at least one parent
isFirstCousin(A, B)	Parents of A and B are siblings
lowestCommonAncestor(X, Y)	Closest shared ancestor (least sum of depth from X and Y)           
======================
Each Person has two parents — just like in real life (a mother and a father).

So the ancestry structure fans out upward.

There can be shared ancestors across different branches (since people can be related in multiple ways).

You’re given a stream of Person objects (with getParent1() and getParent2() APIs), and you have to answer queries about their relationships.

  [G1]   [G2]         [G3]   [G4]
    \     /             \     /
    [P1]                 [P2]
       \               /
          [C1]     [C2]
             \     /
             [X] [Y]
G1 and G2 are parents of P1.

G3 and G4 are parents of P2.

P1 and P2 are parents of C1 and C2.

C1 and C2 are parents of X and Y.

So the structure goes upward like this:

Each node/person has 2 parents.

A person’s parents can also have parents (and so on).

You’re not storing the entire tree — you only work with a finite set of people at query time.

*/
package Array;

import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;

// class Pair<K, V> {
//   private K key;
//   private V value;

//   public Pair(K key, V value) {
//     this.key = key;
//     this.value = value;
//   }

//   public K getKey() {
//     return key;
//   }

//   public V getValue() {
//     return value;
//   }
// }

// class Person {
//   int id;
//   Person p1, p2;

//   public Person(int id) {
//     this.id = id;
//   }

//   public Person(int id, Person p1, Person p2) {
//     this.id = id;
//     this.p1 = p1;
//     this.p2 = p2;
//   }

//   public int getId() {
//     return id;
//   }

//   public Person getParent1() {
//     return p1;
//   }

//   public Person getParent2() {
//     return p2;
//   }

//   @Override
//   public boolean equals(Object o) {
//     return o instanceof Person && ((Person) o).id == this.id;
//   }

//   @Override
//   public int hashCode() {
//     return Integer.hashCode(id);
//   }

//   @Override
//   public String toString() {
//     return "P" + id;
//   }
// }

// public class FamilyTreewithTwoParents {
//   public static boolean isSibling(Person a, Person b) {
//     return a.getParent1() != null && (a.getParent1() == b.getParent1() || a.getParent1() == b.getParent2())
//         || a.getParent2() != null && (a.getParent2() == b.getParent1() || a.getParent2() == b.getParent2());
//   }

//   public static boolean isFirstCousin(Person a, Person b) {
//     for (Person pa : List.of(a.getParent1(), a.getParent2())) {
//       for (Person pb : List.of(b.getParent1(), b.getParent2())) {
//         if (pa != null && pb != null && isSibling(pa, pb)) {
//           return true;
//         }
//       }
//     }
//     return false;
//   }

//   private static Map<Person, Integer> getAncestorsWithDepth(Person p) {
//     Map<Person, Integer> map = new HashMap<>();
//     Queue<Pair<Person, Integer>> queue = new LinkedList<>();
//     queue.offer(new Pair<>(p, 0));

//     while (!queue.isEmpty()) {
//       Pair<Person, Integer> curr = queue.poll();
//       Person node = curr.getKey();
//       int depth = curr.getValue();
//       if (node == null || map.containsKey(node))
//         continue;
//       map.put(node, depth);
//       queue.offer(new Pair<>(node.getParent1(), depth + 1));
//       queue.offer(new Pair<>(node.getParent2(), depth + 1));
//     }
//     return map;
//   }

//   public static Person lowestCommonAncestor(Person a, Person b) {
//     Map<Person, Integer> da = getAncestorsWithDepth(a);
//     Map<Person, Integer> db = getAncestorsWithDepth(b);
//     int minDepth = Integer.MAX_VALUE;
//     Person lca = null;

//     for (Person p : da.keySet()) {
//       if (db.containsKey(p)) {
//         int d = da.get(p) + db.get(p);
//         if (d < minDepth) {
//           minDepth = d;
//           lca = p;
//         }
//       }
//     }
//     return lca;
//   }

//   public static void main(String[] args) {
//     Person g1 = new Person(1);
//     Person g2 = new Person(2);
//     Person g3 = new Person(3);
//     Person g4 = new Person(4);

//     Person p1 = new Person(5, g1, g2);
//     Person p2 = new Person(6, g1, g2);
//     Person p3 = new Person(7, g3, g4);
//     Person p4 = new Person(8, g3, g4);

//     Person a = new Person(9, p1, p3);
//     Person b = new Person(10, p2, p4);

//     System.out.println("Are A and B siblings? " + isSibling(a, b));
//     System.out.println("Are A and B first cousins? " + isFirstCousin(a, b));
//     System.out.println("LCA of A and B: " + lowestCommonAncestor(a, b));
//   }
// }
/*
 * This is a utility class to store two associated values 
 * (a "key" and a "value") of any types. Used for the
 *  breadth-first search (BFS) later.

getKey() and getValue() just return the stored key and value.
 * 
*/
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

class Person {
  // Each Person has an id and two parents (p1, p2).
  // If a person has a parent unknown, that parent is null.
  int id;
  Person p1, p2;

  // Initialize a person with just an id, or with two parents.
  public Person(int id) {
    this.id = id;
  }

  public Person(int id, Person p1, Person p2) {
    this.id = id;
    this.p1 = p1;
    this.p2 = p1;
  }

  public int getId() {
    return this.id;
  }

  public Person getParent1() {
    return p1;
  }

  public Person getParent2() {
    return p2;
  }

  // When comparing Person or using as a map key, only the id matters.
  @Override
  public boolean equals(Object o) {
    return o instanceof Person && ((Person) o).id == this.id;
  }

  @Override
  public int hashCode() {
    return Integer.hashCode(id);
  }

  // Easy-to-read version for printing people, e.g. P4.
  @Override
  public String toString() {
    return "P" + id;
  }
}

public class FamilyTreewithTwoParents {
  // Two people are siblings if they share at least one non-null parent.
  public static boolean isSibling(Person a, Person b) {
    System.out.println("Checking if " + a + " and " + b + " are siblings.");
    if (a.getParent1() != null) {
      System.out.println(a + " parent1: " + a.getParent1() + ", " +
          b + " parent1: " + b.getParent1() + ", parent2: " + b.getParent2());
    }
    if (a.getParent2() != null) {
      System.out.println(a + " parent2: " + a.getParent2() + ", " +
          b + " parent1: " + b.getParent1() + ", parent2: " + b.getParent2());
    }

    boolean result = (a.getParent1() != null && (a.getParent1() == b.getParent1() || a.getParent1() == b.getParent2()))
        ||
        (a.getParent2() != null && (a.getParent2() == b.getParent1() || a.getParent2() == b.getParent2()));
    System.out.println("Sibling result: " + result);
    return result;
  }

  // Two people are first cousins if at least one parent
  // from each is a sibling of a parent from the other.
  // Iterates over all combinations of parents.
  public static boolean isFirstCousin(Person a, Person b) {
    System.out.println("Checking if " + a + " and " + b + " are first cousins.");
    for (Person pa : Arrays.asList(a.getParent1(), a.getParent2())) {
      for (Person pb : Arrays.asList(b.getParent1(), b.getParent2())) {
        System.out.print("Comparing " + pa + " and " + pb + " as parents. ");
        if (pa != null && pb != null && isSibling(pa, pb)) {
          System.out.println("They are siblings. First cousin found.");
          return true;
        }
        System.out.println();
      }
    }
    System.out.println("They are not first cousins.");
    return false;
  }

  // BFS to collect all ancestors of p, recording their "distance" (depth) from p.
  private static Map<Person, Integer> getAncestorsWithDepth(Person p) {
    System.out.println("Getting ancestors for " + p);
    Map<Person, Integer> map = new HashMap<>();
    Queue<Pair<Person, Integer>> queue = new LinkedList<>();
    queue.offer(new Pair<>(p, 0));
    while (!queue.isEmpty()) {
      Pair<Person, Integer> curr = queue.poll();
      Person node = curr.getKey();
      int depth = curr.getValue();
      if (node == null || map.containsKey(node))
        continue;
      System.out.println("Adding ancestor: " + node + " at depth " + depth);
      map.put(node, depth);
      queue.offer(new Pair<>(node.getParent1(), depth + 1));
      queue.offer(new Pair<>(node.getParent2(), depth + 1));
    }
    System.out.println("map");
    System.out.println(map);

    return map;
  }

  // Finds the ancestor that is accessible from both a and b in the
  // fewest combined steps. This is a generalization of the classic Lowest Common
  // Ancestor for graphs with multiple parents.
  public static Person lowestCommonAncestor(Person a, Person b) {
    System.out.println("Finding LCA for " + a + " and " + b);
    Map<Person, Integer> da = getAncestorsWithDepth(a);
    Map<Person, Integer> db = getAncestorsWithDepth(b);
    System.out.println("Ancestors of " + a + ": " + da);
    System.out.println("Ancestors of " + b + ": " + db);
    int minDepth = Integer.MAX_VALUE;
    Person lca = null;
    for (Person p : da.keySet()) {
      if (db.containsKey(p)) {
        int d = da.get(p) + db.get(p);
        System.out.println("Common ancestor: " + p + " (distance sum: " + d + ")");
        if (d < minDepth) {
          minDepth = d;
          lca = p;
          System.out.println("LCA updated to: " + lca);
        }
      }
    }
    System.out.println("Final LCA: " + lca);
    return lca;
  }

  /*
   * Creates a simple family tree:
   * - g1, g2, g3, g4 are the grandparents.
   * - p1, p2 are children of (g1,g2), i.e. siblings.
   * - p3, p4 are children of (g3,g4), also siblings.
   * - a is a child of (p1, p3). b is a child of (p2,p4).
   * 
   * Prints whether a and b are siblings, cousins, and their lowest common
   * ancestor.
   * 
   */
  public static void main(String[] args) {
    Person g1 = new Person(1);
    Person g2 = new Person(2);
    Person g3 = new Person(3);
    Person g4 = new Person(4);

    Person p1 = new Person(5, g1, g2);
    Person p2 = new Person(6, g1, g2);
    Person p3 = new Person(7, g3, g4);
    Person p4 = new Person(8, g3, g4);

    Person a = new Person(9, p1, p3);
    Person b = new Person(10, p2, p4);
    // System.out.println("Are A and B sibling ? " + isSibling(a, b));
    // System.out.println("Are A and B first cousins ? " + isFirstCousin(a, b));
    // System.out.println("LCA of  A and B :" + lowestCommonAncestor(a, b));
    Person s1 = new Person(11, g1, g2); // a direct child of g1 and g2
    Person s2 = new Person(12, g1, g2); // another direct child of g1 and g2

    // System.out.println("Are S1 and S2 siblings? " + isSibling(s1, s2)); // should be true
    // System.out.println("Are S1 and S2 first cousins? " + isFirstCousin(s1, s2)); // should be false
    // System.out.println("LCA of S1 and S2: " + lowestCommonAncestor(s1, s2));

    Person cousin1 = new Person(13, p1, p3);
    Person cousin2 = new Person(14, p2, p3); // shares p3 with cousin1

    // System.out.println("Are Cousin1 and Cousin2 siblings? " + isSibling(cousin1, cousin2)); // should be false
    // System.out.println("Are Cousin1 and Cousin2 first cousins? " + isFirstCousin(cousin1, cousin2)); // should be true
    // System.out.println("LCA of Cousin1 and Cousin2: " + lowestCommonAncestor(cousin1, cousin2));
    Person orphan = new Person(16);

System.out.println("Are Orphan and G1 siblings? " + isSibling(orphan, g1)); // false (no parents for orphan)
System.out.println("Are Orphan and G1 first cousins? " + isFirstCousin(orphan, g1)); // false
System.out.println("LCA of Orphan and G1: " + lowestCommonAncestor(orphan, g1)); // null, since they are unrelated

  }
}
