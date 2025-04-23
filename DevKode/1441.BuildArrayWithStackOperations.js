/*
1441. Build an Array With Stack Operations

Solution - https://leetcode.com/problems/build-an-array-with-stack-operations/solutions/5159141/optimised/

Description
You are given an integer array target and an integer n.

You have an empty stack with the two following operations:

"Push": pushes an integer to the top of the stack.
"Pop": removes the integer on the top of the stack.
You also have a stream of the integers in the range [1, n].

Use the two stack operations to make the numbers in the stack (from the bottom to the top) equal to target. You should follow the following rules:

If the stream of the integers is not empty, pick the next integer from the stream and push it to the top of the stack.
If the stack is not empty, pop the integer at the top of the stack.
If, at any moment, the elements in the stack (from the bottom to the top) are equal to target, do not read new integers from the stream and do not do more operations on the stack.
Return the stack operations needed to build target following the mentioned rules. If there are multiple valid answers, return any of them.

Example 1:

Input: target = [1,3], n = 3
Output: ["Push","Push","Pop","Push"]
Explanation: Initially the stack s is empty. The last element is the top of the stack.
Read 1 from the stream and push it to the stack. s = [1].
Read 2 from the stream and push it to the stack. s = [1,2].
Pop the integer on the top of the stack. s = [1].
Read 3 from the stream and push it to the stack. s = [1,3].
Example 2:

Input: target = [1,2,3], n = 3
Output: ["Push","Push","Push"]
Explanation: Initially the stack s is empty. The last element is the top of the stack.
Read 1 from the stream and push it to the stack. s = [1].
Read 2 from the stream and push it to the stack. s = [1,2].
Read 3 from the stream and push it to the stack. s = [1,2,3].
Example 3:

Input: target = [1,2], n = 4
Output: ["Push","Push"]
Explanation: Initially the stack s is empty. The last element is the top of the stack.
Read 1 from the stream and push it to the stack. s = [1].
Read 2 from the stream and push it to the stack. s = [1,2].
Since the stack (from the bottom to the top) is equal to target, we stop the stack operations.
The answers that read integer 3 from the stream are not accepted.
 

Constraints:

1 <= target.length <= 100
1 <= n <= 100
1 <= target[i] <= n
target is strictly increasing.

*/
/*
Approach:
Initialization:
Initialize an empty array result to store the operations.
Define constants PUSH and POP for the operations.
Initialize currNum to track the current number being compared with the target array.
Iterating over Target Array:
Iterate over each element in the target array.
For each target number:
Increment currNum and add 'Push' and 'Pop' operations until it matches the target number.
Once currNum matches the target number, add only the 'Push' operation to the result array.
Return Result:
Return the array of operations required to build the target array.
Time Complexity:
Iterating over Target Array: O(n)
The code iterates through the target array of length n.
Building Operations: O(max(target))
The while loop may run up to the maximum value in the target array.
Total Time Complexity: O(n + max(target))
The overall time complexity is O(n + max(target)), where n is the length of the target array.
Space Complexity:
Result Array: O(max(target))
The space used by the result array depends on the maximum value in the target array.
Constants and Variables: O(1)
Additional space used by constants, variables, and loop counters is constant.
Total Space Complexity: O(max(target))
The overall space complexity is O(max(target)) due to the result array.
Summary:
The code efficiently generates a sequence of operations to build the target array.
It has a time complexity of O(n + max(target)) and a space complexity of O(max(target)), where n is the length of the target array.
This approach provides a straightforward solution for constructing the target array using 'Push' and 'Pop' operations based on the given target sequence.

*/

var buildArray = function (target, n) {
    const result = [];
    const PUSH = 'Push', POP = 'Pop';
    // Track the current number to compare with target array
    let currNum = 0;
    // Iterate over the target array to determine operations
    for (const targetNumber of target) {
        // Increment current number and append 'Push' and 'Pop' until it matches the target number
        while (++currNum < targetNumber) {
            result.push(PUSH, POP)
        }

        // When current number matches the target number, just perform the 'Push' operation
        result.push(PUSH)
    }
    return result;
};
let target = [1,2,3], n = 3;
target = [1,3], n = 3;
console.log(buildArray(target, n));