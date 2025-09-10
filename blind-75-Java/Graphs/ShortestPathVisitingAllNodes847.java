/*
847. Shortest Path Visiting All Nodes
  You have an undirected, connected graph of n nodes 
  labeled from 0 to n - 1. You are given an array graph 
  where graph[i] is a list of all the nodes connected 
  with node i by an edge.

Return the length of the shortest path that visits 
every node. You may start and stop at any node, you 
may revisit nodes multiple times, and you may reuse edges.

Example 1:


Input: graph = [[1,2,3],[0],[0],[0]]
Output: 4
Explanation: One possible path is [1,0,2,0,3]
Example 2:


Input: graph = [[1],[0,2,4],[1,3,4],[2],[1,2]]
Output: 4
Explanation: One possible path is [0,1,4,2,3]
 

Constraints:

n == graph.length
1 <= n <= 12
0 <= graph[i].length < n
graph[i] does not contain i.
If graph[a] contains b, then graph[b] contains a.
The input graph is always connected.
 * 
*/
/*
 * Bit Operations Explained
1. Setting Bits for Visited Nodes
1 << i: Shifts 1 left by i positions to represent the ith node (e.g., for node 2, 1 << 2 is 0100).

Bitmask: Integer where each bit indicates if the corresponding node is visited.

For example, if you’ve visited nodes 0 and 2 in a 4-node graph, your mask is 0101 (binary) or 5 (decimal).

2. Combining States
currMask | (1 << adj): Sets the bit corresponding to adj node as visited, without affecting other bits.

3. Checking All Nodes Visited
if (nextMask == allVisitedState): Compares the current mask with the “all visited” mask (e.g., 1111 for 4 nodes).

4. Visited State Pruning
if (visited[adj][nextMask] == 1): Prevents duplicate work by skipping visited states.

Time and Space Complexity
Time Complexity
Each state is defined by (currentNode, visitedMask).

Number of possible nodes: n

Number of possible masks: 2^n

Total possible states: n * 2^n

Each queue operation (visit/prune/expand) is O(1).

Worst-case time complexity:
O(n × 2ⁿ) — All states might be explored in the BFS, but each state is processed at most once.

Space Complexity
visited table: size n × 2^n

BFS queue: in worst-case/all states, may grow up to n × 2^n entries.

Overall space complexity:
O(n × 2ⁿ)


 * 
*/
package Graphs;

import java.util.LinkedList;
import java.util.Queue;

public class ShortestPathVisitingAllNodes847 {
    public int shortestPathLength(int[][] graph) {
        //Gets the total number of nodes.
        int n = graph.length;
        //Handles edge cases: if there's only one node or none, no steps are needed.
        if (n == 1 || n == 0) {
            return 0;
        }
        //Creates a bitmask with all bits set (e.g., 
        //for 4 nodes: 1111 in binary or 15 in decimal), 
        //representing the state where all nodes are visited.
        int allVisitedState = (1 << n) - 1;
        //BFS queue, each element is an array [currentNode, visitedMask].
        Queue<int[]> que = new LinkedList<>();
        //Tracks if a [node, visitedMask] state has been visited to avoid revisiting.
        int[][] visited = new int[n][allVisitedState + 1];
        //For each node i:
        for (int i = 0; i < n; i++) {
            //Initializes a BFS state where only node i is visited: 
            //mask is 1 << i (only the ith bit is set).
            //Adds [i, 1 << i] to the queue.
            que.add(new int[] { i, 1 << i });
            //Marks this state as visited in the visited matrix.
            visited[i][(1 << i)] = 1;
        }
        int shortestPath = 0;
        while (!que.isEmpty()) {
            int size = que.size();
            //For each level (step) in BFS, increment shortestPath.
            shortestPath++;
            for (int i = 0; i < size; i++) {
                int[] curr = que.poll();
                int currNode = curr[0];
                int currMask = curr[1];
                //For each adjacent node,
                for (int adj : graph[currNode]) {
                    //Compute new visited state: nextMask = currMask | (1 << adj);
                    int nextMask = currMask | (1 << adj);
                    //If this [adj, nextMask] state is already visited, skip.
                    if (visited[adj][nextMask] == 1) {
                        continue;
                    }
                    //If nextMask == allVisitedState, all nodes
                    // have been visited: return shortestPath.
                    if (nextMask == allVisitedState) {
                        return shortestPath;
                    }
                    //Else, mark [adj, nextMask] as visited and enqueue.
                    visited[adj][nextMask] = 1;
                    que.add(new int[] { adj, nextMask });
                } // end of adj for
            } // end of size for
        } // end of while
        //The function returns -1 (shouldn’t happen for connected graphs).
        return -1;
    }

