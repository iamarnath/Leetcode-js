/*
657. Robot Return to Origin

Solution -https://leetcode.com/problems/robot-return-to-origin/solutions/5118670/optimised/

Description
There is a robot starting at the position (0, 0), the origin, on a 2D plane. Given a sequence of its moves, judge if this robot ends up at (0, 0) after it completes its moves.

You are given a string moves that represents the move sequence of the robot where moves[i] represents its ith move. Valid moves are 'R' (right), 'L' (left), 'U' (up), and 'D' (down).

Return true if the robot returns to the origin after it finishes all of its moves, or false otherwise.

Note: The way that the robot is "facing" is irrelevant. 'R' will always make the robot move to the right once, 'L' will always make it move left, etc. Also, assume that the magnitude of the robot's movement is the same for each move.

 

Example 1:

Input: moves = "UD"
Output: true
Explanation: The robot moves up once, and then down once. All moves have the same magnitude, so it ended up at the origin where it started. Therefore, we return true.
Example 2:

Input: moves = "LL"
Output: false
Explanation: The robot moves left twice. It ends up two "moves" to the left of the origin. We return false because it is not at the origin at the end of its moves.
 

Constraints:

1 <= moves.length <= 2 * 104
moves only contains the characters 'U', 'D', 'L' and 'R'.

*/

/*
Approach:
Initialization: The function initializes two variables, x and y, to keep track of the robot's current position. It also creates an object direction that maps each direction ('R', 'L', 'U', 'D') to the corresponding change in the x and y coordinates.
Updating the Robot's Position: The function then iterates through each character in the moves string. For each character, it retrieves the corresponding change in x and y coordinates from the direction object and updates the robot's position accordingly.
Checking the Final Position: After processing all the moves, the function checks if the robot's final position is (0, 0), which would indicate that the robot has returned to its starting position. If the final x and y coordinates are both 0, the function returns true, indicating that the robot has completed a circular path. Otherwise, it returns false.

Time Complexity:
The time complexity of the judgeCircle function is O(n), where n is the length of the moves string.
The function iterates through the moves string once, performing constant-time operations (retrieving the change in coordinates from the direction object and updating the x and y variables) for each character.
The final check for the robot's position at the end of the loop also takes constant time.


Space Complexity:
The space complexity of the judgeCircle function is O(1).
The function uses a constant amount of extra space to store the x and y variables and the direction object, regardless of the size of the input moves string.
The space complexity does not depend on the length of the input string.
*/

var judgeCircle = function (moves) {
    let x = 0, y = 0;
    const direction = {
        'R': [1, 0],
        'L': [-1, 0],
        'U': [0, 1],
        'D': [0, -1]
    }
    for (let move of moves) {
        const [dx, dy] = direction[move];
        // Update the robot's position coordinates
        x += dx;
        y += dy;
    }
    return x === 0 && y === 0;
};

let moves = "UD";
moves = "LL";
console.log(judgeCircle(moves));
