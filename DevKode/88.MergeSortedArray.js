/*
88. Merge Sorted Array

Solution-https://leetcode.com/problems/merge-sorted-array/solutions/5072211/optimised/

Description
You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.

Merge nums1 and nums2 into a single array sorted in non-decreasing order.

The final sorted array should not be returned by the function,
 but instead be stored inside the array nums1. 
 To accommodate this, nums1 has a length of m + n,
  where the first m elements denote the elements that should be merged, and the last n elements are set to 0 and should be ignored. nums2 has a length of n.
*/
/*
The time complexity of the given function is O(m+n) because it iterates through the two arrays nums1 and nums2 in reverse order, and the length of nums1 is m and the length of nums2 is n. The number of comparisons and swaps is directly proportional to the length of the arrays, so the time complexity is O(m+n).

The space complexity of the given function is O(1) because it does not use any additional data structures to store the elements of the arrays. It modifies the input array nums1 in place, so the space complexity is constant.


*/
/*
Input

nums1: `` (m = 3, three valid elements)

nums2: [2, 5, 6] (n = 3)

Visualization Table
Step	p1 (nums1)	p2 (nums2)	i	Comparison	nums1 after step
Init	2	2	5	--	
1	2	2	5	3 < 6 ⟶ place 6 from nums2	
2	2	1	4	3 < 5 ⟶ place 5 from nums2	
3	2	0	3	3 > 2 ⟶ place 3 from nums1	
4	1	0	2	2 == 2 ⟶ place 2 from nums2	
5	1	-1	1	p2 < 0, loop ends	
Step-by-step Explanation
Start from the back (i = 5, filling nums1 backwards).

At each loop, compare the current values of nums1 and nums2.

Place the larger value at position i in nums1.

Move the chosen array's pointer and i one left.

Continue until all elements from nums2 are placed.

Final result:
[1, 2, 2, 3, 5, 6]

*/
var merge = function (nums1, m, nums2, n) {
    //Sets three pointers:
// p1 starts at the end of the valid portion of nums1
// p2 starts at the end of nums2
// i starts at the very end of nums1 (after all valid and extra spaces).


    let p1 = m-1, p2 = n-1; i = m+n-1;
    //Continues as long as there are elements to process in nums2.
    while (p2 >= 0) {
        //Compares the elements from the rightmost remaining valid entry in both arrays.
        //  If nums1's element is larger, place it at index i.
        if (p1 >= 0 && nums1[p1] > nums2[p2]) {
            //Copy the bigger nums1 
            // value into current last open spot, and move both pointers left.
            nums1[i--] = nums1[p1--];
        }
        else {
            //If nums1's value is not greater (either nums2's value is greater,
            //  or nums1 is exhausted), place nums2's current value.
            nums1[i--] = nums2[p2--];
        }
    }

    console.log(nums1)
};

nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
console.log(merge(nums1,m,nums2,n));
