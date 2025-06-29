/*

1531. String Compression II
Run-length encoding is a string compression method
that works by replacing consecutive identical
characters (repeated 2 or more times) with
the concatenation of the character and 
the number marking the count of the characters
(length of the run). For example, to compress 
the string "aabccc" we replace "aa" by "a2"
and replace "ccc" by "c3". Thus the
compressed string becomes "a2bc3".

Notice that in this problem,
 we are not adding '1' after single characters.

Given a string s and an integer k.
 You need to delete at most k characters from s 
 such that the run-length encoded version of s has minimum length.

Find the minimum length of the run-length encoded
 version of s after deleting at most k characters.

Example 1:

Input: s = "aaabcccd", k = 2
Output: 4
Explanation: Compressing s without deleting anything
will give us "a3bc3d" of length 6. Deleting any
of the characters 'a' or 'c' would at most
decrease the length of the compressed string
to 5, for instance delete 2 'a' then we
will have s = "abcccd" which compressed is abc3d.
Therefore, the optimal way is to delete 'b' and 'd',
then the compressed version of s will be "a3c3" of length 4.

Example 2:

Input: s = "aabbaa", k = 2
Output: 2
Explanation: If we delete both 'b' characters, the resulting compressed
 string would be "a4" of length 2.
Example 3:

Input: s = "aaaaaaaaaaa", k = 0
Output: 3
Explanation: Since k is zero, we cannot delete anything. 
The compressed string is "a11" of length 3.
 

Constraints:

1 <= s.length <= 100
0 <= k <= s.length
s contains only lowercase English letters.

*/
/*
 
Detailed Explanation
1. Initialization

const n = s.length;
const memo = new Map();
n: Length of the input string.

memo: Memoization map to avoid recomputation for the same subproblems.

2. Recursive Function: solve(i, prev, freq, k)
Parameters:

i: Current index in s.

prev: Previous character (as integer 0-25, or 26 for "none").

freq: Frequency of the previous character in the current run.

k: Number of deletions left.

Base Cases

if (k < 0) return Infinity; // Too many deletions, invalid path
if (i >= n) return 0; // End of string, nothing more to compress
Memoization

const key = `${i},${prev},${freq},${k}`;
if (memo.has(key)) return memo.get(key);
Use a string key to uniquely identify the state.

If already computed, return cached result.

Option 1: Delete Current Character

let delete_i = solve(i + 1, prev, freq, k - 1);
Move to the next character, keep previous run unchanged, use one deletion.

Option 2: Keep Current Character

let keep_i = 0;
const curr_char = s[i].charCodeAt(0) - "a".charCodeAt(0);
if (curr_char === prev) {
    let one_more_added = 0;
    if (freq === 1 || freq === 9 || freq === 99) {
        one_more_added = 1; // RLE length increases at these frequencies
    }
    keep_i = one_more_added + solve(i + 1, prev, freq + 1, k);
}
else {
    keep_i = 1 + solve(i + 1, curr_char, 1, k);
}
If current character matches previous:

Increase frequency of the run.

RLE length only increases when frequency crosses 1→2, 9→10, or 99→100 (number of digits increases).

If not:

Start a new run (add 1 for the new character).

Choose the Best Option

const result = Math.min(delete_i, keep_i);
memo.set(key, result);
return result;
Store and return the minimum compressed length from both options.

Initial Call

return solve(0, 26, 0, k)
Start at index 0, with no previous character (prev=26), frequency 0, and k deletions allowed.

Time and Space Complexity
Time Complexity
State Variables:

i: up to n

prev: 27 (0-25 for 'a'-'z', 26 for "none")

freq: up to n (but in practice, only values where RLE length can change matter: 1, 2-9, 10-99, 100+)

k: up to k

Total States: O(n * 27 * n * k) (worst case)

But, due to frequency grouping, practical number of states is much less.

Space Complexity
Memoization Map: Stores up to O(n * 27 * n * k) entries.

Call Stack: Up to O(n) (depth of recursion).

Key Insights and Logic
Dynamic Programming with Memoization: Avoids recomputation for overlapping subproblems.

RLE Length Calculation: Only increases when frequency crosses a digit boundary (1, 9, 99).

Two Choices at Each Step: Delete or keep the current character.

Optimal Substructure: The minimum compressed length at each step depends only on the current state.
*/
// using 4D Map
var getLengthOfOptimalCompressionMap = function (s, k) {
    const n = s.length;
    const memo = new Map();
    function solve(i, prev, freq, k) {
        if (k < 0) return Infinity;// Exceeded allowed deletions
        if (i >= n) return 0;// end of string
        // Memoization key
        const key = `${i},${prev},${freq},${k}`;
        if (memo.has(key)) return memo.get(key);
        // Option 1: Delete s[i]
        let delete_i = solve(i + 1, prev, freq, k - 1);
        // Option 2: Keep s[i]
        let keep_i = 0;
        //const curr_char = s[i].charCodeAt(0) - 97;// 'a' -> 0, ..., 'z' -> 25
        const curr_char = s[i].charCodeAt(0) - "a".charCodeAt(0);// 'a' -> 0, ..., 'z' -> 25
        if (curr_char === prev) {
            // If same as previous, increase frequency
            let one_more_added = 0;
            if (freq === 1 || freq === 9 || freq === 99) {
                one_more_added = 1;//Compressed length increases at these points
            }
            keep_i = one_more_added + solve(i + 1, prev, freq + 1, k);
        }
        else {
            // New character, add 1 for the character itself
            keep_i = 1 + solve(i + 1, curr_char, 1, k);

        }
        const result = Math.min(delete_i, keep_i);
        memo.set(key, result);
        return result;
    }
    // Start with prev=26 (no previous), freq=0, k deletions allowed
    return solve(0, 26, 0, k)
}
/*
Code Explanation

function getLengthOfOptimalCompression(s, k) {
    const n = s.length;
n: Stores the length of the input string s.
    // Initialize DP table with -1 (not computed)
    const t = Array.from({ length: n + 1 }, () => Array(k + 1).fill(-1));
t: A 2D DP table where t[i][k] stores the minimum compressed length for the substring starting at index i with k deletions left.

All entries are initialized to -1 to indicate they haven't been computed yet.

    function solve(i, k) {
Recursive DP function: Computes the minimum compressed length for substring starting at i with k deletions left.


        if (k < 0) return 100000;//Too many deletions, invalid
Base case: If deletions used exceed allowed k, return a large number (effectively infinity, so this path won't be chosen).


        if (i >= n || (n - 1) <= k) return 0;//All remaining can be deleted
Base case: If we've processed all characters (i >= n), or if the remaining characters can all be deleted (n - 1 <= k), the compressed length is 0 (nothing left).


        if (t[i][k] != -1) return t[i][k];
Memoization: If this subproblem has already been solved, return the cached result.


        // Option 1: Delete s[i]
        let delete_i = solve(i + 1, k - 1);
Option 1: Delete the current character s[i]. Move to the next character (i + 1) and use up one deletion (k - 1).


        // Option 2: Keep s[i] and try to extend the run
        let keep_i = Infinity;
        let deleted = 0;
        let freq = 0;
        let addition = 0;
Option 2: Try to keep s[i] and extend its run as much as possible by possibly deleting other characters.

keep_i: Stores the minimum compressed length found in this option.

deleted: Number of deletions used so far in this run.

freq: Frequency of s[i] in the current run.

addition: Number of digits added to the compressed length due to frequency increases (e.g., when freq goes from 1→2, 9→10, 99→100).


        for (let j = i; j < n && deleted <= k; j++) {
Loop: Try to extend the run of s[i] as far as possible, up to the end of the string or until we run out of allowed deletions.


            if (s[i] === s[j]) {
                freq++;
                // Increase compressed length when freq hits 2, 10, 100
                if (freq === 2 || freq === 10 || freq === 100) addition++;
            }
            else {
                deleted++;
            }
If s[j] matches s[i]:

Increase freq.

If freq hits 2, 10, or 100, the RLE representation increases in length (e.g., "a" → "a2", "a9" → "a10"), so increment addition.

If not:

We would have to delete s[j] to keep the run going, so increment deleted.


            keep_i = Math.min(keep_i,
                1 + addition + solve(j + 1, k - deleted)
            );
Calculate compressed length:

1: For the character itself.

addition: For the extra digits in the count.

solve(j + 1, k - deleted): Recurse for the rest of the string, starting after the current run, with remaining deletions.

Take the minimum value found for all possible extensions of the run.


        }
        t[i][k] = Math.min(delete_i, keep_i);
        return t[i][k];
    }
Store and return the best result for this subproblem: either deleting s[i] or keeping it and extending the run.


    return solve(0, k);
}
Start the recursion from the beginning of the string with all deletions allowed.

Time Complexity Analysis
State variables: i (0 to n), k (0 to k)

DP table size: O(n * k)

For each state: The inner loop can go up to O(n) (from i to n)

Total time: O(n^2 * k)

Each DP state (i, k) is visited once, and in each visit, the loop can run up to n times.

In practice, the number of unique states is smaller due to early pruning (when deletions run out), but worst-case is O(n^2 * k).

Space Complexity Analysis
DP table: O(n * k)

Call stack: Up to O(n) due to recursion.


*/


