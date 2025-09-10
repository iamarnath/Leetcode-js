/*
Bellman-Ford

Given an weighted graph with V vertices 
numbered from 0 to V-1 and E edges,
 represented by a 2d array edges[][], 
 where edges[i] = [u, v, w] represents a direct
  edge from node u to v having w edge weight.
   You are also given a source vertex src.

Your task is to compute the shortest distances
 from the source to all other vertices. 
 If a vertex is unreachable from the source, 
 its distance should be marked as 108. 
 Additionally, if the graph contains a 
 negative weight cycle, return [-1] to indicate that 
 shortest paths cannot be reliably computed.

Examples:

Input: V = 5, edges[][] =
 [[1, 3, 2], [4, 3, -1], [2, 4, 1], [1, 2, 1], [0, 1, 5]], src = 0

Output: [0, 5, 6, 6, 7]
Explanation: Shortest Paths:
For 0 to 1 minimum distance will be 5. By following path 0 → 1
For 0 to 2 minimum distance will be 6. By following path 0 → 1  → 2
For 0 to 3 minimum distance will be 6. By following path 0 → 1  → 2 → 4 → 3 
For 0 to 4 minimum distance will be 7. By following path 0 → 1  → 2 → 4

Input: V = 4, edges[][] = [[0, 1, 4], [1, 2, -6], [2, 3, 5], [3, 1, -2]], src = 0

Output: [-1]
Explanation: The graph contains a negative weight cycle formed by
 the path 1 → 2 → 3 → 1, where the total weight of the cycle is negative.
*/
/*
Initialization:
result is an array of size V (number of vertices),
 initialized to a large value (1e8). The distance 
 to the source vertex S is set to 0.

Relaxation:
For V-1 times, for each edge [u, v, w], if the
 distance to u is known and going from u to v 
 via w is shorter, update result[v].

Negative Cycle Detection:
After relaxation, check all edges again. 
If you can still relax any edge, a negative cycle exists; return [-1].

Return:
If no negative cycle, return the result 
array with shortest distances.

4. Time and Space Complexity
Time Complexity
The main relaxation loop runs V-1 times, 
and in each iteration, it checks all E edges.

The negative cycle check runs through all E edges once.

Total: O(V * E)

Space Complexity
The result array uses O(V) space.

The input edges uses O(E) space 
(not counted as extra if already given).

Total extra space: O(V)

*/
function bellmanFord(V, edges, S) {
   let INF = 1e8;
   const result = new Array(V).fill(INF);
   result[S] = 0;
   // Relax all edges V-1 times
   for (c = 1; c <= V - 1; c++) {
      for (const edge of edges) {
         const [u, v, w] = edge;
         if (result[u] != INF && result[u] + w < result[v]) {
            result[v] = result[u] + w;
         }
      }
   }
   // Check for negative weight cycles
   for (const edge of edges) {
      const [u, v, w] = edge;
      if (result[u] != INF && result[u] + w < result[v]) {
         return [-1];
      }
   }
   return result;
}

// let V = 5, edges =
//  [[1, 3, 2], [4, 3, -1], [2, 4, 1], [1, 2, 1], [0, 1, 5]], S = 0;

let  V = 4, edges = [[0, 1, 4], [1, 2, -6], [2, 3, 5], [3, 1, -2]], S = 0
console.log(bellmanFord(V, edges, S));