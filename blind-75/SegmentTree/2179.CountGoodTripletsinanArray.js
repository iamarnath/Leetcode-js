/*
2179. Count Good Triplets in an Array

You are given two 0-indexed arrays nums1 and nums2 of length n, both of which are permutations of [0, 1, ..., n - 1].

A good triplet is a set of 3 distinct values which are present in increasing order by position both in nums1 and nums2. In other words, if we consider pos1v as the index of the value v in nums1 and pos2v as the index of the value v in nums2, then a good triplet will be a set (x, y, z) where 0 <= x, y, z <= n - 1, such that pos1x < pos1y < pos1z and pos2x < pos2y < pos2z.

Return the total number of good triplets.

 

Example 1:

Input: nums1 = [2,0,1,3], nums2 = [0,1,2,3]
Output: 1
Explanation: 
There are 4 triplets (x,y,z) such that pos1x < pos1y < pos1z. They are (2,0,1), (2,0,3), (2,1,3), and (0,1,3). 
Out of those triplets, only the triplet (0,1,3) satisfies pos2x < pos2y < pos2z. Hence, there is only 1 good triplet.
Example 2:

Input: nums1 = [4,0,1,3,2], nums2 = [4,1,0,2,3]
Output: 4
Explanation: The 4 good triplets are (4,0,3), (4,0,2), (4,1,3), and (4,1,2).
 

Constraints:

n == nums1.length == nums2.length
3 <= n <= 105
0 <= nums1[i], nums2[i] <= n - 1
nums1 and nums2 are permutations of [0, 1, ..., n - 1].

*/
/*
Time Complexity
Building the map: O(n)

Each update/query on the segment tree: O(log n)

Loop over all elements: O(n)

Total:
For each of the n elements, you do one query and one update, each O(log n):
O(n log n)

Space Complexity
Map: O(n)

Segment tree array: O(n) (technically O(4n), but that's O(n) in asymptotic terms)

Other variables: O(1)

Total:
O(n)

Summary Table
Operation	    Complexity
Time (overall)	    O(n log n)
Space (overall)	    O(n)

*/
/*
Purpose: Marks an index as "visited" in the segment tree, and updates the tree accordingly.

Parameters:

i: Current node index in the segment tree array.

l, r: The range of indices in the original array that this node covers.

updateIndex: The index in the original array to mark as visited.

segmentTree: The segment tree array.

How it works:

If l === r, we are at a leaf node (corresponds to a single element). We set it to 1 (visited).

Otherwise, we recurse into the left or right child depending on where updateIndex falls.

After updating, we recalculate the sum for the current node as the sum of its two children.

*/

function updateSegmentTree(i, l, r, updateIndex, segmentTree) {
    if (l === r) {
        segmentTree[i] = 1;//mark visited
        return;
    }
    const mid = l + Math.floor((r - l) / 2);
    if (updateIndex <= mid) {
        updateSegmentTree(2 * i + 1, l, mid, updateIndex, segmentTree);
    }
    else {
        updateSegmentTree(2 * i + 2, mid + 1, r, updateIndex, segmentTree);
    }
    segmentTree[i] = segmentTree[2 * i + 1] + segmentTree[2 * i + 2];
}
/*
Purpose: Returns the sum of visited nodes in a given range [queryStart, queryEnd] in the segment tree.

Parameters: Similar to above, but queryStart and queryEnd define the query range.

How it works:

If the current node's range is outside the query range, return 0.

If the current node's range is completely inside the query range, return its value.

Otherwise, split the query into left and right children and sum their results.

*/
function querySegmentTree(queryStart, queryEnd, i, l, r, segmentTree) {
    if (l > queryEnd || r < queryStart) {
        return 0;
    }
    if (l >= queryStart && r <= queryEnd) {
        return segmentTree[i];
    }
    const mid = l + Math.floor((r - l) / 2);
    const left = querySegmentTree(queryStart, queryEnd, 2 * i + 1, l, mid, segmentTree);
    const right = querySegmentTree(queryStart, queryEnd, 2 * i + 2, mid + 1, r, segmentTree);
    return left + right;
}

/*
Purpose: Counts the number of "good triplets" between nums1 and nums2.

Step-by-step:

const n = nums1.length;
Get the array length.

const mp = new Map();
Create a mapping from each value in nums2 to its index.

for (let i = 0; i < n; i++) { mp.set(nums2[i], i); }
Fill the map so you can quickly find where each value from nums1 
appears in nums2.

const segmentTree = new Array(4 * n).fill(0);
Initialize a segment tree large enough to cover all indices.

let result = 0;
Initialize the result counter.

for (let i = 0; i < n; i++) { ... }
For each element in nums1 (in order):

const idx = mp.get(nums1[i]);
Find the index of the current nums1[i] in nums2.

const leftCommonCount = idx > 0 ? querySegmentTree
(0, idx - 1, 0, 0, n - 1, segmentTree) : 0;
Count how many of the previous nums1 elements have 
their mapped index in nums2 less than the current index (idx).
This is the number of "common" elements to the left.

const leftNotCommonCount = i - leftCommonCount;
The rest of the previous elements are "not common" to the left.

const elementsAfterIdxNums2 = (n - 1) - idx;
How many elements are after idx in nums2.

const rightCommonCount = elementsAfterIdxNums2 - leftNotCommonCount;
The number of "common" elements to the right.

result += leftCommonCount * rightCommonCount;
The number of good triplets for this position is the product of left and right common counts.

updateSegmentTree(0, 0, n - 1, idx, segmentTree);
Mark the current index as visited.

return result;
Return the total count of good triplets.

*/
var goodTriplets = function (nums1, nums2) {
    const n = nums1.length;
    const mp = new Map();
    for (let i = 0; i < n; i++) {
        mp.set(nums2[i], i);
    }
    const segmentTree = new Array(4 * n).fill(0);// fill with 0 to mark all nodes as non visited
    let result = 0;
    // Update with first element's mapped index from nums2
    updateSegmentTree(0, 0, n - 1, mp.get(nums1[0]), segmentTree);
    for (let i = 0; i < n; i++) {
        const idx = mp.get(nums1[i]);
        const leftCommonCount = idx > 0 ? querySegmentTree(0, idx - 1, 0, 0, n - 1, segmentTree) : 0;
        const leftNotCommonCount = i - leftCommonCount;
        const elementsAfterIdxNums2 = (n - 1) - idx;
        const rightCommonCount = elementsAfterIdxNums2 - leftNotCommonCount;
        result = result + (leftCommonCount * rightCommonCount);
        // Mark this index as visited AFTER querying
        updateSegmentTree(0, 0, n - 1, idx, segmentTree);
    }
    return result;
};

let nums1 = [4, 0, 1, 3, 2], nums2 = [4, 1, 0, 2, 3];
let res = goodTriplets(nums1, nums2);
console.log("goodTriplets==", res);