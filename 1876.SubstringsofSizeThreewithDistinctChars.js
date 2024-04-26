/*
1876. Substrings of Size Three with Distinct Characters

Solution- https://leetcode.com/problems/substrings-of-size-three-with-distinct-characters/solutions/5071984/optimised/

Description
A string is good if there are no repeated characters.

Given a string s​​​​​, return the number of good substrings of length three in s​​​​​​.

Note that if there are multiple occurrences of the same substring, every occurrence should be counted.

A substring is a contiguous sequence of characters in a string.

Example 1:

Input: s = "xyzzaz"
Output: 1
Explanation: There are 4 substrings of size 3: "xyz", "yzz", "zza", and "zaz". 
The only good substring of length 3 is "xyz".
Example 2:

Input: s = "aababcabc"
Output: 4
Explanation: There are 7 substrings of size 3: "aab", "aba", "bab", "abc", "bca", "cab", and "abc".
The good substrings are "abc", "bca", "cab", and "abc".
 

Constraints:

1 <= s.length <= 100
s​​​​​​ consists of lowercase English letters.
*/

function countGoodSubstrings(s) {
    const n = s.length;
    // Initialize the count of good substrings to zero.
    let goodSubstringCount = 0;
    // Iterate over each character in the string, stopping 2 characters before the end.
    for (i = 0; i < n - 2; ++i) {
        // Extract the current character and the next two characters.
        let char1 = s.charAt(i),
            char2 = s.charAt(i + 1),
            char3 = s.charAt(i + 2);
        // Check if all three characters are distinct.
        if (char1 !== char2 && char1 !== char3 && char2 !== char3) {
            // If they are, increment the count of good substrings.
            goodSubstringCount++;
        }

    }
    return goodSubstringCount;
}

let s = "aababcabc"
console.log(countGoodSubstrings(s));