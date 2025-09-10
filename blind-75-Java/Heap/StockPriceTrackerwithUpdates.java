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
 * Time Complexity
Let n be total number of updates.

update(timestamp, price)

HashMap.put → O(1) average.

PriorityQueue.offer (for both heaps) → O(log n) each → total O(log n).

So: O(log n) time.

current()

HashMap.get → O(1).

maximum() and minimum()

In worst case, may need to pop many stale entries.

Each stale entry is popped at most once in the entire lifetime of operations.

Amortized: O(log n) per call.

Worst case single call: O(n log n) (if all entries are stale and removed).

Amortized: O(log n).

Space Complexity
HashMap: at most one entry per unique timestamp → O(m), where m = number of distinct timestamps.

MaxHeap + MinHeap: store all updates, including stale → O(n), where n = total update calls.

Overall: O(n) space in worst case.
 * 
*/
package Heap;

import java.util.*;


public class StockPriceTrackerwithUpdates {
    // Current price for each timestamp
    //timePriceMap stores the latest price for each timestamp.

//This is the source of truth — whenever a timestamp’s price changes, this map is updated.

//Key = timestamp, Value = current (latest) price.
    private final Map<Integer, Integer> timePriceMap = new HashMap<>();
    // Max heap: (price desc)
//     This is a max-heap, ordered by price descending (largest price at top).
// It stores an int[] of the form {price, timestamp}.
// Reason: Allows maximum() to quickly return the highest price.
// However, old prices (due to updates) may remain in the heap and become stale — handled later.
    private final PriorityQueue<int[]> maxHeap = new PriorityQueue<>((a, b) -> Integer.compare(b[0], a[0]));
    // Min heap: (price asc)
//     This is a min-heap, ordered by price ascending (lowest price at top).
// Structure is the same: {price, timestamp}.

// Used for minimum().
    private final PriorityQueue<int[]> minHeap = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));

  //  private final PriorityQueue<int[]> minHeap = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
    // Largest timestamp seen so far
    private int latestTimestamp = Integer.MIN_VALUE;    

    public void update(int timestamp, int price) {
        // Overwrite the map (source of truth)
        //Inserts or updates an entry for the given timestamp in the map.

    //If this timestamp exists already, the price gets overwritten.
        timePriceMap.put(timestamp, price);
        // Push into both heaps (old entries, if any, become stale)
        //Adds this (price, timestamp) pair to both heaps, even if there’s an older stale entry for that same timestamp/price.

//No removal of stale entries is done here — this is handled lazily when fetching min/max.
        maxHeap.offer(new int[] { price, timestamp });
        minHeap.offer(new int[] { price, timestamp });
        // Track max timestamp for current()
        //Updates latestTimestamp if this update contains a newer timestamp than any seen before.

//This way current() knows where to look.
        if (timestamp > latestTimestamp) {
            latestTimestamp = timestamp;
        }
    }
//Returns the price associated with the latest timestamp in timePriceMap.

    public int current() {
        // Assumes at least one update has happened
        return timePriceMap.get(latestTimestamp);
    }

    public int maximum() {
        // Pop stale entries until top matches the map
        while (!maxHeap.isEmpty()) {
            //Looks at the maxHeap top element (peek() does not remove).

            int[] top = maxHeap.peek();
            //Extracts timestamp (ts) and price (p).
            int ts = top[1], p = top[0];
            //Checks whether the top heap entry is still valid by comparing with timePriceMap.
            //If valid, returns it immediately.
            if (timePriceMap.get(ts) == p) {
                return p;
            }
            //If invalid (stale price), removes (poll()) from heap and continues checking the next.
            maxHeap.poll(); // stale
        }
        //If heap becomes empty (no entries), returns -1.
        return -1; // or throw if no data
    }

    public int minimum() {
        // Pop stale entries until top matches the map
        while (!minHeap.isEmpty()) {
            int[] top = minHeap.peek();
            int ts = top[1], p = top[0];
            if (timePriceMap.get(ts) == p) {
                return p;
            }
            minHeap.poll(); // stale
        }
        return -1; // or throw if no data
    }

    
    // Example usage
    public static void main(String[] args) {
        StockPriceTrackerwithUpdates tracker = new StockPriceTrackerwithUpdates();
        tracker.update(1, 10);
        tracker.update(2, 5);
        System.out.println("Current: " + tracker.current()); // 5
        System.out.println("Maximum: " + tracker.maximum()); // 10
        tracker.update(1, 3); // timestamp 1 changed from 10 -> 3
        System.out.println("Maximum after update: " + tracker.maximum()); // 5
        System.out.println("Minimum: " + tracker.minimum()); // 3
        System.out.println("Current: " + tracker.current()); // 5
    }
}



