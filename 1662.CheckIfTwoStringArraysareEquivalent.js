/*
1662. Check If Two String Arrays are Equivalent
leetcode solution - https://leetcode.com/problems/check-if-two-string-arrays-are-equivalent/solutions/5059332/1662-check-if-two-string-arrays-are-equivalent-space-efficient-javascript/

Description
Given two string arrays word1 and word2, return true if the two arrays represent the same string, and false otherwise.

A string is represented by an array if the array elements concatenated in order forms the string.
Example 1:

Input: word1 = ["ab", "c"], word2 = ["a", "bc"]
Output: true
Explanation:
word1 represents string "ab" + "c" -> "abc"
word2 represents string "a" + "bc" -> "abc"
The strings are the same, so return true.
Example 2:

Input: word1 = ["a", "cb"], word2 = ["ab", "c"]
Output: false
Example 3:

Input: word1  = ["abc", "d", "defg"], word2 = ["abcddefg"]
Output: true
 

Constraints:

1 <= word1.length, word2.length <= 103
1 <= word1[i].length, word2[i].length <= 103
1 <= sum(word1[i].length), sum(word2[i].length) <= 103
word1[i] and word2[i] consist of lowercase letters.
*/
/*
Time complexity - O(n)
Space complexity - O(n)
*/
/*
var arrayStringsAreEqual = function(word1, word2) {
    const word1Combined = word1.join('');
    const word2Combined = word2.join('');
     return word1Combined == word2Combined
 };

*/
/*
The time complexity of this function is O(n), where n is the total number of characters
 in both word1 and word2, and the space complexity is O(1)
 since it uses a constant amount of extra space regardless of the input size.
*/
 var arrayStringsAreEqual = function(word1, word2) {
    let [w1, w2, x, y] = [0, 0, 0, 0];
    //w1,w2 index of word
    //x,y index of char
    while (w1 < word1.length && w2 < word2.length) {
        if (word1[w1][x++] !== word2[w2][y++]) {
            return false;
        }
        if (x === word1[w1].length) {
            x = 0;
            ++w1;
        }
        if (y === word2[w2].length) {
            y = 0;
            ++w2;
        }
    }
    return w1 === word1.length && w2 === word2.length;
};

word1 = ["abc", "d", "defg"];
word2 = ["abcddefg"];
console.log(arrayStringsAreEqual(word1,word2))