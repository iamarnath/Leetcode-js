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

1 <= n <= 2^31 - 1

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
/*

Here's a step-by-step explanation of the approach:
Initialization: The function initializes two pointers, left and right, to represent the range of possible values for k. Initially, left is set to 0 and right is set to n.

Binary Search: The function enters a while loop that continues until left is greater than right. In each iteration, it calculates the midpoint mid of the current range [left, right].
Check the Midpoint: The function checks if the sum of the first mid positive integers is less than or equal to n. This is done by calculating (mid * (mid + 1) / 2), which is the sum of the first mid positive integers.

Update the Range: If the sum is less than or equal to n, the function updates left to mid + 1 to narrow the range to the right half. If the sum is greater than n, it updates right to mid - 1 to narrow the range to the left half.
Return the Result: Once the loop ends, the function returns left - 1 as the number of coins that can be arranged in a staircase pattern such that the sum of the first k positive integers is equal to or less than n.
This approach ensures that the function efficiently finds the correct value of k by repeatedly dividing the search range in half until it finds the correct value.

let n=10
left=0,right=10
mid=5
mid calc= 55
right = 4
left = 2
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
/*
The function arrangeCoins returns left - 1 instead of left because the binary search approach is used to find the largest k such that the sum of the first k positive integers is less than or equal to n.
When the loop ends, left is the smallest k such that the sum of the first k positive integers is greater than n. However, the correct answer is the largest k such that the sum of the first k positive integers is less than or equal to n.
Therefore, the function returns left - 1 to account for this difference. This ensures that the function returns the correct number of coins that can be arranged in a staircase pattern such that the sum of the first k positive integers is equal to or less than n.

*/
let n = 10;

var arrangeCoins2 = function(n) {
    return Math.floor(Math.sqrt(2*n+0.25)-0.5);
}
console.log(arrangeCoins(n));
