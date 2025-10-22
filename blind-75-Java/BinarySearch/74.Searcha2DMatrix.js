/*
74. Search a 2D Matrix
You are given an m x n integer matrix matrix
 with the following two properties:

Each row is sorted in non-decreasing order.
The first integer of each row is greater than
 the last integer of the previous row.
Given an integer target, return true if 
target is in matrix or false otherwise.

You must write a solution in O(log(m * n)) time complexity.

 

Example 1:


Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
Output: true
Example 2:


Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
Output: false
 

Constraints:

m == matrix.length
n == matrix[i].length
1 <= m, n <= 100
-104 <= matrix[i][j], target <= 104

*/


var searchMatrixOld = function(matrix, target) {
    const rowCount = matrix.length;
    const columnCount = matrix[0].length;
  
    let leftBoundary = 0;
    let rightBoundary = rowCount * columnCount;
  
    while (leftBoundary < rightBoundary) {
        const middleIndex =Math.floor(leftBoundary+ (rightBoundary- leftBoundary) / 2);
        const rowIndex = Math.floor(middleIndex / columnCount);
        const columnIndex = middleIndex % columnCount;
  
        if (matrix[rowIndex][columnIndex] === target) {
            return true;
        }
  
        if (matrix[rowIndex][columnIndex] < target) {
            leftBoundary = middleIndex + 1;
        } else {
            rightBoundary = middleIndex;
        }
    }
  
    return false;
};
/*
Time Complexity
The algorithm runs in 

O(log(m×n)) time, because it performs binary search over all 

m×n elements.

Equivalently, it is 

O(logN), where 

N is the total number of elements.

Space Complexity
The space complexity is 

O(1) since only a constant number of variables are used
 for index calculations and no auxiliary data structures are needed

*/
var searchMatrix = function(matrix, target) {
    //Calculates m as the number of rows,
    //  and n as the number of columns in the matrix
    //Assumes matrix is non-empty and each row has equal length.
    let m = matrix.length;
    let n = matrix[0].length;
    //Initializes a virtual start index at 0 and end 
    // index at the last item (total elements minus 1).
    //  The idea is to treat the 2D matrix as a flattened 
    // 1D array for binary search.
    let start = 0;
    let end = m * n - 1;
    //Begins the binary search loop, running while the search area is valid.
    while (start <= end) {
        //Calculates the mid-point in the virtual 1D array 
        // using integer division for proper indexing.
        let mid = Math.floor(start + (end - start) / 2);
        //Translates the virtual mid index into 2D coordinates: row and col for the matrix.
        //Example: With n = 4, if mid = 7, then row = 1, col = 3.
        let row = Math.floor(mid / n);
        let col = mid % n;
        //Compares the current value (matrix[row][col]) to the target:
        //If greater, search the left half.
        if (matrix[row][col] > target) {
            end = mid - 1;
            //If less, search the right half.
        } else if (matrix[row][col] < target) {
            start = mid + 1;
            //If equal, returns true (found).
        } else {
            return true;
        }
    }
    //If the loop ends without finding the value, returns false.
    return false;
}

