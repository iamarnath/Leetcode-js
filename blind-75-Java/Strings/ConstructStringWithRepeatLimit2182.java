package Strings;

/*
 
 You are given a string s and an integer repeatLimit. Construct a new string repeatLimitedString using the characters of s such that no letter appears more than repeatLimit times in a row. You do not have to use all characters from s.

Return the lexicographically largest repeatLimitedString possible.

A string a is lexicographically larger than a string b if in the first position where a and b differ, string a has a letter that appears later in the alphabet than the corresponding letter in b. If the first min(a.length, b.length) characters do not differ, then the longer string is the lexicographically larger one.

 

Example 1:

Input: s = "cczazcc", repeatLimit = 3
Output: "zzcccac"
Explanation: We use all of the characters from s to construct the repeatLimitedString "zzcccac".
The letter 'a' appears at most 1 time in a row.
The letter 'c' appears at most 3 times in a row.
The letter 'z' appears at most 2 times in a row.
Hence, no letter appears more than repeatLimit times in a row and the string is a valid repeatLimitedString.
The string is the lexicographically largest repeatLimitedString possible so we return "zzcccac".
Note that the string "zzcccca" is lexicographically larger but the letter 'c' appears more than 3 times in a row, so it is not a valid repeatLimitedString.
Example 2:

Input: s = "aababab", repeatLimit = 2
Output: "bbabaa"
Explanation: We use only some of the characters from s to construct the repeatLimitedString "bbabaa". 
The letter 'a' appears at most 2 times in a row.
The letter 'b' appears at most 2 times in a row.
Hence, no letter appears more than repeatLimit times in a row and the string is a valid repeatLimitedString.
The string is the lexicographically largest repeatLimitedString possible so we return "bbabaa".
Note that the string "bbabaaa" is lexicographically larger but the letter 'a' appears more than 2 times in a row, so it is not a valid repeatLimitedString.
 

Constraints:

1 <= repeatLimit <= s.length <= 105
s consists of lowercase English letters.

*/
/*
 
 Example Walkthrough
s = "cczazcc", repeatLimit = 3

Count: {a=1, c=4, z=1}

Heap: z, c, a

Process:

Take z → "z".

Then c up to 3 times → "zccc".

Need separator: next = a → "zccca".

Put back c → "zcccac".

Result = "zcccac"

Time Complexity
Counting frequencies: O(n), where n = s.length().

Heap building: O(26 log 26) ≈ O(1), since the number of distinct letters is constant (≤26).

While loop processing: Each character is inserted and removed from heap at most once per frequency.

Heap operations = O(log 26) ≈ O(1).

For n total characters, complexity = O(n).

✅ Overall Time Complexity: O(n)

Space Complexity
Count array: O(26) → O(1).

Heap: O(26) → O(1).

Result string: O(n).

Total: O(n) (dominated by result storage).

✅ Overall Space Complexity: O(n)

✅ Final Summary

Approach: Use a max heap to greedily construct the lexicographically largest valid string by obeying the repeat limit, inserting separators if needed.

Time Complexity: O(n)

Space Complexity: O(n) 
*/
import java.util.PriorityQueue;

public class ConstructStringWithRepeatLimit2182 {
     public String repeatLimitedStringNoHeap(String s, int repeatLimit) {
        int[] count = new int[26]; // Frequency array to store character counts
        
        // Count the frequency of each character
        for (char ch : s.toCharArray()) { // T.C: O(n)
            count[ch - 'a']++;
        }

        StringBuilder result = new StringBuilder();
        int i = 25; // Start from the largest character (z)

        while (i >= 0) { // T.C: O(26)
            if (count[i] == 0) {
                i--;
                continue;
            }

            char ch = (char) ('a' + i); // Convert index to character
            int freq = Math.min(count[i], repeatLimit); // Append up to 'repeatLimit' times
            
            for (int k = 0; k < freq; k++) {
                result.append(ch);
            }
            count[i] -= freq;

            if (count[i] > 0) {
                // Find the next largest character
                int j = i - 1;
                while (j >= 0 && count[j] == 0) { // O(26)
                    j--;
                }

                if (j < 0) {
                    break; // No more characters left to append
                }

                result.append((char) ('a' + j)); // Append the next largest character once
                count[j]--;
            }
        }

            return result.toString();
        }

    public String repeatLimitedString(String s, int repeatLimit) {
        // Create an array of size 26 to store the frequency of each lowercase English
        // character.
        // → count for 'a', count for 'z'.
        int[] count = new int[26];
        // Convert string s into a character array and loop through it.
        for (char ch : s.toCharArray()) {
            // For each character, increment its frequency in the count array.
            count[ch - 'a']++;
        }
        // A max heap (PriorityQueue) is created, ordered in descending order of
        // characters (z > y > … > a).

        // This ensures we always pick the largest lexicographically available character
        // first.
        // Max heap (priority queue) to store characters in descending order
        PriorityQueue<Character> pq = new PriorityQueue<>((a, b) -> b - a);
        // Traverse the count array.

        // If a character (like 'a' + i → 'c') has a non-zero frequency, insert it into
        // the priority queue.
        // Now the priority queue contains all characters available in descending
        // lexicographic order.
        for (int i = 0; i < 26; i++) {
            if (count[i] > 0) {
                pq.offer((char) ('a' + i));
            }
        }
        // Use StringBuilder for efficient mutable string operations.
        StringBuilder result = new StringBuilder();
        while (!pq.isEmpty()) {
            // Pop the largest available character from the heap.
            char ch = pq.poll();
            // Decide how many times to append this character:
            // Use it at most repeatLimit times.
            // freq = minimum of available frequency vs. repeat limit.
            int freq = Math.min(count[ch - 'a'], repeatLimit);
            for (int i = 0; i < freq; i++) {
                result.append(ch);
            }
            // Decrease the frequency count of this character after using it.
            count[ch - 'a'] -= freq;
            // If the current character still has remaining occurrences
            // If the current character still has occurrences left but we can’t append it
            // again directly (as we’ve hit repeatLimit),
            // → we must use a smaller character next to separate the sequence.
            if (count[ch - 'a'] > 0 && !pq.isEmpty()) {
                // Take the next lexicographically smaller character from heap.
                char nextChar = pq.poll(); // Get the next largest character
                result.append(nextChar);
                // Append it once, then reduce its frequency.
                count[nextChar - 'a']--;
                // Reinsert characters into the priority queue if they still have remaining
                // occurrences
                // If the "spacer" character (nextChar) still has occurrences, put it back in
                // the heap.
                if (count[nextChar - 'a'] > 0) {

                    pq.offer(nextChar);
                }
                // Also put ch back if it still has remaining usage.
                // This way, both characters can be reused later in correct order.
                pq.offer(ch);
            } // Continue building until the heap is empty (no characters left).
        }
        return result.toString();
    }

    public static void main(String[] args) {
        // example 1
        // String s = "cczazcc";
        // int repeatLimit = 3;
        // example 2
        String s = "aababab";
        int repeatLimit = 2;
        ConstructStringWithRepeatLimit2182 sol = new ConstructStringWithRepeatLimit2182();
        String result = sol.repeatLimitedString(s, repeatLimit);
        System.out.println("result ==" + result);
    }
}
