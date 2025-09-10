/*
 * 1900. The Earliest and Latest Rounds Where Players Compete
 * There is a tournament where n players are participating. The players are standing in a single row and are numbered from 1 to n based on their initial standing position (player 1 is the first player in the row, player 2 is the second player in the row, etc.).

The tournament consists of multiple rounds (starting from round number 1). In each round, the ith player from the front of the row competes against the ith player from the end of the row, and the winner advances to the next round. When the number of players is odd for the current round, the player in the middle automatically advances to the next round.

For example, if the row consists of players 1, 2, 4, 6, 7
Player 1 competes against player 7.
Player 2 competes against player 6.
Player 4 automatically advances to the next round.
After each round is over, the winners are lined back up in the row based on the original ordering assigned to them initially (ascending order).

The players numbered firstPlayer and secondPlayer are the best in the tournament. They can win against any other player before they compete against each other. If any two other players compete against each other, either of them might win, and thus you may choose the outcome of this round.

Given the integers n, firstPlayer, and secondPlayer, return an integer array containing two values, the earliest possible round number and the latest possible round number in which these two players will compete against each other, respectively.

 

Example 1:

Input: n = 11, firstPlayer = 2, secondPlayer = 4
Output: [3,4]
Explanation:
One possible scenario which leads to the earliest round number:
First round: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
Second round: 2, 3, 4, 5, 6, 11
Third round: 2, 3, 4
One possible scenario which leads to the latest round number:
First round: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
Second round: 1, 2, 3, 4, 5, 6
Third round: 1, 2, 4
Fourth round: 2, 4
Example 2:

Input: n = 5, firstPlayer = 1, secondPlayer = 5
Output: [1,1]
Explanation: The players numbered 1 and 5 compete in the first round.
There is no way to make them compete in any other round.
 

Constraints:

2 <= n <= 28
1 <= firstPlayer < secondPlayer <= n
 * 
*/
/*
 * Time Complexity
Worst Case:
The number of recursive calls grows exponentially with n, because for each round, all possible survivor combinations are considered.

Each call can branch into multiple sub-calls, leading to a complexity of approximately O(2^n) in the worst case.

Optimizations:

In practice, memoization (not shown here) can reduce repeated work, but the current code does not use it.

For small n (as in the problem constraints), this is acceptable.

Space Complexity
Recursive Stack:

The maximum depth of recursion is O(n) (one call per round).

Auxiliary Space:

No significant extra space except for recursion stack and local variables.
 * 
*/
package Recursion;

import java.util.Arrays;

