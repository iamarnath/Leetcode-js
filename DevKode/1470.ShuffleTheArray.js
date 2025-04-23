/*
https://leetcode.com/problems/shuffle-the-array/solutions/5059385/shuffle-using-javascript/

1470. Shuffle the Array
Description
Given the array nums consisting of 2n elements in the form [x1,x2,...,xn,y1,y2,...,yn].

Return the array in the form [x1,y1,x2,y2,...,xn,yn].

Example 1:

Input: nums = [2,5,1,3,4,7], n = 3

Output: [2,3,5,4,1,7] 

Explanation: Since x1=2, x2=5, x3=1, y1=3, y2=4, y3=7 then the answer is [2,3,5,4,1,7].

Example 2:

Input: nums = [1,2,3,4,4,3,2,1], n = 4

Output: [1,4,2,3,3,2,4,1]

Example 3:

Input: nums = [1,1,2,2], n = 2

Output: [1,2,1,2]

 
*/

/*

The time complexity of the shuffle function is O(n), where n is the length of the first half of the input array nums. This is because the function iterates through the first half of the input array once to create the shuffled array ans.
The space complexity of the function is O(n), where n is the length of the input array nums. This is because the function creates a new array ans to store the shuffled elements of the input array. The size of this array is proportional to the size of the input array, resulting in a space complexity of O(n).
It's worth noting that the time complexity of the push method used in the function is O(1), as it's a constant time operation. Therefore, the time complexity of the function is determined by the number of iterations of the loop, which is proportional to the length of the first half of the input array.
*/
function shuffle(nums, n) {
    let result = [];
    for (let i = 0; i < n; i++) {
        result.push(nums[i], nums[n + i]);
    }
    return result;
}

//let nums = [2, 5, 1, 3, 4, 7], n = 3

//Output: [2,3,5,4,1,7] 

let nums = [1,2,3,4,4,3,2,1], n = 4
//Output: [1,4,2,3,3,2,4,1]

console.log(shuffle(nums, n));