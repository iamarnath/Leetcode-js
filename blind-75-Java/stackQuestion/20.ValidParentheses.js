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
/*
The statement for(const ch of s) uses the for...of loop to iterate over each character in the string s, giving the value of each character one at a time.

What for...of Does
Iterates over values: For strings, arrays, Maps, Sets, etc., it loops through each value—not keys or indices.

In your example, ch will take on the values '(', ')', '[', ']', '{', and '}', one at a time.

Differences from Other Loops
Loop Type	Iterates Over	Best For	Example Usage
for...of	Values of iterable	Arrays, strings, Maps, Sets	for (const ch of s) → '(' ')' '[' ']' '{' '}'
for...in	Keys/properties	Objects, array indices	for (const i in s) → '0' '1' '2' ...
for loop	Indices (customizable)	Any (flexible with condition/index)	for (let i=0;i<s.length;i++) → s[i] access
for...in is for looping object properties/keys and array indices, not direct values.

for loop (the classic version) gives manual control over index and can access indices, values, or any range or step needed.

for...of is more concise for values; it is preferred for directly working with iterable values, such as looping over characters in a string or items in an array.


*/
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