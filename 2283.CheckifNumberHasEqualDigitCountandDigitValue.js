/*
2283. Check if Number Has Equal Digit Count and Digit Value

Solution - https://leetcode.com/problems/check-if-number-has-equal-digit-count-and-digit-value/solutions/5090199/optimised/

Description
You are given a 0-indexed string num of length n consisting of digits.

Return true if for every index i in the range 0 <= i < n, the digit i occurs num[i] times in num, otherwise return false.

 

Example 1:

Input: num = "1210"
Output: true
Explanation:
num[0] = '1'. The digit 0 occurs once in num.
num[1] = '2'. The digit 1 occurs twice in num.
num[2] = '1'. The digit 2 occurs once in num.
num[3] = '0'. The digit 3 occurs zero times in num.
The condition holds true for every index in "1210", so return true.
Example 2:

Input: num = "030"
Output: false
Explanation:
num[0] = '0'. The digit 0 should occur zero times, but actually occurs twice in num.
num[1] = '3'. The digit 1 should occur three times, but actually occurs zero times in num.
num[2] = '0'. The digit 2 occurs zero times in num.
The indices 0 and 1 both violate the condition, so return false.
 

Constraints:

n == num.length
1 <= n <= 10
num consists of digits.
*/
/*
Time Complexity:
The time complexity of this approach is O(n), where n is the number of digits in the input number.
The initial loop to fill the count array runs in O(n) time.
The second loop to decrement the count for each digit also runs in O(n) time.
The final check using every to verify if all counts are zero takes O(1) time.

Space Complexity:
The space complexity of this approach is O(1) because the space used is constant regardless of the input size.
The array cnt has a fixed size of 10 to store the count of each digit, making the space complexity independent of the input size.

*/

function digitCount(num) {
    const length = num.length;
    const cnt = new Array(10).fill(0);
    //fill the count with frequency of each element
    for (let i = 0; i < length; i++) {
        cnt[i] = Number(num[i]);
    }

    // Iterate over the number string and decrement the count for the digit at each index
    for (let c of num) {
        cnt[c]--;
    }
    return cnt.every(v => v === 0);
}

let num = "1210";
//num = "030";
console.log(digitCount(num));
