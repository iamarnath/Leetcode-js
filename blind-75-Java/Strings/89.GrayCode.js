/*
89. Gray Code

An n-bit gray code sequence is a sequence of 2n integers where:

Every integer is in the inclusive range [0, 2n - 1],
The first integer is 0,
An integer appears no more than once in the sequence,
The binary representation of every pair of adjacent integers differs by exactly one bit, and
The binary representation of the first and last integers differs by exactly one bit.
Given an integer n, return any valid n-bit gray code sequence.
Example 1:

Input: n = 2
Output: [0,1,3,2]
Explanation:
The binary representation of [0,1,3,2] is [00,01,11,10].
- 00 and 01 differ by one bit
- 01 and 11 differ by one bit
- 11 and 10 differ by one bit
- 10 and 00 differ by one bit
[0,2,3,1] is also a valid gray code sequence,
 whose binary representation is [00,10,11,01].
- 00 and 10 differ by one bit
- 10 and 11 differ by one bit
- 11 and 01 differ by one bit
- 01 and 00 differ by one bit
Example 2:

Input: n = 1
Output: [0,1]
 

Constraints:

1 <= n <= 16

*/

var grayCode = function(n) {
    const result = [];
    const totalCodes = 1 << n;
  
    for (let i = 0; i < totalCodes; i++) {
        //For each integer i: Gray(i)=i ^ (i>>1), where 
        // ^ is XOR and >> is right shift
        const grayValue = i ^ (i >> 1);
        result.push(grayValue);
    }
  
    return result;
};

class Solution {
    grayCode(n) {
        const grayStrings = this.generate(n);
        const ans = [];
        //Calls generate(n) to get all n-bit Gray codes as binary strings.
        for (const str of grayStrings) {
            //Converts each binary string to its decimal 
            // number using parseInt(str, 2) and pushes into the result array.
            ans.push(parseInt(str, 2));
        }
        //Returns the array of Gray codes in decimal format.
        return ans;
    }
  
    generate(n) {
        //Base case: When n=1, returns ["0", "1"].
        if (n === 1) {
            return ["0", "1"];
        }
        //Recursive step: For higher 
        //n, it first gets all (n-1)-bit Gray codes.
        const temp = this.generate(n - 1);
        const ans = [];
        // Prepend '0' to the first half
        //Prepends '0' to each code from the (n-1)-bit result, stores in order.
        for (let i = 0; i < temp.length; i++) {
            ans.push("0" + temp[i]);
        }
        // Prepend '1' to the reversed second half
        // Prepends '1' to each code from the (n-1)-bit result,
        // but in reversed order, ensuring each
        // successive code only changes one bit.
        for (let i = temp.length - 1; i >= 0; i--) {
            ans.push("1" + temp[i]);
        }
        //Returns the combined array for n
        return ans;
    }
}
/*
Example for 
n=3
For 
n=1: ["0", "1"]

For 
n=2: ['00', '01', '11', '10']

For 
n=3: ['000', '001', '011', '010', '110', '111', '101', '100']

*/