/*
1496. Path Crossing

Solution - https://leetcode.com/problems/path-crossing/solutions/5118694/optimised2/

Description
Given a string path, where path[i] = 'N', 'S', 'E' or 'W', each representing moving one unit north, south, east, or west, respectively. You start at the origin (0, 0) on a 2D plane and walk on the path specified by path.

Return true if the path crosses itself at any point, that is, if at any time you are on a location you have previously visited. Return false otherwise.

Example 1:

Input: path = "NES"
Output: false 
Explanation: Notice that the path doesn't cross any point more than once.
Example 2:
Input: path = "NESWW"
Output: true
Explanation: Notice that the path visits the origin twice.

Constraints:

1 <= path.length <= 104
path[i] is either 'N', 'S', 'E', or 'W'.
*/
/*
Approach:
Initialization: The function initializes the position array to ``, representing the starting position of the walker. It also creates a Set called visited to keep track of the positions the walker has visited.
Tracking the Path: The function then iterates through the characters in the path string. For each character, it updates the position array based on the direction indicated by the character:
'N': Increase the x-coordinate
'S': Decrease the x-coordinate
'E': Increase the y-coordinate
'W': Decrease the y-coordinate
Checking for Crossing: After updating the position, the function converts the position array to a string using the toString() method. This string is used as a unique identifier for the position, and the function checks if it has already been added to the visited set.
If the position has been visited before, the function returns true, indicating that the path has crossed itself.
If the position has not been visited before, the function adds the position to the visited set.
Returning the Result: If the function completes the loop without finding a crossing, it returns false, indicating that the path does not cross itself.

Time Complexity:

The time complexity of this function is O(n), where n is the length of the input string path. This is because the function iterates through the characters in the path string once.

Space Complexity:
The space complexity of this function is O(n), where n is the length of the input string path. This is because the function uses a Set to store the visited positions, and the maximum number of unique positions the walker can visit is equal to the length of the path string.
In the worst-case scenario, the walker visits a unique position for each character in the path string, and the visited set will contain n elements.
Overall, this approach is efficient in both time and space complexity, as it uses a simple data structure (a Set) to keep track of the visited positions and performs a single pass through the input string.


*/
var isPathCrossing = function (path) {
    let position = [0, 0];
    //position[0] is x-coordinate and position[1] is y-coordinate
    const visited = new Set();
    visited.add(position.toString());

    for (const direction of path) {
        switch (direction) {
            case 'N': // North increases the x coordinate
                position[0]++;
                break;
            case 'S': // South decreases  the x coordinate
                position[0]--;
                break;
            case 'E': // East increases  the x coordinate
                position[1]++;
                break;
            case 'W': // East increases  the x coordinate
                position[1]--;
                break;
        }
        // Convert the tuple to a string to create a unique identifier for the position
        const posKey = position.toString();
        // If the position has been visited, return true and exit
        if (visited.has(posKey)) {
            return true;
        }
        // Add the new position to the visited set
        visited.add(posKey)

    }
    // If no crossing paths are detected, return false
    return false;
}

let path = "NESWW";
path = "NES"
console.log(isPathCrossing(path));