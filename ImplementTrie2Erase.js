/*
Implement Trie - II

Problem Statement: 
Implement a Trie data structure that supports the following methods:

Insert (word): To insert a string `word` in the Trie.
Count Words Equal To (word): Return the count of occurrences of the string word in the Trie.
Count Words Starting With (prefix): Return the count of words in the Trie that have the string “prefix” as a prefix.
Erase (word): Delete one occurrence of the string word from the Trie.

Note:

The Erase(word) function is guaranteed to be called only when a word is present in the Trie.
Release the memory associated with variables using dynamic memory allocation at the end of your solution.
Examples
Example 1:

Input:
Insert: ‘apple’, ‘apps’, ‘apxl’
Count Number of Words Equal to: ‘apple’
Count Number of Words Starting with: ‘app’, ‘ap’
Erase word: ‘apxl’

Output: 
Inserted ‘apple’, Inserted ‘apps’,Inserted, ‘apxl’.
Number of Words Equal to ‘apple’: 1
Number of Words Starting with ‘app’: 2 and ‘ap’: 3
Erased ‘apxl’
Explanation: Insert Operations: “apple”, “apps” and “apxl” are inserted. 

Count Number of Words Equal to: ‘apple’

Count Number of Words Starting with: ‘app’, ‘ap’

Erase word: ‘apxl’
*/
/*
insert(word): Inserts a word into the Trie, incrementing countWordsStartingWith at each node and countWordsEqualTo at the last node.

countWordsEqualTo(word): Checks if the word exists by traversing through the nodes. Returns the count at the last node for exact matches.

countWordsStartingWith(prefix): Counts the words that start with a given prefix by checking countWordsStartingWith at the node corresponding to the last character of the prefix.

erase(word): Traverses the Trie for the given word, decrementing countWordsEqualTo at the last node and countWordsStartingWith along the path. Removes nodes if they are no longer needed.
*/
/*
Approach
1. Trie Structure
Each node in the Trie contains:
children: An object mapping characters to their corresponding child nodes.
countWordsEqualTo: A counter that tracks how many times a specific word has been inserted.
countWordsStartingWith: A counter that tracks how many words start with the prefix represented by that node.
2. Insert Method
For each character in the word:
If the character does not exist in the current node's children, create a new Trie node for it.
Move to the child node corresponding to that character.
Increment countWordsStartingWith for each character traversed.
After processing all characters, increment countWordsEqualTo at the last character node to indicate a complete word.
3. Count Words Equal To Method
Traverse through each character of the given word.
If any character is missing in the current node's children, return 0 (indicating no such word exists).
Return countWordsEqualTo from the last character node.
4. Count Words Starting With Method
Similar to countWordsEqualTo, but instead returns countWordsStartingWith from the last character node of the prefix.
5. Erase Method
Traverse through each character of the word, keeping track of nodes visited.
Decrement countWordsStartingWith for each character as you go.
After reaching the end of the word, decrement countWordsEqualTo.
Clean up nodes: If a character node has no remaining words starting with it and does not represent a complete word (countWordsStartingWith and countWordsEqualTo both zero), delete that child node from its parent.
Time Complexity
Insert: O(m), where m is the length of the word being inserted. Each character is processed once.
Count Words Equal To: O(m), where m is the length of the word being searched. Each character is processed once.
Count Words Starting With: O(k), where k is the length of the prefix being searched. Each character is processed once.
Erase: O(m), where m is the length of the word being erased. Each character is processed once, plus additional time for cleanup which is also O(m) in the worst case.
Space Complexity
Insert: The space complexity can be considered O(m * n) in total for all inserted words, where m is the average length of words and n is the number of unique characters across all words (since each unique prefix may lead to new nodes). In practice, it depends on how many unique prefixes are created as new words are inserted.
Count Words Equal To / Count Words Starting With / Erase: These operations do not require additional space beyond what has already been allocated for nodes in the Trie, so they have O(1) space complexity regarding additional memory usage.
*/
var Trie = function() {
    this.children = {};
    this.countWordsEqualTo = 0;
    this.countWordsStartingWith = 0;
};
Trie.prototype.insert = function(word) {
    let node = this;
    for(let char of word){
        if(!node.children[char]){
            node.children[char] = new Trie(); 
        }
        node = node.children[char];
        node.countWordsStartingWith += 1;
    }
    node.countWordsEqualTo += 1;
}
Trie.prototype.countWordsEqualToFN = function(word) {
    let node = this;
    for(let char of word){
        if(!node.children[char]) return 0;
        node = node.children[char];
    }
    return node.countWordsEqualTo;
}

Trie.prototype.countWordsStartingWithFN = function(prefix) {
    let node = this;
    //console.log("countWordsStartingWithFN--",node)
    for(let char of prefix){
        if(!node.children[char]) return 0;
        node = node.children[char];
    }
    return node.countWordsStartingWith;
}

Trie.prototype.erase = function(word) {
    let node = this;
    const nodes =[];
    // Traverse through each character of the word
    for(let char of word){
        if(!node.children[char]) return;
        nodes.push([node ,char]);
        node = node.children[char];
        node.countWordsStartingWith -= 1;
    }

    // Decrement the countWordsEqualTo at the last character node
    node.countWordsEqualTo -= 1;
    // Clean up nodes that no longer have counts
    for(let i = nodes.length -1;i>=0;i--){
        const [parent,char] = nodes[i];
        const childNode = parent.children[char];
         // If there are no words left starting with this character, delete it
         if(childNode.countWordsStartingWith ==0 && childNode.countWordsEqualTo === 0){
            delete parent.children[char];
         }
         else{
            break;
         }
    }
    console.log("after deletion erase --",node.children);
}

/** 
 * Usage example:


 * trie.insert("apple");
 * console.log(trie.countWordsEqualTo("apple"));    // Output: 2
 * trie.erase("apple");
 * console.log(trie.countWordsEqualTo("apple"));    // Output: 1
 */
 var trie = new Trie();
 //trie.insert("apple");
 trie.insert("app");

//console.log(trie.countWordsEqualToFN("apple"));    // Output: 1
console.log(trie.countWordsStartingWithFN("app")); // Output: 1

trie.erase("app");
console.log(trie.countWordsEqualToFN("app"));
console.log(trie.countWordsStartingWithFN("app"));
