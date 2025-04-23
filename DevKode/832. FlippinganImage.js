/*
832. Flipping an Image

Solution - https://leetcode.com/problems/flipping-an-image/solutions/5072112/optimised/

Description

Given an n x n binary matrix image, flip the image horizontally, then invert it, and return the resulting image.

To flip an image horizontally means that each row of the image is reversed.

For example, flipping [1,1,0] horizontally results in [0,1,1].
To invert an image means that each 0 is replaced by 1, and each 1 is replaced by 0.

For example, inverting [0,1,1] results in [1,0,0].
 

Example 1:

Input: image = [[1,1,0],[1,0,1],[0,0,0]]
Output: [[1,0,0],[0,1,0],[1,1,1]]
Explanation: First reverse each row: [[0,1,1],[1,0,1],[0,0,0]].
Then, invert the image: [[1,0,0],[0,1,0],[1,1,1]]
Example 2:

Input: image = [[1,1,0,0],[1,0,0,1],[0,1,1,1],[1,0,1,0]]
Output: [[1,1,0,0],[0,1,1,0],[0,0,0,1],[1,0,1,0]]
Explanation: First reverse each row: [[0,0,1,1],[1,0,0,1],[1,1,1,0],[0,1,0,1]].
Then invert the image: [[1,1,0,0],[0,1,1,0],[0,0,0,1],[1,0,1,0]]
 

Constraints:

n == image.length
n == image[i].length
1 <= n <= 20
images[i][j] is either 0 or 1.

*/
/*
The time complexity of this code is O(n * m), where n is the number of rows and m is the number of columns in the image. The nested loops iterate through each element in the 2D array, resulting in a linear time complexity proportional to the number of elements in the image.

The space complexity of this code is O(1) as it does not use any additional data structures that grow with the input size. The operations are performed in place on the input image array, so the space complexity remains constant regardless of the input size.

*/
var flipAndInvertImage = function (image) {
    const row = image.length;
    const col = image[0].length;
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col / 2; j++) {
            let curr = image[i][j] ^ 1;
            image[i][j] = image[i][col - j - 1] ^ 1;
            image[i][col - j - 1] = curr;
        }
    }
    return image;
};
let image = [[1, 1, 0], [1, 0, 1], [0, 0, 0]];
image = [[1, 1, 0, 0], [1, 0, 0, 1], [0, 1, 1, 1], [1, 0, 1, 0]]
console.log(flipAndInvertImage(image));