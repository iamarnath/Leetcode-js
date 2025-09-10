/*
 * 1235. Maximum Profit in Job Scheduling
 * We have n jobs, where every job is scheduled to be done
 *  from startTime[i] to endTime[i], obtaining a profit of profit[i].

You're given the startTime, endTime and profit arrays,
 return the maximum profit you can take such that there
  are no two jobs in the subset with overlapping time range.

If you choose a job that ends at time X you will 
be able to start another job that starts at time X.

Example 1:

Input: startTime = [1,2,3,3], endTime = [3,4,5,6], profit = [50,10,40,70]
Output: 120
Explanation: The subset chosen is the first and fourth job. 
Time range [1-3]+[3-6] , we get profit of 120 = 50 + 70.
Example 2:



Input: startTime = [1,2,3,4,6], endTime = [3,5,10,6,9], profit = [20,20,100,70,60]
Output: 150
Explanation: The subset chosen is the first, fourth and fifth job. 
Profit obtained 150 = 20 + 70 + 60.
Example 3:

Input: startTime = [1,1,1], endTime = [2,3,4], profit = [5,6,4]
Output: 6
 
Constraints:

1 <= startTime.length == endTime.length == profit.length <= 5 * 104
1 <= startTime[i] < endTime[i] <= 109
1 <= profit[i] <= 104
 * 
*/
/*
 * Approach Explanation:
Sort jobs by start time, allowing efficient querying of the 
next non-overlapping job.
Use recursion + memoization:
At each job i, decide whether to:
Take the job and add its profit plus the profit from the next valid job.
Skip the job and move to the next job.
Use binary search in getNextIndex to quickly find the next job that doesn't overlap.
Choose the option that yields max profit.

Time Complexity:
Sorting jobs by start time: O(n log n)
For each job, binary search for next job: O(log n)
Memoized recursion ensures each job’s max profit is computed once: O(n)
Total complexity:
O(n log n) (for sorting) + O(n log n) (for binary searches) = O(n log n)

Space Complexity:
Input storage: O(n) for combined array
Memo array: O(n)
Recursion stack depth: O(n) in worst case
Total space: O(n)

 * 
*/
package Recursion;

import java.util.Arrays;
import java.util.Comparator;

public class MaximumProfitinJobScheduling1235 {
    // memo: An array for memoization to store maximum profit achievable starting
    // from each job index.
    // n: Number of jobs.
    private int[] memo;
    private int n;

    /*
     * //getNextIndex finds the index of the next job (from index l to end)
     * //whose start time is >= the ending time of the current job (currentJobEnd).
     * private int getNextIndex(int[][] array, int l, int currentJobEnd) {
     * //Typical binary search initialization: left = l, right = n-1.
     * int r = n - 1;
     * //result initialized with n+1 to represent no valid next job found yet.
     * int result = n + 1;
     * while (l <= r) {
     * int mid = l + (r - l) / 2;
     * // we can take this task
     * //If mid job starts after or exactly when current job ends,
     * // update result to mid and search to the left for a
     * //potentially earlier valid job.
     * if (array[mid][0] >= currentJobEnd) {
     * result = mid;
     * r = mid - 1;
     * } else {
     * //Otherwise, move right (l = mid + 1) to find a valid job.
     * l = mid + 1;
     * }
     * }
     * 
     * //Return the found job index or an index that indicates no next job
     * available.
     * return result;
     * }
     * 
     * private int solve(int[][] array, int i) {
     * // Base condition: If job index i is out of range,
     * // no more profit can be gained.
     * if (i >= n) {
     * return 0;
     * }
     * //If already computed memo[i], return the result to avoid recomputation
     * (memoization).
     * if (memo[i] != -1) {
     * return memo[i];
     * }
     * //Find the next job index whose start time is after or equal to the current
     * job's end time.
     * int next = getNextIndex(array, i + 1, array[i][1]);
     * //Calculate profit if we take the current job plus the maximum profit from
     * the next suitable job onward.
     * int taken = array[i][2] + solve(array, next);
     * // Calculate profit if we skip the current job and try from the next job.
     * int notTaken = solve(array, i + 1);
     * //Store and return the maximum profit achievable by either taking or skipping
     * the current job.
     * return memo[i] = Math.max(taken, notTaken);
     * }
     * 
     * public int jobScheduling(int[] startTime, int[] endTime, int[] profit) {
     * //Initialize number of jobs and memo array.
     * n = startTime.length;
     * memo = new int[n];
     * Arrays.fill(memo, -1);
     * int[][] array = new int[n][3];// {start,end,profit}
     * //Combine job properties into a single array to facilitate sorting.
     * for (int i = 0; i < n; i++) {
     * array[i][0] = startTime[i];
     * array[i][1] = endTime[i];
     * array[i][2] = profit[i];
     * }
     * //Sort the jobs by start time. This allows binary searching for the next
     * valid job.
     * Arrays.sort(array, Comparator.comparingInt(vec -> vec[0]));
     * //Start recursive profit calculation from the first job after sorting.
     * return solve(array, 0);
     * }
     */
    /*
     * Finds the rightmost job (largest index) whose end
     * time <= end (which is the start time of the current job).
     * This ensures you pick the last compatible job that
     * doesn’t overlap, which allows stacking profits.
     * 
     */
    private int binarySearch(int[][] jobs, int end, int left, int right) {
        int result = -1;
        System.out.println("binarySearch called with end = " + end + ", left = " + left + ", right = " + right);
        while (left <= right) {
            int mid = left + (right - left) / 2;
            System.out.println("  mid = " + mid + ", jobs[mid][endTime] = " + jobs[mid][1]);
            if (jobs[mid][1] <= end) {
                result = mid;
                System.out.println("  jobs[mid][1] <= end, result updated to " + result);
                left = mid + 1;
            } else {
                System.out.println("  jobs[mid][1] > end, adjusting right to " + (mid - 1));
                right = mid - 1;
            }
        }
        System.out.println("binarySearch returning " + result);

        return result;
    }

