'''
1425. Constrained Subsequence Sum

Given an integer array nums and an integer k, return 
the maximum sum of a non-empty subsequence of that array 
such that for every two consecutive integers in the 
subsequence, nums[i] and nums[j], where i < j, 
the condition j - i <= k is satisfied.

A subsequence of an array is obtained by deleting 
some number of elements (can be zero) from the array,
leaving the remaining elements in their original order.

Example 1:

Input: nums = [10,2,-10,5,20], k = 2
Output: 37
Explanation: The subsequence is [10, 2, 5, 20].
Example 2:

Input: nums = [-1,-2,-3], k = 1
Output: -1
Explanation: The subsequence must be non-empty, so 
we choose the largest number.
Example 3:

Input: nums = [10,-2,-10,-5,20], k = 2
Output: 23
Explanation: The subsequence is [10, -2, -5, 20].
 

Constraints:

1 <= k <= nums.length <= 105
-104 <= nums[i] <= 104

'''

from collections import deque
from typing import List

class Solution:
    def constrainedSubsetSum(self,nums:List[int],k:int)->int:
        n = len(nums)
        deq = deque()
        t = nums[:]
        max_r = t[0]
        for i in range(n):
            # Remove indices out of the window	
            while deq and deq[0]< i-k:
                deq.popleft()
            if deq:
                t[i] = max(t[i],nums[i]+t[deq[0]])
            # Maintain deque in descending order of t values
            while deq and t[i] >= t[deq[-1]]:
                deq.pop()
            deq.append(i)
            max_r = max(max_r,t[i])
        return max_r

nums = [10,2,-10,5,20]
k = 2
sol = Solution()
print(sol.constrainedSubsetSum(nums,k))
