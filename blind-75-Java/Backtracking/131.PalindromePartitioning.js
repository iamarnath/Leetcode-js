/*
131. Palindrome Partitioning
Given a string s, partition s such that
 every substring of the partition 
 is a palindrome. Return all possible 
 palindrome partitioning of s.

Example 1:

Input: s = "aab"
Output: [["a","a","b"],["aa","b"]]
Example 2:

Input: s = "a"
Output: [["a"]]
 

Constraints:

1 <= s.length <= 16
s contains only lowercase English letters.

*/
/*
Time Complexity
Worst Case: 

O(2^n ⋅ n)

There are 2^n−1 ways to partition an n-length string 
(each gap between chars can be cut or not).

For each partition, you might spend up to 
O(n) to copy the curr array and to check palindromes.

The palindrome check inside isPalindrome is called for
 each substring ([start, end]) and it may take up to 
O(n) for each check. Since isPalindrome is 
called repeatedly, this step can further increase 
time in practice unless memoized.

Space Complexity
Auxiliary Space: 
O(n) for recursion stack and current path.

Output Space: Up to 
O(2^n ⋅ n) to store all partitions in the result array.

Each partition is a list of strings, and there can be up to 
2^n partitions.

Summary Table
Aspect	 Complexity
Time	 O(2^n ⋅ n)
Space	 O(2^n ⋅ n) (output) + O(n) (stack)
*/
let n;
//Checks if the substring of s from index l to r (inclusive) is a palindrome:
function isPalindrome(s,l,r){
    //Compares characters from both ends moving toward the center.
    while(l<r){
        if(s[l] !== s[r]){
            return false;
        }
        l++;
        r--;
    }
    return true;
}
//Recursively builds all palindrome partitions:
function backtrack(s,idx,curr,result){
    //When the current index idx reaches the 
    // end (idx===n), makes a deep copy of curr 
    // and appends it to result.
    if(idx === n){
        result.push([...curr]);
        return;
    }
    //For every possible end index i starting from idx:
    for(let i=idx;i<n;i++){
        //If s[idx..i] is a palindrome:
        if(isPalindrome(s,idx,i)){
            //Adds the substring to curr.
            curr.push(s.substring(idx,i+1));
            //Recursively explores further substrings starting from i+1.
            backtrack(s,i+1,curr,result);
            //Removes the last added substring (backtracking step).
            curr.pop();
        }
    }
}
var partition = function(s){
    //Sets n to the length of the input string.
    n = s.length;
    //Initializes result (final answer, an array of arrays) and curr (current path).
    const result = [];
    const curr = [];
    //Calls backtrack starting from index 0.
    backtrack(s,0,curr,result);
    return result;
}

let s = "a";
let res = partition(s);
console.log("res--=",res);