function getLengthOfOptimalCompression(s, k) {
    const n = s.length;
    // Initialize DP table with -1 (not computed)
    const t = Array.from({ length: n + 1 }, () => Array(k + 1).fill(-1));

    function solve(i, k) {
        if (k < 0) return 100000;//Too many deletions, invalid
        if (i >= n || (n - 1) <= k) return 0;//All remaining can be deleted
        if (t[i][k] != -1) return t[i][k];
        // Option 1: Delete s[i]
        let delete_i = solve(i + 1, k - 1);
        // Option 2: Keep s[i] and try to extend the run
        let keep_i = Infinity;
        let deleted = 0;
        let freq = 0;
        let addition = 0;
        for (let j = i; j < n && deleted <= k; j++) {
            if (s[i] === s[j]) {
                freq++;
                // Increase compressed length when freq hits 2, 10, 100
                if (freq === 2 || freq === 10 || freq === 100) addition++;
            }
            else {
                deleted++;
            }
            keep_i = Math.min(keep_i,
                1 + addition + solve(j + 1, k - deleted)
            );
        }
        t[i][k] = Math.min(delete_i, keep_i);
        return t[i][k];
    }
    return solve(0, k);
}
let s = "aaabcccd", k = 2;
//let s = "aaaaaaaaaaa", k = 0;
//let s = "aabbaa", k = 2;
let res = getLengthOfOptimalCompression(s, k);
console.log("result ==", res)