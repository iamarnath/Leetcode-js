
/*
 * Maximum Triangle Island Value
 * 
 * You are given n islands labeled from 0 to n-1. 
 * Each island i has a value given by value[i].
You are also given an array of connections, edges, 
where each edges[i] = [u, v] means there is a 
bidirectional direct bridge between islands u and v.
 
A triangle is a group of 3 distinct islands A, B, and C 
such that each pair among them is directly connected 
by a bridge (i.e., the three islands form a cycle of length 3 .
Return the maximum sum of the values of a triangle of
 islands. If no such triangle exists, return
-1.

Find all triangles in the graph.

For each triangle of 3 islands (say A, B, C), 
calculate value[A] + value[B] + value[C].

Return the maximum of all such sums.

A triangle means three nodes (islands) A, B, and C 
such that there is a direct connection (bridge) between each pair of them.

If no triangle exists, return -1.
Example 1:

n = 5
value = [8, 2, 7, 11, 5]
edges = [[0,1], [1,2], [2,0], [1,3], [3,4], [4,1]]
Graph connections:

Triangle exists: 0-1-2-0
value = 8 + 2 + 7 = 17

Another triangle exists: 1-3-4-1
value = 2 + 11 + 5 = 18
 Output: 18

❌ Example 2 (no triangle):

n = 4
value = [1, 2, 3, 4]
edges = [[0,1], [1,2], [2,3]]
Graph:

0—1—2—3
No triangle formed.

✅ Output: -1

 * 
*/
/*
 * ⏱ Time Complexity
Let E be the number of edges (at most 20,000)

Outer loop over all nodes and their neighbors: O(E * d) 
(where d is avg degree)

Triangle detection with set lookup is efficient due to HashSet

Overall: Efficient enough for constraints:
n ≤ 10^4 and edges.length ≤ 2 × 10^4

🔑 Key Takeaways
This is a triangle detection problem in an undirected graph.

Avoid repeating triangles using node ordering.

Using Set ensures O(1) lookup for edge existence.

Real-world analogy: finding most valuable triangle of friends
 (islands) all directly connected.

 * 
*/
/*
 * 
 * Build adjacency list:

Use a List<Set<Integer>> adj to store neighbors of 
each node for quick lookup (O(1) time using HashSet).
Find all unique triangles:
Loop over all nodes u.
For each neighbor v of u, check if they form a
 triangle with any common neighbor w.
Avoid counting same triangle multiple times:
Only consider u < v < w ordering using if (u < v && w > v) 
to avoid permutations like (0,1,2) and (2,1,0).
Check if triangle exists:
If w is a neighbor of both u and v, then (u, v, w) forms a triangle.
Track max sum:
Compute value[u] + value[v] + value[w], update maxSum.
 * 
*/
import java.util.*;

/* 
public class MaximumTriangleIslandValue {
    public int maximumTriangleIslandValue(int n, int[] value, int[][] edges) {
        // Build adjacency list with HashSet for O(1) lookup
        List<Set<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new HashSet<>());

        for (int[] e : edges) {
            adj.get(e[0]).add(e[1]);
            adj.get(e[1]).add(e[0]);
        }

        int maxSum = -1;

        // For each node u
        for (int u = 0; u < n; u++) {
            for (int v : adj.get(u)) {
                if (u < v) {  // To avoid duplicates
                    for (int w : adj.get(u)) {
                        if (w != v && w > v && adj.get(v).contains(w)) {
                            // Triangle found: (u, v, w)
                            int sum = value[u] + value[v] + value[w];
                            maxSum = Math.max(maxSum, sum);
                        }
                    }
                }
            }
        }

        return maxSum;
    }

    //  Test
    public static void main(String[] args) {
        MaximumTriangleIslandValue sol = new MaximumTriangleIslandValue();

        int n1 = 5;
        int[] value1 = {8, 2, 7, 11, 5};
        int[][] edges1 = {{0,1}, {1,2}, {2,0}, {1,3}, {3,4}, {4,1}};
        System.out.println(sol.maximumTriangleIslandValue(n1, value1, edges1));  // ➤ 18

       
    }
}
    */
