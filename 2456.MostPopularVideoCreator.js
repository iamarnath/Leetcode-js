/*
2456. Most Popular Video Creator

Solution - https://leetcode.com/problems/most-popular-video-creator/solutions/5189806/optimised/

Description
You are given two string arrays creators and ids, and an integer array views, all of length n. The ith video on a platform was created by creator[i], has an id of ids[i], and has views[i] views.

The popularity of a creator is the sum of the number of views on all of the creator's videos. Find the creator with the highest popularity and the id of their most viewed video.

If multiple creators have the highest popularity, find all of them.
If multiple videos have the highest view count for a creator, find the lexicographically smallest id.
Return a 2D array of strings answer where answer[i] = [creatori, idi] means that creatori has the highest popularity and idi is the id of their most popular video. The answer can be returned in any order.

 

Example 1:

Input: creators = ["alice","bob","alice","chris"], ids = ["one","two","three","four"], views = [5,10,5,4]
Output: [["alice","one"],["bob","two"]]
Explanation:
The popularity of alice is 5 + 5 = 10.
The popularity of bob is 10.
The popularity of chris is 4.
alice and bob are the most popular creators.
For bob, the video with the highest view count is "two".
For alice, the videos with the highest view count are "one" and "three". Since "one" is lexicographically smaller than "three", it is included in the answer.
Example 2:

Input: creators = ["alice","alice","alice"], ids = ["a","b","c"], views = [1,2,2]
Output: [["alice","b"]]
Explanation:
The videos with id "b" and "c" have the highest view count.
Since "b" is lexicographically smaller than "c", it is included in the answer.
 

Constraints:

n == creators.length == ids.length == views.length
1 <= n <= 105
1 <= creators[i].length, ids[i].length <= 5
creators[i] and ids[i] consist only of lowercase English letters.
0 <= views[i] <= 105

*/
/*
Approach:
The function mostPopularCreator takes three input arrays: creators, ids, and views.
It initializes two maps: cnt to store the total views per creator, and mostViewedIndex to store the index of the most viewed content for each creator.
The function then iterates through the creators, ids, and views arrays simultaneously using a for loop.
For each creator, it updates the total views in the cnt map by adding the current view count to the existing value (or initializing to 0 if the creator is not yet in the map).
It then checks if the current content has more views or a lower id (in case of a tie) than the previously stored most viewed content for that creator. If so, it updates the mostViewedIndex map with the current index.
After processing all the data, the function finds the maximum view count across all creators using Math.max(...cnt.values()).
It then iterates through the cnt map again to find all creators who have the maximum view count.
For each such creator, it pushes an array containing the creator name and the id of the most viewed content (obtained from the mostViewedIndex map) to the result array.
Finally, the function returns the result array.
Time Complexity:
The time complexity of this function is O(n), where n is the length of the input arrays creators, ids, and views.
The function iterates through the input arrays once, performing constant-time operations for each element.
The operations on the Map objects (setting, getting, and checking for existence) have an average time complexity of O(1).
Space Complexity:
The space complexity of this function is O(m), where m is the number of unique creators.
The function uses two maps, cnt and mostViewedIndex, to store data related to each creator.
The size of these maps depends on the number of unique creators, not the length of the input arrays.
The result array can hold at most m elements, as there can be at most m creators with the maximum view count.

*/

function mostPopularCreator(creators, ids, views) {
    // Create a map to store the total views per creator
    const cnt = new Map();
    // Create a map to store the index of the most viewed content for each creator
    const mostViewedIndex = new Map();
    const n = ids.length;
    for (let index = 0; index < n; ++index) {
        const creator = creators[index];
        const contentId = ids[index];
        const viewCount = views[index];
        // Update the total views for the creator
        cnt.set(creator, (cnt.get(creator) ?? 0) + viewCount);
        // Determine if the current content has more views or a lower id (in case of a tie) than the stored one
        if (!mostViewedIndex.has(creator) ||
            views[mostViewedIndex.get(creator)] < viewCount ||
            (views[mostViewedIndex.get(creator)] === viewCount && ids[mostViewedIndex.get(creator)]) > contentId) {
            mostViewedIndex.set(creator, index);
        }
    }
    // Find the maximum view count across all creators

    const maxViewCount = Math.max(...cnt.values());

    const result = [];
    // Find all creators who have the maximum view count
    for (const [creator, totalView] of cnt) {
        if (totalView === maxViewCount) {
            result.push([creator, ids[mostViewedIndex.get(creator)]]);
        }
    }
    return result;
}

let creators = ["alice", "bob", "alice", "chris"], ids = ["one", "two", "three", "four"], views = [5, 10, 5, 4];
//creators = ["alice","alice","alice"], ids = ["a","b","c"], views = [1,2,2]
console.log(mostPopularCreator(creators, ids, views));