/*
 * Alice and Bob have an undirected graph of n nodes and 
 * three types of edges:

Type 1: Can be traversed by Alice only.
Type 2: Can be traversed by Bob only.
Type 3: Can be traversed by both Alice and Bob.
Given an array edges where edges[i] = [typei, ui, vi] 
represents a bidirectional edge of type typei between
 nodes ui and vi, find the maximum number of edges you 
 can remove so that after removing the edges, the graph 
 can still be fully traversed by both Alice and Bob.
  The graph is fully traversed by Alice and Bob if starting
   from any node, they can reach all other nodes.

Return the maximum number of edges you can remove,
 or return -1 if Alice and Bob cannot fully traverse the graph.

Example 1:
Input: n = 4, edges = [[3,1,2],[3,2,3],[1,1,3],[1,2,4],[1,1,2],[2,3,4]]
Output: 2
Explanation: If we remove the 2 edges [1,1,2] and [1,1,3].
 The graph will still be fully traversable by Alice and Bob.
  Removing any additional edge will not make it so. So the 
  maximum number of edges we can remove is 2.
Example 2:



Input: n = 4, edges = [[3,1,2],[3,2,3],[1,1,4],[2,1,4]]
Output: 0
Explanation: Notice that removing any edge will not 
make the graph fully traversable by Alice and Bob.
Example 3:
Input: n = 4, edges = [[3,2,3],[1,1,2],[2,3,4]]
Output: -1
Explanation: In the current graph, Alice cannot reach node 4 from the other nodes. Likewise, Bob cannot reach 1. Therefore it's impossible to make the graph fully traversable.

Constraints:

1 <= n <= 105
1 <= edges.length <= min(105, 3 * n * (n - 1) / 2)
edges[i].length == 3
1 <= typei <= 3
1 <= ui < vi <= n
All tuples (typei, ui, vi) are distinct.
 * 
 * 
*/
/*
 * TIME COMPLEXITY
Sorting the edges: O(E*logE), where E = number of edges.

DSU operations:

For each edge, you perform Find/Union operations, which are nearly constant time (amortized inverse Ackermann, practically constant due to path compression and union by rank).

So, overall, the loop is O(E * α(N)), where α is the inverse Ackermann function (virtually constant).

Total:

Dominated by sorting: O(E log E)

SPACE COMPLEXITY
There are two DSUs (one for Alice, one for Bob) storing arrays of size n+1 each.

The edges array uses O(E) space.

Total: O(N + E).

SUMMARY TABLE
Operation	        Time Complexity	    Space Complexity
Sorting             	O(E log E)	           O(E)
Loops (DSU)	            O(E α(N))	           O(N)
Total	                O(E log E)	            O(N + E)
 * 
*/
package Graphs;

import java.util.Arrays;

class DSU {
    /*
     * Defines a class DSU (Disjoint Set Union, also called Union Find) with private arrays:
parent: for each node, tracks its parent in the set.
rank: to optimize union (merge) by height.
components: number of connected components.
     * 
    */
    private int[] parent;
    private int[] rank;
    private int components;

    /*
     * Constructor: Builds the DSU for n nodes - 1-indexed (nodes 1 to n).
parent[i] = i initializes each node as its own parent (unique component).
components = n (start with each node isolated).
     * 
    */
    public DSU(int n) {
        parent = new int[n + 1];
        rank = new int[n + 1];
        components = n;
        for (int i = 1; i <= n; i++) {
            parent[i] = i;
        }
    }
    /*
     * Recursively finds the root parent of x.
Path compression: sets the direct parent to the root for efficiency.
     * 
    */
    public int find(int x) {
        if (x == parent[x]) {
            return x;
        }
        return parent[x] = find(parent[x]);
    }
    /*
     * Finds the ultimate parents of x and y.
If different, merges them.
Uses rank to link smaller tree under bigger for efficiency.
Decrements components as two components are joined.
     * 
    */

