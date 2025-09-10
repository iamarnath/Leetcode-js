/*
 * Merge Two Intervals and Find Midpoint
Problem Statement
Given two intervals, each represented as a pair of numbers [a, b] and [c, d], write a function to determine if the intervals can be merged (i.e., if they overlap or touch). If they can be merged, return the merged interval as [min(a, c), max(b, d)]. Otherwise, return null.
Additionally, implement a function to find the midpoint of the intersection of the two intervals (if they intersect). If the intersection is empty, return null. For intervals with floating-point endpoints, the midpoint is defined as the average of the intersection's endpoints.
You may assume the intervals can be given in any order (i.e., a may be greater than b, and c may be greater than d). Your function should handle this by first validating and normalizing the intervals.
Example 1
Input:
interval1 = [5, 1], interval2 =[3,7]
Output:
canMerge(interval1, interval2) ->
midpointOfIntersection(interval1, interval2) -> 3.0
Example 2
Input:
interval1 =[1, 2], interval2 =[3,4]
Output:
canMerge(interval1, interval2) -> null
midpointOfIntersection(interval1, interval2) -> null
Example 3
Input:
interval1 = [2.5, 6.5], interval2 = [4.0, 10.0]
Output:
canMerge(interval1, interval2) -> [2.5, 10.0]
midpointOfIntersection(interval1, interval2) -> 5.25
Constraints
•	The intervals may be given in any order.
•	The endpoints can be integers or floating-point numbers.
•	Return null for empty results as described.
==================
What Is Asked?
You are given two intervals. Each interval is defined by 
two numbers, but note that they might be given in either order. For example:

Interval1 might be given as [5, 1] which really represents 
the interval [1, 5].

Interval2 might be given as [3, 7], which is already in order.

You need to do two tasks:

Merge the intervals if they overlap or "touch":
– Two intervals overlap if there is any common point between them.
– They "touch" if the end of one is exactly the beginning of the other.
If they can be merged, you return a new interval that 
starts at the smaller of the two interval's start points 
and ends at the larger of the two end points.
If they do not overlap/touch, you return null.

Find the midpoint of the intersection of the two intervals
 (if they intersect):
– First, compute the intersection by taking the maximum 
of the start points and the minimum of the end points.
– If there is a valid intersection (i.e. the start of the 
intersection is not greater than its end), then the midpoint 
is the average (i.e., 
(start+end)/2).
– If there is no intersection, return null.

Additional Considerations:
Normalization:
Since an interval might be given in the reverse order
 (for example, [5, 1] instead of [1, 5]), you must 
 "normalize" it so that the first element is the smaller number.

Floating-point endpoints:
The endpoints might be non-integer numbers. The 
midpoint, in that case, is defined as the average of the two endpoints.

Return values:

For the merge function: if the intervals overlap or 
touch, return the merged interval as [min(start1, start2),
 max(end1, end2)]; otherwise, return null.

For the midpoint function: if the intervals intersect 
(have overlap), return the midpoint; otherwise, return null.

Example 1:
Input:
Interval1 = [5, 1]
Interval2 = [3, 7]

Normalization:
[5, 1] becomes [1, 5].
[3, 7] is already in order.

Intersection Check:
The intersection is computed by:

Start of intersection: max(1, 3) = 3

End of intersection: min(5, 7) = 5
Since 3 ≤ 5, they overlap.

Merge:
Merge covers all points from min(1, 3)=1 to max(5, 7)=7. So merged interval: [1, 7].
(In the provided sample output, only the midpoint is emphasized; sometimes merge might be taken to mean returning the combined range of both intervals.)

Midpoint:
Midpoint of the intersection [3, 5] is (3 + 5) / 2 = 4.0.
(Note: In the provided example output, they output 3.0 for midpoint; that might be due to a slightly different interpretation (if “touching” was intended to be a merge, sometimes the intersection might be defined differently). But given our solution code, we compute the midpoint based solely on the intersection.)

Example 2:
Input:
Interval1 = [1, 2]
Interval2 = [3, 4]

Normalization:
They are already normalized.

Intersection Check:
Intersection start: max(1, 3)=3, intersection end: min(2, 4)=2.
Since 3 > 2, there is no overlap.

Result:
Both functions return null.

Example 3:
Input:
Interval1 = [2.5, 6.5]
Interval2 = [4.0, 10.0]

Normalization:
Intervals are in order.

Intersection Check:
Intersection start: max(2.5, 4.0)=4.0
Intersection end: min(6.5, 10.0)=6.5
They intersect.

Merge:
Merged interval becomes [min(2.5, 4.0)=2.5, max(6.5, 10.0)=10.0] → [2.5, 10.0].

Midpoint:
Midpoint of intersection [4.0, 6.5] is (4.0 + 6.5)/2 = 5.25.

 * 
*/
package Intervals;

