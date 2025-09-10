/*
2402. Meeting Rooms III
You are given an integer n. There are n rooms numbered from 0 to n - 1.

You are given a 2D integer array meetings where meetings[i] = [starti, endi] means that a meeting will be held during the half-closed time interval [starti, endi). All the values of starti are unique.

Meetings are allocated to rooms in the following manner:

Each meeting will take place in the unused room with the lowest number.
If there are no available rooms, the meeting will be delayed until a room becomes free. The delayed meeting should have the same duration as the original meeting.
When a room becomes unused, meetings that have an earlier original start time should be given the room.
Return the number of the room that held the most meetings. If there are multiple rooms, return the room with the lowest number.

A half-closed interval [a, b) is the interval between a and b including a and not including b.

 

Example 1:

Input: n = 2, meetings = [[0,10],[1,5],[2,7],[3,4]]
Output: 0
Explanation:
- At time 0, both rooms are not being used. The first meeting starts in room 0.
- At time 1, only room 1 is not being used. The second meeting starts in room 1.
- At time 2, both rooms are being used. The third meeting is delayed.
- At time 3, both rooms are being used. The fourth meeting is delayed.
- At time 5, the meeting in room 1 finishes. The third meeting starts in room 1 for the time period [5,10).
- At time 10, the meetings in both rooms finish. The fourth meeting starts in room 0 for the time period [10,11).
Both rooms 0 and 1 held 2 meetings, so we return 0. 
Example 2:

Input: n = 3, meetings = [[1,20],[2,10],[3,5],[4,9],[6,8]]
Output: 1
Explanation:
- At time 1, all three rooms are not being used. The first meeting starts in room 0.
- At time 2, rooms 1 and 2 are not being used. The second meeting starts in room 1.
- At time 3, only room 2 is not being used. The third meeting starts in room 2.
- At time 4, all three rooms are being used. The fourth meeting is delayed.
- At time 5, the meeting in room 2 finishes. The fourth meeting starts in room 2 for the time period [5,10).
- At time 6, all three rooms are being used. The fifth meeting is delayed.
- At time 10, the meetings in rooms 1 and 2 finish. The fifth meeting starts in room 1 for the time period [10,12).
Room 0 held 1 meeting while rooms 1 and 2 each held 2 meetings, so we return 1. 
 

Constraints:

1 <= n <= 100
1 <= meetings.length <= 105
meetings[i].length == 2
0 <= starti < endi <= 5 * 105
All the values of starti are unique.
*/
//min heap in javascript
class MinHeap {
    constructor(compare) {
        this.data = [];
        this.compare = compare; // custom comparator
    }
    size() { return this.data.length; }
    peek() { return this.data[0]; }
    push(val) {
        this.data.push(val);
        this._bubbleUp(this.data.length - 1);
    }
    pop() {
        if (this.data.length === 0) return undefined;
        const min = this.data[0];
        const last = this.data.pop();
        if (this.data.length > 0) {
            this.data[0] = last;
            this._bubbleDown(0);
        }
        return min;
    }
    _bubbleUp(idx) {
        while (idx > 0) {
            const parent = Math.floor((idx - 1) / 2);
            if (this.compare(this.data[idx], this.data[parent]) < 0) {
                [this.data[idx], this.data[parent]] = [this.data[parent], this.data[idx]];
                idx = parent;
            } else {
                break;
            }
        }
    }
    _bubbleDown(idx) {
        const length = this.data.length;
        while (true) {
            let left = 2 * idx + 1;
            let right = 2 * idx + 2;
            let smallest = idx;
            if (left < length && this.compare(this.data[left], this.data[smallest]) < 0) {
                smallest = left;
            }
            if (right < length && this.compare(this.data[right], this.data[smallest]) < 0) {
                smallest = right;
            }
            if (smallest !== idx) {
                [this.data[idx], this.data[smallest]] = [this.data[smallest], this.data[idx]];
                idx = smallest;
            } else {
                break;
            }
        }
    }
}
//using min heap
function mostBooked(n, meetings) {
    meetings.sort((a, b) => a[0] - b[0]);
    const roomsUsedCount = Array(n).fill(0);

    // MinHeap for used rooms: {endTime, room}
    const usedRooms = new MinHeap((a, b) =>
        a.endTime !== b.endTime ? a.endTime - b.endTime : a.room - b.room
    );
    // MinHeap for unused rooms: just room number
    const unusedRooms = new MinHeap((a, b) => a - b);
    for (let room = 0; room < n; room++) unusedRooms.push(room);

    for (const [start, end] of meetings) {
        // Free up rooms whose meetings have ended by 'start'
        while (usedRooms.size() && usedRooms.peek().endTime <= start) {
            unusedRooms.push(usedRooms.pop().room);
        }

        if (unusedRooms.size()) {
            // Use the smallest available room
            const room = unusedRooms.pop();
            usedRooms.push({ endTime: end, room });
            roomsUsedCount[room]++;
        } else {
            // No rooms are free, pick the one that gets free the earliest
            const earliest = usedRooms.pop();
            const room = earliest.room;
            const newEnd = earliest.endTime + (end - start);
            usedRooms.push({ endTime: newEnd, room });
            roomsUsedCount[room]++;
        }
    }

    // Find the room with the maximum usage
    let resultRoom = 0;
    let maxUse = roomsUsedCount[0];
    for (let room = 1; room < n; room++) {
        if (roomsUsedCount[room] > maxUse) {
            maxUse = roomsUsedCount[room];
            resultRoom = room;
        }
    }
    return resultRoom;
}


