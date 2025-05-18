/*
371. Sum of Two Integers

Given two integers a and b,
 return the sum of the two integers
  without using the operators + and -.

Example 1:

Input: a = 1, b = 2
Output: 3
Example 2:

Input: a = 2, b = 3
Output: 5

Constraints:

-1000 <= a, b <= 1000
*/

/*

How Binary Addition Works
When you add two binary numbers:

The sum at each bit is the XOR (^) of the bits.

The carry at each bit is the AND (&) of the bits, 
shifted left by 1 (because the carry affects the next higher bit).

*/

function getSum(a, b) {
    //The loop continues as long as there is a carry to add.
    while (b != 0) {
        /*
        a & b finds all positions where both a and b have 
        a 1 (which means a carry is generated).

       << 1 shifts the carry left by one bit, 
       because in binary addition, a carry from position i
        affects position i+1.

        */
        let carry = (a & b) << 1;
        //a ^ b adds the numbers at each bit position,
        //  ignoring carry (just like adding 1+1 in binary 
        // gives 0, and the carry is handled separately).
        a = a ^ b;
        //The carry is now assigned to b and will be
        //  added in the next iteration.
        b = carry;
    }
    return a;

}

let a = 1, b = 9;
let res = getSum(a, b);

console.log("sum ==",res);