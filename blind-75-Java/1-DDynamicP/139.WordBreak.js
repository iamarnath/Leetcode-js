/*
139. Word Break
Given a string s and a dictionary of strings wordDict, 
return true if s can be segmented into a space-separated 
sequence of dictionary words.

You are allowed to reuse words in the dictionary an 
unlimited number of times. You may assume all dictionary words are unique.

Example 1:

Input: s = "neetcode", wordDict = ["neet","code"]

Output: true
Explanation: Return true because "neetcode" can be split
 into "neet" and "code".

Example 2:

Input: s = "applepenapple", wordDict = ["apple","pen","ape"]

Output: true
Explanation: Return true because "applepenapple" can be 
split into "apple", "pen" and "apple". Notice that we can 
reuse words and also not use all the words.

Example 3:

Input: s = "catsincars", wordDict = ["cats","cat","sin","in","car"]

Output: false
Constraints:

1 <= s.length <= 200
1 <= wordDict.length <= 100
1 <= wordDict[i].length <= 20
s and wordDict[i] consist of only lowercase English letters.

*/

/*

Explanation:
Initialization:

st: A Set to store the dictionary words for fast lookups.

t: An array used for memoization, initialized with undefined.

n: The length of the input string s.

solve(idx) Function:

This is a recursive function to check if the substring
 of s starting at index idx can be segmented into words from the dictionary.

Base Cases:

If idx reaches the end of the string (idx === n),
 it means the entire string has been successfully segmented, so return true.

If the substring from idx to the end (s.substring(idx, n))
 is itself a word in the dictionary, return true.

Memoization:

If the result for index idx is already computed and
 stored in t[idx], return it directly.

Recursive Step:

Iterate through all possible lengths l of the next
 word starting at index idx.

Extract the substring temp of length l.

If temp is a word in the dictionary and the remaining
 part of the string (starting from idx + l) can also be
  segmented (recursively calling solve(idx + l)), then 
  the substring starting at idx can be segmented. Store 
  true in t[idx] and return true.

If none of the above conditions are met, it means the
 substring starting at idx cannot be segmented. Store 
 false in t[idx] and return false.

wordBreak(s, wordDict) Function:

This is the main function that takes the input 
string s and the dictionary wordDict as arguments.

It initializes the st, t, and n variables.

It calls the solve(0) function to start the 
segmentation process from index 0 of the string.

The function returns the result of solve(0), 
which indicates whether the entire string can be 
segmented into words from the dictionary.
*/
/*
At idx = 0:

n - idx = 8 - 0 = 8

So the loop does: l = 1, 2, 3, 4, 5, 6, 7, 8

Each Step Explained
l = 1: s.substr(0, 1) ⇒ "n" (not in wordDict)

l = 2: s.substr(0, 2) ⇒ "ne" (not in wordDict)

l = 3: s.substr(0, 3) ⇒ "nee" (not in wordDict)

l = 4: s.substr(0, 4) ⇒ "neet" (found in wordDict!)

The function will now recursively call solve(0 + 4 = 4)

At idx = 4:

Now the substring left is "code"

n - idx = 8 - 4 = 4

The loop: l = 1 to 4

l = 1: s.substr(4, 1) ⇒ "c" (not in wordDict)

l = 2: s.substr(4, 2) ⇒ "co" (not in wordDict)

l = 3: s.substr(4, 3) ⇒ "cod" (not in wordDict)

l = 4: s.substr(4, 4) ⇒ "code" (found in wordDict!)

The function now recursively calls solve(8). Since idx == n, returns true.

Why l = 1 up to n - idx?
You must try every prefix substring at each position, from single character up to the longest possible word left in the string.

This loop ensures all possible splits—like "n eetcode", "ne etcode", "nee tcode", and "neet code"—are checked as possible breaks.
*/
function wordBreak(s, wordDict) {
    const st = new Set(wordDict);
    const t = new Array(s.length).fill(-1);
    const n = s.length;
    function solve(idx) {
        //Defines a helper recursive function solve 
        // that checks if the substring s[idx:] can be segmented.
        //Base case: If idx reaches the end of the string, 
        // it means we have successfully segmented s, so return true.
        if (idx == n) {
            return true;
        }

        //Another base case: If the substring from idx to the end
        //  is a dictionary word, return true immediately.

        if (st.has(s.substring(idx, n - idx))) {
            return true;
        }
        if (t[idx] !== -1) {
            return t[idx];
        }
        // l is the length of the substring
        //The loop for (let l = 1; l <= n - idx; l++)
        //  iterates over every possible non-empty prefix 
        // substring starting at idx and going up to the
        //  end of the string, checking all possible word 
        // breaks from the current position onward.
        //n - idx is the length of the remaining substring from idx to the end of s.
        for (let l = 1; l <= n - idx; l++) {
            //Extract a substring temp starting from idx, of length l.
            const temp = s.substring(idx, l);
            //Check: If temp is in the dictionary and 
            // the recursive call for the next part (idx + l) returns true,
            if (st.has(temp) && solve(idx + l)) {
                //Memoize t[idx] as true
                t[idx] = true;
                //Return true (successful segmentation found from here)
                return true;
            }
        }
        t[idx] = false;
        return false;
    }
    return solve(0);
}
/*
What does n - idx mean?
n is the total length of the string s.

idx is your current position in the string (the starting index 
for the current recursive call).

n - idx is the number of characters remaining in the
 string from idx to the end.

This means that the maximum possible length of 
a substring starting at idx is n - idx.

*/
let s = "neetcode", wordDict = ["neet","code"];
//let s = "catsincars", wordDict = ["cats","cat","sin","in","car"];
let res = wordBreak(s, wordDict);

console.log("Recursive ==",res);
/*

Time Complexity
Worst-case time complexity:
O(n² * k)

n is the length of the string s.

k is the maximum length of a word in the dictionary.

Explanation:

For each starting index idx, the function tries all possible 
substring lengths l from 1 up to n - idx.

For each substring, checking if it exists in the set 
is O(1), but creating the substring is O(k) in the worst 
case (where k is the length of the substring).

There are O(n) starting indices, and for each, up to
 O(n) substrings are checked.

With memoization, each subproblem is solved only once,
 so the total is O(n² * k).

Space Complexity
O(n + m)

n for the memoization array (one entry per starting index).

m for the total number of characters in the
 dictionary (wordDict stored in a set).

Explanation:

The memoization array t is of size n.

The set for the dictionary words takes O(m)
 space, where m is the sum of the lengths of all words in wordDict

Time and space complexity = same as above
*/

function wordBreak(s, wordDict) {
    //Converts the word dictionary into a 
    // Set for O(1) lookup time when checking if a substring is a valid word.
    const st = new Set(wordDict);
    const n = s.length;
    //t[i] will be true if the substring s[0...i-1] can be segmented into words in the dictionary.

//t = true because an empty string is always "breakable".
    const t = new Array(n+1).fill(false);

    t[0] = true;// Empty string is always breakable
    //Outer loop (i): Represents the end index (exclusive) of the 
    // current substring.
    for(let i=1;i<=n;i++){
        //Inner loop (j): Tries every possible split point before i.
        for(let j=0;j<i;j++){
            //Substring extraction: s.substr(j, i - j) gets the substring
            //  from index j of length i - j (i.e., s[j...i-1]).
            const temp=s.substring(j,i-j);// substr(start, length)
            //st.has(temp): Is the substring in the dictionary?
            //t[j]: Can the prefix s[0...j-1] be segmented?
            if(st.has(temp) && t[j]){
                t[i]= true;
                break;
            }
        }
    }
    return t[n];
}