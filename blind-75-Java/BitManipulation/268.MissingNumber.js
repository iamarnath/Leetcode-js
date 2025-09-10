/*
268. Missing Number
Given an array nums containing n distinct numbers in
 the range [0, n], return the only number
  in the range that is missing from the array.
Example 1:

Input: nums = [3,0,1]

Output: 2

Explanation:

n = 3 since there are 3 numbers, so all numbers are
 in the range [0,3]. 2 is the missing number in the 
 range since it does not appear in nums.

Example 2:

Input: nums = [0,1]

Output: 2

Explanation:

n = 2 since there are 2 numbers, so all numbers are in the
 range [0,2]. 2 is the missing number in the range since it
  does not appear in nums.

Example 3:

Input: nums = [9,6,4,2,3,5,7,0,1]

Output: 8

Explanation:

n = 9 since there are 9 numbers, so all numbers are in the range
 [0,9]. 8 is the missing number in the range since it does not appear in nums.

 
*/
/*
XOR Properties:

a ^ a = 0 (a number XORed with itself is zero)

a ^ 0 = a (a number XORed with zero is itself)

XOR is commutative and associative, so order doesn’t matter.

How It Finds the Missing Number:

If you XOR all the numbers from 0 to n 
(using both the indices and the array values),
 every number that appears in both the array 
 and the index range will cancel itself out.

The only number left will be the missing number,
 because it appears in the index range but not in the array.


*/
var missingNumber = function(nums) {
   const n= nums.length;
    let ans=n;
    for(let i=0;i<n;i++){
         ans ^= i ^ nums[i];
    }
    return ans;
 
};