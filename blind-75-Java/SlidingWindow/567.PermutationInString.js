/*

567. Permutation In String
You are given two strings s1 and s2.

Return true if s2 contains a permutation of s1, 
or false otherwise. That means if a permutation of s1 exists as a substring of s2, then return true.

Both strings only contain lowercase letters.

Example 1:

Input: s1 = "abc", s2 = "lecabee"

Output: true
Explanation: The substring "cab" is a permutation of "abc" and is present in "lecabee".

Example 2:

Input: s1 = "abc", s2 = "lecaabee"

Output: false
Constraints:

1 <= s1.length, s2.length <= 1000

*/

function checkInclusion(s1, s2) {
    const n = s1.length;
    const m = s2.length;

    // If s1 is larger than s2, no permutation can exist
    if (n > m) return false;

    // Frequency arrays for s1 and the current window in s2
    const s1_freq = new Array(26).fill(0);
    const s2_freq = new Array(26).fill(0);

    // Fill frequency of characters in s1
    for (let i = 0; i < n; i++) {
        s1_freq[s1.charCodeAt(i) - 'a'.charCodeAt(0)]++;
    }

    // Sliding window over s2
    let i = 0; // left index of the sliding window
    let j = 0; // right index of the sliding window
    while (j < m) {
        // Include a new character from the right end of the window
        s2_freq[s2.charCodeAt(j) - 'a'.charCodeAt(0)]++;

        // If window size exceeds s1's length, remove the leftmost character
        if (j - i + 1 > n) {
            s2_freq[s2.charCodeAt(i) - 'a'.charCodeAt(0)]--;
            i++;
        }

        // Check if the current window's frequency matches s1's frequency
        if (arraysEqual(s1_freq, s2_freq)) {
            return true;
        }

        j++;
    }

    // No matching window found
    return false;
}

// Helper function to compare two arrays for equality
function arraysEqual(a, b) {
    for (let i = 0; i < 26; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}
/*

Frequency Arrays
s1_freq: [1,1,1,0,...] // 'a':1, 'b':1, 'c':1 (rest are 0)

s2_freq: starts empty, evolves as window slides

Sliding Window States
Step	Window	Indices	s2_freq after add	Remove char?	Compare s1_freq/s2_freq	Match?
1	"l"	0	'l':1	No	No	
2	"le"	0-1	'l':1, 'e':1	No	No	
3	"lec"	0-2	'l':1, 'e':1, 'c':1	No	No	
4	"eca"	1-3	'e':1, 'c':1, 'a':1	Yes, 'l'	No	
5	"cab"	2-4	'c':1, 'a':1, 'b':1	Yes, 'e'	Yes	FOUND
At step 5 ("cab", indices 2-4), s2_freq: [1,1,1,...] exactly matches s1_freq. This substring is a permutation.

Continue:
The algorithm would return true at this point and stop searching further.

Visual Markup of Window
0	1	2	3	4	5	6
l	e	c	a	b	e	e
[c]	[a]	[b]		
Window "cab" matches a permutation of "abc".

Key Points
The code uses two arrays to track frequencies: one for s1 (constant) and one sliding window over s2.

Whenever the two arrays match, the substring is a permutation.

For "lecabee", matching substring is "cab" (window indices 2-4).

Answer:
The code finds a matching window, "cab", in "lecabee", so it returns true.

*/