/*
 
 Problem: Distribute Vertex Value Equally to Neighbors in a Graph
Description:

You are given an undirected graph with n vertices labeled 
from 0 to n-1. Each vertex v has an integer value values[v].
You are allowed to select any one vertex, say src,
 and distribute all its value equally among its direct 
 neighboring vertices (i.e., every neighbor receives an 
 equal share, and the value of src becomes 0 . 
 Each neighborʼs value increases by this amount.
   Distribution is only possible if values[src] is 
   divisible by the degree (number of neighbors) of
src.
  After the operation, return the resulting values for 
  all vertices as an array. If the distribution is
   not possible (i.e., not divisible), return [-1].
   
Example 1
Input:
n = 5
edges = [[0,1],[0,2],[1,3],[2,4]]
values = [12, 3, 4, 2, 10]
src = 0

Output:
[0,7,8,2,10]

Explanation:
-	Node 0 has value 12, degree 2 (neighbors: 1 and 2).
-	Each neighbor receives 12/2 = 6.
- Result: Node 0: 0, Node 1: 3+6=9, Node 2: 4+6=10, Node 3: 2, Node 4: 10.

 
Example 2
Input:
n = 3edges = [[0,1],[1,2]]
values = [7,2,5]
src = 1

Output:
[-1]

Explanation:
-	Node 1 has value 2, degree 2.
-	2 / 2 = 1. Both neighbors will get 1 each, but after subtracting from 2, Node 1 would b


Constraints

  2 <= n <= 10^4

  0 <= values[v] <= 10^9

  1 <= edges.length <= 2 * 10^4
  Only the neighbors of src receive values in one operation.

 
*/
/*
 
 Time Complexity: O(n + edges.length) (building adjacency + distributing).
Space Complexity: O(n + edges.length) (adjacency list + result array). 

Walkthrough of Example 2

Input

n = 3
edges = [[0,1],[1,2]]
values = [7,2,5]
src = 1


Step 1: Build Graph

0 → [1]

1 → [0,2]

2 → [1]

Step 2: Degree of src = 1

degree(1) = 2.

Step 3: Check divisibility

values[1] = 2

2 % 2 == 0 ✅ distribution possible.

Step 4: Distribute

Each neighbor gets 2 / 2 = 1.

New values = [7,2,5].

Set result[1] = 0.

Add 1 to result[0] → 7 + 1 = 8.

Add 1 to result[2] → 5 + 1 = 6.

Final Result:

[8, 0, 6]

*/
/*
 Extended question 
  New Description

You are given an undirected graph with n vertices.
Each vertex v has an integer value values[v].
Rule: At any step, if a vertex has a value divisible by its
 degree, it can distribute all its value equally 
 to its neighbors (its value becomes 0, and each
  neighbor increases by value/degree).
This process can be repeated on any vertex as long as
 distributions are possible.
The goal is to simulate multiple rounds until no
 more distributions are possible, and return the 
 final values of all vertices.
If any vertex attempts distribution but divisibility
 condition fails, that move is not allowed, and we skip it.
  
*/
package Graphs;

import java.util.*;

public class GraphValueDistributor {
  // basic question
  public int[] distributeValue(int n, int[][] edges, int[] values, int src) {
    // Step 1: Build adjacency list for the undirected graph
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++)
      adj.add(new ArrayList<>());
    for (int[] e : edges) {
      adj.get(e[0]).add(e[1]);
      adj.get(e[1]).add(e[0]);
    }

    // Step 2: Get degree of src (number of neighbors)
    int degree = adj.get(src).size();

    // Case: no neighbors → nothing changes
    if (degree == 0)
      return values;

    // Case: not divisible → impossible
    if (values[src] % degree != 0)
      return new int[] { -1 };

    // Step 3: Calculate amount to distribute to each neighbor
    int add = values[src] / degree;

    // Step 4: Copy values to result (don’t mutate original)
    int[] result = Arrays.copyOf(values, n);
    result[src] = 0; // src becomes 0

    // Step 5: Distribute to neighbors
    for (int neighbor : adj.get(src)) {
      result[neighbor] += add;
    }

