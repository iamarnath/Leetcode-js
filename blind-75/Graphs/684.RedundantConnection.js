/*
684. Redundant Connection

In this problem, a tree is an undirected graph 
that is connected and has no cycles.

You are given a graph that started as a tree with
 n nodes labeled from 1 to n, with one additional 
 edge added. The added edge has two different vertices
  chosen from 1 to n, and was not an edge that 
  already existed. The graph is represented as an 
  array edges of length n where edges[i] = [ai, bi]
   indicates that there is an edge between
    nodes ai and bi in the graph.

Return an edge that can be removed so 
that the resulting graph is a tree of n nodes.
 If there are multiple answers, return the answer
  that occurs last in the input.

Example 1:

Input: edges = [[1,2],[1,3],[2,3]]
Output: [2,3]

Example 2:
Input: edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]
Output: [1,4]
 

Constraints:

n == edges.length
3 <= n <= 1000
edges[i].length == 2
1 <= ai < bi <= edges.length
ai != bi
There are no repeated edges.
The given graph is connected.


*/
/*
How it works:

Build the adjacency list step by step as you process each edge.

For each edge, before adding it, check if the 
two nodes are already connected via DFS.

If they are, the current edge is redundant.

If not, add the edge to the adjacency list and continue.

DFS Helper: Recursively checks if a path exists
 from u to v in the current graph.
*/
/*
Time Complexity:

Worst case: 
O(n ^2) for each edge, since for each edge,
 you may perform a DFS that could traverse all nodes
  before it (in a degenerate case).

Explanation: For each of the 
n edges, you may perform a DFS on up to 
n nodes.

Space Complexity:

Adjacency List: 

O(n)

Visited Array: 

O(n) per DFS call, but since calls are not nested, total is 

O(n) extra space at any time (but may be up to 
O(n ^2) in total if you consider all DFS calls over time;
 practically, for each edge, it’s 

O(n) space for the visited array, but not simultaneously).

Total Space: 

O(n) for the adjacency list, and 
O(n) auxiliary space per DFS (but not at the same time, so overall, 
O(n) if you reuse the array, but technically, in the worst case, you have 

O(n^ 2) space if you don't reuse the array and keep allocating new ones).

Note: If you reuse the visited array (reset it before each DFS), the space is 

O(n).
*/
var findRedundantConnection = function (edges) {
    const n = edges.length;
    const adj = new Map();
    function dfs(u, v, visited) {
        visited[u] = true;
        if (u === v) return true;
        const neighbours = adj.get(u) || [];
        for (const ngbr of neighbours) {
            if (!visited[ngbr]) {
                if (dfs(ngbr, v, visited)) {
                    return true;
                }
            }
        }// end of for
        return false;
    }
    for (let i = 0; i < n; i++) {
        const u = edges[i][0];
        const v = edges[i][1];
        // Initialize visited for each node 
        // (note: nodes are 1-based, so visit size >= n)
        const visited = new Array(n + 2).fill(false); // extra space for safety
        // If both nodes are already in the graph 
        // and a path exists, this is the redundant edge
        if (adj.has(u) && adj.has(v) && dfs(u, v, visited)) {
            return edges[i];
        }
        // Add edge to the graph (both directions)
        if (!adj.has(u)) adj.set(u, []);
        if (!adj.has(v)) adj.set(v, []);
        adj.get(u).push(v);
        adj.get(v).push(u);
    }
    return [];
};

class DSU {
    constructor(n) {
        // For 1-based indexing, initialize up to n+1
        this.parent = new Array(n + 1);
        this.rank = new Array(n + 1);
        for (let i = 1; i <= n; i++) {
            this.parent[i] = i;
            this.rank[i] = 0;
        }
    }
    find(x) {
        if (x === this.parent[x]) {
            return x;
        }
        this.parent[x] = this.find(this.parent[x]);//Path compression
        return this.parent[x];
    }
    union(x, y) {
        let xParent = this.find(x);
        let yParent = this.find(y);
        if (xParent === yParent) {
            return;//Already connected
        }
        if (this.rank[xParent] > this.rank[yParent]) {
            this.parent[yParent] = xParent;
        }
        else if (this.rank[yParent] > this.rank[xParent]) {
            this.parent[xParent] = yParent;
        }
        else {
            this.parent[yParent] = xParent;
            this.rank[xParent]++;
        }
    }
}
var findRedundantConnection2 = function (edges) {
    const n = edges.length;
    const dsu = new DSU(n);
    for (const edge of edges) {
        const u = edge[0];
        const v = edge[1];
        if (dsu.find(u) === dsu.find(v)) {
            return edge;
        }
        dsu.union(u, v);
    }
    return [];
}
let edges = [[1, 2], [1, 3], [2, 3]];
//let edges = [[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]];
let res = findRedundantConnection2(edges);
console.log("res==", res);

