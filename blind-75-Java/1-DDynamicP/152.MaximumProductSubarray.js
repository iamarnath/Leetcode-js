/*
152. Maximum Product Subarray
Description
Given an integer array nums, find a subarray that has the largest
 product within the array and return it.

A subarray is a contiguous non-empty sequence of elements within an array.

You can assume the output will fit into a 32-bit integer.

Example 1:

Input: nums = [1,2,-3,4]

Output: 4
Example 2:

Input: nums = [-2,-1]

Output: 2
Constraints:

1 <= nums.length <= 1000
-10 <= nums[i] <= 10
*/
/*
n - 1 is the index of the last element in the array.

n - 1 - i means we start from the last element and move 
backwards towards the first element as i increases.

When i = 0, n - 1 - 0 = n - 1 → last element.

When i = 1, n - 1 - 1 = n - 2 → second last element.

Time Complexity	O(n) - Single pass through the array
Space Complexity O(1) - Only a few variables for tracking products

*/
var maxProduct = function(nums) {
        //n stores the length of the input array.
        const n= nums.length;
        //leftProduct and rightProduct are initialized to 1.
        //  They will hold the running product of elements from the
        //  left and right sides, respectively.
        let leftProduct = 1;
        let rightProduct = 1;
        //ans is initialized to the first element of the array,
        //  assuming the maximum product subarray could be a single element.
        let ans = nums[0];
        //The loop runs from i = 0 to i = n - 1.
        //In each iteration, we update the prefix and suffix
        //  products and check if we have found a new maximum product.
        for(let i=0;i<n;i++){
            // Reset leftProduct and rightProduct if they become 0
            //If either leftProduct or rightProduct becomes zero, reset it to 1.
            //This is because multiplying by zero resets the product sequence,
            //  so we start fresh from the next element.
            //Resetting avoids carrying zero forward, which would nullify subsequent products.
            leftProduct = (leftProduct ===0 )?1:leftProduct;
            rightProduct = (rightProduct ===0)?1 :rightProduct;
            // Prefix product
            //leftProduct multiplies the current element from the
            //  left side (index i).
            leftProduct *= nums[i];
             // Suffix product
             //rightProduct multiplies the current element
             //  from the right side (index n - 1 - i).
            rightProduct *= nums[n-1-i];
            console.log("leftProduct==",leftProduct);
            console.log("rightProduct==",rightProduct);
            ans = Math.max(ans,leftProduct,rightProduct);
        }
        return ans;
};

let nums = [1,2,-3,4];
//let nums = [-2,-1];
let res = maxProduct(nums);
console.log("res==",res);