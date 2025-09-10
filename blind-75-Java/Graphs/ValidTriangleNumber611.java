/*
 * Given an integer array nums, return the number of triplets chosen from the array that can make triangles if we take them as side lengths of a triangle.

 

Example 1:

Input: nums = [2,2,3,4]
Output: 3
Explanation: Valid combinations are: 
2,3,4 (using the first 2)
2,3,4 (using the second 2)
2,2,3
Example 2:

Input: nums = [4,2,3,4]
Output: 4
 

Constraints:

1 <= nums.length <= 1000
0 <= nums[i] <= 1000
 * 
*/
package Graphs;

import java.util.Arrays;

public class ValidTriangleNumber611 {
    public int triangleNumber(int[] nums) {
        int ans =0;
        if(nums.length < 3) return ans;
        Arrays.sort(nums);
        int arrLen = nums.length;
        for(int i=2;i<arrLen;i++){
            int left=0,right=i-1;
            while(left < right){
                if(nums[left] + nums[right] > nums[i]){
                    ans +=(right-left);
                    right--; 
                }
                else{
                    left++;
                }
            }
        }
        return ans;
    }

    public static void main(String[] args) {
        //int[] nums = {2,2,3,4};
        int[] nums = {4,2,3,4};
        
        ValidTriangleNumber611 sol = new ValidTriangleNumber611();
        int res = sol.triangleNumber(nums);
        System.out.println("triangleNumber "+res);
    }
}
/*
 Time Complexity
Sorting: The array nums is sorted, which takes 
O
(
n
log
⁡
n
)
O(nlogn) time.

Main loop: The function uses a single loop for i and a while-loop (two pointers) for left and right, resulting in a worst-case of approximately 
O
(
n
2
)
O(n 
2
 ) for the nested scanning.

For each i (from 2 to n-1), left and right scan at most O(n) positions combined.

Therefore, the total time complexity is:

O(nlogn)+O(n ^2)=O(n ^2) as n^2 dominates for larger n.

Space Complexity
The function uses only a few variables (ans, left, right, etc.) 
and does not use extra arrays or data structures.

The sorting can be in-place, and no additional space is needed.

So, the space complexity is O(1) 
 
*/
/*
function triangleNumber(nums) {
    let ans = 0;
    if (nums.length < 3) return ans;
    nums.sort((a, b) => a - b); // Sorts the array in ascending numeric order
    let arrLen = nums.length;

    for (let i = 2; i < arrLen; i++) {
        let left = 0, right = i - 1;
        while (left < right) {
            if (nums[left] + nums[right] > nums[i]) {
                ans += (right - left);
                right--;
            } else {
                left++;
            }
        }
    }
    return ans;
}

// Example usage:
const nums = [4, 2, 3, 4];
const res = triangleNumber(nums);
console.log("triangleNumber " + res); // Output: triangleNumber 4
 
 
*/