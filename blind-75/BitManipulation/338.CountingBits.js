/*
338. Counting Bits
Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.

 

Example 1:

Input: n = 2
Output: [0,1,1]
Explanation:
0 --> 0
1 --> 1
2 --> 10
Example 2:

Input: n = 5
Output: [0,1,1,2,1,2]
Explanation:
0 --> 0
1 --> 1
2 --> 10
3 --> 11
4 --> 100
5 --> 101
 

Constraints:

0 <= n <= 105

*/

function countBits(n) {
    let res = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {
        let num = i;
        while (num !== 0) {
            num = (num & (num - 1)); // Turn off the rightmost set bit
            res[i]++;
        }
    }
    return res;
}

/*
For each number i from 2 to n:

If i is even:

Its binary representation is the same as i / 2 but 
with an extra 0 at the end (right-shifted).

The number of 1s in i is the same as in i / 2.

Example:

4 (binary 100) → 4/2 = 2 (binary 10)

Both have one set bit.

If i is odd:

Its binary representation is the same as Math.floor(i / 2),
 but with an extra 1 at the end.

The number of 1s in i is one more than in Math.floor(i / 2).

Example:

5 (binary 101) → Math.floor(5/2) = 2 (binary 10)

2 has one set bit, so 5 has two set bits.

5. Return Result
javascript
return res;
Returns the array of set bit counts for all numbers from 0 to n.

Why Is This Efficient?
Each number’s set bit count is built from a previously 
computed value, so there’s no need to count bits from scratch.

The function runs in O(n) time and uses O(n) space.

Example
For n = 5, the output will be:

javascript
[0, 1, 1, 2, 1, 2]
0: 000 → 0
1: 001 → 1
2: 010 → 1
3: 011 → 2
4: 0100 → 1
5: 0101 → 2
Summary Table
i	Binary	res[i] Calculation	res[i]
0	0	base case	0
1	1	base case	1
2	10	res[2/2] = res	1
3	11	res[Math.floor(3/2)]+1=2	2
4	100	res[4/2] = res	1
5	101	res[Math.floor(5/2)]+1=2	2
In summary:
The function efficiently builds up the answer for each number 
using previously computed results and simple even/odd logic,
 making it both optimal and easy to understand!


*/
function countBitsOptimal(n) {
    let res = new Array(n + 1).fill(0);
    if (n === 0) return res;
    res[1] = 1;
    for (let i = 2; i <= n; i++) {
        if (i % 2 == 0) {
            res[i] = res[i / 2];
        }
        else {
            res[i] = res[Math.floor(i / 2)] + 1;
        }
    }
    return res
}
/*
1. Bitwise Right Shift (i >> 1)
This operation shifts all bits of i one position to the
 right, effectively dividing i by 2 and discarding the remainder.

Example:

If i = 5 (binary 101), i >> 1 is 2 (binary 10).

2. Bitwise AND with 1 (i & 1)
This operation checks if the least significant bit of i 
is set (i.e., if i is odd).

If i is even, i & 1 is 0.

If i is odd, i & 1 is 1.

3. Putting It Together
result[i >> 1] gives the number of 1s in the binary 
representation of i divided by 2 (i.e., i with its last bit removed).

(i & 1) adds 1 if the last bit is set
 (i.e., if i is odd), otherwise adds 0.

So, result[i] is the number of 1s in i >> 1 plus 1 if i is odd.

Example
Let’s compute result:

5 in binary: 101

5 >> 1 is 2 (binary 10)

result is 1 (since 10 has one 1)

5 & 1 is 1 (since 5 is odd)

So, result = 1 + 1 = 2 (since 101 has two 1s)

*/
function countBitsBin(n) {
    const result = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {

        result[i] = result[i >> 1] + (i & 1);
    }
    return result;
}

let n = 5;

console.log("count bits countBitsOptimal==", countBitsBin(n));