public class EarliestandLatestRoundsWherePlayersCompete1900 {
    public int[] earliestAndLatest(int n, int firstPlayer, int secondPlayer) {
        int left = firstPlayer;
        int right = secondPlayer;
        //In a knockout, player i meets player n-i+1 in the first round.
        //If this is true, they meet in round 1 (both earliest and latest).
        if (left == n - right + 1) {
            return new int[] { 1, 1 }; // Return a new int array initialized with values.
        }
        //Ensures we always process the scenario where left is less than right
        // (for symmetry and easier calculation).
        /*
         * What is Happening?
This block re-maps the positions of firstPlayer and secondPlayer 
so that left is always less than or equal to right 
(and both are on the "left" side of the bracket).

The calculation n - x + 1 gives the mirrored position
 from the other end of the row (since in each round, 
 the first player faces the last, second faces 
 second-last, and so on).

Why is this Written?
Symmetry: The tournament is symmetric; the left and right
 halves are mirror images. By always working with the
  smaller position as left, you avoid redundant calculations 
  and ensure you only consider unique scenarios.

Simplification: This reduces the number of cases you 
need to handle in later logic, making the recursive 
simulation easier and less error-prone.

Example: If you have players at positions 2 and 10 
in an 11-player tournament, their mirrored positions 
are 2 and 2 (since 11-10+1=2). This lets you handle both
 (2,10) and (10,2) as the same case.
         * 
        */
        if (left > n - right + 1) {
            int temp = n - left + 1;
            left = n - right + 1;
            right = temp;
        }
        int minRound = n;
        int maxRound = 1;
        //In each round, half the players move on (rounded up if odd).
        int nextRoundPlayersCount = (n + 1) / 2;
        // Case-1 Both Players on the Same Side
        /*
   What is Happening?
Condition: If both players are in the first half of
 the bracket for the next round, they cannot meet immediately.

Variables:

countLeft: Number of players to the left of left (potential survivors before left).
midCount: Number of players between left and right 
(potential survivors between them).

Loops: Try all possible numbers of survivors from the 
left and the middle region.

For each combination, compute the new positions (pos1, pos2)
 of the two players in the next round.

Recurse to simulate the next round with the survivors.

Why is this Written?
Exhaustive Simulation: You must consider every possible 
way the two players can survive to the next round, given
 that they always win their matches, but the survivors around them can vary.

Position Calculation: The new positions depend on how 
many players survive before and between them.

Recursive Exploration: For all survivor scenarios, 
recursively simulate the next round and update the 
minimum and maximum rounds where the two players can meet
         * 
        */
        if (right <= nextRoundPlayersCount) {
            int countLeft = left - 1;
            int midCount = right - left - 1;
            for (int survivorsLeft = 0; survivorsLeft <= countLeft; survivorsLeft++) {
                for (int survivorsMid = 0; survivorsMid <= midCount; survivorsMid++) {
                    int pos1 = survivorsLeft + 1;
                    int pos2 = pos1 + survivorsMid + 1;
                    int[] tempResult = earliestAndLatest(nextRoundPlayersCount, pos1, pos2);
                    minRound = Math.min(minRound, tempResult[0] + 1);// Access array elements using [].
                    maxRound = Math.max(maxRound, tempResult[1] + 1);
                } // end of inner for
            } // end of outer for
        } // end of if
          //Case 2 - Players on Opposite Sides
        else {
            /*
             * What is Happening?
Condition: This block handles the case where the two players are on opposite sides of the bracket.

Variables:

flightsRight: Mirrored position of right from the end.

countLeft: Players to the left of left.

midCount: Players between left and the mirrored right.

remainMidCount: Players between the mirrored right and the actual right.

Loops: Again, try all survivor combinations in the left and middle regions.

Compute new positions for the two players in the next round, 
considering how survivors shift positions.

Recurse for all these possibilities.

Why is this Written?
Opposite Sides: When players are on opposite sides, the survivor calculation 
and their next-round positions are more complex,
 because the bracket "shrinks" from both ends and their 
 relative positions can change in non-trivial ways.

Complete Coverage: This ensures all possible survivor
 configurations are considered, maintaining correctness 
 for the recursive simulation.

Recursive Exploration: As before, recursively simulate
 all valid survivor scenarios and update the earliest/latest round results.
             * 
            */
            int flightsRight = n - right + 1;
            int countLeft = left - 1;
            int midCount = flightsRight - left - 1;
            int remainMidCount = right - flightsRight - 1;
            for (int survivorsLeft = 0; survivorsLeft <= countLeft; survivorsLeft++) {
                for (int survivorsMid = 0; survivorsMid <= midCount; survivorsMid++) {
                    int pos1 = survivorsLeft + 1;
                    int pos2 = pos1 + survivorsMid + (remainMidCount + 1) / 2 + 1;
                    int[] tempResult = earliestAndLatest(nextRoundPlayersCount, pos1, pos2);
                    minRound = Math.min(minRound, tempResult[0] + 1);// Access array elements using [].
                    maxRound = Math.max(maxRound, tempResult[1] + 1);
                } // end of inner for
            } // end of outer for

        } // end of else
        return new int[] { minRound, maxRound };// Return a new int array initialized with values.
    }

    public static void main(String[] arr) {

        int n = 11, firstPlayer = 2, secondPlayer = 4;
        EarliestandLatestRoundsWherePlayersCompete1900 sol = new EarliestandLatestRoundsWherePlayersCompete1900();
        int[] result = sol.earliestAndLatest(n, firstPlayer, secondPlayer);
        System.out.println("EarliestandLatestRoundsWherePlayersCompete " + Arrays.toString(result));
    }

}
