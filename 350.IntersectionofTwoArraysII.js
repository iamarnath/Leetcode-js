/*
350. Intersection of Two Arrays II

Solution - https://leetcode.com/problems/intersection-of-two-arrays-ii/solutions/5111401/optimised/

Description
Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must appear as many times as it shows in both arrays and you may return the result in any order.
Example 1:

Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2,2]
Example 2:

Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [4,9]
Explanation: [9,4] is also accepted.
 
Constraints:

1 <= nums1.length, nums2.length <= 1000
0 <= nums1[i], nums2[i] <= 1000
 

Follow up:

What if the given array is already sorted? How would you optimize your algorithm?
What if nums1's size is small compared to nums2's size? Which algorithm is better?
What if elements of nums2 are stored on disk, and the memory is limited such that you cannot load all elements into the memory at once?

Time Complexity:
Creating the frequency map for nums1 takes O(n) time, where n is the length of nums1.
Iterating through nums2 and checking for common elements takes O(m) time, where m is the length of nums2.
Overall, the time complexity of the intersect function is O(n + m), where n is the length of nums1 and m is the length of nums2.

Space Complexity:
The space complexity is O(min(n, m)), where n is the length of nums1 and m is the length of nums2.
The space is used to store the frequency map for nums1 and the result array, which can grow up to the size of the smaller array.

Approach:
Frequency Map Creation: The function first creates a frequency map for nums1, where each element's count is stored.
Intersection Check: It then iterates through nums2 and checks if the current element exists in the frequency map. If it does, the element is added to the result array, and its count in the map is decremented.
Result Generation: The function returns the result array containing the common elements found in both arrays, maintaining the frequency as required.


*/

var intersect = function (nums1, nums2) {
    const numFreqMap = {};
    for (const num of nums1) {
        numFreqMap[num] = (numFreqMap[num] || 0) + 1;
    }
    let intersectionResult = [];
    for (const num of nums2) {
        if (numFreqMap[num] > 0) {
            intersectionResult.push(num);
            numFreqMap[num]--;
        }
    }
    return intersectionResult;
};

// let nums1 = [4,9,5], nums2 = [9,4,9,8,4];
// nums1 = [1,2,2,1], nums2 = [2,2]
// console.log(intersect(nums1,nums2));

/*
Optimizations for Sorted Arrays:
If the input arrays nums1 and nums2 are already sorted, we can optimize the solution further:

In this optimized solution, we use two pointers i and j to iterate through nums1 and nums2, respectively. We compare the elements at the current indices and add the common elements to the result array. If the element in nums1 is smaller, we increment i; if the element in nums2 is smaller, we increment j.
This solution has a time complexity of O(n+m), where n and m are the lengths of nums1 and nums2, respectively. The space complexity is O(min(n,m)), as we use an additional array to store the result.

*/

function intersectSorted(nums1, nums2) {
    let i = 0, j = 0;
    const result = [];
  
    while (i < nums1.length && j < nums2.length) {
      if (nums1[i] === nums2[j]) {
        result.push(nums1[i]);
        i++;
        j++;
      } else if (nums1[i] < nums2[j]) {
        i++;
      } else {
        j++;
      }
    }
  
    return result;
  }

  /**
   *
   * What if nums1's size is small compared to nums2's size? Which algorithm is better?
 
  Based on the information from the provided sources, when nums1's size is small compared to nums2's size, the most efficient algorithm for finding the intersection of two arrays in JavaScript is to use a hashmap. Here's a summary of the approach:
Algorithm: The algorithm involves creating a hashmap to store the frequency of each element in nums1. Then, iterate through nums2 and check if each element is in the hashmap. If the element is present, add it to the result and update its frequency in the hashmap. If the frequency becomes 0, remove the element from the hashmap. Repeat this process until all elements in nums2 are processed.
Time Complexity: The time complexity of this algorithm is O(n), where n is the total number of elements in both arrays. This is because iterating through both arrays and performing hashmap operations takes linear time.
Space Complexity: The space complexity of this algorithm is also O(n) due to the hashmap used to store the frequency of elements in nums1.


In conclusion, when nums1 is significantly smaller than nums2, using a hashmap to store the frequency of elements from nums1 and then checking and updating this hashmap while iterating through nums2 provides an efficient solution to find the intersection of the two arrays in JavaScript.

*/

