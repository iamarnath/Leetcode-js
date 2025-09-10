/*
778. Swim In Rising Water

You are given a square 2-D matrix of distinct integers
 grid where each integer grid[i][j] represents the
  elevation at position (i, j).

Rain starts to fall at time = 0, which causes the water 
level to rise. At time t, the water level across the entire grid is t.

You may swim either horizontally or vertically
 in the grid between two adjacent squares if the
  original elevation of both squares is less than
   or equal to the water level at time t.

Starting from the top left square (0, 0),
 return the minimum amount of time it will take until
  it is possible to reach the bottom right square (n - 1, n - 1).

Example 1:



Input: grid = [[0,1],[2,3]]

Output: 3
Explanation: For a path to exist to the bottom right
 square grid[1][1] the water elevation must be at least 3. 
 At time t = 3, the water level is 3.

Example 2:



Input: grid = [
  [0,1,2,10],
  [9,14,4,13],
  [12,3,8,15],
  [11,5,7,6]]
]

Output: 8
Explanation: The water level must be at least 8 to reach
 the bottom right square. The path is [0, 1, 2, 4, 8, 7, 6].

Constraints:

grid.length == grid[i].length
1 <= grid.length <= 50
0 <= grid[i][j] < n^2

*/
/*
Approach: Binary Search + DFS
Binary Search on Time T:

The minimum time T to swim ranges from 0 to n*n - 1 (maximum elevation possible).

We use binary search on this range to guess a candidate time mid.

For each candidate mid, we check if it is possible to reach the destination with the current time limit mid.

DFS to Check Reachability (reachableOrNot):

Given a time T, we try to see if we can reach (n-1, n-1) starting from (0,0) by only moving through cells with elevation ≤ T.

We perform DFS, marking visited cells to avoid cycles.

If we reach the destination, return true.

Otherwise, return false.

Adjusting Binary Search Range:

If reachable at mid, try to find a smaller time by setting high = mid.

Else, increase time by setting low = mid + 1.

Return the final low as the minimum time required.

Key Points in Code
dirs defines the four possible directions to move.

visited is a 2D boolean array to mark cells already explored in the current DFS.

The DFS only proceeds if both the current cell and the next cell have elevation ≤ T.

Binary search narrows down the minimum feasible time.

Time and Space Complexity
Time Complexity:
Binary search runs in O(log(n^2)) = O(2 * log n) = O(log n).
For each binary search step, DFS can explore up to all cells O(n^2).
So total complexity:
O(n^2 * log n)
Space Complexity:
The visited array uses O(n^2) space.
The recursion stack in DFS can go up to O(n^2) in the worst case.

*/
const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];

function reachableOrNot(T, grid, N, i, j, visited) {
    if (i === N - 1 && j === N - 1) {
        return true;
    }
    visited[i][j] = true;
    for (const dir of dirs) {
        const new_i = i + dir[0];
        const new_j = j + dir[1];
        if (
            new_i >= 0 && new_i < N &&
            new_j >= 0 && new_j < N &&
            !visited[new_i][new_j] &&
            grid[i][j] <= T &&
            grid[new_i][new_j] <= T
        ) {
            if (reachableOrNot(T, grid, N, new_i, new_j, visited)) {
                return true;
            }
        }
    }
    return false;
}

function swimInWater(grid) {
    const n = grid.length;
    let low = 0, high = n*n - 1;
    while (low < high) {
        const mid = Math.floor(low + (high - low) / 2);
        const visited = Array.from({ length: n }, () => Array(n).fill(false));
        if (reachableOrNot(mid, grid, n, 0, 0, visited)) {
            high = mid;
        }
        else {
            low = mid + 1;
        }
    }
    return low;
}

//let grid = [[0, 2], [1, 3]];
let grid = [[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]];
let res = swimInWater(grid);
console.log("swimInWater==", res);