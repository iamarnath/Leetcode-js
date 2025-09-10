/*
208. Implement Trie (Prefix Tree)

Description
A trie (pronounced as "try") or prefix tree is a tree data structure
 used to efficiently store and retrieve keys in a dataset of strings.
  There are various applications of this data structure, such as 
  autocomplete and spellchecker.

Implement the Trie class:

Trie() Initializes the trie object.
void insert(String word) Inserts the string word into the trie.
boolean search(String word) Returns true if the string word is in the
 trie (i.e., was inserted before), and false otherwise.
boolean startsWith(String prefix) Returns true if there
 is a previously inserted string word that has the prefix prefix,
  and false otherwise.
 

Example 1:

Input
["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
Output
[null, null, true, false, true, null, true]

Explanation
Trie trie = new Trie();
trie.insert("apple");
trie.search("apple");   // return True
trie.search("app");     // return False
trie.startsWith("app"); // return True
trie.insert("app");
trie.search("app");     // return True
 

Constraints:

1 <= word.length, prefix.length <= 2000
word and prefix consist only of lowercase English letters.
At most 3 * 104 calls in total will be made to insert, search, and startsWith.

*/
/*
Time Complexity
insert method: The time complexity is O(n), where n is the length
 of the word being inserted. This is because we iterate through
  each character of the word and perform constant time operations for each one.

search method: The worst-case time complexity is also O(n),
 assuming that n is the length of the word being searched. 
 This is similar to insert, as the method traverses the Trie,
  which takes time proportional to the length of the word.

startsWith method: The worst-case time complexity is O(m),
 where m is the length of the prefix. This is due to traversing
  the Trie up to the depth of the prefix length.

searchPrefix method (used by both search and startsWith):
 The time complexity here is O(p), where p is the length of the prefix.
  It is traversed only once for each method call.

Space Complexity
The overall space complexity of the Trie is O(k * l),
 where k is the maximum number of children (26 in this case,
  for each letter of the English alphabet) and l is the average length
   of the word. This is due to storing a number of nodes proportional
    to the length of the word times the number of children each node
     can have (which is 26 here, for lowercase English letters).

Each node contains an array of 26 pointers and a boolean flag,
 and the total space used grows with the number of nodes created
 , which is based on the number of words inserted and their lengths.

Note that the space complexity does not scale with the
 number of insert/search operations, but with the number of
  unique characters in the Trie. This makes Tries space-efficient 
  when storing large sets of words with overlapping prefixes.

*/
/**
 * Initialize your data structure here.
 */

var Trie = function() {
    this.children= {};
};

/** 
 * @param {string} word
 * @return {void}
 */
/*
Process:

Start at the root (this.children).
For each character in word:
If the character isn’t a child, create a new node.
Move to the child node.
Mark the end of the word with isEnd.
Example: Inserting "apple" creates nodes:
a → p → p → l → e (with isEnd at e).
*/
Trie.prototype.insert = function(word) {
        let node = this.children;
        for (let char of word) {
            if (!node[char]) {
                node[char] = {};
            }
            node = node[char];
        }
       console.log("insert node==",node)
        node['isEnd'] = true;
     
};

/** 
 * @param {string} word
 * @return {boolean}
 */

/*
Checks if the word exists in the Trie by:
Finding the node where word ends.
Verifying isEnd is set (ensures it’s a complete word, not a prefix).
*/
Trie.prototype.search = function(word) {
       let node= this.searchPrefix(word);
       return node != undefined && node['isEnd'] != undefined;
};

/** 
 * @param {string} prefix
 * @return {boolean}
 */
/*
Traverse the Trie character by character.
If any character is missing, return false.
Return the node where the prefix ends (or false).
*/
Trie.prototype.searchPrefix = function(prefix) {
        let node = this.children;
        if(!node) return false;
        for(let char of prefix){
            if(!node[char]) return false;
            node=node[char];
        }
        console.log("searchPrefix node==",node)
        return node;
};

/** 
 * @param {string} prefix
 * @return {boolean}
 */
//Checks if any word in the Trie starts with
//prefix by verifying the nodes exist.
Trie.prototype.startsWith = function(prefix) {
    return this.searchPrefix(prefix);
};

/** 
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */

var obj = new Trie();
let word = "apple";
let prefix = "app"
 obj.insert(word);
 //console.log("original word==",obj);
 var param_2 = obj.search(word);
 console.log(param_2);

 var param_3 = obj.startsWith(prefix)
 console.log(param_3);

 /*
 The insert, search, and startsWith operations in a Trie (prefix tree) can be visualized step by step for better understanding. Here is a clear breakdown and visualization:

Trie Insert Operation
Insert "apple":

Start with an empty root: {}

Insert 'a': {a: {}}

Insert 'p': {a: {p: {}}}

Insert next 'p': {a: {p: {p: {}}}}

Insert 'l': {a: {p: {p: {l: {}}}}}

Insert 'e': {a: {p: {p: {l: {e: {}}}}}}

Mark end: {a: {p: {p: {l: {e: {isEnd: true}}}}}}

Visualization

text
root
 └─ a
     └─ p
         └─ p
             └─ l
                 └─ e (isEnd: true)
Trie Search Operation
Search "apple":

Traverse: 'a' → 'p' → 'p' → 'l' → 'e'

At 'e', check 'isEnd':

If isEnd: true, "apple" exists (returns true)

If 'isEnd' not set, word does not exist (returns false)

Visualization

text
Search for: a → p → p → l → e
                       └→ isEnd? ✔ (exists)
Trie startsWith Operation
startsWith "app":

Traverse: 'a' → 'p' → 'p'

All nodes found so far. No need to check 'isEnd'

If traversal succeeds, prefix exists (returns true)

Visualization

text
Check prefix: a → p → p
                   └─ nodes exist? ✔
                   (prefix exists)
Summary Table
Operation	Input	Traversal Path	Result
insert	"apple"	a→p→p→l→e	Path created, isEnd at "e"
search	"apple"	a→p→p→l→e	Found, isEnd true (true)
startsWith	"app"	a→p→p	Path exists (true)
This visualization helps explain how Trie operations
 create nodes and traverse the data structure for word insertion,
  full word search, and prefix checks.

 */