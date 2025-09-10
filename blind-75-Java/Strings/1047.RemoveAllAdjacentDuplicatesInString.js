/*
1047. Remove All Adjacent Duplicates In String

You are given a string s consisting of lowercase English letters.
 A duplicate removal consists of choosing two adjacent 
 and equal letters and removing them.

We repeatedly make duplicate removals on s until we no longer can.

Return the final string after all such duplicate 
removals have been made. It can be proven that 
the answer is unique.
Example 1:

Input: s = "abbaca"
Output: "ca"
Explanation: 
For example, in "abbaca" we could remove "bb" since the 
letters are adjacent and equal, and this is the only possible move. 
 The result of this move is that the string is "aaca", of
  which only "aa" is possible, so the final string is "ca".
Example 2:

Input: s = "azxxzy"
Output: "ay"
 

Constraints:

1 <= s.length <= 105
s consists of lowercase English letters.

*/
/*
Let’s walk through an example for the input: "abbaca".

Start: stack = []

i = 5 (s='a'): stack is empty → push 'a' → stack: ['a']

i = 4 (s='c'): top is not 'c' → push 'c' → stack: ['a','c']

i = 3 (s='a'): top is not 'a' → push 'a' → stack: ['a','c','a']

i = 2 (s='b'): top is not 'b' → push 'b' → stack: ['a','c','a','b']

i = 1 (s='b'): top is 'b' → pop (remove both) → stack: ['a','c','a']

i = 0 (s='a'): top is 'a' → pop (remove both) → stack: ['a','c']

Now, pop and build result:

pop 'c', result='c'

pop 'a', result='ca'

Final output: 'ca' – all adjacent duplicates have been removed.

Stack Operation Table
Step	Character	Stack Before	        Action	    Stack After
1	        'a'	     []	                    push 'a'	['a']
2	        'c'	     ['a']	                push 'c'	['a','c']
3	        'a'	     ['a','c']	            push 'a'	['a','c','a']
4	        'b'	     ['a','c','a']	        push 'b'	['a','c','a','b']
5	        'b'	     ['a','c','a','b']	    pop 'b'	    ['a','c','a']
6	        'a'	     ['a','c','a']	        pop 'a'	    ['a','c']
This approach uses a stack to efficiently remove adjacent duplicates from a string in a single pass.

*/
//performs better on leetcode
var removeDuplicates = function(s) {
    let st = [];
    //Iterates from the end of the string towards
    //  the front, so we process every character backwards.
    for (let i = s.length - 1; i >= 0; i--) {
        //Checks if the stack is empty, or if the top of the
        //  stack is different from the current character. 
        // If true, it means we can safely push this
        //  character onto the stack.
        if (st.length === 0 || st[st.length - 1] !== s[i]) {
            //Adds the current character to the top of the stack 
            // because it's not a duplicate neighbor at the stack's top.
            st.push(s[i]);
        } else {
            //If the above condition fails, it means this 
            // character is a duplicate of the top of the stack.
            //Removes the duplicate character from the top of the stack,
            //  thus eliminating pairs of adjacent duplicates.
            st.pop();
        }
    }
    let result = "";
    //Loops while there are still elements in the stack.
    while (st.length > 0) {
    //Pops off the stack (removes the top character) 
    // and appends it to the result string, rebuilding 
    // the answer (in original left-to-right order).
        result += st.pop();
    }
    return result;
};
// in terms of time,taking more 
var removeDuplicatesTT = function(s) {
    const stack = [];
    for (const ch of s) {
        if (stack.length === 0 || stack[stack.length - 1] !== ch) {
            stack.push(ch);
        } else {
            stack.pop();
        }
    }
    return stack.join('');
}

s = "abbaca";
let res = removeDuplicates(s);
console.log("removeDuplicates==",res); // "ac"