// using array accepted by leetcode

/*
Time Complexity
Let:

n = number of meeting rooms

m = number of meetings (i.e., meetings.length)

1. Sorting the meetings
js
Copy
Edit
meetings.sort((a, b) => a[0] - b[0]);
Sorting takes O(m log m) time.

2. Main loop over meetings
js
Copy
Edit
for (const meet of meetings) { ... }
This loop runs m times. Within each iteration:

Room release logic:

usedRooms.sort(...) → at worst, O(n log n)

while loop: can run up to n times per meeting, shifting from the front of usedRooms (which can be O(n) if not optimized with a heap)

Sorting unused rooms:

unusedRooms.sort(...) → O(n log n) worst-case

If no rooms are free:

Again, a sort on usedRooms → O(n log n)

So, worst-case per meeting: O(n log n)

Therefore, total for all m meetings:
O(m * n log n)

Note: This can be improved to O(m log n) with priority queues (min-heaps) for usedRooms and unusedRooms.

3. Final loop to find max-used room
js
Copy
Edit
for (let room = 0; room < n; room++) { ... }
This is O(n)

 Total Time Complexity:
O(m log m + m * n log n)

If heaps were used instead of sorting arrays every time, this would improve to O(m log m + m log n).

Space Complexity
roomsUsedCount: O(n)

usedRooms: up to n rooms used at once → O(n)

unusedRooms: up to n unused rooms → O(n)

meetings: Input, not counted in extra space

 Total Space Complexity:
O(n)


*/

var mostBooked = function (n, meetings) {
    //Sorts all meetings in ascending order by their
    //  start time so we can process them chronologically.

    meetings.sort((a, b) => a[0] - b[0]);
    //Creates an array to count how many times each room is used.
    //Initially, all counts are 0.
    const roomsUsedCount = Array(n).fill(0);
    // usedRooms: [{ endTime, room }]
    //Keeps track of rooms currently in use. Each entry is an object like:
    //{ endTime: <when room is free>, room: <room number> }

    const usedRooms = [];
    // unusedRooms: [room numbers], always sorted ascending
    const unusedRooms = [];
    //Initializes a list of unused (free) rooms with all room numbers 0 to n - 1.
    for (let room = 0; room < n; room++) {
        unusedRooms.push(room);
    }
    for (const meet of meetings) {
        const [start, end] = meet;
        // Release rooms that are free by 'start' time
        // Sort by endTime, then room number
        /*
        Sorts usedRooms to find which room will be free the earliest.
        Primary: by endTime (earlier first)
        Secondary: by room number (smaller first if tie)
        */
        usedRooms.sort((a, b) => a.endTime === b.endTime ? a.room - b.room : a.endTime - b.endTime);
        //Frees up rooms that are no longer in use before or
        //  at the current meeting's start time, and puts them back into unusedRooms.
        while (usedRooms.length && usedRooms[0].endTime <= start) {
            const freed = usedRooms.shift();
            unusedRooms.push(freed.room);
        }
        // Always keep unusedRooms sorted to get the smallest room number
       // Sorts unusedRooms so the smallest numbered room is used first (as required by problem).
        unusedRooms.sort((a, b) => a - b);
        /*
        If a free room is available:
            Assign the meeting to the smallest available room.
            Add it to usedRooms with its end time.
            Increment the usage count for this room.
        */
        if (unusedRooms.length > 0) {
            // Use the smallest available room
            const room = unusedRooms.shift();
            usedRooms.push({ endTime: end, room });
            roomsUsedCount[room]++;
        }
        else {
            // No rooms are free, pick the one that gets free the earliest
            // Sort by endTime, then room number
            /*
            If no room is available:

                Sort usedRooms again to find the earliest ending meeting.
                Pick that room, delay the meeting to start when 
                that room becomes free.
                Compute the new end time: earliest.endTime + duration.
                Add it back to usedRooms and increment its usage count.
            */
            usedRooms.sort((a, b) => a.endTime === b.endTime ? (a.room - b.room) : (a.endTime - b.endTime));
            const earliest = usedRooms.shift();
            const room = earliest.room;
            const newEnd = earliest.endTime + (end - start);
            usedRooms.push({ endTime: newEnd, room });
            roomsUsedCount[room]++;
        }

    }
    // Find the room with the maximum usage

    let resultRoom = -1;
    let maxUse = 0;
    //Loop over all rooms to find the one with the highest usage count.
    //If there's a tie, the one with the smaller index will remain stored.
    for (let room = 0; room < n; room++) {
        if (roomsUsedCount[room] > maxUse) {
            maxUse = roomsUsedCount[room];
            resultRoom = room;
        }
    }
    return resultRoom;
};

//var n = 2, meetings = [[0,10],[1,5],[2,7],[3,4]];
var n = 3, meetings = [[1,20],[2,10],[3,5],[4,9],[6,8]];
let res = mostBooked(n, meetings);
console.log("res booked room==", res)