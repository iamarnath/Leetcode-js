/*
Given an undirected, weighted graph with V vertices numbered
 from 0 to V-1 and E edges, represented by 2d array edges[][],
  where edges[i]=[u, v, w] represents the edge between the 
  nodes u and v having w edge weight.
You have to find the shortest distance of all the vertices
 from the source vertex src, and return an array of integers
  where the ith element denotes the shortest distance
   between ith node and source vertex src.

Note: The Graph is connected and doesn't contain any negative weight edge.

Examples:

Input: V = 3, edges[][] = [[0, 1, 1], [1, 2, 3], [0, 2, 6]], src = 2
Output: [4, 3, 0]
Explanation:

Shortest Paths:
For 2 to 0 minimum distance will be 4. By following path 2 -> 1 -> 0
For 2 to 1 minimum distance will be 3. By following path 2 -> 1
For 2 to 2 minimum distance will be 0. By following path 2 -> 2
Input: V = 5, edges[][] = [[0, 1, 4], [0, 2, 8], [1, 4, 6], [2, 3, 2], [3, 4, 10]], src = 0
Output: [0, 4, 8, 10, 10]
Explanation: 

Shortest Paths: 
For 0 to 1 minimum distance will be 4. By following path 0 -> 1
For 0 to 2 minimum distance will be 8. By following path 0 -> 2
For 0 to 3 minimum distance will be 10. By following path 0 -> 2 -> 3 
For 0 to 4 minimum distance will be 10. By following path 0 -> 1 -> 4
Constraints:
1 ≤ V ≤ 105
1 ≤ E = edges.size() ≤ 105
0 ≤ edges[i][j] ≤ 104
0 ≤ src < V


*/

/*
Priority Queue Simulation:

Uses array sorting to mimic min-heap behavior (not optimal for large graphs)

Consider using a proper priority queue library for better performance

Adjacency List Structure:

Should be an array of arrays where:

adj[i] contains neighbors of node i

Each neighbor entry is [node, weight]

Time Complexity:

O(V + E log E) due to array sorting

Original C++ version is O((V+E) log V) using priority queue

*/



// Using Priority queue
// S is strating point
function dijkstraPQ(V, adj, S) {
    // Initialize distance array with Infinity and set source distance to 0
    const dist = new Array(V).fill(Infinity);
    dist[S] = 0;
    // Create a priority queue (min-heap simulation using array sorting)
    const pq = [[0, S]];
    while (pq.length > 0) {
        // Sort queue to maintain priority order (ascending by distance)
        pq.sort((a, b) => a[0] - b[0]);
        const [currentDist, node] = pq.shift();
        // Explore neighbors
        for (const [neighbor, weight] of adj[node]) {
            const newDist = currentDist + weight;
            // Update distance if shorter path found
            if (newDist < dist[neighbor]) {
                dist[neighbor] = newDist;
                pq.push([newDist, neighbor]);
            } // end of if 
        } // end of for
    }// end of while
    return dist;
}

const graph = [
    [[1, 2], [2, 4]],  // Node 0 connections
    [[2, 1], [3, 7]],  // Node 1 connections
    [[3, 3]],          // Node 2 connections
    []                 // Node 3 connections
];

console.log(dijkstra(4, graph, 0));
// Output: [0, 2, 3, 6]



