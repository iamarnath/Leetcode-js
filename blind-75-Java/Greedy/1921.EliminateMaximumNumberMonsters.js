/*
1921. Eliminate Maximum Number of Monsters
You are playing a video game where you are defending your city from a group of n monsters. You are given a 0-indexed integer array dist of size n, where dist[i] is the initial distance in kilometers of the ith monster from the city.

The monsters walk toward the city at a constant speed. The speed of each monster is given to you in an integer array speed of size n, where speed[i] is the speed of the ith monster in kilometers per minute.

You have a weapon that, once fully charged, can eliminate a single monster. However, the weapon takes one minute to charge. The weapon is fully charged at the very start.

You lose when any monster reaches your city. If a monster reaches the city at the exact moment the weapon is fully charged, it counts as a loss, and the game ends before you can use your weapon.

Return the maximum number of monsters that you can eliminate before you lose, or n if you can eliminate all the monsters before they reach the city.

 

Example 1:

Input: dist = [1,3,4], speed = [1,1,1]
Output: 3
Explanation:
In the beginning, the distances of the monsters are [1,3,4]. You eliminate the first monster.
After a minute, the distances of the monsters are [X,2,3]. You eliminate the second monster.
After a minute, the distances of the monsters are [X,X,2]. You eliminate the third monster.
All 3 monsters can be eliminated.
Example 2:

Input: dist = [1,1,2,3], speed = [1,1,1,1]
Output: 1
Explanation:
In the beginning, the distances of the monsters are [1,1,2,3]. You eliminate the first monster.
After a minute, the distances of the monsters are [X,0,1,2], so you lose.
You can only eliminate 1 monster.
Example 3:

Input: dist = [3,2,4], speed = [5,3,2]
Output: 1
Explanation:
In the beginning, the distances of the monsters are [3,2,4]. You eliminate the first monster.
After a minute, the distances of the monsters are [X,0,2], so you lose.
You can only eliminate 1 monster.
 

Constraints:

n == dist.length == speed.length
1 <= n <= 105
1 <= dist[i], speed[i] <= 105
*/

/*
function eliminateMaximum(dist, speed) {
Declares a function that takes two arrays:

dist: the initial distances of monsters from the city

speed: the speed of each monster moving toward the city.

const n = dist.length;
Stores the number of monsters (n), assuming both arrays have equal length.

const vec = new Array(n);
Creates an array vec to store the time (in minutes) when each monster reaches the city.

for (let i = 0; i < n; i++) {
Starts a loop that iterates over all monsters.

vec[i] = Math.ceil(dist[i] / speed[i]);
For each monster, it calculates the time needed to reach the city by dividing distance by speed.
The Math.ceil() rounds up since partial minutes still mean the monster arrives within that minute.

vec.sort((a, b) => a - b);
Sorts the monsters by their arrival times in ascending order. The earlier a monster arrives, the sooner it must be killed.

let count = 1;
Start by assuming you can kill at least one monster (the first one arriving).

let timePassed = 1;
Tracks the minutes passed since the start. After killing the first monster, one minute has passed.

for (let i = 1; i < n; i++) {
Iterates through the rest of the monsters.

if (vec[i] - timePassed <= 0) {
Checks if the next monster would already reach the city before you can kill it (its arrival time minus time passed is 0 or less).
If yes, the game ends—you can’t stop it.

return count;
Returns the number of monsters successfully eliminated so far.

count++; / timePassed++;
Otherwise, increment both — one more monster is killed, and another minute passes.

return count;
If all monsters are handled safely, return the total count.

Example Walkthrough
If dist = [3][2][4] and speed = [1][1][1]:

vec = [3][2][4] → sort → [2][3][4]

You kill at minute 0, 1, 2 before any reach the city → result = 3.

Complexity Analysis
Time Complexity:

Calculating arrival times: 

O(n)

Sorting the array: 

O(nlogn)

Looping through sorted times: 

O(n)
Total: 

O(nlogn)

Space Complexity:

vec array stores 
n
n times → 

O(n).

No extra significant memory is used beyond that.
Total: 
O(n)

*/
var eliminateMaximum = function(dist, speed) {
    const n = dist.length;
    const vec = new Array(n);
    for(let i=0;i<n;i++){
        vec[i] = Math.ceil(dist[i]/speed[i]);
    }
    vec.sort((a,b)=>a-b);
    let count = 1;
    let timePassed = 1;
    for(let i=1;i<n;i++){
        if(vec[i] - timePassed <=0){
            return count;
        }
        count++;
        timePassed++;
    }
    return count;
}


dist = [1,3,4], speed = [1,1,1];
console.log(eliminateMaximum(dist, speed));