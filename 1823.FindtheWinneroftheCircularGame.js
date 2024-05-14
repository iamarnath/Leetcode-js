/*
1823. Find the Winner of the Circular Game

https://www.geeksforgeeks.org/josephus-problem/

Solution - https://leetcode.com/problems/find-the-winner-of-the-circular-game/solutions/5154786/suboptimal/

https://leetcode.com/problems/find-the-winner-of-the-circular-game/solutions/5154842/optimised-josephus/

Description
There are n friends that are playing a game. The friends are sitting in a circle and are numbered from 1 to n in clockwise order. More formally, moving clockwise from the ith friend brings you to the (i+1)th friend for 1 <= i < n, and moving clockwise from the nth friend brings you to the 1st friend.

The rules of the game are as follows:

Start at the 1st friend.
Count the next k friends in the clockwise direction including the friend you started at. The counting wraps around the circle and may count some friends more than once.
The last friend you counted leaves the circle and loses the game.
If there is still more than one friend in the circle, go back to step 2 starting from the friend immediately clockwise of the friend who just lost and repeat.
Else, the last friend in the circle wins the game.
Given the number of friends, n, and an integer k, return the winner of the game.

Example 1:

Input: n = 5, k = 2
Output: 3
Explanation: Here are the steps of the game:
1) Start at friend 1.
2) Count 2 friends clockwise, which are friends 1 and 2.
3) Friend 2 leaves the circle. Next start is friend 3.
4) Count 2 friends clockwise, which are friends 3 and 4.
5) Friend 4 leaves the circle. Next start is friend 5.
6) Count 2 friends clockwise, which are friends 5 and 1.
7) Friend 1 leaves the circle. Next start is friend 3.
8) Count 2 friends clockwise, which are friends 3 and 5.
9) Friend 5 leaves the circle. Only friend 3 is left, so they are the winner.
Example 2:

Input: n = 6, k = 5
Output: 1
Explanation: The friends leave in this order: 5, 4, 6, 2, 3. The winner is friend 1.
 
Constraints:

1 <= k <= n <= 500
 

Follow up:

Could you solve this problem in linear time with constant space?
*/
/*
Approach to Finding the Winner of the Circular Game

The provided JavaScript function findTheWinner aims to determine the winner of a circular game where 'n' players are seated in a circle and every 'k-th' player is eliminated until only one player remains. The function uses a queue data structure to simulate this elimination process.
Initialization: The function initializes a queue with player numbers from 1 to 'n'.
Elimination Loop: It iterates through the queue, removing every 'k-th' player until only one player remains.
Elimination Process: The function simulates the elimination by rotating the queue and removing the 'k-th' player until the loop ends.
Winner Determination: The last player remaining in the queue after all eliminations is declared the winner.

Time Complexity

The time complexity of this function is O(n*k) where 'n' is the number of players and 'k' is the step size for elimination.
In the worst-case scenario, the loop runs 'n' times for each elimination, resulting in a total of 'n*k' operations.

Space Complexity

The space complexity of this function is O(n) where 'n' is the number of players.
The queue stores all 'n' players initially, occupying linear space based on the number of players.

*/
//approach 1
var findTheWinner = function(n, k) {
    let queue=[];
    for(let i=1;i<=n;i++){
        queue.push(i)
    }
    while(queue.length>1){
        let toRemove=k-1;
        while(toRemove>0){
            queue.push(queue.shift());
            toRemove--;
        }
        queue.shift();
    }
    return queue.shift();
};
//approach 2
/*
The optimized solution using the formula (winner + k) % i to calculate the winner directly is based on the concept of the Josephus problem, which is a mathematical problem related to a game of elimination.
Here's the step-by-step explanation of the logic behind this solution:
Initialize winner to 0: This represents the position of the winner in the final round.
Iterate from 1 to n: This loop simulates the elimination process for each player.
Update winner using the formula: The formula (winner + k) % i calculates the position of the winner after each elimination round.
winner represents the position of the winner in the previous round.
k is the step size for elimination.
i is the current player index (1-based).
The modulo operator % ensures that the position wraps around to the beginning of the list when it exceeds the current number of players.
Return winner + 1: After the loop completes, winner will hold the 0-based index of the final winner. We add 1 to convert it to a 1-based index and return the result.
The formula (winner + k) % i works because it calculates the position of the winner in each round based on the previous winner's position and the step size k. The modulo operator ensures that the position wraps around to the beginning of the list when it exceeds the current number of players.
For example, let's consider the case where n = 5 and k = 2:
Round 1: (0 + 2) % 1 = 0 (player 1 is eliminated)
Round 2: (0 + 2) % 2 = 0 (player 2 is eliminated)
Round 3: (0 + 2) % 3 = 2 (player 4 is eliminated)
Round 4: (2 + 2) % 4 = 0 (player 5 is eliminated)
Final winner: 0 + 1 = 1 (player 3 wins)
This formula-based approach allows us to calculate the winner directly without the need for a queue or simulating the elimination process, resulting in a linear time complexity with constant space complexity.

Time Complexity

The optimized function has a time complexity of O(n) where 'n' is the number of players.
It iterates through all players once to calculate the final winner directly.

Space Complexity

The optimized function has a space complexity of O(1) as it does not use any additional data structures that grow with the input size.
It maintains a constant amount of space regardless of the number of players.

*/

var findTheWinner = function(n, k) {
    let winner = 0;
    for (let i = 1; i <= n; i++) {
        winner = (winner + k) % i;
    }
    return winner + 1;
}


console.log(findTheWinner(n,k));