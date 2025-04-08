/*
72. Edit Distance

Description
Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.

You have the following three operations permitted on a word:

Insert a character
Delete a character
Replace a character
 

Example 1:

Input: word1 = "horse", word2 = "ros"
Output: 3
Explanation: 
horse -> rorse (replace 'h' with 'r')
rorse -> rose (remove 'r')
rose -> ros (remove 'e')
Example 2:

Input: word1 = "intention", word2 = "execution"
Output: 5
Explanation: 
intention -> inention (remove 't')
inention -> enention (replace 'i' with 'e')
enention -> exention (replace 'n' with 'x')
exention -> exection (replace 'n' with 'c')
exection -> execution (insert 'u')
 

Constraints:

0 <= word1.length, word2.length <= 500
word1 and word2 consist of lowercase English letters.

*/

/*
1. Recursive Approach
Let's define the recursive function minDistanceRecursive(word1, word2, i, j) where:

i is the current index in word1
j is the current index in word2
The function will compute the minimum number of operations needed to convert word1[0:i] to word2[0:j].

Steps
If either string is exhausted (i.e., one of the indices is -1), the cost is simply the length of the other string (since we’d need to insert or delete all characters).
If word1[i] and word2[j] match, no operation is needed for these characters, so we move both pointers to the previous characters.
If they don’t match, we have three choices:
Insert a character into word1 (we move j back, keeping i).
Delete a character from word1 (we move i back, keeping j).
Replace a character in word1 with word2[j] (we move both i and j back).

The function minDistanceRecursive takes four parameters:

word1: The first word.

word2: The second word.

i: The current index in word1.

j: The current index in word2.

*/
function minDistanceRecursive(word1, word2, i, j) {
    if(i<0) return j+1;  // If i < 0, it means we have processed all characters in word1, but there are still characters left in word2. In this case, we need to insert all remaining characters from word2 into word1, so we return j + 1.
    if(j<0) return i+1;  // If j < 0, it means we have processed all characters in word2, but there are still characters left in word1. In this case, we need to delete all remaining characters from word1, so we return i + 1.
    if(word1[i] === word2[j]){
        //If word1[i] === word2[j], it means the current characters in both words match. In this case, we simply move to the previous characters in both words by calling minDistanceRecursive(word1, word2, i-1, j-1).
        return minDistanceRecursive(word1, word2, i-1, j-1);
    }
    else{
       // Insert a character into word1 (we move j back, keeping i).
       // Insert a character from word2 into word1. This is done by moving the index j back (to consider the next character in word2) while keeping i the same (since we are inserting into word1). 
        const insertop = 1 + minDistanceRecursive(word1, word2, i, j-1);
       // Delete a character from word1 (we move i back, keeping j).
       // Delete a character from word1. This is done by moving the index i back (to remove the current character from word1) while keeping j the same.
        const deleteop = 1 + minDistanceRecursive(word1, word2, i-1, j);
        //Replace a character in word1 with word2[j] (we move both i and j back).
        //Replace a character in word1 with the character from word2. This is done by moving both indices back
        const replaceop = 1 + minDistanceRecursive(word1, word2, i-1, j-1);

        return Math.min(insertop,deleteop,replaceop);
    }

}

/*
2. Memoization Approach
To optimize the recursive solution, we can use memoization to
 store already computed results for given values of i and j, avoiding
  redundant calculations.

Complexity Analysis
Time Complexity: 
O(m×n) since each unique state (i.e., each (i, j) pair) is computed only once.
Space Complexity: 
O(m×n) due to the memoization table and recursion stack.

*/
function minDistanceMemo(word1,word2){
    const memo = new Map();
    function helper(i,j){
        if(i<0) return j+1;
        if(j<0) return i+1;
        const key = `${i},${j}`;
        if(memo.has(key)) return memo.get(key);
        if(word1[i] === word2[j]){
            memo.set(key,helper(i-1,j-1));
        }
        else{
            const insertop = 1 + helper(i,j-1);
            const deleteop = 1 + helper(i-1,j);
            const replaceop = 1 + helper(i-1,j-1);
            memo.set(key,Math.min(insertop,deleteop,replaceop));
        }
        return memo.get(key);
    }
    return helper(word1.length-1,word2.length-1);
}

