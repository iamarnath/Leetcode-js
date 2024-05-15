/*
2125. Number of Laser Beams in a Bank

Solution - https://leetcode.com/problems/number-of-laser-beams-in-a-bank/solutions/5161764/optimised/

Description
Anti-theft security devices are activated inside a bank. You are given a 0-indexed binary string array bank representing the floor plan of the bank, which is an m x n 2D matrix. bank[i] represents the ith row, consisting of '0's and '1's. '0' means the cell is empty, while'1' means the cell has a security device.

There is one laser beam between any two security devices if both conditions are met:

The two devices are located on two different rows: r1 and r2, where r1 < r2.
For each row i where r1 < i < r2, there are no security devices in the ith row.
Laser beams are independent, i.e., one beam does not interfere nor join with another.

Return the total number of laser beams in the bank.

Example 1:

Input: bank = ["011001","000000","010100","001000"]
Output: 8
Explanation: Between each of the following device pairs, there is one beam. In total, there are 8 beams:
 * bank[0][1] -- bank[2][1]
 * bank[0][1] -- bank[2][3]
 * bank[0][2] -- bank[2][1]
 * bank[0][2] -- bank[2][3]
 * bank[0][5] -- bank[2][1]
 * bank[0][5] -- bank[2][3]
 * bank[2][1] -- bank[3][2]
 * bank[2][3] -- bank[3][2]
Note that there is no beam between any device on the 0th row with any on the 3rd row.
This is because the 2nd row contains security devices, which breaks the second condition.

Example 2:

Input: bank = ["000","111","000"]
Output: 0
Explanation: There does not exist two devices located on two different rows.
 
Constraints:

m == bank.length
n == bank[i].length
1 <= m, n <= 500
bank[i][j] is either '0' or '1'.
*/
/*
Approach:

The numberOfBeams function iterates over each string in the bank array.
For each string, it counts the number of '1' characters and calculates the product of the current count with the previous count.
If the current count is not zero, it updates the prevDeviceCount with the current count.
The function returns the total sum of products calculated.

Time Complexity:

The time complexity of the code is O(nm), where n is the number of rows in the bank list
 and m is the number of columns in each row. This is because the code iterates over each row
  (n iterations) and for each row, it iterates over each character (m iterations). 
  The nested loops result in a time complexity of O(nm)

Space Complexity:

The space complexity of this function is O(1) as it only uses a constant amount of extra space regardless of the input size.
The variables prevDeviceCount, ans, currDeviceCount, and loop iterators do not scale with the input size.
The function does not use any additional data structures that grow with the input, resulting in a constant space complexity.

*/
var numberOfBeams = function(bank) {
    let prevDeviceCount = 0, ans = 0;
    for (let s of bank) {
        let currDeviceCount = 0;
        for (let c of s) {
            if (c === '1'){
                currDeviceCount++;
            }
        }
        ans += (prevDeviceCount * currDeviceCount);
        if (currDeviceCount !== 0) {
            prevDeviceCount = currDeviceCount;
        }
    }
    return ans;
};
let bank = ["011001","000000","010100","001000"];
//bank = ["000","111","000"]
console.log(numberOfBeams(bank));