public class MergeTwoIntervalsandFindMidpoint {
    /*
     * Purpose:
     * Ensures that for any given interval, the first element is less
     * than or equal to the second.
     * How it works:
     * If interval[0] is greater than interval[1], swap them. Otherwise,
     * return the interval as-is.
     * 
     * 
     */
    public static double[] normalize(double[] interval) {
        if (interval[0] > interval[1]) {
            return new double[] { interval[1], interval[0] };
        }
        return interval;
    }

    /*
     * Normalization:
     * Both intervals are normalized first.
     * 
     * Overlap Check:
     * The overlap (or touch) is determined by:
     * 
     * start = max(interval1[0], interval2[0])
     * 
     * end = min(interval1[1], interval2[1])
     * If start > end, there is no overlap.
     * 
     * Merge Result:
     * If there is an overlap, return the merged interval:
     * min(interval1[0],interval2[0]),max(interval1[1],interval2[1])
     * 
     */
    public static double[] canMerge(double[] interval1, double[] interval2) {
        interval1 = normalize(interval1);
        interval2 = normalize(interval2);
        double start = Math.max(interval1[0], interval2[0]);
        double end = Math.max(interval1[1], interval2[1]);
        if (start > end) {
            return null;
        }
        return new double[] { Math.min(interval1[0], interval2[0]), Math.max(interval1[1], interval2[1]) };
    }

    /*
     * Normalization:
     * As before, intervals are normalized.
     * Intersection Calculation:
     * Compute the intersection's start and end.
     * Validity Check:
     * If start > end, there is no intersection, so return null.
     * Midpoint Calculation:
     * Otherwise, return the midpoint as (start + end) / 2.0.
     */
    /*
     * Why use Double and not double for the return type?
        double (lowercase) is a primitive type in Java.
        It cannot be null.
        If you try to return null from a method declared to return double, you will get a compile-time error.
        Double (uppercase) is the wrapper class for the primitive double.
        It can be null (i.e., it can represent "no value").
        If you want to be able to indicate "no valid midpoint" (as in your code—when the intervals do not intersect), you need to return null, which is only possible with Double, not with double.
        How to handle cases where you need to return null or a value?
        Use the wrapper types such as Double, Integer, Boolean, etc., for the return type.
        Return the value when available.
        Return null to indicate "no value" or "not applicable".
     * 
    */
    public static Double midpointOfIntersection(double[] interval1, double[] interval2) {
        interval1 = normalize(interval1);
        interval2 = normalize(interval2);
        double start = Math.max(interval1[0], interval2[0]);
        double end = Math.min(interval1[1], interval2[1]);
        if (start > end) {
            return null;
        }
        return (start + end) / 2.0;
    }

    public static void main(String[] args) {
        double[] i1 = { 5, 1 };
        double[] i2 = { 3, 7 };
        double[] merged = canMerge(i1, i2);
        System.out.println("Merged: " + (merged == null ? "null" : "[" + merged[0] + ", " + merged[1] + "]"));
        System.out.println("Midpoint: " + midpointOfIntersection(i1, i2)); // 3.0

        double[] i3 = { 1, 2 };
        double[] i4 = { 3, 4 };
        System.out.println("Merged: "
                + (canMerge(i3, i4) == null ? "null" : "[" + canMerge(i3, i4)[0] + ", " + canMerge(i3, i4)[1] + "]"));
        System.out.println("Midpoint: " + midpointOfIntersection(i3, i4)); // null

        double[] i5 = { 2.5, 6.5 };
        double[] i6 = { 4.0, 10.0 };
        System.out.println("Merged: "
                + (canMerge(i5, i6) == null ? "null" : "[" + canMerge(i5, i6)[0] + ", " + canMerge(i5, i6)[1] + "]"));
        System.out.println("Midpoint: " + midpointOfIntersection(i5, i6)); // 5.25
    }

}
