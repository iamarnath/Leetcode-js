/*
1189. Maximum Number of Balloons

Solution - https://leetcode.com/problems/maximum-number-of-balloons/solutions/5130822/optimised/

Description
Given a string text, you want to use the characters of text to form as many instances of the word "balloon" as possible.

You can use each character in text at most once. Return the maximum number of instances that can be formed.

Example 1:

Input: text = "nlaebolko"
Output: 1
Example 2:

Input: text = "loonbalxballpoon"
Output: 2
Example 3:

Input: text = "leetcode"
Output: 0

Constraints:

1 <= text.length <= 104
text consists of lower case English letters only.

*/
/*
(charCount.get('l') || 0) >> 1: This performs a bitwise right shift operation on the count of 'l' by 1 bit. The bitwise right shift operator >> divides the operand by 2 and returns the integer part of the result.
For example, if the count of 'l' is 4, then (4) >> 1 would be 2, which is the correct count of 'l' in the word "balloon" (since 'l' appears twice).
If the count of 'l' is 0, then (0) >> 1 would be 0, which is the correct count of 'l' in the word "balloon" when there are no occurrences of 'l'.


Approach:
The maxNumberOfBalloons function aims to calculate the maximum number of times the word "balloon" can be formed using the characters in the input text.
It initializes an array charCount to store the count of each character in the English alphabet.
It iterates through the input text, increments the count of each character, and then calculates the maximum number of times the word "balloon" can be formed based on the counts of 'b', 'a', 'l', 'o', and 'n'.
The function returns the maximum count of complete occurrences of the word "balloon" that can be formed.
Time Complexity:
The time complexity of the function is O(N), where N is the length of the input text.
The function iterates through the input text once to calculate the count of each character and then performs a constant number of operations to determine the maximum number of times "balloon" can be formed.
Space Complexity:
The space complexity of the function is O(1) as it uses a fixed-size array charCount to store the count of characters in the English alphabet.
The space required is constant and does not depend on the input size.
In summary, the maxNumberOfBalloons function has a time complexity of O(N) and a space complexity of O(1), making it efficient in terms of both time and space utilization for calculating the maximum number of times the word "balloon" can be formed from the input text.

*/

function maxNumberOfBalloons(text) {
    const charCount = new Map();
    for (let ch of text) {
        charCount.set(ch, (charCount.get(ch) || 0) + 1);
    }
    const relevantCounts = [
        charCount.get('b') || 0,
        charCount.get('a') || 0,
        (charCount.get('l') || 0) >> 1,
        (charCount.get('o') || 0) >> 1,
        charCount.get('n') || 0,
    ];
    return Math.min(...relevantCounts);
}
let text = "loonbalxballpoon";
text = "nlaebolko";
text = "leetcode";
console.log(maxNumberOfBalloons(text))