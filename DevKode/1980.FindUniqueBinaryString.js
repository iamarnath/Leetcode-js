/*
1980. Find Unique Binary String

Solution - https://leetcode.com/problems/find-unique-binary-string/solutions/5075973/optimised/

Description
Given an array of strings nums containing n unique binary strings each of length n, return a binary string of length n that does not appear in nums. If there are multiple answers, you may return any of them.

 

Example 1:

Input: nums = ["01","10"]
Output: "11"
Explanation: "11" does not appear in nums. "00" would also be correct.
Example 2:

Input: nums = ["00","01"]
Output: "11"
Explanation: "11" does not appear in nums. "10" would also be correct.
Example 3:

Input: nums = ["111","011","001"]
Output: "101"
Explanation: "101" does not appear in nums. "000", "010", "100", and "110" would also be correct.
 

Constraints:

n == nums.length
1 <= n <= 16
nums[i].length == n
nums[i] is either '0' or '1'.
All the strings of nums are unique.

*/
/*
// not working for all sets
function findDifferentBinaryString(nums) {
    let n = nums.length;
    let result = "";
    for (let i = 0; i < n; i++) {
        let ch = nums[i][i];
        result += (ch === 0) ? "1" : "0";
    }
    return result;
}
*/
/*
bitmask |= 1 << countOnes;: This line performs a bitwise operation to update the bitmask variable. The bitwise OR (|=) operator is used to set the bit at the position corresponding to the countOnes value to 1.
1 << countOnes: This part shifts the binary value 1 to the left by countOnes positions. For example, if countOnes is 3, this will result in the binary value 0000 1000 (which is 8 in decimal).
bitmask |= ...: The bitwise OR (|=) operator is used to set the bit at the position corresponding to the countOnes value to 1 in the bitmask variable. If the bit was already set, it will remain set.


for (let i = 0; ; ++i) { ... }: This is a loop that starts with i equal to 0 and continues indefinitely. The loop increments i by one in each iteration.
if (((mask >> i) & 1) === 0) { ... }: This line checks the i-th bit of the mask variable. It shifts the mask to the right by i bits using the right shift operator >>. Then, it performs a bitwise AND operation with 1 to extract the i-th bit. If the i-th bit is 0, the condition is true.
return '1'.repeat(i) + '0'.repeat(nums.length - i);: If the i-th bit of the mask is 0, this line constructs a string based on the position of the 0 bit in the mask. It generates a string of '1' characters repeated i times followed by a string of '0' characters repeated nums.length - i times. This effectively creates a binary string where the i-th bit is '1' and the rest are '0'.
The purpose of this code is to find the position of the first 0 bit in the mask variable and construct a binary string where that bit is set to 1 and all other bits are set to 0. This operation can be useful in scenarios where you need to manipulate or analyze binary data based on specific bit patterns or positions.
*/
/*
Time Complexity:

Building the Bitmask:
Iterating through each binary string in nums and counting '1's takes O(n * m) time, where n is the number of strings and m is the average length of the strings.
Finding the Different Binary String:
The loop to find the different binary string iterates through the bits of the mask until it finds a '0' bit. In the worst case, this could iterate through all bits, leading to O(m) time complexity.
Therefore, the overall time complexity of the function is O(n * m) for building the bitmask and O(m) for finding the different binary string, resulting in a total time complexity of O(n * m).
Space Complexity:
The space complexity of this function is O(1) as it uses a constant amount of additional space regardless of the input size. There are no data structures or arrays that grow with the input size, and the function operates with a fixed set of variables.

Approach:
Building the Bitmask:
The function first iterates through each binary string in the nums array.
For each string, it counts the number of '1's and sets the corresponding bit in the mask variable by performing a bitwise OR operation.
Finding the Different Binary String:
After building the mask, the function enters an infinite loop to find a binary string with a different count of '1's.
It iterates through the bits of the mask starting from the least significant bit (LSB) and checks if the bit is '0'.
When it finds a '0' bit, it constructs a binary string with '1's up to that position and '0's for the remaining positions.

*/
function findDifferentBinaryString(nums) {
    let mask = 0;
    for (let str of nums) {
        let cnt = [...str].filter(c => c === '1').length;
        // Set the corresponding bit in the bitmask.
        mask |= 1 << cnt;
    }
    // Start an infinite loop to find a binary string with a different count of '1's.
    for (let i = 0; ; ++i) {
        if (((mask >> i) & 1) === 0) {
            return '1'.repeat(i) + '0'.repeat(nums.length - i);
        }
    }
}
let nums = ["00", "01"]
nums = ["111", "011", "001"]
nums = ["00", "01"]


console.log(findDifferentBinaryString(nums))