/*
 * Problem: Stock Price Tracker with Updates and Min/Max Queries
You are designing a system for tracking the price of a stock that changes frequently. Implement a data structure that supports the following operations:
update(timestamp, price): Updates the price at the given timestamp. If the timestamp already exists, the old price is replaced by the new price.
 
  current(): Returns the latest price of the stock (i.e., the price at the highest timestamp seen so far).
  maximum(): Returns the maximum price of the stock among all recorded timestamps.   minimum(): Returns the minimum price of the stock among all recorded timestamps.
Constraints:
  Timestamps are unique integers.   Updates can arrive out of order.
  The number of operations can be large (up to 10^5 .   Prices are positive integers.

  Example
  update(1, 10)
update(2, 5)
current() -> 5
maximum() -> 10
update(1, 3)	// Update timestamp 1 price to 3
maximum() -> 5
minimum() -> 3
current() -> 5

update(timestamp, price): set the stock’s price at timestamp. If that timestamp already exists, overwrite the old price.
current(): return the price at the largest timestamp seen so far.
maximum(): return the max price among all timestamps (respecting overwrites).
minimum(): return the min price among all timestamps (respecting overwrites).

 * 
*/
/*
 * timePriceMap keeps the latest price for each timestamp (so updates overwrite old prices).

priceCountMap is a sorted map from price → how many times it’s present (this handles duplicates across timestamps).

Updating price:

If timestamp existed, decrement/remove old price from priceCountMap.

Insert new price.

Maximum → priceCountMap.lastKey()

Minimum → priceCountMap.firstKey()

All operations are O(log n) worst-case.

TreeMap in Java stores keys in sorted order and gives:

firstKey() → min price

lastKey() → max price
 * 
*/

/*
 TreeMap Visualization
Conceptual Representation
Suppose you have these price updates:

update(1, 10)

update(2, 5)

update(1, 3)

The structures (timePriceMap and priceCountMap) look like this after each operation:

Step-by-step TreeMap State
After Operation	timePriceMap	priceCountMap (TreeMap)
update(1, 10)	{1: 10}	{10: 1}
update(2, 5)	{1: 10, 2: 5}	{5: 1, 10: 1}
update(1, 3)	{1: 3, 2: 5}	{3: 1, 5: 1}
Explanation:

timePriceMap stores the latest price for each timestamp.

priceCountMap (TreeMap) keeps price → count sorted by price.

When a timestamp’s price is updated (e.g., update(1, 3)), decrease/remove the old price, and add the new price.

TreeMap Structure (Diagram)
Since Java's TreeMap is a balanced binary search tree, it stores its keys (prices) in sorted order.
Here's a conceptual drawing after update(1, 3) and update(2, 5):

text
        5
      /   
     3  
The smallest (minimum) price is the leftmost node: 3

The largest (maximum) price is the rightmost node: 5

Each node also stores a count of how many times that price appears (from different timestamps).

How Operations Look Visually
Suppose the TreeMap is represented as nodes (prices), with the count in parentheses:

text
      [5] (1)
     /
  [3] (1)
minimum(): Walk to the leftmost node → 3

maximum(): Walk to the rightmost node → 5

If you had more prices, the tree grows and stays sorted at all times.

Summary Table
Operation	TreeMap Keys	min/max directly accessible
update(1, 10)	{10:1}	min=10, max=10
update(2, 5)	{5:1,10:1}	min=5, max=10
update(1, 3)	{3:1,5:1}	min=3, max=5
Visualization Analogy
Imagine TreeMap as a sorted shelf: smallest price on the left, biggest on the right.

Each shelf spot can have a stack of boxes representing the count.

Find min/max price just by looking at the leftmost/rightmost shelf slot — no search needed 
 
*/

package Heap;

import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

public class StockPriceTrackerOptimized {
    // Track latest price per timestamp
    private final Map<Integer, Integer> timePriceMap = new HashMap<>();
    // price -> count (handle duplicates)
    private final TreeMap<Integer, Integer> priceCountMap = new TreeMap<>();
    private int latestTimestamp = Integer.MIN_VALUE;

    public void update(int timestamp, int price) {
        if (timePriceMap.containsKey(timestamp)) {
            int oldPrice = timePriceMap.get(timestamp);
            int count = priceCountMap.get(oldPrice);
            if (count == 1) {
                priceCountMap.remove(oldPrice);
            } else {
                priceCountMap.put(oldPrice, count - 1);
            }
        }

        timePriceMap.put(timestamp, price);
        priceCountMap.put(price, priceCountMap.getOrDefault(price, 0) + 1);

        latestTimestamp = Math.max(latestTimestamp, timestamp);
    }

    public int current() {
        return timePriceMap.get(latestTimestamp);
    }

    public int maximum() {
        return priceCountMap.lastKey();
    }

    public int minimum() {
        return priceCountMap.firstKey();
    }

    public static void main(String[] args) {
        StockPriceTrackerOptimized tracker = new StockPriceTrackerOptimized();
        tracker.update(1, 10);
        tracker.update(2, 5);
        System.out.println("Current: " + tracker.current()); // 5
        System.out.println("Max: " + tracker.maximum());     // 10
        tracker.update(1, 3);
        System.out.println("Max After Update: " + tracker.maximum()); // 5
        System.out.println("Min: " + tracker.minimum()); // 3
    }
}
