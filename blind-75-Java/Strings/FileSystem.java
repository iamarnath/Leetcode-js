/*
588. design-in-memory-file-system

 * Description
Design a data structure that simulates an in-memory file system.

Implement the FileSystem class:

FileSystem() Initializes the object of the system.
List<String> ls(String path)
If path is a file path, returns a list that only contains this file's name.
If path is a directory path, returns the list of file and directory names in this directory.
The answer should in lexicographic order.
void mkdir(String path) Makes a new directory according to the given path. The given directory path does not exist. If the middle directories in the path do not exist, you should create them as well.
void addContentToFile(String filePath, String content)
If filePath does not exist, creates that file containing given content.
If filePath already exists, appends the given content to original content.
String readContentFromFile(String filePath) Returns the content in the file at filePath.
 

Example 1:



Input
["FileSystem", "ls", "mkdir", "addContentToFile", "ls", "readContentFromFile"]
[[], ["/"], ["/a/b/c"], ["/a/b/c/d", "hello"], ["/"], ["/a/b/c/d"]]
Output
[null, [], null, null, ["a"], "hello"]
Explanation
FileSystem fileSystem = new FileSystem();
fileSystem.ls("/"); // return []
fileSystem.mkdir("/a/b/c");
fileSystem.addContentToFile("/a/b/c/d", "hello");
fileSystem.ls("/"); // return ["a"]
fileSystem.readContentFromFile("/a/b/c/d"); // return "hello"


 

Constraints:

1 <= path.length, filePath.length <= 100
path and filePath are absolute paths which begin with '/' and do not end with '/' except that the path is just "/".
You can assume that all directory names and file names only contain lowercase letters, and the same names will not exist in the same directory.
You can assume that all operations will be passed valid parameters, and users will not attempt to retrieve file content or list a directory or file that does not exist.
You can assume that the parent directory for the file in addContentToFile will exist.
1 <= content.length <= 50
At most 300 calls will be made to ls, mkdir, addContentToFile, and readContentFromFile.
 * 
*/

package Strings;

import java.util.Map;
import java.util.TreeMap;
import java.util.List;
import java.util.Arrays;
import java.util.LinkedList;

class TrieNode {
    String content = null;
    Map<String, TrieNode> children = new TreeMap<>();
}

public class FileSystem {
    TrieNode root = new TrieNode();

    public List<String> ls(String path) {
        TrieNode curNode = root;
        if (!path.equals("/")) {
            String[] list = path.split("/");
            String curString;
            for (int i = 1; i < list.length; i++) {
                curString = list[i];
                curNode = curNode.children.get(curString);
                // Check if it is file path

                if (i == list.length - 1 && curNode.content != null) {
                    return Arrays.asList(curString);
                } // end of if
            } // end of for
        } // end of if
        List<String> children = new LinkedList<>(curNode.children.keySet());
        return children;
    }// end of ls

    public void mkdir(String path) {
        TrieNode curNode = root;
        String[] arr = path.split("/");
        for (int i = 1; i < arr.length; i++) {
            String curString = arr[i];
            if (!curNode.children.containsKey(curString)) {
                curNode.children.put(curString, new TrieNode());
            }
            curNode = curNode.children.get(curString);
        }
    }// end of mkdir

    public void addContentToFile(String filePath, String content) {
        TrieNode curNode = root;
        String[] arr = filePath.split("/");
        for (int i = 1; i < arr.length; i++) {
            String curString = arr[i];
            if (!curNode.children.containsKey(curString)) {
                curNode.children.put(curString, new TrieNode());
            }
            curNode = curNode.children.get(curString);
            if (curNode.content != null) {
                curNode.content += content;
            } else {
                curNode.content = content;
            }
        }
    }// end of fn addContentToFile

    public String readContentFromFile(String filePath) {
        TrieNode curNode = root;
        String[] arr = filePath.split("/");
        for (int i = 1; i < arr.length; i++) {
            String curString = arr[i];
            if (!curNode.children.containsKey(curString)) {
                curNode.children.put(curString, new TrieNode());
            }
            curNode = curNode.children.get(curString);
        }
        return curNode.content;
    }

    public static void main(String[] args) {
        FileSystem fs = new FileSystem();
        // Create directories
        fs.mkdir("/a/b/c");
        System.out.println("After mkdir /a/b/c:");
        System.out.println(fs.ls("/")); // Should print: [a]
        System.out.println(fs.ls("/a/b")); // Should print: [c]

        // Add content to file
        fs.addContentToFile("/a/b/c/file.txt", "Hello ");
        fs.addContentToFile("/a/b/c/file.txt", "World");

        // Read content from file
        String content = fs.readContentFromFile("/a/b/c/file.txt");
        System.out.println("Content of file.txt: " + content); // Should print: Hello World

        // List file
        System.out.println("List /a/b/c/file.txt: " + fs.ls("/a/b/c/file.txt")); // Should print: [file.txt]

        // List folder
        System.out.println("List /a/b/c: " + fs.ls("/a/b/c")); // Should print: [file.txt]
    }
}
