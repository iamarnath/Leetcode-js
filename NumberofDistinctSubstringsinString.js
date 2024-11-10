/*
Given a string 'S', you are supposed to return the number of distinct substrings(including empty substring) of the given string. You should implement the program using a trie.

Note :
A string ‘B’ is a substring of a string ‘A’ if ‘B’ that can be obtained by deletion of, several characters(possibly none) from the start of ‘A’ and several characters(possibly none) from the end of ‘A’. 

Two strings ‘X’ and ‘Y’ are considered different if there is at least one index ‘i’  such that the character of ‘X’ at index ‘i’ is different from the character of ‘Y’ at index ‘i’(X[i]!=Y[i]).
Detailed explanation ( Input/output format, Notes, Images )
Constraints :
1 <= T <= 5
1 <= |S| <= 10^3

‘S’ contains only lowercase English letters.

Time Limit: 1 sec
Sample Input 1 :
2
sds
abc
Sample Output 1 :
6
7
Explanation of Sample Input 1 :
In the first test case, the 6 distinct substrings are { ‘s’,’ d’, ”sd”, ”ds”, ”sds”, “” }

In the second test case, the 7 distinct substrings are {‘a’, ‘b’, ‘c’, “ab”, “bc”, “abc”, “” }.
Sample Input 2 :
2
aa
abab
Sample Output 2 :
3
8
Explanation of Sample Input 2 :
In the first test case, the two distinct substrings are {‘a’, “aa”, “” }.

In the second test case, the seven distinct substrings are {‘a’, ‘b’, “ab”, “ba”, “aba”, “bab”, “abab”, “” }
*/

/*
To solve this problem, we can use a Trie data structure. The idea is to insert all possible substrings of the given string S into the Trie, and then count the distinct nodes created during this process. Each node in the Trie represents a unique prefix of some substring, so the number of nodes corresponds to the number of distinct substrings.

Approach
Insert Substrings into the Trie:

For each starting position i in the string S, create all possible substrings that start at i and end at any position j ≥ i.
Insert each of these substrings into the Trie. Since nodes in the Trie are unique, this automatically avoids counting duplicate substrings.
Count Nodes in Trie:

Every distinct path from the root to any node in the Trie represents a unique substring.
Traverse the Trie and count all nodes. Each node visited represents a unique substring of S.
Include the Empty Substring:

Since the problem includes counting the empty substring, we add 1 to the total count of nodes.


Let's analyze the time and space complexity of the countDistinctSubstrings function more thoroughly.

Function Breakdown
The function countDistinctSubstrings does the following:

Iterates over each starting index i in the string S.
For each i, it generates all possible substrings starting from i to the end of the string, inserting each of these substrings into a Trie.
The key operations affecting complexity are:

Generating all substrings of S by varying the start and end indices.
Inserting each substring into the Trie.
Time Complexity Analysis
Let's denote:

n as the length of the string S.
Step 1: Generating All Substrings
For each starting index 

i, we generate substrings ending at every position from 

i to n−1.

For example, if 

S="sds", the substrings are: "s", "sd", "sds", "d", "ds", "s".
The total number of substrings generated is:

n+(n−1)+(n−2)+⋯+1= n(n+1)/2=O(n^2)
So, generating all substrings has a time complexity of 
O(n^2)

Step 2: Inserting Substrings into the Trie
Each substring is inserted character by character into the Trie:

Inserting each substring of length 
k takes O(k) time.
Across all substrings, the total number of characters inserted into the Trie is approximately O(n^2).
Since each node insertion in the Trie has 
O(1) complexity, inserting all characters for all substrings also results in 
O(n^2) time complexity.

Total Time Complexity: Combining both steps, the overall time complexity for generating substrings and inserting them into the Trie is:

O(n^2)+O(n^2)=O(n^2)

Space Complexity Analysis
The space complexity is determined by:

Trie Structure: The Trie stores nodes for each unique prefix of each substring.
Nodes in Trie: In the worst case, for a string of length 

n with all unique characters (like "abcdef..."), each possible substring will create a unique path in the Trie.
Trie Size
Each substring can generate a unique path in the Trie, leading to at most 
O(n^2) nodes in total for a string of length n.
This is because we can have up to 
n(n+1)/2  substrings, and in the worst case (all characters unique), each will create a new node.
Thus, the space complexity for storing all nodes in the Trie is:
O(n^2)

Summary
Time Complexity: 
O(n^2), due to generating and inserting all substrings.
Space Complexity: 
O(n^2), due to storing all unique prefixes in the Trie.
This complexity is efficient and meets the problem constraints of 
n≤1000.

*/
class TrieNode{
    constructor(){
        this.children={};
    }
}
class Trie{
    /*
    This class represents a single node in the Trie.
Each node has a children property, which is an object that maps characters to their corresponding child nodes.
    */
    constructor(){
        this.root = new TrieNode();
        this.nodeCount=0; // Counter for distinct nodes (unique substrings)
    }
    /*
    The insert method takes a substring and inserts it into the Trie.
For each character in the substring, it checks if the character already exists in the current node's children.
If not, it creates a new TrieNode, increments the nodeCount, and moves to that child node.
    */
    insert(substring){
        let node = this.root;
        for(let char of substring){
             // If the character does not exist, add it as a new child node
            if(!node.children[char]){
                node.children[char] = new TrieNode();
                this.nodeCount++;
            }
            node = node.children[char];
        }
    }
    countDistinctSubstrings(){
        return this.nodeCount+1;
    }
}
/*
This function generates all possible substrings of a given string S.
It uses two nested loops: the outer loop iterates over the starting index, and the inner loop builds substrings from that starting index.
Each generated substring is inserted into the Trie.
*/
function countDistinctSubstrings(S) {
    const trie = new Trie();
    // Insert all possible substrings of S into the Trie
    for (let i = 0; i < S.length; i++) {
        let substring="";
        for(let j=i;j<S.length;j++){
            substring += S[j];
            trie.insert(substring);
        }
    }
      // Count all unique substrings (nodes in the Trie + empty substring)

    return trie.countDistinctSubstrings();
}
function distinctSubstringsForMultipleTests(testCases) {
    const results=[];
    for (let S of testCases){
        results.push(countDistinctSubstrings(S));
    }
    return results;
}

//const testCases = ["sds", "abc", "aa", "abab"];
const testCases = ["striver"];
console.log(distinctSubstringsForMultipleTests(testCases)); 

