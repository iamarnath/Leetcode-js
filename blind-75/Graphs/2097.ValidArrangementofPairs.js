/*
2097. Valid Arrangement of Pairs

You are given a 0-indexed 2D integer array pairs 
where pairs[i] = [starti, endi]. An arrangement of pairs 
is valid if for every index i where 1 <= i < pairs.length,
 we have endi-1 == starti.

Return any valid arrangement of pairs.

Note: The inputs will be generated such that there exists 
a valid arrangement of pairs.

 

Example 1:

Input: pairs = [[5,1],[4,5],[11,9],[9,4]]
Output: [[11,9],[9,4],[4,5],[5,1]]
Explanation:
This is a valid arrangement since endi-1 always equals starti.
end0 = 9 == 9 = start1 
end1 = 4 == 4 = start2
end2 = 5 == 5 = start3
Example 2:

Input: pairs = [[1,3],[3,2],[2,1]]
Output: [[1,3],[3,2],[2,1]]
Explanation:
This is a valid arrangement since endi-1 always equals starti.
end0 = 3 == 3 = start1
end1 = 2 == 2 = start2
The arrangements [[2,1],[1,3],[3,2]] and [[3,2],[2,1],[1,3]] are also valid.
Example 3:

Input: pairs = [[1,2],[1,3],[2,1]]
Output: [[1,2],[2,1],[1,3]]
Explanation:
This is a valid arrangement since endi-1 always equals starti.
end0 = 2 == 2 = start1
end1 = 1 == 1 = start2
 

Constraints:

1 <= pairs.length <= 105
pairs[i].length == 2
0 <= starti, endi <= 109
starti != endi
No two pairs are exactly the same.
There exists a valid arrangement of pairs.
*/

/*
Euler path for Directed Graph
Find indegree and outdegree of a node
Starting Node : outdegree - indegree = 1

End node : indegree - outdegree =1

Hierholzer's algorithm

1.Build adjacency list
2.Build indegree and outdegree
3.find the start node of euler path
4.do DFS

*/
/*
Step-by-step Explanation:

Build the Graph:

Construct an adjacency list (adj) to represent the graph.

Track the in-degree and out-degree for each node using
 indegree and outdegree maps.

For each edge [u, v], add v to adj[u], increment outdegree[u],
 and increment indegree[v].

Find the Start Node:

By Eulerian path properties, the start node is the
 one with out-degree exactly one greater than its 
 in-degree (if such a node exists). Otherwise, start
  from any node with outgoing edges.

This ensures the path starts at the correct node for a valid Eulerian path.

Hierholzer's Algorithm (DFS):

Use a stack to simulate depth-first traversal.

While the stack is not empty:

If the current node has neighbors, move to one of 
them (removing the edge from the graph).

If no neighbors remain, add the node to the Eulerian
 path and pop it from the stack.

This process ensures every edge is visited exactly once.

Build the Result:

Reverse the constructed Eulerian path (since nodes are added post-traversal).

Convert the path of nodes into an array of edge pairs.

Time Complexity
Building the Graph:

Each edge is processed once to build the adjacency list
 and degree maps: O(E), where E is the number of edges.

Finding the Start Node:

Iterates over nodes (at most 2N, but typically much less): 
O(N), where N is the number of nodes.

Hierholzer's Algorithm (DFS):

Each edge is traversed exactly once (pushed and popped from the stack): O(E).

Building the Result:

Constructing the final result from the path is O(E).

Overall Time Complexity:

O(E+N)
But since E ≥ N-1 in a connected graph, this is typically O(E).

Space Complexity
Adjacency List:

Stores all edges: O(E).

Degree Maps:

Stores degree for each node: O(N).

Stack and Eulerian Path:

Stack holds up to O(N) nodes; Eulerian path holds O(E) nodes.

Result Array:

Stores O(E) pairs.

Overall Space Complexity:

O(E+N)

*/
var validArrangement = function (pairs) {
    // Step 1: Build adjacency list (Graph)
    const adj = new Map();
    const indegree = new Map();
    const outdegree = new Map();
    for (const [u, v] of pairs) {
        if (!adj.has(u)) {
            adj.set(u, []);
        }
        adj.get(u).push(v);
        outdegree.set(u, (outdegree.get(u) || 0) + 1);
        indegree.set(v, (indegree.get(v) || 0) + 1);
    }
    // Find the startNode of the Euler Path
    let startNode = pairs[0][0];
    for (const [node, neighbours] of adj.entries()) {
        const out = outdegree.get(node) || 0;
        const inn = indegree.get(node) || 0;
        if (out - inn === 1) {
            startNode = node;
            break;
        }
    }
    // Perform Hierholzer's algorithm (DFS)
    const eulerPath = [];
    const st = [startNode];
    while (st.length > 0) {
        const curr = st[st.length - 1];
        if (adj.has(curr) && adj.get(curr).length > 0) {
            const nbr = adj.get(curr).pop();
            st.push(nbr);
        }
        else {
            eulerPath.push(curr);
            st.pop();
        }
    }
    // Build the result
    eulerPath.reverse();
    const result = [];
    for (let i = 0; i < eulerPath.length - 1; i++) {
        result.push([eulerPath[i], eulerPath[i + 1]]);
    }
    return result;
};

const pairs = [[5, 1], [4, 5], [11, 9], [9, 4]];
console.log(validArrangement(pairs));
// Output: [ [ 11, 9 ], [ 9, 4 ], [ 4, 5 ], [ 5, 1 ] ]



