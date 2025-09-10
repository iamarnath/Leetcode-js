/*
  Lucky Numbers Queries
Description
A lucky number is a positive integer whose decimal representation contains only the digits 4 and 7. For example, 4, 7, 44, 47, 74, 77, 444 are all lucky numbers.

You need to implement three types of queries:

Check if a number is lucky: Given an integer num, determine if it is a lucky number.

Find the next lucky number: Given an integer num, find the smallest lucky number greater than or equal to num.

List all lucky numbers in a range: Given two integers low and high, list all lucky numbers in the inclusive range [low, high] sorted ascendingly.

Example
text
Input: num = 47
Output (Query 1): true
Output (Query 2): 47

Input: num = 50
Output (Query 1): false
Output (Query 2): 74

Input: low = 40, high = 80
Output (Query 3): [44, 47, 74, 77]
Constraints
1 <= num, low, high <= 10^9

For query 3, (high - low) can be up to 10^6.

Efficient computation is required.

Approach Overview
Checking if a number is lucky is straightforward: convert to string and check all digits are '4' or '7'.

Finding the next lucky number requires generating lucky numbers in ascending order until one is >= num. Generating lucky numbers can be done via DFS/binary generation because lucky numbers only contain '4' and '7'.

Listing lucky numbers in a range uses the same generation approach: generate all lucky numbers up to high and collect those >= low.

To optimize, generate lucky numbers only once up to 10^9 (max constraint), store them sorted, and apply binary search for queries.




*/

/*
 We are working with Lucky Numbers — numbers composed only of digits 4 and 7.
Examples: 4, 7, 44, 47, 74, 77, 444, ...

We need to handle three types of queries efficiently:

Check if a number is lucky

Input: num = 47 → Output: true

Input: num = 50 → Output: false

Find the next lucky number ≥ num

Input: num = 47 → Output: 47

Input: num = 50 → Output: 74 (since the next lucky after 50 is 74)

List all lucky numbers in a given range [low, high]

Input: [40, 80] → Output: [44, 47, 74, 77]

Constraints

Numbers can go up to 10^9

The range [low, high] can be up to 10^6 wide

Queries must be efficient → generating lucky numbers repeatedly is too slow.

 
*/
package Strings;

import java.util.*;
/*
  Preprocessing (Constructor + Generation)
generateLuckyNumbers(0, 0)
How many lucky numbers exist ≤ 10^9?
Since lucky numbers are made up of only 4 and 7, each lucky number is basically a binary-string-like sequence of digits.

For k digits, you can form 2^k lucky numbers.

Max digits possible ≤ 10^9 ⇒ 10 digits.

Total lucky numbers generated:

2^1+2^2+...+2^10=2^11−2=2046

So, at most ~2,046 lucky numbers are stored.

 Time Complexity (preprocessing):

Generating = O(2^10) = O(1024) = very small (constant for practical purposes).

Sorting = O(N log N), with N ≈ 2000 ⇒ ~2000 * 11 steps ≈ negligible.

Net = O(2000 log 2000) ≈ O(10^4) → Constant in practice.

Space Complexity:

Stores all lucky numbers ≤ 10^9 in a list.

That’s ~2000 integers ≈ 8 KB → negligible.

Recursive stack depth = 10 (since digits ≤ 10).

Net = O(N), where N = #lucky numbers (≈2000).

🔹 Query 1: isLucky(num)
java
String s = String.valueOf(num);
for (char c : s.toCharArray()) {
   if (c != '4' && c != '7') return false;
}
Converts integer to string → O(d), where d = number of digits.

Checks each digit → O(d).

In practice, d ≤ 10 (since ≤ 1e9).

Time: O(d) ≈ O(1)

Space: O(d) for string conversion ≈ O(1)

🔹 Query 2: nextLucky(num)

int idx = Collections.binarySearch(luckyNumbers, num);
Uses binary search on a sorted list of size N ≈ 2000.

Binary search takes O(log N).

After finding index, just retrieves value → O(1).

Time: O(log N) ≈ O(log 2000) ≈ 11 steps → constant in practice
Space: O(1)

🔹 Query 3: luckyNumbersInRange(low, high)
Two binary searches (low and high) → each O(log N).

Sublist creation = O(1) (returns a view of the list, not a copy).

If you actually iterate over the sublist (e.g., print it), 
then accessing elements = O(k), 
where k = number of lucky numbers in range.

Time:

Search = O(log N)
Output = O(k)
Net = O(log N + k)

Space:

Sublist is a view → O(1) extra.

If user copies results → O(k).
Overall Summary
Function / Step	Time Complexity	Space Complexity
Preprocessing (constructor)	O(N log N) [N ≈ 2000]	O(N)
isLucky(num)	O(d) [d ≤ 10] → O(1)	O(d) ≈ O(1)
nextLucky(num)	O(log N)	O(1)
luckyNumbersInRange(low, high)	O(log N + k)	O(1) (view) / O(k) (copy)


*/

