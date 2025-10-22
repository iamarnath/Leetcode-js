/*
2071. Maximum Number of Tasks You Can Assign

You have n tasks and m workers. Each task has a
 strength requirement stored in a 0-indexed 
 integer array tasks, with the ith task 
 requiring tasks[i] strength to complete. 
 The strength of each worker is stored in a
  0-indexed integer array workers, with the
   jth worker having workers[j] strength. 
   Each worker can only be assigned to a single 
   task and must have a strength greater than
    or equal to the task's strength requirement 
    (i.e., workers[j] >= tasks[i]).

Additionally, you have pills magical pills 
that will increase a worker's strength by strength.
 You can decide which workers receive the magical pills, 
 however, you may only give each worker at most one magical pill.

Given the 0-indexed integer arrays tasks and 
workers and the integers pills and strength, return
 the maximum number of tasks that can be completed.

Example 1:

Input: tasks = [3,2,1], workers = [0,3,3], pills = 1, strength = 1
Output: 3
Explanation:
We can assign the magical pill and tasks as follows:
- Give the magical pill to worker 0.
- Assign worker 0 to task 2 (0 + 1 >= 1)
- Assign worker 1 to task 1 (3 >= 2)
- Assign worker 2 to task 0 (3 >= 3)
Example 2:

Input: tasks = [5,4], workers = [0,0,0], pills = 1, strength = 5
Output: 1
Explanation:
We can assign the magical pill and tasks as follows:
- Give the magical pill to worker 0.
- Assign worker 0 to task 0 (0 + 5 >= 5)
Example 3:

Input: tasks = [10,15,30], workers = [0,10,10,10,10], 
pills = 3, strength = 10
Output: 2
Explanation:
We can assign the magical pills and tasks as follows:
- Give the magical pill to worker 0 and worker 1.
- Assign worker 0 to task 0 (0 + 10 >= 10)
- Assign worker 1 to task 1 (10 + 10 >= 15)
The last pill is not given because it will not 
make any worker strong enough for the last task.
 

Constraints:

n == tasks.length
m == workers.length
1 <= n, m <= 5 * 104
0 <= pills <= m
0 <= tasks[i], workers[j], strength <= 109

*/
//O(N∗Mlogm)
/*
Time Complexity
Sorting tasks and workers: O(mlogm+nlogn)

Binary search loop runs O(log min(m,n)) times.

For each check, it slices and sorts O(mid logmid).

For each of mid tasks, binary search in a sorted array: O(log mid).

Total per binary search iteration: O(mid log mid+mid log mid)

Worst-case overall:
O(mlogm+nlogn)+O(logmin(m,n))×O(rlogr)
where r=min(m,n)

Space Complexity
Temporary arrays for sorting/slicing: O(r) per check (where r=min(m,n)).

No significant extra storage beyond these slices.

Summary Table
Function	    Time Complexity	                                  Space Complexity
maxTaskAssign	 O(m logm+n logn+rlog^2 r) [binary search + check]  O(r) per check
check	         O(mid log mid) per call	                      O(mid)
lowerBound	     O(log mid) per call	                          O(1)


*/
var maxTaskAssign = function(tasks, workers, pills, strength) {
    //Calculates the size of tasks and workers arrays.
    let m = tasks.length;
    let n = workers.length;
    let l = 0;
    let r = Math.min(m, n);
    //Sorts tasks in ascending order and workers in descending order.
    tasks.sort((a, b) => a - b);// Ascending order increasing order
    //Prepares for optimized assignment; strongest workers at the start.
    workers.sort((a, b) => b - a); // descending order - decreasing order
    // a strong worker can work for small task
    let result = 0;
    //Initializes the binary search range between
    //  0 and the minimum of both sizes.
    //Chooses the middle value mid, representing how many tasks to try assigning.
    while (l <= r) {
        
        let mid = Math.floor(l + (r - l) / 2);
        //Calls check to see if it's possible to assign mid tasks.
        if (check(tasks, workers, pills, strength, mid)) {
            result = mid;
            //If possible, tries for more tasks (moves the left bound up).
            l = mid + 1;
        } else {
            //If not possible, reduces the task count (moves the right bound down).
            r = mid - 1;
        }
    }
    return result;
}

function check(tasks, workers, pills, strength, mid) {
    //Checks if mid tasks can be assigned given the constraints.
    //Tracks pills used.
    let pillsUsed = 0;
    //Prepares a sorted array st of the mid strongest available workers.
    let st = workers.slice(0, mid).sort((a, b) => a - b); // multiset simulation
    //Iterates from the hardest (largest task[i]) to easiest among the mid tasks.
    for (let i = mid - 1; i >= 0; i--) {
        let reqrd = tasks[i];
        //If the strongest worker can do the task, assign and remove them.
        let strongestWorker = st[st.length - 1];

        if (strongestWorker >= reqrd) {
            // Assign strongest worker
            st.pop();
            //If pills are exhausted and no worker can do the task, return false.
        } else if (pillsUsed >= pills) {
            return false;
        } else {
            //Else, tries to find the weakest worker who, after taking a pill, can complete the task.
            // Find the weakest worker that can handle this task with a pill
            let needed = reqrd - strength;
            //Uses lowerBound (binary search) to find this worker and removes them if present.
            let idx = lowerBound(st, needed);

            if (idx === st.length) {
                return false;
            }
            st.splice(idx, 1); // remove that worker
            pillsUsed++;
        }
    }
    //Returns true if successful for all mid tasks.
    return true;
}



// Helper function: binary search (lower_bound equivalent)
// Implements binary search to find the lowest index 
// where value is >= target in sorted array.
//Efficiently finds the right candidate among workers.


function lowerBound(arr, target) {
    let left = 0, right = arr.length;
    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] >= target) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    //Returns index for use in splice.
    return left;
}
/*
let left = 0, right = arr.length;

Initialize search boundaries: left at the start, right at one past the last index (i.e., the array's length).

while (left < right) { ... }

Continue looping as long as left is strictly less than right. This loop narrows down the potential position for the lower bound.

let mid = Math.floor((left + right) / 2);

Compute the middle index between left and right.

if (arr[mid] >= target) {

If the mid value is greater than or equal to the target, then the possible answer may be mid or to the left of mid. So, move the right boundary to mid.

right = mid;

} else {

If the mid value is less than the target, then all elements before and including mid are too small. So, move the left boundary to one past mid.

left = mid + 1;

}
After the loop: return left;

This returns the first position where the value in the array 
is at least target. If all values are less than target, 
returns array length (i.e., “not found”)

If arr = [2, 3, 7, 10, 11, 11, 25] and target = 9,
Then lowerBound(arr, 9) returns 3, because arr = 10 (the first element >= 9).

*/
//let tasks = [10,15,30], workers = [0,10,10,10,10], pills = 3, strength = 10;
let tasks = [3,2,1], workers = [0,3,3], pills = 1, strength = 1;
let res = maxTaskAssign(tasks, workers, pills, strength);
console.log("res==",res);