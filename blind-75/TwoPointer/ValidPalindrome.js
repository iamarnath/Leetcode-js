/*
Description
Given a string s, return true if it is a palindrome, otherwise return false.

A palindrome is a string that reads the same forward and backward. It is also case-insensitive and ignores all non-alphanumeric characters.

Example 1:

Input: s = "Was it a car or a cat I saw?"

Output: true
Explanation: After considering only alphanumerical characters we have "wasitacaroracatisaw", which is a palindrome.

Example 2:

Input: s = "tab a cat"

Output: false
Explanation: "tabacat" is not a palindrome.

Constraints:

1 <= s.length <= 1000
s is made up of only printable ASCII characters.

*/

class Solution {
    alphaNum(c) {
        return (c >= "A" && c <= "Z" ||
            c >= "a" && c <= "z" ||
            c >= "0" && c <= "9"
        );
    }

    isPalindrome(s) {
        let l = 0, r = s.length - 1;
        while (l < r) {
            while (l < r && !this.alphaNum(s[l])) {
                l++;
            }
            while (l < r && !this.alphaNum(s[r])) {
                r--;
            }
            if (s[l].toLowerCase() !== s[r].toLowerCase()) {
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
}


// Create an instance of Solution
const sol = new Solution();

// Example array to test

let s = "Was it a car or a cat I saw?";
//let s = "tab a cat"

// Call the method and store the result

const result = sol.isPalindrome(s);

// Print the result
console.log(result);

