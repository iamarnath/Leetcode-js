/*

Permutations of given String
=====================================
Last Updated : 18 Sep, 2024
Given a string S, the task is to write a program to print all
permutations of a given string. 

A permutation also called an "arrangement number" or "order," 
is a rearrangement of the elements of an ordered list S into a one-to-one
correspondence with S itself. A string of length N has N! permutations. 

Examples:

Input: S = "ABC"
Output: "ABC", "ACB", "BAC", "BCA", "CBA", "CAB"

Input: S = "XY"
Output: "XY", "YX"

*/

function solve(ip, op, v) {
    if (ip.length === 0) {
        v.push(op);
        return;
    }
    const mp = new Set();
    for (let i = 0; i < ip.length; i++) {
        if (!mp.has(ip[i])) {
            mp.add(ip[i]);
            const newIp = ip.slice(0, i) + ip.slice(i + 1);
            const newOp = op + ip[i];
            solve(newIp, newOp, v);
        }
    }
}

function findPermutation(ip) {
    const sortedIp = ip.split('').sort().join('');
    const result = [];
    solve(sortedIp, "", result);
    return result;
}


// Example usage

const input1 = "ljr";
const permutations1 = findPermutation(input);

console.log(`Unique permutations of "${input1}" are:`);
permutations1.forEach(perm => console.log(perm));

// better solution
/**
 * Avoiding String Slicing:
The current implementation creates new strings using slice, which can
 be inefficient since it involves allocating new memory for each substring.
  Instead, we can use an array to keep track of available characters.
Using a Boolean Array:
Instead of using a Set to track used characters, we can use a boolean array 
to mark characters as used. This reduces the overhead of managing a set and
 allows for direct indexing.
In-place Permutation Generation:
By modifying the input array in place, we can avoid creating new strings 
and reduce memory usage.



Key Changes Explained
Using an Array for Used Characters:
A boolean array used is introduced to keep track of which characters have been
 included in the current permutation. This avoids the overhead associated with
  using a Set.
Avoiding Duplicates:
The condition (i > 0 && ip[i] === ip[i - 1] && !used[i - 1]) ensures that
 we skip duplicate characters when they are not being used in the current
  recursive call.
In-place Character Handling:
By building the output string op directly in the recursive calls without
 slicing the input string, we reduce memory allocation overhead.
 * 
*/
class Solution {
    solve(ip, op, v,used) {
    /*
    When the length of op matches the length of ip, it means a valid 
    permutation is constructed.
Add this permutation (op) to the result array (v) and return to stop
 further recursion for this path.

    */
      if (op.length === ip.length) {
          v.push(op);
          return;
      }
      //The loop iterates through each character of the input array ip.

      for (let i = 0; i < ip.length; i++) {
          // Skip used characters or duplicates
          /*
          used[i]: Skip this character if it has already been used in the 
          current path.
            Duplicate check: Skip duplicate characters (ip[i] === ip[i - 1]) if
             the previous identical character (ip[i - 1]) has not been used. 
            This ensures permutations are generated only once for repeated 
            characters.
          */
          if (used[i] || (i > 0 && ip[i] === ip[i - 1] && !used[i - 1])) {
              continue;
          }

          // Mark as used
          /*
          Mark the current character as used (used[i] = true).
Add the current character to the output string (op + ip[i]).
Recur with the updated parameters to continue building the permutation.
          */
          used[i] = true;
          this.solve(ip, op + ip[i], v, used);
          // Backtrack: unmark as used
          used[i] = false;
      }
  }
  findPermutation(s) {
      const sortedIp = s.split('').sort();
      const result = [];
      const used = new Array(sortedIp.length).fill(false);
      this.solve(sortedIp, "", result, used);
      return result;
  }
}
// Example usage
const sol = new Solution();
const input = "abc";
const permutations = sol.findPermutation(input);

console.log(`Unique permutations of "${input}" are:`);
permutations.forEach(perm => console.log(perm));