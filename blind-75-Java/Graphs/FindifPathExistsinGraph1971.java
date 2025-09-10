package Graphs;

import java.util.*;
/*
class FindifPathExistsinGraph1971 {
    // Helper DFS method: returns true if path exists from node to dest
    private boolean check(Map<Integer, List<Integer>> mp, int node, int dest, boolean[] visited) {
        if (node == dest)
            return true;

        if (visited[node])
            return false;

        visited[node] = true;
        for (int neighbor : mp.getOrDefault(node, new ArrayList<>())) {
            if (check(mp, neighbor, dest, visited))
                return true;
        }
        return false;
    }

    public boolean validPath(int n, int[][] edges, int source, int destination) {
        if (source == destination)
            return true;

        // Build adjacency list
        Map<Integer, List<Integer>> mp = new HashMap<>();
        for (int[] edge : edges) {
            int u = edge[0], v = edge[1];
            mp.computeIfAbsent(u, x -> new ArrayList<>()).add(v);
            mp.computeIfAbsent(v, x -> new ArrayList<>()).add(u);
        }

        boolean[] visited = new boolean[n];
        return check(mp, source, destination, visited);
    }
    public static void main(String[] args){
        int n = 3;
        int[][] edges = {{0,1},{1,2},{2,0}};
        int source = 0;
        int destination = 2;
        FindifPathExistsinGraph1971 sol = new FindifPathExistsinGraph1971();
        boolean res = sol.validPath(n,edges,source,destination);
        System.out.println(res);
    }
}
*/

public class FindifPathExistsinGraph1971 {
    public boolean validPath(int n, int[][] edges, int source, int destination) {
        // Build adjacency list
        Map<Integer, List<Integer>> adj = new HashMap<>();
        for (int[] edge : edges) {
            int u = edge[0], v = edge[1];
            adj.computeIfAbsent(u, x -> new ArrayList<>()).add(v);
            adj.computeIfAbsent(v, x -> new ArrayList<>()).add(u);
        }

        boolean[] visited = new boolean[n];
        Queue<Integer> queue = new LinkedList<>();
        queue.add(source);
        visited[source] = true;

        while (!queue.isEmpty()) {
            int node = queue.poll();
            if (node == destination)
                return true;
            // Iterate over neighbors
            for (int neighbor : adj.getOrDefault(node, Collections.emptyList())) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.add(neighbor);
                }
            }
        }
        return false;
    }
    
    public static void main(String[] args){
        int n = 3;
        int[][] edges = {{0,1},{1,2},{2,0}};
        int source = 0;
        int destination = 2;
        FindifPathExistsinGraph1971 sol = new FindifPathExistsinGraph1971();
        boolean res = sol.validPath(n,edges,source,destination);
        System.out.println(res);
    }
}
