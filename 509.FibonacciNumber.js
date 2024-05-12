/*
509. Fibonacci Number

Solution - https://leetcode.com/problems/fibonacci-number/solutions/5142050/optimised/

Description

The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1. That is,

F(0) = 0, F(1) = 1
F(n) = F(n - 1) + F(n - 2), for n > 1.
Given n, calculate F(n).

Example 1:

Input: n = 2
Output: 1
Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1.
Example 2:

Input: n = 3
Output: 2
Explanation: F(3) = F(2) + F(1) = 1 + 1 = 2.
Example 3:

Input: n = 4
Output: 3
Explanation: F(4) = F(3) + F(2) = 2 + 1 = 3.
 

Constraints:

0 <= n <= 30

*/

/*
The approach used in the fib function is to calculate the nth Fibonacci number using an iterative approach. This approach involves maintaining two variables, currFib and nextFib, which represent the current and next Fibonacci numbers in the sequence. The function iterates n times, updating these variables in each iteration to generate the next Fibonacci number.
Here's a step-by-step breakdown of the approach:
Initialize currFib to 0 and nextFib to 1, which are the first two Fibonacci numbers.
Iterate n times. In each iteration:
Update currFib to be the sum of currFib and nextFib, effectively calculating the next Fibonacci number.
Update nextFib to be the previous value of currFib, which is now the new nextFib.
After the loop, currFib holds the nth Fibonacci number, which is returned by the function.
Time Complexity:
The time complexity of this approach is O(n), where n is the input number. This is because the function iterates n times to calculate the nth Fibonacci number.
Space Complexity:
The space complexity of this approach is O(1), which means the space required does not grow with the size of the input. This is because the function only uses a constant amount of space to store the variables currFib and nextFib, regardless of the value of n.
*/
function fib(n) {
    let currFib = 0; // The first Fibonacci number, F(0)
    let nextFib = 1;  // The second Fibonacci number, F(1)
    // Iterate until the nth number
    for (let i = 0; i < n; i++) {
        [currFib, nextFib] = [nextFib, currFib + nextFib]
    }
    //console.log(currFib, nextFib)
    return currFib;
}

n = 3;
console.log(fib(n));