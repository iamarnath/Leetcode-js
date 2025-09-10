'''
239. Sliding Window Maximum
You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.

Return the max sliding window.

 

Example 1:

Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
Explanation: 
Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
Example 2:

Input: nums = [1], k = 1
Output: [1]
 

Constraints:

1 <= nums.length <= 105
-104 <= nums[i] <= 104
1 <= k <= nums.length

'''
'''
The time complexity of the deque-based maxSlidingWindow 
algorithm is O(n), where n is the length of the input array. 
This efficiency comes from the fact that each element is
added to and removed from the deque at most once during
the entire process, resulting in a total of at most 2n operations.

Each index is pushed and popped from the deque at most once.

All other operations inside the loop (comparisons, 
appends to result) are O(1).

The space complexity is O(k), where k is the window size. 
This is because the deque stores at most k indices at 
any time (the indices of elements in the current window).
The output list also takes O(n - k + 1) space, but if only 
the auxiliary space is considered (not the output), it is O(k).

Summary Table:

Complexity	           Value	        Why
Time Complexity	        O(n)	Each element added/removed at most once
Space Complexity	    O(k)	Deque holds at most k indices

'''
from collections import deque
from typing import List

class Solution:
    def maxSlidingWindow(self,nums:List[int],k:int) -> List[int]:
        n = len(nums)
        if n == 0:
            return []
        deq= deque()
        result = []
        for i in range(n):
        # Remove indices from the front that are out of the current window
            while deq and deq[0] <= i-k:
                deq.popleft()
        # Remove indices from the back while the current element is greater
            while deq and nums[i] > nums[deq[-1]]:
                deq.pop()
            deq.append(i)
        # Append the current max to the result once the first window is complete
            if i>= k-1:
                result.append(nums[deq[0]])
        return result


nums = [1,3,-1,-3,5,3,6,7]
k=3
sol = Solution()
print(sol.maxSlidingWindow(nums,k))
