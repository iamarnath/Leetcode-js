/*
20. Valid Parentheses

Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Every close bracket has a corresponding open bracket of the same type.
 

Example 1:

Input: s = "()"

Output: true

Example 2:

Input: s = "()[]{}"

Output: true

Example 3:

Input: s = "(]"

Output: false

Example 4:

Input: s = "([])"

Output: true

Example 5:

Input: s = "([)]"

Output: false

 

Constraints:

1 <= s.length <= 104
s consists of parentheses only '()[]{}'.

*/

function isValid(s) {
    const st = [];
    for (const ch of s) {
        if (st.length === 0 || ch === '(' || ch === '{' || ch === '[') {
            st.push(ch);
            continue;
        }
        if (ch === ')') {
            if (st[st.length - 1] === '(')
                st.pop();
            else
                return false;
        } else if (ch === '}') {
            if (st[st.length - 1] === '{')
                st.pop();
            else
                return false;
        } else if (ch === ']') {
            if (st[st.length - 1] === '[')
                st.pop();
            else
                return false;
        }
    }
    return st.length === 0;
}

s = "()[]{";
let res = isValid(s);

//console.log("isValid ==",isValid(s));

var isValid = function(s) {
    const stack = [];
    const pairs = {
        ')': '(',
        ']': '[',
        '}': '{'
    };
    
    for(const ch of s){
        if (ch === '(' || ch === '[' || ch === '{') {
            stack.push(ch);
        } else if (stack.pop() !== pairs[ch]) {
                return false;
        }
    }
    return stack.length === 0;
};

console.log(isValid(s))