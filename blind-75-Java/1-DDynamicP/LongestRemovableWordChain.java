/*
 * Longest Removable Word Chain
Problem Statement
You are given a dictionary of unique lowercase strings. A word is called valid if by repeatedly removing one character at a time (from any position), each resulting intermediate string is also present in the dictionary, and this process can be continued until a string of length 1 is reached.
Return the length of the longest valid word in the dictionary. If there are multiple such words, you may return any of their lengths.
Example
Input:
["string", "sring", "sing", "wording", "ing", "ng", "g"]
Output:
6
Explanation:
•	"string" → "sring" → "sing" → "ing" → "ng" → "g" (all intermediate words are present, and ends at length 1).
•	The chain length is 6 (number of words in the chain).
Constraints
•	1 <= words.length <= 10^4
•	1 <= words[i].length <= 16
•	All words are unique and consist of lowercase English letters.

What is a Valid Word?
A word is valid if:

You can remove one character at a time (from any position),

The resulting intermediate word must exist in the given dictionary,

You continue this process until the word is length 1,

Each step word must be in the original list (dictionary).

 Objective:
Return the length of the longest such valid chain.

 Example Input:
java
Copy
Edit
["string", "sring", "sing", "wording", "ing", "ng", "g"]
Let's walk through two candidates:

Chain 1: "string"
"string" → remove 't' → "sring"

"sring" → remove 'r' → "sing"

"sing" → remove 's' → "ing"

"ing" → remove 'i' → "ng"

"ng" → remove 'n' → "g"

All intermediate words exist in the list.

 Chain length = 6

Chain 2: "wording" → ?
"wording" → remove any char... → maybe "ording" or "wrding" etc.

But none of those results (e.g., "ording", "wordin", etc.) are in the list.
👉 So chain is not valid.

 So the output is:
java
Copy
Edit
6 // from "string" chain

 * 
*/
/*
 * Time Complexity Analysis
Let:

n = number of words

L = maximum word length

M = total number of unique words (size of dict)

Outer loop in longestRemovableWordChain: O(n)

DFS Calls: Each call to dfs is memoized, so each unique word is processed once.

Each word can generate up to L sub-words (removing each char).

So for all words: up to O(M * L)

String operations:

Each substring is O(L), but in most modern JVMs, substring is optimized.

Word creation and HashSet operations are O(L) (comparing/adding/removing strings).

Overall:

Each word: O(L) substring operations x up to L removals = O(L^2)

For all M words: O(M * L^2)

Time Complexity:

O(M * L^2),
where M = number of unique words, L = maximum word length.

Space Complexity Analysis
dict: O(M) (where M = number of unique words)

memo: O(M) entries (one for each possible word)

recursion stack: at most O(L) deep (max word length), since each call removes one character.

Total:

O(M * L) (for memo & dict storage; ignoring the storage for the actual strings which is input size)

Summary Table
Part	Time Complexity	Space Complexity
DFS	O(M * L^2)	O(M) (memo + dict)
Recursion Stack	O(L)	O(L)
Main Loop	O(n)	—
Total	O(M * L^2)	O(M * L)
In summary:
The code checks the longest chain by removing one character at a time and using memoization for efficiency. It's optimal for problems with large word sets and moderate word lengths.
 * 
*/
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class LongestRemovableWordChain {
    public int longestRemovableWordChain(String[] words) {
        //Converts the array of words into a HashSet (dict), 
        //for O(1) lookup when checking existence of a word.
        Set<String> dict = new HashSet<>(Arrays.asList(words));
        //Prepares a map (memo) to cache results:
        // the longest chain starting at each word.
        Map<String, Integer> memo = new HashMap<>();
        //Stores the maximum chain length found so far
        int maxLen = 0;
        /*
         * Tries all words as potential starting points for a removable chain.
            dfs(...) computes the removable chain length starting from word.
            Updates maxLen with the longest chain found.
         * 
        */
        for (String word : words) {
            maxLen = Math.max(maxLen, dfs(word, dict, memo));
        }
        return maxLen;
    }
    //Recursive DFS with memoization to compute the longest removable chain starting from word.
    private int dfs(String word, Set<String> dict, Map<String, Integer> memo) {
        //Any word of length 1 is a single-word chain; return 1.
        if (word.length() == 1)
            return 1;
        if (memo.containsKey(word))
            return memo.get(word);
        int max = 0;
        //For every position i, remove the character at i to form a new string next.
        for (int i = 0; i < word.length(); i++) {
            //If next exists in the dictionary (dict):
            // Recursively continue the chain from next.
            // Keep the maximum chain length found.
            String next = word.substring(0, i) + word.substring(i + 1);
            if (dict.contains(next)) {
                max = Math.max(max, dfs(next, dict, memo));
            }
        }
        //If no valid next, the result is 0 (can't continue from here).
        //Otherwise, the result is max+1 since this word can lead to a longer chain.
        int result = (max == 0) ? 0 : max + 1;
        memo.put(word, result);
        return result;
    }

    public static void main(String[] args) {
        LongestRemovableWordChain sol = new LongestRemovableWordChain();
        String[] words = { "string", "sring", "sing", "wording", "ing", "ng", "g" };
        System.out.println(sol.longestRemovableWordChain(words));
    }
}