public class LuckyNumbersQueries {
    //A private list that will store all precomputed 
    //lucky numbers (numbers made up only of digits 4 and 7 and ≤ 1e9).
    private List<Integer> luckyNumbers;

    public LuckyNumbersQueries() {
        //Initializes luckyNumbers as an empty ArrayList.
        luckyNumbers = new ArrayList<>();
        //Calls generateLuckyNumbers(0, 0) to recursively 
        //generate all lucky numbers up to 1,000,000,000.
        generateLuckyNumbers(0, 0);
        //Sorts them in ascending order (though they’re
        // already mostly sorted after generation, this guarantees correct order).
        Collections.sort(luckyNumbers);
    }
    /*
     The line return -(left + 1); in your custom binary search function is there to 
     exactly mimic what Java’s Collections.binarySearch() 
     (and Arrays.binarySearch()) does when the key is not found in the list.
    Explanation:

    When the target value (num) is not found, you often want
    to know where it would go (the insertion point) to keep the list sorted.

    The value of left at the end of binary search is
    the insertion point—the index where num could be
    inserted while maintaining the list’s order.

    Returning -(left + 1) as a negative value tells the caller:

    The search failed.

    The insertion point is at index left 
    (simply do -(result + 1) to recover it).

    This is the documented behavior of the Java 
    standard library’s binary search, and it’s very useful 
    for both search and insert use-cases:

    “If the key is not found, the method returns a 
    negative number which is the bitwise complement 
    of the insertion point (i.e., -(insertion point) - 1).”
    — Java documentation

    Example:

    If your luckyNumbers list is [4, 7, 44, you search for 
    45, it should be inserted between 44(index 2) and47` (index 3).

    After search, left becomes 3.

    The function returns -4.

    To find the insertion point:
    Insertion point = -(result + 1) = -( -4 + 1 ) = 3.

    Summary:
    It’s a convention to report failed search with a 
    negative number that still encodes the correct insertion index.

    That’s why you see return -(left + 1); at the 
    end of custom binary search implementations. 
     
    */
    public int customBinarySearch(List<Integer> list, int num) {
        int left=0;
        int right = list.size()-1;
        while(left <= right){
            int mid = left + (right-left)/2;
            int midVal = list.get(mid);
            if(midVal == num){
                return mid;
            }
            else if(midVal <num){
                left = mid+1;
            }
            else{
                right = mid-1;
            }
        }
        //  Not found: return (-insertion_point - 1)
        return -(left+1);
    }
    // Generate all lucky numbers up to 10^9
    //Generates lucky numbers in a recursive DFS-style way.
    private void generateLuckyNumbers(int num, int depth) {
        //If num > 0, adds it to the list
        // (0 is ignored because it’s not a lucky number).
        if (num > 0) luckyNumbers.add(num);
        //If depth > 10, stops recursion: 
        //we only allow up to 10 digits (since 10^9 has 10 digits max).
        if (depth > 10) return; // prune depth to avoid overflow

        // Append digit 4
        //Builds a new lucky number by appending digit 4 to the current number.
        long nextNum = (long) num * 10 + 4;
        //Ensures it doesn’t exceed 1_000_000_000.
        if (nextNum <= 1_000_000_000L) {
            generateLuckyNumbers((int) nextNum, depth + 1);
        }
        // Append digit 7
        nextNum = (long) num * 10 + 7;
        if (nextNum <= 1_000_000_000L) {
            generateLuckyNumbers((int) nextNum, depth + 1);
        }
        //This ensures all numbers consisting only 
        //of digits 4 and 7 up to 1e9 are added.
    }

