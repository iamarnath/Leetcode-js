/*
190. Reverse Bits

Reverse bits of a given 32 bits unsigned integer.

Note:

Note that in some languages, such as Java, there is no 
unsigned integer type. In this case, both input and 
output will be given as a signed integer type. They
 should not affect your implementation, as the 
 integer's internal binary representation is the same,
  whether it is signed or unsigned.
In Java, the compiler represents the signed integers 
using 2's complement notation. Therefore, 
in Example 2 above, the input represents the signed integer -3 
and the output represents the signed integer -1073741825.
 

Example 1:

Input: n = 00000010100101000001111010011100
Output:    964176192 (00111001011110000010100101000000)
Explanation: The input binary string 00000010100101000001111010011100
 represents the unsigned integer 43261596, so return 964176192
  which its binary representation is 00111001011110000010100101000000.
Example 2:

Input: n = 11111111111111111111111111111101
Output:   3221225471 (10111111111111111111111111111111)
Explanation: The input binary string 11111111111111111111111111111101
 represents the unsigned integer 4294967293, so return 3221225471
  which its binary representation is 10111111111111111111111111111111.
 

Constraints:

The input must be a binary string of length 32
 
Follow up: If this function is called many times, how would you optimize it?


*/

/*
const bit = (n >>> i) & 1;
Purpose: Extracts the i-th bit (from the right) of the 32-bit integer n.

How it works:

n >>> i: Shifts the bits of n right by i positions. 
The >>> operator is the unsigned right shift, which fills 
in zeros from the left, regardless of the sign of n.

& 1: Masks out all bits except the least significant bit, 
so the result is either 0 or 1.

Example:
If n = 5 (binary: 000...000101), and i = 2:

n >>> 2 gives 1 (binary: 000...000001)

1 & 1 is 1 (so the 2nd bit from the right is 1)

 res += bit << (31 - i);
Purpose: Places the extracted bit in its reversed position in the result.

How it works:

bit << (31 - i): Shifts the extracted bit left to the position 
that is the mirror of i in a 32-bit number.

If i = 0 (rightmost bit), it moves to position 31 (leftmost).

If i = 1, it moves to position 30, etc.

res += ...: Adds this shifted bit to the result.

Why Use >>> Instead of >>?
>>> (Unsigned Right Shift):

Fills leftmost bits with zeros.

Always treats the number as an unsigned 32-bit integer.

Example: (-1 >>> 1) is 2147483647 (binary: all 1s except leftmost is 0).

>> (Signed Right Shift):

Fills leftmost bits with the sign bit (0 for positive, 1 for negative).

Preserves the sign of the number (arithmetic shift).

Example: (-1 >> 1) is still -1 (binary: all 1s).

In bit manipulation tasks (like reversing bits), you want to treat
 the number as unsigned and fill with zeros, so you should use >>>.
  Using >> could introduce unwanted 1s at the left if the number is negative,
   leading to incorrect results.

Operator	Name	                Fills left bits with	  Use case
>>>	        Unsigned right shift	       0	                  Bit manipulation, unsigned
>>	         Signed right shift	      Sign bit(0 or 1)	               Arithmetic, signed numbers
*/
function reverseBits(n) {
    //res will store the reversed bits as they are built.
    let res = 0;
    for (let i = 0; i < 32; i++) {
        //n >>> i shifts the bits of n right by i positions,
        //  bringing the bit at position i to the least significant position.
        //& 1 masks out all other bits except the least
        //  significant one, so bit is either 0 or 1.
        const bit = (n >>> i) & 1;
        /*
        bit << (31 - i) shifts the extracted bit to its reversed position.

        For example, if i = 0 (least significant bit), it moves
         to position 31 (most significant bit).

        If i = 1, it moves to position 30, and so on.

        res += ... adds this shifted bit into the result.
        */
        res += bit << (31 - i);
    }
    //>>> 0 ensures the result is treated as an 
    // unsigned 32-bit integer in JavaScript.

    /*
    >>> is the unsigned right shift operator in JavaScript.

    res >>> 0 shifts res right by 0 bits, but forces 
    JavaScript to treat res as an unsigned 32-bit integer.
    This means:

    Any negative value or value larger than 2^32 - 1 is 
    converted to a 32-bit unsigned integer.

    The result is always a non-negative integer between 0 and 4294967295.


    */
    return res >>> 0;
}
/*
Step	                    Operation	       Purpose
Extract i-th bit	        (n >>> i) & 1	      Get the bit at position i
Place in reversed position	bit << (31 - i)	       Move it to the mirrored position
Add to result	            res += ...	           Build up the reversed number
Return as unsigned	         return res >>> 0	   Ensure unsigned 32-bit output
*/