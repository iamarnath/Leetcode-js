/*
4. Median of Two Sorted Arrays
Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).

 

Example 1:

Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.
Example 2:

Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
 

Constraints:

nums1.length == m
nums2.length == n
0 <= m <= 1000
0 <= n <= 1000
1 <= m + n <= 2000
-106 <= nums1[i], nums2[i] <= 106

*/

var findMedianSortedArraysOld = function(nums1, nums2) {
    let m = nums1.length;
    let n = nums2.length;
    let size = m + n;

    let idx1 = Math.floor(size / 2) - 1; 
    let element1 = -1;
    let idx2 = Math.floor(size / 2);
    let element2 = -1;

    let i = 0, j = 0, k = 0;
    //This does not explicitly create a merged array.
    // Instead, it simulates merging by iterating over both
    //  arrays with pointers i (for nums1) and j (for nums2).
    // k keeps track of the overall merged index.
    // When k equals idx1 or idx2, we store the corresponding element.
    // Merge step until one array finishes
    while (i < m && j < n) {
        if (nums1[i] < nums2[j]) {
            if (k === idx1) {
                element1 = nums1[i];
            }
            if (k === idx2) {
                element2 = nums1[i];
            }
            i++;
        } else {
            if (k === idx1) {
                element1 = nums2[j];
            }
            if (k === idx2) {
                element2 = nums2[j];
            }
            j++;
        }
        k++;
    }
    //After one array is exhausted, we continue with 
    // the leftover elements of the other array.
    //Again, we only care about positions idx1 and idx2.
    // If elements left in nums1
    while (i < m) {
        if (k === idx1) {
            element1 = nums1[i];
        }
        if (k === idx2) {
            element2 = nums1[i];
        }
        i++;
        k++;
    }

    // If elements left in nums2
    while (j < n) {
        if (k === idx1) {
            element1 = nums2[j];
        }
        if (k === idx2) {
            element2 = nums2[j];
        }
        j++;
        k++;
    }
    //If the length is odd, the median is simply at index size/2.
    if (size % 2 === 1) {
        return element2; // odd length → middle element
    }
    //If the length is even, the median lies between two indices: (size/2)-1 and size/2.
    return (element1 + element2) / 2.0; // even length → average of two middle elements
}
/*
Time Complexity
Binary search runs on the smaller array.

Each iteration is O(1) (constant-time comparisons).

Maximum iterations = log(min(m, n)).

Time Complexity: O(log(min(m, n)))

Space Complexity
We only store a few variables, no extra arrays.

Space Complexity: O(1)
*/
var findMedianSortedArrays = function(nums1, nums2) {
    //We always binary search in the smaller array (nums1).

    //If nums1 is larger, swap the arrays. 
    // This ensures binary search is efficient (O(log(min(m,n)))).
    if (nums1.length > nums2.length) {
        return findMedianSortedArrays(nums2, nums1);
    }
    
    let m = nums1.length;
    let n = nums2.length;
    //Binary search boundaries for indices in nums1.
    //We’ll try different "partition points" inside nums1 between index 0 and m.
    let low = 0, high = m;

    while (low <= high) {
        //partitionX = dividing index in nums1
        let partitionX = Math.floor((low + high) / 2);
        //partitionY = dividing index in nums2
        //Both partitions together must hold half the elements ((m+n+1)/2).
        //The +1 ensures that for odd total length, the left partition gets one extra element.
        let partitionY = Math.floor((m + n + 1) / 2) - partitionX;
        //maxLeftX = largest element in the left partition of nums1
        //If partition is at 0 (empty left side), we use -∞.
        let maxLeftX = (partitionX === 0) ? Number.NEGATIVE_INFINITY : nums1[partitionX - 1];
        //minRightX = smallest element in the right partition of nums1
        //If partition is at the end, we use +∞.
        let minRightX = (partitionX === m) ? Number.POSITIVE_INFINITY : nums1[partitionX];
        //maxLeftY = largest element in the left partition of nums2
        //If partition is at 0 (empty left side), we use -∞.
        let maxLeftY  = (partitionY === 0) ? Number.NEGATIVE_INFINITY : nums2[partitionY - 1];
        //minRightY = smallest element in the right partition of nums2
        //If partition is at the end, we use +∞.
        let minRightY = (partitionY === n) ? Number.POSITIVE_INFINITY : nums2[partitionY];
        //The largest element on the left side ≤ smallest element on the right side across both arrays.
        // If true: we found the perfect cut.
        if (maxLeftX <= minRightY && maxLeftY  <= minRightX) {
            //If total length is even, median = average of max of left side and min of right side.
            if ((m + n) % 2 === 0) {
                return (Math.max(maxLeftX, maxLeftY ) + Math.min(minRightX, minRightY)) / 2.0;
            }
            //If total length is odd, median = max of left side.
            return Math.max(maxLeftX, maxLeftY );
            /*
            What is maxLeftX > minRightY?
When the largest value on the left side of nums1 
(maxLeftX) is greater than the smallest value on the
 right side of nums2 (minRightY), the partition in nums1 is too far right.
This violates the property required for the 
median split: all values on the left (of both arrays)
 must be ≤ all values on the right.
So, we need fewer elements from nums1 in the
 left partition. Hence, move the high pointer to the left:
high = partitionX - 1.
Otherwise, the partition in nums1 is too far left
 and needs to be moved right:
low = partitionX + 1.

Example
Let’s run this condition with your earlier sample:
nums1 = [1, 2], nums2 = [3, 4]
Suppose in the first iteration:
partitionX = 1, so left part of nums1 is 
(`maxLeftX = 1`), right part (minRightX = 2)
partitionY = 1, so left part of nums2 is (`maxLeftY = 3`),
 right part (minRightY = 4)

Let's check the key comparisons:
maxLeftX (1) <= minRightY (4) → OK
maxLeftY (3) <= minRightX (2) → Not OK, 
so we enter an adjustment case.
Which side violated the property?
maxLeftY (3) > minRightX (2):
This means that the left part of nums2 is too large,
 or equivalently, the partition in nums1 is too far left.
Therefore, update:
low = partitionX + 1 (move partitionX right)
On the next iteration, partitionX increases, 
so more elements from nums1 go to the left, balancing the partitions.
            */
            //If maxLeftX > minRightY, then partition in nums1 is too far right → move high left.
        } else if (maxLeftX > minRightY) {
            high = partitionX - 1;
        } else {
            //Otherwise, partition is too far left → move low right.
            low = partitionX + 1;
        }
    }

    return -1; // invalid case
}


