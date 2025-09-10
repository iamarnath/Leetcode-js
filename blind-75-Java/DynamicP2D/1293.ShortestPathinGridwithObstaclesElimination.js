/*
1293. Shortest Path in a Grid with Obstacles Elimination
You are given an m x n integer matrix grid where 
each cell is either 0 (empty) or 1 (obstacle). 
You can move up, down, left, or right from and to an empty cell in one step.

Return the minimum number of steps to walk from
 the upper left corner (0, 0) to the lower right corner 
 (m - 1, n - 1) given that you can eliminate at most k obstacles.
  If it is not possible to find such walk return -1.

Example 1:

Input: grid = [[0,0,0],[1,1,0],[0,0,0],[0,1,1],[0,0,0]], k = 1
Output: 6
Explanation: 
The shortest path without eliminating any obstacle is 10.
The shortest path with one obstacle elimination at
 position (3,2) is 6. Such path is 
 (0,0) -> (0,1) -> (0,2) -> (1,2) -> (2,2) -> (3,2) -> (4,2).
Example 2:


Input: grid = [[0,1,1],[1,1,1],[1,0,0]], k = 1
Output: -1
Explanation: We need to eliminate at least 
two obstacles to find such a walk.
 
Constraints:
m == grid.length
n == grid[i].length
1 <= m, n <= 40
1 <= k <= m * n
grid[i][j] is either 0 or 1.
grid[0][0] == grid[m - 1][n - 1] == 0

*/
/*
Time Complexity
States: For each cell 

(i,j), and for each value of obstacles left (

0≤obs≤k), there is a possible state.

Total states: 

O(m×n×k)

Each state is processed once: Each involves constant-time operations.

Total time: 

O(m×n×k).

Space Complexity
Visited array: 

O(m×n×k)

BFS queue: At most contains 

O(m×n×k) elements (in worst case).

Total space: 

O(m×n×k).


*/
//Declares the function shortestPath that takes a grid and an integer k
//  (the number of obstacles you can eliminate) as inputs.
//m and n store the number of rows and columns in the grid.
// approach 1
var shortestPathMII = function(grid, k) {
    const m = grid.length;
    const n = grid[0].length;
    //Defines movement vectors for up, left, down, and right directions.

    const directions = [[-1, 0], [0, -1], [1, 0], [0, 1]];
    //Initializes a queue for BFS traversal.
    //  Each queue element stores current row, column,
    //  and obstacles left to eliminate.
    const queue = [];
    //Starts from the top-left corner (0, 0)
    //  with all k eliminations available.
    queue.push([0, 0, k]);

    // visited[m][n][remaining_k]
    //Creates a 3D visited array to track cells visited
    //  with a certain number of eliminations left:
    //  visited[row][column][obstacles_left].
    const visited = Array.from({ length: m }, () =>
        Array.from({ length: n }, () =>
            Array(k + 1).fill(false)
        )
    );
    //Marks the start cell as visited and initializes step counter.
    visited[0][0][k] = true;
    let steps = 0;
    //Begins BFS main loop: Each level in BFS processes 
    // all positions reachable with the current step count.
    while (queue.length > 0) {
        //Dequeues current cell position and remaining obstacle eliminations.
        let size = queue.length;
        while (size--) {
            //If the goal (bottom-right) is reached, 
            // returns current step count.
            const [curr_i, curr_j, obs] = queue.shift();

            if (curr_i === m - 1 && curr_j === n - 1) {
                return steps;
            }
            //Explores all four directions—skips moves 
            // that go out of grid boundaries.

            for (let [dx, dy] of directions) {
                const new_i = curr_i + dx;
                const new_j = curr_j + dy;

                if (new_i < 0 || new_i >= m || new_j < 0 || new_j >= n) {
                    continue;
                }
                //If the adjacent cell is empty (0) and unvisited, 
                // enqueue new state with same number of obstacles left.
                if (grid[new_i][new_j] === 0 && !visited[new_i][new_j][obs]) {
                    queue.push([new_i, new_j, obs]);
                    visited[new_i][new_j][obs] = true;
                    //If the adjacent cell is an obstacle (1) and obstacles remaining > 0, 
                    // enqueue new state with one fewer elimination left.
                } else if (grid[new_i][new_j] === 1 && obs > 0 && !visited[new_i][new_j][obs - 1]) {
                    queue.push([new_i, new_j, obs - 1]);
                    //Each cell's (i, j, remaining k) state is visited at most once.
                    visited[new_i][new_j][obs - 1] = true;
                }
            }
        }
        //Increments steps after each BFS level.
        steps++;
    }
    //If destination can’t be reached, returns -1.
    return -1;
}
/*
The time complexity and space complexity of the shortestPath function (with obstacles elimination using BFS) are as follows:

Time Complexity
Let 
m = number of rows, 
n = number of columns, 
k = allowed obstacle eliminations.

Each cell 

(x,y) can be visited up to 

k+1 times (with 0 to 

k obstacles eliminated so far).

For each state (unique triple 

(x,y,obstacles_used)), the code performs constant-time operations: 
check, update, enqueue.

So,
Time Complexity:

O(m⋅n⋅k)
This is because there are up to 

m×n×(k+1) unique states and each one is processed only once.

Space Complexity
The obs array (obstacles record) uses 

O(mn) space.

The BFS queue can, in the worst case, hold all possible states: up to 

O(m⋅n⋅k).

Other space (variables/directions) is negligible compared to those.

So,
Space Complexity:

O(m⋅n⋅k)
*/
// approach 2
var shortestPath = function(grid, k) {
    // grid: 2D int array, where 0 = free cell, 1 = obstacle
    // k: max number of obstacles that can be eliminated
    const m = grid.length;  // Number of rows in the grid
    const n = grid[0].length;  // Number of columns in the grid

    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]]; // Directions for up, down, left, right

    // obs stores for each cell the minimal number of obstacles we've eliminated to reach it
    //This creates a 2D array of the same size as the grid, with every cell initialized to Infinity.

    // Why use Infinity?
    // obs[x][y] holds the minimal number of obstacles
    //  eliminated to reach cell (x, y).
    // At the start, no cell has been visited, so 
    // the "least obstacles needed" is conceptually infinite—it's unreachable.
    // As the algorithm progresses, obs[x][y] is 
    // updated with the fewest obstacles needed so far to reach that cell.
    // This ensures that any new path reaching a
    //  cell with more or equal obstacles than 
    // before is ignored, preventing suboptimal or redundant exploration.

    const obs = Array.from({ length: m }, () => Array(n).fill(Infinity));

    // Initialize queue with [x, y, obstacles eliminated]
    const queue = [];
    queue.push([0, 0, 0]); // Start from (0,0) with 0 obstacles eliminated

    obs[0][0] = 0; // At start: 0 obstacles eliminated

    let steps = 0; // Number of moves taken
    console.log("obs1 =",obs);
    while (queue.length > 0) {
        // BFS: For all nodes at the current level
        let size = queue.length;

        while (size--) {
            const [x, y, obstacles] = queue.shift(); // dequeue current node

            // Check if reached the destination
            if (x === m - 1 && y === n - 1) {
                return steps;
            }

            // Explore all 4 directions
            for (let [dx, dy] of dirs) {
                const newX = x + dx;
                const newY = y + dy;

                // Check if new coordinates are inside grid
                if (newX >= 0 && newX < m && newY >= 0 && newY < n) {
                    // Compute number of obstacles after stepping to new cell
                    const newObstacles = obstacles + grid[newX][newY];
                 
                    // If already reached this cell with fewer or equal eliminations, or exceed k, skip
                    if (newObstacles >= obs[newX][newY] || newObstacles > k) continue;
                   
                    // Otherwise, update obs and enqueue new state
                    obs[newX][newY] = newObstacles;
                    queue.push([newX, newY, newObstacles]);
                }
            }
        }

        steps++; // Increment the length of the path
    }

    return -1; // If queue is empty and goal not reached, return -1
}
let grid = [[0,0,0],[1,1,0],[0,0,0],[0,1,1],[0,0,0]], k = 1;
let res = shortestPath(grid,k);
console.log("result==",res);