/*
66. Plus One
You are given a large integer represented 
as an integer array digits, where each 
digits[i] is the ith digit of the integer.
 The digits are ordered from most significant
  to least significant in left-to-right order.
   The large integer does not contain any leading 0's.

Increment the large integer by one and
 return the resulting array of digits.

Example 1:

Input: digits = [1,2,3]
Output: [1,2,4]
Explanation: The array represents the integer 123.
Incrementing by one gives 123 + 1 = 124.
Thus, the result should be [1,2,4].
Example 2:

Input: digits = [4,3,2,1]
Output: [4,3,2,2]
Explanation: The array represents the integer 4321.
Incrementing by one gives 4321 + 1 = 4322.
Thus, the result should be [4,3,2,2].
Example 3:

Input: digits = [9]
Output: [1,0]
Explanation: The array represents the integer 9.
Incrementing by one gives 9 + 1 = 10.
Thus, the result should be [1,0].

Constraints:

1 <= digits.length <= 100
0 <= digits[i] <= 9
digits does not contain any leading 0's.

*/
/*
Initialization:
The function starts by getting the length of the input array (n).

Loop from End to Start:
It iterates over the array from the last digit (least significant) to the first (most significant). This is because addition can cause a carry that affects higher digits.

Check for Non-9 Digit:

If the current digit is not 9, it increments the digit 
and breaks the loop (no further carry is needed).
If the digit is 9, it sets it to 0 and continues to
 the next higher digit (carry propagates).

Check for Overflow:
After the loop, if the most significant digit is 0 (which only happens if all digits were 9), it means there is a carry out from the most significant digit.
In this case, it creates a new array of length n+1, sets the first digit to 1, and the rest to 0 (e.g., `` becomes [1]).

Return Result:
If there was no overflow, it returns the modified original array.
If there was overflow, it returns the new, larger array.

Example Walkthrough
Given digits = [1][2]:

First iteration:
digits[2] = 9 → set to 0, carry over.

Second iteration:

digits[1] = 2 → increment to 3, break.
Final array: [1][3]
No overflow, so return this array.

Given digits = :
All digits are 9:
Set all to 0, carry propagates.

After loop:

Most significant digit is 0 → overflow.
Create new array: [1]
Return this array.

The time complexity of your plusOne function is O(n), where 

n is the number of digits in the input array. 
This is because the function performs a single loop 
over the array from the end to the beginning, and 
in the worst case, it will visit every element once.

The space complexity is O(1) if you do not count
 the space taken by the output array. If you do count
  the output, then in the worst case (when all 
  digits are 9 and you need to add a new digit at the start),
   the space complexity is O(n) because you create a new array of size 

n+1. However, in most discussions—especially 
in coding interviews—the space complexity is 
considered O(1) unless explicitly asked about output space.

*/
var plusOne = function(digits) {
    const n = digits.length;
    for (let i = n - 1; i >= 0; i--) {
        if (digits[i] !== 9) {
            digits[i]++;
            break;
        } else {
            digits[i] = 0;
        }
    }
    if (digits[0] === 0) {
        const res = new Array(n + 1).fill(0);
        res[0] = 1;
        return res;
    }
    return digits;
}

let digits = [1,2,3];
let res = plusOne(digits);
console.log("plusOne==",res)