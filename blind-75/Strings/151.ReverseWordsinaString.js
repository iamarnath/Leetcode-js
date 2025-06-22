/*
151. Reverse Words in a String

Given an input string s, reverse the order of the words.

A word is defined as a sequence of non-space 
characters. The words in s will be separated by at least one space.

Return a string of the words in reverse 
order concatenated by a single space.

Note that s may contain leading or
 trailing spaces or multiple spaces between two words.
  The returned string should only have a single space 
  separating the words. Do not include any extra spaces.

 

Example 1:

Input: s = "the sky is blue"
Output: "blue is sky the"
Example 2:

Input: s = "  hello world  "
Output: "world hello"
Explanation: Your reversed string should not 
contain leading or trailing spaces.
Example 3:

Input: s = "a good   example"
Output: "example good a"
Explanation: You need to reduce multiple 
spaces between two words to a single space in the reversed string.
 

Constraints:

1 <= s.length <= 104
s contains English letters (upper-case and lower-case), 
digits, and spaces ' '.
There is at least one word in s.
 
*/
/*
2. Time and Space Complexity
Time Complexity
Reversing the whole string: O(n)

Iterating through the string to reverse each word: O(n)

Each character is visited at most twice
 (once for copying, once for reversing)

Total: O(n)

Space Complexity
In-place operations: The algorithm operates mostly
 in-place on the character array.

Auxiliary space: O(n) for the character
 array (since strings are immutable in JavaScript,
  we need to convert to an array).

No extra data structures proportional to input size.

Total: O(n) (due to the array copy of the string)

*/
/*
The function reverses the order of words in a string.
For example, "the sky is blue" becomes "blue is sky the".

Step-by-Step Explanation
1. Convert String to Array and Reverse Entire String
js
let arr = s.split('');
arr.reverse();
Why?

Strings are immutable in JavaScript, so we work with an array.

Reversing the entire string puts the words in the reverse order, but the letters in each word are also reversed.

Example:
Input: "the sky is blue"
After reverse: ['e','u','l','b',' ','s','i',' ','y','k','s',' ','e','h','t']
String: "eulb si yks eht"

2. Iterate Through the Array to Reverse Each Word
js
let n = arr.length;
let i = 0;
let l = 0, r = 0;

while (i < n) {
    // Copy non-space characters forward
    while (i < n && arr[i] !== ' ') {
        arr[r++] = arr[i++];
    }

    // Reverse the word we just copied
    if (l < r) {
        this.reverseArr(arr, l, r - 1);

        // Add a space after the word if there's more to process
        if (r < n) arr[r++] = ' ';

        l = r;
    }

    i++; // Move past spaces
}
What’s Happening?

The outer while loop processes the array.

The inner while loop copies each word (non-space characters) forward in the array (removing extra spaces in the process).

After copying a word, it reverses that word in place using reverseArr.

Adds a single space after each word (if not at the end).

Updates pointers (l and r) for the next word.

Skips over spaces between words.

After this step:
The words are in correct order, and each word’s letters are in the correct order.

3. Remove Trailing Space
js
if (r > 0 && arr[r - 1] === ' ') r--;
Removes any trailing space at the end of the result.

4. Join the Array Back Into a String
js
return arr.slice(0, r).join('');
Returns the processed array as a string, up to the last valid character.

5. Helper Function: reverseArr
js
reverseArr(arr, left, right) {
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
}
Reverses the characters in arr from index left to right (inclusive).

Visualization
Let's walk through "the sky is blue":

Reverse entire string:
"eulb si yks eht"

Reverse each word:

"eulb" → "blue"

"si" → "is"

"yks" → "sky"

"eht" → "the"

Copy words forward and remove extra spaces:
"blue is sky the"

Key Points
Two-step reversal: First reverse the whole string, then reverse each word.

In-place manipulation: Uses an array to efficiently modify the string.

Handles spaces: Removes extra spaces and ensures only single spaces between words.

Summary Table
Step	What it does
Reverse whole string	Words in reverse order, letters reversed
Reverse each word	Words in correct order, letters correct
Clean up spaces	Removes extra/trailing spaces
Join and return	Returns the final reversed string

*/
// Helper function to reverse a portion of the array
var reverseArr = function (arr, left, right) {
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
}
var reverseWords = function (s) {
    let arr = s.split("");
    arr.reverse();
    let n = arr.length;
    let i = 0;
    let l = 0, r = 0;
    while (i < n) {
        // Copy non-space characters forward
        while (i < n && arr[i] !== " ") {
            arr[r] = arr[i];
            r++;
            i++;
        }
        // Reverse the word we just copied
        if (l < r) {
            reverseArr(arr, l, r - 1);
            // Add a space after the word if there's more to process
            if (r < n) arr[r++] = " ";
            l = r;
        }
        i++;//move past spaces
    }
    // Remove trailing space if any
    if (r > 0 && arr[r - 1] === " ") r--;
    return arr.slice(0, r).join("");

};


s = "a good   example";
let res = reverseWords(s);
console.log("reverseWords==", res);