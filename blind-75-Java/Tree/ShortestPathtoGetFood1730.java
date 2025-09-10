/*
 * 1730. Shortest Path to Get Food
Level
Description
You are starving and you want to eat food as quickly as possible. You want to find the shortest path to arrive at any food cell.

You are given an m x n character matrix, grid, of these different types of cells:

'*' is your location. There is exactly one '*' cell.
'#' is a food cell. There may be multiple food cells.
'O' is free space, and you can travel through these cells.
'X' is an obstacle, and you cannot travel through these cells.
You can travel to any adjacent cell north, east, south, or west of your current location if there is not an obstacle.

Return the length of the shortest path for you to reach any food cell. If there is no path for you to reach food, return -1.

Example 1:

Image text

Input: grid = [[“X”,”X”,”X”,”X”,”X”,”X”],[“X”,”*”,”O”,”O”,”O”,”X”],[“X”,”O”,”O”,”#”,”O”,”X”],[“X”,”X”,”X”,”X”,”X”,”X”]]

Output: 3

Explanation: It takes 3 steps to reach the food.

Example 2:

Image text

Input: grid = [[“X”,”X”,”X”,”X”,”X”],[“X”,”*”,”X”,”O”,”X”],[“X”,”O”,”X”,”#”,”X”],[“X”,”X”,”X”,”X”,”X”]]

Output: -1

Explanation: It is not possible to reach the food.

Example 3:

Image text

Input: grid = [[“X”,”X”,”X”,”X”,”X”,”X”,”X”,”X”],[“X”,”*”,”O”,”X”,”O”,”#”,”O”,”X”],[“X”,”O”,”O”,”X”,”O”,”O”,”X”,”X”],[“X”,”O”,”O”,”O”,”O”,”#”,”O”,”X”],[“X”,”X”,”X”,”X”,”X”,”X”,”X”,”X”]]

Output: 6

Explanation: There can be multiple food cells. It only takes 6 steps to reach the bottom food.

Example 4:

Input: grid = [[“O”,”*”],[”#”,”O”]]

Output: 2

Example 5:

Input: grid = [[“X”,”*”],[”#”,”X”]]

Output: -1

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 200
grid[row][col] is '*', 'X', 'O', or '#'.
The grid contains exactly one '*'
 * 
*/

import java.util.ArrayDeque;
import java.util.Deque;

public class ShortestPathtoGetFood1730 {
    public int getFood(char[][] grid) {
        int rows = grid.length, cols = grid[0].length;
        boolean[][] visited = new boolean[rows][cols];
        Deque<int[]> queue = new ArrayDeque<>();
        /*
         * Loops through the entire grid to find the position of * (the starting cell).
            When found:
            Adds it to the BFS queue.
            Marks it as visited.
            break only breaks the inner loop. (If there are multiple *, only the first one found is used.)
         * 
        */
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (grid[i][j] == '*') {
                    queue.offer(new int[] { i, j });
                    visited[i][j] = true;
                    break;
                }
            }
        }
        //steps: Counter for how many moves it takes to reach #.
        //directions: Array specifying the four possible moves: up, down, left, right (row/col deltas).
        int steps = 0;
        int[][] directions = { { -1, 0 }, { 1, 0 }, { 0, -1 }, { 0, 1 } };
        // Loop until there is nowhere else to explore, i.e., the queue is empty.
        while (!queue.isEmpty()) {
            // At each step, process all cells that can be reached in the current number of moves (level by level).
            int size = queue.size();
            //Loop over the current BFS level.
            for (int i = 0; i < size; i++) {
                //Get (and remove) the next cell to process.
                int[] cell = queue.poll();
                //Current cell’s coordinates.
                int row = cell[0], column = cell[1];
                //If current cell is food (#), return steps (the number of moves taken).
                if (grid[row][column] == '#') {
                    return steps;
                }
                //For each possible direction (up, down, left, right):
                for (int[] direction : directions) {
                    //Compute new position: newRow, newColumn.
                    int newRow = row + direction[0], newColumn = column + direction[1];
                    //Check if new position is inside grid, is not a wall, and is not visited:
                    //If yes, mark as visited and add to the queue.
                    if (newRow >= 0 && newRow < rows && 
                        newColumn >= 0 && newColumn < cols
                            && grid[newRow][newColumn] != 'X' && 
                            !visited[newRow][newColumn]) {
                       
                        visited[newRow][newColumn] = true;
                        queue.offer(new int[] { newRow, newColumn });
                    }
                }
            }
            //After processing all cells at current step, increment steps: steps++
            steps++;
        }
        return -1;
    }

    public static void main(String[] args) {
        // char[][] grid = {
        //         { 'X', 'X', 'X', 'X', 'X','X','X','X' },
        //         { 'X', '*', 'O', 'X', 'O','#','O','X' },
        //         { 'X', 'O', 'O', 'X', 'O','O','X','X' },
        //         { 'X', 'O', 'O', 'O', 'O','#','O','X' },
        //         { 'X', 'X', 'X', 'X', 'X','X','X','X' }
        // };
        char[][] grid = {
                { 'X', 'X', 'X', 'X', 'X','X' },
                { 'X', '*', 'O', 'O', 'O','X' },
                { 'X', 'O', 'O', '#', 'O','X' },
                { 'X', 'X', 'X', 'X', 'X','X' }
        };
        ShortestPathtoGetFood1730 sol = new ShortestPathtoGetFood1730();
        int result = sol.getFood(grid);
        System.out.println("Shortest path to get food: " + result);
    }
}


