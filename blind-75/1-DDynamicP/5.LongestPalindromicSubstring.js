/*
5. Longest Palindromic Substring

Given a string s, return the longest substring of s that is a palindrome.

A palindrome is a string that reads the same forward and backward.

If there are multiple palindromic substrings that have the same length, return any one of them.

Example 1:

Input: s = "ababd"

Output: "bab"
Explanation: Both "aba" and "bab" are valid answers.

Example 2:

Input: s = "abbc"

Output: "bb"
Constraints:

1 <= s.length <= 1000
s contains only digits and English letters.

*/

//recursion + memoization

function longestPalindrome(s) {
    const n = s.length;
    if (n === 0) return "";
    
    // Create memoization table
    const memo = Array.from({ length: n }, () => new Array(n).fill(null));
    let maxLength = 1;
    let start = 0;

    // Helper function with memoization
    const isPalindrome = (l, r) => {
        if (memo[l][r] !== null) return memo[l][r];
        if (l >= r) return true;
        
        memo[l][r] = (s[l] === s[r]) && isPalindrome(l + 1, r - 1);
        return memo[l][r];
    };

    // Check all substrings
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            if (isPalindrome(i, j)) {
                const currentLength = j - i + 1;
                if (currentLength > maxLength) {
                    maxLength = currentLength;
                    start = i;
                }
            }
        }
    }

    return s.substring(start, start + maxLength);
}

//bottom up 

function longestPalindrome(s) {
    const n = s.length;
    if (n === 0) return "";

    // DP table: t[i][j] will be true if s[i..j] is a palindrome
    const t = Array.from({ length: n }, () => Array(n).fill(false));
    let maxL = 1; // Every single character is a palindrome
    let index = 0;

    // All substrings of length 1 are palindromes
    for (let i = 0; i < n; i++) {
        t[i][i] = true;
    }

    // Check substrings of length >= 2
    for (let L = 2; L <= n; L++) {
        for (let i = 0; i <= n - L; i++) {
            const j = i + L - 1;

            if (s[i] === s[j]) {
                if (L === 2) {
                    t[i][j] = true;
                    if (maxL < 2) {
                        maxL = 2;
                        index = i;
                    }
                } else if (t[i + 1][j - 1]) {
                    t[i][j] = true;
                    if (L > maxL) {
                        maxL = L;
                        index = i;
                    }
                }
            } else {
                t[i][j] = false;
            }
        }
    }

    return s.substring(index, index + maxL);
}
