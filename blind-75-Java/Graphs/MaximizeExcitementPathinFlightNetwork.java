/**
 * Maximize Excitement Path of Length 4 in a Flight Network
 * Problem Statement
You are given N cities, each with a unique name and an integer 
representing its excitement value.
You are also given a list of bidirectional direct flights 
between pairs of cities.
Your task is to select four distinct cities A, B, C, D such that:
•	There is a direct flight from A to B, B to C, 
and C to D (i.e., a path of length 3).
•	The total excitement 
(excitement[A] + excitement[B] + excitement[C] + excitement[D]) 
is maximized.
Return the names of the four cities in order,
 representing the path with the maximum total excitement.
Example
Input:
Cities:
New York 10000
San Francisco 1000
Texas 500
LA 20000
Chicago 3000
San Jose 900

Flights:
New York <-> San Francisco
New York <-> LA
Chicago <-> LA
San Jose <-> San Francisco

Output:
San Francisco -> New York -> LA -> Chicago

Explanation:
The path is San Francisco - New York - LA - Chicago, 
with excitement 1000 + 10000 + 20000 + 3000 = 34000.
Constraints
•	4 ≤ N ≤ 10^4
•	1 ≤ excitement[i] ≤ 10^9
•	Each city name is unique.
•	No duplicate flights.
•	No self-loops.

 */

package Graphs;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;
import java.util.Set;

/*
 * Defines a simple City class to store:

name: The name of the city.

excitement: A numerical value representing how exciting the city is.

Constructor initializes these attributes.
 * 
*/
/*
 * Time Complexity Analysis
Let N be the number of cities and M be the number of flights.

Building cityMap and adjacency list:
O(N + M)

Precomputing best neighbors:

Each city with degree d inserts neighbors into a priority queue of size d: O(d log d)

Across all cities: sum of degrees = 2M

Worst case: O(M log M)

Trying all B-C pairs (edges):

For each edge (B-C), we try up to K best neighbors for A (up to 3) and for D (up to 3), so 3 * 3 = 9 combinations per edge.

Number of edges = about M (undirected)

So total complexity for this step is O(M * K^2) = O(M), since K=3 is constant.

Overall complexity:
O(N + M log M + M) ≈ O(M log M)

Space Complexity Analysis
cityMap: O(N)

adjacency list: O(N + M) (each edge stored twice)

bestNeighbours: O(N * K) = O(N)

Priority queues are temporary and cleared per city.

Overall space: O(N + M)

Summary
Step	Time Complexity	Space Complexity
Build cityMap & adj list	O(N + M)	O(N + M)
Compute best neighbors	O(M log M) (worst)	O(N)
Search for max excitement path	O(M)	O(N)
Total	O(M log M)	O(N + M)


 * 
*/
/*
 * In the code, you iterate over all edges (flights) from city B to its neighbors C.

Since flights (edges) are bidirectional and the adjacency list stores neighbors both ways (B -> C and C -> B), each edge appears twice.

For example, if there is an edge between "LA" and "Chicago", then:

When b is "LA", cName might be "Chicago"

When b is "Chicago", cName might be "LA"

If you process both, your logic would duplicate work and consider the same edge in both directions.

What does compareTo do here?
b.name.compareTo(cName) lexicographically compares the two city names as strings.

If the result is >= 0, that means either b.name is equal to cName, or b.name comes after cName alphabetically.

So this condition skips processing if B's name is not lexicographically less than C's name.

Why skip this?
To consider each edge only once, process only when b.name < cName lex order.

This way, each edge (B, C) is considered once with B < C, and the duplicate (C, B) with C < B is skipped.

This reduces redundant calculations and keeps the search efficient.

if (aName.equals(b.name) || aName.equals(cName)) {
    System.out.println("  Skipping A: " + aName + " as it conflicts with "+ b.name + "==OR== "+cName);
    continue;
}
is used to ensure that the city chosen as A is distinct from cities B and C in the path A -> B -> C -> D.

Explanation:
The algorithm tries to construct a path of length 4: A -> B -> C -> D.

For each edge (B, C) found in the graph, the code tries to find suitable neighbors for A (connected to B) and for D (connected to C).

Since the path must consist of four distinct cities, A must not be the same as B or C.

What if you don't do this?
If A equals B or C, then the path is invalid because it repeats a city.

That would violate the path uniqueness constraint.

It would also incorrectly inflate the excitement sum by counting a city more than once.

Purpose of the check
Prevents city duplication in the path.

Keeps the path valid and meaningful.

Maintains correct logic and avoids wrong excitement total.

Why print the statement?
The debug print clearly indicates when and why a candidate A was skipped during path construction.

It is helpful for verifying that the uniqueness check is effective.

Summary:
This check is to avoid choosing a city A that is the same as B or C, ensuring that the path’s cities are all unique as required.
if (dName.equals(aName) || dName.equals(b.name) || dName.equals(cName)) {
    System.out.println("   Skipping D: " + dName + " due to conflict with "+aName + " bname "+b.name + " cName "+cName);
    continue;
}
is used to ensure that the city chosen as D is distinct from the other cities A, B, and C in the path A -> B -> C -> D.

Explanation:
The algorithm is trying to find a path with 4 unique cities linked as A -> B -> C -> D.

After picking cities A, B, and C, the city D must be different from all three.

This condition checks if the candidate dName city is equal to any of the already chosen cities (aName, b.name, or cName).

Why is this important?
The path must be a chain of 4 distinct cities — no city should be repeated.

Including a repeated city would violate the path uniqueness constraint and give an invalid path.

Repetition could also falsely inflate the sum of excitement values.


* 
*/
class City {
    String name;
    int excitement;

