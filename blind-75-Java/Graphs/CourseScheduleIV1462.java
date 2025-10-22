/*
 * 1462. Course Schedule IV
 * 
 * There are a total of numCourses courses you have to take,
 *  labeled from 0 to numCourses - 1. You are given an
 *  array prerequisites where prerequisites[i] = [ai, bi]
 *  indicates that you must take course ai first if you 
 * want to take course bi.

For example, the pair [0, 1] indicates that you have 
to take course 0 before you can take course 1.
Prerequisites can also be indirect. If course a is
 a prerequisite of course b, and course b is a prerequisite 
 of course c, then course a is a prerequisite of course c.

You are also given an array queries where 
queries[j] = [uj, vj]. For the jth query, you 
should answer whether course uj is a prerequisite of course vj or not.

Return a boolean array answer, where answer[j]
 is the answer to the jth query.
Example 1:
Input: numCourses = 2, prerequisites = [[1,0]], queries = [[0,1],[1,0]]
Output: [false,true]
Explanation: The pair [1, 0] indicates that you have 
to take course 1 before you can take course 0.
Course 0 is not a prerequisite of course 1, but the opposite is true.
Example 2:

Input: numCourses = 2, prerequisites = [], queries = [[1,0],[0,1]]
Output: [false,false]
Explanation: There are no prerequisites, and each course is independent.
Example 3:


Input: numCourses = 3, prerequisites = [[1,2],[1,0],[2,0]], queries = [[1,0],[1,2]]
Output: [true,true]
 

Constraints:

2 <= numCourses <= 100
0 <= prerequisites.length <= (numCourses * (numCourses - 1) / 2)
prerequisites[i].length == 2
0 <= ai, bi <= numCourses - 1
ai != bi
All the pairs [ai, bi] are unique.
The prerequisites graph has no cycles.
1 <= queries.length <= 104
0 <= ui, vi <= numCourses - 1
ui != vi
*/
/*
 * Summary of getOrDefault and computeIfAbsent
computeIfAbsent(key, k -> new ...)

If key is not present, create an entry with the value initialized by the supplied function.

Used for collections to always have a non-null collection for adding/changing.

getOrDefault(key, someDefault)

If the key is found, returns its value.

If not, returns the supplied default value.

Good for read-only or "checking" usages to avoid NPEs.
 * 
*/
/*
 * Time Complexity
Let's denote:

n = numCourses

m = number of prerequisites (edges)

q = number of queries

1. Building Adjacency List and Indegree
java
for (int[] edge : prerequisites) { ... }
Iterates over all prerequisites. Each operation (map/list/array) is O(1).

Time: O(m)

2. Finding All Indegree-0 Nodes
java
for (int i = 0; i < numCourses; i++) { ... }
Iterates from 0 to n-1.

Time: O(n)

3. Topological Sort and Prerequisite Propagation
java
while (!queue.isEmpty()) { ... }
Each node is added/removed from the queue exactly once: O(n)

Inside the loop, for each neighbor (for each edge): O(m)

However, the critical part is:

java
prereqMap.get(neighbour).addAll(prereqMap.getOrDefault(node, new HashSet<>()));
Each course's set of prerequisites can (in the very worst-case) be up to O(n) size, if every course is a prerequisite for others (e.g. dense connectivity, like a complete DAG).

For every edge, you may merge prerequisite sets, each up to O(n).

There are m edges, so the worst-case time for the inner set union operation is O(m * n).

4. Processing Queries
java
for (int[] query : queries) { ... }
Each is a set lookup (O(1) average, O(n) worst-case per lookup).

Total: O(q)

Overall Time Complexity
Best/Average case:

If the graph is sparse and prerequisite sets are small, the dominant factors are O(n + m + q).

Worst-case:

Each prerequisite set can be O(n) and merging them m times gives O(m * n)

So, Total worst-case time:

text
O(n + m + m*n + q) ≈ O(m * n + q)
Space Complexity
1. Adjacency List
adj: O(m) (each edge stored once)

2. Indegree Array
O(n)

3. prereqMap
Each course holds a set of all its prerequisites. In the worst case, each course has all other courses as a prerequisite: O(n^2).

4. Queue
O(n) in the worst case (all courses in queue)

5. Result List
O(q)

Total Space
text
O(m + n + n^2 + n + q) ≈ O(n^2 + m + q)
Dominated by O(n^2) for the prereqMap in the worst case; sparser graphs use much less.

Summary Table
Step	            Time Complexity	                Space Complexity
Build adj/indegree	        O(m)	                    O(m + n)
Topological sort/merge	    O(m * n)	                O(n^2)
Query phase	                O(q)	                    O(q)
Total (worst case)	        O(m * n + q)	            O(n^2 + m + q)

 * 
 * 
*/
package Graphs;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.Set;

