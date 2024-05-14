/*
1614. Maximum Nesting Depth of the Parentheses

Solution - https://leetcode.com/problems/maximum-nesting-depth-of-the-parentheses/solutions/5153238/optimised/

Description
Given a valid parentheses string s, return the nesting depth of s. The nesting depth is the maximum number of nested parentheses.


Example 1:

Input: s = "(1+(2*3)+((8)/4))+1"

Output: 3

Explanation:

Digit 8 is inside of 3 nested parentheses in the string.

Example 2:

Input: s = "(1)+((2))+(((3)))"

Output: 3

Explanation:

Digit 3 is inside of 3 nested parentheses in the string.

Example 3:

Input: s = "()(())((()()))"

Output: 3

 

Constraints:

1 <= s.length <= 100
s consists of digits 0-9 and characters '+', '-', '*', '/', '(', and ')'.
It is guaranteed that parentheses expression s is a VPS.

*/

/*

Approach Explanation:
This code snippet is a JavaScript function that calculates the maximum depth of nested parentheses
 in a given string s.
 It iterates through each character in the string, incrementing the current depth when 
 encountering an opening parenthesis ( and decrementing it when encountering a closing parenthesis ). The maximum depth is updated whenever a new maximum depth is encountered during the traversal.

Time Complexity:

The time complexity of this code is O(n), where n is the length of the input string s.
 The algorithm iterates through each character in the string once, performing constant time 
 operations for each character. Therefore, the time complexity is linear with respect to the
  length of the input string.

Space Complexity:

The space complexity of this code is O(1). It uses a constant amount of extra space regardless
 of the input size. The variables maxDepth and currDepth are the only additional space used,
  and they do not scale with the input size. Hence, the space complexity is constant, making this
   algorithm efficient in terms of space utilization.

*/

var maxDepth = function (s) {
    let maxDepth = 0;
    let currDepth = 0;
    for (let ch of s) {
        if (ch === "(") {
            currDepth++;
            maxDepth = Math.max(maxDepth, currDepth);
        }
        else if (ch === ")") {
            currDepth--;
        }
    }
    return maxDepth;
}
let s = "()(())((()(())))";
s = "(1)+((2))+(((3)))"
console.log(maxDepth(s));