/*
Given an integer array nums, return the maximum result of nums[i] XOR nums[j], where 0 <= i <= j < n.

 

Example 1:

Input: nums = [3,10,5,25,2,8]
Output: 28
Explanation: The maximum result is 5 XOR 25 = 28.
Example 2:

Input: nums = [14,70,53,83,49,91,36,80,92,51,66,70]
Output: 127
 

Constraints:

1 <= nums.length <= 2 * 105
0 <= nums[i] <= 231 - 1
*/
/*
This solution finds the maximum XOR of two numbers in the array by iteratively building the maximum XOR bit-by-bit, starting from the most significant bit. Here’s a breakdown of how it works:

Step-by-Step Explanation
Initialize max and mask:

max: This will hold our current best result for the maximum XOR. We build it incrementally from the most significant to the least significant bit.
mask: This variable helps us isolate the current set of bits we are considering as we move from the most significant to the least significant bit.
Iterate Over Each Bit Position from High to Low:

We iterate from the 31st bit down to the 0th bit (assuming 32-bit integers).
mask |= (1 << i) is used to update the mask to include the i-th bit and all more significant bits, helping to isolate the prefixes of the numbers up to the current bit position.
Store Prefixes with Current mask:

For each number, num & mask extracts the prefix up to the current bit position.
These prefixes are stored in a Set called found. This set helps us quickly check if certain XOR results are achievable with the current set of prefixes.
Calculate and Test the Candidate Maximum XOR:

For each bit position i, we assume optimistically that we can set this bit in max, which gives a candidate value: candidate = max | (1 << i).
This candidate represents the maximum XOR we could achieve if the current bit i is set to 1.
Check if the Candidate is Achievable:

To see if setting this bit in max is possible, we check if any two prefixes in found can achieve this candidate XOR.
For any prefix in found, we check if prefix ^ candidate also exists in found.
This is because if prefix1 ^ prefix2 = candidate, then prefix2 = prefix1 ^ candidate.
If we find such a pair of prefixes, it means that setting the current bit in max is achievable, so we update max to candidate.
Return the Result:

After the loop, max will contain the maximum XOR possible between any two numbers in the array.
Example Walkthrough
Suppose nums = [25, 10]. Here’s how the solution would approach it:

Initial Variables:

max = 0
mask = 0
Bit Position 31 (Starting from the Most Significant Bit):

Update mask to 100...0 (binary for 32-bit, with only the 31st bit set).
Compute found set: extract each number’s 31-bit prefix with the mask. Repeat for each bit down to 0.
*/
var findMaximumXORFaster = function(nums) {
    let max = 0, mask = 0;
    for (let i = 31; i >= 0; i--) {
        mask |= (1 << i);
        let found = new Set();
        for (let num of nums) {
            found.add(num & mask);
        }
        let candidate = max | (1 << i);
        for (let prefix of found) {
            if (found.has(prefix ^ candidate)) {
                max = candidate;
                break;
            }
        }
    }
    return max;
};

