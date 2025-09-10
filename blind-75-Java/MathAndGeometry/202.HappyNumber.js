/*
202. Happy Number
Write an algorithm to determine if a number n is happy.

A happy number is a number defined by the following process:

Starting with any positive integer, replace
 the number by the sum of the squares of its digits.
Repeat the process until the number equals 1
 (where it will stay), or it loops endlessly
  in a cycle which does not include 1.
Those numbers for which this process ends in 1 are happy.
Return true if n is a happy number, and false if not.

Example 1:

Input: n = 19
Output: true
Explanation:
1^2 + 9^2 = 82
8^2 + 2^2 = 68
6^2 + 8^2 = 100
1^2 + 0^2 + 0^2 = 1
Example 2:

Input: n = 2
Output: false
 

Constraints:

1 <= n <= 231 - 1

*/
/*
var sumOfSquares = function (n) {
    let output = 0;
    while (n > 0) {
        let digit = n % 10;
        digit = digit * digit;
        output += digit;
        n = Math.floor(n / 10);
    }
    return output;
}
var isHappy = function (n) {
    const visit = new Set();
    
    while (!visit.has(n)) {
        visit.add(n);
        n = sumOfSquares(n);
        if (n === 1) {
            return true;
        }
    }
    return false;
};
*/
/*
Set visit is used to keep track of numbers we have already seen to avoid infinite loops.
Outer loop continues until n becomes 1.

Inner loop calculates the sum of squares of digits of n.

If a number repeats (i.e., a cycle is detected), the function returns false.

If n becomes 1, the function returns true.

Time Complexity
Digit extraction and sum calculation: For a number with 

d digits, extracting each digit and computing the sum takes 

O(d) time per iteration.

Number of iterations: The process will either reach 1 or enter a cycle. 
The maximum number of distinct sums (before repeating) is bounded
 by a constant (empirically, the cycle is short because sums are constrained
 by the number of digits and their values). For numbers with up to 
m digits, the sum of squares is at most 
81m (since each digit is at most 9, and 
9^2×m=81m
).

Overall: The number of iterations is bounded by a constant
 (since after a certain point, numbers will repeat or reach 1).
  Thus, the time complexity is 

O(1) for most practical purposes. However, if you consider 

n itself as the input size (not the number of digits),
 it is more accurate to say the time complexity is 
O(logn) per iteration, and the number of iterations is 
also bounded by a constant (the number of distinct sums 
possible before cycling), so it remains 

O(1) for most intents and purposes.

Strictly, for arbitrary large 
n: The number of iterations is bounded by a constant, and each iteration takes 
O(logn) time (because the number of digits in 
n is proportional to 
log 10 n), but since the number of iterations is constant, the total time is 

O(logn). For all practical cases (since the constant is small), it is effectively 

O(1).

Summary:

Time complexity: 

O(logn) per iteration, but since the number of
 iterations is bounded by a small constant, it is often considered 

O(1).

Explanation for interview context:

Each iteration processes the digits of the number, which is 

O(logn) (number of digits).

The number of iterations before repeating or reaching
 1 is bounded by a small constant (e.g., 20 or 100).

So, total time complexity is 
O(logn)×O(1)=O(logn), but in practice, it is treated as 

O(1).

Space Complexity
Set visit: Stores at most a constant number of 
elements (since the number of distinct sums
 possible before repeating is bounded).

Space complexity: 

O(1) (constant extra space).

*/
//better in terms of performance
var isHappy = function (n) {
    let visit = new Set();
    while (n != 1) {
        let sumOfSqDigit = 0;
        while (n > 0) {
            sumOfSqDigit += ((n % 10) * (n % 10));
            n = Math.floor(n / 10);
        }
        n = sumOfSqDigit;
        if (visit.has(n)) return false;
        visit.add(n)
    }
    return true;
}

let n = 101;
let res = isHappy(n);
console.log("isHappy ==", res);