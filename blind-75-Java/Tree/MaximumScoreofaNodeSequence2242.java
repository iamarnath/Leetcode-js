
/*
 2242. Maximum Score of a Node Sequence

 There is an undirected graph with n nodes, numbered from 0 to n - 1.

You are given a 0-indexed integer array scores of length n where scores[i] denotes the score of node i. You are also given a 2D integer array edges where edges[i] = [ai, bi] denotes that there exists an undirected edge connecting nodes ai and bi.

A node sequence is valid if it meets the following conditions:

There is an edge connecting every pair of adjacent nodes in the sequence.
No node appears more than once in the sequence.
The score of a node sequence is defined as the sum of the scores of the nodes in the sequence.

Return the maximum score of a valid node sequence with a length of 4. If no such sequence exists, return -1.

 

Example 1:


Input: scores = [5,2,9,8,4], edges = [[0,1],[1,2],[2,3],[0,2],[1,3],[2,4]]
Output: 24
Explanation: The figure above shows the graph and the chosen node sequence [0,1,2,3].
The score of the node sequence is 5 + 2 + 9 + 8 = 24.
It can be shown that no other node sequence has a score of more than 24.
Note that the sequences [3,1,2,0] and [1,0,2,3] are also valid and have a score of 24.
The sequence [0,3,2,4] is not valid since no edge connects nodes 0 and 3.
Example 2:


Input: scores = [9,20,6,4,11,12], edges = [[0,3],[5,3],[2,4],[1,3]]
Output: -1
Explanation: The figure above shows the graph.
There are no valid node sequences of length 4, so we return -1.
 

Constraints:

n == scores.length
4 <= n <= 5 * 104
1 <= scores[i] <= 108
0 <= edges.length <= 5 * 104
edges[i].length == 2
0 <= ai, bi <= n - 1
ai != bi
There are no duplicate edges.

*/
/*
 * Given an undirected graph with n nodes (each with a score), and a list of edges, find the maximum possible sum of scores for a sequence of four distinct nodes (A, B, C, D) such that:

A is connected to B,

B is connected to C,

C is connected to D,

All nodes are distinct.

But this code is optimized for a slightly different
 problem (LeetCode 2242. Maximum Score of a Node Sequence),
  where you look for a path of length 3 (four nodes, three edges)
  , and maximize the sum of their scores.
 * 
*/
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {
    /*
     * public int maximumScore(int[] scores, int[][] edges) {
     * int VerticesLen = scores.length;
     * 
     * //Creates an adjacency list (graph) for the undirected graph.
     * //graph[i] is a list of nodes connected to node i.
     * List<Integer>[] graph = new List[VerticesLen];
     * Arrays.setAll(graph, v -> new ArrayList<>());
     * //For every edge, add both nodes to each other's adjacency list (since the
     * graph is undirected).
     * for (int[] edge : edges) {
     * int vertex1 = edge[0], vertex2 = edge[1];
     * graph[vertex1].add(vertex2);
     * graph[vertex2].add(vertex1);
     * }
     * // Sort and truncate each adjacency list to top 3 vertices based on scores
     * //For each node, sort its neighbors in descending order of their scores.
     * //Keep only the top 3 neighbors (since a valid sequence can only use up to 3
     * neighbors for each node in the sequence).
     * for (int i = 0; i < VerticesLen; i++) {
     * graph[i].sort((vertexA, vertexB) -> scores[vertexB] - scores[vertexA]);
     * graph[i] = graph[i].subList(0, Math.min(3, graph[i].size()));
     * }
     * int maxScore = -1;
     * //For every edge (A, B), consider all possible C (neighbor of A) and D
     * (neighbor of B).
     * 
     * // Ensure that C is not B, D is not A, and C is not D (all nodes are
     * distinct).
     * // Calculate the total score and update maxScore if this path is better.
     * for (int[] edge : edges) {
     * int vertexA = edge[0], vertexB = edge[1];
     * for (int vertexC : graph[vertexA]) {
     * for (int vertexD : graph[vertexB]) {
     * if (vertexC != vertexB && vertexD != vertexA && vertexC != vertexD) {
     * int currentScore = scores[vertexA] + scores[vertexB] + scores[vertexC] +
     * scores[vertexD];
     * maxScore = Math.max(maxScore, currentScore);
     * }
     * }
     * }
     * }
     * return maxScore;
     * }
     */
    public int maximumScore(int[] scores, int[][] edges) {
        int VerticesLen = scores.length;
        // Create adj list using List of Lists
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i < VerticesLen; i++) {
            graph.add(new ArrayList<>());
        }

        // Build the adjacency list
        for (int[] edge : edges) {
            int vertex1 = edge[0], vertex2 = edge[1];
            graph.get(vertex1).add(vertex2);
            graph.get(vertex2).add(vertex1);
        }

        // Sort and truncate each adjacency list to top 3 vertices based on scores
        for (int i = 0; i < VerticesLen; i++) {
            List<Integer> neighbors = graph.get(i);
            neighbors.sort((vertexA, vertexB) -> scores[vertexB] - scores[vertexA]);
            if (neighbors.size() > 3) {
                graph.set(i, neighbors.subList(0, 3));
            }
        }

        int maxScore = -1;
        for (int[] edge : edges) {
            int vertexA = edge[0], vertexB = edge[1];
            for (int vertexC : graph.get(vertexA)) {
                for (int vertexD : graph.get(vertexB)) {
                    if (vertexC != vertexB && vertexD != vertexA && vertexC != vertexD) {
                        int currentScore = scores[vertexA] + scores[vertexB] + scores[vertexC] + scores[vertexD];
                        maxScore = Math.max(maxScore, currentScore);
                    }
                }
            }
        }
        return maxScore;
    }

}

public class MaximumScoreofaNodeSequence2242 {
    public static void main(String[] args) {
        // Example input
        int[] scores = { 5, 2, 9, 8, 4 };
        int[][] edges = {
                { 0, 1 },
                { 0, 2 },
                { 2, 3 },
                { 2, 4 }
        };

        Solution sol = new Solution();
        int result = sol.maximumScore(scores, edges);
        System.out.println("Maximum Score: " + result);
    }
}