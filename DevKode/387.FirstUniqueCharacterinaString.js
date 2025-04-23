/*
387. First Unique Character in a String

Solution - https://leetcode.com/problems/first-unique-character-in-a-string/solutions/5159057/optimised/

Description
Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.

Example 1:

Input: s = "leetcode"
Output: 0
Example 2:

Input: s = "loveleetcode"
Output: 2
Example 3:

Input: s = "aabb"
Output: -1
 

Constraints:

1 <= s.length <= 105
s consists of only lowercase English letters.

*/
/*
Approach:

Character Frequency Map:
The code uses a Map to store the frequency of each character in the input string.
It iterates through the string to populate this frequency map.
Finding First Unique Character:
After building the frequency map, it then iterates through the string again to find the index of the first unique character.
If a character has a frequency of 1 in the map, it returns the index of that character.

Time Complexity:

Building Frequency Map: O(n)
The first loop iterates through the string of length n to build the character frequency map.
Finding Unique Character: O(n)
The second loop also iterates through the string of length n to find the first unique character.

Total Time Complexity: O(n)
The overall time complexity is O(n) where n is the length of the input string.

Space Complexity:

Character Frequency Map: O(n)
The space used by the Map to store character frequencies grows with the number of unique characters in the input string.
Other Variables: O(1)
Additional space used by variables like strLen, char, and index is constant.
Total Space Complexity: O(n)
The overall space complexity is O(n) due to the Map storing character frequencies.
*/
var firstUniqChar = function (s) {
    const charFreq = new Map();
    let strLen = s.length;
    for (let char of s) {
        charFreq.set(char, (charFreq.get(char) || 0) + 1);
    }
    for (let index = 0; index < strLen; index++) {
        if (charFreq.get(s[index]) === 1) {
            return index;
        }
    }
    return -1;
};
let s = "leetcode";
s = "loveleetcode";
s = "aabb";
console.log(firstUniqChar(s))