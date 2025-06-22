/*
Search Pattern (KMP-Algorithm)

Given two strings, one is a text string txt and
 the other is a pattern string pat. The task is to print
  the indexes of all the occurrences of the pattern string
   in the text string. Use 0-based indexing while returning the indices. 
Note: Return an empty list in case of 
no occurrences of pattern.

Examples :

Input: txt = "abcab", pat = "ab"
Output: [0, 3]
Explanation: The string "ab" occurs twice in txt, 
one starts at index 0 and the other at index 3. 
Input: txt = "abesdu", pat = "edu"
Output: []
Explanation: There's no substring "edu" present in txt.
Input: txt = "aabaacaadaabaaba", pat = "aaba"
Output: [0, 9, 12]
Explanation:

Constraints:
1 ≤ txt.size() ≤ 106
1 ≤ pat.size() < txt.size()
Both the strings consist of lowercase English alphabets.

*/
/*
Suppose the pattern is "ababd":

Index	0	1	2	3	4
Char	a	b	a	b	d
LPS	    0	0	1	2	0
At index 2 (a), the prefix "a" matches the suffix "a", so lps[2]=1.

At index 3 (b), the prefix "ab" matches the suffix "ab", so lps[3]=2.

At index 4 (d), no proper prefix is also a suffix, so lps[4]=0.

Visual Summary
The LPS array tells you, for each position, the 
length of the longest prefix that is also a suffix.

When a mismatch occurs during pattern matching, 
the LPS array tells you where to resume in the pattern,
 skipping unnecessary checks.

In summary:
computeLPS efficiently precomputes how much of the
 pattern can be reused after a mismatch, enabling the
 KMP algorithm to search in linear time by skipping redundant comparisons.

*/

/*
Time Complexity
Preprocessing (LPS array):
The computeLPS function processes the pattern of length 
m
m in O(m) time.

Search Phase:
The main search loop processes the text of length 
n
n in O(n) time.

Total Time Complexity:
The overall time complexity is O(n + m), where:

n
n = length of the text

m
m = length of the pattern

This holds for both the best and worst cases, as the 
algorithm never re-examines characters in the text or
 pattern, thanks to the LPS array.

Space Complexity
The space complexity is O(m) due to the storage of
 the LPS array, which is proportional to the length of the pattern.

No additional space is required that depends on
 the length of the text.

Summary          Table
Phase	         Complexity
Preprocessing	 O(m)
Search	         O(n)
Total	         O(n+m)
Space	         O(m)

*/

//Builds the LPS (Longest Prefix Suffix) array for the pattern.
//The LPS array precomputes how much of the pattern can be reused 
// after a mismatch, so the main search never re-examines
//  characters that are already known to match
function computeLPS(pattern, lps) {
    //M is the length of the pattern.
    const M = pattern.length;
    //len tracks the length of the current longest prefix which is also a suffix.
    let len = 0;// Length of the previous longest prefix & suffix
    //lps[0] is always 0 (no proper prefix/suffix for a single character).
    lps[0] = 0;
    let i = 1;
    while (i < M) {
//We have found a longer prefix-suffix. 
// Increment len and assign it to lps[i].
//Move to the next character (i++).
        //If pattern[i] === pattern[len], increment len, set lps[i], and move to next character.
        if (pattern[i] === pattern[len]) {
            len++;
            lps[i] = len;
            i++;
        }
        else {
            if (len != 0) {
                //If len is not zero, set len = lps[len - 1] 
                // (try the previous possible prefix length).
                len = lps[len - 1];
            }
            else {
                //If not matching and len is zero, 
                // set lps[i] to 0 and move forward.
                lps[i] = 0;
                i++;
            }
        }
    }
}

// Function to search for pattern in text using KMP algorithm
function search(pat, txt) {
    const N = txt.length;
    const M = pat.length;
    const result = [];
    //Create LPS array
    const lps = new Array(M).fill(0);
    computeLPS(pat, lps);
    //i for the current position in the text (txt)
    let i = 0; // index for txt
    //j for the current position in the pattern (pat)
    let j = 0; // index for pattern
    while (i < N) {
        //If pat[j] == txt[i], both pointers are incremented (i++, j++).
        //This means the current characters in the pattern and text match,
        //so we continue checking the next characters.
        if (pat[j] === txt[i]) {
            i++;
            j++;
        }
        //If j reaches the length of the pattern (j == M), 
        // it means the entire pattern has been matched in the text.
        if (j === M) {
            result.push(i - j); // 0-based index
            // result.push(i - j + 1); // 1-based index
            //The pointer j is reset to lps[j - 1] to check for overlapping patterns, 
            // using the LPS array to skip unnecessary comparisons
            j = lps[j - 1];

        }
        //If there is a mismatch after some 
        // matches (pat[j] != txt[i]), the algorithm uses the LPS array:

        else if (i < N && pat[j] !== txt[i]) {
        // If j != 0, set j = lps[j - 1] (move the pattern 
        // pointer back to the last known good prefix).
            if (j != 0) {
                j = lps[j - 1];
            }
            else {
                //If j == 0, increment i to move to the next character in the text.
                //This avoids re-checking characters that are already known to match, 
                // which is the key optimization over the naive approach
                i++;
            }
        }
    }
    return result;
}

//let  txt = "abcab", pat = "ab";
//let txt = "abesdu", pat = "edu";
let txt = "aabaacaadaabaaba", pat = "aaba";
let res = search(pat, txt);
console.log("search==", res)