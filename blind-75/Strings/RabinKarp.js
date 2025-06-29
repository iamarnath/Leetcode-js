/*

Given two strings text and pattern string, your task is to
 find all starting positions where the pattern appears
  as a substring within the text. The strings will 
  only contain lowercase English alphabets.

While reporting the results, use 1-based indexing
 (i.e., the first character of the text is at position 1). 
 You are required to identify every occurrence of the pattern, including overlapping ones, if any.

Examples: 

Input: text = "birthdayboy", pattern = "birth"
Output:  [1]
Explanation: The string "birth" occurs at index 1 in text.

Input: text = "geeksforgeeks", pattern = "geek"
Output: [1, 9]
Explanation: The string "geek" occurs twice in text,
 one starts are index 1 and the other at index 9

*/

class KarpRabin {
  constructor() {
    this.PRIME = 101;
  }

  calculateHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash += str.charCodeAt(i) * Math.pow(this.PRIME, i);
    }
    return hash;
  }

  updateHash(prevHash, oldChar, newChar, patternLength) {
    let newHash = (prevHash - oldChar.charCodeAt(0)) / this.PRIME;
    newHash += newChar.charCodeAt(0) * Math.pow(this.PRIME, patternLength - 1);
    return newHash;
  }

  search(text, pattern) {
    const patternLength = pattern.length;
    if (patternLength > text.length) return -1;
    let patternHash = this.calculateHash(pattern);
    let textHash = this.calculateHash(text.substring(0, patternLength));

    for (let i = 0; i <= text.length - patternLength; i++) {
      if (textHash === patternHash) {
        if (text.substring(i, i + patternLength) === pattern) {
          return i; // Return the index of the first match
        }
      }
      if (i < text.length - patternLength) {
        textHash = this.updateHash(
          textHash,
          text.charAt(i),
          text.charAt(i + patternLength),
          patternLength
        );
      }
    }
    return -1; // Not found
  }
}

function repeatedStringMatch(a, b) {
  const kr = new KarpRabin();
  let repeated = '';
  let count = 0;
  // Repeat a until repeated.length >= b.length
  while (repeated.length < b.length) {
    repeated += a;
    count++;
  }
  // Check if b is substring of repeated
  if (kr.search(repeated, b) !== -1) return count;
  // Add one more repeat and check again
  repeated += a;
  count++;
  if (kr.search(repeated, b) !== -1) return count;
  // Not found
  return -1;
}

// Example usage:

// Example usage:
// const kr = new KarpRabin();
// kr.search("abracadabra", "abra");
console.log(repeatedStringMatch("abcd", "cdabcdab")); 
// console.log(repeatedStringMatch("abcd", "cdabcdab")); // Output: 3
// console.log(repeatedStringMatch("a", "aa")); // Output: 2
// console.log(repeatedStringMatch("abc", "def")); // Output: -1