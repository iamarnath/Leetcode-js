/*
 * Title
Replace Files with Directory if All Files in Directory Are Specified

Problem Statement

You are given a list of file paths (as strings), where each 
path is either a file or a directory. The file paths use / as
 a separator, and files always have an extension (e.g., .txt, .cpp),
  while directories do not.
Your task is to replace all files in a directory with the 
directory path itself if and only if all files directly 
inside that directory are present in the list (no subdirectories).
If a directory is replaced, its files should not appear 
in the output list.
Return the minimal list of paths after performing all 
possible such replacements.
Example 1
Input:
["a/b/c.txt", "a/b/d.txt", "a/b/e.txt"]

Output:
["a/b"]

Explanation:
All files inside a/b are present, so they are replaced by the directory a/b.
Example 2
Input:
["a/b/c.txt", "a/b/d.txt", "a/b2/e.txt"]

Output:
["a/b/c.txt", "a/b/d.txt", "a/b2/e.txt"]

Explanation:
Not all files in any directory are present, so no replacement occurs.
Example 3
Input:
["a/b/c.txt", "a/b/d.txt", "a/b2/e.txt", "a/b2/f.txt"]

Output:
["a/b/c.txt", "a/b/d.txt", "a/b2"]

Explanation:
All files in a/b2 are present, so they are replaced by a/b2.
Constraints
•	1 ≤ paths.length ≤ 10^4
•	1 ≤ path.length ≤ 100
•	All paths are valid and use / as the separator
•	No file or directory is repeated

 * 
*/
/*
 *  Problem Summary
You are given a list of file paths. Each path can be:

A file, like a/b/file.txt

Or a directory, like a/b (no file extension)

Your task is to simplify the list by replacing files with their parent directory — but only when all the files in a directory are present in the list, and there are no subdirectories inside that directory.

🔶 Important Rules
✅ What counts as a file?
A path with a file extension (e.g., .txt, .cpp, .json).

plaintext
Copy
Edit
a/b/c.txt ✅ (file)
a/b/c ✅ (not a file — it's a directory)
✅ What counts as a directory?
Any path without an extension (just a folder).

plaintext
Copy
Edit
a ✅
a/b ✅
✅ When can we replace files with the directory?
We can replace all files in a directory with the directory name only if:

✅ All files directly inside that directory are present in the list.

✅ The directory contains only files, not subdirectories.

Then:

✅ Replace those files with the directory name.

🚫 Do not include those individual files in the result list anymore.

🧪 Let’s walk through examples
### ✅ Example 1
Input:

java
Copy
Edit
["a/b/c.txt", "a/b/d.txt", "a/b/e.txt"]
🔍 All three files are in directory a/b.

We assume a/b contains only these files — and we have all of them.

✅ So we replace all 3 files with just:

java
Copy
Edit
["a/b"]
### ❌ Example 2
Input:

java
Copy
Edit
["a/b/c.txt", "a/b/d.txt", "a/b2/e.txt"]
a/b has 2 files (c.txt, d.txt) ✅

a/b2 has only 1 file (e.txt) ❌

But maybe a/b2 actually contains other files too (like f.txt) that aren't in the list.

So we don’t know if we have all files in a/b2.

🛑 So we don’t replace anything.

Output:

java
Copy
Edit
["a/b/c.txt", "a/b/d.txt", "a/b2/e.txt"]
✅ Example 3
Input:

java
Copy
Edit
["a/b/c.txt", "a/b/d.txt", "a/b2/e.txt", "a/b2/f.txt"]
a/b → has c.txt, d.txt → ✅ But only these two files, not complete? (we don't know)

a/b2 → has e.txt, f.txt → ✅ All of them listed

If we know that a/b2 contains only e.txt and f.txt, then we can replace them with:

java
Copy
Edit
["a/b2"]
We keep the files in a/b since we can't confirm if they are the only files.

Output:

java
Copy
Edit
["a/b/c.txt", "a/b/d.txt", "a/b2"]
🔶 Important Edge Cases
Case 1: Files in different directories
java
Copy
Edit
["x/a.txt", "y/b.txt"]
Can't replace anything — different dirs.
→ Output: ["x/a.txt", "y/b.txt"]

Case 2: Directory has subdirectories
java
Copy
Edit
["a/b/c.txt", "a/b/d", "a/b/d/e.txt"]
a/b has a subdirectory d

Even if c.txt is present, don’t replace a/b
→ Output: as-is

Case 3: One file in directory
java
Copy
Edit
["a/b/c.txt"]
We assume it’s the only file

✅ We can replace it with a/b
→ Output: ["a/b"]

🔁 Final Output Rule
Build the final result as:

Keep all files except those inside a replaced directory

Add each replaced directory path once

✅ TL;DR
Condition	Action
All files in a directory are present and no subdirs	Replace with directory
Missing files or subdirs exist	Keep files as-is
Files in different dirs	Don't combine
Directory has no files?	Ignore it
 * 
*/
package Strings;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

