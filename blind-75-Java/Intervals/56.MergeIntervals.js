/*
56. Merge Intervals
Description
Given an array of intervals where intervals[i] = [start_i, end_i], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

You may return the answer in any order.

Note: Intervals are non-overlapping if they have no common point. For example, [1, 2] and [3, 4] are non-overlapping, but [1, 2] and [2, 3] are overlapping.

Example 1:

Input: intervals = [[1,3],[1,5],[6,7]]

Output: [[1,5],[6,7]]
Example 2:

Input: intervals = [[1,2],[2,3]]

Output: [[1,3]]
Constraints:

1 <= intervals.length <= 1000
intervals[i].length == 2
0 <= start <= end <= 1000
*/
/*
Time Complexity
Sorting: O(n log n) where n is the number of intervals (due to the sort step).

Merging: O(n) since each interval is visited once in the loop.

Total: O(n log n) (dominated by the sorting step).

Space Complexity
Result Array: In the worst case (no intervals overlap), the result array holds all n intervals, so O(n).

Auxiliary Space: Sorting may require additional space depending on the JavaScript engine, but typically it is O(log n) for the recursion stack.

Overall: O(n)

*/
var merge = function (intervals) {
    //If the input has 0 or 1 interval, there’s nothing to merge, so return the input as is.
    if (intervals.length <= 1) return intervals;
    //Sorts the intervals in ascending order based
    //  on their start value (a and b).
    //This ensures that overlapping intervals are adjacent in the array.
    intervals.sort((a, b) => a[0] - b[0]);
    const result = [];
    // Makes a shallow copy of the first interval and
    //  assigns it to newInterval.
    // Using .slice() ensures we don’t mutate the 
    // original interval in the input array.
    let newInterval = intervals[0].slice();
  //  console.log("newInterval==",newInterval);
    //Adds the first interval (now newInterval) to the result array.
     console.log("before loop newInterval==",newInterval);
    result.push(newInterval);
    //console.log("result==",result);
    for (const interval of intervals) {
        console.log("interval==",interval);
        console.log("newInterval==",newInterval);
        if (interval[0] <= newInterval[1]) {
            //If the current interval’s start is less than or 
            // equal to the end of newInterval, they overlap.
            //Update the end of newInterval to be the maximum 
            // of its current end and the current interval’s end, 
            // effectively merging them.
            newInterval[1] = Math.max(newInterval[1], interval[1]);
        }
        else {
            // Disjoint interval, add to result and set as newInterval
            /*
            Else (no overlap):
                Make a copy of the current interval and assign
                 it to newInterval.
                Add this new interval to the result array.
                This starts a new group of merged intervals.
            */
           // console.log("result==",result);
           // console.log("interval==",interval);
         

            newInterval = interval.slice();
             //  console.log("newInterval==",newInterval);
            result.push(newInterval);
        }
    }
    return result;
};

let intervals = [[1,3],[2,6],[8,10],[15,18]];
let res = merge(intervals);

console.log("merged intervals==", res);