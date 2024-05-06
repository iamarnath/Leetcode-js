/*
609. Find Duplicate File in System

Solution - https://leetcode.com/problems/find-duplicate-file-in-system/solutions/5118662/optimised/

Description
Given a list paths of directory info, including the directory path, and all the files with contents in this directory, return all the duplicate files in the file system in terms of their paths. You may return the answer in any order.

A group of duplicate files consists of at least two files that have the same content.

A single directory info string in the input list has the following format:

"root/d1/d2/.../dm f1.txt(f1_content) f2.txt(f2_content) ... fn.txt(fn_content)"
It means there are n files (f1.txt, f2.txt ... fn.txt) with content (f1_content, f2_content ... fn_content) respectively in the directory "root/d1/d2/.../dm". Note that n >= 1 and m >= 0. If m = 0, it means the directory is just the root directory.

The output is a list of groups of duplicate file paths. For each group, it contains all the file paths of the files that have the same content. A file path is a string that has the following format:

"directory_path/file_name.txt"
 

Example 1:

Input: paths = ["root/a 1.txt(abcd) 2.txt(efgh)","root/c 3.txt(abcd)","root/c/d 4.txt(efgh)","root 4.txt(efgh)"]
Output: [["root/a/2.txt","root/c/d/4.txt","root/4.txt"],["root/a/1.txt","root/c/3.txt"]]
Example 2:

Input: paths = ["root/a 1.txt(abcd) 2.txt(efgh)","root/c 3.txt(abcd)","root/c/d 4.txt(efgh)"]
Output: [["root/a/2.txt","root/c/d/4.txt"],["root/a/1.txt","root/c/3.txt"]]
 

Constraints:

1 <= paths.length <= 2 * 104
1 <= paths[i].length <= 3000
1 <= sum(paths[i].length) <= 5 * 105
paths[i] consist of English letters, digits, '/', '.', '(', ')', and ' '.
You may assume no files or directories share the same name in the same directory.
You may assume each given directory info represents a unique directory. A single blank space separates the directory path and file info.
 

Follow up:

Imagine you are given a real file system, how will you search files? DFS or BFS?
If the file content is very large (GB level), how will you modify your solution?
If you can only read the file by 1kb each time, how will you modify your solution?
What is the time complexity of your modified solution? What is the most time-consuming part and memory-consuming part of it? How to optimize?
How to make sure the duplicated files you find are not false positive?
*/

/*

Approach:
Initialization: The function initializes a Map called fileContentMap to store the file content as the key and the list of file paths with that content as the value.
Parsing File Paths: The function then iterates through each file path in the paths array. For each path, it splits the string on the space character to separate the root directory and the individual files.
Extracting File Information: For each file, the function splits the file name and content using the regular expression $$|$$ to extract the file name and content. It then checks if the file content already exists in the fileContentMap. If it does, it appends the current file path to the existing list of paths. If it doesn't, it initializes a new list with the current file path.
Filtering Duplicates: After processing all the file paths, the function filters the fileContentMap to only include the file contents that have more than one associated file path. It then returns this filtered list of file paths.
Time Complexity:
The time complexity of this function is O(n * m), where n is the number of file paths in the paths array and m is the average number of files per path.
The outer loop iterates through the paths array, which takes O(n) time.
For each path, the function splits the string and iterates through the individual files, which takes O(m) time.
The operations performed on the fileContentMap (checking if the content exists, appending to the list, and updating the map) are all constant-time operations.
The final filtering step, which creates a new array from the fileContentMap values, takes O(n * m) time, as it needs to iterate through all the file paths.
Space Complexity:
The space complexity of this function is O(n * m), where n is the number of file paths in the paths array and m is the average number of files per path.
The fileContentMap stores the file content as the key and the list of file paths as the value. The maximum size of the map is equal to the total number of unique file contents, which is bounded by the total number of files, n * m.
The function also creates a new array to store the filtered file paths, which has a maximum size of n * m, as it includes all the duplicate file paths.


Time Complexity:
The time complexity of this function is O(n * m), where n is the number of file paths in the paths array and m is the average number of files per path.
The outer loop iterates through the paths array, which takes O(n) time.
For each path, the function splits the string and iterates through the individual files, which takes O(m) time.
The operations performed on the fileContentMap (checking if the content exists, appending to the list, and updating the map) are all constant-time operations.
The final filtering step, which creates a new array from the fileContentMap values, takes O(n * m) time, as it needs to iterate through all the file paths.


Space Complexity:
The space complexity of this function is O(n * m), where n is the number of file paths in the paths array and m is the average number of files per path.
The fileContentMap stores the file content as the key and the list of file paths as the value. The maximum size of the map is equal to the total number of unique file contents, which is bounded by the total number of files, n * m.
The function also creates a new array to store the filtered file paths, which has a maximum size of n * m, as it includes all the duplicate file paths.

*/
var findDuplicate = function (paths) {
    // Map to store the content of the files and their paths
    const fileContentMap = new Map();
    // Split the path into root directory and files
    for (const path of paths) {
        const [rootDir, ...files] = path.split(' ');
        // Iterate over each file in the current path
        for (const file of files) {
            const [fileName, fcontent] = file.split(/\(|\)/g).filter(Boolean);
            // Get the existing list of file paths with the same content, or initialize an empty one
            const existingPath = fileContentMap.get(fcontent) ?? [];
            // Add the new file path to the list of paths for this content
            existingPath.push(`${rootDir}/${fileName}`);
            // Update the map with the new list of paths for this content
            fileContentMap.set(fcontent, existingPath);
        }
    }
    // Filter out the file contents that have more than one path and return the values of the map
    let filteredFileContents = [...fileContentMap.values()].filter(paths => paths.length > 1);
    return filteredFileContents;
}

let paths = ["root/a 1.txt(abcd) 2.txt(efgh)", "root/c 3.txt(abcd)", "root/c/d 4.txt(efgh)", "root 4.txt(efgh)"];
paths = ["root/a 1.txt(abcd) 2.txt(efgh)", "root/c 3.txt(abcd)", "root/c/d 4.txt(efgh)"]
console.log(findDuplicate(paths))