    public void union(int x, int y) {
        int xParent = find(x);
        int yParent = find(y);
        if (xParent == yParent) {
            return;
        }
        if (rank[xParent] > rank[yParent]) {
            parent[yParent] = xParent;
        } else if (rank[xParent] < rank[yParent]) {
            parent[xParent] = yParent;
        } else {
            parent[xParent] = yParent;
            rank[yParent]++;
        }
        components--;
    }
//Checks whether there's only one connected component (i.e., everything connected).
    public boolean isSingle() {
        return components == 1;
    }
}

public class RemoveMaxNumberofEdgesKeepGraphFullyTraversable1579 {
    public int maxNumEdgesToRemove(int n, int[][] edges) {
        //Sorts edges in descending order by type - ensures Type 3 edges (usable by both Alice and Bob) are handled first.
        Arrays.sort(edges, (v1, v2) -> v2[0] - v1[0]);
        //Creates two separate union-finds:
        //Alice: for herself
        //Bob: for himself
        DSU Alice = new DSU(n);
        DSU Bob = new DSU(n);
        //addedEdge: counts how many edges were needed/used.
        int addedEdge = 0;
        //type: 1 (Alice), 2 (Bob), or 3 (both)
        for (int[] edge : edges) {
            int type = edge[0];
            //u and v: the nodes connected by the edge.
            int u = edge[1];
            int v = edge[2];
            //Try to join u and v in both Alice’s and Bob’s graphs.
            //Only increment addedEdge if it actually connected 
            //something new in either graph (not a redundant edge).
            if (type == 3) {
                boolean add = false;
                if (Alice.find(u) != Alice.find(v)) {
                    Alice.union(u, v);
                    add = true;
                }
                if (Bob.find(u) != Bob.find(v)) {
                    Bob.union(u, v);
                    add = true;
                }
                if (add) {
                    addedEdge++;
                }
            }
            //Only join u and v in Bob’s DSU if not already connected.
            else if (type == 2) {
                if (Bob.find(u) != Bob.find(v)) {
                    Bob.union(u, v);
                    addedEdge++;
                }
            } 
            //Only join u and v in Alice’s DSU if not already connected.
            else {
                if (Alice.find(u) != Alice.find(v)) {
                    Alice.union(u, v);
                    addedEdge++;
                }
            }
        }
        //If both Alice’s and Bob’s graphs are fully connected (single component):
        if (Alice.isSingle() && Bob.isSingle()) {
            //Return the number of edges that are not needed (edges.length - addedEdge).
            return edges.length - addedEdge;
        }
        return -1;
    }

