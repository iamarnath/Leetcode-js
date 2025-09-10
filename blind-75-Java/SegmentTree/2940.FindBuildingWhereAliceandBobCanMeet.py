'''
2940. Find Building Where Alice and Bob Can Meet

You are given a 0-indexed array heights of positive 
integers, where heights[i] represents 
the height of the ith building.

If a person is in building i, they can move 
to any other building j if and only 
if i < j and heights[i] < heights[j].

You are also given another array queries 
where queries[i] = [ai, bi]. On the ith query, 
Alice is in building ai while Bob is in building bi.

Return an array ans where ans[i] is the 
index of the leftmost building where Alice and Bob 
can meet on the ith query. If Alice and Bob 
cannot move to a common building on query i, set ans[i] to -1.

Example 1:

Input: heights = [6,4,8,5,2,7], queries = [[0,1],[0,3],[2,4],[3,4],[2,2]]
Output: [2,5,-1,5,2]
Explanation: In the first query, Alice and Bob
 can move to building 2 since heights[0] < heights[2] 
 and heights[1] < heights[2]. 
In the second query, Alice and Bob can move 
to building 5 since heights[0] < heights[5] and heights[3] < heights[5]. 
In the third query, Alice cannot meet Bob 
since Alice cannot move to any other building.
In the fourth query, Alice and Bob can move 
to building 5 since heights[3] < heights[5] and heights[4] < heights[5].
In the fifth query, Alice and Bob are 
already in the same building.  
For ans[i] != -1, It can be shown that ans[i] 
is the leftmost building where Alice and Bob can meet.
For ans[i] == -1, It can be shown that there 
is no building where Alice and Bob can meet.
Example 2:

Input: heights = [5,3,8,2,6,1,4,6], queries = [[0,7],[3,5],[5,2],[3,0],[1,6]]
Output: [7,6,-1,4,6]
Explanation: In the first query, Alice 
can directly move to Bob's building since heights[0] < heights[7].
In the second query, Alice and Bob can
 move to building 6 since heights[3] < heights[6] and heights[5] < heights[6].
In the third query, Alice cannot meet 
Bob since Bob cannot move to any other building.
In the fourth query, Alice and Bob can 
move to building 4 since heights[3] < heights[4] and heights[0] < heights[4].
In the fifth query, Alice can directly
 move to Bob's building since heights[1] < heights[6].
For ans[i] != -1, It can be shown that
ans[i] is the leftmost building where Alice and Bob can meet.
For ans[i] == -1, It can be shown that 
there is no building where Alice and Bob can meet.

 

Constraints:

1 <= heights.length <= 5 * 104
1 <= heights[i] <= 109
1 <= queries.length <= 5 * 104
queries[i] = [ai, bi]
0 <= ai, bi <= heights.length - 1

*/
/*
1. Segment Tree Construction
Purpose: Efficiently answer range maximum index queries.

How: The segment tree is built recursively. Each node
 stores the index of the maximum value in its segment of the heights array.

Functions:

buildSegmentTree(i, l, r, segmentTree, heights):

If the segment is a single element, store its index.

Otherwise, recursively build left and right children.

Store the index of the maximum element between left and
 right children at the current node.

constructST(heights, n):

Initializes the segment tree array and calls buildSegmentTree to fill it.

2. Segment Tree Query
Purpose: Find the index of the maximum value in a given range [start, end].

How: The query recursively checks if the current segment is inside, outside, or partially overlaps the query range.

If outside, returns -1.

If inside, returns the stored index.

If partial, queries both children and returns 
the index with the larger value.

Function:

querySegmentTree(start, end, i, l, r, segmentTree, heights):

Recursively finds the index of the maximum
 element in the range [start, end].

RMIQ(st, heights, n, a, b):

Wrapper to perform a range maximum index query.

3. Answering Queries
For each query [a, b]:

If both indices are the same or the right
 is taller, return bob's index.

Otherwise, binary search for the leftmost index 
to the right of bob that is taller than both alice 
and bob, using the segment tree for efficient range maximum queries.

If no such building exists, return -1.

Time Complexity
Operation	                Complexity	        Reason
Building Segment Tree	   O(n)	              Each node is visited once; 
                                             total nodes ≈ 4n.
Single Query	            O(logn)	           Each range query splits into at most O(logn) segments.
Binary Search per Query	    O(log n)^2	       Each binary search step does a O(logn) query, for O(logn) steps.
All Queries	                O(q(log n)^2)	   For q queries.


Space Complexity
Structure	                  Complexity	Reason
Segment Tree	               O(n)	        The segment tree uses about 4n space.
Result Array	               O(q)	        One result per query.
Other Variables	               O(n)	        For input arrays and 
temporary variables.

Summary Table
Step	                    Time Complexity	        Space Complexity
Build Segment Tree	                O(n)	             O(n)
Query (per query)	                O(log n)^2           O(1)
All Queries (total)	                O(q(log n)^2)        O(q)

*/
/*

// Builds the segment tree using the max function and stores indices
function buildSegmentTree(i, l, r, segmentTree, heights) {
Declares a function to build the segment tree.

i is the current index in the segment tree.

l and r are the bounds of the current segment in the heights array.

segmentTree is the array representing the segment tree.

heights is the input array of building heights.


    if (l === r) {
        segmentTree[i] = l; // Store the index
        return;
    }
If the segment is a single element (l == r), store its index at position i in the segment tree and return.


    const mid = l + Math.floor((r - l) / 2);
Calculate the midpoint of the current segment.


    buildSegmentTree(2 * i + 1, l, mid, segmentTree, heights);
    buildSegmentTree(2 * i + 2, mid + 1, r, segmentTree, heights);
Recursively build the left and right children of the current node in the segment tree.


    // Store the index of the maximum element
    segmentTree[i] = (heights[segmentTree[2 * i + 1]] >= heights[segmentTree[2 * i + 2]])
        ? segmentTree[2 * i + 1]
        : segmentTree[2 * i + 2];
}
After building children, store at i the index of the child with the greater height.


// Function to construct the segment tree
function constructST(heights, n) {
    const segmentTree = new Array(4 * n);
    buildSegmentTree(0, 0, n - 1, segmentTree, heights);
    return segmentTree;
}
Initializes a segment tree array of size 4 * n (enough to store all nodes).

Calls buildSegmentTree to fill it.

Returns the segment tree.


// Function to query the segment tree for the index of the maximum value in range [start, end]
function querySegmentTree(start, end, i, l, r, segmentTree, heights) {
Declares a function to query the segment tree for the index of the maximum value in a range [start, end].

i is the current segment tree node.

l and r are the segment bounds in the heights array.


    if (l > end || r < start) {
        return -1; // Out-of-bound queries
    }
If the current segment is completely outside the query range, return -1.


    if (l >= start && r <= end) {
        return segmentTree[i];
    }
If the current segment is completely inside the query range, return the stored index.


    const mid = l + Math.floor((r - l) / 2);
    const leftIndex = querySegmentTree(start, end, 2 * i + 1, l, mid, segmentTree, heights);
    const rightIndex = querySegmentTree(start, end, 2 * i + 2, mid + 1, r, segmentTree, heights);
Otherwise, split the query into left and right children and get their results.


    // Handle cases where one side is out of bounds
    if (leftIndex === -1) return rightIndex;
    if (rightIndex === -1) return leftIndex;
If one side is out of the query range, return the valid side.


    // Return the index of the maximum element
    return (heights[leftIndex] >= heights[rightIndex]) ? leftIndex : rightIndex;
}
Otherwise, return the index with the greater height.


// Function to return the index of the maximum element in the range from a to b
function RMIQ(st, heights, n, a, b) {
    return querySegmentTree(a, b, 0, 0, n - 1, st, heights);
}
Wrapper function to simplify querying the segment tree for the range [a, b].


function leftmostBuildingQueries(heights, queries) {
    const n = heights.length;
    const segmentTree = constructST(heights, n);
    const result = [];
Main function to answer all queries.

Gets the number of buildings n.

Builds the segment tree.

Initializes the result array.


    for (const query of queries) {
        const alice = Math.min(query[0], query[1]);
        const bob = Math.max(query[0], query[1]);
For each query, determine the smaller and larger index between Alice and Bob.


        if (alice === bob || heights[bob] > heights[alice]) {
            result.push(bob);
            continue;
        }
If Alice and Bob are the same, or Bob is taller, answer is Bob.


        let l = bob + 1;
        let r = n - 1;
        let result_idx = Number.MAX_SAFE_INTEGER;
        while (l <= r) {
            const mid = l + Math.floor((r - l) / 2);
            const idx = RMIQ(segmentTree, heights, n, l, mid);
Otherwise, binary search for the leftmost building to the right of Bob that is taller than both Alice and Bob.


            if (idx !== -1 && heights[idx] > Math.max(heights[alice], heights[bob])) {
                r = mid - 1;
                result_idx = Math.min(result_idx, idx);
            } else {
                l = mid + 1;
            }
        }
If such a building is found, move left to find an earlier one.

Otherwise, move right.


        if (result_idx === Number.MAX_SAFE_INTEGER) {
            result.push(-1);
        } else {
            result.push(result_idx);
        }
    }
    return result;
}
If no such building exists, push -1; otherwise, push the found index.

Return the results for all queries.

*/
function buildSegmentTree(i, l, r, segmentTree, heights) {
    if (l === r) {
        segmentTree[i] = l;
        return;
    }
    const mid = l + Math.floor((r - l) / 2);
    buildSegmentTree(2 * i + 1, l, mid, segmentTree, heights);
    buildSegmentTree(2 * i + 2, mid + 1, r, segmentTree, heights);
    segmentTree[i] = (heights[segmentTree[2 * i + 1]] >= heights[segmentTree[2 * i + 2]]) ?
        segmentTree[2 * i + 1] : segmentTree[2 * i + 2];
}
function constructST(heights, n) {
    const segmentTree = new Array(4 * n);
    buildSegmentTree(0, 0, n - 1, segmentTree, heights);
    return segmentTree;
}
// Function to query the segment tree for the index of the maximum value in range [start, end]
function querySegmentTree(start, end, i, l, r, segmentTree, heights) {
    if (l > end || r < start) {
        return -1;// out of bound
    }
    if (l >= start && r <= end) {
        return segmentTree[i];
    }
    const mid = l + Math.floor((r - l) / 2);
    const leftIndex = querySegmentTree(start, end, 2 * i + 1, l, mid, segmentTree, heights);
    const rightIndex = querySegmentTree(start, end, 2 * i + 2, mid + 1, r, segmentTree, heights);
    // Handle cases where one side is out of bounds
    if (leftIndex === -1) {
        return rightIndex;
    }
    if (rightIndex === -1) {
        return leftIndex;
    }
    // Return the index of the maximum element
    return (heights[leftIndex] >= heights[rightIndex]) ? leftIndex : rightIndex;
}
// Function to return the index of the maximum element in the range from a to b
function RMQ(st, heights, n, a, b) {
    return querySegmentTree(a, b, 0, 0, n - 1, st, heights);
}
var leftmostBuildingQueries = function (heights, queries) {
    const n = heights.length;
    const segmentTree = constructST(heights, n);
    const result = [];
    for (const query of queries) {
        const aliceMin = Math.min(query[0], query[1]);
        const bobMax = Math.max(query[0], query[1]);
        if (aliceMin === bobMax || heights[bobMax] > heights[aliceMin]) {
            result.push(bobMax);
            continue;
        }
        let l = bobMax + 1;
        let r = n - 1;
        let result_idx = Number.MAX_SAFE_INTEGER;
        while (l <= r) {
            const mid = l + Math.floor((r - l) / 2);
            const idx = RMQ(segmentTree, heights, n, l, mid);
            if (idx !== -1 && heights[idx] > Math.max(heights[aliceMin], heights[bobMax])) {
                r = mid - 1;
                result_idx = Math.min(result_idx, idx);
            }
            else {
                l = mid + 1;
            }
        }
        if (result_idx === Number.MAX_SAFE_INTEGER) {
            result.push(-1);
        }
        else {
            result.push(result_idx);
        }
    }
    return result;
};

//let heights = [6,4,8,5,2,7], queries = [[0,1],[0,3],[2,4],[3,4],[2,2]];
let heights = [5,3,8,2,6,1,4,6], queries = [[0,7],[3,5],[5,2],[3,0],[1,6]]

let result = leftmostBuildingQueries(heights,queries);

console.log("leftmostBuildingQueries==",result);

'''

