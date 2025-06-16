/*
50. Pow(x, n)
Implement pow(x, n), which calculates x raised to the power n (i.e., xn).

 

Example 1:

Input: x = 2.00000, n = 10
Output: 1024.00000
Example 2:

Input: x = 2.10000, n = 3
Output: 9.26100
Example 3:

Input: x = 2.00000, n = -2
Output: 0.25000
Explanation: 2-2 = 1/22 = 1/4 = 0.25
 

Constraints:

-100.0 < x < 100.0
-231 <= n <= 231-1
n is an integer.
Either x is not zero or n > 0.
-104 <= xn <= 104

*/

/*
Time Complexity:

The algorithm halves the exponent at each recursive step, 
so it runs in 
O(logn) time, where 
n is the exponent.

Space Complexity:

The recursion depth is also 
O(logn) since each call divides 
n by 2, so the space complexity is 
O(logn).

*/
function solve(x, n) {
    if (n === 0) return 1;
    //If the exponent is negative, recursively call
    //  with positive exponent and take the reciprocal.
    if (n < 0) {
        return 1 / solve(x, -n);
    }
    //If exponent is even, recursively compute (x ^2) ^n/2
    if (n % 2 === 0) {
        return solve(x * x, n / 2); // Use x^(2n) = (x^2)^n
    }
    //If exponent is odd, compute as x×(x ^2) ^(n−1)/2
    return x * solve(x * x, (n - 1) / 2) //If exponent is odd, x * (x^2)^((n-1)/2)
}

var myPow = function (x, n) {
    return solve(x, n);
};
let x = 2.00000, n = 5;
let res = myPow(x, n);
console.log("mypow==", res);