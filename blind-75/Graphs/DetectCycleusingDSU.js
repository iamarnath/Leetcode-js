/*
Given an undirected graph with no self loops with
 V (from 0 to V-1) nodes and E edges, the task is
  to check if there is any cycle in the undirected graph.

Note: Solve the problem using disjoint set union (DSU).

Examples

Input: 

Output: 1
Explanation: There is a cycle between 0->2->4->0
Input: 

Output: 0
Explanation: The graph doesn't contain any cycle
Your Task:
You don't need to read or print anyhting. 
Your task is to complete the function detectCycle()
 which takes number of vertices in the graph denoting as V
  and adjacency list adj and returns 1 if 
  graph contains any cycle otherwise returns 0.

Expected Time Complexity: O(V + E)
Expected Space Complexity: O(V)

Constraints:
2 ≤ V ≤ 104
1 ≤ E ≤ 104

*/

/*
1. DSU Class
parent: Each node points to its parent.
 If parent[x] == x, then x is a root.

rank: Used for union by rank optimization to keep the tree flat.

find(x)
Finds the representative (root) of the set containing x.

Uses path compression so that future queries are faster.

union(x, y)
Connects the sets containing x and y.

Uses union by rank to attach the smaller tree 
under the root of the larger tree.

2. detectCycle Function
Initializes DSU for V vertices.

Iterates over all edges (using adjacency list adj).

For each edge (u, v), checks if u and v are already 
connected (i.e., have the same root).

If yes, a cycle is detected.

If not, unite them.

The if (u < v) check ensures each undirected edge is considered only once.

*/

function find(parent, x) {
    if (parent[x] != x) {
        parent[x] = find(parent, parent[x]);// path compression
    }
    return parent[x];
}

function union(parent, rank, x, y) {
    let xRoot = find(parent, x);
    let yRoot = find(parent, y);
    if (xRoot === yRoot) return;
    if (rank[xRoot] > rank[yRoot]) {
        parent[yRoot] = xRoot;
    }
    else if (rank[xRoot] < rank[yRoot]) {
        parent[xRoot] = yRoot;
    }
    else {
        parent[xRoot] = yRoot;
        rank[yRoot]++;
    }
}

function detectCycle(V, adj) {
    const parent = Array.from({ length: V }, (_, i) => i);
    const rank = Array(V).fill(0);
    for (let u = 0; u < V; u++) {
        for (const v of adj[u]) {
            // To avoid checking the same edge twice in an undirected graph
            if (u < v) {
                if (find(parent, u) === find(parent, v)) {
                    return true;//cycle detected
                }
                union(parent, rank, u, v);
            }
        }
    }
    return false;// No cycle detected
}

const V = 3;
const adj = [
    [1, 2], // 0 is connected to 1 and 2
    [0, 2], // 1 is connected to 0 and 2
    [0, 1]  // 2 is connected to 0 and 1
];

console.log(detectCycle(V, adj)); // Output: true (cycle exists)

/*
Time Complexity
The time complexity for cycle detection in an 
undirected graph using Union-Find (DSU) with both path
 compression and union by rank is:

O(E × α(V)), where
E = number of edges

V = number of vertices

α(V) = inverse Ackermann function, which grows extremely
 slowly and is less than 5 for all practical input sizes.

Each find and union operation is nearly 
constant time due to these optimizations, making
 the overall complexity for processing all edges very efficient.

Space Complexity
O(V)
You need two arrays:

parent of size V

rank (or size) of size V
No extra space is required beyond these arrays, 
so the total space used is linear in the number of vertices
*/