    return result;
  }

  /* 
  public int[] distributeUntilStable(int n, int[][] edges, int[] values) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++)
      adj.add(new ArrayList<>());
    for (int[] e : edges) {
      adj.get(e[0]).add(e[1]);
      adj.get(e[1]).add(e[0]);
    }
    int[] result = Arrays.copyOf(values, n);
   
   Set<List<Integer>> seen = new HashSet<>();
while (true) {
   // String state = Arrays.toString(result);
     List<Integer> state = Arrays.stream(result).boxed().toList();
    if (!seen.add(state)) break; // already seen, stop

    boolean changed = false;
    int[] next = Arrays.copyOf(result, n);
    
    for (int v = 0; v < n; v++) {
        int degree = adj.get(v).size();
        if (degree == 0) continue;

        if (result[v] > 0 && result[v] % degree == 0) {
            int add = result[v] / degree;
            next[v] -= result[v];
            for (int nei : adj.get(v)) {
                next[nei] += add;
            }
            changed = true;
        }
    }
    result = next;
    if (!changed) break; // stable
}

    return result;
  }
  */
   public int[] distributeUntilStable(int n, int[][] edges, int[] values) {
        // Build adjacency list
        /*
         }
        Create an adjacency list to represent the undirected graph.
        For each vertex i, initialize an empty list adj[i] of neighbors.
        For every edge [a, b], add b to a’s neighbors and a to b’s neighbors.
        Visualization: If edges are [,] the adjacency list looks like:

        0 →

        1 →

        2 → 
         
        */
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) {
            adj.get(e[0]).add(e[1]);
            adj.get(e[1]).add(e[0]);
        }
        //Make a copy of the initial values into result so we can update without modifying the input array.
        int[] result = Arrays.copyOf(values, n);

        // Queue for vertices that may distribute
        //Create a queue q to hold vertices that currently
        // can distribute values.
      //inQueue tracks whether a vertex is already in 
      //the queue to avoid duplicates.

        Queue<Integer> q = new ArrayDeque<>();
        boolean[] inQueue = new boolean[n];

        // Initialize queue with all vertices that can distribute initially
        //Check every vertex to see if it meets the condition to start distributing values.
      // The helper function canDistribute() checks:
      // Vertex has neighbors (degree > 0)
      // Vertex value is positive and divisible evenly by its degree
      // If a vertex qualifies, add it to queue q and mark in inQueue.
        for (int v = 0; v < n; v++) {
            if (canDistribute(v, result, adj)) {
                q.offer(v);
                inQueue[v] = true;
            }
        }
      // Keep track of previously seen value 
      //states of the entire graph as strings.
      // Add the starting state to seen.
        // Track seen states to detect cycles
       Set<Integer> seen = new HashSet<>();
       seen.add(Arrays.hashCode(result));
        //While there are vertices that can distribute:
        while (!q.isEmpty()) {
          //Get the front vertex from the queue v.
            int v = q.poll();
            //Mark it as not in the queue.
            inQueue[v] = false;
            //Get its degree (neighbor count).
            int degree = adj.get(v).size();
            //If no neighbors, skip distribution.
            if (degree == 0) continue;
            //Check if vertex v can distribute: positive value divisible evenly by degree.
            if (result[v] > 0 && result[v] % degree == 0) {
              //Calculate amount add to give to each neighbor.
                int add = result[v] / degree;
                //Set this vertex’s value to zero (it distributes all).
                result[v] = 0;
                //For each neighbor, add the distributed value portion to their current values.
                for (int nei : adj.get(v)) {
                    result[nei] += add;
                    // if neighbor can now distribute, push to queue
                    //For each updated neighbor, check if it now qualifies to distribute.
                    //If yes and it’s not already in the queue, enqueue it to process its distribution next.
                    if (!inQueue[nei] && canDistribute(nei, result, adj)) {
                        q.offer(nei);
                        inQueue[nei] = true;
                    }
                }
            }

            // Check for cycles
            int hash = Arrays.hashCode(result);
      
            if (!seen.add(hash)) {
                break; // repeated state found → stop
            }
        }

        return result;
    }
    //Helper method to check distribution eligibility: vertex has neighbors and a positive divisible value.
    private boolean canDistribute(int v, int[] values, List<List<Integer>> adj) {
        int degree = adj.get(v).size();
        return degree > 0 && values[v] > 0 && values[v] % degree == 0;
    }
  // Example usage
  public static void main(String[] args) {
    GraphValueDistributor sol = new GraphValueDistributor();
    // example 1
    // int n = 4;
    // int[][] edges = { { 0, 1 }, { 1, 2 }, { 2, 3 } };
    // int[] values = { 6, 2, 4, 1 };
    // int src = 0;
    // example 2
    // int n = 3;
    // int[][] edges = {{0,1},{1,2}};
    // int[] values = {5, 2, 3};
    // int src = 1;
    // example 3
    // int n = 3;
    // int[][] edges = { { 0, 1 }, { 1, 2 } };
    // int[] values = { 5, 3, 2 };
    // int src = 1;
    // System.out.println(Arrays.toString(sol.distributeValue(n, edges, values,
    // src)));
    // example 4
    // int[] out1 = sol.distributeValue(
    // 5,
    // new int[][]{{0,1},{0,2},{1,3},{2,4}},
    // new int[]{12,3,4,2,10},
    // 0
    // );
    // System.out.println(Arrays.toString(out1));

    // example 5
    // int[] out2 = sol.distributeValue(
    // 3,
    // new int[][] { { 0, 1 }, { 1, 2 } },
    // new int[] { 7, 2, 5 },
    // 1);
    // System.out.println(Arrays.toString(out2));

    // example 6 for different pattern
    int[] out1 = sol.distributeUntilStable(
        4,
        new int[][] { { 0, 1 }, { 1, 2 }, { 2, 3 } },
        new int[] { 6, 2, 4, 1 });
    System.out.println(Arrays.toString(out1));

    // example 7 
    //   int[] out2 = sol.distributeUntilStable(
    //     5,
    //     new int[][]{{0,1},{0,2},{1,3},{2,4}},
    //     new int[]{12,3,4,2,10}
    // );
    // System.out.println(Arrays.toString(out2));
  }
}
