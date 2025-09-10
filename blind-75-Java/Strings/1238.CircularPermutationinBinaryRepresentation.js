/*
1238. Circular Permutation in Binary Representation

*/

/*
The code generates a circular permutation of n-bit Gray codes, 
starting from a given integer start, by XORing each standard 
Gray code with start. This ensures the sequence begins with 
start and each adjacent value differs by only one bit.
Gray Code Generation
The loop runs from 0 to 
2^n −1, constructing all n-bit Gray codes using the formula 
i^(i>>1), where ^ is XOR.

Circular Permutation via XOR with Start
Instead of just pushing the regular Gray code, 
each value is XORed with start (i ^ (i >> 1) ^ start).
 This operation offsets the code so that the resulting 
 sequence starts with start and maintains the
  one-bit-change property throughout the cycle.

Result Building
The resulting array ans contains the permuted Gray code sequence of length 
2^n , starting from start and forming a full circle 
 (the last and first elements also differ by one bit).

Key Points
Gray code: Each number differs from the previous
 by exactly one bit.

Offset with XOR: XORing with start shifts the sequence 
so start becomes the first element, but preserves bit-difference adjacency.

Circular: The sequence forms a cycle, so the last and first
 elements are also one-bit apart.

This approach efficiently constructs the required circular permutation in 
O(2^n) time and ensures all constraints are met in a single pass.

*/

/*
Easy Explanation
First, i runs from 0 up to 
2
n
−
1
2 
n
 −1 (where 
n
n is the number of bits).

i ^ (i >> 1) generates a Gray code for each number. Gray
 code is a way of writing numbers so that each next 
 number differs from the previous by just one bit.

The ^ symbol is a bitwise XOR (exclusive or). It 
compares each bit in the numbers: same → 0, different → 1.

By doing ^ start, each Gray code is shifted so the
 list begins at the number you want (start), but 
 the one-bit difference remains.

Each calculated value is put into the answer list.

Example
Suppose n = 3, start = 5 (binary 101):

For i = 1, Gray code is 
1^0 =1 → binary 001.

001 ^ 101 = 100 (in binary) = 4 (in decimal).

So 4 is put in the answer at that step.

What does XOR do?
Bit A	    Bit B	Result (A ^ B)
0	        0	    0
0	        1	    1
1	        0	    1
1	        1	    0
So XOR returns 1 when the bits are different, 0 when they are the same.

In summary: This line makes a special sequence of numbers,
 starting from any chosen value, where each next number
  differs from the last by only one binary digit.

*/

var circularPermutation = function(n, start) {
    let ans = [];
    let lastIndex = 1 << n;
    for (let i = 0; i < lastIndex ; ++i) {
        ans.push(i ^ (i >> 1) ^ start);
    }
    return ans;
};

/*
Simple, Analogy-Based Explanation
Think of each number in our list as a locker number with a secret code.

For each locker (i), we create a new code that makes sure 
every code in the sequence only changes a single digit 
from the one before—just like switching one light on
 or off in a row of bulbs.

The formula i ^ (i >> 1) guarantees that each code
 changes by one digit compared to the previous.
  This special way of numbering is called the 
  "Gray code"—used in places where you want 
  only tiny changes step-by-step, helping avoid 
  mistakes if you're reading or switching fast.

We want our code sequence to start at a special
 locker (start), not always at zero. By combining
  (mixing) each code with our chosen starting 
  code (using ^ start), we shift the sequence to 
  start with the locker we care about but still keep 
  the one-digit change rule.

At each step, we add this newly calculated locker
 code to our answer list, so we get the exact order needed.

Visual Intuition
Imagine a series of rooms. Every time you move 
to the next room, only one light switch changes.
 If you want to start the tour from a particular 
 room, you rearrange the order so the beginning 
 matches your preferred room—but the "one switch
  at a time" rule is kept.

Summary Sentence
This line builds a special ordered list of 
numbers where each step only tweaks one tiny detail, 
starting from your chosen place—ideal for when small 
changes are safer or easier to track.

*/