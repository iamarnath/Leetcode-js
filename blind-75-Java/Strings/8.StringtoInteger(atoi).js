/*
8. String to Integer (atoi)

Implement the myAtoi(string s) function, 
which converts a string to a 32-bit signed integer.

The algorithm for myAtoi(string s) is as follows:

Whitespace: Ignore any leading whitespace (" ").
Signedness: Determine the sign by checking if 
the next character is '-' or '+', 
assuming positivity if neither present.

Conversion: Read the integer by skipping leading 
zeros until a non-digit character is encountered 
or the end of the string is reached. If no digits 
were read, then the result is 0.
Rounding: If the integer is out of the 32-bit 
signed integer range [-231, 231 - 1], then round
 the integer to remain in the range. Specifically, 
 integers less than -2^31 should be rounded to -2^31, 
 and integers greater than 2^31 - 1 should be rounded to 2^31 - 1.
Return the integer as the final result.


Example 1:

Input: s = "42"

Output: 42

Explanation:

The underlined characters are what is read in and the caret
 is the current reader position.
Step 1: "42" (no characters read because there is no leading whitespace)
         ^
Step 2: "42" (no characters read because there is neither a '-' nor '+')
         ^
Step 3: "42" ("42" is read in)
           ^
Example 2:

Input: s = " -042"

Output: -42

Explanation:

Step 1: "   -042" (leading whitespace is read and ignored)
            ^
Step 2: "   -042" ('-' is read, so the result should be negative)
             ^
Step 3: "   -042" ("042" is read in, leading zeros ignored in the result)
               ^
Example 3:

Input: s = "1337c0d3"

Output: 1337

Explanation:

Step 1: "1337c0d3" (no characters read because there is no leading whitespace)
         ^
Step 2: "1337c0d3" (no characters read because there is neither a '-' nor '+')
         ^
Step 3: "1337c0d3" ("1337" is read in; reading stops because the next character is a non-digit)
             ^
Example 4:

Input: s = "0-1"

Output: 0

Explanation:

Step 1: "0-1" (no characters read because there is no leading whitespace)
         ^
Step 2: "0-1" (no characters read because there is neither a '-' nor '+')
         ^
Step 3: "0-1" ("0" is read in; reading stops because the next character is a non-digit)
          ^
Example 5:

Input: s = "words and 987"

Output: 0

Explanation:

Reading stops at the first non-digit character 'w'.
Constraints:

0 <= s.length <= 200
s consists of English letters
 (lower-case and upper-case), digits (0-9), ' ', '+', '-', and '.'.

*/
/*
For each character:

Convert it to a digit (currentValue).

If it's not a digit, break the loop.

Overflow check: Before adding the digit, check if answer 
would exceed 32-bit integer boundaries.

If overflow, return the appropriate boundary value.

Otherwise, update answer.
==================================================
Time Complexity: O(n)
n is the length of the string.

Each character is processed at most once.

Space Complexity: O(1)
Only a few variables are used, regardless of input size.

No extra data structures are used that grow with input.
*/
var myAtoi = function (s) {
    s = s.trim();
    if (!s) return 0;
    let isPositive = true;
    let i = 0;
    let answer = 0;
    let maxInt = 2 ** 31 - 1;
    let minInt = -(2 ** 31);
  
    if (s[i] === "+") {
        isPositive = true;
        i++
    }
    else if (s[i] === "-") {
        isPositive = false;
        i++
    }
    let strLen = s.length;
    while (i < strLen) {
        let currentValue = s[i].charCodeAt(0) - '0'.charCodeAt(0);
        if (currentValue > 9 || currentValue < 0) break;
        /*
        answer > Math.floor(maxInt / 10)
If answer is already greater than maxInt / 10, multiplying by 10 will definitely overflow.

answer > Math.floor((maxInt - currentValue) / 10)
If answer == maxInt / 10, you need to make sure that adding currentValue doesn't push it over the limit.
        */
        if (answer > Math.floor(maxInt / 10) ||
            answer > Math.floor((maxInt - currentValue) / 10)) {
            return isPositive ? maxInt : minInt;
        }
        answer = answer * 10 + currentValue;
        i++;
    }
    return isPositive ? answer : -answer;
};

let s = "-91283472332";
let res = myAtoi(s);
console.log("res==", res);