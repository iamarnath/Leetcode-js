/*
729. My Calendar I

Solution - https://leetcode.com/problems/my-calendar-i/solutions/5111689/optimised/

Description
You are implementing a program to use as your calendar. We can add a new event if adding the event will not cause a double booking.

A double booking happens when two events have some non-empty intersection (i.e., some moment is common to both events.).

The event can be represented as a pair of integers start and end that represents a booking on the half-open interval [start, end), the range of real numbers x such that start <= x < end.

Implement the MyCalendar class:

MyCalendar() Initializes the calendar object.
boolean book(int start, int end) Returns true if the event can be added to the calendar successfully without causing a double booking. Otherwise, return false and do not add the event to the calendar.
 

Example 1:

Input
["MyCalendar", "book", "book", "book"]
[[], [10, 20], [15, 25], [20, 30]]
Output
[null, true, false, true]

Explanation
MyCalendar myCalendar = new MyCalendar();
myCalendar.book(10, 20); // return True
myCalendar.book(15, 25); // return False, It can not be booked because time 15 is already booked by another event.
myCalendar.book(20, 30); // return True, The event can be booked, as the first event takes every time less than 20, but not including 20.
 

Constraints:

0 <= start < end <= 109
At most 1000 calls will be made to book.


Time Complexity:
MyCalendar Constructor: The constructor function MyCalendar initializes the calendar array. Its time complexity is O(1) as it performs a constant-time operation.
book Method:
The book method iterates through each already booked event in the calendar to check for overlaps with the new event.
The time complexity of the book method is O(n), where n is the number of events already booked in the calendar.
The loop that iterates through the existing events contributes to the linear time complexity of the function.

The approach used in the MyCalendar class and its book method is as follows:
Calendar Representation:
The MyCalendar class uses an array calendar to store the booked events.
Each event is represented as an array [start, end], where start is the start time of the event, and end is the end time of the event.
Booking a New Event:
The book method takes two parameters: start and end, which represent the start and end times of the new event to be booked.
The method iterates through the existing events in the calendar array.
For each existing event, the method checks if the new event overlaps with the existing event by checking the condition end > item && start < item.
If the condition is true, it means the new event overlaps with the existing event, and the method returns false to indicate that the booking is not possible.
If the new event does not overlap with any existing event, the method adds the new event to the calendar array and returns true to indicate that the booking was successful.
Overlap Checking:
The condition end > item && start < item is used to check if the new event overlaps with an existing event.
This condition checks if the end time of the new event is greater than the start time of the existing event (indicating that the new event starts before the existing event ends) and if the start time of the new event is less than the end time of the existing event (indicating that the new event ends after the existing event starts).
If both conditions are true, it means the new event overlaps with the existing event, and the booking cannot be made.
*/

var MyCalendar = function() {
    this.calendar = [];
};
MyCalendar.prototype.book = function(start, end) {
    // Iterate through each already booked event in the calendar.
    for(const item of this.calendar){
        //This condition checks if the end time of the new event is greater than the start time of the existing event
        // (indicating that the new event starts before the existing event ends) and 
        //if the start time of the new event is less than the end time of the existing event
        // (indicating that the new event ends after the existing event starts).
        //If both conditions are true, it means the new event overlaps with the existing event, and the booking cannot be made.

        if(end > item[0] && start < item[1]){
            return false;
        }
    }
    this.calendar.push([start, end]);
    return true;
};
/*
[10, 20], [15, 25],[20,30]
(15, 25)
item[0] = 10 
item[1] = 20
start = 15
end=25

25>10 =>true//end > item[0]
15<20=>true//start < item[1]
so it returns true//overlap


(20, 30)
30>10 =>true //end > item[0]
20>20 =>false //start < item[1]
*/
var obj = new MyCalendar();
var param_1 = obj.book(10,20);
console.log(param_1);
var param_2 = obj.book(15,25);
console.log(param_2);
var param_3 = obj.book(20,30);
console.log(param_3);

