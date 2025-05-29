/*
332. Reconstruct Itinerary
Description
You are given a list of flight tickets tickets where 
tickets[i] = [from_i, to_i] represent the source airport
 and the destination airport.

Each from_i and to_i consists of three uppercase English letters.

Reconstruct the itinerary in order and return it.

All of the tickets belong to someone who originally
 departed from "JFK". Your objective is to reconstruct
  the flight path that this person took, assuming each 
  ticket was used exactly once.

If there are multiple valid flight paths, return the
 lexicographically smallest one.

For example, the itinerary ["JFK", "SEA"] has 
a smaller lexical order than ["JFK", "SFO"].
You may assume all the tickets form at 
least one valid flight path.

Example 1:
Input: tickets = [["BUF","HOU"],["HOU","SEA"],["JFK","BUF"]]

Output: ["JFK","BUF","HOU","SEA"]
Example 2:
Input: tickets = [["HOU","JFK"],["SEA","JFK"],["JFK","SEA"],["JFK","HOU"]]

Output: ["JFK","HOU","JFK","SEA","JFK"]
Explanation: Another possible reconstruction is 
["JFK","SEA","JFK","HOU","JFK"] but it is lexicographically larger.

*/

function findItinerary(tickets) {
    const adjacency = {};
    // 1. Build adjacency list
    for (const [from, to] of tickets) {
        if (!adjacency[from]) adjacency[from] = [];
        adjacency[from].push(to);
    }

    // 2. Sort each airport's destinations lexicographically
    for (const airport in adjacency) {
        adjacency[airport].sort();
    }

    const result = [];
    const path = ["JFK"]; // Start with JFK
    const totalTickets = tickets.length;

    // 3. DFS with backtracking
    function dfs(currentAirport) {
        // Found complete itinerary
        if (path.length === totalTickets + 1) {
            result.push(...path);
            return true;
        }

        // No outgoing edges
        if (!adjacency[currentAirport]) return false;

        // Try all sorted neighbors
        const destinations = adjacency[currentAirport];
        for (let i = 0; i < destinations.length; i++) {
            const nextAirport = destinations[i];

            // Remove ticket from graph
            destinations.splice(i, 1);
            path.push(nextAirport);

            if (dfs(nextAirport)) return true; // Found valid path

            // Backtrack if path invalid
            path.pop();
            destinations.splice(i, 0, nextAirport);
        }

        return false;
    }

    dfs("JFK");
    return result;
}
/*
Efficient Solution: Use Hierholzer's Algorithm (Eulerian Path)
For this problem, you can use a stack-based post-order
 DFS (Hierholzer's algorithm),
 which is much faster and avoids the need to "restore" tickets. 
*/
/*
function findItinerary(tickets) {
    const adj = {};
    for (const [from, to] of tickets) {
        if (!adj[from]) adj[from] = [];
        adj[from].push(to);
    }
    // Sort destinations in reverse lexical order for efficient pop()
    for (const from in adj) {
        adj[from].sort().reverse();
    }

    const route = [];
    function dfs(airport) {
        const dests = adj[airport];
        while (dests && dests.length) {
            dfs(dests.pop());
        }
        route.push(airport);
    }

    dfs("JFK");
    return route.reverse();
}
*/
/*
Purpose:
Given a list of airline tickets represented as pairs 
of departure and arrival airports, reconstruct the
 itinerary in lexical order starting from "JFK".
  All tickets must be used exactly once.

Adjacency List:
The code uses a map (adj) from each airport to a 
min-heap (priority queue) of destination airports.
 In JavaScript, we use a sorted array to simulate the min-heap.

DFS Traversal:
The DFS visits the lexicographically smallest destination 
first (by always shifting the first element of 
the sorted array). When a node has no more outgoing edges,
 it is added to the result.

Result Construction:
The result is built in reverse order during DFS 
backtracking, so we reverse it at the end.

*/
/*
Time and Space Complexity
Time Complexity:

Building the adjacency list:
Each ticket is processed once: O(E), where E is the number of tickets.

DFS Traversal:
Each edge (ticket) is visited exactly once: O(E).

Sorting destinations (if using arrays instead of a true min-heap):
If you sort the destination lists up front, sorting all destinations across all nodes is O(E log E).

Result reversal:
Reversing the result array is O(E).

Overall:

If you use a true min-heap for each node: O(E log D), where D is the max number of destinations from any airport.

If you use sorted arrays and shift the first element: O(E log E) (dominated by sorting).

For most practical purposes, O(E log E).

Space Complexity:

Adjacency list:
Stores all tickets: O(E).

Result array:
Stores all airports in the itinerary: O(E).

Call stack (DFS recursion):
At most O(E) in the worst case (deepest path).

Total:

O(E) auxiliary space.
*/
function findItinerary(tickets) {
    // Adjacency list: Map from string to a min-heap (priority queue)
    const adj = new Map();
    // Helper function to insert into a min-heap (priority queue)
    function insertHeap(heap, val) {
        heap.push(val);
        heap.sort(); // Sort to maintain lexicographical order
    }
    // Build the adjacency list with min-heaps for each departure airport
    for (const [from, to] of tickets) {
        if (!adj.has(from)) {
            adj.set(from, []);
        }
        insertHeap(adj.get(from), to);
    }

    const result = [];
    function dfs(u) {
        const edges = adj.get(u) || [];
        while (edges.length > 0) {
            // Always take the lexicographically smallest destination
            const v = edges.shift();//Remove the smallest (sorted order)
            dfs(v);
        }
        result.push(u);
    }
    dfs("JFK");
    result.reverse();
    return result;
}