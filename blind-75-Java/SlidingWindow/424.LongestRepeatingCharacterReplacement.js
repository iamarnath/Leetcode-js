/*
424. Longest Repeating Character Replacement
You are given a string s consisting of only
 uppercase english characters and an integer k.
  You can choose up to k characters of the string 
  and replace them with any other uppercase English character.

After performing at most k replacements,
 return the length of the longest substring 
 which contains only one distinct character.

Example 1:

Input: s = "XYYX", k = 2

Output: 4
Explanation: Either replace the 'X's with 'Y's,
 or replace the 'Y's with 'X's.

Example 2:

Input: s = "AAABABB", k = 1

Output: 5
Constraints:

1 <= s.length <= 1000
0 <= k <= s.length

*/
/*
Initialize Variables:
freq: An array of size 26 (for each uppercase letter) to count
 character frequencies in the current window.
left: The left boundary of the sliding window.
maxFreq: The highest frequency of any single character
 in the current window.
maxWindow: The length of the longest valid window found so far.

Expand the Window:

Iterate right from 0 to s.length - 1.

For each character at right, increment its count in freq.
Update maxFreq if this character's frequency is now the highest.
Shrink the Window (if needed):
Calculate the current window size: right - left + 1.
If the number of replacements needed (window size - maxFreq) 
exceeds k, shrink the window from the left:
Decrement the count of the character at left in freq.
Move left to the right.
Update the Maximum Window:
After each iteration, update maxWindow if the current window is larger.
Return the Result:
After the loop, return maxWindow, which holds the 
length of the longest valid substring.

Time Complexity
O(N)

Each character is processed at most twice: once when right
 expands the window and once when left shrinks it.
All operations inside the loop (frequency update, max calculation) are O(1).
So, the total time complexity is O(N), where N is the length of the string.

Space Complexity
O(1)

The frequency array freq always has a fixed size of 26
 (for uppercase English letters), regardless of input size.
All other variables use constant space.
Thus, the space complexity is O(1) (constant space).
*/
var characterReplacement = function (s, k) {
  const freq = Array(26).fill(0);
  let left = 0;
  let maxFreq = 0;
  let maxWindow = 0;
  for (let right = 0; right < s.length; right++) {
    const charCode = s.charCodeAt(right) - 65; // 'A' is ASCII 65
    freq[charCode]++;
    maxFreq = Math.max(maxFreq, freq[charCode]);
    const windowLength = right - left + 1;
    if (windowLength - maxFreq > k) {
      freq[s.charCodeAt(left) - 65]--;
      left++;
    }
    maxWindow = Math.max(maxWindow, right - left + 1);
  }
  return maxWindow;
};

let s = "AAABABB", k = 1;
let res = characterReplacement(s, k);

console.log("characterReplacement ==", res);
/*
The function characterReplacement finds the length of the longest substring where up to k characters can be replaced so the whole substring consists of the same character. Here is a visualization for s = "AAABABB", k = 1:

Initial Values
s: "A A A B A B B"

k: 1

freq: array for counting uppercase letters

left, right: window pointers starting at 0

maxFreq: highest letter count in current window

maxWindow: max length found so far

Step-by-Step Window Movement
Step	left	right	s[right]	freq snapshot	maxFreq	window len	window-len - maxFreq > k?	maxWindow update?
1	0	0	A	A:1	1	1	0 > 1 ⇒ No	1
2	0	1	A	A:2	2	2	0 > 1 ⇒ No	2
3	0	2	A	A:3	3	3	0 > 1 ⇒ No	3
4	0	3	B	A:3, B:1	3	4	1 > 1 ⇒ No	4
5	0	4	A	A:4, B:1	4	5	1 > 1 ⇒ No	5
6	0	5	B	A:4, B:2	4	6	2 > 1 ⇒ Yes	(Shrink window)
1	5	A left	A:3, B:2	3	5	2 > 1 ⇒ Yes	(Shrink window)
2	5	A left	A:2, B:2	2	4	2 > 1 ⇒ Yes	(Shrink window)
3	5	A left	A:1, B:2	2	3	1 > 1 ⇒ No	
7	3	6	B	A:1, B:3	3	4	1 > 1 ⇒ No	
How the Window Changes
Up to index 4 (, "AAABA"): Replacing 1 'B' makes "AAAAA", so length 5 is possible.

On adding the next 'B' (index 5): "AAABAB" contains 2 B’s, breaking the rule (more than 1 replacement), so move left up to decrease window size until the constraint is met.

After shrinking, the window re-centers and continues.

Visualization with Highlights
0	1	2	3	4	5	6
A	A	A	B	A	B	B
Longest replaceable window is indices 0 to 4 → "AAABA" (length = 5; replace one 'B' with 'A').

Visual Markup of Longest Window
| A | A | A | B | A | B | B |

Characters in bold (indices 0–4): The window where one replacement yields all 'A's.

Maximum possible substring length: 5
*/