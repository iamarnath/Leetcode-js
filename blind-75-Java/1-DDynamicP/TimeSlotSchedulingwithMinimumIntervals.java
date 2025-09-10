/*
 * Problem Statement:
You are given a list of timeSlots, where each element is a string representing a time duration in 12-hour format with AM/PM, like "2:30PM" or "11:45AM". These represent the start times of optional events, and all events have a fixed duration of 15 minutes.

You are also given a targetDuration in minutes.

Your task is to determine the minimum number of events (from the list) needed to exactly fill the targetDuration (like filling a time slot), or return -1 if it's impossible.

Format of the Time Slots:
Input strings are in "h:mmAM" or "h:mmPM" format.

Times are not necessarily sorted, and you can reuse the same time slot multiple times (like coin change).

Example:
Input:
java
Copy
Edit
timeSlots = ["2:30PM", "11:45AM", "1:00PM", "3:15PM"]
targetDuration = 60
Output:
java
Copy
Edit
4
Explanation:
Each event is 15 minutes. To reach 60 minutes, we need 4 events.
The number of distinct time strings doesn’t matter — we only care about how many 15-min intervals can add up to the target.

Constraints:
1 <= timeSlots.length <= 10^4

All time strings are valid 12-hour formats.

1 <= targetDuration <= 10^4

You can reuse the same time slot any number of times.
 * 
*/
/*
 * Time Complexity
Let:

n = number of timeSlots

targetDuration = total time in minutes (input)

targetUnits = targetDuration / 15 (the actual number of DP states)

Loops:

Outer loop iterates over i = 1 ... targetUnits → O(targetUnits)

Inner loop iterates over timeSlots → O(n)

So the total iterations:
O(n * targetUnits)

Since targetUnits = targetDuration / 15,
=> Time Complexity: O(n * (targetDuration / 15))

Space Complexity
DP Array of length (targetUnits + 1): O(targetUnits) space.

No other significant extra data structures.

So in terms of the variables:

Space Complexity: O(targetDuration / 15)

Summary Table
Resource	Complexity
Time	O(n * (targetDuration / 15))
Space	O(targetDuration / 15)
 * 
*/

import java.util.*;

// public class TimeSlotSchedulingwithMinimumIntervals {
//     // Converts 12-hour time string to minutes from 00:00
//     private int convertToMinutes(String timeStr) {
//         System.out.println("Converting time string: " + timeStr);
//         timeStr = timeStr.trim().toUpperCase();
//         boolean isPM = timeStr.endsWith("PM");
//         timeStr = timeStr.substring(0, timeStr.length() - 2); // remove AM/PM
//          System.out.println("Trimmed & uppercased: " + timeStr + ", isPM: " + isPM);
//         String[] parts = timeStr.split(":");
//         int hour = Integer.parseInt(parts[0]);
//         int minute = Integer.parseInt(parts[1]);
//         System.out.println("Hour: " + hour + ", Minute: " + minute);

//         if (hour == 12) hour = 0; // 12AM or 12PM edge case
//         int total = hour * 60 + minute;
//         if (isPM) total += 12 * 60;
//         System.out.println("Converted to minutes: " + total);
//         return total;
//     }

//     public int minEventsToFillDuration(String[] timeSlots, int targetDuration) {
//         System.out.println("Received timeSlots: " + Arrays.toString(timeSlots));
//         System.out.println("Target duration: " + targetDuration);
//         if (targetDuration % 15 != 0) {
//             System.out.println("Target duration not divisible by 15!");
//             return -1; // Must be divisible by 15
//         }

//         int eventUnit = 15;
//         int targetUnits = targetDuration / eventUnit;
//         System.out.println("Event unit: " + eventUnit + " Target units: " + targetUnits);
//         // Standard coin change DP where each time slot is worth 1 "coin"
//         int[] dp = new int[targetUnits + 1];
//         Arrays.fill(dp, Integer.MAX_VALUE);
//         dp[0] = 0;
//         System.out.println("Initialized DP array: " + Arrays.toString(dp));

//         for (int i = 1; i <= targetUnits; i++) {
//             System.out.println("\nChecking DP for targetUnits i = " + i);

//             for (String time : timeSlots) {
//                 int cost = 1; // each event is 15 minutes = 1 unit
//                  System.out.println("  Comparing time slot: " + time + ", cost: " + cost);
//                 // if (i >= cost && dp[i - cost] != Integer.MAX_VALUE) {
//                 //     dp[i] = Math.min(dp[i], dp[i - cost] + 1);
//                 // }
//                 if (i >= cost && dp[i - cost] != Integer.MAX_VALUE) {
//                     int possible = dp[i - cost] + 1;
//                     System.out.println("    Possible: dp[" + (i - cost) + "] + 1 = " + possible);
//                     if (possible < dp[i]) {
//                         System.out.println("    Updating dp[" + i + "] from " + dp[i] + " to " + possible);
//                         dp[i] = possible;
//                     }
//                 } else {
//                     System.out.println("    Not enough units or no valid previous state: dp[" + (i - cost) + "]");
//                 }
//             }
//         }
//  System.out.println("\nFinal DP: " + Arrays.toString(dp));
//         int result = (dp[targetUnits] == Integer.MAX_VALUE ? -1 : dp[targetUnits]);
//         System.out.println("Min events to fill duration: " + result);
//         return result;
//         //return dp[targetUnits] == Integer.MAX_VALUE ? -1 : dp[targetUnits];
//     }

