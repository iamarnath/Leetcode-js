/*
2185. Counting Words With a Given Prefix
Solutions-
https://leetcode.com/problems/counting-words-with-a-given-prefix/solutions/5075575/optimisedjsinbuiltfunction/

https://leetcode.com/problems/counting-words-with-a-given-prefix/solutions/5075598/optimisedtriejssolution/

Description
You are given an array of strings words and a string pref.

Return the number of strings in words that contain pref as a prefix.

A prefix of a string s is any leading contiguous substring of s.

 

Example 1:

Input: words = ["pay","attention","practice","attend"], pref = "at"
Output: 2
Explanation: The 2 strings that contain "at" as a prefix are: "attention" and "attend".
Example 2:

Input: words = ["leetcode","win","loops","success"], pref = "code"
Output: 0
Explanation: There are no strings that contain "code" as a prefix.
 

Constraints:

1 <= words.length <= 100
1 <= words[i].length, pref.length <= 100
words[i] and pref consist of lowercase English letters.
*/
/*
without Trie
Time Complexity

The time complexity of the prefixCount function is O(n), where n is the number of words in the words array.
The function uses the reduce method to iterate over the words array. For each word, it checks if the word starts with the given prefix pref using the startsWith method. This operation has a time complexity of O(m), where m is the length of the word.
Since the reduce method iterates over the entire array, the overall time complexity of the function is O(n * m), which can be simplified to O(n) since the length of each word is not dependent on the size of the input array.

Space Complexity
The space complexity of the prefixCount function is O(1), which means it uses a constant amount of additional space, regardless of the size of the input.
The function only uses a single variable accumulator to keep track of the count of words that start with the given prefix. This variable is updated during the iteration, but its size does not depend on the size of the input.
Therefore, the space complexity of the prefixCount function is O(1).
In summary, the time complexity of the prefixCount function is O(n), and the space complexity is O(1).

with Trie

Time Complexity
Inserting Words into Trie: The time complexity of inserting all words into the Trie is O(n * m), where n is the number of words and m is the average length of the words. This is because for each word, we iterate through its characters to insert them into the Trie.
Counting Words with Prefix: The time complexity of counting the number of words with a given prefix is O(m), where m is the length of the prefix. This is because we traverse the Trie from the root to the last character of the prefix.
Therefore, the overall time complexity of the prefixCount function is O(n * m) for inserting words into the Trie and O(m) for counting words with a prefix. Since m is typically smaller than n, the dominant factor is O(n * m).
Space Complexity
Trie Data Structure: The space complexity of the Trie data structure used in the prefixCount function is O(n * m), where n is the number of words and m is the average length of the words. This is because we need to store all the characters of all the words in the Trie.
Additional Space: Apart from the Trie, the function uses additional space for variables and references, which is O(1) as it remains constant regardless of the input size.
Therefore, the space complexity of the prefixCount function is O(n * m) due to the Trie data structure.
In summary, the time complexity of the prefixCount function is O(n * m), and the space complexity is also O(n * m), where n is the number of words and m is the average length of the words.

*/
/*
// without TRIE
function prefixCount(words, pref) {
    return words.reduce((accumulator, currWord) => (
        accumulator += currWord.startsWith(pref) ? 1 : 0
    ), 0)
}
*/
class TrieNode {
    constructor() {
        this.children = new Map();
        this.isEndOfWord = false;
        this.prefixCount = 0;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char);
            node.prefixCount++;
        }
        node.isEndOfWord = true;
    }

    countWordsWithPrefix(prefix) {
        let node = this.root;
        for (let char of prefix) {
            if (!node.children.has(char)) {
                return 0;
            }
            node = node.children.get(char);
        }
        return node.prefixCount;
    }
}

function prefixCount(words, pref) {
    let trie = new Trie();
    for (let word of words) {
        trie.insert(word);
    }
    return trie.countWordsWithPrefix(pref);
}

let words = ["pay", "attention", "practice", "attend"], pref = "at";
//words = ["leetcode","win","loops","success"], pref = "code";

console.log(prefixCount(words, pref))