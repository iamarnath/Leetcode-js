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

        }// end of req count 0 while

        j++;
    } //end of j while
    return minWindow === Infinity ? "" : s.substr(minStart, minWindow);
}


let s = "OUZODYXAZV", t = "XYZ";
console.log(minWindow(s, t));
/*
The provided code finds the minimum window substring in a
 string s that contains all the characters from string t.
  For s = "OUZODYXAZV" and t = "XYZ", here is a step-by-step 
  visualization of how the sliding window moves and updates:

Initial State
s: "O U Z O D Y X A Z V"

t: "X Y Z"

charMap: { X: 1, Y: 1, Z: 1 }

requiredCount: 3

Sliding Window Steps
Step	i	j	Window	charMap (after s[j])	requiredCount	Min Window
1	    0	0	O	    { O:-1, X:1, Y:1, Z:1 }	3	
2	    0	1	OU	{ O:-1, U:-1, X:1, Y:1, Z:1 }	3	
3	    0	2	OUZ	{ ... , Z:0 }	2	
4	    0	3	OUZO	{ ... , O:-2 }	2	
5	    0	4	OUZOD	{ ... , D:-1 }	2	
6	    0	5	OUZODY	{ ... , Y:0 }	1	
7	    0	6	OUZODYX	{ ... , X:0 }	0	OUZODYX (len=7)
1	    6	    UZODYX	{ O:-1 } (removing O)	0	UZODYX (len=6)
2	    6	    ZODYX	{ U:0 } (removing U)	0	ZODYX (len=5)
3	    6	    ODY X	{ Z:1 } (removing Z; >0)	1	
8	    3	7	ODYXA	{ A:-1 }	1	
9	    3	8	ODYXAZ	{ Z:0 }	0	O D Y X A Z (6)
4	    8	    DYXAZ	{ O:0 } (removing O)	0	D Y X A Z (5)
5	    8	    YXAZ	{ D:0 } (removing D)	0	Y X A Z (4)
6	    8	    XAZ	    { Y:1 } (removing Y, >0)	1	
10	    6	9	XAZV	{ V:-1 }	1	
Result
The smallest window that contains all required letters is "YXAZ",
 starting at index 5 with length 4.

Explanation of Each Action
The window slides right, adding characters.

When a character from t is found, its count in charMap decreases.

When all counts for t's letters are zero or lower, requiredCount reaches 0.

The inner loop removes characters from the left, 
updating i, until not all characters are satisfied.

It updates the minimum window each time a valid 
window (requiredCount == 0) is found.

Highlighted Output
Minimum window substring that contains all "X", "Y", "Z" 
from "OUZODYXAZV" is "YXAZ".

Visualization
0	1	2	3	4	5	6	7	8	9
O	U	Z	O	D	Y	X	A	Z	V
[Y]	[X]	[A]	[Z]	
The window covering indices 5 to 8 gives the answer.

*/