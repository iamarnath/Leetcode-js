/*

Ninja developed a love for arrays and strings so this time his teacher gave him an array of strings, ‘A’ of size ‘N’. Each element of this array is a string. The teacher taught Ninja about prefixes in the past, so he wants to test his knowledge.

A string is called a complete string if every prefix of this string is also present in the array ‘A’. Ninja is challenged to find the longest complete string in the array ‘A’.If there are multiple strings with the same length, return the lexicographically smallest one and if no string exists, return "None".

Note :
String ‘P’ is lexicographically smaller than string ‘Q’, if : 

1. There exists some index ‘i’ such that for all ‘j’ < ‘i’ , ‘P[j] = Q[j]’ and ‘P[i] < Q[i]’. E.g. “ninja” < “noder”.

2. If ‘P’ is a prefix of string ‘Q’, e.g. “code” < “coder”.
Example :
N = 4
A = [ “ab” , “abc” , “a” , “bp” ] 

Explanation : 

Only prefix of the string “a” is “a” which is present in array ‘A’. So, it is one of the possible strings.

Prefixes of the string “ab” are “a” and “ab” both of which are present in array ‘A’. So, it is one of the possible strings.

Prefixes of the string “bp” are “b” and “bp”. “b” is not present in array ‘A’. So, it cannot be a valid string.

Prefixes of the string “abc” are “a”,“ab” and “abc” all of which are present in array ‘A’. So, it is one of the possible strings.

We need to find the maximum length string, so “abc” is the required string.
Detailed explanation ( Input/output format, Notes, Images )
Constraints :
1 <= T <= 10
1 <= N <= 10^5
1 <= A[i].length <= 10^5
A[i] only consists of lowercase english letters.
Sum of A[i].length <= 10^5 over all test cases

Time Limit : 1 sec
Sample Input 1 :
2
6
n ni nin ninj ninja ninga
2
ab bc
Sample Output 1 :
ninja
None
Explanation Of Sample Input 1 :
For test case 1 we have, 

All the prefixes of “ninja” -> “n”, “ni”, “nin”, “ninj” and “ninja” are present in array ‘A’. So, “ninja” is a valid answer whereas for “ninga” , the prefix “ning” is not present in array ‘A’.

So we output “ninja”.

For test case 2 we have, 

The prefixes of “ab” are “a” and “ab”. “a” is not present in array ‘A’. So, “ab” is not a valid answer.

The prefixes of “bc” are “b” and “bc”. “b” is not present in array ‘A’. So, “ab” is not a valid answer.

Since none of the strings is a valid answer we output “None”.
Sample Input 2 :
2
5
g a ak szhkb hy 
4
kez vfj vfjq vfjqo 
Sample Output 2 :
ak
None

*/
/*

Explanation of the Code
Trie and TrieNode Classes: These classes represent the Trie data structure where each node has children and a flag to indicate if it’s the end of a word.

insert Method: This method inserts a word into the Trie by adding each character sequentially.




 hasAllPrefixes Method
The purpose of the hasAllPrefixes method is to check if all prefixes of a given word exist in the Trie and are marked as complete words (end of a word) in the Trie.

Steps for hasAllPrefixes:
Initialize the Root Node: Start from the root of the Trie.
Iterate Over Each Character: For each character in the word, do the following:
Check if Character Exists as Child: Look for the character in the current node's children. If the character doesn’t exist, it means this prefix is missing from the Trie, so we return false.
Check if it’s Marked as End of Word: If the character exists but is not marked as the end of a word in the Trie, it means this prefix exists in the Trie but is not a complete word. Again, we return false.
Move to the Next Node: If both checks pass, move to the child node and continue with the next character.
All Prefixes Found: If the loop completes without returning false, it means every prefix of the word exists as a complete word in the Trie. We return true.
Example of hasAllPrefixes
For the word "ninja":

Prefixes are: "n", "ni", "nin", "ninj", and "ninja".
We check each prefix in the Trie:
"n" exists and is an end of a word.
"ni" exists and is an end of a word.
"nin" exists and is an end of a word.
"ninj" exists and is an end of a word.
"ninja" exists and is an end of a word.
Since all these checks pass, hasAllPrefixes returns true.
If any prefix like "ninga" was missing, the function would return false for "ninga".

longestCompleteString Function
The longestCompleteString function is designed to find the longest complete string in the array. If multiple strings have the same maximum length, it returns the lexicographically smallest one.

Steps for longestCompleteString:
Insert All Strings into the Trie: First, we insert every string in the array A into the Trie. This builds up the Trie, allowing us to later check for prefixes quickly.

Initialize longest as "None": We start with "None" as the default answer, which we’ll return if no valid string is found.

Iterate Through Each Word in the Array:

For each word, check if hasAllPrefixes returns true:
If true: The word is a candidate for being the longest complete string.
Update longest: We update longest if:
The current word is longer than longest, or
The current word is the same length as longest but is lexicographically smaller.
Return the Result: After checking all words, longest will contain the longest complete string, or "None" if no such string exists.

Example of longestCompleteString
For an array like ["n", "ni", "nin", "ninj", "ninja", "ninga"]:

The function will evaluate each word:
"n" passes the prefix check but is short.
"ni" passes and is longer.
"nin" passes and is even longer.
"ninj" passes and is even longer.
"ninja" passes and is the longest found so far.
"ninga" fails the prefix check (as "ning" is not in the Trie).
The longest valid complete string found is "ninja", so it’s returned.


Complexity
This solution is efficient with a time complexity of approximately 
O(N⋅L), where 
N is the number of strings and 
L is the length of the longest string in the array. This meets the problem's constraints.

*/
class TrieNode{
    constructor(){
        this.children ={};
        this.isEndOfWord = false;
    }
}
class Trie{
    constructor(){
        this.root = new TrieNode();
    }
    insert(word){
        let node = this.root;
        for(let char of word){
            if(!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }
    hasAllPrefixes(word){
        let node = this.root;
        for(let char of word){
            if(!node.children[char] || !node.children[char].isEndOfWord){
                return false;
            }
            node = node.children[char];
        }
        return true;
    }
}

function longestCompleteString(A){
    const trie = new Trie();
    //insert all strings in trie
    for(let word of A){
        trie.insert(word);
    }
    let longest = "None";
      // Check each word to see if it's a complete string
    for(let word of A){
        if(trie.hasAllPrefixes(word)){
        // Update longest based on length and lexicographical order
            if(longest === "None"||
                word.length > longest.length ||
                (word.length === longest.length && word < longest)
            )
            {
                longest = word;    
            }
        }
    }
    return longest;
}

  // Input and Output function to handle multiple test cases
  function findLongestCompleteStrings(testCases) {
    const results = [];
    for (let { n, arr } of testCases) {
      results.push(longestCompleteString(arr));
    }
    return results;
  }
  
  // Example usage:
  const testCases = [
    { n: 6, arr: ["n", "ni", "nin", "ninj", "ninja", "ninga"] },
 
  ];
  /*
     { n: 2, arr: ["ab", "bc"] },
    { n: 5, arr: ["g", "a", "ak", "szhkb", "hy"] },
    { n: 4, arr: ["kez", "vfj", "vfjq", "vfjqo"] },
  
  */
  console.log(findLongestCompleteStrings(testCases)); 
  // Output: ["ninja", "None", "ak", "None"]
  