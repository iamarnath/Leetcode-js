/*
743. Network Delay Time

You are given a network of n directed nodes, labeled from 1 to n.
 You are also given times, a list of directed edges where
  times[i] = (ui, vi, ti).

ui is the source node (an integer from 1 to n)
vi is the target node (an integer from 1 to n)
ti is the time it takes for a signal to travel from the
 source to the target node (an integer greater than or equal to 0).
You are also given an integer k, representing the node
 that we will send a signal from.

Return the minimum time it takes for all of the n nodes
 to receive the signal. If it is impossible for all the
  nodes to receive the signal, return -1 instead.

Example 1:

Input: times = [[1,2,1],[2,3,1],[1,4,4],[3,4,1]], n = 4, k = 1

Output: 3
Example 2:

Input: times = [[1,2,1],[2,3,1]], n = 3, k = 2

Output: -1
Constraints:

1 <= k <= n <= 100
1 <= times.length <= 1000


*/

function networkDelayTime(times, n, k) {
  // 1. Build adjacency list
  const adj = new Array(n + 1).fill().map(() => []);
  for (const [u, v, w] of times) {
    adj[u].push([v, w]);
  }
  // 2. Initialize distance array with Infinity
  const dist = new Array(n + 1).fill(Infinity);
  dist[k] = 0;
  // 3. Priority queue (min-heap simulation)
  const pq = [[0, k]];

  while (pq.length > 0) {
    // Sort to maintain priority order (O(n log n) - main bottleneck)
    pq.sort((a, b) => a[0] - b[0]);
    const [d, node] = pq.shift();
    // 4. Process neighbors
    for (const [neighbor, weight] of adj[node]) {
      const newDist = d + weight;
      if (newDist < dist[neighbor]) {
        dist[neighbor] = newDist;
        pq.push([newDist, neighbor]);
      } // end of if
    } // end of for
  } // end of while
  // 5. Find maximum time
  let maxTime = -Infinity;
  for (let i = 1; i <= n; i++) {
    if (dist[i] === Infinity) {
      return -1
    };
    maxTime = Math.max(maxTime, dist[i]);
  }
  return maxTime;
}

//let times = [[1, 2, 1], [2, 3, 1], [1, 4, 4], [3, 4, 1]], n = 4, k = 1;

let times = [[1, 2, 1], [2, 3, 1]], n = 3, k = 2;

let res = networkDelayTime(times, n, k);

console.log("networkDelayTime==", res)