/*
2418. Sort the People

Solution - https://leetcode.com/problems/sort-the-people/solutions/5210464/optimised/

https://leetcode.com/problems/sort-the-people/solutions/5210494/optimised2/

Description
You are given an array of strings names, and an array heights that consists of distinct positive integers. Both arrays are of length n.

For each index i, names[i] and heights[i] denote the name and height of the ith person.

Return names sorted in descending order by the people's heights.

Example 1:

Input: names = ["Mary","John","Emma"], heights = [180,165,170]
Output: ["Mary","Emma","John"]
Explanation: Mary is the tallest, followed by Emma and John.
Example 2:

Input: names = ["Alice","Bob","Bob"], heights = [155,185,150]
Output: ["Bob","Alice","Bob"]
Explanation: The first Bob is the tallest, followed by Alice and the second Bob.
 

Constraints:

n == names.length == heights.length
1 <= n <= 103
1 <= names[i].length <= 20
1 <= heights[i] <= 105
names[i] consists of lower and upper case English letters.
All the values of heights are distinct.
*/
/*
Approach to sortPeople Function
The sortPeople function sorts a list of names based on the corresponding heights of each person. It uses an auxiliary array idx to store the indices of the names and heights arrays. The function then sorts the idx array based on the heights at the corresponding indices in descending order. Finally, it constructs the sorted names array by iterating through the sorted idx array and retrieving the names at the corresponding indices.
Time Complexity
Let n be the number of people.
The time complexity of this function is O(n log n), where n is the number of people.
The function creates an auxiliary array idx of size n and initializes it with the indices from 0 to n-1, which takes O(n) time.
The sorting operation on the idx array uses a comparison-based sorting algorithm, such as quicksort or mergesort, which has an average and best-case time complexity of O(n log n).
The final loop that constructs the sorted names array iterates through the idx array once, taking O(n) time.
Therefore, the overall time complexity is dominated by the sorting operation, which is O(n log n).
Space Complexity
The space complexity of this function is O(n), where n is the number of people.
The function creates an auxiliary array idx of size n to store the indices, which contributes to the space complexity.
The space required for the sortedNames array is also proportional to the number of people, as it stores the sorted names.
Therefore, the space complexity is linear in terms of the number of people.

*/
function sortPeople(names, heights) {
    const n = names.length;
    const idx = new Array(n);
    for (let i = 0; i < n; i++) {
        idx[i] = i;
    }
    // The sort compares the heights at the indices and sorts the indices array.
    idx.sort((index1, index2) => heights[index2] - heights[index1]);
    const sortedNames = [];
    for (let index of idx) {
        sortedNames.push(names[index]);
    }
    return sortedNames;
}

/*

Approach to sortPeople Function

The sortPeople function combines the names and heights into objects, sorts these objects based on heights in descending order, and then extracts the sorted names. This approach directly associates each name with its corresponding height, allowing for a more streamlined sorting process without the need for an auxiliary index array.

Time Complexity

Let n be the number of people.
The time complexity of this function is O(n log n), where n is the number of people.
Mapping the names and heights to objects using map takes O(n) time.
Sorting the combined array based on heights using sort with a comparison function takes O(n log n) time.
Mapping the sorted combined array back to an array of names using map takes O(n) time.
The dominant operation is the sorting step, which contributes O(n log n) to the overall time complexity.

Space Complexity

The space complexity of this function is O(n), where n is the number of people.
Creating the combined array to store objects with names and heights contributes to the space complexity.
The space required for the final sorted names array is also proportional to the number of people.
Overall, the space complexity is linear in terms of the number of people.

*/
var sortPeople2= function(names, heights) {
    const combined = names.map((name, index) => ({ name, height: heights[index] }));
    combined.sort((a, b) => b.height - a.height);
    return combined.map(person => person.name);
};

let names = ["Mary", "John", "Emma"], heights = [180, 165, 170];
names = ["Alice", "Bob", "Bob"], heights = [155, 185, 150]

console.log(sortPeople2(names, heights));