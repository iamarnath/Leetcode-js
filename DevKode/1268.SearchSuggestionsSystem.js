/*
1268. Search Suggestions System

Solution  - https://leetcode.com/problems/search-suggestions-system/solutions/5110857/optimised/


Description
You are given an array of strings products and a string searchWord.

Design a system that suggests at most three product names from products after each character of searchWord is typed. Suggested products should have common prefix with searchWord. If there are more than three products with a common prefix return the three lexicographically minimums products.

Return a list of lists of the suggested products after each character of searchWord is typed.

 

Example 1:

Input: products = ["mobile","mouse","moneypot","monitor","mousepad"], searchWord = "mouse"
Output: [["mobile","moneypot","monitor"],["mobile","moneypot","monitor"],["mouse","mousepad"],["mouse","mousepad"],["mouse","mousepad"]]
Explanation: products sorted lexicographically = ["mobile","moneypot","monitor","mouse","mousepad"].
After typing m and mo all products match and we show user ["mobile","moneypot","monitor"].
After typing mou, mous and mouse the system suggests ["mouse","mousepad"].
Example 2:

Input: products = ["havana"], searchWord = "havana"
Output: [["havana"],["havana"],["havana"],["havana"],["havana"],["havana"]]
Explanation: The only word "havana" will be always suggested while typing the search word.
 

Constraints:

1 <= products.length <= 1000
1 <= products[i].length <= 3000
1 <= sum(products[i].length) <= 2 * 104
All the strings of products are unique.
products[i] consists of lowercase English letters.
1 <= searchWord.length <= 1000
searchWord consists of lowercase English letters.
*/
/*
two approach can be used - Trie and two pointer

Time Complexity
Sorting the products array initially takes O(N * log(N)) time, where N is the number of products.
The main loop iterates through each character of the searchWord, and for each character, it performs two while loops to find the left and right indices. These while loops can take up to O(N) time in the worst case scenario.
The innermost loop that populates the tempOutput array runs at most 3 times for each character of searchWord.
Therefore, the overall time complexity of the suggestedProducts function is O(N * log(N) + N * M), where M is the length of the searchWord.

Space Complexity
The space complexity of this function is O(N * M), where N is the number of products and M is the length of the searchWord.
Additional space is used for the leftIndex, rightIndex, output array, tempOutput array, and other variables.
The output array stores the suggested products after each character of searchWord is typed, and the maximum number of suggested products is 3 for each character.
Sorting the products array in place does not incur additional space complexity.
*/

var suggestedProducts = function(products, searchWord) {
    products.sort(); // Sort the products lexicographically
    let leftIndex = 0;
    let rightIndex = products.length - 1;
    let output = [];

    for (let index = 0; index < searchWord.length; index++) {
        let charVal = searchWord[index];
        while (leftIndex <= rightIndex) {
            if (products[leftIndex].length <= index || products[leftIndex][index] !== charVal) {
                leftIndex++;
            } else {
                break;
            }
        }
        while (rightIndex >= leftIndex) {
            if (products[leftIndex].length <= index || products[rightIndex][index] !== charVal) {
                rightIndex--;
            } else {
                break;
            }
        }
        let count = 1;
        let tempOutput = [];
        for (let i = leftIndex; i <= rightIndex && count <= 3; i++) {
            tempOutput.push(products[i]);
            count++;
        }
        output.push(tempOutput);
    }

    return output;
};
let products = ["mobile","mouse","moneypot","monitor","mousepad"], searchWord = "mouse";
products = ["havana"], searchWord = "havana"
console.log(suggestedProducts(products,searchWord))