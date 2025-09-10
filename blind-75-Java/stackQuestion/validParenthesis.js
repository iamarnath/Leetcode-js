/*
Description
You are given a string s consisting of the following 
characters: '(', ')', '{', '}', '[' and ']'.

The input string s is valid if and only if:

Every open bracket is closed by the same type of close bracket.
Open brackets are closed in the correct order.
Every close bracket has a corresponding open bracket of the same type.
Return true if s is a valid string, and false otherwise.

Example 1:

Input: s = "[]"

Output: true
Example 2:

Input: s = "([{}])"

Output: true
Example 3:

Input: s = "[(])"

Output: false
Explanation: The brackets are not closed in the correct order.

Constraints:

1 <= s.length <= 1000


*/
function match(l, r) {
    return (l == '(' && r == ")") || (l == "[" && r == "]") || (l == "{" && r == "}");
}

function isBracketsBalanced(expr) {
    let stack = [];
    for (let i = 0; i < expr.length; i++) {
        let x = expr[i];
        if (x === "(" || x === "[" || x === "{") {
            stack.push(x);
            console.log("match==", stack);
        }
        else if (stack.length == 0 || !match(stack[stack.length - 1], x)) {
            console.log("not match==", stack);
            return false;
        }
        else {
            stack.pop();
            console.log("pop==", stack);
        }
    }

    // for (const c of expr) {
    //     if (c == '(' || c == '{' || c == '[') {
    //         stack.push(c);
    //     } else if (stack.length == 0 || !match(stack[stack.length - 1], c)) {
    //         return false;
    //     } else {
    //         stack.pop();
    //     }
    // }
    return stack.length === 0;
}

//console.log(isBracketsBalanced("[(])"));
console.log(isBracketsBalanced("([{}])"));