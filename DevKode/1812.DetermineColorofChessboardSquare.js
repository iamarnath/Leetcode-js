/*

1812. Determine Color of a Chessboard Square

Solution - https://leetcode.com/problems/determine-color-of-a-chessboard-square/solutions/5147924/optimised/

Description
You are given coordinates, a string that represents the coordinates of a square of the chessboard. Below is a chessboard for your reference.

Return true if the square is white, and false if the square is black.

The coordinate will always represent a valid chessboard square. The coordinate will always have the letter first, and the number second.

Example 1:
Input: coordinates = "a1"
Output: false
Explanation: From the chessboard above, the square with coordinates "a1" is black, so return false.
Example 2:

Input: coordinates = "h3"
Output: true
Explanation: From the chessboard above, the square with coordinates "h3" is white, so return true.
Example 3:

Input: coordinates = "c7"
Output: false
 

Constraints:

coordinates.length == 2
'a' <= coordinates[0] <= 'h'
'1' <= coordinates[1] <= '8'


*/
/*
Approach

The function takes a string coordinates as input, which represents the position of a square on a chessboard.
Inside the function, we calculate the x-coordinate by converting the character to its ASCII code using charCodeAt(), subtracting the ASCII code of 'a' to get the value from 0 to 7.
The y-coordinate is obtained by converting the second character of the coordinates string to its ASCII code using charCodeAt(), subtracting the ASCII code of '0' to get the value from 0 to 9.
We check if both x and y are odd or both are even. If either condition is true, the square is white, and the function returns true. Otherwise, it returns false.
Note that in JavaScript, we use charCodeAt() to get the ASCII code of a character, and the modulo operator % is used to check if a number is odd or even.

Time Complexity:
The time complexity of the function is 

O(1) because the operations performed are constant and do not depend on the size of the input.
The function calculates the x and y coordinates based on the input string, performs a few arithmetic operations, and then checks conditions to determine if the square is white or not.
Regardless of the input size, the function will execute in constant time, making it 

O(1).
Space Complexity:
The space complexity of the function is also 

O(1) as it does not use any additional space that grows with the input size.
The function only creates two integer variables to store the x and y coordinates, which are constant in terms of space usage.
Since the function does not utilize any data structures or recursive calls that would increase space requirements with the input size, the space complexity remains constant at 
O(1)

*/

var squareIsWhite = function (coordinates) {
    let x = coordinates.charCodeAt(0) - 'a'.charCodeAt(0);
    let y = coordinates.charCodeAt(1) - '0'.charCodeAt(0);
    if ((x % 2 !== 0 && y % 2 !== 0) || (x % 2 === 0 && y % 2 === 0)) {
        return true;
    } else {
        return false;
    }
};

coordinates = "a1";
coordinates = "h3";
coordinates = "c7"
console.log(squareIsWhite(coordinates));