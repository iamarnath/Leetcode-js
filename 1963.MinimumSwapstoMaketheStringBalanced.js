/*
1963. Minimum Number of Swaps to Make the String Balanced

Solution - https://leetcode.com/problems/minimum-number-of-swaps-to-make-the-string-balanced/solutions/5073705/optimised/

Description
You are given a 0-indexed string s of even length n. The string consists of exactly n / 2 opening brackets '[' and n / 2 closing brackets ']'.

A string is called balanced if and only if:

It is the empty string, or
It can be written as AB, where both A and B are balanced strings, or
It can be written as [C], where C is a balanced string.
You may swap the brackets at any two indices any number of times.

Return the minimum number of swaps to make s balanced.

 

Example 1:

Input: s = "][]["
Output: 1
Explanation: You can make the string balanced by swapping index 0 with index 3.
The resulting string is "[[]]".
Example 2:

Input: s = "]]][[["
Output: 2
Explanation: You can do the following to make the string balanced:
- Swap index 0 with index 4. s = "[]][][".
- Swap index 1 with index 5. s = "[[][]]".
The resulting string is "[[][]]".
Example 3:

Input: s = "[]"
Output: 0
Explanation: The string is already balanced.

The intuition behind the solution is to track the imbalance of brackets at any point in the string. When traversing the string, keep a counter that increases when encountering an opening bracket '[' and decreases when encountering a closing bracket ']', as long as there was a previously unpaired opening bracket (i.e., the counter is positive). If the counter is zero, and a closing bracket is found, then this is an excess closing bracket that can potentially be swapped to balance a previous excess opening bracket.

Every time you encounter an excess closing bracket (signaled by the counter at zero before decrement), you know that at some point in the future, a swap will be needed to pair that closing bracket with a previous opening bracket.

Once the entire string has been traversed, the counter will have the total count of unpaired opening brackets. Since each swap can fix two unpaired brackets (by bringing an opening and a closing bracket together), the minimum number of swaps will be half of the total count of unpaired opening brackets.

The answer is the integer division of (ans + 1) >> 1, which is equivalent to math.ceil(ans / 2). This takes care of both even and odd counts, as an odd count of unbalanced brackets will still require an extra swap. For example, if there are 3 unpaired opening brackets, you would need at least 2 swaps to make the string balanced.

*/
function minSwaps(s) {
    let openBrackets = 0;
    let swap = 0;
    for (let char of s) {
        if(char==="["){
            openBrackets++;
        }
        //if it is closing bracket and there are unmatched closing bracket
        else if (openBrackets >0 && char=== "]"){
            openBrackets--;
        }

    }
      // The number of swaps needed is half the number of unmatched opening brackets (rounded up)
    // because each swap can fix two unmatched opening brackets
    swap = Math.ceil(openBrackets/2)
    return swap;
}

let s = "]]][[[";
s = "[]"
console.log(minSwaps(s));