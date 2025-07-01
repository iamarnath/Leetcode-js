/*
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