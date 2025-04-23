/*
Given a string, we have to find out all its subsequences of it.
A String is said to be a subsequence of another String, if it can be obtained by 
deleting 0 or more character without changing its order.

Examples: 

Input : ab
Output : “”, “a”, “b”, “ab”

Input : abc
Output : “”, “a”, “b”, “c”, “ab”, “ac”, “bc”, “abc”
*/

/*
Using binary representation is an efficient way to generate all possible
subsequences. Each bit in a binary number represents whether to include
a specific character from the string or not. For a string of length 
n, there are 2^𝑛 possible subsequences, and each subsequence can be 
represented by a binary number from 
0 to 2^n-1
Approach
Binary Representation: For each number from 
1 to 2^n-1

Convert the number to a binary string.
The binary representation indicates which characters are included in the
subsequence.
For each 1 bit in the binary representation, include the corresponding
character in the subsequence.
Store and Sort: Collect all non-empty subsequences and sort them 
lexicographically.

Explanation of Code
Binary Representation Loop:

We iterate from 1 to 2^n-1 (using (1 << n) - 1).
For each number i, we interpret its binary form to decide which 
characters of s to include in the current subsequence.
For example, if 
s="abc" and 
i=5 (binary 101), we include characters at positions 0 and 2 
(resulting in the subsequence "ac").
Lexicographical Sorting:

After generating all subsequences, we sort them lexicographically.
Complexity Analysis
Time Complexity: O(2^n * log(2^n)), where 
n is the length of the string. We generate 
2^n subsequences and then sort them lexicographically.
Space Complexity: 
O(2^n), as we store all possible subsequences in result.

*/

function findSubsequences(s) {
    const n = s.length;
    const result = [];
    // Iterate over all numbers from 1 to 2^n - 1
    for (let i = 1; i < (1 << n); i++) {
        let str = "";
        // Build subsequence based on the binary representation of i
        for (j = 0; j < n; j++) {
            // Check if the j-th bit in i is set (1)
            if (i & (1 << j)) {
                str += s[j];
            }
        }
        result.push(str);
    }
    // Sort the subsequences lexicographically
    return result.sort();
}

// const s1 = "aac";
// console.log(findSubsequences(s1));



//Pick and Don’t Pick Recursive Approach

function solve(index,str,subseq,result) {
      if(index=== str.length){
        //console.log(subseq + " ");
        result.push(subseq)
        return;
      }
      // Picking the current character
      solve(index+1,str,subseq+str.charAt(index),result)
      // Not picking the current character (backtracking)
      solve(index+1,str,subseq,result);

}
function main(str){
  const subseq = "";
  const result = [];
  solve(0, str, subseq,result);
  return result;
}
const subsequences = main("abc");
console.log("All possible subsequences are:", subsequences);

//class way
class Solution {
  solve(index, str, subseq, result) {
      if (index === str.length) {
          result.push(subseq);
          return;
      }
      
      // Picking the current character
      this.solve(index + 1, str, subseq + str.charAt(index), result);
      
      // Not picking the current character (backtracking)
      this.solve(index + 1, str, subseq, result);
  }

  getSubsequence(str) {
      const subseq = "";
      const result = [];
      this.solve(0, str, subseq, result); // Use 'this' to call solve
      result.sort(); // Sort the results lexicographically
      return result; // Return the final array of subsequences
  }

  AllPossibleStrings(s) {
      return this.getSubsequence(s); // Use 'this' to call getSubsequence
  }
}