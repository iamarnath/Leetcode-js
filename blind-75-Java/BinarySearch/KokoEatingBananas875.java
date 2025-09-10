/*
 * 875. Koko Eating Bananas
 * Koko loves to eat bananas. There are n piles of bananas,
 *  the ith pile has piles[i] bananas. The guards have gone
 *  and will come back in h hours.

Koko can decide her bananas-per-hour eating speed of k.
 Each hour, she chooses some pile of bananas and eats k 
 bananas from that pile. If the pile has less than k bananas, 
 she eats all of them instead and will not eat any more bananas
  during this hour.

Koko likes to eat slowly but still wants to finish 
eating all the bananas before the guards return.

Return the minimum integer k such that she can eat all
 the bananas within h hours.

Example 1:

Input: piles = [3,6,7,11], h = 8
Output: 4
Example 2:

Input: piles = [30,11,23,4,20], h = 5
Output: 30
Example 3:

Input: piles = [30,11,23,4,20], h = 6
Output: 23
 

Constraints:

1 <= piles.length <= 104
piles.length <= h <= 109
1 <= piles[i] <= 109
 * 
*/
/*
 * 
 * Time Complexity:
The binary search runs on the answer space from 1 to the maximum element in piles, which is at most 

O(logM) iterations, where 

M is the largest element in the input array (piles).
In each iteration, the canEatAll function scans all 

n elements (where 

n is the number of piles), doing simple integer operations. Therefore,
Overall time complexity: 

O(nlogM).

Space Complexity:
The binary search and helper function both use a 
constant amount of extra memory (no extra data structures 
or recursion stack).
Overall space complexity: 

O(1).

These are typical for iterative binary search algorithms, where:

Time complexity: 

O(logn) for pure binary search, but here it multiplies per-element checking.

Space complexity: 
O(1) since no additional structures are used beyond a few variables.
 * 
*/

package BinarySearch;

import java.util.Arrays;

public class KokoEatingBananas875 {
    public boolean canEatAll(int[] piles, int givenHour, int h) {
        int actualHour = 0;
        for (int x : piles) {
            actualHour += x / givenHour;
            if (x % givenHour != 0) {
                actualHour++;
            } // end of if
        } // end of for
        return actualHour <= h;
    }// end of canEatAll

    public int minEatingSpeed(int[] piles, int h) {
        int l = 1, r = Arrays.stream(piles).max().getAsInt();
        while (l < r) {
            int mid = l + (r - l) / 2;
            if (canEatAll(piles, mid, h)) {
                r = mid;
            } else {
                l = mid + 1;
            }
        }
        return l;
    }

    public static void main(String[] args) {
        int[] piles = { 3, 6, 7, 11 };
        int h = 8;
        KokoEatingBananas875 sol = new KokoEatingBananas875();
        int result = sol.minEatingSpeed(piles, h);
        System.out.println("Min eating speed " + result);
    }
}

/*
 
class KokoEatingBananas875 {
    
    // Helper to check if Koko can eat all bananas with given speed
    canEatAll(piles, givenHour, h) {
    // Initializes actualHour to 0. This
    // will keep track of how many hours Koko actually needs at
    // this eating speed.
        let actualHour = 0;
        // Loops through each pile (x) inside the piles array.
        //Calculates how many full hours it takes to eat 
        //bananas from the current pile at this speed:
// x / givenHour gives fractional hours if it doesn’t divide evenly.
// Math.floor() reduces it to an integer (whole hours).
// This partial result is added to actualHour.
        for (let x of piles) {
            actualHour += Math.floor(x / givenHour);
            //If bananas in the pile don’t divide evenly by 
            //eating speed (x % givenHour !== 0):
            //Add 1 extra hour since Koko needs another partial
            // hour to finish leftovers.
            if (x % givenHour !== 0) {
                actualHour++;
            }
        }
        //If actualHour <= h, it means Koko can finish within the allowed time.
        return actualHour <= h;
    }

    // Binary search for min eating speed
    minEatingSpeed(piles, h) {
    //l = 1 (smallest possible speed, since she has to eat at least 1 banana/hour).
        let l = 1;
        //r = max pile size (largest speed needed;
        // eating one whole biggest pile in an hour is the upper bound).
        let r = Math.max(...piles);
//Continue searching while the lower boundary (l) 
//is less than the upper boundary (r).


        while (l < r) {
            let mid = Math.floor(l + (r - l) / 2);
            //If Koko can finish eating at this speed (mid),
            // then mid might be the correct solution OR maybe 
            //there’s an even slower valid speed.
            if (this.canEatAll(piles, mid, h)) {
                r = mid;
            } else {
             // If Koko cannot finish at this speed, 
             //then the speed is too slow.
            //So we move right — increase the lower bound (l = mid + 1).
                l = mid + 1;
            }
        }
    //l == r → this is the smallest speed 
    //where Koko can eat all bananas in time.
        return l;
    }
}

// Example usage
const piles = [3, 6, 7, 11];
const h = 8;
const sol = new KokoEatingBananas875();
const result = sol.minEatingSpeed(piles, h);
console.log("Min eating speed:", result);

 
*/