/*
What if elements of nums2 are stored on disk, and the memory is limited such that you cannot load all elements into the memory at once?

Handling Large Arrays and Limited Memory:
If nums2 is stored on disk and the memory is limited, we can use a streaming approach to solve the problem:
Read nums2 from disk in smaller chunks, and for each chunk, create a frequency map.
Iterate through nums1 and check if each element exists in the frequency maps of the nums2 chunks. If it does, add it to the result.
This way, we only need to load a small portion of nums2 into memory at a time, making it suitable for large arrays and limited memory scenarios.
The time complexity of this approach would be O(n * (m/k)), where n is the length of nums1, m is the length of nums2, and k is the size of the chunks read from disk. The space complexity would be O(m/k), as we only need to store the frequency maps for the current chunk of nums2.

To handle a situation where elements of nums2 are stored on disk, and the memory is limited such that you cannot load all elements into memory at once in JavaScript, you can implement a streaming approach. Here's a general strategy to address this scenario:
Read Elements in Chunks: Read nums2 from disk in smaller chunks rather than loading all elements at once. This approach allows you to process a portion of nums2 without overwhelming the memory.
Process Chunks Incrementally: As you read each chunk of nums2, compare its elements with nums1 to find the intersection. You can use a hashmap or other data structures to keep track of the elements from nums1 that match elements in the current chunk of nums2.
Iterate Through Chunks: Continue reading and processing chunks of nums2 until you have processed all elements. By handling the data in smaller portions, you can work within the memory constraints.


This pattern is commonly used in JavaScript to handle cases where a function returns a value that indicates the end of a data stream or the end of available data. In this specific case, the readChunkFunction is expected to return null when there are no more chunks to read from the disk.
The logic behind this approach is as follows:
The assignment expression (chunk = readChunkFunction()) calls the readChunkFunction and assigns the returned value to the chunk variable.
The condition (chunk = readChunkFunction()) !== null evaluates to true if the returned value is not null, which means there is a valid chunk of data available.
The while loop continues to execute as long as the condition is true, i.e., as long as there are more chunks to read from the disk.
This pattern is often used in situations where you need to process data in a streaming fashion, such as reading from a file, a network socket, or any other data source that provides data in chunks or pieces.


*/

function findIntersectionInChunks(nums1, readChunkFunction) {
    const freq = {};
    for (const num of nums1) {
        freq[num] = (freq[num] || 0) + 1;
    }

    let result = [];

    let chunk;
  //  while ((chunk = readChunkFunction()) !== null) {
    while (true) {
        chunk = readChunkFunction();
        if (chunk === null) {
            break;
        }
        for (const num of chunk) {
            if (freq[num]) {
                result.push(num);
                freq[num]--;
                if (freq[num] === 0) {
                    delete freq[num];
                }
            }
        }
    }

    return result;
}

// Example usage
const nums1Chunk = [1, 2, 3];
const nums2Chunk = [2, 3, 3, 4, 5, 6,7,8,9,11,23,24,25,26,27,28,29,30];
const chunkSize = 3; // Define the size of each chunk
let currentChunk = 0;

function readChunkFromDisk() {
    // Simulate reading a chunk from disk
    const start = currentChunk * chunkSize;
    const end = Math.min((currentChunk + 1) * chunkSize, nums2Chunk.length);
    const chunk = nums2Chunk.slice(start, end);
    currentChunk++;
    console.log("chunk--",chunk)
    return chunk.length > 0 ? chunk : null;
}

const intersectionChunk = findIntersectionInChunks(nums1Chunk, readChunkFromDisk);
console.log(intersectionChunk);