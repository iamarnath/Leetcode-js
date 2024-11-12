/*
1143. Longest Common Subsequence
Description
Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.

A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

For example, "ace" is a subsequence of "abcde".
A common subsequence of two strings is a subsequence that is common to both strings.

 

Example 1:

Input: text1 = "abcde", text2 = "ace" 
Output: 3  
Explanation: The longest common subsequence is "ace" and its length is 3.
Example 2:

Input: text1 = "abc", text2 = "abc"
Output: 3
Explanation: The longest common subsequence is "abc" and its length is 3.
Example 3:

Input: text1 = "abc", text2 = "def"
Output: 0
Explanation: There is no such common subsequence, so the result is 0.
 

Constraints:

1 <= text1.length, text2.length <= 1000
text1 and text2 consist of only lowercase English characters.
*/

/*
Time Complexity
The time complexity of the longestCSubsequenceDP function is 
O(n×m), where:n is the length of the first string (denoted as X).
m is the length of the second string (denoted as Y).
Explanation:
The function uses a nested loop to fill a 2D array (dp) with dimensions 
(n+1)×(m+1).
Each cell in this array is computed based on previous values, leading to a total of 
n×m iterations.
Thus, the overall time complexity is O(n×m).

Space Complexity
The space complexity of the longestCSubsequenceDP function is also 
O(n×m), due to:
The storage of the 2D array dp, which requires space proportional to the
 product of the lengths of the two input strings.
Explanation:
The dp array is initialized to have dimensions 
(n+1)×(m+1), which means it can store results for all combinations
 of substrings from both strings.
Therefore, the space complexity is 
O(n×m).
*/

/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
function max(a, b) {
    return (a > b) ? a : b;
}
 function longestCSubsequenceDP(X, Y, Xn, Ym) {
    // Base Case
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
//space optimised function
function longestCSubsequenceDP(X, Y, Xn, Ym) {
    // Ensure that we are using the smaller array for optimization
    if (Xn < Ym) {
        return longestCSubsequenceDP(Y, X, Ym, Xn);
    }

    // Create two arrays to store the current and previous row
    var prev = new Array(Ym + 1).fill(0);
    var curr = new Array(Ym + 1).fill(0);

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