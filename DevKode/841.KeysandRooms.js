/*
841. Keys and Rooms

Solution - https://leetcode.com/problems/keys-and-rooms/solutions/5195697/optimiseddfs/

https://leetcode.com/problems/keys-and-rooms/solutions/5209976/optimised/ 
Iterative approach


Description
There are n rooms labeled from 0 to n - 1 and all the rooms are locked except for room 0. Your goal is to visit all the rooms. However, you cannot enter a locked room without having its key.

When you visit a room, you may find a set of distinct keys in it. Each key has a number on it, denoting which room it unlocks, and you can take all of them with you to unlock the other rooms.

Given an array rooms where rooms[i] is the set of keys that you can obtain if you visited room i, return true if you can visit all the rooms, or false otherwise.

Example 1:

Input: rooms = [[1],[2],[3],[]]
Output: true
Explanation: 
We visit room 0 and pick up key 1.
We then visit room 1 and pick up key 2.
We then visit room 2 and pick up key 3.
We then visit room 3.
Since we were able to visit every room, we return true.
Example 2:

Input: rooms = [[1,3],[3,0,1],[2],[0]]
Output: false
Explanation: We can not enter room number 2 since the only key that unlocks it is in that room.
 

Constraints:

n == rooms.length
2 <= n <= 1000
0 <= rooms[i].length <= 1000
1 <= sum(rooms[i].length) <= 3000
0 <= rooms[i][j] < n
All the values of rooms[i] are unique.


*/
/*
Approach to Check if All Rooms Can Be Visited

The JavaScript function canVisitAllRooms checks if a person can visit all rooms in a building using a depth-first search (DFS) approach. The building is represented by an array rooms, where rooms[i] is an array of keys that open the ith room.
The function uses a boolean array vis to keep track of the rooms that have been visited. It starts by marking room 0 as visited and then recursively visits all rooms that can be reached from room 0 using the keys in rooms. The dfs function is responsible for the recursive DFS traversal.
After the DFS traversal, the function checks if all rooms have been visited by checking if every element in the vis array is true.

The key steps of the approach are:
Initialize a boolean array vis of size n with all elements set to false.
Define a helper function dfs that takes a room index i as input:
If room i has already been visited (i.e., vis[i] is true), return.
Mark room i as visited by setting vis[i] to true.
Recursively visit all rooms that can be reached from room i using the keys in rooms[i].
Call dfs(0) to start the DFS traversal from room 0.
After the DFS traversal, check if all rooms have been visited by checking if every element in the vis array is true using the every method.
Return true if all rooms have been visited, indicating that all rooms can be visited, and false otherwise.

Time Complexity

The time complexity of this function is O(n + m), where n is the number of rooms and m is the total number of keys. This is because the function visits each room once and processes all the keys in the rooms.

Space Complexity

The space complexity is O(n) due to the use of the vis array to keep track of visited rooms. In the worst case, where all rooms are connected, the function needs to store the state of all rooms in the vis array.


*/

function canVisitAllRooms(rooms) {
    const n = rooms.length;
    const vis = Array(n).fill(false);
    const dfs = (i) => {
        if (vis[i]) {
            return;
        }
        vis[i] = true;
        for (const j of rooms[i]) {
            dfs(j)
        }
    };
    dfs(0);
    return vis.every(v => v);
}
/*
# Approach

The canVisitAllRooms function uses a depth-first search (DFS) approach to determine if all rooms in a given set of rooms can be visited starting from room 0. It maintains a stack to keep track of keys to rooms that need to be visited. It iteratively explores rooms by popping keys from the stack, marking rooms as visited, and adding keys from each visited room to the stack until all reachable rooms have been visited or all keys have been exhausted.

# Complexity

- Time complexity:

Let n be the number of rooms and k be the average number of keys in each room.
The time complexity of this function is O(n + k), where n is the number of rooms and k is the total number of keys across all rooms.
In the worst case, every room needs to be visited, and every key in each room needs to be processed, leading to a linear time complexity.

- Space complexity:

The space complexity of this function is O(n), where n is the number of rooms.
The function uses additional space to store the boolean values indicating whether each room has been visited.
It also uses a stack to keep track of keys to be processed, which can grow up to the total number of rooms in the worst case.
Overall, the space complexity is linear in terms of the number of rooms.

*/
function canVisitAllRoomsIter(rooms) {
    const n = rooms.length;
    // Create an array to keep track of whether each room has been opened.
    const isRoomOpen = new Array(n).fill(false);
    // Initialize a stack with the key to the first room (i.e., room 0).
    const stack = [0];
    // Process keys while there are still keys left in the stack.
    while (stack.length != 0) {
        // Retrieve the last key from the stack.
        const currKey = stack.pop();
        // Skip processing if the room has already been opened.
        if (isRoomOpen[currKey]) {
            continue;
        }
        // Mark the current room as opened.
        isRoomOpen[currKey] = true;
        // Add all the keys found in the current room to the stack.
        stack.push(...rooms[currKey]);
    }
    // Check if all rooms have been opened. If so, return true.
    return isRoomOpen.every(open => open);
}
let rooms = [[1], [2], [3], []];
//rooms = [[1, 3], [3, 0, 1], [2], [0]];
console.log(canVisitAllRoomsIter(rooms));
