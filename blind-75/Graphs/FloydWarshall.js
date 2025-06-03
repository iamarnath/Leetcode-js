/*
Floyd Warshall

You are given an weighted directed graph, represented 
by an adjacency matrix, dist[][] of size n x n, 
where dist[i][j] represents the weight of the edge
 from node i to node j. If there is no direct edge,
  dist[i][j] is set to a large value (i.e., 108) to represent infinity.
The graph may contain negative edge weights, but
 it does not contain any negative weight cycles.

Your task is to find the shortest distance between every 
pair of nodes i and j in the graph.

Note: Modify the distances for every pair in place.

Examples :

Input: dist[][] = [[0, 4, 108, 5, 108], [108, 0, 1, 108, 6], [2, 108, 0, 3, 108], [108, 108, 1, 0, 2], [1, 108, 108, 4, 0]]

Output: [[0, 4, 5, 5, 7], [3, 0, 1, 4, 6], [2, 6, 0, 3, 5], [3, 7, 1, 0, 2], [1, 5, 5, 4, 0]]

Explanation: Each cell dist[i][j] in the output shows 
the shortest distance from node i to node j, computed by 
considering all possible intermediate nodes. 
Input: dist[][] = [[0, -1, 2], [1, 0, 108], [3, 1, 0]]

Output: [[0, -1, 2], [1, 0, 3], [2, 1, 0]]

Explanation: Each cell dist[i][j] in the output shows 
the shortest distance from node i to node j, computed
 by considering all possible intermediate nodes.
From 2 to 0 shortest distance should be 2 by following path 2 -> 1 -> 0
From 1 to 2 shortest distance should be 3 by following path 1 -> 0 -> 2
Constraints:
1 ≤ dist.size() ≤ 100
-1000 ≤ dist[i][j] ≤ 1000
dist[i][j] can be 108 to represent infinity.

*/
/*
Initialization Phase

Converts -1 (no path) to a large number

Allows algorithm to work with numeric values

Core Calculation Phase

Triple nested loop structure:

Outer: Intermediate nodes (via)

Middle: Source nodes (i)

Inner: Destination nodes (j)

Updates shortest path through intermediate nodes

Cleanup Phase

Converts large numbers back to -1

Restores original representation for "no path"

Time Complexity
O(n³) - Standard for Floyd-Warshall algorithm
Where n = number of nodes in the graph
*/
/*
function shortestDistance(grid) {
    const n = grid.length;
    const INF = 1e8;
    // Replace -1 with a large number (infinity representation)
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === -1) {
                grid[i][j] = INF;
            }
        }
    }
    // Floyd-Warshall algorithm core
    for (let via = 0; via < n; via++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (grid[i][via] < INF && grid[via][j] < INF) {
                    grid[i][j] = Math.min(grid[i][j],
                        grid[i][via] + grid[via][j]
                    );
                }
            }
        }
    }
    // Restore large numbers to -1
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] >= INF) {
                grid[i][j] = -1;
            }
        }
    }
    console.log("grid==", grid);
}
*/
function shortestDistance(grid) {
    const n = grid.length;
    const INF = 1e8;

    // Convert -1 to INF
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === -1) {
                grid[i][j] = INF;
            }
        }
    }

    // Floyd-Warshall algorithm
    for (let via = 0; via < n; via++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (grid[i][via] < INF && grid[via][j] < INF) {
                    grid[i][j] = Math.min(grid[i][j], grid[i][via] + grid[via][j]);
                }
            }
        }
    }

    // Convert INF back to -1
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] >= INF) {
                grid[i][j] = -1;
            }
        }
    }

    return grid;
}



// let dist = [[0, 4, 1e8, 5, 1e8],
// [1e8, 0, 1, 1e8, 6],
// [2, 1e8, 0, 3, 1e8],
// [1e8, 1e8, 1, 0, 2],
// [1, 1e8, 1e8, 4, 0]]

let dist = [[0, -1, 2], [1, 0, -1], [3, 1, 0]];
let res = shortestDistance(dist);
console.log("res==", res)