/*
1383. Maximum Performance of a Team

You are given two integers n and k and two integer arrays speed and efficiency both of length n. There are n engineers numbered from 1 to n. speed[i] and efficiency[i] represent the speed and efficiency of the ith engineer respectively.

Choose at most k different engineers out of the n engineers to form a team with the maximum performance.

The performance of a team is the sum of its engineers' speeds multiplied by the minimum efficiency among its engineers.

Return the maximum performance of this team. Since the answer can be a huge number, return it modulo 109 + 7.

 

Example 1:

Input: n = 6, speed = [2,10,3,1,5,8], efficiency = [5,4,3,9,7,2], k = 2
Output: 60
Explanation: 
We have the maximum performance of the team by selecting engineer 2 (with speed=10 and efficiency=4) and engineer 5 (with speed=5 and efficiency=7). That is, performance = (10 + 5) * min(4, 7) = 60.
Example 2:

Input: n = 6, speed = [2,10,3,1,5,8], efficiency = [5,4,3,9,7,2], k = 3
Output: 68
Explanation:
This is the same example as the first but k = 3. We can select engineer 1, engineer 2 and engineer 5 to get the maximum performance of the team. That is, performance = (2 + 10 + 5) * min(5, 4, 7) = 68.
Example 3:

Input: n = 6, speed = [2,10,3,1,5,8], efficiency = [5,4,3,9,7,2], k = 4
Output: 72
 

Constraints:

1 <= k <= n <= 105
speed.length == n
efficiency.length == n
1 <= speed[i] <= 105

*/

/**
 * @param {number} n
 * @param {number[]} speed
 * @param {number[]} efficiency
 * @param {number} k
 * @return {number}
 */
 /*

var maxPerformance = function(n, speed, efficiency, k) {
    let v = [];
    for (let i = 0; i < n; i++) {
        v.push([efficiency[i], speed[i]]);
    }
    
    // Sort by efficiency ascending
    v.sort((a, b) => a[0] - b[0]);
    
    // Min-heap for speeds (using array + sort for simplicity)
    let pq = [];
    let sum = 0n;
    let ans = 0n;
    const MOD = 1000000007n;
    
    for (let i = n - 1; i >= 0; i--) {
        sum += BigInt(v[i][1]);
        pq.push(v[i][1]);
        pq.sort((a, b) => a - b); // maintain as min-heap
        
        if (pq.length > k) {
            sum -= BigInt(pq.shift()); // remove smallest speed
        }
        
        ans = ans > sum * BigInt(v[i][0]) ? ans : sum * BigInt(v[i][0]);
    }
    
    return Number(ans % MOD);
}
*/
/*
Line-by-Line Explanation
Let's break down the optimized JavaScript code (with MinHeap) for maxPerformance:

1. MinHeap Class:
Implements a min-heap data structure to efficiently keep track of the lowest speed value, so popping the smallest is fast ($O(\log k)$).

push(val): Adds an element and maintains the heap order.

pop(): Removes and returns the smallest element from the heap.

_bubbleUp: Maintains heap property after insertion.

_bubbleDown: Maintains heap property after removal.

size(): Returns the current heap size.

2. Constructing Efficiency/Speed Pairs
javascript
let v = [];
for (let i = 0; i < n; i++) {
    v.push([efficiency[i], speed[i]]);
}
Pairs each worker's efficiency and speed for sorting and processing.

3. Sort by Efficiency
javascript
v.sort((a, b) => a[0] - b[0]);
Sorts the pairs by efficiency in ascending order (lowest efficiency first).

This lets us process workers from highest efficiency last, which is key to the algorithm's logic:

At each step, efficiency acts as the bottleneck for current team.

4. Main Loop (from last worker back)
javascript
let heap = new MinHeap();
let sum = 0n, ans = 0n;
const MOD = 1000000007n;
for (let i = n - 1; i >= 0; i--) {
    sum += BigInt(v[i][1]);
    heap.push(v[i][1]);
    if (heap.size() > k) {
        sum -= BigInt(heap.pop());
    }
    let perf = sum * BigInt(v[i][0]);
    if (perf > ans) ans = perf;
}
Iterate from last to first sorted worker: processed in decreasing efficiency.

Add this worker's speed to team sum.

Add worker's speed to the heap (min-heap keeps lowest speed at top).

If the heap exceeds k elements, pop the smallest speed (keeps team size ≤ k, and drops slowest worker).

Calculate current team performance: sum of speeds × current minimum efficiency (perf = sum * v[i][0]).

Track maximum seen so far with ans = max(ans, perf).

5. Return modulo $10^9 + 7$
javascript
return Number(ans % MOD);
Large numbers: returns the answer modulo $10^9 + 7$ as per problem requirements for safe integer handling.

Why This Works
Only the k highest speeds are ever kept in the heap — extra (slowest) ones are removed, maximizing speed sum.

At each step, the minimum efficiency becomes the limiting factor (so process higher efficiency last).

Ensures that any possible team composition is considered, maximizing the team performance.

Complexity Analysis
Time Complexity
Sorting all workers: $O(n \log n)$

Iterating through workers:

Each push and pop to heap: $O(\log k)$

$n$ workers: $O(n \log k)$

Total: $O(n \log n + n \log k)$ — dominated by sorting step for large $n$.

Space Complexity
Storage for workers: $O(n)$

Min-heap stores up to $k$ speeds: $O(k)$

Total: $O(n + k)$


*/
class MinHeap {
    constructor() {
        this.data = [];
    }
    push(val) {
        this.data.push(val);
        this._bubbleUp();
    }
    pop() {
        if (this.data.length === 1) return this.data.pop();
        const top = this.data[0];
        this.data[0] = this.data.pop();
        this._bubbleDown();
        return top;
    }
    _bubbleUp() {
        let idx = this.data.length - 1;
        while (idx > 0) {
            let parent = Math.floor((idx - 1) / 2);
            if (this.data[parent] <= this.data[idx]) break;
            [this.data[parent], this.data[idx]] = [this.data[idx], this.data[parent]];
            idx = parent;
        }
    }
    _bubbleDown() {
        let idx = 0;
        while (true) {
            let left = 2 * idx + 1;
            let right = 2 * idx + 2;
            let smallest = idx;

            if (left < this.data.length && this.data[left] < this.data[smallest])
                smallest = left;
            if (right < this.data.length && this.data[right] < this.data[smallest])
                smallest = right;

            if (smallest === idx) break;

            [this.data[smallest], this.data[idx]] = [this.data[idx], this.data[smallest]];
            idx = smallest;
        }
    }
    size() {
        return this.data.length;
    }
}

var maxPerformance = function(n, speed, efficiency, k) {
    let v = [];
    for (let i = 0; i < n; i++) {
        v.push([efficiency[i], speed[i]]);
    }
    v.sort((a, b) => a[0] - b[0]);

    let heap = new MinHeap();
    let sum = 0n, ans = 0n;
    const MOD = 1000000007n;

    for (let i = n - 1; i >= 0; i--) {
        sum += BigInt(v[i][1]);
        heap.push(v[i][1]);
        if (heap.size() > k) {
            sum -= BigInt(heap.pop());
        }
        let perf = sum * BigInt(v[i][0]);
        if (perf > ans) ans = perf;
    }
    return Number(ans % MOD);
}

