/*
39. Combination Sum
Given an array of distinct integers candidates and a target integer target,
 return a list of all unique combinations of candidates
  where the chosen numbers sum to target. You may return
   the combinations in any order.

The same number may be chosen from candidates an 
unlimited number of times. Two combinations are unique if the 
frequency of at least one of the chosen numbers is different.

The test cases are generated such that the number of unique
 combinations that sum up to target is less than 150 combinations
  for the given input.

Example 1:

Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]
Explanation:
2 and 3 are candidates, and 2 + 2 + 3 = 7.
 Note that 2 can be used multiple times.
7 is a candidate, and 7 = 7.
These are the only two combinations.

Example 2:

Input: candidates = [2,3,5], target = 8
Output: [[2,2,2,2],[2,3,3],[3,5]]
Example 3:

Input: candidates = [2], target = 1
Output: []
 

Constraints:

1 <= candidates.length <= 30
2 <= candidates[i] <= 40
All elements of candidates are distinct.
1 <= target <= 40

*/
/*
Time Complexity
Let n be the number of candidates.

Let T be the target.

Why is it exponential?
At each recursive step (for each call to backtrack),
 you can either include each candidate multiple times or 
 move on to the next, making the branching factor high.

The recursion tree’s depth is up to T/min(candidates),
 because you can include the smallest candidate that
  many times before exceeding the target.

At every step, you loop over up to n candidates.

Loose Upper Bound:
The number of possible combinations grows rapidly:
In the worst case, the recursion explores all possible
 combinations whose sum is less than or equal to T.

For each candidate, you can pick it as many times as 
you want, leading to a number of combinations similar
 to the number of integer partitions of T using n 
 numbers (which grows exponentially with T).

Time complexity:


O(n ^ T/min)
where min = smallest value in candidates.

Space Complexity
Recursive Stack:
The maximum depth of the recursive call stack is T/min(candidates).

Result Storage:

In the worst case, the algorithm could store an exponential number of combinations, each with up to T/min(candidates) elements.

Space complexity:

O(T/min)(recursion stack)
+
number of combinations × average length of a combination

The actual number of combinations depends on the input but can be exponential in T.
*/
var combinationSum = function (candidates, target) {
    const result = [];
    function backtrack(start, remaining, path) {
        if (remaining === 0) {
            result.push([...path]);
            return;
        }
        if (remaining < 0) {
            return;
        }
        for (let i = start; i < candidates.length; i++) {
            path.push(candidates[i]);
            // Allow unlimited use of the same element, so pass 'i' again
            backtrack(i, remaining - candidates[i], path);
            path.pop();
        }
    }
    backtrack(0, target, []);
    return result;
};

let candidates = [2, 3, 5], target = 8;
let res = combinationSum(candidates, target);
console.log("res==", res);