/*
846. Hand of Straights

Alice has some number of cards and she wants to rearrange the cards into groups so that each group is of size groupSize, and consists of groupSize consecutive cards.

Given an integer array hand where hand[i] is the value written on the ith card and an integer groupSize, return true if she can rearrange the cards, or false otherwise.

 

Example 1:

Input: hand = [1,2,3,6,2,3,4,7,8], groupSize = 3
Output: true
Explanation: Alice's hand can be rearranged as [1,2,3],[2,3,4],[6,7,8]
Example 2:

Input: hand = [1,2,3,4,5], groupSize = 4
Output: false
Explanation: Alice's hand can not be rearranged into groups of 4.

 

Constraints:

1 <= hand.length <= 104
0 <= hand[i] <= 109
1 <= groupSize <= hand.length

*/

var isNStraightHand = function (hand, groupSize) {
    const n = hand.length;
    if (n % groupSize != 0) return false;
    const mp = new Map();
    for (const num of hand) {
        mp.set(num, (mp.get(num) || 0) + 1);
    }
    const sortedKeys = Array.from(mp.keys()).sort((a, b) => a - b);
    let i = 0;
    while (i < sortedKeys) {
        const curr = sortedKeys[i];
        if (mp.get(curr) === 0) {
            continue;
        }
        for (let j = 0; j < groupSize; j++) {
            const key = curr + j;
            if (!mp.has(key) || mp.get(key) === 0) {
                return false;
            }
            mp.set(key, mp.get(key) - 1);
        }
    }
    return true;
}   