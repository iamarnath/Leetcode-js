'''
962. Maximum Width Ramp

A ramp in an integer array nums is a pair (i, j) for which i < j and nums[i] <= nums[j]. The width of such a ramp is j - i.

Given an integer array nums, return the maximum width of a ramp in nums. If there is no ramp in nums, return 0.

 

Example 1:

Input: nums = [6,0,8,2,1,5]
Output: 4
Explanation: The maximum width ramp is achieved at (i, j) = (1, 5): nums[1] = 0 and nums[5] = 5.
Example 2:

Input: nums = [9,8,1,0,1,9,4,0,4,1]
Output: 7
Explanation: The maximum width ramp is achieved at (i, j) = (2, 9): nums[2] = 1 and nums[9] = 1.
 

Constraints:

2 <= nums.length <= 5 * 104
0 <= nums[i] <= 5 * 104

'''
'''
range() Function Parameters
The range() function in Python can take one, two, or three arguments:

range(stop)

Starts from 0, ends before stop.

Example: range(5) gives [0, 1, 2, 3,(start, stop)**

Starts from start, ends before stop.

Example: range(2, 5) gives [2,. range(start, stop, step)

Starts from start, ends before stop, incrementing by step each time.

Example: range(2, 10, 2) gives [2,# Explanation: range(n - 1, -1, -1)

start: n - 1 (starts from the last index if n is the length of a list)

stop: -1 (stops before -1, so it includes 0)

step: -1 (decrements by 1 each time)

This is a common Python idiom for iterating backwards through a sequence.

Example
python
n = 5
for i in range(n - 1, -1, -1):
    print(i)
Output:

text
4
3
2
1
0
Summary Table
Syntax	                         Meaning
range(stop)	                   0, 1, ..., stop-1
range(start, stop)	           start, ..., stop-1
range(start, stop, step)	   start, start+step, ..., < stop

'''

from typing import List
class Solution:
	def maxWidthRamp(self,nums:List[int])->int:
		n = len(nums)
		stack = [] # Monotonic decreasing stack to store indices
		for i in range(n):
			if not stack or nums[stack[-1]] >= nums[i]:
				stack.append(i)
		ramp=0
		# Traverse from the right and calculate the max width ramp
		for j in range(n-1,-1,-1):
			while stack and nums[stack[-1]] <= nums[j]:
				i = stack.pop()
				ramp = max(ramp,j-i)
		return ramp

# nums = [6, 0, 8, 2, 1, 5]
nums = [9,8,1,0,1,9,4,0,4,1]
sol = Solution()
result = sol.maxWidthRamp(nums)
print("Maximum width ramp : ",result)