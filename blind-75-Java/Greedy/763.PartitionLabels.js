/*
763. Partition Labels
You are given a string s. We want to partition
 the string into as many parts as possible so that 
 each letter appears in at most one part.
  For example, the string "ababcc" can be partitioned
   into ["abab", "cc"], but partitions such 
   as ["aba", "bcc"] or ["ab", "ab", "cc"] are invalid.

Note that the partition is done so that after 
concatenating all the parts in order, the resultant string should be s.

Return a list of integers representing the size of these parts.

Example 1:

Input: s = "ababcbacadefegdehijhklij"
Output: [9,7,8]
Explanation:
The partition is "ababcbaca", "defegde", "hijhklij".
This is a partition so that each letter appears in at most one part.
A partition like "ababcbacadefegde", "hijhklij" is incorrect,
 because it splits s into less parts.
Example 2:

Input: s = "eccbbbbdec"
Output: [10]
 

Constraints:

1 <= s.length <= 500
s consists of lowercase English letters.
*/

/*
Track Last Occurrences:

First, it records the last index at which each 
character appears in the string. This is done using
 an array of size 26 (for each lowercase English letter),
  mapping each character to its last occurrence index.

Partition the String:

It then scans the string again, keeping track 
of the farthest index (end or maxIndex) any 
character in the current partition has been seen.

When the current index equals this farthest index,
 it means the current partition can be closed here.
  The length of this partition is recorded, 
  and a new partition starts from the next index.

Time Complexity
O(n):

The first loop (recording last indices) runs in 

O(n) time, where 

n is the length of the string.

The second loop (partitioning) also runs in 

O(n) time.

Total: 

O(n)+O(n)=O(n).

Space Complexity
O(1):

The space used for the array of last indices is
fixed (26 elements for lowercase English letters), so it’s 
O(1).

The result list (partition sizes) is output 
space andnot counted towards auxiliary space in
 most complexity analyses, but if included, it would be 

O(k), where 
k is the number of partitions (which can be at most 
n in the worst case, but is typically much smaller).

Main auxiliary space: 

O(1)

*/
/*
Step 1: Track Last Occurrence:

The code first records the last index at which
 each character appears in the string. This is 
 done using an array mp of size 26 (for lowercase 
 English letters), where each index corresponds to a letter.

Step 2: Partition the String:

The code then scans the string from left to right,
 keeping track of the farthest index (end) any
  character in the current partition has been seen.

When the current index (i) equals this farthest 
index (end), it means the current partition can
 be closed here. The length of this partition is recorded,
  and a new partition starts from the next index (start = end + 1).

Time and Space Complexity
Time Complexity:

O(n): The code makes two passes through the string: 
one to record the last occurrence of each character 
and one to partition the string. Both passes are linear,
 so the total time complexity is 

O(n).

Space Complexity:

O(1): The auxiliary space used is constant 
(the mp array of size 26), regardless of the input size.
 The result array is output and not counted towards
  auxiliary space in standard analyses, but if included, it would be 

O(k), where 

k is the number of partitions

*/
var partitionLabelsOld = function (s) {
    const n = s.length;
    const result = [];
    const mp = new Array(26).fill(-1);

    // Record the last occurrence of each character
    for (let i = 0; i < n; i++) {
        const idx = s.charCodeAt(i) - 'a'.charCodeAt(0);
        mp[idx] = i;
    }

    let i = 0;
    while (i < n) {
        let end = mp[s.charCodeAt(i) - 'a'.charCodeAt(0)];
        let j = i;
        while (j < end) {
            end = Math.max(end, mp[s.charCodeAt(j) - 'a'.charCodeAt(0)]);
            j++;
        }
        result.push(j - i + 1);
        i = j + 1;
    }

    return result;
};

var partitionLabels = function (s) {
    let n = s.length;
    const result = [];
    const mp = new Array(26).fill(-1);
    // Record the last occurrence of each character
    for (let i = 0; i < n; i++) {
        const idx = s.charCodeAt(i) - "a".charCodeAt(0);
        mp[idx] = i;
    }
    let start = 0;
    let end = 0;
    for (let i = 0; i < n; i++) {
        end = Math.max(end, mp[s.charCodeAt(i) - "a".charCodeAt(0)]);
        if (i === end) {
            result.push(end - start + 1);
            start = end + 1;
        }
    }
    return result;
};

let s = "ababcbacadefegdehijhklij";
let res = partitionLabels(s);
console.log("partitionLabels==", res);

