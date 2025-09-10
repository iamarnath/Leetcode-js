/*
409. Longest Palindrome
Given a string s which consists of lowercase or
 uppercase letters, return the length of the
  longest palindrome that can be built with those letters.

Letters are case sensitive, for 
example, "Aa" is not considered a palindrome.

Example 1:

Input: s = "abccccdd"
Output: 7
Explanation: One longest palindrome that can 
be built is "dccaccd", whose length is 7.
Example 2:

Input: s = "a"
Output: 1
Explanation: The longest palindrome that can 
be built is "a", whose length is 1.
 

Constraints:

1 <= s.length <= 2000
s consists of lowercase and/or uppercase English letters only.

*/
/*
If there are any odd-frequency characters:
We can use all characters except (oddFrq - 1),
 because only one odd character can be in the center;
  the rest must be paired.
So, the maximum palindrome length is s.length - oddFrq + 1.
If all frequencies are even, we can use all characters.

Example
Input: "abccccdd"
Frequencies: {a:1, b:1, c:4, d:2}

Odd frequencies: a and b (2 odd counts)

Max palindrome length: 8 - 2 + 1 = 7 (e.g., "dccaccd")

Algorithmic Insight
Pairs: Every pair of the same letter can be used on
 both sides of the palindrome.

Odd counts: At most one odd-count character
 can be in the center.

Greedy: Use as many pairs as possible, and at
 most one single character in the middle.

*/

var longestPalindrome = function (s) {
    const n = s.length;
    const mp = new Map();
    let oddFreq = 0;
    for (const ch of s) {
        //We count how many times each character appears in the string.
        mp.set(ch, (mp.get(ch) || 0) + 1);
        if (mp.get(ch) % 2 !== 0) {
            oddFreq++;
        }
        else {
            oddFreq--;
        }
    }
    if (oddFreq > 0) {
        return n - oddFreq + 1;
    }
    return n;
};