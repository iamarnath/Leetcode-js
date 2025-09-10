/*
678. Valid Parenthesis String
Given a string s containing only three types
 of characters: '(', ')' and '*', return true if s is valid.

The following rules define a valid string:

Any left parenthesis '(' must have a 
corresponding right parenthesis ')'.
Any right parenthesis ')' must have a
corresponding left parenthesis '('.
Left parenthesis '(' must go before the 
corresponding right parenthesis ')'.
'*' could be treated as a single right parenthesis ')' 
or a single left parenthesis '(' or an empty string "".
 

Example 1:

Input: s = "()"
Output: true
Example 2:

Input: s = "(*)"
Output: true
Example 3:

Input: s = "(*))"
Output: true
 

Constraints:

1 <= s.length <= 100
s[i] is '(', ')' or '*'.

*/
/*
Problem Context:
The function checks if a string containing '(', ')',
 and '*' can be a valid balanced parenthesis string,
  where '*' can be treated as '(', ')', or an empty string.

Dynamic Programming / Memoization:

A memoization table t is used to store results of
 subproblems to avoid redundant computation.

t[idx][open] is 1 if the substring from idx to 
end with open unclosed parentheses is valid, 0 otherwise.

Recursive Logic:

Base Case: If we reach the end of the string (idx === n),
 check if all parentheses are balanced (open === 0).

Memoization Check: If the result for current idx
 and open is already computed, return it.

Character Handling:

'*': Try all three options (as '(', ')', or empty).

'(': Increase the count of unclosed parentheses.

')': Decrease the count if possible.

Return Value:

The function returns true if the string is valid, false otherwise.

Time Complexity
The function uses a recursive approach with 
memoization to avoid redundant calculations.
 The memoization table t is of size n × K, where
  n is the length of the input string and K is 
  the maximum possible value for open (the number 
  of unclosed parentheses, which in your code is 
  capped at 100, but in practice, for any input string
   of length n, open can range from 0 to n).

However, in your code, the second dimension of t
 is set to 101 (i.e., t[idx][open] where open goes
  up to 100). If the input string is very long,
   this cap might be insufficient and could
    cause incorrect results. However, for the 
    purpose of this analysis, we’ll assume that the
     open value never exceeds the table’s bounds.

Each unique combination of (idx, open) is 
computed at most once. Since idx ranges from
 0 to n-1 and open can be up to n in the worst
  case (if the table is sized accordingly),
   the number of unique states is O(n²).

Time complexity: O(n²)

Each state is computed in constant time thanks to memoization.

If open is capped at a constant (like 100), 
the complexity is technically O(n), but for
 the general case where open can reach n, it is O(n²).

Space Complexity
The memoization table stores results for each (idx, open) pair.

Space complexity: O(n²)

The table is of size n × (n + 1) in the worst case (if open can go up to n).

If open is capped at a constant, the space complexity is O(n).

*/
var checkValidStringRec = function (s) {
    const n = s.length;
    // Memoization table: t[idx][open] will store 1 for 
    // true, 0 for false, -1 for unset
    const t = Array.from({ length: n + 1 }, () => Array(101).fill(-1));
    function solve(idx, open) {
        if (idx === n) {
            return open === 0;
        }
        if (t[idx][open] !== -1) {
            return t[idx][open];
        }
        let isValid = false;
        if (s[idx] === "*") {
            // Treat '*' as '('
            isValid = isValid || solve(idx + 1, open + 1);
            // Treat '*' as empty string
            isValid = isValid || solve(idx + 1, open);
            // Treat '*' as ')', if possible
            if (open > 0) {
                isValid = isValid || solve(idx + 1, open - 1);
            }
        }
        else if (s[idx] === "(") {
            isValid = isValid || solve(idx + 1, open + 1);
        }
        else if (open > 0) {  // Treat 's[idx]' as ')',
            isValid = isValid || solve(idx + 1, open - 1);
        }
        t[idx][open] = isValid ? 1 : 0;
        return isValid;
    }
    return solve(0, 0);
};
/*
Initialization:
The table t is a 2D array with n+1 rows
 and n+1 columns, initialized to false.
The base case is t[n] = true, meaning an
 empty string with zero open brackets is valid.

Filling the Table:

For each index i from n-1 down to 0:

For each possible number of open brackets open from 0 to n:

If the character is '*', consider all three options: '(', ')', or empty.

If the character is '(', increase the open count.

If the character is ')', decrease the open count if possible.

Result:
The answer is found in t

Time Complexity
The algorithm uses a nested loop structure:

Outer loop: Iterates over each index of the string 
from n-1 down to 0 (so n iterations).

Inner loop: Iterates over all possible values 
of open (the number of unclosed parentheses), 
from 0 up to n (so up to n+1 iterations per index).

Each cell in the table is computed in
constant time, since it only involves a
 few lookups and logical operations.

Therefore, the time complexity is:

O(n×(n+1))=O(n^ 2)
This is because for each of the n indices, you perform up to n+1 operations.

Space Complexity
The algorithm uses a two-dimensional table (t) to store intermediate results:

Table size: (n+1) × (n+1)

Each cell in the table stores a boolean value.

Therefore, the space complexity is:

O(n ^ 2)
This is because you are storing a table that is roughly n × n in size.
*/
var checkValidStringDP = function (s) {
    const n = s.length;
    // State Definition: t[i][j] = if the string
    //  from index i to n-1 is valid or not having j open brackets
    const t = Array.from({ length: n + 1 }, () => Array(n + 1).fill(false));
    t[n][0] = true;

    for (let i = n - 1; i >= 0; i--) {
        for (let open = 0; open <= n; open++) {
            let isValid = false;

            if (s[i] === '*') {
                // Treat '*' as '('
                if (open + 1 <= n) isValid = isValid || t[i + 1][open + 1];
                // Treat '*' as ')'
                if (open > 0) isValid = isValid || t[i + 1][open - 1];
                // Treat '*' as empty
                isValid = isValid || t[i + 1][open];
            } else {
                if (s[i] === '(') {
                    if (open + 1 <= n) isValid = isValid || t[i + 1][open + 1];
                } else if (open > 0) {
                    isValid = isValid || t[i + 1][open - 1];
                }
            }
            t[i][open] = isValid;
        }
    }

    return t[0][0];
}

