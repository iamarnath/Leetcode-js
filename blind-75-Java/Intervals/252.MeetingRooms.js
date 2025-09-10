/*
252. Meeting Rooms
Given an array of meeting time interval objects consisting of start and end times [[start_1,end_1],[start_2,end_2],...] (start_i < end_i), determine if a person could add all meetings to their schedule without any conflicts.

Example 1:

Input: intervals = [(0,30),(5,10),(15,20)]

Output: false
Explanation:

(0,30) and (5,10) will conflict
(0,30) and (15,20) will conflict
Example 2:

Input: intervals = [(5,8),(9,15)]

Output: true
Note:

(0,8),(8,10) is not considered a conflict at 8
Constraints:

0 <= intervals.length <= 500
0 <= intervals[i].start < intervals[i].end <= 1,000,000
*/
function canAttendMeetings(intervals) {
    // Sort the intervals based on their start time.
    intervals.sort((a, b) => a[0] - b[0]);
    let intLen = intervals.length;
    // Iterate over the sorted intervals starting from the second interval.
    for (let i = 1; i < intLen; i++) {
        // Check if the current interval starts before the previous interval ends.
        // If so, there's an overlap, and the person cannot attend all meetings.
        curr_int_start = intervals[i][0];
        prev_int_end = intervals[i - 1][1];
        if (curr_int_start < prev_int_end) {
            return false;
        }
    }
    return true;
}

let intervals = [[0, 30], [5, 10], [15, 20]];

let res = canAttendMeetings(intervals);
console.log("mmet rooms 1==", res);