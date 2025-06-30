/*
Sum of Query II
You are given an array arr[] of n integers and q 
queries in an array queries[] of length 2*q containing 
l, r pair for all q queries. You need to compute 
the following sum over q queries.

 

Note : Array is 1-Indexed.

Examples :

Input: n = 4, arr = {1, 2, 3, 4}, q = 2, queries = {1, 4, 2, 3}
Output: 10 5
Explaination: In the first query we need sum from 1 to 4 
which is 1+2+3+4 = 10. In the second query we need sum
 from 2 to 3 which is 2 + 3 = 5.
Input: n = 5, arr = {26, 30, 48, 29, 8}, q = 2, queries = {4, 4, 2, 3}
Output: 29 78
Explaination: In the first query we need sum
 from 4 to 4 which is 29. In the second query 
 we need sum from 2 to 3 which is 30 + 48 = 78.
Your Task:
You don't need to read input or print anything.
 Your task is to complete the function querySum() 
 which takes n, arr, q and queries as input 
 parameters and returns the answer for all the queries.

Expected Time Complexity: O(n+q)
Expected Auxiliary Space: O(n)

Constraints:
1 ≤ n, q ≤ 105
1 ≤ arri ≤ 103
1 ≤ l ≤ r ≤ n

*/

/*

Key Functions
buildSegmentTree(i, l, r, segmentTree, arr):

i: Index in the segment tree.

l, r: Current segment (left and right indices in the original array).

segmentTree: Array representing the segment tree.

arr: Input array.

Builds the segment tree recursively by splitting 
the segment in half until reaching a single element,
 then sums children to fill the parent.

querySegmentTree(start, end, i, l, r, segmentTree):

start, end: Query range (inclusive).

i, l, r: Current node and its segment.

segmentTree: The segment tree.

Returns the sum of elements in the range [start, end].
 If the current segment is completely outside the query,
  returns 0. If completely inside, returns the node value.
   Otherwise, splits and sums results from both children.

querySum(n, arr, q, queries):

n: Number of elements in the input array.

arr: Input array.

q: Number of queries (note: actually, 
queries array should be of length 2q).

queries: Array of pairs (start, end) in 1-based indexing.

Builds the segment tree and processes all queries,
 returning results as a vector.

*/

/*
Time Complexity
Building Segment Tree:

O(n): Each element is processed exactly once,
 and the tree has O(n) nodes.

Correction: Actually, building a segment tree 
is O(n) for the sum operation (each node is filled 
in constant time, and there are ~2n-1 nodes, 
but in practice, people use 4n as a safe upper bound for array size).

Querying:

O(log n) per query: Each query traverses at 
most O(log n) nodes in the tree.

For q queries: O(q log n)

Total Time:

O(n) + O(q log n)

Space Complexity
Segment Tree:

O(n): The segment tree uses an array of size 4n, so O(n) space.

Other variables:

O(q): For storing results (insignificant compared to O(n)
 if q is not much larger than n).

Total Space:

O(n)

4. Summary Table
Operation	        Time Complexity	            Space Complexity
Build Tree	                O(n)	            O(n)
Query	                    O(log n)	        O(1) per query
q Queries	                O(q log n)	        O(q) for results
Total	                    O(n + q log n)	    O(n)


*/
function buildSegmentTree(i, l, r, segmentTree, arr) {
   if (l === r) {
      segmentTree[i] = arr[l];
      return;
   }
   const mid = Math.floor(l + (r - l) / 2);
   buildSegmentTree(2 * i + 1, l, mid, segmentTree, arr);
   buildSegmentTree(2 * i + 2, mid + 1, r, segmentTree, arr);
   segmentTree[i] = segmentTree[2 * i + 1] + segmentTree[2 * i + 2];
}

function querySegmentTree(start, end, i, l, r, segmentTree) {
   if (l > end || r < start) {
      return 0;
   }
   if (l >= start && r <= end) {
      return segmentTree[i];
   }
   const mid = Math.floor(l + (r - l) / 2);
   return (querySegmentTree(start, end, 2 * i + 1, l, mid, segmentTree) +
      querySegmentTree(start, end, 2 * i + 2, mid + 1, r, segmentTree))
}

function querySum(n, arr, q, queries) {
   const segmentTree = new Array(4 * n).fill(0);
   buildSegmentTree(0, 0, n - 1, segmentTree, arr);
   const result = [];
   for (let i = 0; i < 2 * q; i += 2) {
      const start = queries[i] - 1; // 1-based to 0-based
      const end = queries[i + 1] - 1;
      result.push(querySegmentTree(start, end, 0, 0, n - 1, segmentTree));
   }
   return result;
}


// const arr = [1, 2, 3, 4, 5];
// const n = arr.length;
// const q = 2;
// const queries = [1, 5, 2, 4]; // 1-based [start, end]
//let n = 4, arr = [1, 2, 3, 4], q = 2, queries = [1, 4, 2, 3];
let n = 5, arr = [26, 30, 48, 29, 8], q = 2, queries = [4, 4, 2, 3];
const result = querySum(n, arr, q, queries);
console.log(result); // Output: [15, 9]