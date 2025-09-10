/*
211. Design Add And Search Words

Design a data structure that supports adding new words and
searching for existing words.

Implement the WordDictionary class:

void addWord(word) Adds word to the data structure.
bool search(word) Returns true if there is any string in the
 data structure that matches word or false otherwise. 
 word may contain dots '.' where dots can be matched with any letter.
Example 1:

Input:
["WordDictionary", "addWord", "day", "addWord", "bay", "addWord",
 "may", "search", "say", "search", "day", "search", ".ay", "search", "b.."]

Output:
[null, null, null, null, false, true, true, true]

Explanation:
WordDictionary wordDictionary = new WordDictionary();
wordDictionary.addWord("day");
wordDictionary.addWord("bay");
wordDictionary.addWord("may");
wordDictionary.search("say"); // return false
wordDictionary.search("day"); // return true
wordDictionary.search(".ay"); // return true
wordDictionary.search("b.."); // return true
Constraints:

1 <= word.length <= 20
word in addWord consists of lowercase English letters.
word in search consist of '.' or lowercase English letters.


*/
// Creates a new Trie node with empty children and isEnd flag

function createTrieNode() {
    return {
        children: {},// Stores child nodes (key: character, value: Trie node)
        isEnd: false // Marks if this node completes a word
    }
}

function WordDictionary() {
    this.root = createTrieNode();
}
// Method to add words to the dictionary

WordDictionary.prototype.addWord = function (word) {
    let node = this.root;
    // Iterate through each character in the word
    for (let i = 0; i < word.length; i++) {
        const char = word[i]; // Current character
        // Create new node if character doesn't exist in current node's children
        if (!node.children[char]) {
            node.children[char] = createTrieNode();
        }
        // Move to the child node
        node = node.children[char];
    }
    // Mark end of the word after processing all characters
    node.isEnd = true;
}

// Method to search for words (supports '.' wildcard)
/*
Core Logic
1.Purpose:

    To determine if the input word exists in the Trie,
    where . can match any single character.

2.Approach:

    The function uses a recursive depth-first search (DFS)
    helper to traverse the Trie.
    For each character in the search word:

        If it’s a regular character, follow the corresponding child node.
        If it’s ., try all possible children at that position.

1. Start the Search
    The function is called as search(word).
    It invokes a helper (often called dfs) starting from 
    the root node and index 0.

2. DFS Helper Function
Base Case:

    If the current index equals the word’s length, 
    return true if the current node marks the end of a word (isEnd),
    else false.

For Each Character:

    If the character is not .:

        Check if the corresponding child exists.
        If yes, continue the search with the next character.
        If not, return false (no match).

    If the character is .:
        Iterate through all children of the current node.
        Recursively search for the next character in each child.
        If any recursive call returns true, the function returns true.
        If none match, return false.

3. Return Result
    The function returns true if a matching word is found, false otherwise.

*/
WordDictionary.prototype.search = function (word) {
    // Recursive helper function for depth-first search
    function dfs(node, i) {
         // Base case: invalid node
        if (!node) return false;
        // Base case: reached end of search word
        if (i === word.length) return node.isEnd;
        const char = word[i]; // Current character to match
         // Handle wildcard character
        if (char === ".") {
            // Try every possible child node for '.'
            for (const child in node.children) {
                // Recursively check next character in all child paths
                if (dfs(node.children[child], i + 1)) {
                    return true; // Found a valid path
                }
            }
            return false; // No valid paths found
        }
        else {
            // Check if character exists in children
            if (!node.children[char]) return false;
            // Continue search with next character in specific child path
            return dfs(node.children[char], i + 1);
        }
    }
    // Start search from root node at first character
    return dfs(this.root, 0)
}