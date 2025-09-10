/*
 * Parallel Courses III
 * You are given an integer n, which indicates that there are n courses
 *  labeled from 1 to n. You are also given a 2D integer
 *  array relations where relations[j] = [prevCoursej, nextCoursej]
 *  denotes that course prevCoursej has to be completed before
 *  course nextCoursej (prerequisite relationship). Furthermore,
 *  you are given a 0-indexed integer array time where time[i] 
 * denotes how many months it takes to complete the (i+1)th course.

You must find the minimum number of months needed to complete 
all the courses following these rules:

You may start taking a course at any time if the prerequisites are met.
Any number of courses can be taken at the same time.
Return the minimum number of months needed to complete all the courses.

Note: The test cases are generated such that it is possible to 
complete every course (i.e., the graph is a directed acyclic graph).

Example 1:

Input: n = 3, relations = [[1,3],[2,3]], time = [3,2,5]
Output: 8
Explanation: The figure above represents the given graph and 
the time required to complete each course. 
We start course 1 and course 2 simultaneously at month 0.
Course 1 takes 3 months and course 2 takes 2 months 
to complete respectively.
Thus, the earliest time we can start course 3 is at month 3, 
and the total time required is 3 + 5 = 8 months.
Example 2:


Input: n = 5, relations = [[1,5],[2,5],[3,5],[3,4],[4,5]], time = [1,2,3,4,5]
Output: 12
Explanation: The figure above represents the given graph 
and the time required to complete each course.
You can start courses 1, 2, and 3 at month 0.
You can complete them after 1, 2, and 3 months respectively.
Course 4 can be taken only after course 3 is completed,
 i.e., after 3 months. It is completed after 3 + 4 = 7 months.
Course 5 can be taken only after courses 1, 2, 3, and 4 have been completed, i.e., after max(1,2,3,7) = 7 months.
Thus, the minimum time needed to complete all the
 courses is 7 + 5 = 12 months.
 

Constraints:

1 <= n <= 5 * 104
0 <= relations.length <= min(n * (n - 1) / 2, 5 * 104)
relations[j].length == 2
1 <= prevCoursej, nextCoursej <= n
prevCoursej != nextCoursej
All the pairs [prevCoursej, nextCoursej] are unique.
time.length == n
1 <= time[i] <= 104
The given graph is a directed acyclic graph.
*/
/*
 * Approach Overview
Model courses as a Directed Acyclic Graph (DAG) where edges are prerequisites.

Use topological sorting (Kahn's Algorithm) to process courses level-by-level.

Track maximum time needed to finish each course, considering the longest path through its prerequisites.

Because multiple courses can run in parallel, total time is driven by the longest dependency chain.

Use dynamic programming style update:
maxTime[course] = max(maxTime[course], maxTime[preCourse] + time[course])

 * 
*/
/*
 * Time Complexity
Building adjacency list and indegree array: 
O(E), where 
E = number of relations.
Processing each course once in the queue: 
O(N+E).
Updating maxTime and indegrees for each edge: 
O(E).
Final max search over maxTime: 
O(N).

Overall: 
O(N+E) which is optimal for DAG processing.

Space Complexity
Adjacency list: 
O(N+E).
indegree and maxTime arrays: 
O(N).

Queue space: up to 
O(N) in worst case.

Overall: 
O(N+E) space usage.
 * 
*/
package Graphs;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;

public class ParallelCoursesIII2050 {
    public int minimumTime(int n, int[][] relations, int[] time) {
        //adj: adjacency list, maps each course to a list of next courses that depend on it.
        //indegree[i]: number of prerequisites for course i.
        //maxTime[i]: maximum time to complete course i including prerequisites.
        Map<Integer, List<Integer>> adj = new HashMap<>();
        int[] indegree = new int[n];
        int[] maxTime = new int[n];
        //For each relation [u,v] (1-based indexing):
        // Convert to 0-based indices.
        // Add edge u -> v.
        // Increment indegree[v] because v depends on u.
        for (int[] vec : relations) {
            int u = vec[0] - 1;
            int v = vec[1] - 1;
            adj.computeIfAbsent(u, k -> new ArrayList<>()).add(v);
            indegree[v]++;
        }
        //Courses with indegree == 0 have no prerequisites: can start immediately.
        //Add them to the processing queue.
        //Initialize their completion time as their own duration.
        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < n; i++) {
            if (indegree[i] == 0) {
                queue.offer(i);
                maxTime[i] = time[i];
            }
        }
        int result = 0;
        while (!queue.isEmpty()) {
            //Dequeue a course u ready to be "completed".
            int u = queue.poll();
            //The entire education finishes when the slowest course chain finishes.
            //Return max completion time among all courses.
            result = Math.max(result, maxTime[u]);
            //Get all dependent courses neighbours.
            List<Integer> neighbours = adj.getOrDefault(u, new ArrayList<>());
            //For each dependent course v:
            //Update maxTime[v] as max of its current time and 
            //completion time of u plus its own duration.
            //Decrement indegree[v]: one less prerequisite remaining.
            //If indegree[v] becomes 0, all prerequisites are done: enqueue v.
            for (int v : neighbours) {
                maxTime[v] = Math.max(maxTime[v], maxTime[u] + time[v]);
                indegree[v]--;
                if (indegree[v] == 0) {
                    queue.offer(v);
                }
            }
        }
        
        // for (int i = 0; i < n; i++) {
        //             System.out.println(maxTime[i]);

        //     result = Math.max(result, maxTime[i]);
        // }
        return result;

    }

    public static void main(String[] args) {
        ParallelCoursesIII2050 sol = new ParallelCoursesIII2050();

        int n = 5;
        int[][] relations = { { 1, 5 }, { 2, 5 }, { 3, 5 }, { 3, 4 }, { 4, 5 } };
        int[] time = { 1, 2, 3, 4, 5 };

        int res = sol.minimumTime(n, relations, time);
        System.out.println("Minimum time required: " + res);
    }
}
