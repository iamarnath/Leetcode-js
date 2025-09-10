/*
 * Flipping a Bitmap Horizontally with Unaligned Row Widths
When each row of a bitmap is not byte-aligned (e.g., 10 bits per row), flipping the bitmap horizontally is more complex than the byte-aligned case. Here’s how to approach and implement the solution.
Problem Overview
•	Byte-aligned case: Each row is a multiple of 8 bits (e.g., 8, 16, 24 bits). Flipping is straightforward: reverse the order of bytes, and reverse bits within each byte.
•	Unaligned case: Each row has a width not divisible by 8 (e.g., 10 bits). Bits for a row may span across byte boundaries, so you cannot simply reverse bytes.
Key Steps for Unaligned Bitmap Horizontal Flip
1.	Process Each Row Individually:
o	For each row, extract the exact number of bits (e.g., 10 bits).
o	Reverse the order of these bits.
o	Write the reversed bits back to the correct position in the output bitmap.
2.	Bit Extraction and Placement:
o	Use bitwise operations to extract individual bits from the source.
o	Place each bit in the reversed position in the destination.
3.	Handle Bit Packing:
o	Since rows are not byte-aligned, you must carefully manage bit offsets when reading and writing.
o	This may involve reading across byte boundaries and writing partial bytes.
Example: Flipping a 10-Bit Row
Suppose a row is represented as:
10000100 10 (where the last two bits are in the next byte).
•	Extract bits: [^2_1][^2_1][^2_1]
•	Reverse: [^2_1][^2_1][^2_1]
•	Pack back: Write these bits back into the output buffer, handling byte boundaries.
Pseudocode
void flipBitmapHorizontally(byte[] src, byte[] dst, int width, int height) {
    for (int row = 0; row < height; row++) {
        for (int i = 0; i < width; i++) {
            // Get bit at position i in this row
            int srcBitIndex = row * width + i;
            int bit = (src[srcBitIndex / 8] >> (7 - (srcBitIndex % 8))) & 1;

            // Place it at the mirrored position in the row
            int dstBitIndex = row * width + (width - 1 - i);
            if (bit == 1)
                dst[dstBitIndex / 8] |= (1 << (7 - (dstBitIndex % 8)));
            else
                dst[dstBitIndex / 8] &= ~(1 << (7 - (dstBitIndex % 8)));
        }
    }
}

•	This code works for any row width, including those not divisible by 8.
Optimization Tips
•	For performance, you can process full bytes when possible, but for unaligned widths, you must handle the edge bits individually.
•	Lookup tables can be used to reverse bits in a byte, but you still need to manage bit offsets for unaligned rows[3].
References
•	Efficient bit reversal and handling of non-byte-aligned bit arrays are discussed in detail in programming forums and Q&A sites[3].
Summary Table
Row Width	Flipping Approach	Complexity
Byte-aligned (8, 16, ...)	Reverse bytes, reverse bits in each byte	Simple, fast
Unaligned (e.g., 10)	Extract bits, reverse, repack	More complex, O(n)

In interviews, clearly explain your approach to bit extraction and placement, and mention edge cases with partial bytes. This demonstrates both your understanding and your ability to generalize solutions beyond the simple case.
⁂
 
LeetCode-Style Question: Flip Bitmap Horizontally (Unaligned Width)
Problem Description
You are given a bitmap represented as a one-dimensional byte array bitmap that encodes a 2D binary image of dimensions height x width bits. Each row contains exactly width bits, but the width may not be a multiple of 8 (i.e., the bitmap rows are not byte-aligned). Your task is to write a function that flips the bitmap horizontally, meaning each row's bits are reversed in order.
Input
•	byte[] bitmap: The input bitmap storing bits row-wise.
•	int width: The number of bits in each row.
•	int height: The number of rows in the bitmap.
Output
•	A new byte array representing the horizontally flipped bitmap with the same dimensions.
Constraints
•	1 <= width, height <= 10^4
•	The bitmap is packed in row-major order, with bits packed from the most significant bit to the least significant bit in each byte.
•	The width may not be divisible by 8.
Example
Input:
bitmap (bits for 2 rows, width=10):
Row 0: 1000010010
Row 1: 0110100001

Output:
Row 0 flipped: 0100100001
Row 1 flipped: 1000010110


First, Understand the Image
Imagine the image as a grid made of only 0s and 1s.

Each row is a line of bits (either black or white pixels).

Given:

sql
Copy
Edit
Row 0: 1 0 0 0 0 1 0 0 1 0   (10 bits)
Row 1: 0 1 1 0 1 0 0 0 0 1
🔄 What Does "Flip Horizontally" Mean?
Just like flipping a photo left to right — the first pixel becomes last, the second becomes second-last, and so on.

It’s like this:

Original Row 0:
Original bit with index
Index:   0 1 2 3 4 5 6 7 8 9
Bits:    1 0 0 0 0 1 0 0 1 0
Flipped Row 0:
We reverse the bit positions:
bit[0] goes to bit[9]
bit[1] goes to bit[8]
...
bit[9] goes to bit[0]

So reversed:
Bits:    0 1 0 0 1 0 0 0 0 1
Index:   0 1 2 3 4 5 6 7 8 9
✅ Final Row 0 (Flipped):

0 1 0 0 1 0 0 0 0 1

 Analogy

It’s like this string:

Original: "ABCDEF"
Flipped:  "FEDCBA"
 * 
*/

