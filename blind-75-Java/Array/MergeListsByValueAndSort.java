/*
 * MergeListsByValueAndSort 
 * Problem: Merge Two Lists by Summing Values and Sort by Weight
You are given two 2D integer arrays list1 and list2 where each element is of the form [id, value, weight].

id is a unique identifier of an item.

value is the count/value associated with the item.

weight represents the item's weight.

The arrays are not necessarily sorted and may contain different sets of ids.

Task:
Merge the two lists into a single list such that:

If an id appears in both lists, sum their values.

The weight for items with the same id will be the same in both lists (you can assume this).

If an id appears in only one list, just include that entry.

Return a sorted list by ascending weight.

Example
Input:
list1 = [[1, 10, 5], [2, 20, 3]]
list2 = [[2, 15, 3], [3, 5, 4]]

Output:
[[2, 35, 3], [3, 5, 4], [1, 10, 5]]

Explanation:
- id=2 appears in both, summed value = 20 + 15 = 35, weight=3 (from either list)
- id=3 appears only in list2
- id=1 appears only in list1
Sorted by weight ascending: (3 -> id 2), (4 -> id 3), (5 -> id 1)
Constraints
1 <= list1.length, list2.length <= 10^5

Each entry in lists: [id, value, weight]

All ids and weights are positive integers.

Same id has same weight in both lists if present.


We are given two lists, list1 and list2.
Each element in a list has 3 parts:

[id, value, weight]


id → unique identifier of the item.

value → numeric count/amount associated with that item.

weight → weight of the item. (For the same id across both lists, the weight is guaranteed to be the same).

We need to:

Merge the two lists:

If an id appears in both lists, sum their values.

If an id appears in only one list, include it as is.

Sort the merged list by weight ascending.

Return the merged + sorted list.

 * 
*/

/*
 
 We are given two lists, list1 and list2.
Each element in a list has 3 parts:

[id, value, weight]


id → unique identifier of the item.

value → numeric count/amount associated with that item.

weight → weight of the item. (For the same id across both lists, the weight is guaranteed to be the same).

We need to:

Merge the two lists:

If an id appears in both lists, sum their values.

If an id appears in only one list, include it as is.

Sort the merged list by weight ascending.

Return the merged + sorted list.

🔹 Example Walkthrough
Input:
list1 = [[1, 10, 5], [2, 20, 3]]
list2 = [[2, 15, 3], [3, 5, 4]]

Step 1: Process list1

Put items in a map keyed by id:

id=1 -> [10, 5]   (value=10, weight=5)
id=2 -> [20, 3]   (value=20, weight=3)

Step 2: Process list2

For id=2, already present → add value: 20 + 15 = 35, weight=3.

For id=3, not present → add new entry: [5, 4].

Final map after merging:

id=1 -> [10, 5]
id=2 -> [35, 3]
id=3 -> [5, 4]

Step 3: Convert to array
[[1, 10, 5], [2, 35, 3], [3, 5, 4]]

Step 4: Sort by weight
[[2, 35, 3], [3, 5, 4], [1, 10, 5]]


✅ This matches the expected output.

*/
/*
 Time Complexity
Let:

n = list1.length,

m = list2.length,

k = map.size() (unique ids after merging).

Steps:

Insert list1 into map → O(n)

Merge list2 into map → O(m)

Convert map → array → O(k)

Sort by weight → O(k log k)

👉 Total = O(n + m + k log k)
Since k ≤ n + m, worst-case:
👉 O((n + m) log (n + m))

Space Complexity
HashMap stores up to O(n + m) entries.

The merged result array takes O(k).

Sorting is O(log k) extra stack (for comparator sort, depending on implementation).

👉 Overall = O(n + m) 
 
*/
package Array;

import java.util.*;



public class MergeListsByValueAndSort {
    public int[][] mergeAndSort(int[][] list1, int[][] list2) {
        //Creates a HashMap where:

// The key = id (first element of each row).

// The value = int[] containing {val, w} (the second and third elements of each row).

// So, each row is represented as (id → [val, w]).
        Map<Integer, int[]> map = new HashMap<>();
        // Insert list1 into map
        /*
         Iterates over every row in list1.

        Extracts:

        id = first column,

        val = second column,

        w = third column.

        Inserts into the map: map.put(id, {val, w}).

        If the same id appears again in list1, 
        the latest one overwrites the previous (because put replaces by default). 
         
        */
        for (int[] entry : list1) {
            int id = entry[0], val = entry[1], w = entry[2];
            map.put(id, new int[] { val, w });
        }
        // Merge list2 into map
        /*
         Iterates over list2.

If an id already exists in the map:

Instead of replacing, it adds the val to the existing val.

The w from the existing entry remains unchanged.

Otherwise, it inserts {val, w} as a new entry.

This ensures that:

Values val are aggregated if ids match.

The weight w is taken from whichever entry created/inserted it first (always from the first list, unless id only exists in list2).
          
        */
        for (int[] entry : list2) {
            int id = entry[0], val = entry[1], w = entry[2];
            if (map.containsKey(id)) {
                map.get(id)[0] += val;
            } else {
                map.put(id, new int[] { val, w });
            }
        }
        // Convert map -> array
        //Prepares a result 2D array merged of size equal to the number of unique IDs (map.size()).
        //Fills merged such that each row is [id, val, w].
        int[][] merged = new int[map.size()][3];
        int i = 0;
        for (Map.Entry<Integer, int[]> e : map.entrySet()) {
            merged[i][0] = e.getKey();
            merged[i][1] = e.getValue()[0];
            merged[i][2] = e.getValue()[1];
            i++;
        }
        //Sorts the rows in merged by the third column (w) in ascending order.
        Arrays.sort(merged, Comparator.comparingInt(a -> a[2]));
        //Returns the merged, sorted 2D array.
        return merged;
    }

     public static void main(String[] args) {
        MergeListsByValueAndSort solver = new MergeListsByValueAndSort();
        int[][] list1 = {{1, 10, 5}, {2, 20, 3}};
        int[][] list2 = {{2, 15, 3}, {3, 5, 4}};

        int[][] result = solver.mergeAndSort(list1, list2);
        for (int[] arr : result) {
            System.out.println(Arrays.toString(arr));
        }
    }
}
