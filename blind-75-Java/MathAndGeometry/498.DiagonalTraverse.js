/*
498. Diagonal Traverse

Given an m x n matrix mat, return an array of all the 
elements of the array in a diagonal order.

Example 1:


Input: mat = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,4,7,5,3,6,8,9]
Example 2:

Input: mat = [[1,2],[3,4]]
Output: [1,2,3,4]
 
Constraints:

m == mat.length
n == mat[i].length
1 <= m, n <= 104
1 <= m * n <= 104
-105 <= mat[i][j] <= 105

*/
/*
Explanation
Grouping by diagonals:
Elements are grouped by the sum of their indices, i + j.
 All elements on the same diagonal have the same i + j value.

Order of collection:
Each diagonal group is optionally reversed before
 adding to result to achieve the zig-zag pattern.

No class needed:
The function is standalone—just pass the matrix,
 and it returns the diagonal traversal.

Map use:
A JavaScript Map is used to group and order the diagonals 
since iteration order of object keys is not guaranteed.

Time and Space Complexity
Time Complexity:
Every element is visited exactly once for grouping, and once 
more when assembling the result, for a total time of 

O(m×n), where 
m is the number of rows and 
n is the number of columns.

Space Complexity:
The space used by the diagonals map and result array
 is proportional to the number of elements, so 

O(m×n). The auxiliary space (excluding the result) is also 

O(m×n) since we store every element temporarily in a map.

This implementation fully matches the behavior 
and structure of your C++ solution using idiomatic modern JavaScript.



*/
function findDiagonalOrder(mat) {
    if (mat.length === 0 || mat[0].length === 0) return [];

    const m = mat.length, n = mat[0].length;
    const diagonals = new Map();
    const result = [];

    // Fill the diagonals grouped by (i + j)
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const key = i + j;
            if (!diagonals.has(key)) diagonals.set(key, []);
            diagonals.get(key).push(mat[i][j]);
        }
    }
    let flip = true;
    console.log("diagonals--",diagonals)
    for (const [_, arr] of diagonals) {
        if (flip) arr.reverse();
        for (const num of arr) result.push(num);
        flip = !flip;
    }
    return result;
}
let mat = [[1,2,3],[4,5,6],[7,8,9]];

let res = findDiagonalOrder(mat);

console.log("findDiagonalOrder==",res);