package Trie;

/*
 * 
 * Flip each row of a bitmap horizontally.
The bitmap is packed into a 1D byte array, and 
each row has a given number of bits (width).
You need to:

Extract each row of bits.

Flip that row.

Write it back into a new byte array (result).

🧠 Background
A byte = 8 bits

Bits in each byte are stored from left to right, like this:

pgsql
Copy
Edit
Bit index (in byte):   7   6   5   4   3   2   1   0
Bit positions:         ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑
Bit values:            B7  B6  B5  B4  B3  B2  B1  B0
This is called MSB-first (Most Significant Bit first).

🎯 Scenario
Let’s say we have a bitmap row of 10 bits:

arduino
Copy
Edit
Row 0: 1 0 0 0 0 1 0 0 1 0
         ←--- byte 0 ---→ ←--byte 1
We need to pack this into bytes:

Step 1: Bits per byte
First 8 bits: go into byte[0]

makefile
Copy
Edit
Index:        0 1 2 3 4 5 6 7
Bits:         1 0 0 0 0 1 0 0
Remaining 2 bits: go into byte[1] (left side)

makefile
Copy
Edit
Index:        8 9
Bits:         1 0
So the byte array will look like this:

vbnet
Copy
Edit
byte[0] = 1 0 0 0 0 1 0 0   → binary: 10000100 → decimal: 132
byte[1] = 1 0 0 0 0 0 0 0   → binary: 10000000 → decimal: 128
(We pad unused bits with 0s on the right)

📦 How do we read individual bits?
Let’s say we want to access bit number 2 in the overall bitmap:
java
Copy
Edit
int bitIndex = 2;
int byteIndex = bitIndex / 8 = 0;
int bitOffset = 7 - (bitIndex % 8) = 7 - 2 = 5;
So:

The bit is in byte[0], bit position 5 (counting from left)

Then we extract using:

java
Copy
Edit
((bitmap[0] >> 5) & 1)
This gives the bit at position 5 in byte[0].

🔄 Visual Example: bitOffset Table
Let’s fill out how bitOffset maps for 10 bits:

Global bit index	byteIndex	bitIndex % 8	bitOffset	Meaning
0	0	0	7	Leftmost bit in b[0]
1	0	1	6	
2	0	2	5	
3	0	3	4	
4	0	4	3	
5	0	5	2	
6	0	6	1	
7	0	7	0	Rightmost in b[0]
8	1	0	7	Leftmost in b[1]
9	1	1	6	

This is why we use:

java
Copy
Edit
bitOffset = 7 - (bitIndex % 8)
🧠 Why do we subtract from 7?
Because:

Bit 0 in a byte is rightmost, but in bitmap, bit 0 should be leftmost

So we reverse the position

E.g., bitIndex % 8 = 0 means "1st bit in byte" → should be placed at leftmost (bit 7)

🧪 Example: Setting a Bit
Let’s say we want to set bit number 9 in the result:

java
Copy
Edit
bitIndex = 9
byteIndex = 1
bitOffset = 7 - (9 % 8) = 7 - 1 = 6
Then we write:

java
Copy
Edit
result[1] |= (1 << 6);  // Sets bit 6 of byte[1]
If we want to clear a bit:

java
Copy
Edit
result[1] &= ~(1 << 6);  // Clears bit 6 of byte[1]
✅ Summary Diagram
yaml
Copy
Edit
1D bit stream:     1 0 0 0 0 1 0 0 | 1 0
bitIndex:          0 1 2 3 4 5 6 7 | 8 9
byteIndex:         0 0 0 0 0 0 0 0 | 1 1
bitOffset in byte: 7 6 5 4 3 2 1 0 | 7 6


*/
public class BitFlipping {
    public static byte[] flipBitmapHorizontally(byte[] bitmap, int width, int height) {
        // Total number of bits in the whole image.
        // Example: 2 rows × 10 bits = 20 bits
        int totalBits = width * height;
        // Each byte can store 8 bits.
        // This formula rounds up to fit all bits.
        // E.g., 20 bits → (20 + 7)/8 = 27/8 = 3 bytes
        int totalBytes = (totalBits + 7) / 8;// Total bytes needed to store bits
        // Create an output byte array to hold the flipped image.
        byte[] result = new byte[totalBytes];
        // Go row by row (e.g., row = 0, then 1, etc.)
        for (int row = 0; row < height; row++) {
            // Read the bits for the current row
            // Create a temporary array to hold the bits of the current row.
            // E.g., for width = 10, this holds 10 bits.
            boolean[] rowBits = new boolean[width];
            // Extract bits from the bitmap into rowBits
            for (int col = 0; col < width; col++) {
                // Calculate the index of this bit in the entire bitmap.
                // Example: row 1, col 3 → bitIndex = 1 × 10 + 3 = 13
                int bitIndex = row * width + col;
                // byteIndex: which byte in the array contains this bit?
                int byteIndex = bitIndex / 8;
                // bitOffset: which bit inside that byte?
                // Remember: bits are packed from most significant bit (left)
                // So bitOffset goes 7 → 0
                int bitOffset = 7 - (bitIndex % 8);// MSB to LSB
                //Extract the bit and store it in rowBits[col]
                //This checks if that bit is 1 (true) or 0 (false)
                rowBits[col] = ((bitmap[byteIndex] >> bitOffset) & 1) == 1;
            }
            // Flip the row (reverse the bits)
            //Again go through the row, but this time we’ll write the flipped version.
            for (int col = 0; col < width; col++) {
                //Flip the index.
                //So col = 0 → 9, col = 1 → 8, and so on.
                int flippedCol = width - 1 - col;
                int bitIndex = row * width + col;
                int byteIndex = bitIndex / 8;
                //Again calculate the position in the result array where this flipped bit should go.
                int bitOffset = 7 - (bitIndex % 8);
                //This part sets the bit in the result byte array:
                // |= (1 << bitOffset): sets the bit to 1
                // &= ~(1 << bitOffset): clears the bit to 0
                //If the flipped bit is 1 → set

                // If the flipped bit is 0 → clear
                if (rowBits[flippedCol]) {
                    result[byteIndex] |= (1 << bitOffset);
                } else {
                    result[byteIndex] &= ~(1 << bitOffset);
                }
            }
        }
        return result;
    }

    public static void main(String[] args) {
        // 2 rows, 10 bits per row = 20 bits => needs 3 bytes
        byte[] bitmap = new byte[3];
        // Let's hard-code the bitmap with Row0: 1000010010, Row1: 0110100001
        // Binary bits: 10000100 10 01101000 01 => packed
        bitmap[0] = (byte) 0b10000100;// first 8 bits
        bitmap[1] = (byte) 0b10011010;// next 8 bits
        bitmap[2] = (byte) 0b00010000;// last 4 bits (padded with 0)
        byte[] flipped = BitFlipping.flipBitmapHorizontally(bitmap, 10, 2);
        // Print result bits
        for (int i = 0; i < 20; i++) {
            int byteIndex = i / 8;
            int bitOffset = 7 - (i % 8);
            System.out.println(((flipped[byteIndex] >> bitOffset) & 1));
            if ((i + 1) % 10 == 0)
                System.err.println();// new row

        }
    }
}
