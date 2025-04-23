/*
2109. Adding Spaces to a String

Solution - https://leetcode.com/problems/adding-spaces-to-a-string/solutions/5148080/optimised/

Description
You are given a 0-indexed string s and a 0-indexed integer array spaces that describes the indices in the original string where spaces will be added. Each space should be inserted before the character at the given index.

For example, given s = "EnjoyYourCoffee" and spaces = [5, 9], we place spaces before 'Y' and 'C', which are at indices 5 and 9 respectively. Thus, we obtain "Enjoy Your Coffee".
Return the modified string after the spaces have been added.

Example 1:

Input: s = "LeetcodeHelpsMeLearn", spaces = [8,13,15]
Output: "Leetcode Helps Me Learn"
Explanation: 
The indices 8, 13, and 15 correspond to the underlined characters in "LeetcodeHelpsMeLearn".
We then place spaces before those characters.
Example 2:

Input: s = "icodeinpython", spaces = [1,5,7,9]
Output: "i code in py thon"
Explanation:
The indices 1, 5, 7, and 9 correspond to the underlined characters in "icodeinpython".
We then place spaces before those characters.
Example 3:

Input: s = "spacing", spaces = [0,1,2,3,4,5,6]
Output: " s p a c i n g"
Explanation:
We are also able to place spaces before the first character of the string.
 
Constraints:

1 <= s.length <= 3 * 105
s consists only of lowercase and uppercase English letters.
1 <= spaces.length <= 3 * 105
0 <= spaces[i] <= s.length - 1
All the values of spaces are strictly increasing.

*/

/*
Approach:
The addSpaces function takes a string s and an array spaces containing indices where spaces should be inserted into the string.
It iterates over each character in the original string s, inserting a space at the specified indices from the spaces array.
The function builds a new string by inserting spaces at the specified positions and then returning the modified string.
Time Complexity:
The time complexity of the function is 

O(n+m), where 

n is the length of the original string s and 

m is the number of space indices in the spaces array.
The function iterates over each character in the original string s once, and for each space index in the spaces array, it inserts a space.
The overall time complexity is determined by the sum of the lengths of the original string and the spaces array.
Space Complexity:
The space complexity of the function is 

O(n+m), where 

n is the length of the original string s and 

m is the number of space indices in the spaces array.
The function creates a new string result to store the modified string with spaces inserted, which can grow up to the length of the original string plus the number of spaces to be inserted.
Additionally, integer variables strIndex and spaceIndex, as well as sLen and spaceLen to store the lengths of s and spaces, contribute to the space complexity.
The space complexity is determined by the space required for the new string and the variables used during the processing.
*/
function addSpaces(s, spaces) {
    let result = "", strIndex = 0, spaceIndex = 0;
    let sLen = s.length, spaceLen = spaces.length;
    // Iterate over each character in the original string.
    while (strIndex < sLen) {
        // If we have space indices left to process and the current string index matches
        // the next space index, add a space to the result string.
        if (spaceIndex < spaceLen && strIndex === spaces[spaceIndex]) {
            result += " ";
            // Move to the next space index after inserting a space.
            spaceIndex++;
        }
        result += s[strIndex];
        strIndex++;
    }
    return result;
}

let s = "spacing", spaces = [0, 1, 2, 3, 4, 5, 6];
s = "icodeinpython", spaces = [1,5,7,9]
s = "LeetcodeHelpsMeLearn", spaces = [8,13,15]

console.log(addSpaces(s, spaces));