package Trie;

public class CountingWordsWithaGivenPrefixSorted {
    //Takes a sorted array of words and a prefix. We return the number of words that start with that prefix.

    public int countPrefix(String[] words, String prefix) {
        //Use binary search to find the first index where a word is ≥ prefix.
        //So for "ban", it finds the index of the first word that’s "banana" or later.
        int left = lowerBound(words, prefix);
        //Increment the prefix to find where the "ban" block ends.
        //"ban" → "bao"
        String nextPrefix = incrementPrefix(prefix);
        //Use binary search again to find the first index where the word is ≥ nextPrefix.
        //This will be just after the last word starting with "ban".
        int right = lowerBound(words, nextPrefix);
        return right - left;
    }

    // Binary search for first index where word >= prefix
    private int lowerBound(String[] words, String prefix) {
        int low = 0, high = words.length;
        while (low < high) {
            int mid = (low + high) / 2;
            //If word at mid is less than the prefix, then we move low up (search in right half).
            if (words[mid].compareTo(prefix) < 0) {
                low = mid + 1;
            } else {
                //Otherwise, move high down (we may have found a match or better one on the left).
                high = mid;
            }
        }
        return low;
    }

    private String incrementPrefix(String prefix) {
        //Convert the prefix to a char array, so we can modify it.
        char[] arr = prefix.toCharArray();
        int i = arr.length - 1;
        //If the last character is 'z', roll it over to 'a' and continue to the previous character.
        //E.g., 'zzz' → 'aaa', then append 'a' later to ensure it's greater.
        while (i >= 0 && arr[i] == 'z') {
            arr[i] = 'a';
            i--;
        }
    //If we found a non-'z' character, just increment it.
    //Else, append '{' to ensure new string is lexicographically greater.
        if (i > 0) {
            arr[i]++;
   
            return new String(arr);
        } else {
            return prefix + '{';
        }
    }

    public static void main(String[] args) {
        CountingWordsWithaGivenPrefixSorted sol = new CountingWordsWithaGivenPrefixSorted();
        String[] words = { "apple", "apply", "banana", "band", "bandana", "zzcat" };
       // String prefix = "ban";
        String prefix = "ap";
        int res = sol.countPrefix(words, prefix);
        System.out.println("res  "+res);
    }
}
