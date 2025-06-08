/*
97. Interleaving String

Given strings s1, s2, and s3, find whether s3 is 
formed by an interleaving of s1 and s2.

An interleaving of two strings s and t is a 
configuration where s and t are divided into n and m
 substrings respectively, such that:

s = s1 + s2 + ... + sn
t = t1 + t2 + ... + tm
|n - m| <= 1
The interleaving is s1 + t1 + s2 + t2 + s3 + t3 + ... or 
t1 + s1 + t2 + s2 + t3 + s3 + ...
Note: a + b is the concatenation of strings a and b.

 

Example 1:


Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
Output: true
Explanation: One way to obtain s3 is:
Split s1 into s1 = "aa" + "bc" + "c", and s2 into s2 = "dbbc" + "a".
Interleaving the two splits,
 we get "aa" + "dbbc" + "bc" + "a" + "c" = "aadbbcbcac".
Since s3 can be obtained by interleaving s1 and s2, we return true.
Example 2:

Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
Output: false
Explanation: Notice how it is impossible to interleave 
s2 with any other string to obtain s3.
Example 3:

Input: s1 = "", s2 = "", s3 = ""
Output: true
 

Constraints:

0 <= s1.length, s2.length <= 100
0 <= s3.length <= 200
s1, s2, and s3 consist of lowercase English letters.
 
*/
/*

The time complexity of the recursive + memoization solution
 for the interleaving string problem is O(m * n), 
 where m and n are the lengths of s1 and s2. 
 This is because each unique pair of indices 
 (i, j) (representing positions in s1 and s2) is
  computed at most once and stored in the memoization table.

The space complexity is also O(m * n),
 due to the memoization table that stores
  results for each (i, j) pair. If you use a 
  recursive approach, there is also an 
  additional O(m + n) space used by the call stack,
   but the dominant term is the memoization table.

Summary:

Time complexity: O(m * n)
Space complexity: O(m * n)

*/
var isInterleave = function (s1, s2, s3) {
    const m = s1.length, n = s2.length, N = s3.length;
    // Early exit if lengths don't match
    if (m + n != N) return false;
    // Memoization: t[i][j] means result for s1[i:] and s2[j:]
    const t = Array.from({ length: m + 1 }, () => Array(n + 1).fill(undefined));
    function solve(i, j) {
        const k = i + j; // current index in s3
        //When all characters are consumed (i === m, j === n, k === N), return true.
        if (i === m && j === n && k === N) return true;
        if (t[i][j] !== undefined) return t[i][j];
        let result = false;
        // Try to take from s1
        //If the current character of s3 matches the current character of s1, try to advance in s1.
        if (i < m && s1[i] === s3[k]) {
            result = solve(i + 1, j);
            if (result) return (t[i][j] = true);
        }
        // Try to take from s2
        //If the current character of s3 matches the current character of s2, try to advance in s2.
        if (j < n && s2[j] === s3[k]) {
            result = solve(i, j + 1);
            if (result) return (t[i][j] = true);
        }
        return t[i][j] = false;
    }
    return solve(0, 0);
};
/*
Logic Explanation
DP Definition:
dp[j] represents whether s1[0..i-1] and s2[0..j-1] can interleave to form s3[0..i+j-1].

Initialization:

dp is true (empty strings interleave to form an empty string).

The first row is initialized by checking if s2's prefix matches s3.

DP Update:

For each character in s1 (outer loop), and for each character in s2 (inner loop), update dp[j]:

If the current character from s1 matches the corresponding position in s3, and the previous state (dp[j]) is true, set dp[j] to true.

If the current character from s2 matches the corresponding position in s3, and the previous state (dp[j-1]) is true, set dp[j] to true.

Result:

After processing, dp[n] contains the answer: true if s3 is an interleaving of s1 and s2, otherwise false.

Complexity
Time Complexity: O(m * n), where m = s1.length, n = s2.length.

Space Complexity: O(n), using only a 1D array of size n+1.


*/
var isInterleave = function(s1, s2, s3) {
    const m = s1.length, n = s2.length;
    if (m + n !== s3.length) return false;

    // dp[j] means: can s1[0..i-1] and s2[0..j-1] interleave to form s3[0..i+j-1]
    const dp = Array(n + 1).fill(false);
    dp[0] = true;

    // Initialize first row (i = 0)
    for (let j = 1; j <= n; ++j) {
        dp[j] = dp[j - 1] && s2[j - 1] === s3[j - 1];
    }

    for (let i = 1; i <= m; ++i) {
        // Update first column (j = 0)
        dp[0] = dp[0] && s1[i - 1] === s3[i - 1];
        for (let j = 1; j <= n; ++j) {
            dp[j] =
                (dp[j] && s1[i - 1] === s3[i + j - 1]) ||
                (dp[j - 1] && s2[j - 1] === s3[i + j - 1]);
        }
    }

    return dp[n];
}

let s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac";

let res = isInterleave(s1, s2, s3);
console.log("res==",res);