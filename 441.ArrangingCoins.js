/*
441. Arranging Coins

Solution - https://leetcode.com/problems/arranging-coins/solutions/5112166/optimised/

Description
You have n coins and you want to build a staircase with these coins. The staircase consists of k rows where the ith row has exactly i coins. The last row of the staircase may be incomplete.

Given the integer n, return the number of complete rows of the staircase you will build.
Example 1:
Input: n = 5
Output: 2
Explanation: Because the 3rd row is incomplete, we return 2.
Example 2:

Input: n = 8
Output: 3
Explanation: Because the 4th row is incomplete, we return 3.
 

Constraints:

1 <= n <= 231 - 1

*/
/*

The time complexity of the code is O(sqrt(n)). This is because the code uses a while loop that iterates until it finds the maximum number of complete rows that can be formed with the given number of coins.
The number of iterations is proportional to the square root of the number of coins, hence the time complexity is O(sqrt(n)).

The space complexity of the code is O(1). This is because the code uses a constant amount of space to store the variables involved in the calculation, regardless of the size of the input.
To solve the quadratic inequality 𝑘^2+𝑘 ≤ 2𝑁, we can follow these steps:
1.	Rewrite the Inequality:
The inequality can be rewritten as 𝑘^2+𝑘−2𝑁≤0.
2.	Find the Roots:
We need to find the roots of the quadratic equation 𝑘^2+𝑘−2𝑁=0
 to determine the critical points.The roots can be found using the quadratic formula:
k= (−b±sqrt(b^2-4*a*c))/2a
where 𝑎=1, 𝑏=1, and 𝑐=−2𝑁.Substituting the values:
𝑘=(−1±sqrt(1+8*N))/2
3.	Analyze the Inequality:
•	If 1+8N<0, the inequality holds for all real numbers.
•	If 1+8N=0, the inequality holds at the critical point.
•	If 1+8N>0, the inequality holds within a certain range.
4.	Final Step:
•	If 1+8N≤0, the solution is all real numbers.
•	If 1+8N>0, the solution is within the range of the roots.
By following these steps, you can determine the solution to the quadratic inequality 𝑘^2+𝑘≤2𝑁 based on the value of N.
*/
var arrangeCoins = function(n) {
    let left = 0, right = n;
    while (left <= right) {
        let mid = left + Math.floor((right - left) / 2);
        if ((mid * (mid + 1) / 2) <= n) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return left - 1;
};

let n = 11;

var arrangeCoins2 = function(n) {
    return Math.floor(Math.sqrt(2*n+0.25)-0.5);
}
console.log(arrangeCoins(n));
