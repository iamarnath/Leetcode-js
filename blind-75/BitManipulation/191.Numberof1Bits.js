/*
191. Number of 1 Bits
You are given an unsigned integer n. Return the number of 1 bits in 
its binary representation.

You may assume n is a non-negative integer which fits within 32-bits.

Example 1:

Input: n = 11

Output: 3

Explanation:

The input binary string 1011 has a total of three set bits.

Example 2:

Input: n = 128

Output: 1

Explanation:

The input binary string 10000000 has a total of one set bit.

Example 3:

Input: n = 2147483645

Output: 30

Explanation:

The input binary string 1111111111111111111111111111101 has a total 
of thirty set bits.

Constraints:

1 <= n <= 231 - 1

*/

/*
logic

The expression n = (n & (n - 1)) is a classic bit manipulation
 trick used to turn off (clear) the rightmost set bit
  (the least significant 1) in the binary representation of an integer n.

How It Works
Subtracting 1 from n:
When you subtract 1 from 
n, all the bits after the rightmost set bit (including that bit) are flipped. 
For example, if 
n=52 (binary: 00110100), then 
n−1=51 (binary: 00110011).
Bitwise AND:
Performing n & (n - 1) keeps all bits the same except for the
 rightmost set bit, which is turned off (set to 0), and all less 
 significant bits (to the right) become 0.
 Example
Suppose 
n=52:

n      = 00110100
n - 1  = 00110011
------------------
n & (n-1) = 00110000


Counting Set Bits:

Each time you perform this operation, you remove one set bit from 
n. So, by repeating this operation and counting how
 many times you do it until 
n becomes 0, you can efficiently count the number of
 set bits (Hamming weight) in n.

Efficiency:
The operation runs in time proportional to the
 number of set bits, not the total number of bits.
*/

function hammingWeight(n) {
    let count = 0;
    while (n !== 0) {
        n = (n & (n - 1)); // Turn off the rightmost set bit
        count++;
    }
    return count;
}
//Follow up: If this function is called many times,
//  how would you optimize it?
//anaswer to follow up
const cache = new Map();

function hammingWeightCache(n) {
    if (cache.has(n)) return cache.get(n);
    let count = 0, x = n;
    while (x !== 0) {
        x = x & (x - 1);
        count++;
    }
    cache.set(n, count);
    return count;
}

//let  n = 00000000000000000000000000010111;

let n = 128;

let res = hammingWeight(n);
console.log("no of 1 bit ===", res);

/*
Time Complexity

The time complexity is O(k), where 
k is the number of set bits (1s) in the binary
 representation of the input integer n.
In the worst case, where all bits are set (for a 32-bit integer,
 that's 32 set bits), the loop runs 32 times, so the worst-case
  time complexity is O(1) (constant time), since the number of
   bits is fixed and does not depend on the input value itself.

For numbers with fewer set bits, the function is even faster,
 as it only loops once for each 1 bit.

Space Complexity

The space complexity is O(1) (constant space), as the function 
only uses a fixed number of variables regardless of the input value.

No additional data structures or significant memory allocations are used.


*/