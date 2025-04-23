/*
448. Find All Numbers Disappeared in an Array

Solution - https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/solutions/5130943/optimised/

Description
Given an array nums of n integers where nums[i] is in the range [1, n], return an array of all the integers in the range [1, n] that do not appear in nums.
Example 1:

Input: nums = [4,3,2,7,8,2,3,1]
Output: [5,6]
Example 2:

Input: nums = [1,1]
Output: [2]

Constraints:

n == nums.length
1 <= n <= 105
1 <= nums[i] <= n

Follow up: Could you do it without extra space and in O(n) runtime? You may assume the returned list does not count as extra space.

*/
/*
The findDisappearedNumbers function aims to find all the numbers that are missing from a given array nums of integers. Here's an explanation of the approach taken by this code:
Marking Numbers that Appear:
The function iterates through each number in the input array nums.
For each number num, it calculates the correct index by taking the absolute value of num and subtracting 1 (since array indices are 0-based).
If the number at the calculated index is positive, it negates the value at that index by making it negative. This marking process indicates that the number corresponding to that index has appeared in the array.
Finding Missing Numbers:
After marking all the numbers that appear in the array, the function initializes an array missingNumbers to store the missing numbers.
It then traverses the array from index 0 to size - 1.
For each index i, if the number at that index is positive, it means that the number (i + 1) did not appear in the original array nums. So, it adds (i + 1) to the missingNumbers array.
Returning Missing Numbers:
Finally, the function returns the array missingNumbers containing all the missing numbers that did not appear in the input array nums.
Overall Approach:
The approach involves marking numbers that appear by negating values at corresponding indices and then identifying missing numbers by checking for positive values in the array.
By utilizing the properties of the input array itself and negating values to mark appearances, the function efficiently identifies missing numbers without using additional data structures.
This approach is effective in finding missing numbers in an array without using extra space, making it efficient in terms of both time and space complexity.

Time Complexity:

The time complexity of the findDisappearedNumbers function is O(N), where N is the number of elements in the input array nums.
The function iterates through the input array twice:
The first iteration marks the presence of numbers by negating values at corresponding indices, which takes O(N) time.
The second iteration identifies missing numbers by checking for positive values in the array, also taking O(N) time.
As both iterations are linear in the size of the input array, the overall time complexity is O(N).

Space Complexity:

The space complexity of the findDisappearedNumbers function is O(1), constant extra space.
The function modifies the input array in place to keep track of seen numbers and uses an additional array missingNumbers to store the missing numbers.
The space required is constant and does not depend on the input size, making the space complexity O(1).
In summary, the findDisappearedNumbers function has a time complexity of O(N) and a space complexity of O(1), making it an efficient solution for finding missing numbers in an array without using additional space proportional to the input size.


*/
function findDisappearedNumbers(nums) {
    const n= nums.length;
    // Mark each number that appears in the array by negating the value at the index
    // corresponding to that number.
    for(let num of nums){
        const index = Math.abs(num) -1;
        console.log("index--",index)
         // Negate the number at the index if it is positive.
         if(nums[index]>0){
            nums[index] = -nums[index]
         }
    }
    console.log("nums--",nums)
    const missNumbers = [];
    for(let i=0;i<n;i++){
        if(nums[i]>0){
            missNumbers.push(i+1);
        }
    }
    return missNumbers;
}

nums = [4,3,2,7,8,2,3,1];
console.log(findDisappearedNumbers(nums));