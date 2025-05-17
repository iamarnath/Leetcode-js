/*
Description
You are given a string s and a dictionary of strings wordDict, add spaces in s to construct a sentence where each word is a valid dictionary word. Return all such possible sentences in any order.

Note that the same word in the dictionary may be reused multiple times in the segmentation.

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

function wordBreak(s, wordDict) {
    const dict = new Set(wordDict);
    const memo ={}//memoization
    function solve(str){
        if(str.length === 0) return [""] // base case - string is empty
        if(memo.hasOwnProperty(str)) return memo[str];  // Memoized result
        const result =[];
        for(let l=1;l<=str.length;l++){
            const currWord = str.substr(0,l);// substr(start, length)
            if(dict.has(currWord)){
                const remainWord =  str.substr(l);
                const remainResult = solve(remainWord);
                for(const w of remainResult){
                    // Add space only if w is not empty
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