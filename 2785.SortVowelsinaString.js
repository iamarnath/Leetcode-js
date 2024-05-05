/*
2785. Sort Vowels in a String

Solution - https://leetcode.com/problems/sort-vowels-in-a-string/solutions/5114897/optimised/

Description
Given a 0-indexed string s, permute s to get a new string t such that:

All consonants remain in their original places. More formally, if there is an index i with 0 <= i < s.length such that s[i] is a consonant, then t[i] = s[i].
The vowels must be sorted in the nondecreasing order of their ASCII values. More formally, for pairs of indices i, j with 0 <= i < j < s.length such that s[i] and s[j] are vowels, then t[i] must not have a higher ASCII value than t[j].
Return the resulting string.

The vowels are 'a', 'e', 'i', 'o', and 'u', and they can appear in lowercase or uppercase. Consonants comprise all letters that are not vowels.

Example 1:

Input: s = "lEetcOde"
Output: "lEOtcede"
Explanation: 'E', 'O', and 'e' are the vowels in s; 'l', 't', 'c', and 'd' are all consonants. The vowels are sorted according to their ASCII values, and the consonants remain in the same places.
Example 2:

Input: s = "lYmpH"
Output: "lYmpH"
Explanation: There are no vowels in s (all characters in s are consonants), so we return "lYmpH".

Constraints:

1 <= s.length <= 105
s consists only of letters of the English alphabet in uppercase and lowercase.
*/
/*
Time Complexity

The time complexity of this solution is O(n log n), where n is the length of the input string s.
The key steps are:
Splitting the input string into characters: This takes O(n) time, as we need to iterate through each character in the string.
Filtering out vowels: This also takes O(n) time, as we need to iterate through each character in the string.
Sorting the vowels: This takes O(n log n) time, as we need to sort the vowels in the array.
The overall time complexity is the combination of these steps, resulting in O(n log n).

Space Complexity

The space complexity of this solution is O(n), as we need to store the filtered vowels in an array and the resulting string.

Approach
The approach used in this solution is to first filter out the vowels from the input string and sort them. Then, it iterates over each character in the input string, replacing vowels with the sorted vowels while preserving the original order of non-vowels.
The key steps are:
Split the input string into characters and filter out vowels:
Use s.split('') to split the input string into an array of characters.
Use filter to create a new array that includes only the characters that are vowels.
Sort the vowels:
Use sort to sort the vowels in the array.
Iterate over each character of the input string:
Initialize an empty array ans to store the resulting string.
Initialize vowelIndex to 0, which will be used to track the current position in the sorted vowels array.
Iterate over each character c in the input string:
If c is a vowel, use the vowel from the sorted vowels array at the current vowelIndex and increment vowelIndex.
If c is not a vowel, use c as is.
Add the character to the ans array.
Join the characters in ans into a string and return it:
Use join`` to concatenate the characters in ans` into a single string.
Return the resulting string.
This approach is efficient because it uses a single pass over the input string to filter out vowels and sort them, and then another pass to replace vowels with the sorted vowels while preserving the original order of non-vowels.

*/
var sortVowels = function (s) {
    const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
    // Split the input string into characters, filter out vowels, and sort them
    const vowelSorted = s.split('')
        .filter(char => vowels.includes(char))
        .sort();
    const ans = [];
    let vowelIndex = 0;
    // Iterate over each character of the input string
    for (let c of s) {
        // If the character is a vowel, use the vowel from sortedVowels (preserving original order elsewise)
        ans.push(vowels.includes(c) ? vowelSorted[vowelIndex++] : c);
    }
    return ans.join('');
};

let s = "lEetcOde";
s = "lYmpH";
console.log(sortVowels(s));