/*
 * 1. Adjacency List Construction
We use a List<Set<Integer>> for adjacency. 
This allows O(1) neighbor checks (crucial for triangle detection).

For each node, we store its neighbors in a HashSet.

2. Enumerate Triangles
For each node u, and each neighbor v 
where u < v (to avoid duplicates), we:

For each other neighbor w of u, where w > v and w != v,
check if w is also a neighbor of v (i.e., (u,v,w) forms a triangle).

If such a triangle is found, calculate the sum of values.

Update the maxSum if this sum is larger than the previous maximum.

The conditions u < v and w > v ensure every triangle
is counted exactly once.

3. Return Result
If no triangle is found, return -1.

Complexity
For each node, we look at pairs of its neighbors, so for a dense graph this could be O(n^3), but using the Set for neighbors makes the triangle check efficient.

 * 
 * 
*/
public class MaximumTriangleIslandValue {
    /*
     * public int maximumTriangleIslandValue(int n, int[] value, int[][] edges) {
     * // Prepare adjacency list for O(1) neighbor lookup
     * List<Set<Integer>> adj = new ArrayList<>();
     * for (int i = 0; i < n; i++) {
     * adj.add(new HashSet<>());
     * }
     * System.out.println("Initialized empty adjacency list.");
     * for (int[] e : edges) {
     * adj.get(e[0]).add(e[1]);
     * adj.get(e[1]).add(e[0]);
     * }
     * System.out.println("Adjacency list after edges: " + adj);
     * int maxSum = -1;
     * for (int u = 0; u < n; u++) {
     * System.out.println("for u: " + u + " =adj v=  "+ adj.get(u));
     * for (int v : adj.get(u)) {
     * // Ensure each edge is only considered once
     * if (u < v) {
     * for (int w : adj.get(u)) {
     * System.out.println("for u: " + u + " =adj w= "+w + " =adj.get(v)= "+v);
     * // Check for valid third vertex in the triangle:
     * // has to be different from v and must maintain order (w > v)
     * // to avoid repeats
     * if (w != v && w > v && adj.get(v).contains(w)) {
     * // Triangle found: (u, v, w)
     * int sum = value[u] + value[v] + value[w];
     * System.out.printf("Triangle found: (%d, %d, %d) with sum = %d\n", u, v, w,
     * sum);
     * maxSum = Math.max(maxSum, sum);
     * }
     * }
     * }
     * }
     * }
     * if (maxSum == -1) {
     * System.out.println("No triangle found.");
     * } else {
     * System.out.println("Maximum triangle value: " + maxSum);
     * }
     * return maxSum;
     * }// end of fn
     */
    public int maximumTriangleIslandValue(int n, int[] value, int[][] edges) {
        List<Set<Integer>> adj = new ArrayList<>();
        int[] degree = new int[n];
        for (int i = 0; i < n; i++)
            adj.add(new HashSet<>());

        for (int[] edge : edges) {
            int u = edge[0], v = edge[1];
            adj.get(u).add(v);
            adj.get(v).add(u);
            degree[u]++;
            degree[v]++;
        }

        int maxSum = -1;

        // Traverse edges
        for (int u = 0; u < n; u++) {
            for (int v : adj.get(u)) {
                // Only consider (u, v) once and ensure degree[u] <= degree[v]
                if (u < v && degree[u] <= degree[v]) {
                    // For each neighbor w of u
                    for (int w : adj.get(u)) {
                        if (w != v && adj.get(v).contains(w)) {
                            int sum = value[u] + value[v] + value[w];
                            maxSum = Math.max(maxSum, sum);
                        }
                    }
                }
            }
        }

        return maxSum;
    }

    public static void main(String[] args) {
        MaximumTriangleIslandValue sol = new MaximumTriangleIslandValue();
        int n1 = 5;
        int[] value1 = { 8, 2, 7, 11, 5 };
        int[][] edges1 = { { 0, 1 }, { 1, 2 }, { 2, 0 }, { 1, 3 }, { 3, 4 }, { 4, 1 } };
        System.out.println(sol.maximumTriangleIslandValue(n1, value1, edges1));

        // int n2 = 4;
        // int[] value2 = {1, 2, 3, 4};
        // int[][] edges2 = {{0,1}, {1,2}, {2,3}};
        // System.out.println(sol.maximumTriangleIslandValue(n2, value2, edges2)); // ➤
        // -1
    }
}
