/*
1394. Find Lucky Integer in an Array

Solution - https://leetcode.com/problems/find-lucky-integer-in-an-array/solutions/5115851/optimised/

Description
Given an array of integers arr, a lucky integer is an integer that has a frequency in the array equal to its value.
Return the largest lucky integer in the array. If there is no lucky integer return -1.
Example 1:

Input: arr = [2,2,3,4]
Output: 2
Explanation: The only lucky number in the array is 2 because frequency[2] == 2.
Example 2:

Input: arr = [1,2,2,3,3,3]
Output: 3
Explanation: 1, 2 and 3 are all lucky numbers, return the largest of them.
Example 3:

Input: arr = [2,2,2,3,3]
Output: -1
Explanation: There are no lucky numbers in the array.
 
Constraints:
1 <= arr.length <= 500
1 <= arr[i] <= 500

*/
/*
function findLucky(arr) {
    const counter = new Array(510).fill(0);
    // Iterate through the array and increment the count of each number in the counter.

    for (let num of arr) {
        counter[num]++
    }
    // Initialize the lucky number to -1, indicating that no lucky number has been found yet.
    let luckyNumber = -1;
    // Iterate through the frequencyCounter, starting from 1 since 0 can't be a lucky number.
    let counterLen = counter.length;
    for (let i = 1; i < counterLen; i++) {
        // Check if the current number's count is the same as the number itself.
        if (counter[i] === i) {
            // Update the lucky number since a new lucky number is found.
            // As we iterate from low to high, this will ensure the largest lucky number will be recorded l
            luckyNumber = i;
        }
    }
    return luckyNumber;
}
*/
/*
Time complexity:

The time complexity of this implementation is O(n), where n is the length of the input array arr. This is because we iterate through the array once to count the occurrences of each number, and then we iterate through the frequency map to find the largest lucky number.

Space complexity:

The space complexity is O(n) as well, since we use an object (frequency map) to store the count of each number in the input array.


Approach
The function findLucky(arr) is designed to find the "lucky number" in an array. A "lucky number" is defined as an integer that appears exactly the same number of times as its value in the array. If no such number exists, the function returns -1.
Here's a step-by-step breakdown of how the function works:
Initialization: The function starts by initializing an empty object frequencyMap to store the frequency of each number in the array. This object will be used to count the occurrences of each number in the array.
Frequency Counting: The function then iterates through the array, and for each number, it increments the corresponding count in the frequencyMap. This ensures that each number's frequency is accurately recorded.
Lucky Number Search: After all frequencies are counted, the function iterates through the frequencyMap to find the number that has a frequency equal to its value. This is the definition of a "lucky number." If such a number is found, it is stored in the variable luckyNumber.
Return: Finally, the function returns the luckyNumber if it was found, or -1 if no such number existed in the array.
This approach ensures that the function efficiently and accurately identifies the "lucky number" in the array, if it exists, or returns -1 if no such number is present.
*/
function findLucky(arr) {
    // Create an object to store the count of each number
    const frequencyMap = {};
    // Iterate through the array and count the occurrences of each number
    for (let num of arr) {
        frequencyMap[num] = (frequencyMap[num] || 0) + 1;
    }
    // Find the largest number whose count is equal to the number itself
    let luckyNumber = -1;
    for (let num in frequencyMap) {
        if (frequencyMap[num] === parseInt(num)) {
            luckyNumber = Math.max(luckyNumber, parseInt(num));
        }
    }
    return luckyNumber;
}
let arr = [1, 2, 2, 3, 3, 3];
//arr = [2, 2, 3, 4];
//arr = [2, 2, 2, 3, 3];
console.log(findLucky(arr));