/*
2734. Lexicographically Smallest String After Substring Operation
Given a string s consisting of lowercase English letters. Perform the following operation:

Select any non-empty substring then replace every letter of the substring with the preceding letter of the English alphabet. For example, 'b' is converted to 'a', and 'a' is converted to 'z'.
Return the lexicographically smallest string after performing the operation.

 

Example 1:

Input: s = "cbabc"

Output: "baabc"

Explanation:

Perform the operation on the substring starting at index 0, and ending at index 1 inclusive.

Example 2:

Input: s = "aa"

Output: "az"

Explanation:

Perform the operation on the last letter.

Example 3:

Input: s = "acbbc"

Output: "abaab"

Explanation:

Perform the operation on the substring starting at index 1, and ending at index 4 inclusive.

Example 4:

Input: s = "leetcode"

Output: "kddsbncd"

Explanation:

Perform the operation on the entire string.

 

Constraints:

1 <= s.length <= 3 * 105
s consists of lowercase English letters

*/

/*
Line-by-Line Explanation
class Solution { ... } – Defines a class named Solution. 
Inside it is a method called smallestString.

smallestString(s) – Defines a method that takes a string s as input.

let n = s.length; – Stores the length of the string s in variable n.

let l = s.split(''); – Splits the string s into an array 
of characters l, so we can modify specific positions easily.

let i = 0; – Initializes the index i to start from the beginning of the string.

while (i < n && s[i] === 'a') { i++; } – Skips all 
leading 'a' characters from the start. The loop stops
 when it finds the first non-'a' character or reaches the end.

if (i === n) { l[n - 1] = 'z'; return l.join(''); } – If
 the entire string is made of 'a', there’s nothing to 
 reduce alphabetically, so we turn the last character 
 into 'z' and return the string.

while (i < n && s[i] !== 'a') { ... } – Starts another
 loop to replace every consecutive non-'a' character 
 with the previous letter in the alphabet (like 'b' → 'a', 'c' → 'b', etc.)
  until we find an 'a' again or reach the end.

l[i] = String.fromCharCode(s.charCodeAt(i) - 1); – This is key.

s.charCodeAt(i) returns the UTF-16 code of character
 at index i. For example, 'b'.charCodeAt(0) is 98.​

String.fromCharCode(...) creates a character from the
 numeric Unicode value.​

Subtracting 1 gives the previous letter in Unicode order. 
So 'b' → 'a', 'c' → 'b', etc.

i++ – Moves to the next character.

return l.join(''); – Joins the modified array of characters
 back into one string and returns it.

Example
Input: "cbabc"

Steps:

First non 'a' is 'c'. Convert 'c'→'b', 'b'→'a'.

Output becomes "baabc".

Time Complexity
s.split('') takes O(n).

Both while loops together process each character at most once → O(n).

l.join('') also takes O(n).

Total Time Complexity: 

O(n)

Space Complexity
l (the array version of s) uses extra space proportional to the string length.

 Total Space Complexity: 

O(n)
*/
var smallestString = function (s) {
    let n = s.length;
    let ans = s.split('');
    let i = 0;
    while (i < n && s[i] == "a") {
        i++;
    }
    if (i === n) {
        ans[n - 1] = 'z';
        return ans.join('');
    }
    while (i < n && s[i] !== "a") {
        ans[i] = String.fromCharCode(s[i].charCodeAt(0) - 1);
        i++;
    }
    return ans.join("");
};

let s = "cbabc";

console.log(smallestString(s));