    public static void main(String[] args) {
        RemoveMaxNumberofEdgesKeepGraphFullyTraversable1579 sol = new RemoveMaxNumberofEdgesKeepGraphFullyTraversable1579();
        // example 1
        // int n = 4;
        // int[][] edges = {
        //         { 3, 1, 2 },
        //         { 3, 2, 3 },
        //         { 1, 1, 3 },
        //         { 1, 2, 4 },
        //         { 1, 1, 2 },
        //         { 2, 3, 4 }
        // };
        // example 2
        // int n = 4;
        // int[][] edges = {{3,1,2},{3,2,3},{1,1,4},{2,1,4}};
        // example 3
        int n =  4;
         int[][] edges = {{3,2,3},{1,1,2},{2,3,4}};
        int res = sol.maxNumEdgesToRemove(n, edges);
        System.out.println(res);
    }
}
/*
 Line-by-Line Explanation
javascript
if (Alice.find(u) !== Alice.find(v)) {
    Alice.union(u, v);
    added = true;
}
Alice.find(u) !== Alice.find(v)

Alice.find(u) returns the root (representative) of node u in Alice’s current set of connections.

Alice.find(v) returns the root of node v.

If the roots are different, u and v are not already connected in Alice’s component.

Alice.union(u, v);

Merges the two separate sets (containing u and v) together.

After this, both nodes will share the same root and be in the same component.

added = true;

Marks that this edge actually helped connect two previously separate components.

In the broader context, this prevents counting redundant (unnecessary) edges that don’t help connectivity.

Intuitive Example
Suppose Alice’s network looks like this:

Component 1: {1, 2, 3}, all connected already

Component 2: {4, 5}, connected, but separate from the first group

Now you want to process edge [x, 3, 4]:

Alice.find(3) might return root 1

Alice.find(4) might return root 4

The roots are different → so connecting these will join the two components!

After Alice.union(3, 4), all nodes {1,2,3,4,5} are connected.

If you later see another edge {x, 2, 5}, both now have the same root after previous merges, so the union would not do anything new.

Why This Is Important
Avoids redundancy: Only uses edges that are necessary to connect the graph, skipping edges that add no new connectivity.

Counts only effective edges: The added = true marker lets the algorithm know that this edge was essential.

Summary:
This snippet ensures an edge only gets used if it's actually needed to connect previously separate parts of Alice’s graph, making the network more connected without redundancy. 
 
*/
/*
Here is a visual explanation of how the union(x, y) function works in the Union-Find (Disjoint Set Union) data structure, including what happens when nodes are merged. This uses the "union by rank" strategy to optimize the process.

Step-by-Step Visualization
Suppose we start with nodes 1–5, initially their own parents:

Node	Parent	Rank
1	1	0
2	2	0
3	3	0
4	4	0
5	5	0
1. union(1, 2):
find(1) = 1, find(2) = 2 (different roots)

Both have equal rank.

Make 2 the parent of 1; increase rank to 1.

Node	Parent	Rank
1	2	0
2	2	1
3	3	0
4	4	0
5	5	0
Tree structure:

text
2 (rank 1)
└── 1
2. union(3, 4):
find(3) = 3, find(4) = 4

Both rank 0; make 4 the parent of 3, rank=1.

Node	Parent	Rank
1	2	0
2	2	1
3	4	0
4	4	1
5	5	0
Tree structure:

text
2 (rank 1)        4 (rank 1)
└── 1             └── 3
3. union(2, 4):
find(2) = 2, find(4) = 4

Both root, both rank 1. Tie!

Make 4 the parent of 2, rank becomes 2.

Node	Parent	Rank
1	2	0
2	4	1
3	4	0
4	4	2
5	5	0
Tree structure:

text
          4 (rank 2)
         /  |    \
       2    3    1
4. union(1, 3):
find(1) → parent=2 → parent=4 → root=4

find(3) → parent=4

Both roots are 4 (already same component).

No change.

5. union(4, 5):
find(4) → 4, find(5) → 5

rank=2, rank=0 — 4 is higher rank.

Attach root 5 to root 4; nothing else increases.
| Node | Parent | Rank |
|------|--------|------|
| 1 | 2 | 0 |
| 2 | 4 | 1 |
| 3 | 4 | 0 |
| 4 | 4 | 2 |
| 5 | 4 | 0 |

Final structure:

text
          4 (rank 2)
      /   |    |    \
     2    3    5    1
What Union Does (Summary Table)
Situation	Action
Different roots	Attach smaller rank root under larger rank root
Ranks equal	Arbitrarily choose one root, increment its rank
Already same root	Do nothing, return false
Patch parents	Path compression flattens during find(x) calls
Each successful union operation reduces the number of connected components (this.components--). 
 
*/
/*
What It's Doing
Base Case (self root):

If this.parent[x] === x, then x is the root of its set.

We just return it.

Recursive Case:

If x is not its own parent, it means it belongs to a larger set.

We recursively find the ultimate root of x.

Then we update this.parent[x] to that root:

js
this.parent[x] = this.find(this.parent[x]);
 This operation is called path compression.

 Path Compression Example
Suppose we initially did unions like this (a chain forms):

text
1 → 2 → 3 → 4  (root = 4)
Call find(1):

parent = 2 → find(2)

parent = 3 → find(3)

parent = 4 → return 4

Now on the way back up, all parents are updated:

text
parent[1] = 4
parent[2] = 4
parent[3] = 4
New structure after path compression:

text
1 → 4
2 → 4
3 → 4
4 → 4
The next time you call find(1) (or find(2), find(3)), it directly jumps to root 4 in O(1).

Complexity
Without path compression, find(x) could take O(N) in the worst case (a long chain).

With path compression, it becomes almost constant time:
O(α(N)), where α = inverse Ackermann function (so slow-growing that for all practical inputs ≤ 4).

 

*/
/*
class DSU {
    constructor(n) {
        this.parent = new Array(n + 1);
        this.rank = new Array(n + 1).fill(0);
        this.components = n;
        for (let i = 1; i <= n; i++) {
            this.parent[i] = i;
        }
    }

    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]); // Path compression
        }
        return this.parent[x];
    }

    union(x, y) {
        let rootX = this.find(x);
        let rootY = this.find(y);
        if (rootX === rootY) return false;

        if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
        } else if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
        } else {
            this.parent[rootX] = rootY;
            this.rank[rootY] += 1;
        }
        this.components--;
        return true;
    }

    isSingle() {
        return this.components === 1;
    }
}

function maxNumEdgesToRemove(n, edges) {
    // Sort edges by type in descending order (type 3 first)
    edges.sort((a, b) => b[0] - a[0]);

    let Alice = new DSU(n);
    let Bob = new DSU(n);
    let addedEdges = 0;

    for (let [type, u, v] of edges) {
        if (type === 3) {   // usable by both
            let added = false;
            if (Alice.find(u) !== Alice.find(v)) {
                Alice.union(u, v);
                added = true;
            }
            if (Bob.find(u) !== Bob.find(v)) {
                Bob.union(u, v);
                added = true;
            }
            if (added) addedEdges++;
        } 
        else if (type === 1) {  // Alice only
            if (Alice.find(u) !== Alice.find(v)) {
                Alice.union(u, v);
                addedEdges++;
            }
        } 
        else {   // type === 2, Bob only
            if (Bob.find(u) !== Bob.find(v)) {
                Bob.union(u, v);
                addedEdges++;
            }
        }
    }

    // Check connectivity
    if (Alice.isSingle() && Bob.isSingle()) {
        return edges.length - addedEdges; // removable edges
    } else {
        return -1; // not fully traversable
    }
}

// Example usage:

console.log(maxNumEdgesToRemove(4, [
    [3, 1, 2],
    [3, 2, 3],
    [1, 1, 3],
    [1, 2, 4],
    [1, 1, 2],
    [2, 3, 4]
])); 
// Output: 2

console.log(maxNumEdgesToRemove(4, [
    [3, 1, 2],
    [3, 2, 3],
    [1, 1, 4],
    [2, 1, 4]
])); 
// Output: 0

console.log(maxNumEdgesToRemove(4, [
    [3, 2, 3],
    [1, 1, 2],
    [2, 3, 4]
])); 
// Output: -1

 
*/
/*
We use two Disjoint Set Union (DSU) objects:

One for Alice’s graph

One for Bob’s graph

Sort edges so type 3 edges are processed first (shared edges are most useful).

For each edge:

If it connects new nodes in either graph, add it (addedEdges++).

Otherwise, it’s redundant and can be removed.

At the end:

If both Alice’s and Bob’s graphs are fully connected (isSingle()), return total removable edges edges.length - addedEdges.

Otherwise, return -1.

Step 4: Complexity Analysis
Union-Find operations:
Union and Find are nearly constant O(α(n)), where α is the inverse Ackermann function (extremely slow-growing, often ≤ 4 in practice).

Sorting edges:
O(E log E) where E = number of edges.

Processing edges:
O(E * α(N)) ≈ O(E)

 Time Complexity = O(E log E + E) = O(E log E)

Space Complexity:

Two Union-Find data structures: O(N) each

Input storage: O(E)

 Space Complexity = O(N + E) 

*/