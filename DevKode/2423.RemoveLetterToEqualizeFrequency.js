/*
2423. Remove Letter To Equalize Frequency

Solution - https://leetcode.com/problems/remove-letter-to-equalize-frequency/solutions/5063299/optimised/

Description
You are given a 0-indexed string word, consisting of lowercase English letters. You need to select one index and remove the letter at that index from word so that the frequency of every letter present in word is equal.

Return true if it is possible to remove one letter so that the frequency of all letters in word are equal, and false otherwise.

Note:

The frequency of a letter x is the number of times it occurs in the string.
You must remove exactly one letter and cannot choose to do nothing.
 

Example 1:

Input: word = "abcc"
Output: true
Explanation: Select index 3 and delete it: word becomes "abc" and each character has a frequency of 1.
Example 2:

Input: word = "aazz"
Output: false
Explanation: We must delete a character, so either the frequency of "a" is 1 and the frequency of "z" is 2, or vice versa. It is impossible to make all present letters have equal frequency.
 

Constraints:

2 <= word.length <= 100
word consists of lowercase English letters only.
*/
/*
The time complexity of the equalFrequency function can be analyzed as follows:

The first loop iterates over each character in the input word, which takes O(n) time, where n is the length of the input word.
The second loop iterates over each index from 0 to 25 (constant number of iterations), and within this loop, there is another loop that iterates over the cnt array, which also takes O(26) = O(1) time.
Therefore, the overall time complexity of the function is O(n) * O(1) = O(n).

*/

function equalFrequency(word) {
    // Initialize a count array of length 26 to store the frequency of each letter,
    // assuming 'a' maps to index 0 and 'z' maps to index 25.
    const charFrequency = new Array(26).fill(0);

    // Populate the charFrequency array with the count of each character in the word.
    for (const char of word) {
        charFrequency[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
    }

    // Iterate through each character's frequency.
    for (let i = 0; i < 26; ++i) {
        if (charFrequency[i]) {
            // Decrement the frequency of the current character to check if
            // we can achieve equal frequency by removing one char occurrence.
            charFrequency[i]--;

            // Initialize a variable to store the frequency of the first non-zero character we encounter.
            let commonFrequency = 0;
            let allFrequenciesEqual = true;

            // Iterate through the frequencies to check if they are all the same.
            for (const frequency of charFrequency) {
                if (frequency === 0) {
                    continue; // Skip if frequency is 0 as we are looking for non-zero frequencies.
                }
                // If commonFrequency is set and current frequency is different, set the equal flag to false.
                if (commonFrequency && frequency !== commonFrequency) {
                    allFrequenciesEqual = false;
                    break;
                }
                // Update commonFrequency with the current non-zero frequency.
                commonFrequency = frequency;
            }

            // If all non-zero frequencies are equal, return true.
            if (allFrequenciesEqual) {
                return true;
            }
            // Since we modified the original frequency, restore it back.
            charFrequency[i]++;
        }
    }
    // If we did not find any instance where all non-zero frequencies
    // were equal after removing one char occurrence, return false.
    return false;
}
let word = "abcc";
//word = "aazz";
console.log(equalFrequency(word));