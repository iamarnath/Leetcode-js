/*
Kruskal's Algorithm
Given a weighted, undirected, and connected graph
 with V vertices and E edges, your task is to find
the sum of the weights of the edges in the Minimum
Spanning Tree (MST) of the graph. The graph is 
represented by an adjacency list, where each element 
adj[i] is a vector containing vector of integers. Each 
vector represents an edge, with the first integer denoting 
the endpoint of the edge and the second integer denoting
 the weight of the edge.

Input:
3 3
0 1 5
1 2 3
0 2 1
 
Output: 4
Explanation:

The Spanning Tree resulting in a weight
of 4 is shown above.
Input: 
2 1
0 1 5

 

Output: 5 

Explanation: Only one Spanning Tree is possible which has a weight of 5.
Constraints:
2 ≤ V ≤ 1000
V-1 ≤ E ≤ (V*(V-1))/2
1 ≤ w ≤ 1000
The graph is connected and doesn't contain self-loops & multiple edges.

*/

/*
1. Disjoint Set Union (DSU) Functions
find(parent, x):
Finds the root of the set containing x (with path compression for efficiency).

union(parent, rank, x, y):
Merges the sets containing x and y (using union by rank to keep the tree flat).

2. Kruskal's Algorithm
Input: List of all edges (vec), number of vertices (V).

Process:

Initialize parent and rank arrays for DSU.

Iterate through sorted edges:

If the two vertices of the edge are in different sets, add the edge to the MST (sum += wt) and unite the sets.

Count the number of edges added (edgesConnected).

(Optional) If edgesConnected !== V-1, the MST is not valid (the graph is disconnected).

3. spanningTree Function
Input: Number of vertices (V), adjacency list (adj).

Process:

Convert the adjacency list to an edge list (vec).
Only add each undirected edge once (if (u < v)).

Sort the edge list by weight.

Call Kruskal’s algorithm to get the total weight of the MST.

*/

function find(parent, x) {
    if (parent[x] !== x) {
        parent[x] = find(parent, parent[x]); // Path compression
    }
    return parent[x];
}

function union(parent, rank, x, y) {
    let xRoot = find(parent, x);
    let yRoot = find(parent, y);

    if (xRoot === yRoot) return;

    if (rank[xRoot] > rank[yRoot]) {
        parent[yRoot] = xRoot;
    } else if (rank[xRoot] < rank[yRoot]) {
        parent[xRoot] = yRoot;
    } else {
        parent[xRoot] = yRoot;
        rank[yRoot]++;
    }
}

function kruskal(vec, V) {
    let parent = Array.from({length:V},(_,i)=>i);
    let rank = Array(V).fill(0);
    let sum=0;
    let edgesConnected = 0;
    for(const [u,v,wt] of vec){
        let parent_u = find(parent,u);
        let parent_v = find(parent,v);
        if(parent_u != parent_v){
            union(parent,rank,u,v);
            sum += wt;
            edgesConnected++;
        }
    }

    // If edgesConnected != V-1, it's not a valid MST
    // Uncomment below to check:
    if (edgesConnected !== V - 1) {
        throw new Error("Not a valid MST");
    }
    return sum;
}

function spanningTree(V, adj) {
    // adj is an array of arrays: adj[u] = [[v, wt], ...]
    let vec = [];
    // Convert adjacency list to edge list
    for (let u = 0; u < V; u++) {
        for (const [v, wt] of adj[u]) {
            // To prevent duplicate edges in undirected graph
            if (u < v) {
                vec.push([u, v, wt]);
            }
        }
    }
    // Sort edges by weight
    vec.sort((a, b) => a[2] - b[2]);
    // Run Kruskal's algorithm
    return kruskal(vec, V);
}

const V = 4;
const adj = [
    [[1, 1], [2, 3]], // 0 connected to 1 (wt 1), 2 (wt 3)
    [[0, 1], [2, 1], [3, 4]], // 1 connected to 0, 2, 3
    [[0, 3], [1, 1], [3, 1]], // 2 connected to 0, 1, 3
    [[1, 4], [2, 1]] // 3 connected to 1, 2
];

console.log(spanningTree(V, adj)); // Output: 3 (MST weight)