/*
Initialization:

openSt and asterisksSt are used to keep track 
of indices of '(' and '*' encountered.

First Pass:

For each character in the string:

'(': Push its index onto openSt.

'*': Push its index onto asterisksSt.

')': Try to match it with the most recent
 '(' (pop from openSt). If no '(' left, try to 
 match with a '*' (pop from asterisksSt). If 
 neither is available, the string is invalid.

Post-processing:

After the first pass, there might be leftover '(' and '*'.

For each remaining '(', check if there is a '*' 
that appeared after it (by comparing indices). If not, the string is invalid.

Each valid pair (a '*' after a '(') cancels out (pop both stacks).

Result:

If all '(' are matched, the string is valid.

Time and Space Complexity
Time Complexity:

First pass: 

O(n), where 

n is the length of the string.

Post-processing: Up to 

O(n) if all characters are '(' or '*' 
(but in practice, the number of pops is limited by 
the size of the stacks, which is at most n).

Overall: 

O(n)

Space Complexity:

Stacks: Each stack can grow up to 
n elements in the worst case.

Overall: O(n)
*/
var checkValidString2Stack = function (s) {
    const openSt = [];
    const asterikSt = [];
    let strLen = s.length;
    for (let i = 0; i < strLen; i++) {
        const ch = s[i];
        if (ch === "(") {
            openSt.push(i);
        }
        else if (ch === "*") {
            asterikSt.push(i);
        }
        else {// ch === ')'
            if (openSt.length > 0) {
                openSt.pop();
            }
            else if (asterikSt.length > 0) {
                asterikSt.pop();
            }
            else {
                return false;
            }
        }
    }
    // Post-processing for remaining '(' and '*'
    while (openSt.length > 0 && asterikSt.length > 0) {
        if (openSt[openSt.length - 1] > asterikSt[asterikSt.length - 1]) {
            return false;
        }
        openSt.pop();
        asterikSt.pop();
    }
    return openSt.length === 0;
}

/*

Left to Right Pass:

Treats every '(' or '*' as a potential opening parenthesis.
Decrements the counter for ')' (closing parentheses).
If the counter ever goes negative, the string is invalid.

Right to Left Pass:
Treats every ')' or '*' as a potential closing parenthesis.
Decrements the counter for '(' (opening parentheses).
If the counter ever goes negative, the string is invalid.

Result:

If both passes complete without the counters
 going negative, the string is considered valid.

Time and Space Complexity:

Time Complexity: 
O(n) (two passes over the string).

Space Complexity: 

O(1) (uses only a few variables).

*/
var checkValidString = function (s) {
    let open = 0;
    let close = 0;
    const n = s.length;
    // Left to Right - Check Open Brackets
    for (let i = 0; i < n; i++) {
        if (s[i] === "(" || s[i] === "*") {
            open++;
        }
        else {
            open--;
        }
        if (open < 0) {
            return false;
        }
    }
    // Right to Left - Check Close Brackets
    for (let i = n - 1; i >= 0; i--) {
        if (s[i] === ")" || s[i] === "*") {
            close++;
        }
        else {
            close--;
        }
        if (close < 0) {
            return false;
        }
    }
    return true;
}

let s = "(*)";

let res = checkValidString(s);

console.log("checkValidString==", res);