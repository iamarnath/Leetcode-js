/*
Given an integer array nums, handle multiple queries
of the following type:

Calculate the sum of the elements of nums between
indices left and right inclusive where left <= right.
Implement the NumArray class:

NumArray(int[] nums) Initializes the object
with the integer array nums.
int sumRange(int left, int right) Returns 
the sum of the elements of nums between indices 
left and right inclusive (i.e. nums[left] + nums[left + 1] + ... + nums[right]).
 

Example 1:

Input
["NumArray", "sumRange", "sumRange", "sumRange"]
[[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]
Output
[null, 1, -1, -3]

Explanation
NumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
numArray.sumRange(0, 2); // return (-2) + 0 + 3 = 1
numArray.sumRange(2, 5); // return 3 + (-5) + 2 + (-1) = -1
numArray.sumRange(0, 5); // return (-2) + 0 + 3 + (-5) + 2 + (-1) = -3
 

Constraints:

1 <= nums.length <= 104
-105 <= nums[i] <= 105
0 <= left <= right < nums.length
At most 104 calls will be made to sumRange.

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

var NumArraySeg = function (nums) {
   this.n = nums.length;
   if (this.n === 0) {
      this.segmentTree = [];
      return;
   }
   this.segmentTree = new Array(4 * this.n).fill(0);
   buildSegmentTree(0, 0, this.n - 1, this.segmentTree, nums);
};


NumArraySeg.prototype.sumRange = function (left, right) {
   if (this.n === 0) {
      return 0;
   }
   return querySegmentTree(left, right, 0, 0, this.n - 1, this.segmentTree);
};

//===================
// using prefix sum
let sumArray = [];
var NumArray = function (nums) {
   let n = nums.length;
   sumArray = new Array(n).fill(0);
   sumArray[0] = nums[0];
   for (let i = 1; i < n; i++) {
      sumArray[i] = sumArray[i - 1] + nums[i];
   }
};


NumArray.prototype.sumRange = function (left, right) {
   if (left === 0) return sumArray[right];
   return sumArray[right] - sumArray[left - 1];
};

let nums = [-2, 0, 3, -5, 2, -1], left = 0, right = 5;
var obj = new NumArray(nums);
var param_1 = obj.sumRange(left, right);

console.log("param_1==", param_1)

