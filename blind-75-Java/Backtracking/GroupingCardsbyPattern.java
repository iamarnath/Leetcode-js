/*
Problem Statement
You are given a list of cards, each with two attributes: color (one of "Red", "Green", "Black") and count (an integer from 1 to 9).
A pattern of 3 cards is defined as either:
•	All three cards are exactly the same (same color and count), or
•	All three cards have the same color and their counts are in strictly increasing order (e.g., (Black, 1), (Black, 2), (Black, 9))
Part 1
Write a function to check if a given set of 3 cards forms a valid pattern.
Part 2
Given a list of 12 cards, write a function to check if the cards can be partitioned into 4 groups of 3 cards, each of which forms a valid pattern. Each card must be used exactly once.

 * Problem Explanation: Card Patterns
You are working with cards, where each card has:

A color: "Red", "Green", or "Black"

A count: an integer from 1 to 9

 Part 1 Goal:
Write a function to check whether a group of 3 cards forms a valid pattern.

A pattern is valid only if:
All three cards are exactly the same
(same color AND same count)

 Example:

(Red, 2), (Red, 2), (Red, 2)
All three cards have the same color, and their counts are strictly increasing
(not equal, no duplicates in counts)

 Example:

(Black, 1), (Black, 2), (Black, 9)
 Invalid example:

(Black, 1), (Black, 2), (Red, 3)  // different colors
 Part 2 Goal:
Given a list of 12 cards, check if you can split them into 4 groups of 3 cards such that:

Each group forms a valid pattern (as defined above)

All 12 cards must be used, with no duplicates or leftovers
 * 
*/

/*
 * TIME AND SPACE COMPLEXITY
isPattern
Time: O(1) (There are only 3 cards to check).

Space: O(1)

canPartitionIntoPatterns & backtrack
Time:

You check all ways to split 12 cards into 4 groups of 3.

The number of ways:
C(12,3) * C(9,3) * C(6,3) * C(3,3) / 4! = 15400
(But you don't actually divide by 4! due to the ordering in recursion, so the recursion tree might try each possible 3-card group in every order, but the pruning and backtracking prevent full expansion.)

For each recursive call, check if a group is a pattern: O(1).

So approximate total time: O(number of partitions) ≈ thousands (fast for 12 cards, but increases exponentially with more cards).

Space:

O(12) for the boolean used array.

O(4) recursion depth.

O(1) for temp arrays.

Summary
isPattern checks if 3 cards match a requirement (same card thrice,
 or same color strictly increasing).

canPartitionIntoPatterns tries to split 12 cards into 4 
pattern groups with backtracking.

backtrack tries all combinations recursively, marks used cards,
 and backtracks if needed.


Complexity: Efficient for 12 cards (thousands of calls, which is fine), but grows rapidly for more cards.
 * 
*/
package Backtracking;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Card {
    String color;
    int count;

    Card(String color, int count) {
        this.color = color;
        this.count = count;
    }
}

public class GroupingCardsbyPattern {
    /*
     * if (cards.length != 3) return false;
        A pattern must have exactly 3 cards.
        First pattern: all three cards are identical
        Checks color equality between all and count equality.
        If true, returns pattern found.
        Second pattern: All colors are equal, and counts are in strictly increasing order.
        Extracts counts, sorts them.
        If strictly increasing, returns pattern found.
        If none matched, returns false.
     * 
    */
    public boolean isPattern(Card[] cards) {
        if (cards.length != 3) {
            return false;
        }
        // CASE 1: all three cards are exactly the same
        if (cards[0].color.equals(cards[1].color) && cards[1].color.equals(cards[2].color)
                && cards[0].count == cards[1].count && cards[1].count == cards[2].count) {
            return true;
        }
        // CASE 2: same color & counts in strictly increasing order

        if (cards[0].color.equals(cards[1].color) && cards[1].color.equals(cards[2].color)) {
            int[] counts = { cards[0].count, cards[1].count, cards[2].count };
            Arrays.sort(counts);
            System.out.println("  Sorted counts: " + counts[0] + ", " + counts[1] + ", " + counts[2]);
            return counts[0] < counts[1] && counts[1] < counts[2];
        }
            System.out.println("  Not a valid pattern.");
        return false;
    } // end of isPattern
    /*
     * Ensures there are exactly 12 cards.
        Creates an array to track 'used' cards.
        Calls the backtrack helper to try partitioning the 12 cards into 4 groups of 3.
     * 
    */
    public boolean canPartitionIntoPatterns(List<Card> cards) {
        if (cards.size() != 12) {
            return false;
        }
        boolean[] used = new boolean[12];
        return backtrack(cards, used, 0, 0);
    }
    /*
     * Base case: If 4 groups formed, return true.
        Loops: For all unordered triplets (i < j < k) of unused cards…
        If those 3 make a valid pattern, mark them used and recursively partition the rest.
        If recursive call fails, backtrack (unmark these 3).
        If no valid grouping found, return false.
     * 
    */
    private boolean backtrack(List<Card> cards, boolean[] used, int start, int groupsFormed) {
        if (groupsFormed == 4) {
            System.out.println("All groups formed!");
            return true;
        }
        for (int i = 0; i < 12; i++) {
            if (used[i])
                continue;
            for (int j = i + 1; j < 12; j++) {
                if (used[j])
                    continue;
                for (int k = j + 1; k < 12; k++) {
                    if (used[k])
                        continue;
                    Card[] group = { cards.get(i), cards.get(j), cards.get(k) };
                    System.out.println("\nTrying group: [" + i + "," + j + "," + k + "] at group #" + (groupsFormed+1));
                    if (isPattern(group)) {
                        System.out.println("  Pattern matched, marking as used.");
                        used[i] = used[j] = used[k] = true;
                        if (backtrack(cards, used, 0, groupsFormed + 1)) {
                            return true;
                        }
                         System.out.println("  Backtracking group [" + i + "," + j + "," + k + "]");
                        used[i] = used[j] = used[k] = false;
                    }
                    else{
                        System.out.println("  Not a pattern, skipping.");
                    }
                }
            }
        }
        return false;
    }

    public static void main(String[] args) {
        GroupingCardsbyPattern sol = new GroupingCardsbyPattern();
        // Part 1 test
        Card[] group1 = { new Card("Black", 1), new Card("Black", 2), new Card("Black", 9) };
        System.out.println("pattern allowed " + sol.isPattern(group1));

        // Part 2 test
        List<Card> cards = new ArrayList<>();
        for (int i = 1; i <= 3; i++) {
            cards.add(new Card("Black", i));
        }
        for (int i = 1; i <= 3; i++) {
            cards.add(new Card("Red", i));
        }
        for (int i = 1; i <= 3; i++) {
            cards.add(new Card("Green", i));
        }
        // for (int i = 1; i <= 3; i++) {
        //     cards.add(new Card("Black", i));
        // }
        cards.add(new Card("Black", 9));
        cards.add(new Card("Black", 8));
        cards.add(new Card("Red", 5));
        System.out.println("partition allowed " + sol.canPartitionIntoPatterns(cards));
    }
}
