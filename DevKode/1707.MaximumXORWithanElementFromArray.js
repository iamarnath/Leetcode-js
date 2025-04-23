/*
1707. Maximum XOR With an Element From Array

Description
You are given an array nums consisting of non-negative integers. You are also given a queries array, where queries[i] = [xi, mi].

The answer to the ith query is the maximum bitwise XOR value of xi and any element of nums that does not exceed mi. In other words, the answer is max(nums[j] XOR xi) for all j such that nums[j] <= mi. If all elements in nums are larger than mi, then the answer is -1.

Return an integer array answer where answer.length == queries.length and answer[i] is the answer to the ith query.

Example 1:

Input: nums = [0,1,2,3,4], queries = [[3,1],[1,3],[5,6]]
Output: [3,3,7]
Explanation:
1) 0 and 1 are the only two integers not greater than 1. 0 XOR 3 = 3 and 1 XOR 3 = 2. The larger of the two is 3.
2) 1 XOR 2 = 3.
3) 5 XOR 2 = 7.
Example 2:

Input: nums = [5,2,4,6,6,3], queries = [[12,4],[8,1],[6,3]]
Output: [15,-1,5]
 
Constraints:

1 <= nums.length, queries.length <= 105
queries[i].length == 2
0 <= nums[j], xi, mi <= 109
*/

class Trie {
    constructor() {
        this.children = [null, null];
    }
    /*
    Bitwise Right Shift (>>):
 The expression x >> i shifts the bits of x to the right by i positions.
 This operation effectively divides x by 
 2^i, discarding any remainder. For example, if x is 14 (binary 00001110),
 shifting it right by 1 (x >> 1) results in 7 (binary 00000111).
 
 Bitwise AND (&):
 The result of the right shift is then subjected to a bitwise AND operation with
  1, denoted as (x >> i) & 1. This operation isolates the least significant 
  bit (LSB) of the shifted value. If the LSB is 1, the result will be 1; 
  if it is 0, the result will be 0. For instance, if after shifting we have a
 value of 7 (binary 00000111), applying & 1 will yield 1, indicating that the
 original number had a 1 in that bit position.
    */
   /*
   Purpose: The insert method adds an integer x into the trie by storing its
    binary representation.
Loop through Bits: The loop iterates from the most significant bit (bit 30)
 to the least significant bit (bit 0). This is common when working with
  fixed-width binary representations.
Get Bit Value: The expression (x >> i) & 1 retrieves the i-th bit of x.
 If this bit is 1, v will be 1; if it is 0, v will be 0.
Creating Children: If the child corresponding to the bit value 
(node.children[v]) does not exist, a new Trie node is created. This effectively
 builds a path in the trie that represents the binary digits of x.
Traversal: After checking or creating a child node, we move down to that
 child node (node = node.children[v]) to continue processing the next bit.
   */
    insert(x) {
        let node = this;
        for (let i = 30; i >= 0; i--) {
            const v = (x >> i) & 1; //Get the i-th bit of x
            if (node.children[v] === null) {
                node.children[v] = new Trie();
            }
            node = node.children[v];
        }

    }
    // Search for the maximum XOR for a given number
    /*
    Purpose: The search method finds the maximum XOR value obtainable 
    with any number stored in the trie when XORed with x.
Loop through Bits: Similar to insert, it iterates from bit 30 down to bit 0.
Get Bit Value: Again, (x >> i) & 1 retrieves the current bit of x.
XOR Operation:
The expression v ^ 1 computes the opposite bit of v. If v is 0, then v ^ 1 is 1,
 and vice versa.
The condition if(node.children[v^1] !== null) checks if there is a child
 corresponding to the opposite bit. This is crucial because to maximize XOR,
  we want to choose bits that differ from those in x.
If such a child exists, it means we can take that path in the trie,
 contributing to maximizing our result (ans |= 1 << i) by setting that
  specific bit in our answer.
Fallback: If there is no opposite child but there is a child corresponding
 to the current bit (node.children[v] !== null), we continue down that path.
  If neither exists, it indicates that no further valid paths are available,
   and we return -1.
Return Result: After processing all bits, it returns the computed
 maximum XOR value.
    */
    search(x){
        let node = this;
        let ans=0;
        for(let i=30;i>=0;i--){
            const v = (x>>i) & 1; // Get the i-th bit of x
            if(node.children[v^1] !== null){  // Check for the opposite bit
                /*
                Breakdown of the Expression
Left Shift Operator (<<):
The expression 1 << i shifts the binary representation of the number 1 to the left by i positions. This effectively multiplies 1 by 
2^i . For example:
If i=0: 1<<0 results in 00000001 (binary), which is 1 in decimal.
If i=1: 1<<1 results in 00000010 (binary), which is 2 in decimal.
If i=2: 1<<2 results in 00000100 (binary), which is 4 in decimal.
Thus, 1 << i sets the i th bit of the result to 1, while all other bits are 0.
Bitwise OR Assignment Operator (|=):
The operator |= is a shorthand that combines the bitwise OR operation (|) with assignment. It updates the variable on the left (ans) by performing a bitwise OR with the value on the right.
The bitwise OR operation compares each bit of two numbers and sets each bit to 1 if at least one of the corresponding bits is 1. For example:
If ans=00000000 (initially) and we perform ans∣=00000010, then ans becomes 00000010.
If ans=00000010 and we perform ans∣=00000100, then ans becomes 00000110.
Purpose in Context
In the context of the provided code, this operation is used to build a number
 (ans) that represents the maximum XOR value found during the search process:
Setting Bits: When a suitable opposite bit (to maximize XOR) is found while
 traversing through the trie, ans |= 1 << i; sets the corresponding bit in ans
  to 1. This means that for every bit position where an optimal choice was
   made (to maximize XOR), that bit will be set in the final result.
Final Result: After processing all relevant bits, ans will contain a binary
 number that represents the maximum XOR value obtainable with any number
  stored in the trie against the given number.
                */
                ans |= 1<<i;// Set the corresponding bit in the answer
                node = node.children[v^1];
            }
            else if(node.children[v] !== null){
                node = node.children[v];
            }
            else{
                return -1;// If neither child exists, return -1
            }
        }
        return ans;
    }
}