//let nums1 = [1,3], nums2 = [2];
let nums1 = [1,2], nums2 = [3,4]
let res = findMedianSortedArrays(nums1,nums2);
console.log("res==",res);
/*
Let’s dry run the binary search median algorithm step by step with:

nums1 = [1, 2]

nums2 = [3, 4]

Total elements = 

m+n=2+2=4 (even case). So our answer will be the average of the two middle values.

Step 1: Setup
m = 2, n = 2

Total length = 4 → (m+n+1)/2 = (4+1)/2 = 2.5 → floor → 2

So, left partition must contain 2 elements in total.

Binary search range on nums1:

low = 0, high = 2

Step 2: First iteration
text
partitionX = (0 + 2) / 2 = 1
partitionY = 2 - 1 = 1
Now, define edges:

maxLeftX = nums1 = 1

minRightX = nums1 = 2

maxLeftY = nums2 = 3

minRightY = nums2 = 4

Step 3: Check conditions
Is maxLeftX <= minRightY? → 1 <= 4 → YES

Is maxLeftY <= minRightX? → 3 <= 2 → NO

So, partition is not correct yet.
Since maxLeftY (3) > minRightX (2), we need to move right in nums1.

text
low = partitionX + 1 = 2
Step 4: Second iteration
text
partitionX = (2 + 2) / 2 = 2
partitionY = 2 - 2 = 0
Now, define edges:

maxLeftX = nums1 = 2

minRightX = (partitionX === m) ? +∞ : nums1 = +∞

maxLeftY = (partitionY === 0) ? -∞ : nums2[-1] = -∞

minRightY = nums2 = 3

Step 5: Check conditions
Is maxLeftX <= minRightY? → 2 <= 3 → YES

Is maxLeftY <= minRightX? → -∞ <= ∞ → YES

✔ Correct partition found.

Step 6: Compute median
Since 
m
+
n
=
4
m+n=4 is even:

median= 
2
max(maxLeftX,maxLeftY)+min(minRightX,minRightY)
 
=
max
⁡
(
2
,
−
∞
)
+
min
⁡
(
+
∞
,
3
)
2
=
2
+
3
2
=
2.5
= 
2
max(2,−∞)+min(+∞,3)
 = 
2
2+3
 =2.5
Final Answer
The **median of nums1 = and nums2 = ** is:

2.5


*/