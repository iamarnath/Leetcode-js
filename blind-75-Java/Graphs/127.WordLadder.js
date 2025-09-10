/*
127. Word Ladder

A transformation sequence from word beginWord to word
 endWord using a dictionary wordList is a sequence of 
 words beginWord -> s1 -> s2 -> ... -> sk such that:

Every adjacent pair of words differs by a single letter.
Every si for 1 <= i <= k is in wordList. Note that
 beginWord does not need to be in wordList.
sk == endWord
Given two words, beginWord and endWord, and a dictionary 
wordList, return the number of words in the shortest
 transformation sequence from beginWord to endWord, 
 or 0 if no such sequence exists.

You are given two words, beginWord and endWord,
 and also a list of words wordList. All of the given
  words are of the same length, consisting of lowercase
   English letters, and are all distinct.

Your goal is to transform beginWord into 
endWord by following the rules:

You may transform beginWord to any word within wordList,
 provided that at exactly one position the words have
  a different character, and the rest of the
   positions have the same characters.
You may repeat the previous step with the new
 word that you obtain, and you may do 
 this as many times as needed.
Return the minimum number of words within
 the transformation sequence needed to obtain 
 the endWord, or 0 if no such sequence exists.

Example 1:

Input: beginWord = "cat", endWord = "sag", 
wordList = ["bat","bag","sag","dag","dot"]

Output: 4
Explanation: The transformation sequence 
is "cat" -> "bat" -> "bag" -> "sag".

Example 2:

Input: beginWord = "cat", endWord = "sag", 
wordList = ["bat","bag","sat","dag","dot"]

Output: 0
Explanation: There is no possible transformation
 sequence from "cat" to "sag" since the word "sag" is not in the wordList.

Constraints:

1 <= beginWord.length <= 10
1 <= wordList.length <= 100

*/
/*
The function uses Breadth-First Search (BFS) to find
 the shortest path from beginWord to endWord
  using only valid transformations (changing one character
   at a time, with each intermediate word present in the dictionary).

Input:

beginWord: The starting word.

endWord: The target word.

wordList: An array of valid words for transformation.

Output:

The number of words in the shortest transformation sequence,
 or 0 if no sequence exists.

How it Works
Initial Checks:

Convert wordList to a Set for fast lookups.

If endWord is not in wordList, return 0 immediately.

BFS Setup:

Initialize a queue with beginWord.

Use a Set to track visited words.

Initialize length to 1 (counting the starting word).

BFS Execution:

For each level (each word in the queue), generate
 all possible one-character transformations.

For each transformation, if it is in the dictionary 
and not yet visited, add it to the queue and mark it as visited.

If endWord is found, return the current length.

After processing each level, increment the length.

Termination:

If the queue is exhausted without finding endWord, return 0.

Time Complexity
Let 
N be the number of words in the dictionary.

Let 
M be the length of each word.

For each word:

Generate 
M×26 possible transformations.

Each transformation check is 
O(1) using the Set.

Worst Case:

Every word is visited, and for each word, 

26×M transformations are checked.

Total Time:
O(N×M×26), which is 

O(N×M) since 26 is a constant.

Note:

The actual time can be higher if the dictionary is large,
 but the complexity is dominated by the product of
  word length and dictionary size.

Space Complexity
Set for wordList: 
O(N)

Queue and visited set:

In the worst case, all words are visited, so 
O(N) for both.

Total Space:
O(N)
*/
/*
const newWord = word.substring(0, j) +
                String.fromCharCode(97 + k) +
                word.substring(j + 1);
Step-by-Step Explanation
word.substring(0, j)

What it does:
Takes the part of word from the start (index 0) 
up to (but not including) index j.

Example:

If word = "hit" and j = 1, then word.substring(0,1) is "h".
String.fromCharCode(97 + k)

What it does:
Converts the number (97 + k) to its corresponding lowercase letter.
97 is the ASCII code for 'a', so (97 + k) gives 
you 'a' for k=0, 'b' for k=1, etc.

Example:
If k = 2, then String.fromCharCode(97 + 2) is "c".
word.substring(j + 1)

What it does:
Takes the part of word from index j + 1 to the end.

Example:
If word = "hit" and j = 1, then word.substring(2) is "t".
Putting it all together

What it does:

Constructs a new word by replacing the character 
at position j in word with the letter corresponding to 97 + k.
The rest of the word remains unchanged.

Example:

If word = "hit", j = 1, and k = 2:

word.substring(0,1) = "h"

String.fromCharCode(97+2) = "c"

word.substring(2) = "t"

Result: "h" + "c" + "t" = "hct"

Part	                        Purpose	                            Example (word="hit", j=1, k=2)
word.substring(0, j)	         Left part up to index j	               "h"
String.fromCharCode(97 + k)	New character for index j	             "c"
word.substring(j + 1)	      Right part after index j	             "t"
Combined	                     New word with one character changed	    "hct"

*/
var ladderLength = function (beginWord, endWord, wordList) {
   const wordSet = new Set(wordList);
   if (!wordSet.has(endWord)) return 0;
   const visited = new Set();
   const queue = [beginWord];
   visited.add(beginWord);
   let length = 1;
   while (queue.length > 0) {
      const levelSize = queue.length;
      for (let i = 0; i < levelSize; i++) {
         const word = queue.shift();
         if (word === endWord) return length;
         // Generate all possible transformations
         let wordlength = word.length
         for (let j = 0; j < wordlength; j++) {
            for (let k = 0; k < 26; k++) {
               const newWord = word.substring(0, j) +
                  String.fromCharCode(97 + k) +
                  word.substring(j + 1);
               if (wordSet.has(newWord) && !visited.has(newWord)) {
                  visited.add(newWord);
                  queue.push(newWord);
               } // end of if
            } // end of inner for all char loop
         } // end of outer for word char
      } // end of levelsize for
      length++;
   }// end of while
   return 0;
}
// let beginWord = "cat", endWord = "sag", 
// wordList = ["bat","bag","sag","dag","dot"];
let beginWord = "hit", endWord = "cog",
   wordList = ["hot", "dot", "dog", "lot", "log", "cog"];
let res = ladderLength(beginWord, endWord, wordList);
console.log("ladderLength==", res)