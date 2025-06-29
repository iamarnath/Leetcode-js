/*
28. Find the Index of the First Occurrence in a String
Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.

 

Example 1:

Input: haystack = "sadbutsad", needle = "sad"
Output: 0
Explanation: "sad" occurs at index 0 and 6.
The first occurrence is at index 0, so we return 0.
Example 2:

Input: haystack = "leetcode", needle = "leeto"
Output: -1
Explanation: "leeto" did not occur in "leetcode", so we return -1.
 

Constraints:

1 <= haystack.length, needle.length <= 104
haystack and needle consist of only lowercase English characters.

*/
/*
Code Explanation

What does this code do?
This function implements the classic substring search
 (also known as the strStr function).
It finds the first occurrence of the substring needle
 in the string haystack. If needle is not found, it returns -1.

Step-by-step Explanation
Get Lengths:
m is the length of haystack, n is the length of needle.

Outer Loop (i):
Loops through possible starting indices in haystack
 where needle could fit (from 0 to m-n).

Inner Loop (j):
For each position i, checks if the substring
 starting at i matches needle character by character.

Mismatch:
If any character doesn't match
 (haystack[i + j] !== needle[j]), break out 
 of the inner loop and try the next position.

Match Found:
If all characters match (j == n - 1), return the current index i.

No Match:
If the loop finishes without finding a match, return -1.

Time Complexity
Outer loop: Runs up to m - n + 1 times 
(where m is the length of haystack and n is the length of needle).

Inner loop: In the worst case, for each position,
 it checks up to n characters.

Worst-case Time Complexity:

O((m−n+1)×n)≈O(m⋅n)
If needle is almost as long as haystack, this can be quite slow.

For example, if haystack is "aaaaaaa..." and
 needle is "aaa...b", the code will do a lot of repeated comparisons.

Space Complexity
The function uses only a few variables (m, n, i, j).

No extra space proportional to input size is used.

Space Complexity:

O(1)
Summary Table
Aspect	Complexity
Time Complexity	O(m × n)
Space Complexity	O(1)

*/
var strStr = function (haystack, needle) {
    let m = haystack.length;
    let n = needle.length;

    for (let i = 0; i <= (m - n); i++) { // haystack loop
        for (let j = 0; j < n; j++) { // needle loop
            if (haystack[i + j] !== needle[j]) {
                break
            }
            if (j == n - 1) {
                return i;
            }
        }
    }
    return -1;
};

//let haystack = "leetcode", needle = "leeto";

let haystack = "sadbutsad", needle = "sad";
let res = strStr(haystack, needle);

console.log("res==", res);