console.log(findMaximumXORFaster([14,70,53,83,49,91,36,80,92,51,66,70]))
/*
This solution works efficiently by leveraging a Trie structure to store each number bit-by-bit, allowing quick access to paths that maximize the XOR for each number. Let’s go through each part and see why this approach is both correct and efficient.

Solution Analysis
Trie Insertion:

Each number in nums is inserted into the Trie using 31 bits (from bit 30 down to 0).
For each bit, a node in the Trie is created: left for 0 and right for 1. This structure enables quick traversal based on each bit's value.
Inserting each number takes 
𝑂
(
log
𝐶
)
O(logC), where 
𝐶
C is the maximum number (since we are inserting based on bits).
Querying the Trie for Maximum XOR:

For each number a in nums, we calculate a target value find by XORing a with Number.MAX_SAFE_INTEGER. This sets up a target that ideally flips each bit in a to maximize XOR.

Traversing the Trie with find allows us to select paths that maximize XOR:

If the bit in find is 0, we ideally want to move to the right (or 1 path in the Trie) to get a 1 bit in the XOR result. If that path is unavailable, we go left instead.
If the bit in find is 1, we ideally want to move to the left (or 0 path in the Trie). If that path is unavailable, we go right.
XOR Calculation:

At each bit position, we adjust the answer (ans) based on the traversal path. If we have to take the less optimal path (opposite of the desired bit in find), we avoid setting that bit in ans.
The final XOR value a ^ b (where b is the constructed number from the Trie traversal) is calculated, and the maximum XOR found so far is updated.
Efficiency:

Insertion and Query both take 
𝑂
(
log
𝐶
)
O(logC), where 
𝐶
C is the bit length (31 in this case).
Since we perform these operations once for each number in nums, the overall time complexity is 
𝑂
(
𝑁
⋅
log
𝐶
)
O(N⋅logC), which is efficient enough for large inputs, like 200,000 elements in nums.
Key Points That Made This Solution Efficient
Bitwise Trie Traversal:

By storing numbers as bitwise paths in the Trie, it’s easy to find the maximum XOR by selecting opposite paths where possible. This minimizes the need for nested loops, as we're only performing a single Trie traversal for each number.
Greedy Bitwise Search:

By attempting to maximize XOR at each bit position from the most significant bit to the least, the solution quickly zeroes in on the best paths without redundant checks.
Space Efficiency:

The Trie structure only creates nodes as needed (if the path doesn’t already exist), which helps limit memory usage compared to storing each bitwise combination or using a brute-force approach.
Example Walkthrough
For clarity, let's walk through a quick example:

Suppose nums = [25, 10], and the Trie is structured bit-by-bit for these numbers:

Inserting 25 (11001 in binary):

Bit-by-bit, nodes are created along the path 1 -> 1 -> 0 -> 0 -> 1.
Inserting 10 (01010 in binary):

Bit-by-bit, nodes are created along the path 0 -> 1 -> 0 -> 1 -> 0.
When querying for the maximum XOR with 25:

For the most significant bit, we attempt to go opposite to each bit of find, navigating through the Trie to maximize the XOR value.
This leads to selecting paths that maximize XOR without needing to brute-force compare all pairs.

Final Summary
The solution effectively optimizes the search for maximum XOR by using a Trie and bitwise traversal. Each step of the algorithm is designed to maximize XOR with minimal computation, making it ideal for large arrays. This is why the solution performs efficiently even when the input size is substantial.
*/

class TrieNode {
    constructor() {
        this.left = null;  // Represents 0
        this.right = null; // Represents 1
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    // Insert a number into the Trie
    insert(val) {
        let bitIndex = 30; // We will use 31 bits (0 to 30)
        let curr = this.root;

        while (bitIndex >= 0) {
            const mask = 1 << bitIndex;
            const bit = (mask & val) > 0 ? 1 : 0;

            if (bit === 0) { // If the bit is 0, go left
                if (curr.left === null) {
                    curr.left = new TrieNode();
                }
                curr = curr.left;
            } else { // If the bit is 1, go right
                if (curr.right === null) {
                    curr.right = new TrieNode();
                }
                curr = curr.right;
            }
            bitIndex--;
        }
    }

    // Query the Trie to find the maximum XOR for a given number
    query(find) {
        let bitIndex = 30; // We will use 31 bits (0 to 30)
        let curr = this.root;
        let ans = 0;

        while (bitIndex >= 0) {
            const mask = 1 << bitIndex;
            const bit = (find & mask) > 0 ? 1 : 0;

            if (bit === 0) {
                if (curr.left !== null) {
                    curr = curr.left; // Go left for '0'
                } else {
                    curr = curr.right; // Go right for '1'
                    ans |= mask; // Set the corresponding bit in the answer
                }
            } else {
                if (curr.right !== null) {
                    curr = curr.right; // Go right for '1'
                    ans |= mask; // Set the corresponding bit in the answer
                } else {
                    curr = curr.left; // Go left for '0'
                }
            }

            bitIndex--;
        }
        return ans;
    }
}


var findMaximumXORTrie = function(nums) {
 const trie = new Trie();

        // Insert all numbers into the Trie
        for (const val of nums) {
            trie.insert(val);
        }

        let max = 0;
        for (const a of nums) {
            const find = Number.MAX_SAFE_INTEGER ^ a; // Use XOR with max integer
            const b = trie.query(find);
            max = Math.max(max, a ^ b);
        }
        
        return max;
};

console.log("findMaximumXORTrie")
console.log(findMaximumXORTrie([14,70,53,83,49,91,36,80,92,51,66,70]))
