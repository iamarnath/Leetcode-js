/*
3443. Maximum Manhattan Distance After K Changes

You are given a string s consisting of the 
characters 'N', 'S', 'E', and 'W', where s[i]
 indicates movements in an infinite grid:

'N' : Move north by 1 unit.
'S' : Move south by 1 unit.
'E' : Move east by 1 unit.
'W' : Move west by 1 unit.
Initially, you are at the origin (0, 0). You can
 change at most k characters to any of the four directions.

Find the maximum Manhattan distance from the
 origin that can be achieved at any time while 
 performing the movements in order.

The Manhattan Distance between two cells (xi, yi) 
and (xj, yj) is |xi - xj| + |yi - yj|.
 

Example 1:

Input: s = "NWSE", k = 1

Output: 3

Explanation:

Change s[2] from 'S' to 'N'. The string s becomes "NWNE".

Movement	Position (x, y)	Manhattan Distance	Maximum
s[0] == 'N'	(0, 1)	0 + 1 = 1	1
s[1] == 'W'	(-1, 1)	1 + 1 = 2	2
s[2] == 'N'	(-1, 2)	1 + 2 = 3	3
s[3] == 'E'	(0, 2)	0 + 2 = 2	3
The maximum Manhattan distance from the origin
 that can be achieved is 3. Hence, 3 is the output.

Example 2:

Input: s = "NSWWEW", k = 3

Output: 6

Explanation:

Change s[1] from 'S' to 'N', and s[4] from 'E' to 'W'.
 The string s becomes "NNWWWW".

The maximum Manhattan distance from the origin that
 can be achieved is 6. Hence, 6 is the output. 

Constraints:

1 <= s.length <= 105
0 <= k <= s.length
s consists of only 'N', 'S', 'E', and 'W'.
*/
/*
This code defines a function maxDistance that processes a string of moves (s) and calculates the maximum Manhattan Distance from the origin, with an allowance of up to k wasted steps (wrong or undoing moves) that can be adjusted.

Code Walkthrough:
js
var maxDistance = function (s, k) {
Defines a function maxDistance that takes:

s: a string consisting of directions "E", "W", "N", "S".

k: an integer telling how many wasted/mismatched moves can be "corrected".

js
    let maxMD = 0, east = 0, west = 0, north = 0, south = 0;
maxMD = variable to keep track of the maximum Manhattan Distance found so far.

east, west, north, south = counters for how many moves have been taken in each direction.

js
    let strLen = s.length;
Stores the total number of moves (s.length) in strLen for convenience.

js
    for (let i = 0; i < strLen; i++) {
Iterates through every character of string s.

Inside the loop:
js
        if (s[i] === "E") east++;
        else if (s[i] === "W") west++;
        else if (s[i] === "N") north++;
        else if (s[i] === "S") south++;
Depending on the move at index i:

Increase east if 'E'.

Increase west if 'W'.

Increase north if 'N'.

Increase south if 'S'.

This keeps track of the total movement in each direction.

js
        let currMD = Math.abs(east - west) + Math.abs(north - south);
Computes the current Manhattan Distance from the origin:

Horizontal displacement = abs(east - west).

Vertical displacement = abs(north - south).

Sum = Manhattan distance = currMD.

js
        let steps = i + 1;
Numbers of total steps taken so far (i is 0-based index, so i+1 steps taken).

js
        let wasted = steps - currMD;
Defines "wasted steps":

If every step pushed you further away, then ideally steps == currMD.

But usually moves cancel each other (e.g., "E" followed by "W").

So wasted = steps - distance.

Represents how many moves were "inefficient" or "cancelled".

js
        let extra = 0;
        if (wasted != 0) { //steps != currMD
            extra = Math.min(2 * k, wasted);
        }
Adjustment logic:

If there are wasted steps (meaning not all steps contributed to distance):

You are allowed up to k corrections.

Each correction can fix two wasted steps (because one bad step cancels a good one, so adjusting means undoing both).

So maximum you can recover = 2 * k.

But you can’t recover more than the actual wasted steps → Math.min(2 * k, wasted).

So extra is how much distance we can add back by "fixing" wasted moves.

js
        let finalCurrentMD = currMD + extra;
finalCurrentMD = current Manhattan distance after considering possible corrections from wasted steps.

js
        maxMD = Math.max(maxMD, finalCurrentMD);
Update the maxMD if the corrected Manhattan distance (finalCurrentMD) is larger.

js
    }
    return maxMD;
};
End of loop.

Return the maximum Manhattan Distance possible under these rules.

🔑 Summary of the Algorithm:
Count number of moves in each direction while traversing the string.

At each step, compute the current Manhattan distance.

Compute wasted steps (moves that canceled out).

Use up to k corrections to fix wasted steps (each correction recovers distance for two wasted steps).

Track the maximum corrected distance across the path.

✅ Example:
s = "ENWS", k = 1

Step 1: E → distance = 1

Step 2: N → distance = 2

Step 3: W → distance = 1 (some steps wasted)

Step 4: S → distance = 0, wasted steps = 4

With k = 1, you can fix 2 wasted steps → max distance improves.

*/
var maxDistance = function (s, k) {
    let maxMD = 0, east = 0, west = 0, north = 0, south = 0;
    let strLen = s.length;
    for (let i = 0; i < strLen; i++) {
        if (s[i] === "E") east++;
        else if (s[i] === "W") west++;
        else if (s[i] === "N") north++;
        else if (s[i] === "S") south++;
        let currMD = Math.abs(east - west) + Math.abs(north - south);
        let steps = i + 1;
        let wasted = steps - currMD;
        let extra = 0;
        if (wasted != 0) { //steps != currMD
            extra = Math.min(2 * k, wasted);
        }
        let finalCurrentMD = currMD + extra;
        maxMD = Math.max(maxMD, finalCurrentMD);
    }
    return maxMD;
};
//let s = "NWSE", k = 1;
let s = "NSWWEW", k = 3;
let res = maxDistance(s, k);
console.log("maxDistance==", res);