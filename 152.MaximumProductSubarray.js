/*
Given an integer array nums, find a 
subarray that has the largest product, and return the product.

The test cases are generated so that the answer will fit in a 32-bit integer.

 Example 1:

Input: nums = [2,3,-2,4]
Output: 6
Explanation: [2,3] has the largest product 6.
Example 2:

Input: nums = [-2,0,-1]
Output: 0
Explanation: The result cannot be 2, because [-2,-1] is not a subarray.
 

Constraints:

1 <= nums.length <= 2 * 104
-10 <= nums[i] <= 10
The product of any subarray of nums is guaranteed to fit in a 32-bit integer.

*/

var maxProduct = function(nums) {
    let maxProd = nums[0];
    let minProd = nums[0];
    let ans = nums[0],numlen = nums.length;
    for(let i=1;i<numlen;i++){
        const tempMaxProd = maxProd;
        const tempMinProd = minProd;
        
        maxProd = Math.max(nums[i],tempMaxProd  * nums[i],tempMinProd *nums[i]);
        minProd = Math.min(nums[i],tempMaxProd  * nums[i],tempMinProd *nums[i]);
        ans = Math.max(ans,maxProd);
    }
    return ans;
};

// nums = [2,3,-2,4];
//nums = [-2,0,-1]
nums = [-2,3,-4]

console.log(maxProduct(nums))
