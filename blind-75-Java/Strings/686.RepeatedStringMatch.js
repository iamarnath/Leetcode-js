/*
686. Repeated String Match
Given two strings a and b, return the minimum number
 of times you should repeat string a so that string b
  is a substring of it. If it is impossible for b​​​​​​ 
  to be a substring of a after repeating it, return -1.

Notice: string "abc" repeated 0 times is "",
 repeated 1 time is "abc" and repeated 2 times is "abcabc".

Example 1:

Input: a = "abcd", b = "cdabcdab"
Output: 3
Explanation: We return 3 because by repeating a three 
times "abcdabcdabcd", b is a substring of it.
Example 2:

Input: a = "a", b = "aa"
Output: 2

Constraints:

1 <= a.length, b.length <= 104
a and b consist of lowercase English letters.

*/
/*
Understanding Rolling Hash
Suppose you have a substring of length m in your text,
 and you know its hash. You want to efficiently compute 
 the hash of the next substring (shifted by one character)
  without recalculating from scratch.

Hash Formula
For a substring S of length m:

text
S = s0 s1 s2 ... s(m-1)
The hash is typically calculated as:

text
hash(S) = s0 * PRIME^0 + s1 * PRIME^1 + s2 * PRIME^2 + ... + s(m-1) * PRIME^(m-1)
Rolling to the Next Substring
Suppose you move the window one character to the right:

Remove the leftmost character (oldChar)

Add a new rightmost character (newChar)

Let:

prevHash be the hash of the previous substring (starting at index i)

newHash be the hash of the new substring (starting at index i+1)

Derivation
Subtract the old character:

text
prevHash - oldChar.charCodeAt(0)
This removes the contribution of the leftmost 
character, but only its value at PRIME^0.

Divide by PRIME:

text
(prevHash - oldChar.charCodeAt(0)) / PRIME
This shifts all the remaining characters' powers 
down by 1 (e.g., PRIME^1 becomes PRIME^0, PRIME^2 
becomes PRIME^1, etc.), aligning them with their new
 positions in the substring.

Add the new character:

text
newChar.charCodeAt(0) * Math.pow(PRIME, patternLength - 1)
This adds the new character at the highest power (rightmost position).

Sum it up:

text
newHash = (prevHash - oldChar.charCodeAt(0)) / PRIME
newHash += newChar.charCodeAt(0) * Math.pow(PRIME, patternLength - 1)
Why Divide by PRIME?
Dividing by PRIME shifts the polynomial powers down by one.

When you remove the leftmost character, all other
 characters move one position to the left.

Their associated powers of PRIME decrease by 1.

Division achieves this shift mathematically.

Analogy
Think of the hash as a number in base PRIME. When you remove
 the least significant digit (leftmost character), you
  divide by the base (PRIME) to shift all digits to the right.

Summary Table
Operation	Effect
Subtract oldChar	Removes leftmost character
Divide by PRIME	Shifts all powers down by 1
Add newChar * PRIME^(m-1)	Adds new rightmost character
In short:
Dividing by PRIME is needed to correctly update the
 hash when the substring window slides, ensuring 
 the hash values correspond to the new character positions.

*/
/*
Time Complexity
Best and Average Case:

O(n + m), where 
n is the length of the text and 
m is the length of the pattern.

This is because:

Computing the hash for the pattern: O(m)

Rolling hash for all substrings in the text: O(n)

Verifying actual matches is rare with a
 good hash function, so the extra cost is negligible.

Worst Case:

O(nm)

This happens when there are many hash collisions 
(spurious hits), causing the algorithm to check 
each character in the pattern for every window in
 the text, leading to O(m) comparisons for each of the O(n) windows.

Space Complexity
O(1) Auxiliary Space

The algorithm uses a constant amount of extra space 
for storing hash values and a few variables, regardless of the input size.

If searching for multiple patterns, space can
 increase, but for single-pattern search, space is constant.

Summary Table
Case	Time Complexity	Space Complexity
Best/Average	O(n + m)	O(1)
Worst	O(nm)	O(1)

*/
class KarpRabin {
    constructor() {
        //The constructor sets a prime number 
        // (101) used in the hash function.
        this.PRIME = 101;
    }
    /*
    calculateHash(str): Calculates a hash value for the string str.
    Initializes hash to 0.
    For each character in str, adds its ASCII value
    (charCodeAt(i)) times PRIME raised to the power of its position (i).
    Returns the final hash value.
    */
    calculateHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash += str.charCodeAt(i) * Math.pow(this.PRIME, i);
        }
        return hash;
    }
    /*
    updateHash(prevHash, oldChar, newChar, patternLength): 
    Efficiently computes the hash for the next substring window.
    Subtracts the ASCII value of the outgoing character
    (oldChar) from the previous hash.
    Divides by PRIME to "slide" the window.
    Adds the ASCII value of the new incoming character 
    (newChar), multiplied by PRIME raised to the window length minus one.
    Returns the updated hash.
    */
    updateHash(prevHash, oldChar, newChar, patternLength) {
        let newHash = (prevHash - oldChar.charCodeAt(0)) / this.PRIME;
        newHash += newChar.charCodeAt(0) * Math.pow(this.PRIME, patternLength - 1);
        return newHash;
    }
    /*
    search(text, pattern): Looks for pattern in text using the Rabin-Karp algorithm.
    If the pattern is longer than the text, returns -1 (not found).
    Calculates the hash for the pattern and for the first window of the text.
    */
    search(text, pattern) {
        const patternLength = pattern.length;
        if (patternLength > text.length) return -1;
        let patternHash = this.calculateHash(pattern);
        let textHash = this.calculateHash(text.substring(0, patternLength));
        let textLength = text.length;
        //Loops through each possible substring window in text.
        for (let i = 0; i <= textLength - patternLength; i++) {
            //If the hash matches the pattern's hash, checks the 
            // actual substring for a true match (to avoid hash collisions).
            if (textHash === patternHash) {
                // if (text.substring(i, i + patternLength) === pattern) {
                //     return i;//If a match is found, returns the starting index.
                // }
                    // Manual character-by-character comparison
                let match = true;
                for (let j = 0; j < patternLength; j++) {
                    if (text[i + j] !== pattern[j]) {
                        match = false;
                        break;
                    }
                }
                if (match) {
                    return i; // If a match is found, returns the starting index.
                }
            }
            //If not, updates the hash for the next window.
            if (i < textLength - patternLength) {
                textHash = this.updateHash(
                    textHash,
                    text.charAt(i),
                    text.charAt(i + patternLength),
                    patternLength
                )
            }
        }
        //If no match is found after the loop, returns -1.
        return -1;
    }
}
// Finds the minimum number of times a must be repeated so that b is a substring.
var repeatedStringMatch = function (a, b) {
    //Creates an instance of KarpRabin.
    const kr = new KarpRabin();
    //Initializes repeated as an empty string and count as 0.
    let repeated = "";
    let count = 0;
    // Repeat a until repeated.length >= b.length
    while (repeated.length < b.length) {
        //Repeats string a by appending it to repeated 
        // until repeated is at least as long as b.
        repeated += a;
        //Increments count each time.
        count++;
    }
    // Check if b is substring of repeated
    //Uses the KarpRabin search method to check 
    // if b is now a substring of repeated.
    if (kr.search(repeated, b) != -1) return count;
    // Appends one more a to handle the case where b 
    // might span the end of one repeat and the start of the next.
    repeated += a;
    //Increments count.
    count++;
    //Checks again if b is a substring; if so, returns the count.
    if (kr.search(repeated, b) !== -1) return count;
    //If b is still not found, returns -1 as it's impossible.
    return -1;
}

let a = "abcd", b = "cdabcdab";

let res = repeatedStringMatch(a, b);
console.log("result==", res);