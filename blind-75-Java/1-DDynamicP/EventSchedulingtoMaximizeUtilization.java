/*
 * Event Scheduling to Maximize Utilization
 * Problem Statement:
You are given a list of events, where each event is defined as a pair of start and end times in 12-hour format with AM/PM, like ("2:30PM", "3:15PM").

You are also given a total time window defined by startWindow and endWindow (also in 12-hour format). You must select a subset of non-overlapping events that fit entirely within the given window, such that the total duration of selected events is maximized.

Return the maximum total duration (in minutes) of such a selection.

Example:
Input:

events = [
    ("2:30PM", "3:15PM"),  // 45 min
    ("3:00PM", "4:00PM"),  // 60 min
    ("1:00PM", "2:00PM"),  // 60 min
    ("4:00PM", "4:30PM")   // 30 min
]

startWindow = "1:00PM"
endWindow = "5:00PM"

135
Explanation:
We can choose:

("1:00PM"–"2:00PM") = 60

("2:30PM"–"3:15PM") = 45

("4:00PM"–"4:30PM") = 30

These do not overlap and are inside the 1–5 PM window.

Total = 135 minutes

Constraints:
1 <= events.length <= 10^4

All time strings are valid.

Events may overlap partially or fully.

Selected events must not overlap and must lie completely within the window.
 * 
*/
/*
 * Approach Summary
Convert events into minutes and filter those inside the window.

Sort events by their end time. This allows binary searching for compatible events.

Use dynamic programming:

For each event, decide if including it along with all compatible events before it provides a better total duration than skipping it.

Binary search to find compatible event efficiently.

Time Complexity:
Converting and filtering events: O(n)

Sorting events by end time: O(n log n)

For each event, binary searching compatible previous event: O(log n) each

Total DP iteration: O(n)

Overall:
O(n log n)

Space Complexity:
Storing event objects: O(n)

DP array: O(n)

Additional arrays and variables: O(n)

Overall:
O(n)
 * 
*/

import java.util.*;

public class EventSchedulingtoMaximizeUtilization {
    //Inner class Event representing an event with start time, 
    //end time, and duration (in minutes).
    static class Event {
        int start, end, duration;
        //Constructor converts time strings (e.g., "2:30PM") 
        //into integer minutes from midnight and computes duration.
        Event(String startStr, String endStr) {
            this.start = convertToMinutes(startStr);
            this.end = convertToMinutes(endStr);
            this.duration = end - start;
            System.out.println("Created Event: start=" + startStr + "(" + this.start + "), end=" + endStr + "(" + this.end + "), duration=" + this.duration);
        }
    }

    // Convert 12-hour time to minutes
    //Helper method to convert 12-hour clock time string 
    //(e.g., "2:30PM") to minutes past midnight.
    //Handles AM/PM properly:
    //Hours mod 12 (because "12:xx" PM is handled as 0 + 12*60).
    //Adds 12 hours worth of minutes if PM.
    static int convertToMinutes(String timeStr) {
        timeStr = timeStr.trim().toUpperCase();
        boolean isPM = timeStr.endsWith("PM");
        timeStr = timeStr.substring(0, timeStr.length() - 2);
        String[] parts = timeStr.split(":");
        int hour = Integer.parseInt(parts[0]) % 12;
        int minute = Integer.parseInt(parts[1]);
        int total = hour * 60 + minute;
        if (isPM) total += 12 * 60;
        return total;
    }