/*
 * public class ShortestPathtoGetFood1730 {
    private int[] directions = { -1, 0, 1, 0, -1 };

    public int getFood(char[][] grid) {
        int rows = grid.length, cols = grid[0].length;
        Deque<int[]> queue = new ArrayDeque<>();
        // Search for the starting point represented by '*' and add it to the queue
        for (int i = 0; i < rows; ++i) {
            for (int j = 0; j < cols; ++j) {
                if (grid[i][j] == '*') {
                    queue.offer(new int[] { i, j });
                    break; // Exit the loop once the starting point is found
                }
            }
        }

        // Initialize number of steps taken to reach the food
        int steps = 0;

        // Perform BFS (Breadth-First Search) to find the shortest path to the food
        while (!queue.isEmpty()) {
            ++steps; // Increment steps at the start of each level of BFS
            for (int size = queue.size(); size > 0; --size) {
                // Poll the current position from the queue
                int[] position = queue.poll();

                // Explore all possible next positions using the predefined directions
                for (int k = 0; k < 4; ++k) {
                    int x = position[0] + directions[k];
                    int y = position[1] + directions[k + 1];
                    // Ensure the next position is within the grid boundaries
                    if (x >= 0 && x < rows && y >= 0 && y < cols) {
                        // Check if the food ('#') is found at the current position
                        if (grid[x][y] == '#') {
                            return steps; // Return the number of steps taken
                        }
                        // Mark visited paths as 'X' and add the new cell to the queue if it's open
                        // ('O')
                        if (grid[x][y] == 'O') {
                            grid[x][y] = 'X';
                            queue.offer(new int[] { x, y });
                        }
                    }
                }
            }
        }
        // Return -1 if the food cannot be reached
        return -1;
    }

    public static void main(String[] args) {
        
        // char[][] grid = {
        //         { 'X', 'X', 'X', 'X', 'X','X' },
        //         { 'X', '*', 'O', 'O', 'O','X' },
        //         { 'X', 'O', 'O', '#', 'O','X' },
        //         { 'X', 'X', 'X', 'X', 'X','X' }
        // };
        //  [[“X”,”X”,”X”,”X”,”X”,”X”,”X”,”X”],
        //  [“X”,”*”,”O”,”X”,”O”,”#”,”O”,”X”],
        //  [“X”,”O”,”O”,”X”,”O”,”O”,”X”,”X”],
        //  [“X”,”O”,”O”,”O”,”O”,”#”,”O”,”X”],
        //  [“X”,”X”,”X”,”X”,”X”,”X”,”X”,”X”]]
        char[][] grid = {
                { 'X', 'X', 'X', 'X', 'X','X','X','X' },
                { 'X', '*', 'O', 'X', 'O','#','O','X' },
                { 'X', 'O', 'O', 'X', 'O','O','X','X' },
                { 'X', 'O', 'O', 'O', 'O','#','O','X' },
                { 'X', 'X', 'X', 'X', 'X','X','X','X' }
        };
        ShortestPathtoGetFood1730 sol = new ShortestPathtoGetFood1730();
        int result = sol.getFood(grid);
        System.out.println("Shortest path to get food: " + result); // Should print 6
    }
}

 * 
*/

//javascript code

/*
 class ShortestPathToGetFood {
    getFood(grid) {
        const rows = grid.length, cols = grid[0].length;
        const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
        const queue = [];

        // Find the starting point (‘*’)
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (grid[i][j] === '*') {
                    queue.push([i, j]);
                    visited[i][j] = true;
                    break; // only breaks inner loop
                }
            }
        }

        let steps = 0;
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // up, down, left, right

        // BFS
        while (queue.length > 0) {
            const size = queue.length;
            for (let i = 0; i < size; i++) {
                const [row, col] = queue.shift();

                // Found food
                if (grid[row][col] === '#') {
                    return steps;
                }

                for (const [dr, dc] of directions) {
                    const newRow = row + dr, newCol = col + dc;
                    if (
                        newRow >= 0 && newRow < rows &&
                        newCol >= 0 && newCol < cols &&
                        grid[newRow][newCol] !== 'X' &&
                        !visited[newRow][newCol]
                    ) {
                        visited[newRow][newCol] = true;
                        queue.push([newRow, newCol]);
                    }
                }
            }
            steps++;
        }

        return -1; // No path found
    }
}

// Example usage
const grid = [
    ['X', 'X', 'X', 'X', 'X', 'X'],
    ['X', '*', 'O', 'O', 'O', 'X'],
    ['X', 'O', 'O', '#', 'O', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X']
];

const solver = new ShortestPathToGetFood();
const result = solver.getFood(grid);
console.log("Shortest path to get food:", result);
 
 
*/