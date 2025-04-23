/*
2239. Find Closest Number to Zero

Solution - https://leetcode.com/problems/find-closest-number-to-zero/solutions/5147831/optimised/

Description
Given an integer array nums of size n, return the number with the value closest to 0 in nums. If there are multiple answers, return the number with the largest value.
Example 1:

Input: nums = [-4,-2,1,4,8]
Output: 1
Explanation:
The distance from -4 to 0 is |-4| = 4.
The distance from -2 to 0 is |-2| = 2.
The distance from 1 to 0 is |1| = 1.
The distance from 4 to 0 is |4| = 4.
The distance from 8 to 0 is |8| = 8.
Thus, the closest number to 0 in the array is 1.
Example 2:

Input: nums = [2,-1,1]
Output: 1
Explanation: 1 and -1 are both the closest numbers to 0, so 1 being larger is returned.
 

Constraints:

1 <= n <= 1000
-105 <= nums[i] <= 105

*/

/*
Time and Space Complexity Analysis
Time Complexity: The time complexity of this algorithm is O(n), where n is the number of elements in the input array nums. This is because the algorithm iterates through the array once to find the number closest to zero.
Space Complexity: The space complexity of this algorithm is O(1), which means it uses a constant amount of space. This is because the algorithm only uses a fixed number of variables to store the closest number and the smallest delta, regardless of the size of the input array.
Approach
The algorithm initializes two variables: closeNum to store the number closest to zero and smallDelta to store the smallest delta (absolute value) from zero.
It then iterates through the input array. For each number, it calculates the absolute value (currDelta) and checks if it's closer to zero than the current closest number (smallDelta).
If the current number is closer to zero or equally close but positive, it updates closeNum and smallDelta.
After iterating through the entire array, the algorithm returns closeNum, which is the number closest to zero from the list.
*/

function findClosestNumber(nums) {
    let closeNum = 0, smallDelta = Number.MAX_SAFE_INTEGER;
    for (let num of nums) {
        const currDelta = Math.abs(num);
        // Check if the current number is closer to zero than the previous closest number,
        // or if it's equally close to zero but positive.
        if (currDelta < smallDelta || (currDelta === smallDelta && num > closeNum)) {
            closeNum = num;
            smallDelta = currDelta;
        }
    }
    // Return the number closest to zero from the list.
    return closeNum;
}

nums = [-4,-2,1,4,8];
nums = [2,-1,1]
console.log(findClosestNumber(nums));