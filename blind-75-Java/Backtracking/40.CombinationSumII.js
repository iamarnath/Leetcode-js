/*
40. Combination Sum II

Given a collection of candidate numbers (candidates) and 
a target number (target), find all unique combinations in 
candidates where the candidate numbers sum to target.

Each number in candidates may only be used once in the combination.

Note: The solution set must not contain duplicate combinations.

 

Example 1:

Input: candidates = [10,1,2,7,6,1,5], target = 8
Output: 
[
[1,1,6],
[1,2,5],
[1,7],
[2,6]
]
Example 2:

Input: candidates = [2,5,2,1,2], target = 5
Output: 
[
[1,2,2],
[5]
]
 

Constraints:

1 <= candidates.length <= 100
1 <= candidates[i] <= 50
1 <= target <= 30

*/
/*
The solution uses backtracking with pruning to find unique combinations:
Sorting: Candidates are sorted first to enable efficient duplicate skipping
Backtracking: Recursively builds combinations while maintaining:
start index to prevent element reuse
Duplicate check (i > start && candidates[i] === candidates[i-1])
Pruning: Early termination when remaining target becomes negative

Complexity Analysis
Time Complexity: O(2ᴺ × K)
Worst Case: 2ᴺ combinations (N = number of candidates)
K = Average combination length (each valid combination takes O(K) to copy)
Sorting adds O(N log N) but is dominated by backtracking

Space Complexity: O(N)
Auxiliary Space: O(N) recursion stack depth + path storage
Output Space: O(K × X) for X combinations (not counted in standard analysis)
The algorithm efficiently prunes duplicate combinations 
through sorting and index checks while maintaining optimal 
space usage through backtracking

*/
var combinationSum2 = function(candidates, target) {
    candidates.sort((a,b)=>a-b);
    const result=[];
    //Loop through the candidates starting at start (to avoid reusing candidates).
    function backtrack(start,remaining,path){
        //Base Case 1: If the remaining sum is negative,
        //  stop (prune branch; can’t be a valid combination).
        if(remaining <0){
            return;
        }
        //Base Case 2: If remaining sum is zero, add a copy of
        //  the current path to result (found a valid combination),
        //  then return.
        if(remaining === 0){
            result.push([...path]);
        }
        //i > start: Ensures this is not the first candidate 
        // being considered in this loop (so we don’t skip everything).

//candidates[i] === candidates[i-1]: If the current number is the 
// same as the previous one (after sorting), skip it to
//  avoid generating the same combination more than once.
//If the candidate at index i is the same as the previous, 
// and we’re not at the beginning of this recursive level 
// (i > start), skip to avoid duplicate combinations
//  (this is the key line to ensure unique results).
        for(let i=start;i<candidates.length;i++){
            console.log("i and start =",i,start);
            if(i>start && candidates[i] === candidates[i-1]) {
                continue;
            }
            //Choose current candidate: Add it to current path.
            path.push(candidates[i]);
            //Backtrack call: Recurse with the next index (i+1) to avoid reusing the same candidate.
            backtrack(i+1,remaining-candidates[i],path);// No reuse allowed (i+1)
            //Unchoose current: Remove it to explore other options (classic backtracking technique).
            path.pop();
        }
    }
    backtrack(0,target,[]);
    return result;
};
//let candidates = [10,1,2,7,6,1,5], target = 8;
let candidates = [2,5,2,1,2], target = 5;
let res = combinationSum2(candidates,target);
console.log("combinationSum2==",res);