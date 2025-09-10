/*
Description
Given a string s, return the number of substrings within s
 that are palindromes.

A palindrome is a string that reads the same forward and backward.

Example 1:

Input: s = "abc"

Output: 3
Explanation: "a", "b", "c".

Example 2:

Input: s = "aaa"

Output: 6
Explanation: "a", "a", "a", "aa", "aa", "aaa". Note that different substrings are counted as different palindromes even if the string contents are the same.

Constraints:

1 <= s.length <= 1000
s consists of lowercase English letters.

*/
/*
Memoization Table Initialization:

Uses new Array(n).fill().map(...) for proper 2D array creation

Initializes with -1 (unchecked), 1 (true), and 0 (false)

Palindrome Check Logic:

Maintains the same recursive approach with memoization

Converts C++ boolean returns to JavaScript boolean values

Uses strict equality checks (===) for character comparisons

String Handling:

Uses standard JavaScript string indexing (s[i])

Maintains the same substring checking logic with nested loops

Type Conversion:

Explicitly converts memoized values to booleans using === 1 check

This implementation maintains the O(n²) time complexity 
and O(n²) space complexity of the original solution 
while adapting to JavaScript conventions.
*/

// memoization approach
function countSubstrings(s) {
    const n = s.length;
    // Create a 2D memoization table initialized to -1
    //const t = new Array(n).fill().map(() => new Array(n).fill(-1));
    const t = Array.from({ length: n }, () => Array(n).fill(-1));
    // let t = [];
    // for (let i = 0; i < n; i++) {
    //     t[i] = [];
    //     for (let j = 0; j < n; j++) {
    //         t[i][j] = -1;
    //     }
    // }

    // Helper function to check palindrome substrings
    function check(i, j) {
        if (i >= j) return true;
        if (t[i][j] !== -1) return t[i][j] === 1;
        if (s[i] == s[j]) {
            const result = check(i + 1, j - 1);
            t[i][j] = result ? 1 : 0;
            return result;
        }
        t[i][j] = 0;
        return false;
    }
    let count = 0;
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            if (check(i, j)) {
                count++;
            }
        }
    }
    return count;
}

let s = "aaa";

let res = countSubstrings(s);

// console.log("res==",res);
/*
Key implementation details:
DP Table Initialization:

Uses Array.from to create a proper 2D array

Initializes all values to false initially

Nested Loop Structure:

Maintains the same O(n²) complexity as original

Outer loop for substring lengths (1 to n)

Inner loop for starting indices (i)

Palindrome Check Logic:

Handles three cases explicitly:

Single character substrings (always true)

Two-character substrings (direct comparison)

Longer substrings (end characters match + inner substring is palindrome)

Efficiency:

Builds solution bottom-up

Reuses previous computations through the DP table

Avoids recursion stack overhead compared to memoization approach

This implementation maintains the same time and space complexity
 (O(n²)) as the original C++ solution while using JavaScript's 
 array handling capabilities.
*/
// bottom up
function countSubstringsDP(s) {
    const n = s.length;
    // Create a 2D memoization table initialized to -1
    const t = Array.from({ length: n }, () => new Array(n).fill(false));

    let count = 0;
    for (let L = 1; L <= n; L++) {
        for (let i = 0; i <= n - L; i++) {
            const j = i + L - 1;
            if (i == j) {
                // Single character substring
                t[i][j] = true;
            }
            else if (i + 1 == j) {
                // Two-character substring
                t[i][j] = (s[i] === s[j]);
            }
            else {
                // Longer substrings depend on inner substring
                t[i][j] = (s[i] === s[j]) && t[i + 1][j - 1];
            }
            if (t[i][j]) count++;
        }
    }
    return count;
}

let newres = countSubstringsDP(s);

console.log("newres==", newres)