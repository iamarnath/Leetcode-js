/*
435. Non Overlapping Intervals
Description
Given an array of intervals intervals where
 intervals[i] = [start_i, end_i], 
 return the minimum number of intervals you need 
 to remove to make the rest of the intervals non-overlapping.

Note: Intervals are non-overlapping even if
 they have a common point. For example,
  [1, 3] and [2, 4] are overlapping,
   but [1, 2] and [2, 3] are non-overlapping.

Example 1:

Input: intervals = [[1,2],[2,4],[1,4]]

Output: 1
Explanation: After [1,4] is removed, the rest of
 the intervals are non-overlapping.

Example 2:

Input: intervals = [[1,2],[2,4]]

Output: 0
Constraints:

1 <= intervals.length <= 1000
intervals[i].length == 2
-50000 <= starti < endi <= 50000

*/

/*
Time and Space Complexity
Time Complexity:

Sorting: O(n log n)

Iteration: O(n)

Total: O(n log n)

Space Complexity:

O(1) extra space (in-place sorting, only a few variables used)

*/

var eraseOverlapIntervals = function (intervals) {
    if (intervals.length === 0) return 0;
    // Sort intervals by their start time
    //Intervals are sorted by their start time to make
    //  it easier to compare adjacent intervals for overlap.
    intervals.sort((a, b) => a[0] - b[0]);
    let count = 0;
    //lastInterval is initialized to the first interval.
    let lastInterval = intervals[0];
    for (let i = 1; i < intervals.length; i++) {
        const curr_start = intervals[i][0];
        const curr_end = intervals[i][1];
        const last_end = lastInterval[1];
        // No overlap, move window forward
        //If the current interval starts after or exactly
        //  at the end of lastInterval, there's no overlap.
        //  Move the window forward by updating lastInterval.
        if (curr_start >= last_end) {
            lastInterval = intervals[i];
        }
        // Overlap, but keep the interval with the smaller end
        //If the current interval overlaps and ends
        //  after or at the same time as lastInterval,
        //  increment count (remove current interval).
        else if (curr_end >= last_end) {
            count++;
        }
        // Overlap, but current interval ends earlier, so prefer it
        //If the current interval overlaps and
        //  ends before lastInterval, increment count 
        // and update lastInterval to the current interval 
        // (greedily keep the interval that ends sooner).
        else if (curr_end < last_end) {
            lastInterval = intervals[i];
            count++;
        }
    }
    return count;
};

let intervals = [[1,2],[2,4],[1,4]];

let res = eraseOverlapIntervals(intervals);

console.log("result==",res);