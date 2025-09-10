/*
 * Huffman Coding Java
Last Updated : 27 Jun, 2024
The Huffman coding is a popular algorithm used for lossless data compression. It works by assigning the variable-length codes to the input characters with the shorter codes assigned to the more frequent characters. This results in the prefix-free code meaning no code is a prefix of any other code. The Huffman coding guarantees an optimal prefix-free encoding minimizing the total number of bits required to encode a message.

Data Structure Organization:
The Huffman coding organizes data using the binary tree called a Huffman tree. The tree is constructed using the priority queue or a min-heap to efficiently find the two lowest frequency nodes and merge them into the new node. This process continues until all nodes are merged into a single root node forming the Huffman tree.

                      Root

                     /       \

             Node1   Node2

                /    \    /    \

             ...     ... ...    ...

Implementation:
The Huffman coding can be implemented using various data structures such as the arrays linked lists or priority queues. One common approach is to the use a priority queue to efficiently select the two lowest frequency nodes for the merging. This implementation typically involves the following steps:

Calculate the frequency of each input character.
Create a leaf node for each character and add it to the priority queue.
While there is more than one node in the priority queue:
Remove the two nodes with the lowest frequency.
They merge them into a new internal node with the sum of their frequencies.
The Add the new node back to priority queue.
The remaining node in priority queue becomes the root of the Huffman tree.
Basic Operations:
Encoding: The Generate the Huffman codes for the each input character based on the constructed Huffman tree.The Time complexity: O(n log n) where n is the number of the unique characters.
Decoding: The Decode a sequence of the Huffman codes back into the original message using the Huffman tree. The Time complexity: O(n) where n is the length of the encoded message.
Compression: The Encode a message using the generated Huffman codes. The Space complexity: The Depends on the efficiency of the Huffman tree typically close to the entropy of the message.
Decompression: The Decode a compressed message back into the original message. The Space complexity: Depends on the size of the compressed message and efficiency of the Huffman tree.

 * 
*/

// Java Program to Implement
// Huffman Coding
import java.util.PriorityQueue;
import java.util.HashMap;

// Class representing a node in the Huffman Tree
import java.util.*;

class HuffmanNode {
    char data;
    int frequency;
    HuffmanNode left, right;

    HuffmanNode(char data, int frequency) {
        this.data = data;
        this.frequency = frequency;
        left = right = null;
    }
    @Override
    public String toString() {
        return "'" + data + "'(" + frequency + ")";
    }

}

public class HuffmanCoding {
    public static void main(String[] args) {

       // String message = "Huffman coding is a lossless data compression algorithm.";
       String message = "Amar nath"; 
       System.out.println("Message: " + message);

        // Step 1: Build frequency map
        HashMap<Character, Integer> frequencyMap = new HashMap<>();
        for (char c : message.toCharArray()) {
            frequencyMap.put(c, frequencyMap.getOrDefault(c, 0) + 1);
        }
        System.out.println("\nFrequency Map: " + frequencyMap);

        // Step 2: Create priority queue (min-heap)
        PriorityQueue<HuffmanNode> priorityQueue =
            new PriorityQueue<>((a, b) -> a.frequency - b.frequency);

        for (char c : frequencyMap.keySet()) {
            HuffmanNode node = new HuffmanNode(c, frequencyMap.get(c));
            priorityQueue.add(node);
            System.out.println("Added to PQ: '" + c + "' freq=" + frequencyMap.get(c));
        }
        System.out.println("priorityQueue="+priorityQueue);
        // Step 3: Build Huffman tree
        System.out.println("\nBuilding Huffman Tree...");
        while (priorityQueue.size() > 1) {
            HuffmanNode left = priorityQueue.poll();
            HuffmanNode right = priorityQueue.poll();

            System.out.println("Picked nodes: '" + left.data + "' (" + left.frequency +
                ") and '" + right.data + "' (" + right.frequency + ")");

            HuffmanNode newNode =
                new HuffmanNode('$', left.frequency + right.frequency);

            newNode.left = left;
            newNode.right = right;

            System.out.println("Created internal node freq=" + newNode.frequency);
            priorityQueue.add(newNode);
        }

        HuffmanNode root = priorityQueue.poll();
        System.out.println("\nTree built. Now printing Huffman Codes:\n");

        // Step 4: Print codes
        printCodes(root, new StringBuilder());
    }

    public static void printCodes(HuffmanNode root, StringBuilder code) {
        if (root == null) return;

        if (root.data != '$') {
            System.out.println("'" + root.data + "' : " + code);
        }

        if (root.left != null) {
            code.append('0');
            printCodes(root.left, code);
            code.deleteCharAt(code.length() - 1);
        }

        if (root.right != null) {
            code.append('1');
            printCodes(root.right, code);
            code.deleteCharAt(code.length() - 1);
        }
    }
}

/* 
// copied from google doc
class HuffmanNode {
    char data;
    int frequency;
    HuffmanNode left, right;

    HuffmanNode(char data, int frequency) {
        this.data = data;
        this.frequency = frequency;
        left = right = null;
    }
}

public class HuffmanCoding {
    public static void main(String[] args) {
        String message = "Huffman coding is a lossless data compression algorithm.";
        HashMap<Character, Integer> frequencyMap = new HashMap<>();

        for (char c : message.toCharArray()) {
            frequencyMap.put(c, frequencyMap.getOrDefault(c, 0) + 1);
        }
        PriorityQueue<HuffmanNode> priorityQueue = new PriorityQueue<>((a, b) -> a.frequency - b.frequency);
        for (char c : frequencyMap.keySet()) {
            priorityQueue.add(new HuffmanNode(c, frequencyMap.get(c)));
        }
        while (priorityQueue.size() > 1) {
            HuffmanNode left = priorityQueue.poll();
            HuffmanNode right = priorityQueue.poll();
            HuffmanNode newNode = new HuffmanNode('$', left.frequency + right.frequency);
            newNode.left = left;
            newNode.right = right;
            priorityQueue.add(newNode);
        }
        HuffmanNode root = priorityQueue.poll();

        printCodes(root, new StringBuilder());
    }

    public static void printCodes(HuffmanNode root, StringBuilder code) {
        if (root == null)
            return;
        if (root.data != '$') {
            System.out.println(root.data + " : " + code);
        }
        if (root.left != null) {
            printCodes(root.left, code.append('0'));
            code.deleteCharAt(code.length() - 1);
        }
        if (root.right != null) {
            printCodes(root.right, code.append('1'));
            code.deleteCharAt(code.length() - 1);
        }
    }
}
*/