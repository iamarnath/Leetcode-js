/* 
 * 1964. Find the Longest Valid Obstacle Course at Each Position
 * You want to build some obstacle courses. You are given a 0-indexed
 *  integer array obstacles of length n, where obstacles[i]
 *  describes the height of the ith obstacle.

For every index i between 0 and n - 1 (inclusive), find the
 length of the longest obstacle course in obstacles such that:

You choose any number of obstacles between 0 and i inclusive.
You must include the ith obstacle in the course.
You must put the chosen obstacles in the same order as they 
appear in obstacles.
Every obstacle (except the first) is taller than or the same
 height as the obstacle immediately before it.
Return an array ans of length n, where ans[i] is the length 
of the longest obstacle course for index i as described above.

Example 1:

Input: obstacles = [1,2,3,2]
Output: [1,2,3,3]
Explanation: The longest valid obstacle course at each position is:
- i = 0: [1], [1] has length 1.
- i = 1: [1,2], [1,2] has length 2.
- i = 2: [1,2,3], [1,2,3] has length 3.
- i = 3: [1,2,3,2], [1,2,2] has length 3.
Example 2:

Input: obstacles = [2,2,1]
Output: [1,2,1]
Explanation: The longest valid obstacle course at each position is:
- i = 0: [2], [2] has length 1.
- i = 1: [2,2], [2,2] has length 2.
- i = 2: [2,2,1], [1] has length 1.
Example 3:

Input: obstacles = [3,1,5,6,4,2]
Output: [1,1,2,3,2,2]
Explanation: The longest valid obstacle course at each position is:
- i = 0: [3], [3] has length 1.
- i = 1: [3,1], [1] has length 1.
- i = 2: [3,1,5], [3,5] has length 2. [1,5] is also valid.
- i = 3: [3,1,5,6], [3,5,6] has length 3. [1,5,6] is also valid.
- i = 4: [3,1,5,6,4], [3,4] has length 2. [1,4] is also valid.
- i = 5: [3,1,5,6,4,2], [1,2] has length 2.

Constraints:

n == obstacles.length
1 <= n <= 105
1 <= obstacles[i] <= 107
*/
/*
Approach Summary:
The algorithm maintains a structure (LIS) representing the 
minimum last element of a non-decreasing subsequence of 
a given length seen so far.
For each obstacle:
Use binary search to find where it fits in LIS
 (which subsequence length it could extend).
Replace or add to keep the smallest possible 
element for that length.
The length of the subsequence ending at each 
position is the index found + 1.
This approach efficiently calculates the length
 of the longest non-decreasing subsequence ending at each index.
 
 * Time Complexity:
For each of the n obstacles, you perform a 
binary search on LIS which is at most length n.
Binary search: O(log n)
Loop through n elements.
Overall time complexity: O(n log n)

Space Complexity:
The output array result uses O(n) space.
LIS list can grow up to size n in the worst case.
Overall space complexity: O(n)
 * 
*/
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class FindLongestValidObstacleCourseatEachPosition1964 {
    public int[] longestObstacleCourseAtEachPosition(int[] obstacles) {
        int n = obstacles.length;
        //Create an output array result of the same size as obstacles.
        //result[i] will hold the length of the longest valid obstacle
        // course ending at index i.
        int[] result = new int[n];
        //This list stores an evolving sequence that helps track
        // the lengths of the longest non-decreasing subsequences.
//LIS here doesn't store a real subsequence, but it's used to
// determine the length efficiently by holding the smallest possible end values for subsequences of different lengths.
        List<Integer> LIS = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            //For readability, store the current obstacle in obs.
            int obs = obstacles[i];
            //Use binary search (upperBound) to find the position in LIS where obs should be placed.
            //This position corresponds to the length of the longest course ending here.
            //In detail: upperBound finds the first index where an element > obs would be inserted.
            int idx = upperBound(LIS, obs);
            //If the position is at the end of LIS, append the new obstacle.
            //Otherwise, replace the element at that 
            //position with the current obstacle.
            //This ensures LIS keeps the smallest possible values
            // at each length, helping the binary search logic.
            if (idx == LIS.size()) {
                LIS.add(obs);
            } else {
                LIS.set(idx, obs);
            }
            //The position idx is zero-based, so add 1 to get the
            // length of the longest course ending at i and 
            //store in result[i].
            result[i] = idx + 1;
        }
        return result;
    }
    /*
     * Finds the index of the first element in list greater than key.
    Uses binary search on the list.
    The condition list.get(mid) <= key means we skip over elements less than or equal to key, so find the first element strictly greater.
    Returns the position for insertion such that the list remains sorted.
     * 
    */
    private int upperBound(List<Integer> list, int key) {
        int low = 0, high = list.size();
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (list.get(mid) <= key) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        return low;
    }

    public static void main(String[] args) {
        int[] obstacles = { 3, 1, 5, 6, 4, 2 };
        FindLongestValidObstacleCourseatEachPosition1964 sol = new FindLongestValidObstacleCourseatEachPosition1964();
        int[] result = sol.longestObstacleCourseAtEachPosition(obstacles);
//         System.out.println("longestObstacleCourseAtEachPosition  " + result.toString());
// this will print something like [I@1a2b3c4 because calling toString() on an array prints its memory address, not its contents.
        System.out.println("longestObstacleCourseAtEachPosition  " + Arrays.toString(result));
    }
}
