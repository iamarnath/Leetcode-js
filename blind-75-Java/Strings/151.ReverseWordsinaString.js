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

The inner while loop copies each word (non-space characters)
 forward in the array (removing extra spaces in the process).

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
/*
Here’s a detailed, line-by-line explanation of the provided code for reversing the words in a string, maintaining only single spaces and removing extra ones:

js
var reverseWords = function (s) {
Defines a function named reverseWords that receives a string s as input.

js
    let arr = s.split("");
Converts the input string into an array of characters, allowing in-place array manipulation.

js
    arr.reverse();
Reverses the entire array of characters, so the word order and each word itself are reversed.
(e.g., "a good example" → "elpmaxe   doog a")

js
    let n = arr.length;
Stores the length of the character array in variable n for easy reference in the loop.

js
    let i = 0;
    let l = 0, r = 0;
Initializes three pointers:

i: For iterating through the characters.

l: Marks the start of the next word.

r: Marks where to copy the next non-space character (the write pointer).

js
    while (i < n) {
Starts the main loop, iterating through every character of the array.

js
        while (i < n && arr[i] !== " ") {
            arr[r] = arr[i];
            r++;
            i++;
        }
Processes a word:

For each non-space character, copy it to position r and increment both i and r.

This skips spaces, effectively collapsing multiple spaces.

js
        if (l < r) {
            reverseArr(arr, l, r - 1);
            if (r < n) arr[r++] = " ";
            l = r;
        }
After copying a word:

Reverse the word in place between l and r-1, restoring the original letter order for the word.

If more characters remain, write a single space at arr[r] and increment r.

Update l to start at the next write position, prepping for the next word.

js
        i++;//move past spaces
    }
Move the read pointer i past any spaces (if present) to reach the next word.

js
    if (r > 0 && arr[r - 1] === " ") r--;
Removes a trailing space, if the last character in the processed array is a space.

js
    return arr.slice(0, r).join("");
};
Returns the result as a string:

Joins only the active portion of arr (from 0 to r, exclusive of any leftover characters or spaces past r).
*/
// Helper function to reverse a portion of the array
var reverseArr = function (arr, left, right) {
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
}
// var reverseWords = function (s) {
//     let arr = s.split("");
//     arr.reverse();

//     console.log("arr==",arr)
//     let n = arr.length;
//     let i = 0;
//     // l and r will help in reverse
//     let l = 0, r = 0;
//     while (i < n) {
//         // Copy non-space characters forward
//         // if i get char,it will give it to r,
//         while (i < n && arr[i] !== " ") {
//             arr[r] = arr[i];
//             r++;
//             i++;
//            // console.log("arr[r]==",arr,r,i);
//         }
//       // now i get space,reverse the words now
//         // Reverse the word we just copied
//         if (l < r) {
//             reverseArr(arr, l, r - 1);
//             // Add a space after the word if there's more to process
//             if (r < n) arr[r++] = " ";
//             l = r;
//             //console.log("reverseArr==",arr,l,r)
//         }
//         i++;//move past spaces
//     }
//     // Remove trailing space if any
//     if (r > 0 && arr[r - 1] === " ") r--;
//     return arr.slice(0, r).join("");

// };

var reverseWords = function (s) {
    let arr = s.split("");
    arr.reverse();

    let n = arr.length;
    let i = 0;
    // l and r will help in reverse
    // hero honge hamare l and r jo reverse karenge words ko

    let l = 0, r = 0;
    while (i < n) {
        // Copy non-space characters forward
        // if i get char,it will give it to r,
        // i ko agar char dikha to r ko dega and i++ and r++
        while (i < n && arr[i] !== " ") {
            arr[r] = arr[i];
            r++;
            i++;
        }
     
        if (l < r) { 
            reverse(arr, l, r - 1);
                
            arr[r] = ' ';
            r++;
                
                l = r;
            }
        i++;//move past spaces
    }
    let result = arr.slice(0, r - 1).join('');
    return result;

};
/*
arr.slice(0, r - 1) in JavaScript means taking a portion of the array starting at index 0 and ending just before index (r - 1)—the end index is not included.

This method returns a new array containing all elements from index 0 up to index (r - 2) in the original array, without changing the original array.

For example:

If arr = ['a', 'b', 'c', 'd'] and r = 3, then arr.slice(0, 2) gives ['a', 'b'].

Whatever value (r - 1) is, the slice will include everything from the start up to, but not including, this index.
*/


s = "a good   example";
let res = reverseWords(s);
console.log("reverseWords==", res);

/*
Step-by-Step Logic
Initial Reverse:
The string is converted to an array of characters with split("") and the entire array is reversed using arr.reverse().

For example, "a good example" becomes ['e','l','p','m','a',' ',' ',' ','d','o','o','g',' ','a'] after reversal.

Word Extraction and In-place Reverse:
Iteration is performed through the reversed array to extract each word and copy it forward.

r tracks where to write the new character, and l is the start index for each word.

For each non-space character, it's copied to arr[r].

Upon encountering a space, the segment between l and r-1 is reversed to correct the word order.

If more words remain, a single space is inserted at arr[r].

This process cleans up extra spaces and maintains only one space between words.

Trimming:
After processing, any extra space at the end is removed: if the last character is a space, reduce r by 1.

Result:
Return only the meaningful portion of the array (arr.slice(0, r).join("")) as the final result.

Visualization Example
Given s = "a good example":

Reverse full string:
"a good example" → "elpmaxe doog a"

Process and copy words forward, fixing each word by reversing their characters and inserting exactly one space between words:

"elpmaxe" → "example"

"doog" → "good"

"a" → "a"

Final output:
"example good a"

Key Features
Handles extra spaces: Collapses multiple spaces between words into one and removes leading/trailing spaces.

In-place operation: No need for extra arrays or splits by word; all work is done on the character array.

Efficient: Each character is processed a constant number of times.
*/