/*
14. Longest Common Prefix

Write a function to find the longest common prefix 
string amongst an array of strings.

If there is no common prefix, return an empty string "".

Example 1:

Input: strs = ["flower","flow","flight"]
Output: "fl"
Example 2:

Input: strs = ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.
 
Constraints:

1 <= strs.length <= 200
0 <= strs[i].length <= 200
strs[i] consists of only lowercase English letters if it is non-empty.

*/

var longestCommonPrefixOld = function (strs) {
    let prefix = strs[0];
    // 0th string is already considered.match from 2nd one
    for (let i = 1; i < strs.length; i++) {
        let j = 0;
        let currStrLen = strs[i].length;
        let prefixLen = prefix.length;
        while (j < Math.min(prefixLen, currStrLen)) {
            if (prefix[j] !== strs[i][j]) {
                break;
            }
            j++;
        }
        prefix = prefix.slice(0, j);
    }
    return prefix;
};
/*
Time and Space Complexity

Time Complexity
Sorting:

Sorting n strings of average length m takes O(n log n * m) time.

Comparing first and last string:

At most m comparisons (where m is the length of the shortest string).

Total:
O(n log n * m)

Space Complexity
Sorting may require O(n) space (depending on the sort implementation).

Other variables use O(1) extra space.

Total:
O(1) (ignoring the space required for sorting, which
 is usually not counted as extra space for this problem).

Summary Table
Step	Purpose	Complexity
Sort the array	Bring most different strings apart	O(n log n * m)
Compare ends	Find common prefix	O(m)
Space	Only a few variables	O(1)
In Short
Sort the array, then compare the first and last strings to find the prefix.

Time complexity: O(n log n * m)

Space complexity: O(1) (plus sort's internal space, if any)
*/
function longestCommonPrefix(strs) {
    if (!strs.length) return "";

    //Sorting arranges the strings in lexicographical (dictionary) order.

//After sorting, the most different strings 
// (in terms of prefix) will be at the two ends of the array.
    strs.sort();
    // Get the first and last strings
    //After sorting, the longest common prefix of the whole
    //  array must be the common prefix of the first and last strings.
    let first = strs[0];
    let last = strs[strs.length - 1];

    let result = "";
    for (let i = 0; i < first.length; i++) {
//Compare the characters of the first and last strings one by one.
//If characters match, add to result.
//Stop at the first mismatch or when the end of either string is reached.
        if (i >= last.length || first[i] !== last[i]) {
            break;
        }
        result += first[i];
    }

    return result;
}

// Example usage:
// console.log(longestCommonPrefix(["flower", "flow", "flight"])); // Output: "fl"
// console.log(longestCommonPrefix(["dog", "racecar", "car"]));    // Output: ""

//let strs = ["flower","flow","flight"];
strs = ["dog","racecar","car"];
let res = longestCommonPrefix(strs);
console.log("res==",res)