/*
Description

You are given a string s and a dictionary of strings wordDict, 
add spaces in s to construct a sentence where each word is a 
valid dictionary word. Return all such possible sentences in any order.

Note that the same word in the dictionary may be reused multiple 
times in the segmentation.

Example 1:

Input: s = "neetcode", wordDict = ["neet","code"]

Output: ["neet code"]
Example 2:

Input: s = "racecariscar", wordDict = ["racecar","race","car","is"]

Output: ["racecar is car","race car is car"]
Example 3:

Input: s = "catsincars", wordDict = ["cats","cat","sin","in","car"]

Output: []
Constraints:

1 <= s.length <= 20
1 <= wordDict.length <= 1000
1 <= wordDict[i].length <= 10
s and wordDict[i] consist of only lowercase English letters.
All the strings of wordDict are unique.
Input is generated in a way that the length of the answer doesn't exceed 100,000.
*/

/*
Time and Space Complexity
Let 
n=s.length, 
k = average number of words at each prefix that match.

Time Complexity
The function explores every possible way to split the string. 
There can be up to 2^n
different ways in the worst case (if every prefix is a word),
   but memoization prevents recomputation.

For each substring, it checks all possible prefixes—up to n calls for each substring.

There are O(n) possible substrings (since we memoize by the remaining substring), giving O(n^2) unique subproblems.

At each subproblem, we can spend up to O(n) time (iterating over prefixes and combining solutions).

Thus, overall time complexity is O(n^3 + L), where:

O(n) (substring length) × O(n) (prefix check per subproblem) × O(n) (building/concatenating results)

L is the total length of all output sentences (since we construct complete solutions).

Space Complexity
Memoization: Stores results for each substring (at most n), each with possibly multiple sentences/splits.

The space is dominated by the number and size of sentences in the result.

Overall space complexity is O(n × W × n) where W is the average 
number of sentences for each substring, and n for the sentence length.

Summary
Time complexity: O(n^3 + L)

Space complexity: O(n × W × n)

This code efficiently constructs all valid sentences by 
breaking the string using words from the dictionary, utilizing
 memoization to avoid redundant calculations.

*/
function wordBreak(s, wordDict) {
    const dict = new Set(wordDict);
    const memo ={}//memoization
    function solve(str){
        //Base case: If the string is empty, 
        // return an array with an empty string, signifying a valid split.
        if(str.length === 0) return [""] // base case - string is empty
        //If this substring has already been solved,
        //  immediately return the cached result.
        if(memo.hasOwnProperty(str)) return memo[str];  // Memoized result
        const result =[];
        //Try every prefix of str of length l (from 1 to str.length).
        for(let l=1;l<=str.length;l++){
            //Extract current prefix from 0 to l (first l characters).
            const currWord = str.substr(0,l);// substr(start, length)
            if(dict.has(currWord)){
                //If this prefix is a valid word in the dictionary:
                //Extract the remainder of the string after the current prefix.
                const remainWord =  str.substr(l);
                //Recursively solve for the remainder of the string.
                const remainResult = solve(remainWord);
                //For every way we found to break the remainder:
                for(const w of remainResult){
                    // Add space only if w is not empty
                    //Concatenate currWord and the remainder (add a space 
                    // if w is not empty) and add the result to the list.
                    result.push(currWord + (w.length?" "+w:w));
                }
            }
        }
        memo[str]= result;
        return result;
    }
    return solve(s);
}

let s = "racecariscar", wordDict = ["racecar","race","car","is"];
let finalRes = wordBreak(s, wordDict);
console.log("final--",finalRes)