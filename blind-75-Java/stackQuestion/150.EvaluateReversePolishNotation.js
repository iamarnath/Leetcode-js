/*
150. Evaluate Reverse Polish Notation
You are given an array of strings tokens that 
represents an arithmetic expression in a Reverse Polish Notation.

Evaluate the expression. Return an integer that 
represents the value of the expression.

Note that:

The valid operators are '+', '-', '*', and '/'.
Each operand may be an integer or another expression.
The division between two integers always truncates toward zero.
There will not be any division by zero.
The input represents a valid arithmetic expression in a reverse polish notation.
The answer and all the intermediate calculations can be represented in a 32-bit integer.
 

Example 1:

Input: tokens = ["2","1","+","3","*"]
Output: 9
Explanation: ((2 + 1) * 3) = 9
Example 2:

Input: tokens = ["4","13","5","/","+"]
Output: 6
Explanation: (4 + (13 / 5)) = 6
Example 3:

Input: tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
Output: 22
Explanation: ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
= ((10 * (6 / (12 * -11))) + 17) + 5
= ((10 * (6 / -132)) + 17) + 5
= ((10 * 0) + 17) + 5
= (0 + 17) + 5
= 17 + 5
= 22
 

Constraints:

1 <= tokens.length <= 104
tokens[i] is either an operator: "+", "-", "*", or "/", or
 an integer in the range [-200, 200].

*/
/*
Code Explanation
Initialization

stack: An empty array is used as a stack to store operands
 during evaluation.

operators: An object (dictionary) that maps operator
 strings to corresponding mathematical functions.

Processing each token

For each token in the tokens array:

If the token is an operator (+, -, *, /):

Pop the last two numbers from the stack (order matters: pop b, then a).

Apply the operator on these two operands: a op b.

Push the result back onto the stack.

If the token is a number:

Convert it from string to number using parseInt(token, 10) and push onto the stack.

Result

After processing all tokens, the stack contains one element—the result of the expression. Return this value.

Example
For the input ["2","1","+","3","*"]:

Push 2 → stack:

Push 1 → stack:

Read + → pop 1, pop 2, compute 2+1=3, push 3 → stack:

Push 3 → stack:

Read * → pop 3, pop 3, compute 3*3=9, push 9 → stack:

Stack now has one value (9), which is returned.

Time Complexity
O(n), where 
n
n is the number of tokens.

Each token is processed exactly once.

Each stack operation (push, pop) is O(1).

Space Complexity
O(n), where 
n
n is the number of tokens.

In the worst case (all tokens are numbers), the stack grows to size n.

Space used by the operator map/object is constant.

*/
function operate(a, b, s) {
    if (s === "+")
        return a + b;

    if (s === "-")
        return a - b;

    if (s === "*")
        return a * b;

    if (s === "/")
        // Use Math.trunc for integer division (matches Java's behavior)
        return Math.trunc(a / b);

    return -1;
}

var evalRPNOld = function(tokens) {
    const st = [];
    let result = 0;

    for (const s of tokens) {
        if (s === "+" || s === "-" || s === "*" || s === "/") {
            const b = st.pop();
            const a = st.pop();

            result = operate(a, b, s);
            st.push(result);
        } else {
            st.push(parseInt(s, 10));
        }
    }

    return st.pop();
}

var evalRPN = function(tokens) {
    const stack=[];
    const operators = {
        "+":(a,b)=>a+b,
        "-":(a,b)=>a-b,
        "*":(a,b)=>Math.trunc(a*b),
        "/":(a,b)=>Math.trunc(a/b)
    }
    for(const token of tokens){
        if(token in operators){
            const b = stack.pop();
            const a = stack.pop();
            const result = operators[token](a,b);
            stack.push(result);
        }
        else{
            stack.push(parseInt(token,10));
        }
    }
    return stack.pop();
}

//let tokens = ["2","1","+","3","*"];
let tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
let res = evalRPNOld(tokens);
console.log("evalRPN==",res);//22