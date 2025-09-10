/*
 * 410. Split Array Largest Sum
 * Given an integer array nums and an integer k, split
 *  nums into k non-empty subarrays such that the largest
 *  sum of any subarray is minimized.

Return the minimized largest sum of the split.

A subarray is a contiguous part of the array.

Example 1:

Input: nums = [7,2,5,10,8], k = 2
Output: 18
Explanation: There are four ways to split nums into two subarrays.
The best way is to split it into [7,2,5] and [10,8], where 
the largest sum among the two subarrays is only 18.
Example 2:

Input: nums = [1,2,3,4,5], k = 2
Output: 9
Explanation: There are four ways to split nums into two subarrays.
The best way is to split it into [1,2,3] and [4,5],
 where the largest sum among the two subarrays is only 9.
 
Constraints:

1 <= nums.length <= 1000
0 <= nums[i] <= 106
1 <= k <= min(50, nums.length)
 * 
*/
/*
 * Time Complexity
There are two main parts:

Binary search loop:
The search range is from the largest element to the sum of all elements (let's call this range 
S). The number of iterations of binary search is 

O(logS).

Checking feasibility (isSplitPossible):
In each iteration of binary search, you perform a linear scan through nums to check if the split is possible. This takes 
O(n) time per iteration, where 
n is the length of nums.

Total time complexity:

O(n⋅logS)
Where 

n is the size of the input array and 

S= sum of all elements in nums.

Space Complexity
You use only a constant amount of extra variables (like left, right, mid, subarrSum, subarrCount).

There is no extra space used that grows with input size.

Thus, the space complexity is O(1), or constant space.

In summary:

Resource	Complexity
Time	      O(nlogS)
Space	       O(1)
Here, 

S is the sum of all nums, and 
n is the array length.
Binary search itself is 
O(logS), and each feasibility check is 
O(n).

This is efficient for large arrays and input sums.

 * 
*/
package BinarySearch;

public class SplitArrayLargestSum410 {

    public int splitArray(int[] nums, int maxSplits) {
        int left = 0, right = 0;
        for (int num : nums) {
            //No subarray can have a sum less than the largest 
            //single element.
            //Because no matter how you split, every element must
            // be included in some subarray.
            //If you set the maximum subarray sum lower than the
            // largest element, it's impossible—that element alone 
            //will exceed the allowed sum.
            left = Math.max(left, num);
            right += num;
        }
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (isSplitPossible(nums, mid, maxSplits)) {
                right = mid;
            } else {
                left = mid + 1;
            }
        } // end of while
        return left;
    }

    private boolean isSplitPossible(int[] nums, int mid, int k) {
        int subarrSum = 0, subarrCount = 1;
        for (int num : nums) {
            subarrSum += num;
            if (subarrSum > mid) {
                subarrCount++;
                subarrSum = num;
            }
        }
        return subarrCount <= k;
    }
   public static void main(String[] args) {
        int[] nums = { 1,2,3,4,5 };
        int k = 2;
        SplitArrayLargestSum410 sol = new SplitArrayLargestSum410();
        int result = sol.splitArray(nums, k);
        System.out.println("Min eating speed " + result);
    }
}


/*
class SplitArrayLargestSum410 {
    splitArray(nums, maxSplits) {
        let left = 0, right = 0;
//     left → the minimum possible largest sum.
// Why? Because the largest element must fit in some subarray, so you cannot go below it.

// right → the maximum possible largest sum = sum of the entire array (if no splitting).

// So the answer lies between [left, right].
        // Step 1: Find the lower and upper bounds
        for (let num of nums) {
            // The minimum possible largest subarray sum 
            // cannot be smaller than the largest element
            left = Math.max(left, num);
            // The maximum possible sum is the sum of all elements
            right += num;
        }

        // Step 2: Apply binary search on the range [left, right]
        //mid = candidate maximum subarray sum.

//If splitting is possible with this mid, maybe we can do better (reduce right).

//If splitting is not possible, it's too small — we increase left.

//Eventually, left == right → that's our minimum largest subarray sum.

        while (left < right) {
            let mid = Math.floor(left + (right - left) / 2);

            if (this.isSplitPossible(nums, mid, maxSplits)) {
                // If splitting is possible, try smaller subarray sums
                right = mid;
            } else {
                // Otherwise, increase the minimum limit
                left = mid + 1;
            }
        }

        return left; // The smallest valid maximum subarray sum
    }
//Keep adding numbers to the current subarray.

//If adding exceeds mid, we must start a new subarray.

//Count how many subarrays were created.

//If the total count is <= k, it means this mid (max sum) works. Otherwise, it's too small.
    // Helper function to check if we can split into at most k subarrays
    isSplitPossible(nums, mid, k) {
        let subarrSum = 0, subarrCount = 1;

        for (let num of nums) {
            subarrSum += num;
            if (subarrSum > mid) {
                // Need a new subarray
                subarrCount++;
                subarrSum = num;
            }
        }

        return subarrCount <= k;
    }
}

// Example usage
const nums = [1, 2, 3, 4, 5];
const k = 2;
const solution = new SplitArrayLargestSum410();
const result = solution.splitArray(nums, k);
console.log("Minimum largest subarray sum:", result);
 
 
*/