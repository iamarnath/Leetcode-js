/*
269. Alien Dictionary
Description
There is a foreign language which uses the latin alphabet, but the order among letters is not "a", "b", "c" ... "z" as in English.

You receive a list of non-empty strings words from the dictionary, where the words are sorted lexicographically based on the rules of this new language.

Derive the order of letters in this language. If the order is invalid, return an empty string. If there are multiple valid order of letters, return any of them.

A string a is lexicographically smaller than a string b if either of the following is true:

The first letter where they differ is smaller in a than in b.
There is no index i such that a[i] != b[i] and a.length < b.length.
Example 1:

Input: ["z","o"]

Output: "zo"
Explanation:
From "z" and "o", we know 'z' < 'o', so return "zo".

Example 2:

Input: ["hrn","hrf","er","enn","rfnn"]

Output: "hernf"
Explanation:

from "hrn" and "hrf", we know 'n' < 'f'
from "hrf" and "er", we know 'h' < 'e'
from "er" and "enn", we know get 'r' < 'n'
from "enn" and "rfnn" we know 'e'<'r'
so one possibile solution is "hernf"
Constraints:

The input words will contain characters only from lowercase 'a' to 'z'.
1 <= words.length <= 100
1 <= words[i].length <= 100

*/
/*
Summary of the Algorithm
Initialize an adjacency list for all unique characters.

Build edges between characters based on the first difference
in each pair of adjacent words.

Detect cycles and perform topological sort using DFS.

Return the characters in the correct order, or "" if the order is impossible.
*/
function foreignDictionary(words) {
    /*
    Purpose:
    To create a graph where each node is a character, 
    and edges represent the "comes before" relationship.

    What it does:
    Loops through all words and all characters, ensuring
     every unique character appears as a key in the adj object,
      each mapped to an empty set (to store its neighbors).

    */
    const adj={};
    for(const word of words){
        for(const char of word){
            adj[char] = new Set();
        }
    }
    /*
    Purpose:
    To determine direct ordering between characters based on adjacent words.
    How it works:

    For each pair of consecutive words (w1, w2), compare character by character.

    Invalid Case:
    If w1 is longer than w2 but w1 starts with w2, the order is
     impossible (e.g. ["abc", "ab"]), so return "".

    Edge Creation:
    Find the first differing character between w1 and w2; add an
     edge from w1[j] to w2[j] (i.e., w1[j] comes before w2[j]).
    */
    for(let i=0;i<words.length-1;i++){
        const w1 = words[i];
        const w2 = words[i+1];
        const minLen= Math.min(w1.length,w2.length);
        if(w1.length > w2.length &&
            w1.slice(0,minLen) === w2.slice(0,minLen)
        ){
            return "";
        }
        for(let j=0;j<minLen;j++){
            if(w1[j] !== w2[j]){
                adj[w1[j]].add(w2[j]);
                break;
            }
        }
    }
    const visited = {};
    const res=[];
    /*
    Purpose:
    To determine a valid order of characters (topological sort) and
    detect cycles (which would make the order impossible).

    How it works:

    Uses a DFS (Depth-First Search) approach.

    visited[char] is true when the node is being visited 
    (on the current DFS path), and false when fully processed.

    If a node is encountered that is already being visited (true),
    a cycle exists, so return true.

    After visiting all neighbors, mark as processed (false) 
    and add to result list.
    */
    const dfs = (char) =>{
        if(char in visited) return visited[char];
        visited[char] = true;
        for(const nei of adj[char]){
            if(dfs(nei)) return true;
        }
        visited[char]= false;
        res.push(char);
        return false;
    };
    //Run DFS for Each Character
    for(const char in adj){
        if(dfs(char)) return "";
    }
    console.log("res==",res)
    //The topological sort result is built
    //  in reverse order (because we add a character after 
    // processing all its dependencies), so we reverse it before returning 
    // as a string.
    res.reverse();
    return res.join("");
}

let words = ["hrn","hrf","er","enn","rfnn"];

//let words = ["z","o"];

let result = foreignDictionary(words);

console.log("result==",result);
