/*
1995. Count Special Quadruplets

Solution - https://leetcode.com/problems/count-special-quadruplets/solutions/5174400/optimised/

Description
Given a 0-indexed integer array nums, return the number of distinct quadruplets (a, b, c, d) such that:

nums[a] + nums[b] + nums[c] == nums[d], and
a < b < c < d
 

Example 1:

Input: nums = [1,2,3,6]
Output: 1
Explanation: The only quadruplet that satisfies the requirement is (0, 1, 2, 3) because 1 + 2 + 3 == 6.
Example 2:

Input: nums = [3,3,6,4,5]
Output: 0
Explanation: There are no such quadruplets in [3,3,6,4,5].
Example 3:

Input: nums = [1,1,1,3,5]
Output: 4
Explanation: The 4 quadruplets that satisfy the requirement are:
- (0, 1, 2, 3): 1 + 1 + 1 == 3
- (0, 1, 3, 4): 1 + 1 + 3 == 5
- (0, 2, 3, 4): 1 + 1 + 3 == 5
- (1, 2, 3, 4): 1 + 1 + 3 == 5
 

Constraints:

4 <= nums.length <= 50
1 <= nums[i] <= 100
*/

/*

Approach:

Initialize a counter ans to keep track of the number of valid quadruplets.
Create an array mp of size 105 filled with zeros to store the frequency of sums of triplets.
Iterate over the elements of the input array nums from the end to the beginning.
For each element nums[i], iterate over all pairs of elements before it (j and k) to form triplets.
Check if the sum of nums[i], nums[j], and nums[k] is less than or equal to 100.
If the condition is met, increment the counter ans by the frequency of that sum stored in the mp array.
Update the frequency of the current element nums[i] in the mp array.
Return the final count of valid quadruplets.

Time Complexity:

The time complexity of this solution is O(n^3), where n is the length of the input array nums.
The triple nested loops iterate over all possible combinations of elements, resulting in cubic time complexity.

Space Complexity:

The space complexity is O(1) for the variables n, ans, and loop counters.
The space complexity of the mp array is O(1) since its size is fixed at 105, making it constant space.
Overall, the space complexity is constant O(1) as it does not grow with the input size.

*/
var countQuadruplets = function(nums) {
        let n = nums.length;
        let mp = new Array(105).fill(0);
        let ans = 0;
        
        for (let i = n - 1; i >= 0; i--) {
            for (let j = i - 1; j >= 0; j--) {
                for (let k = j - 1; k >= 0; k--) {
                    if (nums[i] + nums[j] + nums[k] <= 100) {
                        ans += mp[nums[i] + nums[j] + nums[k]];
                    }
                }
            }
            mp[nums[i]]++;
        }
        
        return ans;
}
let nums = [1,2,3,6];
 nums = [3,3,6,4,5];
 nums = [1,1,1,3,5];
console.log(countQuadruplets(nums));