/*
1832. Check if the Sentence Is Pangram

https://leetcode.com/problems/check-if-the-sentence-is-pangram/solutions/5068280/optimised/


Description
A pangram is a sentence where every letter of the English alphabet appears at least once.

Given a string sentence containing only lowercase English letters, return true if sentence is a pangram, or false otherwise.

 

Example 1:

Input: sentence = "thequickbrownfoxjumpsoverthelazydog"
Output: true
Explanation: sentence contains at least one of every letter of the English alphabet.
Example 2:

Input: sentence = "leetcode"
Output: false
 

Constraints:

1 <= sentence.length <= 1000
sentence consists of lowercase English letters.
*/

/*
Time Complexity:

Initializing the vis array with new Array(26).fill(false) takes O(26) or O(1) time, as it's a constant operation.
The function then iterates over each character c in the sentence using a for...of loop, which takes O(n) time, where n is the length of the sentence.
Inside the loop, updating the vis array based on the ASCII value of the character takes O(1) time.
The every method is used to check if every element in the vis array is true, which also takes O(26) or O(1) time.
Therefore, the overall time complexity of the function is O(n), where n is the length of the sentence.

Space Complexity:

The function uses an array vis of size 26 to keep track of the presence of each letter in the alphabet, which contributes to the space complexity.
The space complexity is O(26) or O(1) for the vis array, as it has a fixed size regardless of the input.
Apart from the vis array, the function uses a constant amount of additional space for variables like c, isPangram, and the loop iterator.
Therefore, the space complexity of the function is O(1), as it does not scale with the input size and only uses a fixed amount of space.
*/
var checkIfPangram = function(sentence) {
    const vis = new Array(26).fill(false);
    for(const c of sentence){
        vis[c.charCodeAt(0)-'a'.charCodeAt(0)] = true;
    }
    let isPangram = vis.every(v=>v);
    return isPangram;
};






let sentence = "thequickbrownfoxjumpsoverthelazydog";
//sentence = "leetcode"
console.log(checkIfPangram(sentence));
