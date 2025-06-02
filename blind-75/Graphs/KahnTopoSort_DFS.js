/*
Kahn alogorithm for Topological sort Depth First Search

Given a Directed Acyclic Graph (DAG) of V (0 to V-1) 
vertices and E edges represented as a 2D list of edges[][],
 where each entry edges[i] = [u, v] denotes a
  directed edge u -> v. Return the topological sort for the given graph.

Topological sorting for Directed Acyclic Graph (DAG)
 is a linear ordering of vertices such that for every directed 
 edge u -> v, vertex u comes before v in the ordering.
Note: As there are multiple Topological orders possible,
 you may return any of them. If your returned Topological
  sort is correct then the output will be true else false.

Examples:

Input: V = 4, E = 3, edges[][] = [[3, 0], [1, 0], [2, 0]]

Output: true
Explanation: The output true denotes that the order is valid.
 Few valid Topological orders for the given graph are:
[3, 2, 1, 0]
[1, 2, 3, 0]
[2, 3, 1, 0]
Input: V = 6, E = 6, edges[][] = [[1, 3], [2, 3], [4, 1], [4, 0], [5, 0], [5,2]]

Output: true
Explanation: The output true denotes that the order is valid. Few valid Topological orders for the graph are:
[4, 5, 0, 1, 2, 3]
[5, 2, 4, 0, 1, 3]
Constraints:
2  ≤  V  ≤  103
1  ≤  E = edges.size()  ≤  (V * (V - 1)) / 2

*/
/*
Data Structures:

visited array tracks visited nodes to prevent reprocessing.

stack accumulates nodes in reverse post-order during DFS traversal.

DFS Implementation:

Recursively visits all adjacent unvisited nodes before
 pushing the current node to the stack.

Ensures parent nodes appear after all descendants in the stack.

Order Extraction:

Nodes are popped from the stack to create the final
 topological order (last-in-first-out reversal).

Complexity Analysis
Time Complexity:

O(V+E) where:

V = Number of vertices

E = Number of edges

Each node and edge is processed exactly once during DFS traversal. 
The final stack reversal adds 

O(V), maintaining overall linear complexity.

Space Complexity:

O(V) due to:

visited array (
V elements)

Recursion call stack (up to 
V
V depth for linear chains)

Result array (
V elements)

Key Properties
DAG Requirement: Only works for Directed Acyclic Graphs

Multiple Valid Orders: Different DFS sequences can yield different valid topological sorts

Cycle Detection: While not implemented here, DFS can detect cycles by checking for back edges

*/
function topoSort(V, adj) {
    const visited= new Array(V).fill(false);
    const stack = [];
    function dfs(u){
        visited[u] = true;
        for(const v of adj[u]){
            if(!visited[v]){
                dfs(v);
            }
        }
        stack.push(u);
    }
    for(let i=0;i<V;i++){
        if(!visited[i]){
            dfs(i);
        }
    }
    const result=[];
    while(stack.length >0){
        result.push(stack.pop());
    }
    return result;
}
// Example usage:
let graph = [
    [1, 2],  // Node 0
    [3],     // Node 1
    [3],     // Node 2
    []       // Node 3
];

console.log(topoSort(4, graph)); // Output: [0, 2, 1, 3]

