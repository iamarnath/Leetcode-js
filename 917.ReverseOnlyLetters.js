/*
917. Reverse Only Letters

Solution - https://leetcode.com/problems/reverse-only-letters/solutions/5118674/optimised/

Description
Given a string s, reverse the string according to the following rules:

All the characters that are not English letters remain in the same position.
All the English letters (lowercase or uppercase) should be reversed.
Return s after reversing it.

Example 1:

Input: s = "ab-cd"
Output: "dc-ba"
Example 2:

Input: s = "a-bC-dEf-ghIj"
Output: "j-Ih-gfE-dCba"
Example 3:

Input: s = "Test1ng-Leet=code-Q!"
Output: "Qedo1ct-eeLg=ntse-T!"
 

Constraints:

1 <= s.length <= 100
s consists of characters with ASCII values in the range [33, 122].
s does not contain '\"' or '\\'.
*/
/*
Approach:

Initialization: The function initializes two pointers, left and right, pointing to the start and end of the input string s, respectively. It also creates a new array convertedStr by spreading the characters of s into it.
Reversing Letters: The function then enters a loop that continues as long as left is less than right.
Inside the loop, the function first moves the left pointer to the right until it points to a letter character, skipping any non-letter characters.
Similarly, it moves the right pointer to the left until it points to a letter character.
Once both left and right pointers are pointing to letter characters, the function swaps the characters at those positions.
After the swap, the function increments left and decrements right to move the pointers towards the center of the string.
Returning the Result: After the loop completes, the function joins the characters in the convertedStr array back into a string and returns it.

Time Complexity:

The time complexity of this function is O(n), where n is the length of the input string s. This is because the function performs a single pass through the input string, with the loop running at most n/2 times (since the pointers move towards the center of the string).
Inside the loop, the function performs constant-time operations, such as checking if a character is a letter using the regular expression /[a-zA-Z]/, swapping two elements in the convertedStr array, and incrementing/decrementing the left and right pointers.

Space Complexity:

The space complexity of this function is O(n), where n is the length of the input string s. This is because the function creates a new array convertedStr with the same length as the input string s to store the modified characters.
The function does not use any additional data structures that grow with the size of the input, so the space complexity is linear with respect to the input size.


*/
function reverseOnlyLetters(s) {
    let left = 0;
    let right = s.length - 1;
    let convertedStr = [...s];
    
    while (left < right) {
        // Increment left pointer if current character is not a letter, until it points to a letter
        while (!/[a-zA-Z]/.test(convertedStr[left]) && left < right) {
            left++;
        }
        while (!/[a-zA-Z]/.test(convertedStr[right]) && left < right) {
            right--;
        }
        // Swap the letters at left and right
        [convertedStr[left], convertedStr[right]] = [convertedStr[right], convertedStr[left]];
        // Move pointers towards the center

        left++;
        right--;
    }
    return convertedStr.join("");
}

let s = "ab-cd";
s = "a-bC-dEf-ghIj"

console.log(reverseOnlyLetters(s))