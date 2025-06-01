/*
1584. Min Cost to Connect All Points

Description
You are given a 2-D integer array points,
 where points[i] = [xi, yi]. Each points[i] 
 represents a distinct point on a 2-D plane.

The cost of connecting two points [xi, yi] 
and [xj, yj] is the manhattan distance between 
the two points, i.e. |xi - xj| + |yi - yj|.

Return the minimum cost to connect all points
 together, such that there exists exactly one 
 path between each pair of points.

Example 1:

Input: points = [[0,0],[2,2],[3,3],[2,4],[4,2]]

Output: 10
Constraints:

1 <= points.length <= 1000
-1000 <= xi, yi <= 1000
*/
class MinHeap {
    constructor() {
        this.heap = [];
    }

    // Insert an element [weight, vertex]
    push(val) {
        this.heap.push(val);
        this.bubbleUp(this.heap.length - 1);
    }

    // Remove and return the smallest element
    pop() {
        if (this.heap.length === 1) return this.heap.pop();
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown(0);
        return min;
    }

    top() {
        return this.heap[0];
    }

    size() {
        return this.heap.length;
    }

    bubbleUp(index) {
        while (index > 0) {
            let parent = Math.floor((index - 1) / 2);
            if (this.heap[parent][0] <= this.heap[index][0]) break;
            [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
            index = parent;
        }
    }

    bubbleDown(index) {
        let length = this.heap.length;
        while (true) {
            let left = 2 * index + 1;
            let right = 2 * index + 2;
            let smallest = index;

            if (left < length && this.heap[left][0] < this.heap[smallest][0]) smallest = left;
            if (right < length && this.heap[right][0] < this.heap[smallest][0]) smallest = right;

            if (smallest === index) break;

            [this.heap[smallest], this.heap[index]] = [this.heap[index], this.heap[smallest]];
            index = smallest;
        }
    }
}
/*
Key Points:

The graph is represented as an adjacency list: for
 each vertex, we store a list of pairs [neighbor, weight].

A min-heap (priority queue) is used to efficiently
 get the next edge with the smallest weight.

We maintain a boolean array inMST to track which
 vertices are already included.

Initially, we push the starting vertex (vertex 0) 
with weight 0 into the min-heap.

At each step, we pop the smallest edge from the heap, 
add its weight if the vertex is not yet in MST, and 
push all edges from this new vertex to the heap if 
the neighbor is not yet in MST.

How it works in code:

minMST(adj, V) runs Prim’s algorithm on the adjacency list.

minCostConnectPoints(points) builds the graph by calculating
 Manhattan distances between all pairs of points and calls minMST.

*/
/*
Time Complexity

Adjacency List + Min-Heap	
- Building adjacency list: 
O(V ^2) since all pairs of points are connected.
- Each edge is pushed/popped in the priority queue.
- Priority queue operations take 
O(logE) time.
- For a complete graph, 
E=O(V^2).
- So, total TIME complexity is 
O(V^2 * logV)

Space Complexity
- Adjacency list stores all edges: 
O(V ^2) for a complete graph.
- Min-heap stores edges: up to 
O(E).
- Additional arrays: 
O(V).

Overall - O(V ^ 2)

*/
function Prim(adj, V) {
    const pq = new MinHeap();
    pq.push([0, 0]);// [weight, vertex]
    const inMST = new Array(V).fill(false);
    let sum = 0;
    while (pq.size() > 0) {
        const [wt, node] = pq.pop();
        if (inMST[node]) continue;
        inMST[node] = true;
        sum += wt;
        for (const [neighbor, neighbor_wt] of adj[node]) {
            if (!inMST[neighbor]) {
                pq.push([neighbor_wt, neighbor])
            }
        }
    }
    return sum;
}

function minCostConnectPointsPrim(points) {
    const V = points.length;
    const adj = Array.from({ length: V }, () => []);
    for (let i = 0; i < V; i++) {
        for (let j = i + 1; j < V; j++) {
            const d = Math.abs(points[i][0] - points[j][0]) +
                Math.abs(points[i][1] - points[j][1]);
            adj[i].push([j, d]);
            adj[j].push([i, d]);
        }
    }
    return Prim(adj, V)
}

let points = [[0,0],[2,2],[3,3],[2,4],[4,2]];

let primres = minCostConnectPointsPrim(points);
console.log("prim==",primres);


class UnionFind {
    constructor(n) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.rank = new Array(n).fill(0);
    }

    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]); // Path compression
        }
        return this.parent[x];
    }

    union(x, y) {
        let rootX = this.find(x);
        let rootY = this.find(y);

        if (rootX === rootY) return false;

        if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
        } else if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
        } else {
            this.parent[rootX] = rootY;
            this.rank[rootY]++;
        }

        return true;
    }
}

function minCostConnectPoints(points) {
    const n = points.length;
    const edges = [];

    // Step 1: Create all possible edges with their Manhattan distances
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const dist = Math.abs(points[i][0] - points[j][0]) + Math.abs(points[i][1] - points[j][1]);
            edges.push([i, j, dist]);
        }
    }

    // Step 2: Sort edges by weight (distance)
    edges.sort((a, b) => a[2] - b[2]);

    // Step 3: Kruskal's algorithm to find MST
    const uf = new UnionFind(n);
    let cost = 0;

    for (const [u, v, wt] of edges) {
        if (uf.union(u, v)) {
            cost += wt;
        }
    }

    return cost;
}

points = [[0,0],[2,2],[3,10],[5,2],[7,0]];

console.log("Kruskal==",minCostConnectPoints(points))