/*
 * Problem: Graph With Multiple Types of Relationships

Description
You are given a directed graph representing a social/work network with n nodes labeled from 1 to n. Instead of a simple adjacency list, each node has outgoing edges of different relationship types (e.g., "friend", "colleague", "family"). Each edge connects to another node and is labeled with its type.
The graph is represented as:

  edges, where each edge is [from, to, type] (type is a string). Given:
n — the number of nodes.
edges — the array of directed, typed edges.
start — the starting node.
end — the target node.
allowedTypes — a list of relationship types (strings) you are allowed to traverse.
 
Return the minimum number of steps required to go from start to end using only edges whose type is in allowedTypes. If not possible, return -1.

Example
Input:
n = 5 edges = [
[1, 2, "friend"],
[2, 3, "colleague"],
[3, 4, "friend"],
[4, 5, "family"],
[1, 3, "colleague"],
[2, 5, "family"]
]
start = 1
end = 5
allowedTypes = ["friend", "family"]

Output:
3

Explanation:
Possible path: 1 → 2 ("friend"), 2 → 5 ("family") (but this
 is 2 steps, not all paths m

Constraints

  1 <= n <= 10^4

  0 <= edges.length <= 5 * 10^4

  1 <= from, to <= n
  type is a non-empty string of up to 10 lowercase letters.
  start, end in 1, n 

  n = 5
Edges:
1 → 2 (friend)
2 → 3 (colleague)
3 → 4 (friend)
4 → 5 (family)
1 → 3 (colleague)
2 → 5 (family)

allowedTypes = {"friend", "family"}
start = 1
end = 5

1 -friend→ 2
2 -colleague→ 3
3 -friend→ 4
4 -family→ 5
1 -colleague→ 3
2 -family→ 5
Only keeping allowed types ("friend", "family"):

1 -friend→ 2
3 -friend→ 4
4 -family→ 5
2 -family→ 5

BFS Traversal:
Start at 1 → can go to 2 (friend)

From 2 → can go to 5 (family)
✅ Found target in 2 steps.

Answer: 2

🔹 Complexity Analysis
Building adjacency: O(E)
where E = number of edges

BFS traversal: O(V + E)
but filtered by allowed types

Space: O(V + E) for adjacency + visited set

Data Structure Design
We need to store:

For each node:

For each relationship type:

List of neighbors with that type.

That’s why:

Map<Integer, Map<String, List<Integer>>> adj;
is used:

Outer Map<Integer, ...>: maps node → relationship map
Inner Map<String, List<Integer>>: maps relationship type → neighbors list

🔹 Algorithm
We want minimum steps → BFS is the natural choice because:
Each edge traversal counts as +1 step
BFS finds the shortest path in an unweighted graph

Steps:

Build adjacency map:
Read edges & types
Store edges by from node & type

BFS:

Queue stores (node, distance)
Visited set to prevent revisiting nodes
At each node, only explore edges whose type is in allowedTypes
Stop when end is reached, returning distance
 * 
*/
/*
 * Time/Space Complexity
Time Complexity:
In BFS, each node and edge is processed at most once.
Preparing the adjacency list is O(E).
Each BFS explores at most O(V + E) where:

V = number of vertices (nodes)

E = number of (allowed) edges
For each node, for each allowed type, you check the adjacency list (but this is at most O(E), total across the BFS).

Space Complexity:

Adjacency list: O(E)

Visited set: O(V)

Queue: Up to O(V)

Overall: O(V + E)
 * 
*/

/*
 If you need your queue to be thread-safe in production code—so that multiple threads can safely add or remove elements concurrently—the standard practice in Java is to use a concurrent queue implementation from the java.util.concurrent package.

Best Choices for a Thread-safe Queue
1. ConcurrentLinkedQueue
Non-blocking: Uses lock-free algorithms for high concurrency.

Queue operations (offer, poll, peek, etc.) are safe to use across multiple threads—no explicit synchronization is needed.

Used for: Most cases where you need a fast thread-safe FIFO queue and do not need producers/consumers to wait/block when the queue is empty or full.

Example:

java
import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;

Queue<int[]> queue = new ConcurrentLinkedQueue<>();
2. LinkedBlockingQueue (or other BlockingQueue)
Blocking/waiting capability: Threads attempting to remove from an empty queue (or add to a full one if bounded) will block until the operation can proceed.

Used for: Producer-consumer scenarios, thread pools, or situations where blocking/waiting behavior is required between threads.

java
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

BlockingQueue<int[]> queue = new LinkedBlockingQueue<>();
Which One Should You Choose?
If only thread-safety is needed (and not blocking):
Use ConcurrentLinkedQueue for high-throughput, lock-free, non-blocking operations.

If you want threads to wait when the queue is empty/full:
Use LinkedBlockingQueue or another BlockingQueue.

Summary Table
Implementation	Thread-safe	Non-blocking	Supports blocking (wait)	Use Case
ConcurrentLinkedQueue	Yes	Yes	No	Most high-performance, lock-free use cases
LinkedBlockingQueue	Yes	No	Yes	Producer-consumer, thread pools
In summary:
Replace:

java
Queue<int[]> queue = new LinkedList<>();
with:

java
Queue<int[]> queue = new ConcurrentLinkedQueue<>();
for thread-safe, non-blocking operations, or use LinkedBlockingQueue if you need blocking behavior. No manual synchronization is needed in either case.

 * 
*/
package Graphs;