    // Query 1: Check if num is lucky
    public boolean isLucky(int num) {
        //Converts the number to a string.
        String s = String.valueOf(num);
        //Iterates through each digit.
        for (char c : s.toCharArray()) {
            //If any digit is not 4 or 7, returns false.
            if (c != '4' && c != '7') return false;
        }
        //Otherwise returns true.
        return true;
    }

    // Query 2: Next lucky number >= num
    public int nextLucky(int num) {
        //Uses binary search to find the index of num in the sorted list.
        int idx = customBinarySearch(luckyNumbers, num);
        //If found, return it directly (meaning num itself is lucky).
        if (idx >= 0) return luckyNumbers.get(idx);
        //If not found, binarySearch returns negative insertion point.
        // Convert it into the index of the smallest lucky number ≥ num.
        // If index goes past the end (num > largest lucky number), return -1.
        // Otherwise, return that lucky number.
        idx = -(idx + 1);
        if (idx == luckyNumbers.size()) {
            // No lucky number >= num (shouldn't happen as we generate sufficiently)
            return -1;
        }
        return luckyNumbers.get(idx);
    }

    // Query 3: Lucky numbers between low and high inclusive
    public List<Integer> luckyNumbersInRange(int low, int high) {
        //Finds the first lucky number ≥ low.
        int start = customBinarySearch(luckyNumbers, low);
        if (start < 0) start = -(start + 1);
        int end = customBinarySearch(luckyNumbers, high);
        //Finds the last lucky number ≤ high.
        if (end < 0) end = -(end + 1) - 1; // index of the largest lucky <= high
        //If no lucky numbers are in the range, return empty list.
        if (end < start) return Collections.emptyList();
        return luckyNumbers.subList(start, end + 1);
    }
    public int kthLuckyInRange(int low, int high, int k) {
        int start = customBinarySearch(luckyNumbers,low);
        if(start <0) start = -(start+1);
        int end = customBinarySearch(luckyNumbers,high);
        if(end <0) end = -(end+1)-1;
        if(end<start) return -1;
        int count = end-start +1;
        if(k>count) return -1;
        return luckyNumbers.get(start+k-1);
    }
    // Example usage
    public static void main(String[] args) {
        LuckyNumbersQueries ln = new LuckyNumbersQueries();

        int num1 = 47;
        System.out.println("Is " + num1 + " lucky? " + ln.isLucky(num1)); // true
        System.out.println("Next lucky >= " + num1 + ": " + ln.nextLucky(num1)); // 47

        int num2 = 50;
        System.out.println("Is " + num2 + " lucky? " + ln.isLucky(num2)); // false
        System.out.println("Next lucky >= " + num2 + ": " + ln.nextLucky(num2)); // 74

        int low = 40, high = 80;
        System.out.println("Lucky numbers between " + low + " and " + high + ": "
                + ln.luckyNumbersInRange(low, high)); // [44, 47, 74, 77]
               System.out.println("2nd lucky in [40, 80]: " + ln.kthLuckyInRange(40, 80, 2)); // 47
        System.out.println("5th lucky in [40, 80]: " + ln.kthLuckyInRange(40, 80, 5)); // -1
    }
}

