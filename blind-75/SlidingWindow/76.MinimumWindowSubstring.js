/*
76. Minimum Window Substring

Description
Given two strings s and t, return the shortest substring of s 
such that every character in t, including duplicates,
 is present in the substring. If such a substring does
  not exist, return an empty string "".

You may assume that the correct output is always unique.

Example 1:

Input: s = "OUZODYXAZV", t = "XYZ"

Output: "YXAZ"
Explanation: "YXAZ" is the shortest substring that includes "X",
 "Y", and "Z" from string t.

Example 2:

Input: s = "xyz", t = "xyz"

Output: "xyz"
Example 3:

Input: s = "x", t = "xy"

Output: ""
Constraints:

1 <= s.length <= 1000
1 <= t.length <= 1000
s and t consist of uppercase and lowercase English letters.


*/

/*
 Key Components
Character Frequency Map: Tracks required characters 
and their counts from string t

Sliding Window: Uses two pointers (i for left, j for right)

to find the minimum valid window

Required Count: Maintains how many unique characters
 from t still need to be included
 Algorithm Steps
Initialization:

Create frequency map for characters in t

Initialize pointers and tracking variables

Window Expansion (right pointer j moves):

Decrease count for current character

If character was required, decrease requiredCount

Window Shrinking (when all characters found):

Update minimum window size

Move left pointer i and adjust counts

If removed character was required, increment requiredCount

Result:

Return smallest valid substring or empty string if none found

 Complexity
Time: O(|S| + |T|) - Linear time complexity

Space: O(1) - Fixed size character map (assuming limited character set)

*/
function minWindow(s, t) {
    const n = s.length;
    const charMap = {};
    if (t.length > s.length) {
        return "";
    }
    // Initialize frequency map for characters in t
    for (const ch of t) {
        charMap[ch] = (charMap[ch] || 0) + 1;
    }
    let requiredCount = t.length;
    let i = 0, j = 0;
    let minStart = 0;
    let minWindow = Infinity;
    while (j < n) {
        const rightChar = s[j];
        // Decrease count for current character if it's in t
        if ((charMap[rightChar] || 0) > 0) {
            requiredCount--;
        }
        // Update map (negative counts mean we have extra characters)
        charMap[rightChar] = (charMap[rightChar] || 0) - 1;
        // When we have all required characters
        while (requiredCount === 0) {
            // Update minimum window
            if (j - i + 1 < minWindow) {
                minWindow = j - i + 1;
                minStart = i;
            }
            // Try to shrink window from left
            const leftChar = s[i];
            charMap[leftChar] = (charMap[leftChar] || 0) + 1;
            // If a required character is being removed
            if (charMap[leftChar] > 0) {
                requiredCount++;
            }
            i++;

        }// end of req count while

        j++;
    } //end of j while
    return minWindow === Infinity ? "" : s.substr(minStart, minWindow);
}


let s = "OUZODYXAZV", t = "XYZ";
console.log(minWindow(s, t));