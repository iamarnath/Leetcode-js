/*
Given two strings s and t, return true 
if the two strings are anagrams of each other,
 otherwise return false.

An anagram is a string that contains the exact
 same characters as another string, but the order of the
  characters can be different.

Example 1:

Input: s = "racecar", t = "carrace"

Output: true
Example 2:

Input: s = "jar", t = "jam"

Output: false
Constraints:

s and t consist of lowercase English letters.
*/

class Solution{
  isAnagram(s,t){
    if(s.length !== t.length){
      return false;
    }
    const countS={};
    const countT={};
    for(let i=0;i<s.length;i++){
      countS[s[i]]= (countS[s[i]] ||0) +1;
      countT[t[i]] = (countT[t[i]] || 0)+1;
    }
    for(let key in countS){
      if(countS[key] !== countT[key]){
        return false;
      }
    }
    return true;
  }
}


// Create an instance of Solution
const solution = new Solution();

// Example array to test
let s = "jar", t = "jam"
// Call the method and store the result
const result = solution.isAnagram(s,t);

// Print the result
console.log(result);  