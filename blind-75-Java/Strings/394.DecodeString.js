/*
394. Decode String
Given an encoded string, return its decoded string.

The encoding rule is: k[encoded_string], where the 
encoded_string inside the square brackets is being 
repeated exactly k times. Note that k is 
guaranteed to be a positive integer.

You may assume that the input string is always
 valid; there are no extra white spaces, square 
 brackets are well-formed, etc. Furthermore, 
 you may assume that the original data does not contain 
 any digits and that digits are only for those 
 repeat numbers, k. For example, there will not be input like 3a or 2[4].

The test cases are generated so that the length of
 the output will never exceed 105.

 

Example 1:

Input: s = "3[a]2[bc]"
Output: "aaabcbc"
Example 2:

Input: s = "3[a2[c]]"
Output: "accaccacc"
Example 3:

Input: s = "2[abc]3[cd]ef"
Output: "abcabccdcdcdef"
 

Constraints:

1 <= s.length <= 30
s consists of lowercase English letters, digits, and square brackets '[]'.
s is guaranteed to be a valid input.
All the integers in s are in the range [1, 300].

*/

/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function(s) {
    //Creates an empty array to be used as a stack. The stack will hold
    //  intermediate numbers and strings as the function processes the input.
    let stack = [];
    //Initializes curNum to accumulate any number found in the string;
    //  this will represent how many times to repeat a substring.
    let curNum = 0;
    //Initializes curString to build the 
    // current substring as the code parses the input.
    let curString = "";
    //Iterates through every character c in the input string s one by one.
    for (let c of s) {
    //When encountering an opening bracket, do the following:
      if (c === "[") {
        //Push the current string onto the stack 
        // (could be empty at this point, or contain
        //  previously processed characters).
        stack.push(curString);
        //Push the current number (multiplier) to the stack.
        stack.push(curNum);
        //Reset curString for the new substring enclosed by the current [ and the next ].
        curString = "";
        //Reset curNum for any subsequent numbers.
        curNum = 0;
      } 
      //When encountering a closing bracket,
      //  the code completes a substring and needs to process it:
      else if (c === "]") {
        //Get the last multiplier stored for this substring.
        let num = stack.pop();
        //Get the string that appeared before this encoded substring started.
        let prevString = stack.pop();
        //Repeat the current built substring num times 
        // and append it to prevString, then assign this back to curString.
        curString = prevString + curString.repeat(num);
      } 
      //If the character is a digit (part of a number, 
      // for cases like "12[...]" being more than one digit):
      else if (!isNaN(c)) {
        //Parse the character as a number and build up
        // multi-digit numbers by shifting existing digits 
        // and adding the current one.
        curNum = curNum * 10 + Number(c);
      } else {
        //If the character is a letter:
        //Add the character to curString, building the substring between brackets or just the regular string.
        curString += c;
      }
    }
    //After processing all characters, returns the fully decoded string.
    return curString;
};

let s = "3[a]2[bc]"; 
let res = decodeString(s);
console.log("res==",res);// "aaabcbc"