class Solution:
    def build_segment_tree(self, i, l, r, segment_tree, heights):
        if l == r:
            segment_tree[i] = l
            return
        mid = l + (r - l) // 2
        self.build_segment_tree(2 * i + 1, l, mid, segment_tree, heights)
        self.build_segment_tree(2 * i + 2, mid + 1, r, segment_tree, heights)
        segment_tree[i] = (
            segment_tree[2 * i + 1]
            if heights[segment_tree[2 * i + 1]] >= heights[segment_tree[2 * i + 2]]
            else segment_tree[2 * i + 2]
        )

    def construct_st(self, heights, n):
        segment_tree = [0] * (4 * n)
        self.build_segment_tree(0, 0, n - 1, segment_tree, heights)
        return segment_tree

    def query_segment_tree(self, start, end, i, l, r, segment_tree, heights):
        if l > end or r < start:
            return -1
        if l >= start and r <= end:
            return segment_tree[i]
        mid = l + (r - l) // 2
        left_index = self.query_segment_tree(start, end, 2 * i + 1, l, mid, segment_tree, heights)
        right_index = self.query_segment_tree(start, end, 2 * i + 2, mid + 1, r, segment_tree, heights)
        if left_index == -1:
            return right_index
        if right_index == -1:
            return left_index
        return left_index if heights[left_index] >= heights[right_index] else right_index

    def RMQ(self, st, heights, n, a, b):
        return self.query_segment_tree(a, b, 0, 0, n - 1, st, heights)

    def leftmostBuildingQueries(self, heights, queries):
        n = len(heights)
        segment_tree = self.construct_st(heights, n)
        result = []
        for query in queries:
            alice_min = min(query[0], query[1])
            bob_max = max(query[0], query[1])
            if alice_min == bob_max or heights[bob_max] > heights[alice_min]:
                result.append(bob_max)
                continue
            l = bob_max + 1
            r = n - 1
            result_idx = float('inf')
            while l <= r:
                mid = l + (r - l) // 2
                idx = self.RMQ(segment_tree, heights, n, l, mid)
                if idx != -1 and heights[idx] > max(heights[alice_min], heights[bob_max]):
                    r = mid - 1
                    result_idx = min(result_idx, idx)
                else:
                    l = mid + 1
            if result_idx == float('inf'):
                result.append(-1)
            else:
                result.append(result_idx)
        return result


