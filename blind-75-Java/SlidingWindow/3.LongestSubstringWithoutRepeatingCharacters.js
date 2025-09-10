/*
3. Longest Substring Without Repeating Characters
Description
Given a string s, find the length of the longest substring without duplicate characters.

A substring is a contiguous sequence of characters within a string.

Example 1:

Input: s = "zxyzxyz"

Output: 3
Explanation: The string "xyz" is the longest without duplicate characters.

Example 2:

Input: s = "xxxx"

Output: 1
Constraints:

0 <= s.length <= 1000
s may consist of printable ASCII characters.

*/
/*
⏱️ Time Complexity: O(n)
Linear time - Where n is the length of the input string s. Here's why:

Main Loop: The j pointer traverses all n characters exactly once

Nested Loop: The i pointer only moves forward, never backward. Each character gets visited at most twice (once by j, once by i)

Efficient Checks: Map operations (get, set, delete) are O(1) in modern JavaScript engines

💾 Space Complexity: O(1)
Constant space (if using fixed character set). Here's the breakdown:

Character Storage: The Map stores at most k unique characters, where k is the character set size:

26 for lowercase English letters

256 for extended ASCII

149,186 for Unicode 15.1 (theoretical upper bound)

Variable Storage: Only 5 primitive variables (max, i, j, size, mapsize) are used

🔍 Key Complexity Insights
Operation	Cost	Frequency	Total Cost
Outer j-loop	O(1)	n times	O(n)
Inner i-loop	O(1) per step	At most n times	O(n)
Map operations	O(1)	Per character	O(n)

*/
function longestSubsNoRepeat(s) {
    let max = 0, i = 0, j = 0;
    let size = s.length;
    //Initializes a Map to count occurrences of each character in the current window
    var map = new Map();
    let mapsize;
    //Main loop: expands the right end of the window until the end of the string.
    while (j < size) {
        //Adds the character at position j to the map or increments its count if already present.
        if (map.get(s.charAt(j))) {
            map.set(s.charAt(j), map.get(s.charAt(j)) + 1);
        }
        else {
            map.set(s.charAt(j), 1);
        }
        mapsize = map.size;
        //Checks if the window contains duplicate characters 
        // (since the window length is greater than the number of unique characters).
        if (mapsize < (j - i + 1)) {
            //Shrinks the window from the left until all characters are unique.

            while (mapsize < (j - i + 1)) {
                //Decrements the count of the character at the left end.
                map.set(s.charAt(i), map.get(s.charAt(i)) - 1);
                //Removes the character from the map if its count drops to zero.

                if (map.get(s.charAt(i)) === 0) {
                    map.delete(s.charAt(i));
                }
                mapsize = map.size;
                //Moves the left pointer to the right.
                i++;
            }
            //Moves the right pointer to expand the window after shrinking.
            j++;
        }
        //If all characters in the window are unique:
        else if (mapsize === (j - i + 1)) {
            //Updates the maximum length found so far.
            max = Math.max(max, j - i + 1);
            //Expands the window to the right.
            j++;
        }
    }
    return max;
}

function longestSubsNoRepeat(s) {
    let max = 0, i = 0, j = 0;
    let size = s.length;
    let charSet = new Set();

    while (j < size) {
        // If the character at position j is not in the set, add it and update max
        if (!charSet.has(s[j])) {
            charSet.add(s[j]);
            max = Math.max(max, j - i + 1);
            j++;
        } else {
            // If the character is already in the set, remove the leftmost character and move i
            charSet.delete(s[i]);
            i++;
        }
    }
    return max;
}

// 2nd approach
/*

Steps
Iterate through the string with the right pointer.
While the current character s[right] is already in charSet:
Remove s[left] from charSet.
Move left pointer forward (shrink the window from the left).
Add s[right] to charSet (expand the window).
Update maxLength if the current window is larger than previous ones.
Return maxLength after the loop.

Time Complexity

The sliding window approach used in your JavaScript code has
 a time complexity of O(n), where 
n is the length of the input string.
Each character is visited at most twice: once by the right
 pointer (as it moves forward), and potentially again by 
 the left pointer (as it catches up when duplicates are found),
  but never more than twice overall.
This ensures a linear pass through the string, making the
 algorithm highly efficient for large inputs.

Space Complexity

The space complexity is O(min(n, m)), where:
n is the length of the string,
m is the size of the character set (for example, 26 for
 lowercase English letters, 128 for ASCII).

This is because the Set used to track characters in 
the current window can grow up to the number of unique
 characters in the substring, but never more than the 
 total number of unique possible characters.

In practical terms, for standard ASCII strings,
 the space is typically O(1) since the character set
  is fixed and small. For larger Unicode strings,
   it could approach O(n) in the worst case

*/
function lengthOfLongestSubstring(s) {
  const charSet = new Set();
  let maxLength = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    while (charSet.has(s[right])) {
      charSet.delete(s[left]);
      left++;
    }
    charSet.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}



let s = "zxyzxyz"

console.log(longestSubsNoRepeat("pwwkew"));