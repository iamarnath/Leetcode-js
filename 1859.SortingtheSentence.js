/*
1859. Sorting the Sentence

Solution - https://leetcode.com/problems/sorting-the-sentence/solutions/5210398/optimised/


Description-
A sentence is a list of words that are separated by a single space with no leading or trailing spaces. Each word consists of lowercase and uppercase English letters.

A sentence can be shuffled by appending the 1-indexed word position to each word then rearranging the words in the sentence.

For example, the sentence "This is a sentence" can be shuffled as "sentence4 a3 is2 This1" or "is2 sentence4 This1 a3".
Given a shuffled sentence s containing no more than 9 words, reconstruct and return the original sentence.

Example 1:

Input: s = "is2 sentence4 This1 a3"
Output: "This is a sentence"
Explanation: Sort the words in s to their original positions "This1 is2 a3 sentence4", then remove the numbers.
Example 2:

Input: s = "Myself2 Me1 I4 and3"
Output: "Me Myself and I"
Explanation: Sort the words in s to their original positions "Me1 Myself2 and3 I4", then remove the numbers.
 

Constraints:

2 <= s.length <= 200
s consists of lowercase and uppercase English letters, spaces, and digits from 1 to 9.
The number of words in s is between 1 and 9.
The words in s are separated by a single space.
s contains no leading or trailing spaces.

*/
/*
Approach to sortSentence Function

The sortSentence function sorts a given sentence by the numerical index at the end of each word. It splits the input sentence into words, extracts the numerical index from each word, and places the words in the correct order based on their indices. Finally, it concatenates the sorted words back into a sentence.

Time Complexity
Let n be the number of words in the sentence and m be the average length of each word.
The time complexity of this function is O(n*m), where n is the number of words and m is the average length of each word.
The function iterates through each word in the sentence, extracting the numerical index and placing the word in the correct position in the result array.
The time complexity scales linearly with the number of words and the average word length.

Space Complexity
The space complexity of this function is O(n), where n is the number of words in the sentence.
The function creates an array to hold the sorted words, which has the same length as the number of words in the input sentence.
Additionally, it splits the input sentence into an array of words, which also contributes to the space complexity.
Overall, the space complexity is linear in terms of the number of words in the sentence.


*/
var sortSentence = function (s) {
    // Split the sentence into words based on space delimiter.
    const ws = s.split(' ');
    // Initialize an array to hold the sorted words. Its length is the same as the number of words.
    const ans = new Array(ws.length);
    for (const w of ws) {
        // The index for the word's position is at the end of the word (one digit).
        // Subtract the char code of '1' to convert from char to actual numerical index.
        let index = w.charCodeAt(w.length - 1) - '1'.charCodeAt(0)
        ans[index] = w.slice(0, -1);// Slice off the last character, the numerical index.
    }
    return ans.join(' ');
}

let s = "is2 sentence4 This1 a3";

console.log(sortSentence(s));