/* 
public class ReplaceFilesWithDirectories {
    public List<String> replaceFilesWithDirectories(List<String> paths) {
        Set<String> allPaths = new HashSet<>(paths);
        Map<String, List<String>> dirToFiles = new HashMap<>();
        Set<String> fileDirs = new HashSet<>();
        Set<String> directories = new HashSet<>();

        for (String path : paths) {
            int lastSlash = path.lastIndexOf("/");
            if (lastSlash == -1) {
                continue;
            }
            String dir = path.substring(0, lastSlash);
            if (isFile(path)) {
                dirToFiles.computeIfAbsent(dir, k -> new ArrayList<>()).add(path);
                fileDirs.add(dir);
            } else {
                directories.add(path);
            }
        }
        // Step 2: Identify directories that can replace their files
        Set<String> replaceableDirs = new HashSet<>();
        for (String dir : fileDirs) {
            boolean hasOnlyFiles = true;
            for (String other : allPaths) {
                if (other.startsWith(dir + "/")) {
                    String suffix = other.substring(dir.length() + 1);
                    if (!suffix.contains("/") && !isFile(other)) {
                        // Found subdirectory directly under 'dir'
                        hasOnlyFiles = false;
                        break;

                    } // end of if
                } // end of if
            } // end of for
            if (hasOnlyFiles) {
                replaceableDirs.add(dir);
            }
        } // end of for
          // Step 3: Build result — exclude replaced files, include directories
        List<String> result = new ArrayList<>();
        for (String path : paths) {
            if (isFile(path)) {
                String dir = path.substring(0, path.lastIndexOf("/"));
                if (replaceableDirs.contains(dir))
                    continue;// skip replaced files
            }
            if (!replaceableDirs.contains(path)) {
                result.add(path);
            }
        }
        // Add replaced directories
        result.addAll(replaceableDirs);
        return result;
    }

    private boolean isFile(String path) {
        int lastSlash = path.lastIndexOf("/");
        String name = (lastSlash == -1) ? path : path.substring(lastSlash + 1);
        return name.contains(".");
    }

    public static void main(String[] args) {
        ReplaceFilesWithDirectories sol = new ReplaceFilesWithDirectories();
        System.out.println(sol.replaceFilesWithDirectories(Arrays.asList("a/b/c.txt", "a/b/d.txt", "a/b/e.txt")));
           // Output: ["a/b"]
        System.out.println(sol.replaceFilesWithDirectories(Arrays.asList("a/b/c.txt", "a/b/d.txt", "a/b2/e.txt")));
                // Output: ["a/b/c.txt", "a/b/d.txt", "a/b2/e.txt"]
        System.out.println(
                sol.replaceFilesWithDirectories(Arrays.asList("a/b/c.txt", "a/b/d.txt", "a/b2/e.txt", "a/b2/f.txt")));
                    // Output: ["a/b/c.txt", "a/b/d.txt", "a/b2"]

            }
}
*/
/*
 * Approach
Group files by their parent directory.

Identify directories where all files are present.

Replace groups of files with their directory in the result.

Return the modified list.
 * 
*/
public class ReplaceFilesWithDirectories {
    public List<String> replaceFilesWithDirectories(List<String> paths) {
        // Step 1: Group files by their parent directory
        // dirToFiles: Maps each directory to a list of its files.
        // allPaths: Stores all input paths for quick lookup.

        Map<String, List<String>> dirToFiles = new HashMap<>();
        Set<String> allPaths = new HashSet<>(paths);
        /*
         * Iterates over each path.
         * If the path contains a / and a ., it's treated as a file
         * (not a directory).
         * Extracts the parent directory using substring.
         * Adds the file to the list for its parent directory in dirToFiles.
         * 
         */
        System.out.println("Input paths:");

        for (String path : paths) {
            System.out.println("  - " + path);
            int lastSlash = path.lastIndexOf('/');
            if (lastSlash != -1 && path.contains(".")) { // It's a file
                String dir = path.substring(0, lastSlash);
                dirToFiles.computeIfAbsent(dir, k -> new ArrayList<>()).add(path);
            }
        }
        // For each directory and its files:
        // Checks if all files are present in the original list.
        // If true, adds the directory to toReplace.
        // Step 2: For each directory, check if all its files are present
        Set<String> toReplace = new HashSet<>();
        System.out.println("\nGrouped files by directory:");

        for (Map.Entry<String, List<String>> entry : dirToFiles.entrySet()) {
            String dir = entry.getKey();
            System.out.println("Directory: " + entry.getKey());
            List<String> files = entry.getValue();

            // Check if all files in this directory are present and there are no
            // subdirectories
            boolean allFilesPresent = true;
            for (String file : files) {
                System.out.println("  - File: " + file);

                if (!allPaths.contains(file)) {
                    allFilesPresent = false;
                    break;
                }
            }
            if (allFilesPresent) {
                System.out.println(
                        "✅ All files present for directory: " + dir + " -> Will replace files with this directory.");
                toReplace.add(dir);
            } else {
                System.out.println("❌ Not all files present for directory: " + dir + " -> Will not replace.");
            }
        }

        // Step 3: Build the result list
        List<String> result = new ArrayList<>();
        // Iterates over the original paths.
        // For each file, if its directory is in toReplace,
        // skips adding the file.
        // Otherwise, adds the path (file or directory) to the result.
        for (String path : paths) {
            int lastSlash = path.lastIndexOf('/');
            if (lastSlash != -1 && path.contains(".")) { // It's a file
                String dir = path.substring(0, lastSlash);
                if (toReplace.contains(dir)) {
                    System.out.println("Skipping file (replaced by directory): " + path);
                    continue; // Skip files to be replaced
                }
            }
            result.add(path);
        }

        // Add replaced directories (if not already in result)
        // Ensures that each replaced directory is added to the result if not already
        // present.
        for (String dir : toReplace) {
            if (!result.contains(dir)) {
                System.out.println("Adding replaced directory to result: " + dir);
                result.add(dir);
            }
        }

        return result;
    }

    // For testing
    public static void main(String[] args) {
        ReplaceFilesWithDirectories sol = new ReplaceFilesWithDirectories();
        //System.out.println(sol.replaceFilesWithDirectories(Arrays.asList("a/b/c.txt", "a/b/d.txt", "a/b/e.txt"))); // [a/b]
        // System.out.println(sol.replaceFilesWithDirectories(Arrays.asList("a/b/c.txt",
        // "a/b/d.txt", "a/b2/e.txt"))); // [a/b/c.txt, a/b/d.txt, a/b2/e.txt]
         System.out.println(sol.replaceFilesWithDirectories(Arrays.asList("a/b/c.txt",
         "a/b/d.txt", "a/b2/e.txt", "a/b2/f.txt"))); // [a/b/c.txt, a/b/d.txt, a/b2]
    }
}
