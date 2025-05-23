/*
77. Combinations
Given two integers n and k, return all possible combinations 
of k numbers chosen from the range [1, n].

You may return the answer in any order.
Example 1:

Input: n = 4, k = 2
Output: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
Explanation: There are 4 choose 2 = 6 total combinations.
Note that combinations are unordered, i.e., [1,2] and [2,1] 
are considered to be the same combination.
Example 2:

Input: n = 1, k = 1
Output: [[1]]
Explanation: There is 1 choose 1 = 1 total combination.
 

Constraints:

1 <= n <= 20
1 <= k <= n

*/
/*
The combine function initializes an empty result array.
The inner recursive function solve builds combinations 
starting from start to n.
When k reaches 0, it means a valid combination of 
size k is formed, so it is added to result.
The recursion explores all possible combinations 
by including each number and then backtracking.

Time Complexity
The problem generates all combinations of size k from n numbers.
The number of such combinations is C(n, k) = n! / (k! * (n-k)!).
For each combination, it takes O(k) time to copy the temporary
 array to the result.
Therefore, the total time complexity is O(k * C(n, k)).

Space Complexity
The recursion stack depth can go up to k.
The temporary array temp stores up to k elements.
The result array stores all combinations,
 which is C(n, k) combinations, each of size k.
So, the space complexity is dominated by the output size: O(k * C(n, k)).
Auxiliary space used by recursion and temp array is O(k).

*/
var combine = function (n, k) {
    const result = [];
    /*
    Defines a helper recursive function solve with three parameters:
        start: The current number to start choosing from.
        k: How many more numbers we need to 
        select to complete the combination.
        temp: An array that temporarily holds the 
        current combination being built.
    */
    function solve(start, k, temp) {
        //Checks if k is zero, meaning we've selected
        //  enough numbers to form a complete combination.
        if (k === 0) {
            /*
            If k is zero, it means the current combination temp is complete.
                We push a copy of temp into the result array.
                Using [...temp] creates a shallow copy to avoid reference
                 issues during backtracking.
            */
            result.push([...temp]);
            return;
        }
        //Instead of looping from start to n, loop only up 
        // to n - k + 1. This is because if there are fewer
        //  than k elements left to pick, no valid combination
        //  can be formed. This reduces unnecessary recursive calls.
        //for (let i = start; i <= n - k + 1; i++) {
        //Starts a loop from start to n 
        // to try all possible numbers for the current position in the combination.
        for (let i = start; i <= n; i++) {
            temp.push(i);
            /*
            Recursively calls solve to select the next number.
                i + 1 ensures the next number is greater than 
                the current to avoid duplicates and maintain ascending order.
                k - 1 because we've just chosen one number,
                 so we need one less.
                temp carries the current partial combination.
            */
            solve(i + 1, k - 1, temp);
            //Removes the last number added to temp to backtrack and try other possibilities.
            //This step is crucial to explore all combinations without carrying over unwanted elements.
            temp.pop();
        }
    }
    //Starts the recursion from number 1, 
    // with k numbers to select, and an empty temp array.
    solve(1, k, []);
    return result;
};

let n = 4, k = 2;
console.log("combine==", combine(n, k));