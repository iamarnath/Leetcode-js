/*
787. Cheapest Flights Within K Stops

Description
There are n airports, labeled from 0 to n - 1, 
which are connected by some flights. You are given
 an array flights where flights[i] = [from_i, to_i, price_i] 
 represents a one-way flight from airport from_i to airport to_i 
 with cost price_i. You may assume there are no duplicate 
 flights and no flights from an airport to itself.

You are also given three integers src, dst, and k where:

src is the starting airport
dst is the destination airport
src != dst
k is the maximum number of stops you can make (not including src and dst)
Return the cheapest price from src to dst with
 at most k stops, or return -1 if it is impossible.

Example 1:

Input: n = 4, flights = [[0,1,200],[1,2,100],[1,3,300],[2,3,100]],
 src = 0, dst = 3, k = 1

Output: 500
Explanation:
The optimal path with at most 1 stop from airport 0 to 3
 is shown in red, with total cost 200 + 300 = 500.
Note that the path [0 -> 1 -> 2 -> 3] costs only 400,
 and thus is cheaper, but it requires 2 stops, which is more than k.

Example 2:

Input: n = 3, flights = [[1,0,100],[1,2,200],[0,2,100]], 
src = 1, dst = 2, k = 1

Output: 200
Explanation:
The optimal path with at most 1 stop from airport 1 to 2
 is shown in red and has cost 200.

Constraints:

1 <= n <= 100
fromi != toi
1 <= pricei <= 1000
0 <= src, dst, k < n
*/

/*
Explanation of the Code
Initialization:

distance array stores the minimum cost to reach each city 
from the source. It is initialized with Infinity 
 except for the source city, which is set to 0.

adj is an adjacency list represented as a map,
 where each key is a city and the value is a list of
  pairs [neighbor, cost] representing direct flights from that city.

Building the Graph:

The input flights is a list of edges [u, v, cost].

For each flight, the adjacency list entry for 
u is updated by adding [v, cost].

BFS with Level Control (Stops):

A queue is used to perform BFS starting from the source city.

Each queue element is a pair [currentCity, currentCost].

The algorithm explores all reachable cities layer 
by layer, where each layer corresponds to one additional stop.

The variable level tracks how many stops have been used so far.

For each city u dequeued, the algorithm checks all its neighbors v.

If the cost to reach v through u is cheaper than
 the previously recorded cost (distance[v]),
  update distance[v] and enqueue [v, newCost].

BFS continues until either the queue is empty or the number of stops exceeds k.

Result:

After BFS completes, if distance[dst] is still Infinity, 
it means the destination is not reachable within k stops, so return -1.

Otherwise, return the minimum cost stored in distance[dst].

Time Complexity
Let 
n be the number of cities, and 

E be the number of flights.

In the worst case, the BFS could explore each edge multiple times up to 
k+1 levels.

Each edge can be relaxed at most once per level, 
so the worst-case complexity is approximately:

O(k×E)
Since 
k≤n typically, this is often written as 

O(kE).

Space Complexity
The adjacency list adj stores all edges: 

O(E).

The distance array stores one value per city: 
O(n).

The queue can hold up to 

O(n) elements in the worst case.

Overall space complexity is:

O(n+E)

*/
var findCheapestPrice = function (n, flights, src, dst, k) {
    const distance = new Array(n).fill(Infinity);
    // Build adjacency list: node -> list of [neighbor, cost]
    const adj = new Map();

    for (const flight of flights) {
        const [u, v, cost] = flight;
        if (!adj.has(u)) {
            adj.set(u, []);
        }
        adj.get(u).push([v, cost]);
    }

    // Queue stores pairs: [node, currentCost]
    const queue = [];
    queue.push([src, 0]);
    distance[src] = 0;
    let level = 0;
    while (queue.length > 0 && level <= k) {
        const size = queue.length;
        for (let i = 0; i < size; i++) {
            const [u, d] = queue.shift();// here u is node and d is cost
            if (!adj.has(u)) continue;

            for (const [v, cost] of adj.get(u)) {
                if (distance[v] > d + cost) {
                    distance[v] = d + cost;
                    queue.push([v, d + cost]);
                }
            }
        }
        level++;
    }
    return distance[dst] === Infinity ? -1 : distance[dst];
};

let n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1;

let res = findCheapestPrice(n, flights, src, dst, k);

console.log(res)