//     // Example usage
//     public static void main(String[] args) {
//         TimeSlotSchedulingwithMinimumIntervals sol = new TimeSlotSchedulingwithMinimumIntervals();
//            String timeString = "2:30PM";
//     int minutes = sol.convertToMinutes(timeString);
//     System.out.println("convertToMinutes  for " + timeString + " = " + minutes);

//         String[] timeSlots = {"2:30PM", "11:45AM", "1:00PM", "3:15PM"};
//         int targetDuration = 60;

//  System.out.println("Result: " + sol.minEventsToFillDuration(timeSlots, targetDuration));    }
// }



public class TimeSlotSchedulingwithMinimumIntervals {
    // Converts 12-hour time string to minutes from 00:00
    private int convertToMinutes(String timeStr) {
        timeStr = timeStr.trim().toUpperCase();
        if (!timeStr.matches("(1[0-2]|0?[1-9]):[0-5][0-9](AM|PM)")) {
            System.out.println("Invalid time format: " + timeStr);
            return -1; // signal invalid time format
        }

        boolean isPM = timeStr.endsWith("PM");
        timeStr = timeStr.substring(0, timeStr.length() - 2);

        String[] parts = timeStr.split(":");
        int hour = Integer.parseInt(parts[0]);
        int minute = Integer.parseInt(parts[1]);

        if (hour == 12)
            hour = 0; // handle 12 AM or PM edge case
        int total = hour * 60 + minute;
        if (isPM)
            total += 12 * 60;
        return total;
    }

    public int minEventsToFillDuration(String[] timeSlots, int targetDuration) {
        System.out.println("Input timeSlots: " + Arrays.toString(timeSlots));
        System.out.println("Target duration: " + targetDuration);

        if (targetDuration % 15 != 0) {
            System.out.println("Target duration not divisible by 15!");
            return -1;
        }

        // Convert and validate times
        List<Integer> eventTimes = new ArrayList<>();
        for (String slot : timeSlots) {
            int mins = convertToMinutes(slot);
            if (mins == -1) {
                System.out.println("Skipping invalid time slot: " + slot);
                continue; // skip invalid slots, alternatively return -1 if strict checking desired
            }
            eventTimes.add(mins);
        }

        if (eventTimes.isEmpty()) {
            System.out.println("No valid time slots available.");
            return -1;
        }

        // Sort converted times to check ordering
        Collections.sort(eventTimes);
            System.out.println("eventTimes =="+ eventTimes);

        // Check for duplicates or overlaps (strictly increasing)
        for (int i = 1; i < eventTimes.size(); i++) {
            if (eventTimes.get(i) <= eventTimes.get(i - 1)) {
                System.out.println("Time slots overlap or not strictly increasing: "
                        + eventTimes.get(i - 1) + " and " + eventTimes.get(i));
                return -1;
            }
        }

        int eventUnit = 15;
        int targetUnits = targetDuration / eventUnit;
        System.out.println("Event unit: " + eventUnit + ", Target units: " + targetUnits);

        // DP array: dp[i] = minimum events to reach i units of 15 minutes
        int[] dp = new int[targetUnits + 1];
        Arrays.fill(dp, Integer.MAX_VALUE);
        dp[0] = 0;

        // Since all events cost exactly one 15-minute unit as per original logic,
        // use the count of slots as possible coins with cost = 1.
        // (This means the actual times are validated and ordered but duration cost
        // remains 1)
        for (int i = 1; i <= targetUnits; i++) {
            for (int ignored : eventTimes) {
                int cost = 1;
                if (i >= cost && dp[i - cost] != Integer.MAX_VALUE) {
                    dp[i] = Math.min(dp[i], dp[i - cost] + 1);
                }
            }
        }
        System.out.println("dp table"+dp);
        if (dp[targetUnits] == Integer.MAX_VALUE) {
            System.out.println("Cannot fill target duration with given time slots.");
            return -1;
        }

        System.out.println("Minimum events required: " + dp[targetUnits]);
        return dp[targetUnits];
    }

    // Example main for test
    public static void main(String[] args) {
        TimeSlotSchedulingwithMinimumIntervals sol = new TimeSlotSchedulingwithMinimumIntervals();
        // example 1

        // String[] timeSlots = {"2:30PM", "11:45AM", "1:00PM", "3:15PM"};
        String[] timeSlots = {"2:30PM", "11:45AM", "1:00PM", "3:15PM"};
        int targetDuration = 60;

        System.out.println("Result: " + sol.minEventsToFillDuration(timeSlots,
        targetDuration));

        // example 2

        // String[] invalidFormat = {"2:30PM", "11:75AM", "random"};
        // int targetDuration = 45;
        // System.out.println("Invalid format test: " +
        // sol.minEventsToFillDuration(invalidFormat, targetDuration));

        // example 3

        // String[] timeSlots = {"2:30PM", "11:45AM", "1:00PM"};
        // int targetDuration = 43; // Not divisible by 15
        // System.out.println("Non-divisible duration test: " +
        // sol.minEventsToFillDuration(timeSlots, targetDuration));

        // example 4

        // String[] allInvalid = {"bad", "noon", "og:ogPM", "12345"};
        // int targetDuration = 15;
        // System.out.println("All invalid input test: " +
        // sol.minEventsToFillDuration(allInvalid, targetDuration));

        // example 5

        // String[] withDuplicates = {"2:30PM", "2:30PM", "3:15PM"};
        // int targetDuration = 30;
        // System.out.println("Duplicate slot test: " +
        // sol.minEventsToFillDuration(withDuplicates, targetDuration));
        // example 6
        // String[] slots = { "2:30PM" }; // Only one 15-min possible
        // int targetDuration = 30;
        // System.out.println("Not enough slots: " + sol.minEventsToFillDuration(slots, targetDuration));

    }
}
