/*
2448. Minimum Cost to Make Array Equal
You are given two 0-indexed arrays nums and cost consisting each of n positive integers.

You can do the following operation any number of times:

Increase or decrease any element of the array nums by 1.
The cost of doing one operation on the ith element is cost[i].

Return the minimum total cost such that all the elements of the array nums become equal.

 

Example 1:

Input: nums = [1,3,5,2], cost = [2,3,1,14]
Output: 8
Explanation: We can make all the elements equal to 2 in the following way:
- Increase the 0th element one time. The cost is 2.
- Decrease the 1st element one time. The cost is 3.
- Decrease the 2nd element three times. The cost is 1 + 1 + 1 = 3.
The total cost is 2 + 3 + 3 = 8.
It can be shown that we cannot make the array equal with a smaller cost.
Example 2:

Input: nums = [2,2,2,2,2], cost = [4,2,8,1,3]
Output: 0
Explanation: All the elements are already equal, so no operations are needed.
 

Constraints:

n == nums.length == cost.length
1 <= n <= 105
1 <= nums[i], cost[i] <= 106
Test cases are generated in a way that the output doesn't exceed 253-1
*/

function getCost(nums, cost, target) {
    let result = 0n; // use BigInt for large numbers
    for (let i = 0; i < nums.length; i++) {
        result += BigInt(Math.abs(nums[i] - target)) * BigInt(cost[i]);
    }
    return result;
}

var minCost = function(nums, cost) {
    let answer = BigInt(Number.MAX_SAFE_INTEGER);

    let left = Math.min(...nums);
    let right = Math.max(...nums);

    while (left <= right) {
        let mid = Math.floor(left + (right - left) / 2);

        let cost1 = getCost(nums, cost, mid);
        let cost2 = getCost(nums, cost, mid + 1);

        answer = cost1 < cost2 ? cost1 : cost2;

        if (cost1 > cost2) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return answer === BigInt(Number.MAX_SAFE_INTEGER) ? 0n : answer;
}

/*
Line by Line Explanation
javascript
function getCost(nums, cost, target) {
    let result = 0;
    for (let i = 0; i < nums.length; i++) {
        result += Math.abs(nums[i] - target) * cost[i];
    }
    return result;
}
Defines a function getCost that takes three arguments—an array of numbers (nums), a cost array (cost), and a target value.

Initializes result to 0.

Loops through each index of nums:

Calculates the absolute difference between nums[i] and target, multiplies by cost[i], and adds this to result.

Returns the total cost to convert all nums elements to target weighted by cost values.

javascript
function minCost(nums, cost) {
    let answer = Number.MAX_SAFE_INTEGER;
    let left = Math.min(...nums);
    let right = Math.max(...nums);

    while (left <= right) {
        let mid = Math.floor(left + (right - left) / 2);

        let cost1 = getCost(nums, cost, mid);
        let cost2 = getCost(nums, cost, mid + 1);

        answer = Math.min(cost1, cost2);

        if (cost1 > cost2) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return answer === Number.MAX_SAFE_INTEGER ? 0 : answer;
}
Defines minCost to compute the minimum cost to make all elements equal.

Sets answer to the largest safe integer in JavaScript.

Finds the range for binary search (left is minimum of nums, right is maximum).

Performs binary search (while (left <= right)):

Calculates the middle point (mid).

Computes cost for aligning to mid (cost1) and to mid + 1 (cost2).

Updates answer to the minimum of cost1 and cost2.

Narrows the search: If cost1 is greater, shift left bound up; else, shift right bound down.

Returns 0 if answer was never updated; otherwise, returns minimal cost found.

Time Complexity
getCost: Each call takes 
O
(
N
)
O(N), where 
N
N is the length of nums, by looping through each index.

minCost: The binary search runs for at most 

log(M) iterations, where 

M= (max value in nums - min value in nums). Each iteration calls getCost twice, so:

O(NlogM)
Space Complexity
getCost: Uses only constant extra space 

O(1).

minCost: Also uses constant extra space (apart from input and minor vars), so overall:


O(1)
This approach is efficient for reasonably sized arrays and reasonable numeric ranges in nums.


*/