    public int jobSchedulingDP(int[] startTime, int[] endTime, int[] profit) {
        int n = startTime.length;
        int[][] jobs = new int[n][3];
        System.out.println("Building jobs array:");

        for (int i = 0; i < n; i++) {
            jobs[i][0] = startTime[i];
            jobs[i][1] = endTime[i];
            jobs[i][2] = profit[i];
            System.out
                    .println("  Job " + i + ": start=" + jobs[i][0] + ", end=" + jobs[i][1] + ", profit=" + jobs[i][2]);
        }
        // This sorting helps us easily find which
        // jobs finish before others start, enabling efficient scheduling.
        Arrays.sort(jobs, Comparator.comparingInt(m -> m[1]));
        System.out.println("\nJobs array after sorting by end time:");
        for (int i = 0; i < n; i++) {
            System.out.println("  Job " + i + ": start=" + jobs[i][0] + ", end=" + jobs[i][1] + ", profit=" + jobs[i][2]);
        }
        // Use DP array dp, where dp[i] stores the maximum profit
        // achievable considering jobs up to index i
        // (after sorting by end time):
        int[] dp = new int[n];
        dp[0] = jobs[0][2];
        System.out.println("\nInitializing dp array:");
        System.out.println("  dp[0] = " + dp[0]);
        // For each job i from 1 to n-1:
        // Find the last job that
        // finishes at or before the start time of the current job i:
        for (int i = 1; i < n; i++) {
            int prev = 0;

            /*
             * The binarySearch method does this efficiently.
             * It searches jobs in the range [0, i-1] for the job whose
             * end time is the largest that is <= the current job's
             * start time.
             * If such a job is found (lastJobIndex != -1), then:
             * prev = dp[lastJobIndex] is the best profit
             * we can have including that job.
             * Otherwise prev = 0.
             * Now, update dp[i] as the best between:
             * Taking the current job and adding its profit to prev
             * (non-overlapping condition satisfied).
             * Not taking the current job, so profit remains dp[i-1]
             * (best profit until previous job).
             * 
             */
            System.out.println("\nProcessing job " + i + ": start=" + jobs[i][0] + ", end=" + jobs[i][1] + ", profit="
                    + jobs[i][2]);
            int lastJobIndex = binarySearch(jobs, jobs[i][0], 0, i - 1);

            if (lastJobIndex != -1) {
                prev = dp[lastJobIndex];
                System.out.println(
                        "  Last compatible job index: " + lastJobIndex + ", dp[" + lastJobIndex + "] = " + prev);
            } else {
                System.out.println("  No compatible previous job found.");
            }

            dp[i] = Math.max(prev + jobs[i][2], dp[i - 1]);
            System.out
                    .println("  dp[" + i + "] = max(" + prev + " + " + jobs[i][2] + ", " + dp[i - 1] + ") = " + dp[i]);
        }
        System.out.println("\nMaximum profit = " + dp[n - 1]);

        return dp[n - 1];
    }

    public static void main(String[] args) {
        int[] startTime = { 1, 2, 3, 3 };
        int[] endTime = { 3, 4, 5, 6 };
        int[] profit = { 50, 10, 40, 70 };
        MaximumProfitinJobScheduling1235 sol = new MaximumProfitinJobScheduling1235();
        int result = sol.jobSchedulingDP(startTime, endTime, profit);
        System.out.println("result ==" + result);
    }
}

/*
 * Visualization Example
Let's consider these jobs with (start, end, profit):

Job	Start	End	Profit
0	1	    3	50
1	2	    5	20
2	4	    6	70
3	6	    7	60
4	5	    8	30
Step 1: Sort by end time
Sorted jobs by end time:

Index	Start	End	Profit
0	    1	    3	50
1	    2	    5	20
2	    4	    6	70
3	    6	    7	60
4	    5	    8	30
Step 2: DP array initialization
dp = 50 (only job 0)

Step 3: Fill dp for each job
Job 1 (index 1):

Find last compatible job with end <= start(2) = 2.

Using binarySearch on jobs[0..0], end times:

3 > 2, no compatible job found -> lastJobIndex = -1.

dp = max(profit + 0, dp) = max(20 + 0, 50) = 50.

Job 2 (index 2):

Find last job with end <= start(4) = 4.

Search jobs[0..1] end times:

Job 0 end=3 <=4 (candidate), job 1 end=5 >4 (not candidate)

Last compatible job index = 0.

dp = max(profit + dp, dp) = max(70 + 50, 50) = 120.

Job 3 (index 3):

Find last job end <= start(6) = 6.

Search jobs[0..2]: end times

Job 2 end=6 <=6 compatible, last compatible = 2.

dp = max(profit + dp, dp) = max(60 + 120, 120) = 180.

Job 4 (index 4):

Find last job end <= start(5) = 5.

Search jobs[0..3]: end times

Jobs 0 (3) and 1 (5) qualify, last compatible = 1.

dp = max(profit + dp, dp) = max(30 + 50, 180) = 180.

Final dp array:
i	dp[i]
0	50
1	50
2	120
3	180
4	180
Answer: 180
 * 
 * 
*/