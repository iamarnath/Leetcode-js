/*
268. Missing Number

https://leetcode.com/problems/missing-number/solutions/5067799/optimised/

https://leetcode.com/problems/missing-number/solutions/5067819/optimised/
Description
Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.

 

Example 1:

Input: nums = [3,0,1]
Output: 2
Explanation: n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number in the range since it does not appear in nums.
Example 2:

Input: nums = [0,1]
Output: 2
Explanation: n = 2 since there are 2 numbers, so all numbers are in the range [0,2]. 2 is the missing number in the range since it does not appear in nums.
Example 3:

Input: nums = [9,6,4,2,3,5,7,0,1]
Output: 8
Explanation: n = 9 since there are 9 numbers, so all numbers are in the range [0,9]. 8 is the missing number in the range since it does not appear in nums.
 

Constraints:

n == nums.length
1 <= n <= 104
0 <= nums[i] <= n
All the numbers of nums are unique.

*/

/*
We can also solve this problem using mathematics. By calculating the sum of [0,1,..n]
, subtracting the sum of all numbers in the array, we can obtain the missing number.

The time complexity is O(n), where n is the length of the array. The space complexity is O(1)

The reason for adding the difference is that if the current element nums[i] is present in the array, then its value should cancel out the effect of the current index i when added to ans. However, if the current element is missing,
 then the difference between the current index and the missing element's value will be added to ans.

 The provided solution uses a bitwise XOR operation to find the missing number. XOR is a logical operation that outputs true or 1 only when the number of true inputs is odd. For two bits, it outputs 1 if the bits are different, and 0 if they are the same. When you XOR the same number together, the result is 0.
  If you XOR a number with 0, you get the number back. We use this property to our advantage.
*/

var missingNumber = function (nums) {
      // Calculate the length of the given array.
    const n= nums.length;
      // Initialize the ans with the length of the array. This covers the edge case
    // where the missing number is exactly equal to the length of the array.
    let ans=n;
    for(let i=0;i<n;i++){
              // XOR the current index with the current array element and the current result.
        // This will cancel out all numbers from 0 to n except the missing one.
        ans ^= i ^ nums[i];
       // ans += i-nums[i];
    }
    return ans;
}

let nums = [3,0,1]
nums = [9,6,4,2,3,5,7,0,1]
console.log(missingNumber(nums))