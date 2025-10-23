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
/*
The use of .slice() in your merge intervals function is critical to avoid unwanted mutation of the input array. Here’s how it works and why it matters in both cases:

Initial Slice: let newInterval = intervals.slice();
What it does:
Makes a shallow copy of the first interval in the original intervals array.

Why:
Without copying, if newInterval is merged (its end is updated), the change would affect the original array, possibly corrupting other data or leading to unintended results.

Result:
Any updates to newInterval inside the merge process do not alter intervals; result ends up with its own copy.

Slice in the Loop: newInterval = interval.slice();
When used:
Whenever a disjoint interval (doesn’t overlap) is encountered.

What it does:
Creates a new copy of the current interval to start a new merge group and avoids mutating the input.

Why:
Ensures only the copies in result are being changed, preserving the originals in intervals.

For the first interval in the for-of loop
The first interval in the for of loop doesn't overlap with anything yet because newInterval and interval refer to the same data (the first interval, but as a copy).

The loop still processes it, but since it’s already included and there’s no overlap to resolve, it moves forward.

Why Mutation Matters
If you assign intervals directly (without slice), then updates to newInterval may inadvertently update the intervals still being looped over in future iterations, leading to bugs. Using .slice() eliminates this risk.

Summary Table

Step	What .slice() does	Why it's needed
Initial assignment	Copies first interval for merging	Prevents mutation of input array
Disjoint interval in loop	Copies current interval for new merges	Keeps input intervals unchanged
Ultimately, .slice() is a defensive programming technique to keep merging logic clean and avoid side effects, ensuring your function always returns correct, independent merged results.In your code, slice() is used to create a shallow copy of an interval array so that the merged results do not accidentally change (mutate) the contents of the original input array.

Initially:
let newInterval = intervals.slice();
This copies the first interval (e.g., [1,3]) so that any later changes (like merging overlaps) happen only to the copy, not the original array. If you skipped .slice(), updating newInterval would directly alter intervals, which is bad practice and can cause bugs.

Inside the loop (in the else branch):
newInterval = interval.slice();
This is for when a disjoint (non-overlapping) interval is found, and you need to start tracking a new merge group. Again, .slice() ensures any changes to newInterval won’t affect the entry in the original intervals list.

On the first iteration:
The for...of loop does process the first interval, but no merging or overlap handling occurs yet because the result already contains a copy of the first interval.

Summary:
.slice() is necessary here to prevent in-place modification of the input and to keep merged results independent from the source data. On the first iteration, there is no overlap to handle—the copied interval is simply compared with itself, so nothing changes until the next interval is processed.
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

    console.log("intervals==",intervals)
    for (const interval of intervals) {
        // console.log("interval==",interval);
        // console.log("newInterval==",newInterval);
        if (interval[0] <= newInterval[1]) {
            console.log("if newInterval==",interval);
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
            console.log("newInterval else ==",newInterval);
            result.push(newInterval);
        }
    }
    return result;
};

let intervals = [[1,3],[2,6],[8,10],[15,18]];
let res = merge(intervals);

console.log("merged intervals==", res);