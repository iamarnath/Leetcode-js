/*
443. String Compression
Given an array of characters chars, compress it using
 the following algorithm:

Begin with an empty string s. For each group of 
consecutive repeating characters in chars:

If the group's length is 1, append the character to s.
Otherwise, append the character followed by the group's length.
The compressed string s should not be
 returned separately, but instead, be stored 
 in the input character array chars. Note that
  group lengths that are 10 or longer will be
   split into multiple characters in chars.

After you are done modifying the input array, 
return the new length of the array.

You must write an algorithm that uses only constant extra space.

Example 1:

Input: chars = ["a","a","b","b","c","c","c"]
Output: Return 6, and the first 6 characters of the
 input array should be: ["a","2","b","2","c","3"]
Explanation: The groups are "aa", "bb", and "ccc". 
This compresses to "a2b2c3".
Example 2:

Input: chars = ["a"]
Output: Return 1, and the first character of 
the input array should be: ["a"]
Explanation: The only group is "a", which 
remains uncompressed since it's a single character.
Example 3:

Input: chars = ["a","b","b","b","b","b","b","b","b","b","b","b","b"]
Output: Return 4, and the first 4 characters
 of the input array should be: ["a","b","1","2"].
Explanation: The groups are "a" and "bbbbbbbbbbbb".
 This compresses to "ab12".
 
Constraints:

1 <= chars.length <= 2000
chars[i] is a lowercase English letter, uppercase English letter, digit, or symbol.

*/
/*
Purpose
This code compresses a character array in-place 
according to the following rule:

For each group of consecutive repeating characters,
 write the character followed by the count (if the count is more than 1).

Example:
["a","a","b","b","c","c","c"] → ["a","2","b","2","c","3"] (returns 6)

Step-by-Step Breakdown
Initialization

n: Length of the input array.

i: Pointer to traverse the input array.

index: Pointer to write the compressed result.

Main Loop

While i < n, do the following:

Set curr to the current character.

Initialize count to 0.

Count Duplicates:
While the current character is the same as curr, increment i and count.

Write Character:
Write curr at position index, then increment index.

Write Count (if needed):
If count > 1, convert count to a string and write each
 digit to the array at index, incrementing index each time.

Return Value

The function returns index, which is the length of the compressed array.

Key Points
In-place Modification:
The function modifies the original chars array, overwriting it with the compressed version.

Space Efficient:
No extra space is used except for a few variables.

Handles Multi-digit Counts:
For counts > 9 (like "c" repeated 12 times), each digit is written separately (e.g., "1", "2").

Example Walkthrough
Input: ["a","a","b","b","c","c","c"]

First group: "a" appears 2 times → write "a", "2"

Second group: "b" appears 2 times → write "b", "2"

Third group: "c" appears 3 times → write "c", "3"

Final array: ["a","2","b","2","c","3"], returned length: 6

*/
/*
Time and Space Complexity
Time Complexity

The algorithm processes each character in the input array
 exactly once. Both the outer and inner loops together
 traverse the entire array in a single pass, incrementing the
  index pointers as they go. Even when counting groups
   of repeated characters,
 the total number of iterations across all groups is at most 
n, where 
n is the length of the input array.

Writing the count (as string digits) for each
 group also takes time proportional to the number of digits,
  but the total number of digits written across 
  the whole array is at most 

n (in the worst case, every character is unique and gets a count of "1").

Therefore, the overall time complexity is O(n).

Space Complexity

The algorithm modifies the input array in place
 and uses only a constant number of 
 extra variables (pointers and counters).

No additional data structures are
 created that grow with the input size.

Therefore, the space complexity is O(1).

Summary Table

Complexity	Value
Time Complexity	O(n)
Space Complexity	O(1)


*/
var compress = function (chars) {
    let n = chars.length;
    let i = 0;
    let index = 0;
    while (i < n) {
        let curr = chars[i];
        let count = 0;
        // Find count of duplicates
        while (i < n && chars[i] === curr) {
            i++;
            count++;
        }
        // Assign current character
        console.log("chars==",chars,index,curr,count)
        chars[index] = curr;
        index++;
        // Add the count if greater than 1
        if (count > 1) {
            let countStr = count.toString();
            for (let ch of countStr) {
                chars[index] = ch;
                index++;
            }
        }
    }
    // The array is compressed in-place, return the new length
    return index;
};

let chars = ["a", "a", "b", "b", "c", "c", "c"];
//let chars = ["a","b","b","b","b","b","b","b","b","b","b","b","b"];
let res = compress(chars);
console.log("res==", res);