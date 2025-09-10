/*
261. Graph Valid Tree
Description
Given n nodes labeled from 0 to n - 1 and a list of undirected edges (each edge is a pair of nodes), write a function to check whether these edges make up a valid tree.

Example 1:

Input:
n = 5
edges = [[0, 1], [0, 2], [0, 3], [1, 4]]

Output:
true
Example 2:

Input:
n = 5
edges = [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]]

Output:
false
Note:

You can assume that no duplicate edges will appear in edges. Since all edges are undirected, [0, 1] is the same as [1, 0] and thus will not appear together in edges.
Constraints:

1 <= n <= 100
0 <= edges.length <= n * (n - 1) / 2
*/
// DFS approach
//This implementation runs in O(n) time complexity
//  (each node and edge is processed once) and O(n) space complexity
//  for the adjacency list and visited set.
// Time complexity: O(V+E)
// Space complexity: O(V+E)
//Where V is the number vertices and E is the number of edges in the graph.
function validTree(n, edges) {
    //Tree Property: A tree with n nodes must have exactly n-1 edges

    //Early Exit: If there are more edges, we immediately know it's not a tree

    if(edges.length > n-1){
        return false;
    }
    const adj = Array.from({length:n},()=>[]);
    //Creates an array of empty arrays (one per node)

   //Builds undirected graph representation by adding both directions 
   // for each edge
    for(const [u,v] of edges){
        adj[u].push(v);
        adj[v].push(u);
    }
    
    const visit = new Set();
    /*
    Parent Tracking: Avoids false cycle detection from backtracking
    Cycle Check: Returns false if we revisit any node (except parent)
    Recursive Exploration: Depth-first traversal of all neighbors
    */
    const dfs = (node,parent)=>{
        // Base case: detected cycle
        if(visit.has(node)){
            return false;
        }
        visit.add(node);
        for(const nei of adj[node]){
             // Skip parent to avoid false cycle detection
            if(nei===parent){
                continue;
            }
            // Recursive check for cycles
            if(!(dfs(nei,node))){
                return false;
            }
        }
        return true;
    };
    /*
    Start Point: Begins traversal from node 0 (arbitrary choice works in connected graph)
    Connectivity Check: Ensures all nodes were visited (visit.size === n)
    Cycle Check: Confirms DFS completed without finding cycles

    5. Start DFS from node 0 & check full connectivity
    */
    return dfs(0,-1) && visit.size === n;

}

//let n = 5,edges = [[0, 1], [0, 2], [0, 3], [1, 4]];

let n = 5,edges = [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]];

let res = validTree(n,edges);

console.log("result==",res);