/*
Given an array A[ ] and its size N your task is 
to complete two functions  a constructST  
function which builds the segment tree  and a
 function RMQ which finds range minimum query 
 in a range [a,b] of the given array.

Input:
The task is to complete two functions constructST and RMQ.
The constructST function builds the segment tree
 and takes two arguments the array A[ ] and the size of the array N.
It returns a pointer to the first element of
 the segment tree array.
The RMQ function takes 4 arguments the first being
 the segment tree st constructed, second being the 
 size N and then third and forth arguments are the 
 range of query a and b. The function RMQ returns
  the min of the elements in the array from index 
  range a and b. There are multiple test cases. For 
  each test case, this method will be called individually.

Output:
The function RMQ should return the min element in the array from range a to b.

Example:

Input (To be used only for expected output) 
1
4
1 2 3 4
2
0 2 2 3
Output
1 3
Explanation
1. For query 1 ie 0 2 the element in this range are 1 2 3 
   and the min element is 1. 
2. For query 2 ie 2 3 the element in this range are 3 4 
   and the min element is 3.
Constraints:
1<=T<=100
1<=N<=10^3+1

1<=A[i]<=10^9
1<=Q(no of queries)<=10000
0<=a<=b

*/
function buildSegmentTree(i, l, r, segmentTree, arr) {
    if (l === r) {
        segmentTree[i] = arr[l];
        return;
    }
    const mid = Math.floor(l + (r - l) / 2);
    buildSegmentTree(2 * i + 1, l, mid, segmentTree, arr);
    buildSegmentTree(2 * i + 2, mid + 1, r, segmentTree, arr);
    segmentTree[i] = Math.min(segmentTree[2 * i + 1], segmentTree[2 * i + 2]);

}

function querySegmentTree(start, end, i, l, r, segmentTree) {
    if (l > end || r < start) {
        return Infinity;
    }
    if (l >= start && r <= end) {
        return segmentTree[i];
    }
    const mid = Math.floor(l + (r - l) / 2);
    return Math.min(
        querySegmentTree(start, end, 2 * i + 1, l, mid, segmentTree),
        querySegmentTree(start, end, 2 * i + 2, mid + 1, r, segmentTree)
    )
}
function constructST(arr, n) {
    const segmentTree = new Array(4 * n).fill(Infinity);
    buildSegmentTree(0, 0, n - 1, segmentTree, arr);
    return segmentTree;
}

function RMQ(st, n, a, b) {
    return querySegmentTree(a, b, 0, 0, n - 1, st);
}

const arr = [2, 5, 1, 4, 9, 3];
const n = arr.length;
const st = constructST(arr, n);
//console.log("st==",st)
console.log(RMQ(st, n, 0, 2)); // Output: 1
console.log(RMQ(st, n, 2, 5)); // Output: 1
console.log(RMQ(st, n, 4, 5)); // Output: 3