/*
1851. Minimum Interval to Include Each Query

You are given a 2D integer array intervals,
 where intervals[i] = [lefti, righti] describes the 
 ith interval starting at lefti and ending at 
 righti (inclusive). The size of an interval is
  defined as the number of integers it contains, 
  or more formally righti - lefti + 1.

You are also given an integer array queries.
 The answer to the jth query is the size of the 
 smallest interval i such that 
 lefti <= queries[j] <= righti. 
 If no such interval exists, the answer is -1.

Return an array containing the answers to the queries.

 

Example 1:

Input: intervals = [[1,4],[2,4],[3,6],[4,4]], queries = [2,3,4,5]
Output: [3,3,1,4]
Explanation: The queries are processed as follows:
- Query = 2: The interval [2,4] is the smallest interval containing 2. 
The answer is 4 - 2 + 1 = 3.
- Query = 3: The interval [2,4] is the smallest interval containing 3.
 The answer is 4 - 2 + 1 = 3.
- Query = 4: The interval [4,4] is the smallest interval containing 4.
 The answer is 4 - 4 + 1 = 1.
- Query = 5: The interval [3,6] is the smallest interval containing 5.
 The answer is 6 - 3 + 1 = 4.
Example 2:

Input: intervals = [[2,3],[2,5],[1,8],[20,25]], queries = [2,19,5,22]
Output: [2,-1,4,6]
Explanation: The queries are processed as follows:
- Query = 2: The interval [2,3] is the smallest interval 
containing 2. The answer is 3 - 2 + 1 = 2.
- Query = 19: None of the intervals contain 19.
 The answer is -1.
- Query = 5: The interval [2,5] is the smallest
 interval containing 5. The answer is 5 - 2 + 1 = 4.
- Query = 22: The interval [20,25] is the 
smallest interval containing 22. The answer is 25 - 20 + 1 = 6.
 

Constraints:

1 <= intervals.length <= 105
1 <= queries.length <= 105
intervals[i].length == 2
1 <= lefti <= righti <= 107
1 <= queries[j] <= 107

*/
class MinHeap {
    constructor(compare) {
        this.heap = [];
        this.compare = compare;
    }
    push(item) {
        this.heap.push(item);
        this._bubbleUp();
    }
    pop() {
        const ret = this.heap[0];
        const last = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this._sinkDown();
        }
        return ret;
    }
    peek() {
        return this.heap[0];
    }
    size() {
        return this.heap.length;
    }
    _bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.compare(this.heap[index], this.heap[parentIndex]) >= 0) break;
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }
    _sinkDown() {
        let index = 0;
        const length = this.heap.length;
        while (true) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let swapIndex = null;
            if (leftChildIndex < length && this.compare(this.heap[leftChildIndex], this.heap[index]) < 0) {
                swapIndex = leftChildIndex;
            }
            if (rightChildIndex < length && this.compare(this.heap[rightChildIndex], this.heap[index]) < 0) {
                if (swapIndex === null || this.compare(this.heap[rightChildIndex], this.heap[leftChildIndex]) < 0) {
                    swapIndex = rightChildIndex;
                }
            }
            if (swapIndex === null) break;
            [this.heap[index], this.heap[swapIndex]] = [this.heap[swapIndex], this.heap[index]];
            index = swapIndex;
        }
    }
}
/*
var minInterval = function(intervals, queries) {
    const n = queries.length;
    const result = new Array(n).fill(0);
    const queryIndices = Array.from({length: n}, (_, i) => i);

    intervals.sort((a, b) => a[0] - b[0]);
    queryIndices.sort((a, b) => queries[a] - queries[b]);

    const heap = new MinHeap((a, b) => (a[1] - a[0]) - (b[1] - b[0]));
    let intervalIndex = 0;

    for (let i = 0; i < n; i++) {
        const query = queries[queryIndices[i]];

        while (intervalIndex < intervals.length && intervals[intervalIndex][0] <= query) {
            const [left, right] = intervals[intervalIndex];
            if (right >= query) {
                heap.push([left, right]);
            }
            intervalIndex++;
        }

        while (heap.size() > 0 && heap.peek()[1] < query) {
            heap.pop();
        }

        if (heap.size() === 0) {
            result[queryIndices[i]] = -1;
        } else {
            const [left, right] = heap.peek();
            result[queryIndices[i]] = right - left + 1;
        }
    }

    return result;
}
*/
/*
Time Complexity
Sorting intervals: O(n log n)

Sorting queries: O(q log q)

Processing each query and interval:

Each interval is added to the heap at most once and removed at most once.

Heap operations (push/pop) are O(log n) per operation.

In the worst case, you perform O(n) heap operations.

Total heap operations: O(n log n)

Overall time complexity:

O(n log n + q log q) (for sorting and heap operations)

Space Complexity
Result array: O(q)

Heap: O(n) in the worst case (all intervals could be in the heap at once)

Sorted queries array: O(q)

Total space complexity:

O(n + q)

Summary Table
Step	                     Time Complexity	         Space Complexity
Sort intervals	                   O(n log n)	          O(1)
Sort queries	                   O(q log q)	          O(q)
Process intervals/queries	       O(n log n + q log q)	  O(n + q)
Total	                           O(n log n + q log q)	  O(n + q)

*/

var minInterval = function (intervals, queries) {
    //Sorts the input intervals in ascending order based on their start value. This allows efficient processing of intervals as we process queries in order.
    intervals.sort((a, b) => a[0] - b[0]);
    //Creates an array where each element is a pair: [query_value, original_index]. This array is then sorted by the query value so that queries are processed in ascending order. This enables us to process the intervals and queries in parallel.
    const sortedQueries = queries.map((q, i) => [q, i])
    .sort((a, b) => a[0] - b[0]);
    // Initialize result array with -1 (default if no interval contains a query)
    const result = new Array(queries.length).fill(-1);
    //Creates a min-heap that will store intervals as [size, end] pairs. The heap is sorted by interval size (smallest at the top).
    const heap = new MinHeap((a, b) => a[0] - b[0]);
    //Initializes a pointer to keep track of which intervals have been processed.   
    let i = 0;
    //Iterates over each query, processing them in order of their value.
    
    for (const [q, idx] of sortedQueries) {
        //Adds all intervals that start before or at the current query value to the heap, but only if the interval also ends at or after the query value. This ensures only intervals that could contain the query are considered.
        while (i < intervals.length && intervals[i][0] <= q) {
            const [l, r] = intervals[i];
            if (r >= q) {
                heap.push([r - l + 1, r]);
            }
            i++;
        }
        //Removes any intervals from the heap that end before the current query value, as they cannot contain the query.
        while (heap.size() > 0 && heap.peek()[1] < q) {
            heap.pop();
        }
        //If there are intervals left in the heap, the smallest one is at the top. Its size is recorded as the answer for the current query.
        if (heap.size() > 0) {
            result[idx] = heap.peek()[0];
        }
    }
    //Returns the result array, which contains the size of the smallest interval containing each query, or -1 if no such interval exists.
    return result;
}

//let intervals = [[1, 4], [2, 4], [3, 6], [4, 4]], queries = [2, 3, 4, 5];
let intervals = [[2,3],[2,5],[1,8],[20,25]];
let queries = [2,19,5,22];
let res = minInterval(intervals,queries);
console.log("min interval ==",res);