    City(String name, int excitement) {
        this.name = name;
        this.excitement = excitement;
    }
}

// public class MaximizeExcitementPathinFlightNetwork {
//     public List<String> maxExcitementPath(List<City> cities, List<List<String>> flights) {
//         // Build graph
//         Map<String, City> cityMap = new HashMap<>();
//         // Create a map for O(1) access to a city's excitement given its name.
//         for (City c : cities) {
//             cityMap.put(c.name, c);
//            // System.out.println("Mapped city: " + c.name);
//         }
//         System.out.println("cityMap: " + cityMap);
//         Map<String, Set<String>> adj = new HashMap<>();
//         for (City c : cities) {
//             adj.put(c.name, new HashSet<>());
//         }
//         // Build an undirected graph:
//         // Each city maps to a set of connected cities (neighbors).
//         // Add edges both ways since flights are bidirectional.
//         for (List<String> f : flights) {
//             adj.get(f.get(0)).add(f.get(1));
//             adj.get(f.get(1)).add(f.get(0));
//            // System.out.println("Flight added between: " + f.get(0) + " <-> " + f.get(1));
//         }
//         //System.out.println("adj: " + adj);
//         // For each city:
//         // Use a max-heap (priority queue) to get neighbors sorted by excitement.
//         // Store up to 3 (K = 3) neighbors with highest excitement for quick lookup
//         // later.
//         // This optimization reduces the number of combinations to try.
//         // For each city, precompute up to K (e.g., 3) best neighbors by excitement
//         int K = 3;
//         Map<String, List<String>> bestNeighbours = new HashMap<>();
//         //System.out.println("Precomputing best neighbors for each city...");
//         for (City c : cities) {
//             PriorityQueue<City> pq = new PriorityQueue<>((a, b) -> b.excitement - a.excitement);
//             for (String nb : adj.get(c.name)) {
//                 pq.add(cityMap.get(nb));
//             }
//             // ==========to be deleted.added for logs=============
//             // PriorityQueue<City> copy = new PriorityQueue<>(pq);
//             // System.out.print("Priority Queue for city " + c.name + ": ");
//             // while (!copy.isEmpty()) {
//             //     City city = copy.poll();
//             //     System.out.print(city.name + "(" + city.excitement + ") ");
//             // }
//             // System.out.println();
//              // ==========to be deleted.added for logs=============
//             List<String> best = new ArrayList<>();
//             for (int i = 0; i < K && !pq.isEmpty(); i++) {
//                 City top = pq.poll();
//                 best.add(top.name);
//                 // System.out.println("City " + c.name + " best neighbor candidate: " + top.name + " (excitement: "
//                 //         + top.excitement + ")");
//             }
//             bestNeighbours.put(c.name, best);
//             //System.out.println("City " + c.name + " top " + best.size() + " neighbors: " + best);
//         }
        

