/*
Multi source BFS - when you need to compute shortest distance
or minimum cost or minimum time from multiple starting point to
other points in the grid/graph
multi source BFS ensures that all nodes are reached with the 
minimal distance/time from nearest source

DFS can't be used as it does not guarantee to visit nodes
in shortest time/distance

994. Rotting Oranges

You are given a 2-D matrix grid. Each cell can have
 one of three possible values:

0 representing an empty cell
1 representing a fresh fruit
2 representing a rotten fruit
Every minute, if a fresh fruit is horizontally or 
vertically adjacent to a rotten fruit, then the fresh
 fruit also becomes rotten.

Return the minimum number of minutes that must 
elapse until there are zero fresh fruits remaining.
 If this state is impossible within the grid, return -1.

Example 1:

Input: grid = [[1,1,0],[0,1,1],[0,1,2]]

Output: 4
Example 2:

Input: grid = [[1,0,1],[0,2,0],[1,0,1]]

Output: -1
Constraints:

1 <= grid.length, grid[i].length <= 10

*/
/*
Time Complexity
O(m × n): Each cell in the grid is processed at most once. 
The BFS ensures that every fresh orange (1) that can be reached is
 only processed a single time, and each rotten orange (2)
  is only used to rot its neighbors once. 
  Here, m is the number of rows and n is the number of columns in the grid.

Explanation: The algorithm traverses the entire
 grid to count fresh oranges and enqueue rotten 
 ones. During BFS, each cell is visited and 
 processed a constant number of times (once per
  direction, but still O(1) per cell per direction),
   so the total time is linear in the number of cells.

Space Complexity
O(m × n): In the worst case, the BFS queue could contain 
all cells of the grid (if every cell is a rotten orange
 or becomes one during processing). The grid itself is
  already given, so the main extra space is for the queue.

Explanation: The queue can grow to hold all cells if
 they are all rotten at some point, but usually holds
  only a subset at any time. For large grids, this is
   the dominant factor in space usage
*/
function Queue() {
    this.elements = [];
    this.head = 0;
    this.tail = 0;
}
Queue.prototype.enqueue = function(e) { this.elements[this.tail++] = e; };
Queue.prototype.dequeue = function() { return this.elements[this.head++]; };
Queue.prototype.isEmpty = function() { return this.head >= this.tail; };

var orangesRotting = function (grid) {
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    const m = grid.length;
    const n = grid[0].length;
    let queue = [];
    let freshCount = 0;
    // Collect all rotten oranges and count fresh ones
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 2) {
                queue.push([i, j]);
            }
            else if (grid[i][j] === 1) {
                freshCount++;
            }
        }
    }
    if (freshCount === 0) return 0;
    let time = 0;
    while (queue.length > 0) {
        let size = queue.length;
        while (size--) {
            let curr = queue.shift();
            let i = curr[0];
            let j = curr[1];
            for (let dir of directions) {
                let new_i = i + dir[0];
                let new_j = j + dir[1];
                if (new_i >= 0 && new_j >= 0 &&
                    new_i < m && new_j < n &&
                    grid[new_i][new_j] === 1
                ) {
                    grid[new_i][new_j] = 2;
                    queue.push([new_i, new_j]);
                    freshCount--;
                }
            } // end of for
        } // end of inner while
        // Only increment time if we processed any oranges in this minute
        if (queue.length > 0) time++;
    } // end of outer while
    return freshCount === 0 ? time : -1;
};

//let grid = [[1,1,0],[0,1,1],[0,1,2]];
let grid = [[1,0,1],[0,2,0],[1,0,1]];
console.log("orangesRotting==",orangesRotting(grid));