function maximizeXor(nums, queries) {
    //The input array nums is sorted in ascending order. This allows efficient 
    //searching and insertion into a data structure (like a Trie) later on.
    nums.sort((a,b)=>a-b);
    /*
    An index array idx is created to keep track of the original indices of
    the queries.
    This index array is sorted based on the second element (m) of each query.
    This allows processing queries in order of their constraints, which is
    crucial for efficiently managing which numbers from nums can be considered.
    */
    const n = queries.length;
    // Create an array of indices and sort based on query values
    const idx = Array.from({length:n},(_,i)=>i);
    //console.log("idx before sort--",idx);
    idx.sort((i,j)=>queries[i][1] - queries[j][1]);
    //console.log("idx after sort--",idx);
    const ans = new Array(n);
    const trie = new Trie();
    let j=0;
    for(const i of idx){
        /*
        For each query (processed in order of m), numbers from nums
         that are less than or equal to m are inserted into the Trie.
        After inserting valid numbers into the Trie, it searches for the
         maximum XOR value with x.
        The result for each query is stored in the corresponding index
         of the ans array.
        */
        const x = queries[i][0];
        const m = queries[i][1];
        // Insert numbers into the Trie that are less than or equal to m
        while(j < nums.length && nums[j] <= m){
            trie.insert(nums[j++]);
        }
        ans[i] = trie.search(x);
    }
    return ans;
}

// Example usage:
// const nums = [3, 5, 7, 9];
// const queries = [[2, 3], [3, 5], [5, 7]];
//nums = [0,1,2,3,4], queries = [[3,1],[1,3],[5,6]];
nums = [5,2,4,6,6,3], queries = [[12,4],[8,1],[6,3]]
const result = maximizeXor(nums, queries);
console.log("Maximized XOR results:", result);