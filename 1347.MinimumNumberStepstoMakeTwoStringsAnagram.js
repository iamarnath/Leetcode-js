/*
1347. Minimum Number of Steps to Make Two Strings Anagram

Solution - https://leetcode.com/problems/minimum-number-of-steps-to-make-two-strings-anagram/solutions/5174608/optimised/

Description
You are given two strings of the same length s and t. In one step you can choose any character of t and replace it with another character.

Return the minimum number of steps to make t an anagram of s.

An Anagram of a string is a string that contains the same characters with a different (or the same) ordering.

Example 1:

Input: s = "bab", t = "aba"
Output: 1
Explanation: Replace the first 'a' in t with b, t = "bba" which is anagram of s.
Example 2:

Input: s = "leetcode", t = "practice"
Output: 5
Explanation: Replace 'p', 'r', 'a', 'i' and 'c' from t with proper characters to make t anagram of s.
Example 3:

Input: s = "anagram", t = "mangaar"
Output: 0
Explanation: "anagram" and "mangaar" are anagrams. 
 

Constraints:

1 <= s.length <= 5 * 104
s.length == t.length
s and t consist of lowercase English letters only.

*/
/*
Approach:
The minSteps function calculates the minimum number of steps required to make strings s and t anagrams of each other.
It initializes an array cnt of size 26 to store the frequency of each character in string s.
It iterates over string s to populate the character frequency array cnt.
For each character in string t, it decrements the corresponding count in cnt and increments the answer if the count becomes negative.
The final answer represents the number of characters in t that are not present in s.

Time Complexity:

The time complexity of this solution is O(n), where n is the length of the longer string between s and t.
The loop to populate the character frequency array and iterate over string t both have linear time complexity.

Space Complexity:

The space complexity is O(1) for the variables cnt, ans, and loop counters.
The array cnt of size 26 is used to store character frequencies, making the space complexity constant.
Overall, the space complexity is constant O(1) as it does not grow with the input size.

*/
var minSteps = function (s, t) {
    const cnt = new Array(26).fill(0);
    // Populate the character frequency array for source s
    for (let ch of s) {
        const i = ch.charCodeAt(0) - 'a'.charCodeAt(0);
        cnt[i]++;
    }
    let ans = 0;
    for (let char of t) {
        let j = char.charCodeAt(0) - 'a'.charCodeAt(0);
        // Increment steps if character count falls below zero, which indicates a character in target t not present in source s
        ans += --cnt[j] < 0 ? 1 : 0;
    }
    return ans;
}
let s = "bab", t = "aba";
s = "leetcode", t = "practice";
s = "anagram", t = "mangaar";
console.log(minSteps(s, t));