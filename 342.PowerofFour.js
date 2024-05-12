/*
342. Power of Four

Solution - https://leetcode.com/problems/power-of-four/solutions/5140536/optimised/

https://leetcode.com/problems/power-of-four/solutions/5141906/optimised/

Description
Given an integer n, return true if it is a power of four. Otherwise, return false.

An integer n is a power of four, if there exists an integer x such that n == 4x.

 

Example 1:

Input: n = 16
Output: true
Example 2:

Input: n = 5
Output: false
Example 3:

Input: n = 1
Output: true
 

Constraints:

-231 <= n <= 231 - 1
 

Follow up: Could you solve it without loops/recursion?
*/

/*
# Approach
The function first checks if the input number n is less than or equal to 0. If it is, the function returns false as powers of four must be positive integers.
It then iterates through the binary representation of n by shifting n to the right by 1 in each iteration.
During each iteration, it counts the number of set bits (1s) in n and keeps track of the position of the rightmost set bit.
After iterating through all bits, it checks if there is exactly one set bit in n and if the position of that set bit is odd, indicating that n is a power of four.
The function returns true if n is a power of four based on the above conditions, otherwise it returns false.

Time Complexity:
The time complexity of this function is O(log n), where n is the value of the input number n.
The function iterates through the binary representation of n, which has log₂(n) bits.
Each iteration involves bitwise operations and increments, which are constant time operations.

Space Complexity:
The space complexity of this function is O(1) as it only uses a constant amount of extra space regardless of the input size.
The function uses a few variables (oneCount, pos, onesPos) to keep track of the count and position of set bits, but the space required for these variables does not grow with the input size.

*/

/*
The logic behind the line return n > 0 && (n & (n - 1)) === 0 && (n - 1) % 3 === 0; in the isPowerOfFour function is as follows:
n > 0: This condition ensures that the input number n is a positive integer. We are checking if n is greater than 0.
(n & (n - 1)) === 0: This condition checks if n is a power of 2. When a number is a power of 2, it has only one bit set in its binary representation. By performing the bitwise AND operation between n and n - 1, we unset the rightmost set bit in n. If the result is 0, it means n is a power of 2.
(n - 1) % 3 === 0: This condition checks if n is of the form 4^n. The explanation provided in the Python code you shared explains this well. When you subtract 1 from a number that is a power of 4, the result is always divisible by 3. This property is used to verify if n is a power of 4.
By combining these three conditions, the function checks if the input number n is a positive integer that is both a power of 2 and a power of 4, returning true if all conditions are met and false otherwise.

The time and space complexity of the isPowerOfFour(n) function, which checks if a given number is a power of four, can be explained as follows:
Time Complexity: The time complexity of the function is O(1). This is because the function involves simple arithmetic operations and bitwise operations that execute in constant time regardless of the input size. The bitwise operations and arithmetic comparisons involved in the function are efficient and do not depend on the magnitude of the input number n.
Space Complexity: The space complexity of the function is O(1). The function does not use any additional data structures that grow with the input size. It only requires a constant amount of space to store the variables used for comparisons and calculations within the function. Therefore, the space required by the function remains constant regardless of the input value of n.


Checking if the number is a power of 2: (n & (n - 1)) == 0 checks if n is a power of 2.
 This is because in binary representation, a power of 2 has only one bit set to 1 (like 1, 2, 4, 8, 16, etc.).
  When we subtract 1 from a power of 2, all the bits to the right of the set bit become 1. So, when we perform a bitwise AND (&) operation between n and n - 1, 
  it results in 0 only if n is a power of 2.



*/
/*withot loop*/
function isPowerOfFour(n) {

  return n > 0 && (n & (n - 1)) === 0 && (n - 1) % 3 === 0;
}
/*
var isPowerOfFour = function (n) {
    if (n <= 0) {
        return false;
    }

    let oneCount = 0;
    let pos = 1;
    let onesPos = 0;
    while (n) {
        if (n & 1) {
            oneCount++;
            onesPos = pos;
        }
        n = n >> 1;
        pos++;
    }
    return oneCount === 1 && (onesPos & 1) === 1;

}
*/
let n=13;

console.log(isPowerOfFour(n))