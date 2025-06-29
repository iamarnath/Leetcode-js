/*
3108. Minimum Cost Walk in Weighted Graph
There is an undirected weighted graph with n 
vertices labeled from 0 to n - 1.

You are given the integer n and an array edges,
 where edges[i] = [ui, vi, wi] indicates that 
 there is an edge between vertices ui and vi with a weight of wi.

A walk on a graph is a sequence of vertices 
and edges. The walk starts and ends with a vertex,
 and each edge connects the vertex that comes 
 before it and the vertex that comes after it.
  It's important to note that a walk may visit the
   same edge or vertex more than once.

The cost of a walk starting at node u
 and ending at node v is defined as the
  bitwise AND of the weights of the edges 
  traversed during the walk. In other words,
   if the sequence of edge weights encountered
    during the walk is w0, w1, w2, ..., wk, then
     the cost is calculated as w0 & w1 & w2 & ... & wk, 
     where & denotes the bitwise AND operator.

You are also given a 2D array query, 
where query[i] = [si, ti]. For each query, you
 need to find the minimum cost of the walk
  starting at vertex si and ending at vertex ti.
   If there exists no such walk, the answer is -1.

Return the array answer, where answer[i] 
denotes the minimum cost of a walk for query i.

Example 1:

Input: n = 5, edges = [[0,1,7],[1,3,7],[1,2,1]], query = [[0,3],[3,4]]

Output: [1,-1]

Explanation:


To achieve the cost of 1 in the first query,
 we need to move on the following edges:
  0->1 (weight 7), 1->2 (weight 1), 2->1 (weight 1), 1->3 (weight 7).

In the second query, there is no walk 
between nodes 3 and 4, so the answer is -1.

Example 2:

Input: n = 3, edges = [[0,2,7],[0,1,15],[1,2,6],[1,2,1]], query = [[1,2]]

Output: [0]

Explanation:
To achieve the cost of 0 in the first query,
 we need to move on the following edges:
  1->2 (weight 1), 2->1 (weight 6), 1->2 (weight 1).

Constraints:

2 <= n <= 105
0 <= edges.length <= 105
edges[i].length == 3
0 <= ui, vi <= n - 1
ui != vi
0 <= wi <= 105
1 <= query.length <= 105
query[i].length == 2
0 <= si, ti <= n - 1
si != ti

*/
/*
1. Merging Components and Updating Cost

if (parent_u !== parent_v) {
    cost[parent_u] &= cost[parent_v];
    union(parent_u, parent_v);
}
What’s happening?

When two nodes u and v are in different components
 (i.e., their root parents are different), you are 
 about to connect them via the edge [u, v, w].

Before merging:
You update the cost of the new root (parent_u)
 by AND-ing it with the cost of the other root
  (parent_v). This ensures that the new component’s 
  cost reflects the AND of all its previous components.

Then:
You merge the components by making parent_u 
the parent of parent_v.

Why is this needed?

You want to maintain, for each connected component,
 the minimum possible AND value of all edge weights in that component.

When two components merge, the AND of their 
costs represents the combined effect of all previous edges in both components.

2. Updating with the Current Edge’s Weight
js
cost[parent_u] &= w;
What’s happening?

After merging (or even if there was no merge),
 you further update the cost of the root by AND-ing
  it with the current edge’s weight w.

Why is this needed?

Every time you add an edge to a component,
 the minimum AND-cost for that component should include this new edge.

This ensures that the cost always reflects the
 AND of all edge weights in the component.

In Short
Merging costs: Ensures that when two sets are joined, 
their cost is the AND of all edge weights in both sets so far.

AND with edge: Ensures that the new edge’s weight is 
included in the cost calculation for the connected component.

Example
Suppose you have three nodes: 0, 1, 2
Edges: [0,nd [1,
Initial costs: [-1, -1, -1] (since -1 is all bits set)

Add `[0, - Merge 0 and 1.

cost &= cost → -1 & -1 = -1

cost &= 6 → -1 & 6 = 6

Add `[1, - Find roots: 0 (for 1), 2 (for 2)

Merge 0 and 2.

cost &= cost → 6 & -1 = 6

cost &= 4 → 6 & 4 = 4

Now, the cost for the connected component is 4, which is
 the AND of all edge weights in the component.

Step	                    cost array	    Explanation
Initial	                    [-1, -1, -1]	All nodes separate
After 1st edge	            [6, -1, -1]	    0 and 1 connected, cost is 6
After 2nd edge	            [4, -1, -1]	     0, 1, 2 connected, cost is 6 & 4 = 4
In summary:
These lines are essential for maintaining the correct AND-cost for each connected component as edges are added and components are merged. Without them, your answer to the queries would be incorrect.

*/
/*
Time Complexity
DSU Operations (find and union):
Each operation is nearly O(1) amortized, due to path compression.

Processing all edges:
O(E * α(N)), where E = edges.length, α(N) is the inverse 
Ackermann function (very slow-growing, almost constant).

Processing all queries:
O(Q * α(N)), where Q = query.length.

Overall:
O((E + Q) * α(N)), which is very efficient.

Space Complexity
parent array: O(N)
cost array: O(N)
res array: O(Q)
Total: O(N + Q)

Summary
Efficiently manages connected components using DSU.
Tracks AND-cost for each component as edges are added.

*/
function minimumCost(n, edges, query) {
    //Initializes the parent array for Disjoint Set 
    // Union (DSU, also known as Union-Find). Each node 
    // is its own parent at the start.
    const parent = Array.from({ length: n }, (_, i) => i);
    //Initializes the cost array to store the
    //  "AND operation" cost for each component.
    //  All set to -1 initially.
    const cost = Array(n).fill(-1);
    //Defines the find function 
    // (with path compression) to find the
    //  representative (root) of the set containing node x.
    function find(x) {
        if (parent[x] !== x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }
    //Defines the union function to merge two 
    // sets by making x the parent of y.

    function union(x, y) {
        parent[y] = x;
    }
    for (const [u, v, w] of edges) {
        //Finds the root parents of u and v.
        const parent_u = find(u);
        const parent_v = find(v);
        //If they are in different sets:
        // Updates the cost of the new root by AND-ing 
        // it with the old root's cost.
        // Unites the two sets.
        if (parent_u !== parent_v) {
            cost[parent_u] &= cost[parent_v];
            union(parent_u, parent_v);
        }
        //Updates the cost of the root by AND-ing 
        // it with the current edge's weight.
        cost[parent_u] &= w;
    }
    const res = [];
    for (const [s, t] of query) {
        //Finds the root parents of s and t.
        const p1 = find(s);
        const p2 = find(t);
        //If s and t are the same node, push 0 (cost to self is zero).
        if (s === t) {
            res.push(0);
        }
        //If they are in different components, push -1 (no path).
        else if (p1 !== p2) {
            res.push(-1);
        }
        //Otherwise, push the AND cost of their component.
        else {
            res.push(cost[p1]);
        }
    }
    return res;
}

let n = 5, edges = [[0, 1, 7], [1, 3, 7], [1, 2, 1]], query = [[0, 3], [3, 4]];

let res = minimumCost(n, edges, query);

console.log("result ===", res);