//         // Try all possible paths B-C, and for each, try best neighbors for A and D
//         int maxSum = -1;
//         List<String> answer = new ArrayList<>();
//         /*
//          * Iterate over all edges B-C.
//          * For each edge:
//          * Try to prepend a city A connected to B.
//          * Try to append a city D connected to C.
//          * Check uniqueness to avoid city repetition.
//          * Keep track of the maximum excitement sum found and record the path.
//          * 
//          */
//         System.out.println("Searching for max excitement path A->B->C->D ...");
//         System.out.println("cities " + cities);
//         System.out.println("bestNeighbours " + bestNeighbours);
//         System.out.println("adj " + adj);
//         for (City b : cities) {
//             Set<String> bNeighbors = adj.get(b.name);
//             System.out.println("Considering city B: " + b.name + " with neighbors: " + bNeighbors);
//             for (String cName : bNeighbors) {
//                // System.out.println("for loop 2 city B: " + b.name + " with cName: " + cName + " comparison ->"+b.name.compareTo(cName));
//                 //is used to avoid double counting the undirected edge between cities B and C during the iteration.
//                 //b.name.compareTo(cName) lexicographically compares the 
//                 //two city names as strings.
//                 // If the result is >= 0, that means either b.name 
//                 //is equal to cName, or b.name comes after cName alphabetically.
//                 // So this condition skips processing if B's name 
//                 //is not lexicographically less than C's name.
//                 if (b.name.compareTo(cName) >= 0) {
//                     continue;
//                 }

//                 City c = cityMap.get(cName);
//                 System.out.println(" Considering edge B-C: " + b.name + " - " + cName + " =best=" +bestNeighbours.get(b.name));
//                 // For B, try best neighbors for A (excluding B and C)
//                 for (String aName : bestNeighbours.get(b.name)) {
//                     //is used to ensure that the city chosen as A is distinct from cities B and C in the path A -> B -> C -> D.
//                     if (aName.equals(b.name) || aName.equals(cName)) {
//                         System.out.println("  Skipping A: " + aName + " as it conflicts with "+ b.name + "==OR== "+cName);
//                         continue;
//                     }
//                     // For C, try best neighbors for D (excluding A, B, C)
//                     for (String dName : bestNeighbours.get(c.name)) {
//                         //is used to ensure that the city chosen as D is distinct 
//                         //from the other cities A, B, and C in the path A -> B -> C -> D.
//                         //The algorithm is trying to find a path with 4 unique 
//                         //cities linked as A -> B -> C -> D.
//                         //After picking cities A, B, and C, the city D 
//                         //must be different from all three.
//                         //This condition checks if the candidate dName city is equal 
//                         //to any of the already chosen cities (aName, b.name, or cName).
                        
//                         if (dName.equals(aName) || dName.equals(b.name) || dName.equals(cName)) {
//                             System.out.println("   Skipping D: " + dName + " due to conflict with "+aName + " bname "+b.name + " cName "+cName);
//                             continue;
//                         }
//                         int sum = cityMap.get(aName).excitement + b.excitement + c.excitement
//                                 + cityMap.get(dName).excitement;
//                         System.out.println("   Found path: " + aName + "->" + b.name + "->" + cName + "->" + dName
//                                 + " with excitement sum: " + sum);

