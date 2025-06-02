/*
Kahn alogorithm for Topological sort Breadth First Search

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
1. Indegree Calculation
Purpose: Count how many edges are coming into each vertex.

How: For each node, loop over its outgoing edges and 
increment the indegree of those neighbors.

2. Queue Initialization
Purpose: Find all nodes with no incoming edges (indegree 0).

How: Push these nodes into the queue; they are ready to be processed.

3. BFS Processing
Purpose: Process nodes in topological order.

How:

Dequeue a node and add it to the result.

For each of its neighbors, decrement their indegree.

If a neighbor’s indegree becomes zero, enqueue it.

Result: The result array contains the topological order.

Time and Space Complexity
Time Complexity
O(V + E)

V: Number of vertices.

E: Number of edges.

Explanation:

Indegree calculation: Each edge is processed once.

Queue processing: Each node is processed once, and for
 each node, its edges are processed once.

Overall: Linear with respect to the graph size.

Space Complexity
O(V)

Explanation:

indegree array: O(V)

queue: In the worst case, O(V) (if all nodes are enqueued at once).

result array: O(V)

Overall: Linear with respect to the number of vertices.

Step	                      Time Complexity	Space Complexity

Indegree Calculation	        O(V + E)	       O(V)
Queue Initialization	        O(V)	           O(V)
BFS Processing	                O(V + E)	       O(V)
Total	                        O(V + E)	       O(V)

*/
function topoSort(N, adj) {
    const indegree = new Array(N).fill(0);
    const queue = [];
    const result = [];
    // 1. Calculate indegree for each node
    for (let u = 0; u < N; u++) {
        for (const v of adj[u]) {
            indegree[v]++;
        }
    }
    // 2. Enqueue nodes with indegree 0
    for (let i = 0; i < N; i++) {
        if (indegree[i] === 0) {
            queue.push(i);
        }
    }
    // 3. BFS
    while (queue.length > 0) {
        const u = queue.shift();
        result.push(u);
        for (const v of adj[u]) {
            indegree[v]--;
            if (indegree[v] === 0) {
                queue.push(v);
            }
        }
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