heights = [5, 3, 8, 2, 6, 1, 4, 6]
queries = [[0, 7], [3, 5], [5, 2], [3, 0], [1, 6]]
sol = Solution()
result = sol.leftmostBuildingQueries(heights, queries)
print("leftmostBuildingQueries==", result)
'''
class Solution {
    // Build segment tree (store index of max element)
    buildSegmentTree(i, l, r, segmentTree, heights) {
        if (l === r) {
            segmentTree[i] = l;
            return;
        }
        let mid = Math.floor(l + (r - l) / 2);
        this.buildSegmentTree(2 * i + 1, l, mid, segmentTree, heights);
        this.buildSegmentTree(2 * i + 2, mid + 1, r, segmentTree, heights);

        let leftIdx = segmentTree[2 * i + 1];
        let rightIdx = segmentTree[2 * i + 2];

        segmentTree[i] = (heights[leftIdx] >= heights[rightIdx]) ? leftIdx : rightIdx;
    }

    constructST(heights, n) {
        let segmentTree = new Array(4 * n).fill(0);
        this.buildSegmentTree(0, 0, n - 1, segmentTree, heights);
        return segmentTree;
    }

    querySegmentTree(start, end, i, l, r, segmentTree, heights) {
        if (l > end || r < start) {
            return -1;
        }
        if (l >= start && r <= end) {
            return segmentTree[i];
        }
        let mid = Math.floor(l + (r - l) / 2);
        let leftIndex = this.querySegmentTree(start, end, 2 * i + 1, l, mid, segmentTree, heights);
        let rightIndex = this.querySegmentTree(start, end, 2 * i + 2, mid + 1, r, segmentTree, heights);

        if (leftIndex === -1) return rightIndex;
        if (rightIndex === -1) return leftIndex;

        return (heights[leftIndex] >= heights[rightIndex]) ? leftIndex : rightIndex;
    }

    RMQ(st, heights, n, a, b) {
        return this.querySegmentTree(a, b, 0, 0, n - 1, st, heights);
    }

    leftmostBuildingQueries(heights, queries) {
        let n = heights.length;
        let segmentTree = this.constructST(heights, n);
        let result = [];

        for (let query of queries) {
            let aliceMin = Math.min(query[0], query[1]);
            let bobMax = Math.max(query[0], query[1]);

            // Case 1: same index OR bob taller than alice
            if (aliceMin === bobMax || heights[bobMax] > heights[aliceMin]) {
                result.push(bobMax);
                continue;
            }

            // Binary search on right side to find leftmost taller building
            let l = bobMax + 1;
            let r = n - 1;
            let resultIdx = Infinity;

            while (l <= r) {
                let mid = Math.floor(l + (r - l) / 2);
                let idx = this.RMQ(segmentTree, heights, n, l, mid);

                if (idx !== -1 && heights[idx] > Math.max(heights[aliceMin], heights[bobMax])) {
                    resultIdx = Math.min(resultIdx, idx);
                    r = mid - 1; // try to find earlier building
                } else {
                    l = mid + 1;
                }
            }

            result.push(resultIdx === Infinity ? -1 : resultIdx);
        }

        return result;
    }
}

// Example usage
let sol = new Solution();
let heights = [6, 4, 8, 5, 2, 7];
let queries = [[0, 1], [0, 3], [2, 4], [3, 5]];
console.log(sol.leftmostBuildingQueries(heights, queries));
// Output example: [2, 2, -1, -1]
'''