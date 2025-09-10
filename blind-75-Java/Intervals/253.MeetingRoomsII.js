/*
253. Meeting Rooms II
Given an array of meeting time intervals consisting
 of start and end times [[s1,e1],[s2,e2],...] (si < ei),
  find the minimum number of conference rooms required.

Example 1:

Input: intervals = [(0,40),(5,10),(15,20)]

Output: 2
Explanation:
room1: (0,40)
room2: (5,10),(15,20)

Example 2:

Input: intervals = [(4,9)]

Output: 1
Note:

(0,8),(8,10) is not considered a conflict at 8


Constraints:

0 <= intervals.length <= 500
0 <= intervals[i].start < intervals[i].end <= 1,000,000
*/

/*
Tracking room changes with a map:
The function uses a Map (mp) to record how the number
 of rooms needed changes over time. For each meeting 
 interval [start, end], it increments the count at the 
 start time (indicating a room is occupied) and 
 decrements the count at the end time (indicating a room is freed).

Populating the map:
For every interval in intervals, it does:

mp.set(i, (mp.get(i) || 0) + 1) to add one room at the start time.

mp.set(i, (mp.get(i) || 0) - 1) to free one room at the end time.

Sorting the event times:
It extracts all unique time points (keys) from the map 
and sorts them in ascending order, so the timeline of 
room usage changes is processed chronologically.

Calculating the maximum rooms needed:
Iterating over the sorted times, it updates a running
 total (prev) of rooms currently in use by adding the 
 delta stored in the map at each time. 
 It keeps track of the maximum number of rooms needed (res) during this process.

Returning the result:
After processing all time points, res contains the 
minimum number of meeting rooms required to hold 
all meetings without clashes.

This approach efficiently captures overlaps by
 treating meeting start and end times as discrete events
  that increase or decrease room demand.

Time Complexity
Populating the map: O(n), where n is the number of intervals,
 since it processes each interval once.

Sorting the keys: O(k log k), where k is the number
 of unique time points. Since each interval contributes
  at most two unique times (start and end), k ≤ 2n, so sorting is O(n log n).

Iterating over sorted keys: O(k), which is O(n) in the worst case.

Overall, the time complexity is dominated by sorting, resulting in O(n log n).

Space Complexity
The map stores up to 2n entries (start and end times for each interval).

Other variables use constant space.

Thus, the space complexity is O(n).

*/

function minMeetingRooms(intervals) {
    // 1. Create a map to track room count changes
    const mp = new Map();
    console.log("intervals==", intervals)
    // 2. Populate the map with start/end deltas
    for (const i of intervals) {
        // +1 for meeting start (room needed)
        mp.set(i[0], (mp.get(i[0]) || 0) + 1);
        // -1 for meeting end (room freed)
        mp.set(i[1], (mp.get(i[1]) || 0) - 1);

    }
    console.log("meeting==",mp);
    // 3. Extract and sort event times
    const sortedKeys = Array.from(mp.keys()).sort((a, b) => a - b);
    console.log("sortedKeys==", sortedKeys)
    // 4. Track current and maximum rooms used
    let prev = 0, res = 0;
    for (const key of sortedKeys) {
        prev += mp.get(key); // Update current room count

        res = Math.max(res, prev); // Track peak usage
        console.log("key==", key, mp.get(key), prev, res);

    }

    return res;
}

let intervals = [[0, 40], [5, 10], [15, 20]];
console.log("minMeetingRooms==", minMeetingRooms(intervals));