//                         if (sum > maxSum) {
//                             maxSum = sum;
//                             answer = Arrays.asList(aName, b.name, cName, dName);
//                             System.out.println("    New max sum: " + maxSum + " with path: " + answer);
//                         }
//                     }
//                 }
//             }
//         } // end of outer for
//         return answer;
//     }

//     public static void main(String[] args) {
//         List<City> cities = Arrays.asList(
//                 new City("New York", 10000),
//                 new City("San Francisco", 1000),
//                 new City("Texas", 500),
//                 new City("LA", 20000),
//                 new City("Chicago", 3000),
//                 new City("San Jose", 900));

//         List<List<String>> flights = Arrays.asList(
//                 Arrays.asList("New York", "San Francisco"),
//                 Arrays.asList("New York", "LA"),
//                 Arrays.asList("Chicago", "LA"),
//                 Arrays.asList("San Jose", "San Francisco"));

//         MaximizeExcitementPathinFlightNetwork sol = new MaximizeExcitementPathinFlightNetwork();
//         List<String> res = sol.maxExcitementPath(cities, flights);
//         System.out.println(String.join("->", res));
//     }
// }



public class MaximizeExcitementPathinFlightNetwork {
    static int maxSum = -1;
    static List<String> bestPath = new ArrayList<>();

    public static List<String> findMaxExcitementPath(
            List<City> cities, List<List<String>> flights, int k) {

        // Build maps
        Map<String, City> cityMap = new HashMap<>();
        for (City c : cities) cityMap.put(c.name, c);

        Map<String, Set<String>> adj = new HashMap<>();
        for (City c : cities) adj.put(c.name, new HashSet<>());

        for (List<String> flight : flights) {
            adj.get(flight.get(0)).add(flight.get(1));
            adj.get(flight.get(1)).add(flight.get(0));
        }
        System.out.println("Starting DFS for max excitement path of length " + k);
        // Try each city as starting point
        for (City start : cities) {
            System.out.println("Starting DFS from city: " + start.name);
            Set<String> visited = new HashSet<>();
            List<String> path = new ArrayList<>();
            dfs(start.name, adj, cityMap, visited, path, 0, k);
        }
        System.out.println("DFS complete.");
        System.out.println("Max excitement sum found: " + maxSum);
        System.out.println("Best path: " + bestPath);
        return bestPath;
    }

    private static void dfs(String current, Map<String, Set<String>> adj,
                            Map<String, City> cityMap, Set<String> visited,
                            List<String> path, int sum, int k) {

        visited.add(current);
        path.add(current);
        sum += cityMap.get(current).excitement;
        System.out.println("Visiting city: " + current + ", path so far: " + path + ", current sum: " + sum);
        if (path.size() == k) {
            if (sum > maxSum) {
                maxSum = sum;
                bestPath = new ArrayList<>(path);
                System.out.println(">> New max sum = " + maxSum + " with path: " + bestPath);
            }
        } else {
            for (String neighbor : adj.get(current)) {
                if (!visited.contains(neighbor)) {
                    dfs(neighbor, adj, cityMap, visited, path, sum, k);
                }
                else {
                    System.out.println("Skipping neighbor " + neighbor + " as it is already visited");
                }
            }
        }

        // backtrack
        System.out.println("Backtracking from city: " + current + ", removing it from path and visited");
        visited.remove(current);
        path.remove(path.size() - 1);
    }

    // Example usage
    public static void main(String[] args) {
        List<City> cities = Arrays.asList(
                new City("New York", 10000),
                new City("San Francisco", 1000),
                new City("Texas", 500),
                new City("LA", 20000),
                new City("Chicago", 3000),
                new City("San Jose", 900)
        );

        List<List<String>> flights = Arrays.asList(
                Arrays.asList("New York", "San Francisco"),
                Arrays.asList("New York", "LA"),
                Arrays.asList("Chicago", "LA"),
                Arrays.asList("San Jose", "San Francisco")
        );

        int k = 4; // path of 4 cities
        List<String> result = findMaxExcitementPath(cities, flights, k);
        System.out.println(String.join(" -> ", result));
    }
}
