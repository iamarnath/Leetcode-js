/*
323. Number of Connected Components In An Undirected Graph
Description
There is an undirected graph with n nodes. There is also an edges array, where edges[i] = [a, b] means that there is an edge between node a and node b in the graph.

The nodes are numbered from 0 to n - 1.

Return the total number of connected components in that graph.

Example 1:

Input:
n=3
edges=[[0,1], [0,2]]

Output:
1
Example 2:

Input:
n=6
edges=[[0,1], [1,2], [2,3], [4,5]]

Output:
2
Constraints:

1 <= n <= 100
0 <= edges.length <= n * (n - 1) / 2
*/
/*
The time complexity of the countComponents function is O(n + e),
 where n is the number of nodes and e is the number of edges.
 This is because:

    Building the adjacency list takes O(e) time.
    The DFS visits each node once (O(n)), and
    each edge is considered twice (once from each node), contributing O(e) total.

The space complexity is also O(n + e), due to:

    The adjacency list storing all edges (O(e))
    The visited array storing all nodes (O(n))
    The recursion stack in the worst case can be O(n).

So, both time and space complexity are O(n + e).

*/
function countComponents(n, edges) {
    /*
    Creates an adjacency list (adj) as an array of n empty arrays.
    Each index represents a node, and its array
     will contain all neighboring nodes.
    */
    const adj = Array.from({ length: n }, () => []);
    /*
    Creates a boolean array (visit) of length n, initialized to false.
    This tracks whether each node has been visited during traversal.
    */
    const visit = Array(n).fill(false);
    /*
    Builds the adjacency list by iterating over each edge [u, v]:
        Adds v to u's neighbor list.
        Adds u to v's neighbor list.
    This represents the undirected connections between nodes.
    */
    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }
    console.log("adj==",adj);
    console.log("visit==",visit)
    /*
    For each neighbor (nei) of the current node:
        If the neighbor hasn't been visited:
            Marks it as visited.
            Recursively calls dfs on that neighbor.
    This explores all nodes in the current connected component.
    */
    const dfs = (node) => {
        //console.log("node==",node,adj[node]);
        for (const nei of adj[node]) {
            if (!visit[nei]) {
                visit[nei] = true;
                dfs(nei);
            }
        }
    };
    //Initializes a counter res to keep track of the number
    //  of connected components found.
    let res = 0;
    /*
    Iterates through all nodes from 0 to n-1:

    If a node hasn't been visited:
        Marks it as visited.
        Starts a DFS from that node (exploring its entire connected component).
        Increments the component counter res by 1.

    Each time this block is entered, a new connected component is found.

    */
    for (let i = 0; i < n; i++) {
        if (!visit[i]) {
            console.log("adj[node]==",i)
            visit[i] = true;
            dfs(i);
            res++;
        }
    }
    //Returns the total number of connected components found in the graph.
    return res;
}
/*
Builds the graph as an adjacency list.
Tracks visited nodes with a boolean array.
For each unvisited node, starts a DFS to mark all 
nodes in its component as visited, incrementing the component count.
Returns the number of times a new DFS was started,
 which equals the number of connected components.

*/

//let n=3,edges=[[0,1], [0,2]];
let n=6,edges=[[0,1], [1,2], [2,3], [4,5]];
let result = countComponents(n, edges);
console.log("result==",result);
