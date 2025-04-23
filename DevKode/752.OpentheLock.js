/*
752. Open the Lock
Solution - https://leetcode.com/problems/open-the-lock/solutions/5174890/optimised/

Description
You have a lock in front of you with 4 circular wheels. Each wheel has 10 slots: '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'. The wheels can rotate freely and wrap around: for example we can turn '9' to be '0', or '0' to be '9'. Each move consists of turning one wheel one slot.

The lock initially starts at '0000', a string representing the state of the 4 wheels.

You are given a list of deadends dead ends, meaning if the lock displays any of these codes, the wheels of the lock will stop turning and you will be unable to open it.

Given a target representing the value of the wheels that will unlock the lock, return the minimum total number of turns required to open the lock, or -1 if it is impossible.

Example 1:

Input: deadends = ["0201","0101","0102","1212","2002"], target = "0202"
Output: 6
Explanation: 
A sequence of valid moves would be "0000" -> "1000" -> "1100" -> "1200" -> "1201" -> "1202" -> "0202".
Note that a sequence like "0000" -> "0001" -> "0002" -> "0102" -> "0202" would be invalid,
because the wheels of the lock become stuck after the display becomes the dead end "0102".
Example 2:

Input: deadends = ["8888"], target = "0009"
Output: 1
Explanation: We can turn the last wheel in reverse to move from "0000" -> "0009".
Example 3:

Input: deadends = ["8887","8889","8878","8898","8788","8988","7888","9888"], target = "8888"
Output: -1
Explanation: We cannot reach the target without getting stuck.
 

Constraints:

1 <= deadends.length <= 500
deadends[i].length == 4
target.length == 4
target will not be in the list deadends.
target and deadends[i] consist of digits only.

*/

/*
Approach:

The fillNeighbors function is defined as a nested function inside openLock. It takes the current combination curr, the queue que, and the set of deadends dead as parameters.
Inside fillNeighbors, it iterates over each digit in the current combination.
For each digit, it generates two new combinations: one by decrementing the digit (if it's not '0') and one by incrementing the digit (if it's not '9').
It checks if the generated combinations are not in the set of deadends and not visited before. If they are valid, it adds them to the queue and the set of visited combinations.
In the openLock function, it initializes the set of deadends dead with the given deadends.
It checks if the starting combination "0000" is a deadend. If so, it returns -1 indicating that no solution exists.
It initializes the queue que with the starting combination "0000".
It starts the BFS process by iterating until the queue is empty.
In each iteration, it processes all the combinations at the current level (size of the queue at the beginning of the iteration).
For each combination, it checks if it matches the target combination. If so, it returns the current level (number of steps taken).
If the target combination is not found, it calls the fillNeighbors function to generate and enqueue the neighboring combinations.
If the queue becomes empty without finding the target combination, it returns -1 indicating that no solution exists.

Time Complexity:

The time complexity of this solution is O(N * 4^N), where N is the length of the target string.
This is because there are 4^N possible combinations, and for each combination, we need to check if it is a deadend.
The BFS process ensures that we find the minimum number of steps required to reach the target combination.

Space Complexity:

The space complexity is O(N * 4^N), as we need to store all the visited combinations in the queue and the set.
The queue stores the combinations to be processed, and the set keeps track of the visited combinations to avoid revisiting them.
*/

var openLock = function (deadends, target) {
    const fillNeighbors = function (que, curr, dead) {
        for (let i = 0; i < 4; i++) {
            let ch = curr[i];
            let dec = (ch === '0') ? '9' : String.fromCharCode(ch.charCodeAt(0) - 1);
            let inc = (ch === '9') ? '0' : String.fromCharCode(ch.charCodeAt(0) + 1);
            curr = curr.slice(0, i) + dec + curr.slice(i + 1);

            if (!dead.has(curr)) {
                dead.add(curr);
                que.push(curr);
            }
            curr = curr.slice(0, i) + inc + curr.slice(i + 1);

            if (!dead.has(curr)) {
                dead.add(curr);
                que.push(curr);
            }
            curr = curr.slice(0, i) + ch + curr.slice(i + 1);
        }
    };
    const dead = new Set();
    for (let deadend of deadends) {
        dead.add(deadend);
    }
    const start = "0000";
    if (dead.has(start)) {
        return -1;
    }
    const que = [];
    que.push(start);
    let level = 0;
    while (que.length > 0) {
        let n = que.length;
        while (n-- > 0) {
            let curr = que.shift();
            if (curr === target) {
                return level;
            }
            fillNeighbors(que, curr, dead);
        }
       
        level++;
    }
    return -1;
}

let deadends = ["0201", "0101", "0102", "1212", "2002"], target = "0202";
deadends = ["8888"], target = "0009";
deadends = ["8887", "8889", "8878", "8898", "8788", "8988", "7888", "9888"], target = "8888";
console.log(openLock(deadends, target));