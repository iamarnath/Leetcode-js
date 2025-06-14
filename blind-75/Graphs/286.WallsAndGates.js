/*
286. Walls And Gates

You are given a 
m×n 2D grid initialized with these three possible values:

-1 - A water cell that can not be traversed.
0 - A treasure chest.
INF - A land cell that can be traversed.
 We use the integer 2^31 - 1 = 2147483647 to represent INF.
Fill each land cell with the distance
 to its nearest treasure chest. 
 If a land cell cannot reach a treasure 
 chest than the value should remain INF.

Assume the grid can only be traversed up, down, left, or right.

Modify the grid in-place.

Example 1:

Input: [
  [2147483647,-1,0,2147483647],
  [2147483647,2147483647,2147483647,-1],
  [2147483647,-1,2147483647,-1],
  [0,-1,2147483647,2147483647]
]

Output: [
  [3,-1,0,1],
  [2,2,1,-1],
  [1,-1,2,-1],
  [0,-1,3,4]
]
Example 2:

Input: [
  [0,-1],
  [2147483647,2147483647]
]

Output: [
  [0,-1],
  [1,2]
]
Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 100
grid[i][j] is one of {-1, 0, 2147483647}

*/
function wallsAndGates(rooms) {
    const WALL = -1;
    const GATE = 0;
    const EMPTY = 2147483647;
    let queue = [];
    let dir = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    let rows = rooms.length, cols = rooms[0].length;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (rooms[i][j] === GATE) {
                queue.push([i, j]);
            }
        }
    }
    while (queue.length) {
        let current = queue.shift();
        let currentX = current[0];
        let currentY = current[1];
        for (let d of dir) {
            let nextX = currentX + d[0];
            let nextY = currentY + d[1];
            if (nextX < 0 || nextX >= rows ||
                nextY < 0 || nextY >= cols ||
                rooms[nextX][nextY] !== EMPTY
            ) {
                continue;
            }
            rooms[nextX][nextY] = rooms[currentX][currentY] + 1;
            queue.push([nextX, nextY]);
        }
    }
    console.log("rooms==",rooms)
}

// let rooms = [
//     [2147483647, -1, 0, 2147483647],
//     [2147483647, 2147483647, 2147483647, -1],
//     [2147483647, -1, 2147483647, -1],
//     [0, -1, 2147483647, 2147483647]
// ];
let rooms =  [
  [0,-1],
  [2147483647,2147483647]
];

console.log(wallsAndGates(rooms));