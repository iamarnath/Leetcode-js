/*
115. Distinct Subsequences

Given two strings s and t, return the number 
of distinct subsequences of s which equals t.

The test cases are generated so that the
 answer fits on a 32-bit signed integer.

Example 1:

Input: s = "rabbbit", t = "rabbit"
Output: 3
Explanation:
As shown below, there are 3 ways you can generate "rabbit" from s.
rabbbit
rabbbit
rabbbit
Example 2:

Input: s = "babgbag", t = "bag"
Output: 5
Explanation:
As shown below, there are 5 ways you can generate "bag" from s.
babgbag
babgbag
babgbag
babgbag
babgbag
 

Constraints:

1 <= s.length, t.length <= 1000
s and t consist of English letters.

*/
/*
Recursive DFS with Memoization:
The solution uses depth-first search (DFS) with memoization 
to avoid redundant calculations. The dp[i][j] array stores
 precomputed results for the number of subsequences
  starting at index i in s and j in t.

Key Logic:

Base Cases:

If j reaches t's length (j === n), return 1 (valid subsequence found).

If i reaches s's length (i === m), return 0 (no valid subsequence).

Recursive Case:

Always explore skipping the current character in s (dfs(i+1, j)).

If s[i] === t[j], also explore including this character (dfs(i+1, j+1)).

Complexity Analysis
Time Complexity:
O(m×n), where 
m = length of s and 
n = length of t. Each of the 
m×n states is computed exactly once due to memoization.

Space Complexity:

O(m×n) for the memoization table. The recursion stack adds 

O(max(m,n)) auxiliary space, but this is dominated by the DP array

*/
var numDistinctREC = function (s, t) {
    let m = s.length, n = t.length;
    if (n > m) return 0;
    let dp = Array(m + 1).fill().map(() =>
        Array(n + 1).fill(-1));
    const dfs = (i, j) => {
        if (j === n) return 1;
        if (i === m) return 0;
        if (dp[i][j] !== -1) return dp[i][j];
        let res = dfs(i + 1, j);
        if (s[i] === t[j]) {
            res += dfs(i + 1, j + 1);
        }
        return dp[i][j] = res;
    };
    return dfs(0, 0);
};


var numDistinct = function (s, t) {
    let m = s.length, n = t.length;
    let dp = new Array(n + 1).fill(0);

    dp[n] = 1;
    for (let i = m - 1; i >= 0; i--) {
        let prev = 1;
        for (let j = n - 1; j >= 0; j--) {
            let res = dp[j];
            if (s[i] === t[j]) {
                res += prev;
            }

            prev = dp[j];
            dp[j] = res;
        }
    }

    return dp[0];
}


let s = "rabbbit", t = "rabbit";

let res = numDistinct(s, t);

console.log("numDistinct==", res);