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
/*
This function numDistinctREC(s, t) calculates the number of distinct subsequences of string s that equal string t. It's a common problem in dynamic programming.

Line-by-Line Explanation
js
var numDistinctREC = function (s, t) {
    let m = s.length, n = t.length;
The function is defined, accepting two strings: s (source), t (target).

m is the length of s; n is the length of t.

js
    if (n > m) return 0;
If the target is longer than the source, there can be no matching subsequence, so return 0 immediately.

js
    let dp = Array(m + 1).fill().map(() =>
        Array(n + 1).fill(-1));
A dp (dynamic programming) 2D array is created, sized (m+1) x (n+1).

Each entry is initialized to -1. This array will memoize (cache) results for subproblems.

js
    const dfs = (i, j) => {
Defines a helper function dfs (Depth First Search) that takes indices i and j.

i: how much of s we’ve used.

j: how much of t we’ve matched.

js
        if (j === n) return 1;
Base case 1: If we’ve matched all of t (j == n), return 1 (found a valid subsequence).

js
        if (i === m) return 0;
Base case 2: If we’ve reached the end of s with t still left, return 0 (no match possible).

js
        if (dp[i][j] !== -1) return dp[i][j];
Memoization check: if this subproblem was already solved, reuse its result.

js
        let res = dfs(i + 1, j);
Recursively compute the number of ways by skipping s[i] (don’t use this character).

js
        if (s[i] === t[j]) {
            res += dfs(i + 1, j + 1);
        }
If the current characters match (s[i] === t[j]), consider the case where you use this character to match and move both forward.

Add this result to res.

js
        return dp[i][j] = res;
    };
Store the result in dp[i][j] for memoization and return it.

js
    return dfs(0, 0);
};
Start the recursion from the start of both strings (i = 0, j = 0).

The final result is the count of distinct subsequences matching t in s.

Summary Table
Section	Purpose
Input/Parameters	s (source string), t (target string)
Early Exit	If t longer than s, return 0
DP Table (dp)	Memoization to speed up recursion
dfs(i, j)	Count subsequences from s[i:] matching t[j:]
Base cases	Return 1 if t completely matched, 0 if s used up
Recursion	Try skipping s[i] or matching if characters equal
Memoization	Store subproblem results for reuse
Final Return	Start recursion on full strings, return result

*/
var numDistinctREC = function (s, t) {
    let m = s.length, n = t.length;
    //If the target is longer than the source,
    //  there can be no matching subsequence, so return 0 immediately.
    if (n > m) return 0;
    //A dp (dynamic programming) 2D array is created,
    //  sized (m+1) x (n+1).

//Each entry is initialized to -1. This array will memoize 
// (cache) results for subproblems.
    let dp = Array(m + 1).fill().map(() =>
        Array(n + 1).fill(-1));
    //Defines a helper function dfs (Depth First Search) that takes indices i and j.
//i: how much of s we’ve used.
//j: how much of t we’ve matched.
    const dfs = (i, j) => {
        //Base case 1: If we’ve matched all of t (j == n), 
        // return 1 (found a valid subsequence).
        if (j === n) return 1;
        //Base case 2: If we’ve reached the end of s with t
        //  still left, return 0 (no match possible).
        if (i === m) return 0;
        //Memoization check: if this subproblem was 
        // already solved, reuse its result.
        if (dp[i][j] !== -1) return dp[i][j];
        //Recursively compute the number of ways by 
        // skipping s[i] (don’t use this character).
        let res = dfs(i + 1, j);
        //If the current characters match (s[i] === t[j]), 
        // consider the case where you use this character 
        // to match and move both forward.
        //Add this result to res.
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