    public static void main(String[] args) {
        ShortestPathVisitingAllNodes847 sol = new ShortestPathVisitingAllNodes847();
        int[][] graph = {
                { 1, 2, 3 },
                { 0 },
                { 0 },
                { 0 }
        };
        int result = sol.shortestPathLength(graph);
        System.out.println("Shortest Path Length = " + result);
    }
}


/*
The time complexity of the ShortestPathVisitingAllNodes847 function is O(n × 2^n), and the space complexity is also O(n × 2^n), where n is the number of nodes in the graph.

Time Complexity
The solution uses BFS with bitmasking: it explores all possible states, where a state is a combination of "current node" and "visited mask."

There are n possible current nodes.

For the visited mask, there are 2<sup>n</sup> possible subsets of nodes.

So, the total number of states is O(n × 2<sup>n</sup>).

At each state, all adjacent nodes (edges) are checked, but since the number of states dominates, the overall complexity is O(n × 2<sup>n</sup>).

Space Complexity
The visited array is of size n × 2<sup>n</sup>: one boolean for every possible (node, mask) pair.

The queue in the worst case will also store up to O(n × 2<sup>n</sup>) elements.

Therefore, space complexity is O(n × 2<sup>n</sup>).

Complexity	Value
Time Complexity	O(n × 2ⁿ)
Space Complexity	O(n × 2ⁿ)
This is efficient for graphs with up to 12 nodes (as per problem constraints) 
 
*/
/*

Initialize queue with each node as a starting point
        Here, [i, 1 << i] is an array with two items:

i: the current node index.

1 << i: a bitmask where only the ith bit is set 
(so, for node 2, it'll be 0b100, representing that 
only node 2 is visited at the start).

This means:

The queue entry [i, 1 << i] represents a BFS state
where the walk is at node i and only node i has been visited so far.

queue.push(...) adds this state to the BFS queue
to start search from every node.

This is a standard pattern for initializing BFS 
with multiple starting states, especially when 
using bitmasks to track visited nodes.


1 << adj:

This shifts the number 1 to the left by adj positions, creating a binary number where only the bit at position adj is set to 1.

For example, if adj = 2, 1 << 2 is 0b100 (binary for 4).

currMask | (1 << adj):

The bitwise OR (|) combines the current mask (which keeps track of which nodes have been visited) with this new bit.

This sets the bit for node adj to 1 in the mask, indicating that this node is now also visited.

Any bits already set (i.e., already visited nodes) remain set, new node gets marked visited too.

So, nextMask represents the set of all nodes visited after stepping to the adjacent node adj from the current node

 class ShortestPathVisitingAllNodes847 {
    shortestPathLength(graph) {
        const n = graph.length;
        if (n === 0 || n === 1) {
            return 0;
        }

        const allVisitedState = (1 << n) - 1;
        const queue = [];
        const visited = [];
for (let i = 0; i < n; i++) {
    visited[i] = [];
    for (let j = 0; j <= allVisitedState; j++) {
        visited[i][j] = false;
    }
}

      //  const visited = Array.from({ length: n }, () => Array(allVisitedState + 1).fill(false));

        
        for (let i = 0; i < n; i++) {
            queue.push([i, 1 << i]);
            visited[i][1 << i] = true;
        }

        let shortestPath = 0;

        while (queue.length > 0) {
            let size = queue.length;
            shortestPath++;
            for (let i = 0; i < size; i++) {
                const [currNode, currMask] = queue.shift();

                for (const adj of graph[currNode]) {
                    const nextMask = currMask | (1 << adj);

                    if (visited[adj][nextMask]) {
                        continue;
                    }

                    if (nextMask === allVisitedState) {
                        return shortestPath;
                    }

                    visited[adj][nextMask] = true;
                    queue.push([adj, nextMask]);
                }
            }
        }

        return -1; // For disconnected graphs (shouldn’t happen in problem constraints)
    }
}

// Example usage
const sol = new ShortestPathVisitingAllNodes847();
const graph = [
    [1, 2, 3],
    [0],
    [0],
    [0]
];
console.log("Shortest Path Length = " + sol.shortestPathLength(graph));

*/