/*
 * 472. Concatenated Words
 * Given an array of strings words (without duplicates), return all the concatenated words in the given list of words.

A concatenated word is defined as a string that is comprised 
entirely of at least two shorter words (not necessarily distinct) 
in the given array.

Example 1:

Input: words = ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"]
Output: ["catsdogcats","dogcatsdog","ratcatdogcat"]
Explanation: "catsdogcats" can be concatenated by "cats", "dog" and "cats"; 
"dogcatsdog" can be concatenated by "dog", "cats" and "dog"; 
"ratcatdogcat" can be concatenated by "rat", "cat", "dog" and "cat".
Example 2:

Input: words = ["cat","dog","catdog"]
Output: ["catdog"]
 

Constraints:

1 <= words.length <= 104
1 <= words[i].length <= 30
words[i] consists of only lowercase English letters.
All the strings of words are unique.
1 <= sum(words[i].length) <= 105
 * 
*/
/*
 * 🕒 Time Complexity
Let:

n be the number of words,

L be the average length of the word.

The worst-case time complexity is exponential without memoization (as you may split a word in L - 1 locations, and then recurse each possibility).

However, with memoization, each unique suffix of a word is computed once → reduces duplicate work.

Per word:

You check up to L splits.

Each recursive call reduces the string length.

So the approximate time complexity is:
 O(N * L^2) in the best/memoized case.

📦 Space Complexity
Set<String> st → stores all input words: O(N)

Map<String, Boolean> map → memoization: up to O(N * L) entries depending on suffix overlaps.

Recursion stack → up to depth L for maximum word length.

So, total space complexity ≈ O(N * L)
 * 
*/
package Strings;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class ConcatenatedWords472 {
    public boolean isConcatenated(String word, Set<String> st, Map<String, Boolean> map) {
        if (map.containsKey(word)) {
            return map.get(word);
        } // end of if
        int l = word.length();
        for (int i = 0; i < l; i++) {
            String prefix = word.substring(0, i + 1);
            String suffix = word.substring(i + 1, l);
            if ((st.contains(prefix) && st.contains(suffix)) ||
                    st.contains(prefix) && isConcatenated(suffix, st, map)) {
                map.put(word, true);
                return true;
            }

        }
        map.put(word, false);
        return false;
    }// end of isConcatenated

    public List<String> findAllConcatenatedWordsInADict(String[] words) {
        int n = words.length;
        Set<String> st = new HashSet<>();
        Map<String, Boolean> map = new HashMap<>();
        for (String s : words) {
            st.add(s);
        }
        List<String> result = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            String word = words[i];
            if (isConcatenated(word, st, map)) {
                result.add(word);
            }
        }
        return result;
    }
    public static void main(String[] args){
        //String[] words = {"cat", "cats", "catsdogcats", "dog", "dogcatsdog", "hippopotamuses", "rat", "ratcatdogcat"};
        String[] words = {"cat","dog","catdog"};
        ConcatenatedWords472 sol = new ConcatenatedWords472();
        List<String> result = sol.findAllConcatenatedWordsInADict(words);
        System.out.println("concatenated words");
        for(String w:result){
            System.out.println(w);
        }
    }
}
/*
class ConcatenatedWords {
    isConcatenated(word, st, map) {
        if (map.has(word)) {
            return map.get(word);
        }
        let l = word.length;
        for (let i = 0; i < l - 1; i++) { // Note: Must split at least once, so 'i < l - 1'
            let prefix = word.substring(0, i + 1);
            let suffix = word.substring(i + 1, l);
            if (
                (st.has(prefix) && st.has(suffix)) ||
                (st.has(prefix) && this.isConcatenated(suffix, st, map))
            ) {
                map.set(word, true);
                return true;
            }
        }
        map.set(word, false);
        return false;
    }

    findAllConcatenatedWordsInADict(words) {
        const st = new Set(words);
        const map = new Map();
        const result = [];
        for (const word of words) {
            if (word === "") continue; // Skip empty words
            // Remove self to avoid using itself as a building block
            st.delete(word);
            if (this.isConcatenated(word, st, map)) {
                result.push(word);
            }
            st.add(word); // Add back after checking
        }
        return result;
    }
}

// Example usage:
const words = ["cat", "dog", "catdog"];
const sol = new ConcatenatedWords();
const result = sol.findAllConcatenatedWordsInADict(words);
console.log("concatenated words");
for (const w of result) {
    console.log(w);
}

*/