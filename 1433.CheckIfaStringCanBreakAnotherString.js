/*
1433. Check If a String Can Break Another String

Solution - https://leetcode.com/problems/check-if-a-string-can-break-another-string/solutions/5118681/optimised/

Description

Given two strings: s1 and s2 with the same size, check if some permutation of string s1 can break some permutation of string s2 or vice-versa. In other words s2 can break s1 or vice-versa.
A string x can break string y (both of size n) if x[i] >= y[i] (in alphabetical order) for all i between 0 and n-1.

Example 1:

Input: s1 = "abc", s2 = "xya"
Output: true
Explanation: "ayx" is a permutation of s2="xya" which can break to string "abc" which is a permutation of s1="abc".
Example 2:

Input: s1 = "abe", s2 = "acd"
Output: false 
Explanation: All permutations for s1="abe" are: "abe", "aeb", "bae", "bea", "eab" and "eba" and all permutation for s2="acd" are: "acd", "adc", "cad", "cda", "dac" and "dca". However, there is not any permutation from s1 which can break some permutation from s2 and vice-versa.
Example 3:

Input: s1 = "leetcodee", s2 = "interview"
Output: true
 
Constraints:
s1.length == n
s2.length == n
1 <= n <= 10^5
All strings consist of lowercase English letters.
*/

/*
Approach:
Initialization: The function initializes two variables, counts1 and counts2, to keep track of the number of positions where s1 can break s2 and vice versa, respectively.
Sorting the Strings: The function converts both strings to arrays of characters and sorts them alphabetically using the sort() method. This ensures that the characters in each string are in lexicographical order.
Checking for Breakability: The function then iterates through the sorted arrays of characters. For each position, it checks if s1 can break s2 by comparing the characters at that position in both strings. If s1 can break s2, it increments counts1. Similarly, it checks if s2 can break s1 and increments counts2 if it can.
Returning the Result: After processing all positions, the function checks if either counts1 or counts2 is equal to the length of the strings. If either condition is true, it means that s1 can break s2 or vice versa, and the function returns true. Otherwise, it returns false.

Time Complexity:
The time complexity of the checkIfCanBreak function is O(n log n), where n is the length of the input strings.
The sort() method used to sort the strings has a time complexity of O(n log n).
The subsequent iteration through the sorted arrays of characters takes O(n) time.
The total time complexity is the sum of these two operations, resulting in O(n log n).

Space Complexity:
The space complexity of the checkIfCanBreak function is O(n), where n is the length of the input strings.
The function uses a constant amount of extra space to store the counts1 and counts2 variables.
The space complexity does not depend on the length of the input strings.

*/

function checkIfCanBreak(s1, s2) {
    // Convert both strings to arrays of characters and sort them alphabetically
    const sortedChar1 = Array.from(s1).sort();
    const sortedChar2 = Array.from(s2).sort();
    let n = s1.length;
    let counts1 = 0, counts2 = 0;

    for (let i = 0; i < n; i++) {
        //check if s1 can break s2
        if (sortedChar1[i] >= sortedChar2[i]) {
            counts1++;
        }
        //check if s2 can break s1
        if (sortedChar2[i] >= sortedChar1[i]) {
            counts2++;
        }
    }
    if (counts1 === n || counts2 === n) {
        return true;
    }
    return false;
}

let s1 = "abc", s2 = "xya";
s1 = "abe", s2 = "acd";
s1 = "leetcodee", s2 = "interview";

console.log(checkIfCanBreak(s1, s2));