/*
3. Tabulation (Dynamic Programming)
In the tabulation approach, we create a DP table where dp[i][j] represents 
the minimum operations to convert word1[0:i] to word2[0:j].

Steps
Initialize a 2D array dp of size (m+1) x (n+1) where m and n are lengths
 of word1 and word2.
Fill the first row and column based on base cases:
dp[i][0] = i for all i, since converting word1[0:i] to an empty string 
requires i deletions.
dp[0][j] = j for all j, since converting an empty string to word2[0:j]
 requires j insertions.
Populate the table using the recurrence relation:
If word1[i - 1] === word2[j - 1], then dp[i][j] = dp[i - 1][j - 1].
Otherwise, dp[i][j] = 1 + min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]).

The three choices — Insert, Delete, and Replace — reflect the possible operations we can perform on word1 to transform it into word2. Let's break down why these specific operations are used and how the index updates correspond to the transformations:

1. Insert a Character
What Happens:
We "pretend" to insert a character into word1 that matches the current character in word2 (at index j).

Reason for the Move:
After an insertion, the problem reduces to matching the same part of word1 (index i) with the next character of word2 (index j - 1).

Index Update:

Keep i as it is (since the insertion doesn't consume a character from word1).
Move j back by 1 (j - 1) to continue matching with the next character of word2.
Example:

word1 = "ros", word2 = "rose".
Insert 'e' at the end of word1. Now:
word1 = "rose", word2 = "rose".
Move j back to check the next transformation.
2. Delete a Character
What Happens:
We remove a character from word1 to make it closer to word2.

Reason for the Move:
After deleting a character from word1, the problem reduces to matching the remaining part of word1 (index i - 1) with the same part of word2 (index j).

Index Update:

Move i back by 1 (i - 1) to process the next character of word1 after the deletion.
Keep j as it is (since the character in word2 still needs to be matched).
Example:

word1 = "horse", word2 = "ros".
Delete 'h'. Now:
word1 = "orse", word2 = "ros".
Move i back to process the next character in word1.
3. Replace a Character
What Happens:
We replace a character in word1 to make it match the current character in word2.

Reason for the Move:
After replacing, the problem reduces to matching the remaining parts of both strings (i.e., the next characters in both word1 and word2).

Index Update:

Move both i and j back by 1 (i - 1 and j - 1) to process the next characters.
Example:

word1 = "hors", word2 = "rose".
Replace 'h' with 'r'. Now:
word1 = "rors", word2 = "rose".
Move both i and j back to process the next characters.
Why Are These Three Choices Necessary?
The three operations Insert, Delete, and Replace are sufficient to cover all possible transformations of one string into another. They correspond to every possible action we could take at each step of the transformation:

Insert: Helps match extra characters in word2 that are not present in word1.
Delete: Removes extra characters in word1 that are not needed for word2.
Replace: Fixes mismatched characters to make word1 and word2 closer.
By considering all three choices at each step, the algorithm explores every possible sequence of transformations and guarantees finding the minimum number of operations.

Why Do the Index Updates Work?
The index updates reflect the logical effect of each operation:

Insert: Adds a character, so we don’t advance word1's index (i remains).
Delete: Removes a character from word1, so we move forward in word1 (i - 1).
Replace: Fixes one character in both strings, so both indices advance (i - 1 and j - 1).

*/

function minDistanceTabulation(word1, word2) {
    const m=word1.length,n=word2.length;
    const dp = [];
    for (let i = 0; i <= m; i++) {
        dp[i] = [];
        for (let j = 0; j <= n; j++) {
            dp[i][j] = 0;
        }
    }
  //The first column (dp[i]) represents the edit distance when word2 is empty. Here, the edit distance is equal to i, because we need to delete all characters from word1.
    for(let i=0;i<=m;i++) dp[i][0] = i;
      //The first row (dp[j]) represents the edit distance when word1 is empty. In this case, the edit distance is equal to j, because we need to insert all characters from word2.
    for(let j=0;j<=n;j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if(word1[i-1] === word2[j-1]){
                dp[i][j] = dp[i-1][j-1];
            }
            else{
                dp[i][j] = 1+Math.min(dp[i][j-1],dp[i-1][j],dp[i-1][j-1])
            }
        }
    }
    console.log("dp--",dp);
    return dp[m][n];
}
/*
Approach Breakdown
Initialization:
The lengths of the two words are stored in m and n.
Two arrays, prev and curr, are initialized:
prev is initialized to represent the edit distances for converting an empty string to prefixes of word2. Specifically, it contains values from 0 to n, indicating that transforming an empty string to a substring of length j requires j insertions.
curr will be used to calculate the current row of edit distances for each prefix of word1.
Base Case:
The first element of curr (curr) is set to i, which represents converting the first i characters of word1 to an empty string. This requires i deletions.
Filling the DP Table:
The outer loop iterates over each character in word1 (from 1 to m).
The inner loop iterates over each character in word2 (from 1 to n).
For each pair of characters (word1[i-1] and word2[j-1]):
If they match, no additional operation is needed, so we copy the value from the diagonal (prev[j-1]) into curr[j].
If they do not match, we calculate the minimum cost among three possible operations:
Deleting a character from word1: This corresponds to the value above (prev[j]).
Inserting a character into word1: This corresponds to the value to the left (curr[j-1]).
Replacing a character in word1: This corresponds to the diagonal value (prev[j-1]).
The result is stored in curr[j].
Row Transition:
After processing all characters for a specific row (for a specific character in word1), we swap references between prev and curr. This means that in the next iteration, what was previously calculated in curr becomes the previous row for the next character in word1.
Result:
After filling out all rows, the final answer (minimum edit distance) is found in prev[n], which represents transforming all characters of word1 into all characters of word2.

Complexity
Time Complexity: O(m * n), where m is the length of word1 and n is the length of word2. This is because we fill an m x n table.
Space Complexity: O(n), since we only keep two rows at any time instead of maintaining a full 2D array.

*/

function minDistanceOptimized(word1, word2) {
    const m = word1.length;
    const n = word2.length;
    // Initialize the previous row array with 0 to n
    let prev = Array(n+1).fill(0).map((_,j)=>j);
    let curr = Array(n+1).fill(0);

    for(let i=1;i<=m;i++){
        curr[0]=i;  // Base case: converting word1[0:i] to empty string requires i deletions
        for(let j=1;j<=n;j++){
            if(word1[i-1] === word2[j-1]){
                curr[j] = prev[j-1];
            }
            else{
                curr[j] = 1+Math.min(
                    prev[j], // Delete from word1
                    curr[j-1],// Insert into word1
                    prev[j-1] // Replace in word1
                )

            }
        }
    // Move current row to previous row for next iteration
        [prev,curr] = [curr,prev];
    }
    console.log("curr-",curr);
    console.log("prev-",prev);
    return prev[n]
}

word1 = "horse", word2 = "ros";
//word1 = "intention", word2 = "execution";
//console.log(minDistanceRecursive(word1,word2,word1.length -1,word2.length -1));

//console.log(minDistanceMemo(word1,word2));

//console.log(minDistanceTabulation(word1,word2));
console.log(minDistanceOptimized(word1,word2));
