/*
1221. Split a String in Balanced Strings

Solution - https://leetcode.com/problems/split-a-string-in-balanced-strings/solutions/5063019/optimal/

Description
Balanced strings are those that have an equal quantity of 'L' and 'R' characters.

Given a balanced string s, split it into some number of substrings such that:

Each substring is balanced.
Return the maximum number of balanced strings you can obtain.

 

Example 1:

Input: s = "RLRRLLRLRL"
Output: 4
Explanation: s can be split into "RL", "RRLL", "RL", "RL", each substring contains same number of 'L' and 'R'.
Example 2:

Input: s = "RLRRRLLRLL"
Output: 2
Explanation: s can be split into "RL", "RRRLLRLL", each substring contains same number of 'L' and 'R'.
Note that s cannot be split into "RL", "RR", "RL", "LR", "LL", because the 2nd and 5th substrings are not balanced.
Example 3:

Input: s = "LLLLRRRR"
Output: 1
Explanation: s can be split into "LLLLRRRR".
 

Constraints:

2 <= s.length <= 1000
s[i] is either 'L' or 'R'.
s is a balanced string.
*/
/*
The time complexity of the balancedStringSplit function is O(n), where n is the length of the input string s. This is because the function performs a single pass through the string, checking the characters one by one. The loop iterates through each character exactly once, so the time complexity is linear.
The space complexity of the function is O(1), which means it has constant space complexity. This is because the function only uses a few variables to keep track of the current state of the program, and these variables have a constant size. Therefore, the space required by the function does not depend on the size of the input.
*/

var balancedStringSplit = function (s) {
    let total = 0;
    let ans = 0;
    for (let i of s) {
        if (i === "L") {
            total++;
        }
        else {
            total--;
        }
        if (total === 0) ans++;
    }
    return ans;
};

let s = "RLRRLLRLRL";
//s = "RLRRRLLRLL"
//s = "LLLLRRRR"
console.log(balancedStringSplit(s))