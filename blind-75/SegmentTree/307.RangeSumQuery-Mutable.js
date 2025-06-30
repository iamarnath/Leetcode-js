/*
Given an integer array nums, handle multiple queries of the following types:

Update the value of an element in nums.
Calculate the sum of the elements of nums between indices left and right inclusive where left <= right.
Implement the NumArray class:

NumArray(int[] nums) Initializes the object with the integer array nums.
void update(int index, int val) Updates the value of nums[index] to be val.
int sumRange(int left, int right) Returns the sum of the elements of nums between indices left and right inclusive (i.e. nums[left] + nums[left + 1] + ... + nums[right]).
 

Example 1:

Input
["NumArray", "sumRange", "update", "sumRange"]
[[[1, 3, 5]], [0, 2], [1, 2], [0, 2]]
Output
[null, 9, null, 8]

Explanation
NumArray numArray = new NumArray([1, 3, 5]);
numArray.sumRange(0, 2); // return 1 + 3 + 5 = 9
numArray.update(1, 2);   // nums = [1, 2, 5]
numArray.sumRange(0, 2); // return 1 + 2 + 5 = 8
 

Constraints:

1 <= nums.length <= 3 * 104
-100 <= nums[i] <= 100
0 <= index < nums.length
-100 <= val <= 100
0 <= left <= right < nums.length
At most 3 * 104 calls will be made to update and sumRange.

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

function updateSegmentTree(idx, val, i, l, r, segmentTree) {
    if (l == r) {
        segmentTree[i] = val;
        return;
    }
    const mid = Math.floor(l + (r - l) / 2);
    // serach left side
    if (idx <= mid) {
        updateSegmentTree(idx, val, 2 * i + 1, l, mid, segmentTree);
    }
    else {
        updateSegmentTree(idx, val, 2 * i + 2, mid + 1, r, segmentTree);
    }
    segmentTree[i] = segmentTree[2 * i + 1] + segmentTree[2 * i + 2];
}
/**
 * @param {number[]} nums
 */
var NumArray = function (nums) {
    this.n = nums.length;
    if (this.n === 0) {
        this.segmentTree = [];
        return;
    }
    this.segmentTree = new Array(4 * this.n).fill(0);
    buildSegmentTree(0, 0, this.n - 1, this.segmentTree, nums);
};

/** 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
NumArray.prototype.update = function (index, val) {
    updateSegmentTree(index, val, 0, 0, this.n - 1, this.segmentTree);
};

/** 
 * @param {number} left 
 * @param {number} right
 * @return {number}
 */
NumArray.prototype.sumRange = function (left, right) {
    if (this.n === 0) {
        return 0;
    }
    return querySegmentTree(left, right, 0, 0, this.n - 1, this.segmentTree);
};

/** 
 * Your NumArray object will be instantiated and called as such:

 */
let nums = [1, 3, 5];
var obj = new NumArray(nums)
// obj.update(index, val)
// var param_2 = obj.sumRange(left, right)

let res1 = obj.sumRange(0, 2); // return 1 + 3 + 5 = 9
console.log("sumRange 1==",res1);
let res2 = obj.update(1, 2);   // nums = [1, 2, 5]
console.log("update 1==",res2);
let res3 =obj.sumRange(0, 2); // return 1 + 2 + 5 = 8
console.log("sumRange 2==",res3);