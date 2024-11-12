/*
300. Longest Increasing Subsequence
Description
Given an integer array nums, return the length of the longest strictly increasing subsequence.

Example 1:

Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
Example 2:

Input: nums = [0,1,0,3,2,3]
Output: 4
Example 3:

Input: nums = [7,7,7,7,7,7,7]
Output: 1
Constraints:

1 <= nums.length <= 2500
-104 <= nums[i] <= 104
 
Follow up: Can you come up with an algorithm that runs in O(n log(n)) time complexity?

*/
/*
Initialization:
The function starts by determining the length of the input array
 nums and initializes an empty array lis. This array will be used to
  store the elements of the longest increasing subsequence.
Iterating Through Each Element:
The function iterates over each element in the input array nums.
For each element, it performs a binary search to find the position
 where this element can be inserted into the lis array while maintaining
  its sorted order.
Binary Search:
Two pointers, left and right, are initialized to represent the range 
within the lis array where we will search for the appropriate position.
A while loop is used to perform the binary search:
If the middle element (lis[mid]) is less than the current number (num), 
it means that num can potentially extend the increasing subsequence, 
so we move our search to the right by updating left.
If lis[mid] is greater than or equal to num, we move our search range 
to the left by updating right.
Updating the lis Array:
After finding the correct position (left):
If left equals lis.length, it indicates that num is greater than all
 existing elements in lis, so we append it.
If not, we replace the element at index left with num. This effectively
 maintains a candidate for future elements, ensuring that we keep the 
 smallest possible values in lis.

Time Complexity
O(n log n):
The outer loop runs for each element in nums, which takes O(n) time.
For each element, a binary search is performed on the lis array,
 which takes O(log k) time, where k is the current length of lis.
In total, this results in a time complexity of O(n log n),
 making this approach efficient for larger input sizes.
Space Complexity
O(n):
In the worst case, if all elements are part of an increasing subsequence,
 the size of the lis array can grow up to n (the length of nums).
  Therefore, space complexity is O(n).
However, since we only store elements in lis that are part of an
 increasing subsequence, it may not always reach n.

*/

var lengthOfLIS = function(nums) {
    const n = nums.length;
    const lis =[]; // This will store the longest increasing subsequence
    for(let i=0;i<n;i++){
        const num = nums[i];
       // Use binary search to find the insertion point
        let left =0,right=lis.length;
        while(left<right){
            const mid = Math.floor((left+right)/2);
            if(lis[mid] < num){
                left = mid+1;//move right
            }
            else{
                right=mid;//move left
            }
        }
        // If left is equal to lis.length, it means num is greater
        // than all elements in lis
        if(left === lis.length){
            lis.push(num);
        }
        else{
            lis[left] = num;
        }

    }
    return lis.length;
}

//nums = [10,9,2,5,3,7,101,18]
//nums = [0,1,0,3,2,3]
nums = [7,7,7,7,7,7,7]
console.log(lengthOfLIS(nums))

/*
n: Stores the length of the input array nums.
f: An array of the same length as nums, initialized with 1s. 
Each element f[i] will eventually
 hold the length of the longest increasing subsequence that ends with nums[i].

 Outer Loop (i): Iterates through each element in nums starting from the
  second element (index 1).
Inner Loop (j): For each i, it checks all previous elements (from index 0 to i-1).
Condition (if (nums[j] < nums[i])): Checks if the current element nums[i]
 is greater than a previous element nums[j]. If true, it means that nums[i]
  can extend the increasing subsequence that ends with nums[j].

  If the condition is satisfied, it updates f[i] to be the
   maximum of its current value and f[j] + 1. This means that if 
   we can append nums[i] to the subsequence ending at nums[j], we 
   increase its length by 1.

Time Complexity
The time complexity of this algorithm is 
O(n^2), where n is the number of elements in nums. 
This is due to the nested loops iterating through each pair of elements.
Space Complexity
The space complexity is 
O(n) because we are using an additional array f 
to store intermediate results.
*/
function lengthOfLIS(nums )  {
    const n = nums.length;
    const f = new Array(n).fill(1);
    for (let i = 1; i < n; ++i) {
        for (let j = 0; j < i; ++j) {
            if (nums[j] < nums[i]) {
                f[i] = Math.max(f[i], f[j] + 1);
            }
        }
    }
    return Math.max(...f);
}