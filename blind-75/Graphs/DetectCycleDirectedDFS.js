/*
Directed Graph Cycle

Given a Directed Graph with V vertices 
(Numbered from 0 to V-1) and E edges, 
check whether it contains any cycle or not.
The graph is represented as a 2D vector 
edges[][], where each entry edges[i] = [u, v] 
denotes an edge from verticex u to v.

Examples:

Input: V = 4, edges[][] = [[0, 1], [0, 2], [1, 2], [2, 0], [2, 3]]

Output: true
Explanation: The diagram clearly shows a cycle 0 → 2 → 0
Input: V = 4, edges[][] = [[0, 1], [0, 2], [1, 2], [2, 3]

Output: false
Explanation: no cycle in the graph
Constraints:
1 ≤ V, E ≤ 105


*/
function isCycleDFS(adj, u, visited, inRecursion) {
    visited[u] = true;
    inRecursion[u] = true;
    for (const v of adj[u]) {
        // If not visited, recursively check for a cycle
        if (!visited[v] && isCycleDFS(adj, v, visited, inRecursion)) {
            return true;
        }
        // If in the current recursion stack, cycle found
        else if (inRecursion[v]) {
            return true;
        }
    }
    inRecursion[u] = false;
    return false;
}
// Function to detect cycle in a directed graph.
function isCyclic(V, adj) {
    const visited = new Array(V).fill(false);
    const inRecursion = new Array(V).fill(false);
    for (let i = 0; i < V; i++) {
        if (!visited[i] && isCycleDFS(adj, i, visited, inRecursion)) {
            return true;
        }
    }
    return false;
}
// Example: 3 nodes, edges: 0->1, 1->2, 2->0 (cycle)
const V = 3;
const adj = [
    [1], // 0 -> 1
    [2], // 1 -> 2
    [0]  // 2 -> 0
];
console.log(isCyclic(V, adj)); // Output: true

// Example: 3 nodes, edges: 0->1, 1->2 (no cycle)
const adj2 = [
    [1], // 0 -> 1
    [2], // 1 -> 2
    []   // 2 -> nothing
];
console.log(isCyclic(V, adj2)); // Output: false
