/*
204. Count Primes
Example 1:

Input: n = 10
Output: 4
Explanation: There are 4 prime numbers less than 10,
 they are 2, 3, 5, 7.
Example 2:

Input: n = 0
Output: 0
Example 3:

Input: n = 1
Output: 0
 

Constraints:

0 <= n <= 5 * 106
*/
/*
The time complexity of the countPrimes algorithm using the Sieve of Eratosthenes is 
O(nloglogn), and its space complexity is 
O(n).

Time Complexity
The algorithm marks multiples of each prime starting from 
i^2, which leads to an overall time cost that accumulates as 
n(1/2+1/3+1/5+…+1/p), where 
p stands for all primes less than n.

The sum of the reciprocals of primes up to 
n is approximately loglogn, resulting in a total work of 
O(nloglogn).

Space Complexity
The algorithm uses a boolean array of size 

n to keep track of composite numbers; this requires 

O(n) space.
Only additional constants (loop counters, etc.) need 

O(1) space.

Summary Table
Complexity	Value
Time	O(nlog logn)
Space	O(n)

*/
var countPrimes = function (n) {
    if (n <= 1) return 0;
    const composites = new Array(n).fill(false);
    const limit = Math.floor(Math.sqrt(n));
    // Array of composites --> true represents composite and 
    // false represents prime
    for (let i = 2; i <= limit; i++) {
        if (!composites[i]) {
            // Mark all multiples of i as true.
            // The first index to be flipped to true is i * i
            for (let j = i * i; j < n; j+=i) {
                composites[j] = true;
            }
        }
    }
    let count = 0;
    for (let i = 2; i < n; i++) {
        if (!composites[i]) count++;
    }
    return count;
};
// class Solution {
//     countPrimes(n) {
//         if (n <= 2) return 0; // Checking 0 & 1
//         const composites = new Array(n).fill(false);
//         const limit = Math.floor(Math.sqrt(n));

//         // Array of composites --> true represents composite and false represents prime
//         for (let i = 2; i <= limit; i++) {
//             if (!composites[i]) {
//                 // Mark all multiples of i as true.
//                 // The first index to be flipped to true is i * i
//                 for (let j = i * i; j < n; j += i) {
//                     composites[j] = true;
//                 }
//             }
//         }

//         let count = 0;
//         for (let i = 2; i < n; i++) {
//             if (!composites[i]) count++;
//         }

//         return count;
//     }
// }

let n = 10;
//let sol = new Solution();
let res = countPrimes(n);
console.log("res==",res);
