/*
 698. Partition to K Equal Sum Subsets

Given an integer array nums and an integer k, 
return true if it is possible to divide this array 
into k non-empty subsets whose sums are all equal.
Example 1:

Input: nums = [4,3,2,3,5,2,1], k = 4
Output: true
Explanation: It is possible to divide it into 4 subsets (5), (1, 4), (2,3), (2,3) with equal sums.
Example 2:

Input: nums = [1,2,3,4], k = 3
Output: false
 

Constraints:

1 <= k <= nums.length <= 16
1 <= nums[i] <= 104
The frequency of each element is in the range [1, 4].
  
*/

package Backtracking;

import java.util.Arrays;

public class PartitiontoKEqualSumSubsets698 {
    private boolean[] used;
    private int target;
    private int n;

    public boolean canPartitionKSubsets(int[] nums, int k) {
        int sum = 0;
        for (int num : nums) {
            sum += num;
        }
        if (sum % k != 0) {
            return false;
        }
        this.target = sum / k;
        this.n = nums.length;
        Arrays.sort(nums);
        for (int i=0; i < n / 2; i++) {
            int tmp = nums[i];
            nums[i] = nums[n - i - 1];
            nums[n - i - 1] = tmp;
        }
        // Early pruning: if largest > target
        if (nums[0] > target) return false;
        used = new boolean[n];
        return dfs(nums, k, 0, 0);
    }

    private boolean dfs(int[] nums, int k, int currentSum, int start) {
        if (k == 0) {
            return true;
        }
        if (currentSum == target) {
            return dfs(nums, k - 1, 0, 0);
        }
        for (int i = start; i < n; i++) {
            if (used[i] || currentSum + nums[i] > target) {
                continue;
            }
            // SKIP duplicate value at this level if previous index was not used.
            if (i > 0 && !used[i - 1] && nums[i] == nums[i - 1]) continue;
            used[i] = true;
            if (dfs(nums, k, currentSum + nums[i], i + 1)) {
                return true;
            }
            used[i] = false;
        }
        return false;
    }

    public static void main(String[] args) {
        int[] nums = { 4, 3, 2, 3, 5, 2, 1 };
        int k = 4;
        PartitiontoKEqualSumSubsets698 sol = new PartitiontoKEqualSumSubsets698();
        boolean res = sol.canPartitionKSubsets(nums,k);
        System.out.println("partition " + res);
    }
}


/*
class PartitiontoKEqualSumSubsets698 {
    constructor() {
        this.used = [];         // Array to track used elements
        this.target = 0;        // Target sum for each subset
        this.n = 0;             // Length of nums
    }

    canPartitionKSubsets(nums, k) {
        let sum = 0;
        //Calculates the sum of all numbers.
        for (let num of nums) {
            sum += num;
        }
        //If the total cannot be evenly divided by k,
        // returning false immediately (impossible to partition).
        if (sum % k !== 0) {
            return false;
        }
        //Computes target sum per subset.
        this.target = sum / k;
        this.n = nums.length;
        //Sorts the array in descending order for efficiency (big numbers first).
        nums.sort((a, b) => b - a); // Sort descending

        // Early pruning: if largest > target
        if (nums[0] > this.target) return false;
        //Initializes used array.
        this.used = new Array(this.n).fill(false);
        //Starts depth-first search (DFS) to find valid partitioning.
        return this.dfs(nums, k, 0, 0);
    }

    dfs(nums, k, currentSum, start) {
        //If k subsets have been completed, the task is done.
        if (k === 0) {
            return true;
        }
        //If the current subset is filled, start next subset.
        //Subset completion: If the current running sum (currentSum)
        // equals the target, we've filled one subset. 
        //So, reduce k by 1 and start filling the next subset
        // (reset currentSum to 0 and start to 0 to consider 
        //all numbers again).
        if (currentSum === this.target) {
            return this.dfs(nums, k - 1, 0, 0);
        }
        //For each unused number, if it fits, try to add it.
        //Iterate through numbers: Try to add 
        //each unused number to the current subset, starting from index start.
        for (let i = start; i < this.n; i++) {
            //this.used[i] ensures the number hasn't already been
            // placed in a subset.
            //If adding nums[i] would exceed the target, skip it.
            if (this.used[i] || currentSum + nums[i] > this.target) {
                continue;
            }
            //For each unused number, if it fits, try to add it.
            // Skip duplicate at this level if previous index wasn't used
            //Duplicate Skip: Prevents trying the same number in the same position 
            //if the previous identical number was not used at this level 
            //(optimizes search by avoiding redundant combinations).
            if (i > 0 && !this.used[i - 1] && nums[i] === nums[i - 1]) continue;
            this.used[i] = true;
            // Mark number as used and attempt to continue DFS with
            // updated currentSum and i + 1 (to avoid reusing the same
            // number at a lower index).
            if (this.dfs(nums, k, currentSum + nums[i], i + 1)) {
                return true;
            }
            //Backtrack: If the recursive call fails, revert the used state to allow for other combinations.
            this.used[i] = false;
        }
        return false;
    }
}

// Example usage:
const nums = [4, 3, 2, 3, 5, 2, 1];
const k = 4;
const sol = new PartitiontoKEqualSumSubsets698();
const res = sol.canPartitionKSubsets(nums, k);
console.log("partition", res);
 
 
*/