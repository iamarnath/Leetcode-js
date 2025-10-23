/*
22. Generate Parentheses

Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

 

Example 1:

Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
Example 2:

Input: n = 1
Output: ["()"]
 

Constraints:

1 <= n <= 8
*/
/*
The function explores all possible placements 
of '(' and ')' using recursion.

Only adds '(' if “open” count is less than n. 
Only adds ')' if “close” count is less than “open”.

Base case: Once the string reaches length 
2n (all pairs placed), that combination is valid

*/
/*
Time Complexity
The total number of valid sequences is the 
n
nth Catalan number (Cn):

Cn = (1/n+1)( 2n 
              n)
The code generates every valid sequence, with each of length 
2n, so time complexity is 
O(Cn ⋅ n) since each sequence has 
2n steps.

Approximate growth: Catalan numbers grow exponentially: 
Cn ∼ ( 4 ^n ) / (n ^ 1.5)Sqrt(π) , so the runtime is exponential in n.

Space Complexity
Result array: Stores 
Cn sequences, each of length 

2n: O(Cn ⋅ n)
Recursion stack: At most 

2n calls deep (because each combination builds up to length 2n): 

O(n) auxiliary space

*/
function isValid(str) {
    let count = 0;
    for (let ch of str) {
        if (ch === '(')
            count++;
        else
            count--;
        if (count < 0)
            return false;
    }
    return count === 0;
}

function generateParenthesisNotUse(n) {
    const result = [];
    
    function solve(curr) {
        if (curr.length === 2 * n) {
            if (isValid(curr)) {
                result.push(curr);
            }
            return;
        }
        solve(curr + '(');
        solve(curr + ')');
    }
    
    solve('');
    return result;
}

/*
In the C++ code, curr.pop_back() is used after
 appending a character to the string so the
  recursion can backtrack and restore curr
   to its previous state after each recursive call.
    This is necessary because the curr string is
     mutated in place using push_back() and must
      be returned to its previous form for the next branch of recursion.

In JavaScript, strings are immutable. When 
concatenating a character (e.g., curr + '(')
, a new string is created and passed to the
 recursive function. This means the original 
 string (curr) remains unchanged, so there is
  no need to remove the last character after 
  the recursive call. Consequently, there is 
  no equivalent to pop_back() in the JavaScript
   version; the immutability of strings makes backtracking automatic
*/
function generateParenthesis(n) {               // (1) Defines main function with input n: number of pairs
    const result = [];                          // (2) Initialize output array to store valid parentheses combinations
    function solve(curr, open, close) {         // (3) Helper function to perform backtracking
        if (curr.length === 2 * n) {            // (4) Base case: If current string reaches max length, it's complete
            result.push(curr);                  // (5) Add valid combination to result array
            return;                             // (6) Stop further recursion on this branch
        }
        if (open < n) {                         // (7) If opening parentheses can be added
            solve(curr + '(', open + 1, close); // (8) Add '(' then recurse, increment open count
        }
        if (close < open) {                     // (9) Only add ')' if it doesn't exceed number of '('
            solve(curr + ')', open, close + 1); // (10) Add ')' then recurse, increment close count
        }
    }
    solve('', 0, 0);                            // (11) Initiate recursion with empty string and zero counts
    return result;                              // (12) Return array of all valid combinations
}

let n = 2;
let res = generateParenthesis(n);
console.log("generateParenthesis ==",res)