import java.util.*;
public class GraphWithMultipleTypesofRelationships {
  private Map<Integer, Map<String, List<Integer>>> adj = new HashMap<>();
  /*
   * Purpose: Builds the adjacency list.
For each edge, you extract the from and to node, and the type of relationship.
computeIfAbsent ensures that the internal maps/lists are created if not already present.
The destination node is added as a neighbor on the given edge type.
   * 
  */
  /*
   * {
  1: {
      "friend":    [2],
      "colleague": [3]
     },
  2: {
      "colleague": [3],
      "family":    [5]
     },
  3: {
      "friend":    [4]
     },
  4: {
      "family":    [5]
     }
}

1 --friend--> 2 --colleague--> 3 --friend--> 4 --family--> 5
|               |
|               v
|--colleague--> 3
|
2 --family--> 5


   * 
  */
  private void printAdj() {
    for (Integer from : adj.keySet()) {
        System.out.println("From " + from + ":");
        for (String type : adj.get(from).keySet()) {
            System.out.println("  " + type + " -> " + adj.get(from).get(type));
        }
    }
}

  private void addEdges(int[][] edges, String[] types) {
    System.out.println("Building adjacency list...");

    for (int i = 0; i < edges.length; i++) {
      int from = edges[i][0];
      int to = edges[i][1];
      String type = types[i];
      //adj: This variable represents the adjacency list.
//  - For each node (Integer), you map to a map of edge types (String) to a list of neighboring nodes (List<Integer>).
//  Example: node 1, type "friend", connect to.
      adj
          .computeIfAbsent(from, k -> new HashMap<>())
          .computeIfAbsent(type, k -> new ArrayList<>())
          .add(to);
       //System.out.printf("Added edge from %d to %d of type '%s'%n", from, to, type);
    }
  }
  //Finds shortest path from start to end using only allowed relationship types.
  public int minTypeSteps(int n, int[][] edges, String[] types,
      int start, int end, Set<String> allowedTypes) {
        //Build the adjacency list using the input edges and types.
    addEdges(edges, types);
    //printAdj();
    System.out.printf("Start: %d, End: %d, Allowed Types: %s%n", start, end, allowedTypes);
    //The queue stores pairs of (current node, current distance from start).
    Queue<int[]> queue = new ArrayDeque<>();
    Set<Integer> visited = new HashSet<>();
    queue.offer(new int[] { start, 0 });
    visited.add(start);
    // - Pop the next node/distance from the queue.
    //  - If this is the destination (end), return the distance.
    //  - Look up all neighboring nodes accessible via allowed types only.
    //  - For all unvisited neighbors, add them to the queue and mark as visited.
    System.out.printf("BFS starting from %d%n", start);
    while (!queue.isEmpty()) {
      int[] curr = queue.poll();
      int node = curr[0], dist = curr[1];
      System.out.printf("Visiting node %d at distance %d%n", node, dist);
      if (node == end) {
        System.out.printf("Reached destination %d in %d steps.%n", end, dist);
        return dist;
      }
      Map<String, List<Integer>> neighbours = adj.getOrDefault(node, Collections.emptyMap());
      System.out.println("neighbours "+neighbours);
      for (String type : allowedTypes) {
         List<Integer> nextNodes = neighbours.getOrDefault(type, Collections.emptyList());
        System.out.printf("  Checking neighbors via type '%s': %s%n", type, nextNodes);
        for (int next : nextNodes) {
          if (!visited.contains(next)) {
            System.out.printf("    Queueing unvisited neighbor %d (distance %d)%n", next, dist + 1);
            visited.add(next);
            queue.offer(new int[] { next, dist + 1 });
          }
        }
      }
    }
    System.out.println("Destination not reachable with given allowed types.");

    return -1;
  }

  public static void main(String[] args) {
    GraphWithMultipleTypesofRelationships sol = new GraphWithMultipleTypesofRelationships();
    int n = 5;
    int[][] edges = {
        { 1, 2 },
        { 2, 3 },
        { 3, 4 },
        { 4, 5 },
        { 1, 3 },
        { 2, 5 }
    };

    String[] types = { "friend", "colleague", "friend", "family", "colleague", "family" };
    Set<String> allowedTypes = new HashSet<>(Arrays.asList("friend", "family"));
    int start = 1, end = 5;
    System.out.println(sol.minTypeSteps(n, edges, types, start, end, allowedTypes));
  }
}
