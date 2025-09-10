/*
Euler path

a path of edges that visits all the 
edges in a graph exactly once.

Eulerian circuit
an eulerian path which starts and ends on the same node.
also known as eulerian cycle
all edges should be visited only once

NOT all graphs have eulerian circuit
If the Graph has eulerian circuit,you can start your path 
from any node

if graph does not hav eeulerian circuit,
 - either you won't be able to come back to the start node
 - or you will not be able to visit all edges of the graph

 All vertices with non zero degree must belong to 
 a single connected component.
 degree- no of lines originating/ending at node

 All vertices have even degree - it is eulerian circuit

 Semi eulerian graph - it has euler path but does not have euler circuit.
 all edges will be visited only once and Start vertex != End Vertex.
 here start and end vertices will have degree odd
 
 non zero degree nodes must be connected


*/
/*
Euler circuit and Path

https://www.geeksforgeeks.org/problems/euler-circuit-and-path/1
An Eulerian Path is a path in graph that visits 
every edge exactly once. An Eulerian Circuit is an Eulerian
 Path which starts and ends on the same vertex. Given an
  undirected connected graph with V nodes, and E edges, 
  with adjacency list adj, return 2 if the graph contains an 
  eulerian circuit, else if the graph contains an eulerian path,
   return 1, otherwise, return 0.

Examples

Input: 

Output: 2
Explanation: 
Following is an eulerian circuit in the mentioned graph
1 -> 2 -> 0 -> 1
Input: 

Output: 1
Explanation: 
Following is an eulerian path in the mentioned graph
1 -> 0 -> 2
Your Task:
You don't need to read or print anything. Your task is 
to complete the function isEulerCircuilt() which takes number 
of vertices in the graph denoted as V and an adjacency list
 of graph denoted as adj and returns 2 if the graph 
 contains an eulerian circuit, else if the graph contains
  an eulerian path, it returns 1, otherwise, it will return 0.

Expected Time Complexity: O(V+E) where E is the number of edges in graph.
Expected Space Complexity: O(V)

Constraints:
1 ≤ V, E ≤ 104
1 ≤ adj[i][j] ≤ V-1
*/
/*
1. DFS Traversal
Visits all vertices connected to a starting vertex u.
Marks visited vertices to avoid cycles.

2. isConnected
Finds a vertex with at least one edge.
Starts DFS from this vertex.
After traversal, checks if all vertices with edges were visited.
If any such vertex wasn't visited, the graph isn't connected.

3. isEularCircuit
Checks if the graph is connected (ignoring isolated vertices).
Counts the number of vertices with odd degree.
If more than two, not Eulerian.
If exactly two, the graph has an Euler path (Semi-Eulerian).
If none, the graph has an Euler circuit (Eulerian).

Return Values
0: Non-Eulerian (no Euler path/circuit)

1: Semi-Eulerian (Euler path exists, but not a circuit)

2: Eulerian (Euler circuit exists)

*/
// Depth-First Search
function DFS(adj, u, visited) {
    visited[u] = true;
    for (let v of adj[u]) {
        if (!visited[v]) {
            DFS(adj, v, visited);
        }
    }
}
// Check if all non-zero degree vertices are connected
function isConnected(V, adj) {
    let visited = new Array(V).fill(false);
    // Find a vertex with non-zero degree
    let nonZeroDegreeVertex = -1;
    for (let i = 0; i < V; i++) {
        if (adj[i].length != 0) {
            nonZeroDegreeVertex = i;
            break;
        }
    }
    // If there are no edges in the graph, it's considered connected
    if (nonZeroDegreeVertex == -1) return true;
    // Start DFS from a vertex with non-zero degree
    DFS(adj, nonZeroDegreeVertex, visited);
    // Check if all non-zero degree vertices are visited
    for (let i = 0; i < V; i++) {
        if (!visited[i] && adj[i].length > 0) {
            return false;
        }
    }
    return true;
}

// Main function to check Eulerian status
function isEularCircuit(V, adj) {
    // Check if all non-zero degree vertices are connected
    if (!isConnected(V, adj)) {
        return 0;//Non Eulerian
    }
    // Count vertices with odd degree
    let oddCount = 0;
    for (let i = 0; i < V; i++) {
        if (adj[i].length % 2 != 0) {
            oddCount++;
        }
    }
 
    //console.log("oddCount",oddCount)
    // If more than two vertices have odd degree, not Eulerian
    if (oddCount > 2) return 0; // Non - Eulerian
    // If exactly two vertices have odd degree, Semi-Eulerian (Euler Path)
    if (oddCount === 2) return 1; // Semi-Eulerian
    // If no vertices have odd degree, Eulerian Circuit exists
    if (oddCount === 0) return 2;// Eulerian Circuit
}

// let V = 4;
// let adj = [
//     [1],    // 0
//     [0,2,3],// 1
//     [1,3],  // 2
//     [1,2]   // 3
// ];
// let V = 3;
// let adj = [
//     [1,2], // 0
//     [0,2], // 1
//     [0,1]  // 2
// ];

let V = 5;
let adj = [
    [1, 2],    // 0
    [0, 2],    // 1
    [0, 1, 3, 4], // 2
    [2, 4],    // 3
    [2, 3]     // 4
];
let result = isEularCircuit(V, adj);
console.log("eular==",result); // Output: 1 (Semi-Eulerian)
