/*
Multiply of Two Integers

Given two integers a and b,
 return the sum of the two integers
  without using the operators *

Example 1:

Input: a = 1, b = 2
Output: 2
Example 2:

Input: a = 2, b = 3
Output: 6

Constraints:

-1000 <= a, b <= 1000
*/
/*
We can do this using bit manipulation 
(like how multiplication works in binary):

Use the Russian Peasant Algorithm:

While b > 0:

If b is odd → add a to result

Double a (a = a << 1)

Halve b (b = b >> 1)
This works efficiently in O(log b) time.

*/
/*
Step-by-step Explanation
1. Handle negative signs
const isNegative = (a < 0) ^ (b < 0);


The ^ operator is XOR.

This means isNegative will be true if exactly one of a or b is negative.

Example:

a = -4, b = 5 → negative ^ positive → true (result should be negative).

a = -7, b = -8 → negative ^ negative → false (result should be positive).

a = Math.abs(a);
b = Math.abs(b);


Convert both numbers to positive for easier processing.

We'll fix the sign at the end.

2. Initialize result
let result = 0;


This will hold our running sum (the multiplication result).

We’ll gradually add contributions from a as we process bits of b.

3. Main loop (process each bit of b)
while (b > 0) {


Loop continues until b becomes zero.

Each iteration corresponds to looking at the lowest bit of b (like binary multiplication).

4. Check if lowest bit of b is 1
if (b & 1) { 
    result += a;
}


b & 1 checks if the least significant bit (LSB) of b is 1 (i.e., b is odd).

If it’s 1, we add current a to the result.

👉 Why?
Think about multiplication in binary.
Example: 13 × 9

13 (binary 1101) × 9 (binary 1001)

Binary multiplication says: wherever b has a 1 bit, you add a shifted version of a.

So if the current bit is 1, we add the current value of a to our result.

5. Update a and b
a <<= 1;  // double a
b >>= 1;  // halve b


a <<= 1 shifts a left by 1 → multiplies a by 2.

b >>= 1 shifts b right by 1 → divides b by 2 (integer division).

👉 Why?
This mimics long multiplication:

When you move one place to the left in binary, you multiply by 2.

When you move one place to the right in binary, you divide by 2.

So, each iteration shifts the focus to the next higher bit of b, while adjusting a accordingly.

6. Fix sign and return
return isNegative ? -result : result;


If only one of the numbers was negative, flip the sign.

Otherwise, return positive result.

Why this works

This is basically the Russian Peasant Multiplication algorithm (also called “binary multiplication”):

Any integer b can be represented in binary.

Example: b = 13 → binary 1101.

So, a × b = (a × 1) + (a × 4) + (a × 8) (because 1101 means 1 + 4 + 8).

We build this sum bit by bit:

If the current bit of b is 1, add a to result.

Then double a (for the next bit) and halve b.

That’s why it runs in O(log b) time, 
since we only need to process each bit of b.
*/
function multiply(a, b) {
    // Handle negative numbers
    const isNegative = (a < 0) ^ (b < 0);
    a = Math.abs(a);
    b = Math.abs(b);

    let result = 0;
    while (b > 0) {
        if (b & 1) { // if b is odd
            result += a;
        }
        a <<= 1;  // double a
        b >>= 1;  // halve b
    }

    return isNegative ? -result : result;
}

// Examples
console.log(multiply(1, 2)); // 2
console.log(multiply(2, 3)); // 6
console.log(multiply(-4, 5)); // -20
console.log(multiply(-7, -8)); // 56
