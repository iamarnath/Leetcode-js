/*
5. Longest Palindromic Substring

Given a string s, return the longest substring of s that is a palindrome.

A palindrome is a string that reads the same forward and backward.

If there are multiple palindromic substrings that have 
the same length, return any one of them.

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
    //const memo = Array.from({ length: n }, () => new Array(n).fill(null));
    //alternate way
    const memo = [];
    for (let i = 0; i < n; i++) {
        memo[i] = [];
        for (let j = 0; j < n; j++) {
            memo[i][j] = null;
        }
    }

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
/*
Time and Space Complexity
Time Complexity
The main part of the algorithm is the two nested loops:

Outer loop: substring length L runs from 2 to n (O(n))

Inner loop: for each length, up to O(n) substrings are considered

Each check inside is O(1).

Total time complexity:

O(n^2)
where 

n is the length of the input string.

Space Complexity
The DP table t is an n x n matrix.

No other space used on the order of n².

Total space complexity:

O(n^2)

*/ 

function longestPalindrome(s) {
    const n = s.length;
    if (n === 0) return "";

    // DP table: t[i][j] will be true if s[i..j] is a palindrome
    //Creates a 2D DP table t, where t[i][j] represents
    //  whether the substring from index i to j is a palindrome.
    const t = Array.from({ length: n }, () => Array(n).fill(false));
    //maxL keeps track of the length of the longest palindrome found so far (initialized to 1).
    let maxL = 1; // Every single character is a palindrome
    //index is the starting index of the longest palindromic substring found.
    let index = 0;

    // All substrings of length 1 are palindromes
    //Every single character is a palindrome by itself.
    //Sets the DP table t[i][i] to true for all indices i.
    for (let i = 0; i < n; i++) {
        t[i][i] = true;
    }

    // Check substrings of length >= 2
    //Outer loop iterates through substring lengths L from 2 to n.
    for (let L = 2; L <= n; L++) {
        //Inner loop considers all substrings of length L starting at index i.
        //This loop iterates through all possible starting
        //  indices of substrings of length L in a string of length n.

// n is the total length of the string.

// L is the current substring length being checked.

// i ranges from 0 up to and including n - L,
//  so that i + L - 1, the end index for the substring of
//  length L, does not go beyond the string’s end.
// This ensures every substring of length L is checked exactly once.
        for (let i = 0; i <= n - L; i++) {
            //j is the ending index of the substring (start index + length - 1).
            //j is calculated as the ending index of this substring.

// Why i + L - 1?

// i is the starting position.

// If a substring has length L, its last character is L-1 positions after i, so j = i + L - 1.

// Example: If i = 2 and L = 4, then j = 2 + 4 - 1 = 5; the substring will run from index 2 to 5 (inclusive), covering 4 characters.
            const j = i + L - 1;
            //If the first and last characters are the same:
            // If length is 2 (L === 2), it's a palindrome
            //  if both characters are equal.
            // Update DP table and, if this is the longest so far,
            //  record its position and length.
            if (s[i] === s[j]) {
                if (L === 2) {
                    t[i][j] = true;
                    if (maxL < 2) {
                        maxL = 2;
                        index = i;
                    }
                } 
                //For longer substrings, a string is a palindrome if 
                // the first/last characters are equal and the
                //  substring without those characters (t[i + 1][j - 1])
                //  is also a palindrome.
                else if (t[i + 1][j - 1]) {
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

/*
Here's how the dynamic programming table (DP table t) is structured and visualized for the string 'babad' in the longestPalindrome algorithm. Each cell [i][j] shows if the substring from index i to j is a palindrome (1 for palindrome, 0 for not palindrome).

DP Table Visualization
0	1	2	3	4
0	1	0	1	0	0
1	0	1	0	1	0
2	0	0	1	0	0
3	0	0	0	1	1
4	0	0	0	0	1
Rows (i) and columns (j) represent string indices in 'babad'.

1 indicates s[i..j] is a palindrome, 0 means it's not.

The highlighted longest palindromic substrings 
(such as 'bab' from 0 to 2, and 'aba' from 1 to 3)
 are present at their respective positions.

How This Table Is Built
Every substring of length 1 (t[i][i]) is a palindrome,
 so the diagonal is all 1.

Substrings of length 2 or more: If the
 first and last characters match and the inside
  substring is also a palindrome, then t[i][j] is true (1).

The table is filled diagonally, so results for smaller 
substrings are used to compute larger ones.
*/