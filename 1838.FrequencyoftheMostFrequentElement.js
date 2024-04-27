/*
1838. Frequency of the Most Frequent Element

Solution - https://leetcode.com/problems/frequency-of-the-most-frequent-element/solutions/5077782/optimised/


Description
The frequency of an element is the number of times it occurs in an array.

You are given an integer array nums and an integer k. In one operation, you can choose an index of nums and increment the element at that index by 1.

Return the maximum possible frequency of an element after performing at most k operations.

 

Example 1:

Input: nums = [1,2,4], k = 5
Output: 3
Explanation: Increment the first element three times and the second element two times to make nums = [4,4,4].
4 has a frequency of 3.
Example 2:

Input: nums = [1,4,8,13], k = 5
Output: 2
Explanation: There are multiple optimal solutions:
- Increment the first element three times to make nums = [4,4,8,13]. 4 has a frequency of 2.
- Increment the second element four times to make nums = [1,8,8,13]. 8 has a frequency of 2.
- Increment the third element five times to make nums = [1,4,13,13]. 13 has a frequency of 2.
Example 3:

Input: nums = [3,9,6], k = 2
Output: 1
 

Constraints:

1 <= nums.length <= 105
1 <= nums[i] <= 105
1 <= k <= 105

*/
/*
The time complexity of this solution is O(n log n), where n is the length of the input array nums.
The key steps and their time complexities are:
Sorting the array: The nums array is sorted using the sort method, which has a time complexity of O(n log n).
Sliding Window Approach: The function uses a sliding window approach to find the maximum frequency. The outer loop iterates through the nums array, and the inner loop (the while loop) adjusts the left pointer of the sliding window. The time complexity of this part is O(n), as the total number of operations performed in the inner loop is proportional to the size of the array.
Therefore, the overall time complexity of the maxFrequency function is O(n log n) due to the sorting step.

*/
/*
Approach

The maxFrequency function uses a sliding window approach to find the maximum frequency of a subarray in the given nums array, where the maximum number of allowed operations (k) can be used to increase the frequency of the elements.
The key steps of the approach are:
Sorting the nums array: The function first sorts the nums array in ascending order. This is important for the sliding window approach, as it allows us to efficiently calculate the maximum frequency.
Initializing the sliding window: The function initializes the left pointer i to 0 and the current sum currSum to 0.
Iterating through the nums array: The function then iterates through the nums array using the right pointer j.
Updating the current sum: For each element nums[j], the function updates the currSum by adding the current element.
Adjusting the sliding window: The function then checks if the condition (j - i + 1) * nums[j] - currSum > k is true. This condition checks if the current subarray (with length j - i + 1) cannot be made valid by performing at most k operations.
If the condition is true, the function subtracts the leftmost element nums[i] from the currSum and increments the left pointer i.
This process continues until the condition is false, effectively adjusting the sliding window.
Updating the maximum frequency: After adjusting the sliding window, the function updates the result variable by taking the maximum of the current result and the length of the current subarray j - i + 1.
Returning the result: Finally, the function returns the result, which represents the maximum frequency of a subarray that can be obtained by performing at most k operations.
The key idea behind this approach is to use the sorted nums array to efficiently calculate the maximum frequency. By adjusting the sliding window, the function can find the maximum frequency without having to recompute the sum for each subarray.


*/

function maxFrequency(nums, k) {
    nums.sort((a, b) => a - b);
    
    let n = nums.length;
    
    let result = 0;
    
    let left = 0;
    let currSum = 0;
    
    for (let right = 0; right < n; right++) {
        
        let target = nums[right];
        currSum += nums[right];
        let windowSum = (right - left + 1) * target;
        if (windowSum - currSum > k) {
            currSum -= nums[left];
            left++;
        }
        
        result = Math.max(result, right - left + 1);
        
    }
    return result;

}

let nums = [1, 2, 4], k = 5;
nums = [1, 4, 8, 13], k = 5;
//nums = [3, 9, 6], k = 2;
console.log(maxFrequency(nums, k));