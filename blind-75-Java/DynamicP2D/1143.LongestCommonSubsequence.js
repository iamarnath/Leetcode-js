/*
1143. Longest Common Subsequence

Given two strings text1 and text2, return the length 
of the longest common subsequence between the two strings 
if one exists, otherwise return 0.

A subsequence is a sequence that can be derived from 
the given sequence by deleting some or no elements 
without changing the relative order of the remaining characters.

For example, "cat" is a subsequence of "crabt".
A common subsequence of two strings is a subsequence
 that exists in both strings.

Example 1:

Input: text1 = "cat", text2 = "crabt" 

Output: 3 
Explanation: The longest common subsequence is "cat" which has a length of 3.

Example 2:

Input: text1 = "abcd", text2 = "abcd"

Output: 4
Example 3:

Input: text1 = "abcd", text2 = "efgh"

Output: 0
Constraints:

1 <= text1.length, text2.length <= 1000
text1 and text2 consist of only lowercase English characters.

*/


function max(a, b) {
    return (a > b) ? a : b;
}
function LCSRecursive(X, Y, Xn, Ym) {
    // Base Case
    if (Xn === 0 || Ym === 0) {
        return 0;
    }
    /* Returns length of LCS for X[0..m-1], Y[0..n-1] */

    if (X[Xn - 1] === Y[Ym - 1]) {
        return 1 + LCSRecursive(X, Y, Xn - 1, Ym - 1);
    }

    else {
        return max(LCSRecursive(X, Y, Xn, Ym - 1), LCSRecursive(X, Y, Xn - 1, Ym));
    }
}

function longestCSubsequenceDP(X, Y, Xn, Ym) {
    // Base Case
      /*
    A 2D array dp is created to store the lengths of LCS for
     different substrings. The size of this array is (Xn + 1) x (Ym + 1) to
     account for the empty substring cases.
     The first row and first column are initialized to 0, representing comparisons
      with an empty substring.
    */
    var dp = [];
    for (let k = 0; k < Xn + 1; k++) {
        dp[k] = [];
        for (let m = 0; m < Ym + 1; m++) {
            // dp[k][m] = -1;
            if (k === 0 || m === 0) {
                dp[k][m] = 0;
            }
        }
    }
    // console.log(dp)
    //var dp = new Array(n+1);
/*
    The nested loops iterate through each character of both strings:
    If characters X[i-1] and Y[j-1] match, it means that this character
     can be included in the LCS, so we add 1 to the value from the previous
      diagonal cell (dp[i-1][j-1]).
    If they do not match, we take the maximum value from either excluding the 
    current character from string X or string Y, which are represented by cells
    dp[i-1][j] and dp[i][j-1].
    */
    for (let i = 1; i < Xn + 1; i++) {
        for (let j = 1; j < Ym + 1; j++) {
            if (X[i - 1] === Y[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            }
            else {
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[Xn][Ym];
}

// optimise space
function longestCSubsequenceDP(X, Y, Xn, Ym) {
    // Ensure that we are using the smaller array for optimization
    //Ensures that the shorter string/array is used for the inner array.

    //This minimizes the space required for the DP arrays (prev and curr),
    // as their size depends on Ym (the length of the smaller string).
    if (Xn < Ym) {
        return longestCSubsequenceDP(Y, X, Ym, Xn);
    }
    //Initializes two arrays, prev and curr, each of size Ym + 1, filled with zeros.

//These arrays will represent the previous and current rows of the DP table.
    // Create two arrays to store the current and previous row
    var prev = new Array(Ym + 1).fill(0);
    var curr = new Array(Ym + 1).fill(0);
    /*
Outer loop: Iterates through each character of X (i from 1 to Xn).

Inner loop: Iterates through each character of Y (j from 1 to Ym).

If characters match:

curr[j] = 1 + prev[j - 1]

This means the LCS ending here extends the LCS ending at the
 previous characters of both strings.

If characters don't match:

curr[j] = Math.max(prev[j], curr[j - 1])

The LCS is the maximum of ignoring the current character in either X or Y.

Row Swap:

After processing row i, swap prev and curr so that prev
 always holds the last computed row.
    */
    for (let i = 1; i <= Xn; i++) {
        for (let j = 1; j <= Ym; j++) {
            if (X[i - 1] === Y[j - 1]) {
                curr[j] = 1 + prev[j - 1]; // Match found
            } else {
                curr[j] = max(prev[j], curr[j - 1]); // No match
            }
        }
        // Move current row to previous row for next iteration
        [prev, curr] = [curr, prev];
    }

    return prev[Ym]; // The result is in the previous row after the last iteration
}
var longestCommonSubsequence = function(text1, text2) {
    return longestCSubsequenceDP(text1, text2,text1.length, text2.length);
};
/*
Time Complexity: 

O(m×n), where m and n are the lengths of the two strings.

Space Complexity: 

O(min(m,n)), because only two rows of size min(m, n) + 1 are stored at any time.
*/
let text1 = "cat", text2 = "crabt" 

console.log(longestCommonSubsequence(text1,text2))