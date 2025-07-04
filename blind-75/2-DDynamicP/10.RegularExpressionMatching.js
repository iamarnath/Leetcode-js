/*
10. Regular Expression Matching

Given an input string s and a pattern p, 
implement regular expression matching with support for '.' and '*' where:

'.' Matches any single character.​​​​
'*' Matches zero or more of the preceding element.
The matching should cover the entire input string (not partial).

Example 1:

Input: s = "aa", p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".
Example 2:

Input: s = "aa", p = "a*"
Output: true
Explanation: '*' means zero or more of the preceding element, 'a'.
 Therefore, by repeating 'a' once, it becomes "aa".
Example 3:

Input: s = "ab", p = ".*"
Output: true
Explanation: ".*" means "zero or more (*) of any character (.)".
 

Constraints:

1 <= s.length <= 20
1 <= p.length <= 20
s contains only lowercase English letters.
p contains only lowercase English letters, '.', and '*'.
It is guaranteed for each appearance of the character '*',
 there will be a previous valid character to match.
*/

/*
Purpose:
This code checks if a given string s matches a pattern p that supports:

. (matches any single character)

* (matches zero or more of the preceding element)

It uses recursion with memoization (dynamic programming)
 to avoid redundant computations.

Key Variables and Structures
t (memoization table):

A 2D array (t) initialized to -1 to store intermediate results.

t[i][j] stores whether the substring s[i..] matches the pattern p[j..].

solve(i, j, s, p):

Recursive function that checks if s[i..] matches p[j..].

isMatch(s, p):

Main function that initializes the memoization 
table and starts the recursion.

How the Recursion Works
Base Case:

If j reaches the end of the pattern (p), 
check if i also reached the end of the string (s).

Memoization Check:

If t[i][j] is already computed, return it.

Character Matching:

first_match checks if the current character in s 
matches the current character in p (or if p[j] is .).

Handling * in the Pattern:

If the next character in p is *, consider two cases:

Not using *: Skip the current character and * in p (j + 2).

Using *: If the current characters match, consume one 
character in s and keep the same position in p
 (since * can match multiple times).

No *:

If the current characters match, move both i and j forward.

Memoization:

Store the result in t[i][j] before returning.

Time and Space Complexity
Time Complexity
Recursion with Memoization:

Each pair (i, j) is computed at most once.

The number of possible (i, j) pairs is O(n * m), 
where n is the length of s and m is the length of p.

For each pair, the function performs a constant amount of 
work (comparisons, recursive calls).

Total Time Complexity:

O(n * m)

Where n = s.length and m = p.length.

Space Complexity
Memoization Table:

The table t is of size 21 x 21 (as per your code), 
which is constant (O(1)) for small strings.

However:

If you want to support arbitrary string lengths,
 you would need a table of size (n+1) x (m+1).

General Space Complexity:

O(n * m) (for the memoization table)
Recursion Stack:
The recursion depth is at most n + m (worst case).
Stack Space:
O(n + m) (for the recursion stack)
*/

let t = [];
function solve(i, j, text, pattern) {
    if (j === pattern.length) return i === text.length;
    if (t[i][j] !== -1) return t[i][j];
    let ans = false;
    let first_match = (i < text.length &&
        (pattern[j] === text[i] || pattern[j] === ".")
    );
    // if star comes at 2nd position and if somechr precede star
    if (j + 1 < pattern.length && pattern[j + 1] === "*") {
        let not_take_star = solve(i, j + 2, text, pattern);
        let take_star = first_match && solve(i + 1, j, text, pattern);
        ans = not_take_star || take_star;
    }
    else {
        ans = first_match && solve(i + 1, j + 1, text, pattern);
    }
    t[i][j] = ans;
    return t[i][j];
}

var isMatch = function (s, p) {
    // Initialize memoization table (assuming max 20 chars for both)
    t = Array.from({ length: 21 }, () => Array(21).fill(-1));
    return solve(0, 0, s, p)
};

//let s = "aa", p = "a";
let s = "ab", p = ".*";
let res = isMatch(s, p);
console.log("isMatch==", res);