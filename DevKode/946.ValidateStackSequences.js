/*
946. Validate Stack Sequences

Solution - https://leetcode.com/problems/validate-stack-sequences/solutions/5159240/optimised/

Description
Given two integer arrays pushed and popped each with distinct values, return true if this could have been the result of a sequence of push and pop operations on an initially empty stack, or false otherwise.

Example 1:

Input: pushed = [1,2,3,4,5], popped = [4,5,3,2,1]
Output: true
Explanation: We might do the following sequence:
push(1), push(2), push(3), push(4),
pop() -> 4,
push(5),
pop() -> 5, pop() -> 3, pop() -> 2, pop() -> 1
Example 2:

Input: pushed = [1,2,3,4,5], popped = [4,3,5,1,2]
Output: false
Explanation: 1 cannot be popped before 2.
 

Constraints:

1 <= pushed.length <= 1000
0 <= pushed[i] <= 1000
All the elements of pushed are unique.
popped.length == pushed.length
popped is a permutation of pushed.

*/

/*
Approach:
Initialize an empty array stack to simulate stack operations.
Initialize jIndex to keep track of the position in the popped sequence.
Iterate through the pushed sequence:
For each element in pushed, push it onto the stack.
While the stack is not empty and the top element of the stack equals the next element in the popped sequence, pop the top element from the stack and increment jIndex.
After iterating through the entire pushed sequence, check if jIndex is equal to the length of the pushed array.
If they are equal, it means all elements were successfully popped in the popped sequence order.
Return true if they are equal, false otherwise.
Time Complexity:
Iterating through pushed: O(n)
The code iterates through the pushed array of length n.
Popping elements from stack: O(n)
In the worst case, all elements may be pushed and then popped from the stack.
Total Time Complexity: O(n)
The overall time complexity is O(n), where n is the length of the pushed and popped arrays.
Space Complexity:
stack: O(n)
The space used by the stack depends on the length of the pushed array, which is n.
Variables: O(1)
Additional space used by variables like jIndex is constant.
Total Space Complexity: O(n)
The overall space complexity is O(n) due to the stack.
*/

var validateStackSequences = function (pushed, popped) {
    // Initialize an empty array to simulate stack operations
    const stack = [];
    // Index to keep track of the position in the 'popped' sequence
    let jIndex = 0;
    for (const value of pushed) {
        // Push the current value onto the stack
        stack.push(value);
        // Continue popping from the stack if the top element equals 
        // the next element in the 'popped' sequence
        while (stack.length && stack[stack.length - 1] === popped[jIndex]) {
            stack.pop();// Remove the top element from the stack
            jIndex++;
        }
    }
    // If all elements were successfully popped in the 'popped' sequence order,
    // then the jIndex should match the length of the 'pushed' array
    return jIndex === pushed.length;
};

let pushed = [1, 2, 3, 4, 5], popped = [4, 5, 3, 2, 1];
//pushed = [1, 2, 3, 4, 5], popped = [4, 3, 5, 1, 2];
console.log(validateStackSequences(pushed, popped));