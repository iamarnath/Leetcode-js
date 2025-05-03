/*
417. Pacific Atlantic Water Flow

You are given a rectangular island heights where heights[r][c]
 represents the height above sea level of the cell at coordinate (r, c).
The islands borders the Pacific Ocean from the top and 
left sides, and borders the Atlantic Ocean from the 
bottom and right sides.

Water can flow in four directions (up, down, left, or right)
 from a cell to a neighboring cell with height equal or lower.
  Water can also flow into the ocean from cells adjacent to the ocean.

Find all cells where water can flow from that cell to both
 the Pacific and Atlantic oceans. Return it as a 2D list where
  each element is a list [r, c] representing the row and 
  column of the cell. You may return the answer in any order.

Input: heights = [
  [4,2,7,3,4],
  [7,4,6,4,7],
  [6,3,5,3,6]
]
Output: [[0,2],[0,4],[1,0],[1,1],[1,2],[1,3],[1,4],[2,0]]

Input: heights = [[1],[1]]
Output: [[0,0],[0,1]]

Constraints:

1 <= heights.length, heights[r].length <= 100
0 <= heights[r][c] <= 1000

Input: heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
Explanation: The following cells can flow to the Pacific and Atlantic oceans, as shown below:
[0,4]: [0,4] -> Pacific Ocean 
       [0,4] -> Atlantic Ocean
[1,3]: [1,3] -> [0,3] -> Pacific Ocean 
       [1,3] -> [1,4] -> Atlantic Ocean
[1,4]: [1,4] -> [1,3] -> [0,3] -> Pacific Ocean 
       [1,4] -> Atlantic Ocean
[2,2]: [2,2] -> [1,2] -> [0,2] -> Pacific Ocean 
       [2,2] -> [2,3] -> [2,4] -> Atlantic Ocean
[3,0]: [3,0] -> Pacific Ocean 
       [3,0] -> [4,0] -> Atlantic Ocean
[3,1]: [3,1] -> [3,0] -> Pacific Ocean 
       [3,1] -> [4,1] -> Atlantic Ocean
[4,0]: [4,0] -> Pacific Ocean 
       [4,0] -> Atlantic Ocean
Note that there are other possible paths for these cells to flow to the Pacific and Atlantic oceans.

*/
/*
var pacificAtlantic = function(heights) {
    const rowCount = heights.length;
    const colCount = heights[0].length;
    // Directions for moving up, down, left, or right
    const directions = [
        [1,0], // move down
        [0,1], // move right
        [-1,0], // move up
        [0,-1]  // move left
    ];
    // Grid to track the number of oceans each cell can flow to
    const grid = new Array(rowCount).fill(0).map(()=>new Array(colCount).fill(0));
    // Visited matrix to prevent revisiting cells
    const visited = new Array(rowCount).fill(0).map(()=>new Array(colCount).fill(false));
    // Define the depth-first search function to explore the grid
    const dfs = (row,col) =>{
        if(visited[row][col]){
            return;
        }
        grid[row][col]++;
        visited[row][col] = true;
        const height = heights[row][col];
        // Explore adjacent cells
        for(const [dx,dy] of directions){
            const newRow = row+dx;
            const newCol = col+dy;
            // Check if the adjacent cell is within bounds and its height is higher or equal
            if(height <= (heights[newRow]?.[newCol] ?? -1)){
                dfs(newRow,newCol);
            }
        }
    };

    // Flow from the Pacific Ocean (top and left edges)
    for(let col = 0;col<colCount;col++){
        dfs(0,col);
    }
    for(let row=0;row<rowCount;row++){
        dfs(row,0)
    }
    // Reset visited cells before starting from
    //  the Atlantic Ocean (bottom and right edges)
    visited.forEach(row=>row.fill(false));
    // Flow from the Atlantic Ocean (bottom and right edges)
    for(let col=0;col<colCount;col++){
        dfs(rowCount-1,col);
    }
    for(let row=0;row<rowCount;row++){
        dfs(row,colCount-1);
    }
    // Collect cells where the water can flow to both oceans
    const results =[];
    for(let row=0;row<rowCount;row++){
        for(let col=0;col<colCount;col++){
            if(grid[row][col]===2){
                results.push([row,col]);
            }
        }
    }
    return results;
};
*/
/*
Approach Overview
This solution uses reverse-flow DFS to determine which cells
 can flow to both oceans. Instead of checking every cell's
  path to the oceans, it:

Starts from ocean edges (Pacific top/left, Atlantic bottom/right)

Moves uphill using DFS to mark reachable cells

Finds intersections between Pacific-accessible and Atlantic-accessible cells

*/
var pacificAtlantic = function(heights) {
    const rowCount = heights.length;
    const colCount = heights[0].length;
    /*
    Visit trackers for each ocean
    pac[r][c] = true if cell (r,c) can reach Pacific

    atl[r][c] = true if cell (r,c) can reach Atlantic
    */
    let pacific = Array.from({ length: rowCount }, () => Array(colCount).fill(false));
    let atlantic = Array.from({ length: rowCount }, () => Array(colCount).fill(false));
    // const directions = [-1,0,1,0,-1];
    // Directions for moving up, down, left, or right
    const directions = [
        [-1,0], // move up
        [0,1], // move right
        [1,0], // move down
        [0,-1]  // move left
    ];
       /*
          is a compact way to represent the four cardinal directions 
        (up, right, down, left) for grid traversal.
        How It Works
        The array is used to calculate new coordinates when exploring
         neighbors in a 2D grid (like a board).
        Each pair of consecutive elements represents a direction:
        (dx, dy) for each direction.
       Direction	dx	dy	directions index
        Up	       -1	0	   0, 1
        Right	     0	1	   1, 2
        Down	     1	0	   2, 3
        Left	     0	-1	 3, 4
        */
    //DFS helper that floods reachable cells from (r,c)

//Takes current position (r,c) and ocean tracker (pac or atl)
    const dfs = (r,c,ocean) =>{
        //Mark current cell as reachable for the given ocean
        ocean[r][c] = true;
        for(let [dr,dc] of directions){
            let newRow=r+dr,newCol= c+dc;
            if(newRow>=0 && newRow<rowCount
                && newCol>=0 && newCol<colCount
                && !ocean[newRow][newCol]
                && heights[newRow][newCol] >= heights[r][c]
            ){
                dfs(newRow,newCol,ocean);
            }
        }
    };
    // Flow from the Pacific Ocean (top and left edges)
    for (let col = 0; col < colCount; col++) {
        dfs(0, col,pacific);
    }
    for (let row = 0; row < rowCount; row++) {
        dfs(row, 0,pacific);
    }

    // Flow from the Atlantic Ocean (bottom and right edges)
    for (let col = 0; col < colCount; col++) {
        dfs(rowCount - 1, col,atlantic);
    }
    for (let row = 0; row < rowCount; row++) {
        dfs(row, colCount - 1,atlantic);
    }
   let res= [];
   for(let row=0;row<rowCount;row++){
    for(let col=0;col<colCount;col++){
        if(pacific[row][col] && atlantic[row][col]){
            res.push([row,col])
        }
    }
   }
   return res;
};

let heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]];
let res = pacificAtlantic(heights);
console.log(res)