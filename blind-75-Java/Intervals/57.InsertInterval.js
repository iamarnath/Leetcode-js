/*
57. Insert Interval
You are given an array of non-overlapping intervals
 intervals where intervals[i] = [start_i, end_i] 
 represents the start and the end time of the ith interval. 
 intervals is initially sorted in ascending order by start_i.

You are given another interval newInterval = [start, end].

Insert newInterval into intervals such that intervals 
is still sorted in ascending order by start_i and also
 intervals still does not have any overlapping intervals.
  You may merge the overlapping intervals if needed.

Return intervals after adding newInterval.

Note: Intervals are non-overlapping if they have no
 common point. For example, [1,2] and [3,4] are non-overlapping, 
 but [1,2] and [2,3] are overlapping.

Example 1:

Input: intervals = [[1,3],[4,6]], newInterval = [2,5]

Output: [[1,6]]
Example 2:

Input: intervals = [[1,2],[3,5],[9,10]], newInterval = [6,7]

Output: [[1,2],[3,5],[6,7],[9,10]]
Constraints:

0 <= intervals.length <= 1000
newInterval.length == intervals[i].length == 2
0 <= start <= end <= 1000

*/
/*
⏱ Time Complexity
O(n)

Processes each interval exactly once

Single pass through the input array

Final loop only handles remaining elements

💾 Space Complexity
O(n)

Stores result containing all original + merged intervals

Worst case: No merges → n+1 intervals stored

*/
function insertInterval(intervals, newInterval) {
    let merged = [newInterval[0],newInterval[1]];
    const result =[];
    let i=0;
    const n=intervals.length;
    while(i<n){
        //intervals[i] ends before new interval starts → Add to result
        if(intervals[i][1] < merged[0]){
            result.push(intervals[i]);
        }
        //intervals[i] starts after new interval ends → Stop processing
        else if(intervals[i][0] > merged[1]){
            break;
        }
        else{
            //Expand merged to include current interval's boundaries
            merged[0] = Math.min(merged[0],intervals[i][0]);
            merged[1] = Math.max(merged[1],intervals[i][1]);
        }
        i++;
    }
    //Add the fully merged interval
    result.push(merged);
    // Add all remaining non-overlapping intervals
    while(i<intervals.length){
        result.push(intervals[i]);
        i++;
    }
    return result;
}

let intervals = [[1,3],[4,6]], newInterval = [2,5];

let res = insertInterval(intervals, newInterval);
console.log("res==",res);