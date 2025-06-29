/*
242. Valid Anagram
Example 1:

Input: s = "anagram", t = "nagaram"

Output: true

Example 2:

Input: s = "rat", t = "car"

Output: false
Constraints:

1 <= s.length, t.length <= 5 * 104
s and t consist of lowercase English letters.
 

Follow up: What if the inputs contain Unicode characters? 
How would you adapt your solution to such a case?

*/

var isAnagram = function(s, t) {
    if(s.length !== t.length) return false;
    const count = new Array(26).fill(0);
    for(let i=0;i < s.length; i++){
        count[s[i].charCodeAt(0) - 'a'.charCodeAt(0)]++;
        count[t[i].charCodeAt(0) - 'a'.charCodeAt(0)]--;
    }
    // Check if all elements in the array are 0
    return count.every(element =>element === 0);
};
//console.log(isAnagram("anagram", "nagaram"));
console.log(isAnagram("rat", "car")); 

// For unicode characters
var isAnagram = function(s, t) {
   if(s.length !== t.length) return false;
   const charCount = {};
    // Count each character in s
    for(const ch of s){
        chatCount[ch] = (charCount[ch] || 0) +1;
    }
    // Subtract count for each character in t
    //
    for(const ch of t){
        // This line checks if the current character ch
        // from string t exists in the charCount object
        // with a count greater than zero.
        if(!charCount[ch]) return false;
        charCount[ch]--;
    }
    // No need to check further since lengths are equal and counts balance
    return true
};