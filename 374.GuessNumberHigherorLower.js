/*
374. Guess Number Higher or Lower

Solution - https://leetcode.com/problems/guess-number-higher-or-lower/solutions/5111101/optimised/

Description
We are playing the Guess Game. The game is as follows:

I pick a number from 1 to n. You have to guess which number I picked.

Every time you guess wrong, I will tell you whether the number I picked is higher or lower than your guess.

You call a pre-defined API int guess(int num), which returns three possible results:

-1: Your guess is higher than the number I picked (i.e. num > pick).
1: Your guess is lower than the number I picked (i.e. num < pick).
0: your guess is equal to the number I picked (i.e. num == pick).
Return the number that I picked.

 

Example 1:

Input: n = 10, pick = 6
Output: 6
Example 2:

Input: n = 1, pick = 1
Output: 1
Example 3:

Input: n = 2, pick = 1
Output: 1
 

Constraints:

1 <= n <= 231 - 1
1 <= pick <= n
*/
/*
Time Complexity

The time complexity of the guessNumber function is O(log n), where n is the given range of numbers.
The function performs a binary search, which halves the search space in each iteration. This results in a logarithmic time complexity, as the number of iterations required to find the secret number is proportional to the logarithm of the range n.

Space Complexity
The space complexity of the guessNumber function is O(1), as it only uses a constant amount of extra space to store the left and right pointers, regardless of the input size n.
The function does not use any additional data structures that grow with the input size, making its space complexity constant.

*/
function guess(num) { }

var guessNumber = function(n) {
    let left = 1;
  let right = n;
  while (left < right) {
     // const mid = (left+(right-left)>>>1);
      const mid = (left+right)>>>1;
      // Guess the middle of the range and reduce the range based on the response
      const result = guess(mid);
      if(result<=0){
       // If the guessed number is less than or equal to mid, narrow the range to the left half
          right=mid;
      }
      else{
          // If the guessed number is greater than mid, narrow the range to the right half
          left=mid+1
      }
  }
  return left;
};