    public int maxTotalDuration(List<String[]> rawEvents, String startWindowStr, String endWindowStr) {
        //Convert input start and end window times into minutes.
        int startWindow = convertToMinutes(startWindowStr);
        int endWindow = convertToMinutes(endWindowStr);
          System.out.println("Scheduling window: " + startWindowStr + "(" + startWindow + ") to " + endWindowStr + "(" + endWindow + ")");
        //Create Event objects from raw input.
        //Filter events that lie fully inside the time window and have a positive duration.
        List<Event> events = new ArrayList<>();
        for (String[] e : rawEvents) {
            Event ev = new Event(e[0], e[1]);
            if (ev.start >= startWindow && ev.end <= endWindow && ev.duration > 0) {
                events.add(ev);
                System.out.println("  Added event within window.");
            }
            else {
                System.out.println("  Skipped event outside window or zero duration.");
            }
        }
        System.out.println("\nSorting events by end time...");

        // Sort by end time
        //Sort events by their end time, which facilitates efficient scheduling and binary searching.
        events.sort(Comparator.comparingInt(e -> e.end));

        // DP: maxDuration[i] = max total duration using first i events
        int n = events.size();
         for (int i = 0; i < events.size(); i++) {
            Event ev = events.get(i);
            System.out.println("Event " + i + ": start=" + ev.start + ", end=" + ev.end + ", duration=" + ev.duration);
        }
        //dp[i] will store the maximum total duration achievable 
        //using the first i events (0-based).
        //ends array records the end times of events (preparation for 
        //binary search, although the code uses List<Event> directly).
        int[] dp = new int[n];
        int[] ends = new int[n]; // for binary search
        //Fill the ends array with end times of events 
        //(you can omit this if you don’t use it further).
        for (int i = 0; i < n; i++) ends[i] = events.get(i).end;
        /*
         * For each event at index i:
            Calculate the duration if we include this event.
            Use binarySearchNonOverlapping to find the rightmost event that ends before this event starts (to avoid overlap).
            If found (idx != -1), add dp[idx] (max duration till that compatible event).
            Choose max between:
            Not taking current event dp[i-1] (max duration till previous event)
            Taking current event plus compatible events include
            Store this maximum in dp[i].
         * 
        */
        for (int i = 0; i < n; i++) {
            System.out.println("\nEvaluating event " + i + " (start=" + events.get(i).start + ", end=" + events.get(i).end + ", duration=" + events.get(i).duration + ")");
            int include = events.get(i).duration;
            int idx = binarySearchNonOverlapping(events, i);
            if (idx != -1) {
                System.out.println("  Last non-overlapping event index: " + idx + " with dp[" + idx + "]=" + dp[idx]);
                include += dp[idx];
            } else {
                System.out.println("  No non-overlapping previous event found.");
            }
            int exclude = i > 0 ? dp[i - 1] : 0;
            dp[i] = Math.max(exclude, include);
            System.out.println("  dp[" + i + "] = max(" + exclude + ", " + include + ") = " + dp[i]);
        }
        //Result: Maximum total duration for all events considered.
        System.out.println("\nMaximum total scheduled duration: " + dp[n - 1]);
        return dp[n - 1];
    }

    // Find the last event that ends before events[i].start
    //Performs binary search to find the latest event 
    //which finishes strictly before the current event’s start time.
    private int binarySearchNonOverlapping(List<Event> events, int i) {
        int low = 0, high = i - 1, res = -1;
        System.out.println("  binarySearchNonOverlapping called for event " + i + " to find last event ending before " + events.get(i).start);
        while (low <= high) {
            int mid = (low + high) / 2;
            System.out.println("    binarySearch checking mid=" + mid + " with event end=" + events.get(mid).end);
            if (events.get(mid).end < events.get(i).start) {
                res = mid;
                System.out.println("    Found non-overlapping event at index " + mid);
                low = mid + 1;
            } else {
                System.out.println("    Event at mid " + mid + " overlaps, moving left");
                high = mid - 1;
            }
        }
        System.out.println("  binarySearchNonOverlapping result: " + res);
        return res;
    }

    // Example usage
    public static void main(String[] args) {
        EventSchedulingtoMaximizeUtilization sol = new EventSchedulingtoMaximizeUtilization();
        List<String[]> events = List.of(
            new String[]{"2:30PM", "3:15PM"},
            new String[]{"3:00PM", "4:00PM"},
            new String[]{"1:00PM", "2:00PM"},
            new String[]{"4:00PM", "4:30PM"}
        );
        String startWindow = "1:00PM";
        String endWindow = "5:00PM";

        System.out.println("\nMaximum duration: " + sol.maxTotalDuration(events, startWindow, endWindow));    }
}

