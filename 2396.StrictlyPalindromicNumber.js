/*
2396. Strictly Palindromic Number

Solution - https://leetcode.com/problems/strictly-palindromic-number/submissions/1249970459/

https://leetcode.com/problems/strictly-palindromic-number/solutions/5130731/optimised/

Description
An integer n is strictly palindromic if, for every base b between 2 and n - 2 (inclusive), the string representation of the integer n in base b is palindromic.

Given an integer n, return true if n is strictly palindromic and false otherwise.

A string is palindromic if it reads the same forward and backward.

 

Example 1:

Input: n = 9
Output: false
Explanation: In base 2: 9 = 1001 (base 2), which is palindromic.
In base 3: 9 = 100 (base 3), which is not palindromic.
Therefore, 9 is not strictly palindromic so we return false.
Note that in bases 4, 5, 6, and 7, n = 9 is also not palindromic.
Example 2:

Input: n = 4
Output: false
Explanation: We only consider base 2: 4 = 100 (base 2), which is not palindromic.
Therefore, we return false.

 

Constraints:

4 <= n <= 105

*/
/*
Approach:
The isPalindrome function checks if a given string is a palindrome by comparing characters from both ends towards the center.
The isStrictlyPalindromic function checks if a number n is palindromic in all bases from 2 to n - 1 by converting n to each base and checking if the converted number is a palindrome using the isPalindrome function.
Time Complexity:
For isPalindrome:
The time complexity is O(N/2) where N is the length of the input string str.
The function compares characters from both ends until the pointers meet in the middle.
For isStrictlyPalindromic:
The time complexity is O((n-2) * M) where M is the maximum length of the converted number in any base.
The function iterates through bases from 2 to n - 1 and converts n to each base, checking if it's a palindrome.
Space Complexity:
For isPalindrome:
The space complexity is O(1) as the function uses a constant amount of extra space for the pointers and comparisons.
For isStrictlyPalindromic:
The space complexity is O(M) where M is the maximum length of the converted number in any base.
The function stores the converted number in each base, which can vary in length.
In summary, the isPalindrome function has a time complexity of O(N/2) and a space complexity of O(1). The isStrictlyPalindromic function has a time complexity of O((n-2) * M) and a space complexity of O(M), where M is the maximum length of the converted number in any base.


*/

var isPalindrome = function (str) {
    // Define pointers for the start and end of the string
    let start = 0;
    let end = str.length - 1;

    // Check if the string is a palindrome by comparing characters from both ends
    while (start < end) {
        if (str[start] !== str[end]) {
            return false;
        }
        start++;
        end--;
    }

    // If all characters match, the string is a palindrome
    return true;
}

var isStrictlyPalindromic = function (n) {
    // Iterate through all the bases from 2 to n - 1
    for (let base = 2; base < n; base++) {
        // Convert the number to the current base
        const numberInBase = n.toString(base);
        // Check if the converted number is a palindrome
        if (!isPalindrome(numberInBase)) {
            return false;
        }
    }

    // If number n is palindromic in all bases from 2 to n - 1, return true
    return true;
}

let n = 4;
console.log(isStrictlyPalindromic(n));
