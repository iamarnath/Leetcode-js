/*
2406. Divide Intervals Into Minimum Number of Groups
You are given a 2D integer array intervals where
 intervals[i] = [lefti, righti] represents the 
 inclusive interval [lefti, righti].

You have to divide the intervals into one or more 
groups such that each interval is in exactly one 
group, and no two intervals that are in the same group intersect each other.

Return the minimum number of groups you need to make.

Two intervals intersect if there is at least one
 common number between them. For example, the intervals [1, 5] and [5, 8] intersect.

 

Example 1:

Input: intervals = [[5,10],[6,8],[1,5],[2,3],[1,10]]
Output: 3
Explanation: We can divide the intervals into the following groups:
- Group 1: [1, 5], [6, 8].
- Group 2: [2, 3], [5, 10].
- Group 3: [1, 10].
It can be proven that it is not possible to divide the
 intervals into fewer than 3 groups.
Example 2:

Input: intervals = [[1,3],[5,6],[8,10],[11,13]]
Output: 1
Explanation: None of the intervals overlap, 
so we can put all of them in one group.
 
Constraints:

1 <= intervals.length <= 105
intervals[i].length == 2
1 <= lefti <= righti <= 106

*/
class MinHeapNew {
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
var minGroups = function(intervals) {
       // Sort intervals by their start time
    intervals.sort((a, b) => a[0] - b[0]);
    
    // MinHeap to store end times of currently active groups
    const minHeap = new MinHeapNew((a, b) => a - b);
    
    for (const [start, end] of intervals) {
        // Reuse a group if the earliest ending group has finished
        if (minHeap.size() > 0 && minHeap.peek() < start) {
            minHeap.pop();
        }
        minHeap.push(end);
    }
    return minHeap.size();
}

let intervals = [[5,10],[6,8],[1,5],[2,3],[1,10]];

let res = minGroups(intervals);

console.log(res);