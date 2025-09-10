/*
1329. Sort the Matrix Diagonally

A matrix diagonal is a diagonal line of cells 
starting from some cell in either the topmost row or 
leftmost column and going in the bottom-right direction
 until reaching the matrix's end. For example, the 
 matrix diagonal starting from mat[2][0], where 
 mat is a 6 x 3 matrix, includes cells mat[2][0], mat[3][1], and mat[4][2].

Given an m x n matrix mat of integers, sort each
 matrix diagonal in ascending order and return the resulting matrix.

Example 1:


Input: mat = [[3,3,1,1],[2,2,1,2],[1,1,1,2]]
Output: [[1,1,1,1],[1,2,2,2],[1,2,3,3]]
Example 2:

Input: mat = [[11,25,66,1,69,7],[23,55,17,45,15,52],[75,31,36,44,58,8],[22,27,33,25,68,4],[84,28,14,11,5,50]]
Output: [[5,17,4,1,52,7],[11,11,25,45,8,69],[14,23,25,44,58,15],[22,27,31,36,50,66],[84,28,75,33,55,68]]
 

Constraints:

m == mat.length
n == mat[i].length
1 <= m, n <= 100
1 <= mat[i][j] <= 100

*/
/*
Time Complexity
Grouping elements by diagonal: 
O(mn) as each entry in the matrix is visited once.

Sorting diagonals: Each diagonal may have up to 
O(min(m,n)) elements, so sorting all diagonals takes 
O(D⋅LlogL), where 
D is the number of diagonals and 
L is the length of the largest diagonal.

In total, sorting cost is dominated by 
O(mnlogL).

Filling elements back: 
O(mn) for placing sorted elements.

Overall Time Complexity:
O(mnlogL)
where 
L=min(m,n).

Space Complexity
Map storage: An extra array for every diagonal, total elements: 

O(mn).

Auxiliary storage for diagonals plus matrix itself: Also 
O(mn).

Total Space Complexity:

O(mn)
since diagonals collectively cover all matrix elements.

References
Map and sort approach: Efficient and concise way to sort matrix diagonals.

Complexity: Both time and space are efficient for large matrices, only linearithmic due to sort.

Step	Complexity	Description
Grouping diagonals	O(mn)	One pass through matrix
Sorting arrays	O(mn log L)	Each diagonal sorted
Filling matrix	O(mn)	One pass to fill sorted entries
Overall:

Time: 
O(mnlogL)

Space: 

O(mn)

*/
var diagonalSort = function(mat) {
    //Creates a function diagonalSort that accepts a matrix mat as input.
    // m: Number of rows in the matrix.
    // n: Number of columns.
    const m = mat.length;
    const n = mat[0].length;
    //Initializes an empty Map to store all the diagonals.
    //  Each key is the difference i - j (row index minus column index),
    //  and the value is an array of elements in that diagonal.
    const mp = new Map();

    // store diagonal elements
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            //Computes the diagonal key as i - j, 
            // which uniquely identifies each diagonal.
            const key = i - j;
            //If the map does not have this key, creates a new array.
            if (!mp.has(key)) mp.set(key, []);
            //Pushes the element mat[i][j] into the 
            // array for its corresponding diagonal.
            mp.get(key).push(mat[i][j]);
        }
    }

    // sort them
    //Iterates over each entry in the map.
    //Sorts each diagonal's array in ascending order.
    for (let [_, arr] of mp.entries()) {
        arr.sort((a, b) => a - b);
    }

    // put them back in sorted fashion
    //Iterates backwards through the matrix (from bottom-right to top-left).
    //For each element, retrieves its corresponding diagonal array from the map.
    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            //Assigns the last element of the sorted array (arr.pop()) back into the matrix position.
            const key = i - j;
            const arr = mp.get(key);
            //This backward traversal ensures elements are filled 
            // correctly, as .pop() removes the smallest remaining
            //  element (since the array was sorted in ascending order).
            mat[i][j] = arr.pop();
        }
    }

    return mat;
};


let mat = [[3,3,1,1],[2,2,1,2],[1,1,1,2]];
let res = diagonalSort(mat);
console.log("diagonalSort==",res);