public class CourseScheduleIV1462 {
    public List<Boolean> checkIfPrerequisite(int numCourses, int[][] prerequisites, int[][] queries) {
        //Creates an adjacency list to store direct outward neighbors for each course (from u → v).
        Map<Integer, List<Integer>> adj = new HashMap<>();
        //Array counting how many prerequisites each course has (number of incoming edges).
        int[] indegree = new int[numCourses];
        for (int[] edge : prerequisites) {
            //Extracts the prerequisite relationship a→b.
            int u = edge[0];
            int v = edge[1];
            //If u isn't in the map, 
            //insert a new list (using computeIfAbsent), then add v to u's neighbor list.
            //Why computeIfAbsent?
            //Ensures you never get a null pointer; you never have 
            //to check if a list exists for u—it creates one if missing.
            adj.computeIfAbsent(u, k -> new ArrayList<>()).add(v);
            //Increases the indegree of course v (since each edge is a prerequisite for v).
            indegree[v]++;
        }
        // Initialize queue with nodes having indegree 0
        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            //The loop finds all courses that have no
            // prerequisites (indegree == 0) and adds them to the queue.
            if (indegree[i] == 0) {
                queue.offer(i);
            }
        }
        // Map from node to set of prerequisite nodes
        //prereqMap.get(v) will be the set of all courses that are prerequisites
        // for course v, either directly or indirectly.
        Map<Integer, Set<Integer>> prereqMap = new HashMap<>();
        while (!queue.isEmpty()) {
            //Takes the next node with indegree 0.
            int node = queue.poll();
            //adj.getOrDefault(node, new ArrayList<>()) safely gets neighbors, or an empty list if none.
            // Why getOrDefault?
            // Avoids NullPointerException if the course has no outgoing edges.
            for (int neighbour : adj.getOrDefault(node, new ArrayList<>())) {
                // Add current node and its prerequisites to the neighbor's prerequisites
                // Makes sure the set exists for neighbour, then adds the 
                //current node as its prerequisite.
                // Why computeIfAbsent?
                // Guarantees the set is present so you can add to it directly.
                prereqMap.computeIfAbsent(neighbour, k -> new HashSet<>()).add(node);
                //Makes sure the set exists for neighbour, then adds the current node
                // as its prerequisite.
                //Adds all prerequisites of node (which you just completed) 
                //to neighbour's prerequisite set.
                // Why getOrDefault?
                // If prereqMap doesn't have node, use an empty set 
                //(possibly for courses with no prerequisites).

                prereqMap.get(neighbour).addAll(prereqMap.getOrDefault(node, new HashSet<>()));
                //Decrease indegree; see if all prerequisites are now satisfied.
                indegree[neighbour]--;
                //If indegree[neighbour] == 0, add neighbour to the queue—ready to process its prerequisites.
                if (indegree[neighbour] == 0) {
                    queue.offer(neighbour);
                }
            }
        }
        // Process each query
        List<Boolean> result = new ArrayList<>();
        //For each query [src, dest], check if 
        //src is in the set of all prerequisites for dest.
        for (int[] query : queries) {
            int src = query[0];
            int dest = query[1];
            //Again, getOrDefault is used to handle 
            //cases where the course has no prerequisites.
            result.add(prereqMap.getOrDefault(dest, new HashSet<>()).contains(src));
        }
        return result;
    }

    public static void main(String[] args) {
        int numCourses = 3;
        int[][] prerequisites = { { 1, 2 }, { 1, 0 }, { 2, 0 } };
        int[][] queries = { { 1, 0 }, { 1, 2 } };

        CourseScheduleIV1462 solver = new CourseScheduleIV1462();
        List<Boolean> result = solver.checkIfPrerequisite(numCourses, prerequisites, queries);

        System.out.println(result);
    }
}




/*
 class CourseScheduleIV1462 {
    checkIfPrerequisite(numCourses, prerequisites, queries) {
        // Creates an adjacency list (map) to store direct outward neighbors for each course (from u → v).
        const adj = new Map();
        // Array counting how many prerequisites each course has (number of incoming edges).
        const indegree = new Array(numCourses).fill(0);

        // Build adjacency list and indegree count
        for (const [u, v] of prerequisites) {
            // If u isn't in the map, create a new array, then add v to u's neighbor list
            if (!adj.has(u)) {
                adj.set(u, []);
            }
            adj.get(u).push(v);
            // Increase indegree of course v (since each edge is a prerequisite for v)
            indegree[v]++;
        }

        // Initialize queue with courses that have no prerequisites (indegree == 0)
        const queue = [];
        for (let i = 0; i < numCourses; i++) {
            if (indegree[i] === 0) {
                queue.push(i);
            }
        }

        // Map from node to set of prerequisite nodes
        // prereqMap.get(v) = set of all courses that are prerequisites for course v
        const prereqMap = new Map();

        // Topological BFS
        while ( queue.length > 0 ) {
            const node = queue.shift(); // dequeue

            // Get neighbors of current node, or an empty list if none
            const neighbors = adj.get(node) || [];

            for (const neighbour of neighbors) {
                // Ensure a set exists for this neighbor
                if (!prereqMap.has(neighbour)) {
                    prereqMap.set(neighbour, new Set());
                }

                // Add current node as a prerequisite of neighbor
                prereqMap.get(neighbour).add(node);

                // Also add all prerequisites of current node
                const nodePrereqs = prereqMap.get(node) || new Set();
                for (const pre of nodePrereqs) {
                    prereqMap.get(neighbour).add(pre);
                }

                // Decrease indegree since we've "processed" one prerequisite
                indegree[neighbour]--;
                // If all prerequisites satisfied, push to queue
                if (indegree[neighbour] === 0) {
                    queue.push(neighbour);
                }
            }
        }

        // Process each query
        const result = [];
        for (const [src, dest] of queries) {
            const prereqs = prereqMap.get(dest) || new Set();
            result.push(prereqs.has(src));
        }

        return result;
    }
}

// Example usage
const numCourses = 3;
const prerequisites = [[1, 2], [1, 0], [2, 0]];
const queries = [[1, 0], [1, 2]];

const solver = new CourseScheduleIV1462();
const result = solver.checkIfPrerequisite(numCourses, prerequisites, queries);
console.log(result); // Expected output: [true, true]
 
 
*/