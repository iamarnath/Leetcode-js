/*
Given an integer array nums, return all the triplets
 [nums[i], nums[j], nums[k]] 
 where nums[i] + nums[j] + nums[k] == 0,
  and the indices i, j and k are all distinct.

The output should not contain any duplicate triplets.
 You may return the output and the triplets in any order.

Example 1:

Input: nums = [-1,0,1,2,-1,-4]

Output: [[-1,-1,2],[-1,0,1]]
Explanation:
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].

Example 2:

Input: nums = [0,1,1]

Output: []
Explanation: The only possible triplet does not sum up to 0.

Example 3:

Input: nums = [0,0,0]

Output: [[0,0,0]]
Explanation: The only possible triplet sums up to 0.

Constraints:

3 <= nums.length <= 1000
-10^5 <= nums[i] <= 10^5

*/
/*
3Sum
https://leetcode.com/problems/3sum/solutions/5069739/optimised/


Description
Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.

 

Example 1:

Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation: 
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].
Notice that the order of the output and the order of the triplets does not matter.
Example 2:

Input: nums = [0,1,1]
Output: []
Explanation: The only possible triplet does not sum up to 0.
Example 3:

Input: nums = [0,0,0]
Output: [[0,0,0]]
Explanation: The only possible triplet sums up to 0.
 

Constraints:

3 <= nums.length <= 3000
-105 <= nums[i] <= 105
*/
/*
The time complexity of the given threeSum solution is O(n²)
 and the space complexity is O(n), where n is the length of the input array.

Time Complexity
Sorting the array:
Sorting takes O(n log n).

Main loop (i):
The primary for loop runs n times (from 0 to n-2).

Two-pointer search:
For each value of i, the while loop with left/right 
pointers covers at most n elements but, over all iterations,
 every pair is considered only once. This makes the nested work O(n) per i.

Total:
The work inside is O(n) per i, and there are O(n) choices for i, 
so the dominant term is O(n²).

Space Complexity
Auxiliary space:
The array is sorted in-place (no new array made for sorting),
 contributing O(1) extra space.

Result array:
The output array stores unique triplets. In the worst case
 (e.g., all zeros), there may be up to O(n²) triplets, 
 but for most reasonable inputs, the number of valid
  triplets is usually less.

Typical interview assumption:
Space usage excluding the output is O(1), but including
 the output is O(n²) in the worst case.

Summary Table
Operation	                        Complexity
Sorting	                                O(n log n)
For loop + two-pointer search	        O(n²)
Total Time Complexity	                O(n²)
Space Complexity (excluding output)	    O(1)
Space Complexity (including output)	    O(n²) (output storage)
*/
var threeSum = function (nums) {
    if (!nums || nums.length < 3) return [];
    //sort the elements
    nums.sort((a, b) => a - b);
    const result = [];

    let n = nums.length;
    // Now fix the first element and find the other two elements
    for (let i = 0; i < n - 2; i++) {
        // Skip duplicates in the first element
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        // Find other two elements using Two Sum approach
        let left = i + 1;
        let right = n - 1;
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                left++;
                right--;
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
            }
            else if (sum < 0) {
                left++;
            }
            else {
                right--;
            }
        }
    }

    return result;
}

//let nums = [-1, 0, 1, 2, -1, -4];
let nums = [0,0,0,0,0]
console.log(threeSum(nums))


