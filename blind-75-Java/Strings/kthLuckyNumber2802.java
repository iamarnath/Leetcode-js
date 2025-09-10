/*
 * 2802. Find The K-th Lucky Number
Description
We know that 4 and 7 are lucky digits. Also, a number is called lucky if it contains only lucky digits.

You are given an integer k, return the kth lucky number represented as a string.

 

Example 1:

Input: k = 4
Output: "47"
Explanation: The first lucky number is 4, the second one is 7, the third one is 44 and the fourth one is 47.
Example 2:

Input: k = 10
Output: "477"
Explanation: Here are lucky numbers sorted in increasing order:
4, 7, 44, 47, 74, 77, 444, 447, 474, 477. So the 10th lucky number is 477.
Example 3:

Input: k = 1000
Output: "777747447"
Explanation: It can be shown that the 1000th lucky number is 777747447.
 

Constraints:

1 <= k <= 109
 * 
*/
/*
 According to the problem description, a lucky number only
  contains the digits 4 and 7, so the number of n-digit lucky numbers is 
2^n.
We initialize 
n=1, then loop to check whether k is greater than 2^n.
 If it is, we subtract 2^n from k and increment n
, until k is less than or equal to 2^n. At this point, 
we just need to find the 
k-th lucky number among the n-digit lucky numbers.

If kis less than or equal to 2^n-1, then the first digit of the 
k-th lucky number is 4, otherwise the first digit is 7
. Then we subtract 2^n-1 from k
 and continue to determine the second digit, until all digits of the 
n-digit lucky number are determined.

The time complexity is O(logk),
 and the 
space complexity is O(logk)

 
*/
/*
Step 1: Lucky number structure
Lucky numbers are binary-like strings where:
"4" represents 0
"7" represents 1
So:
Length 1 lucky numbers → "4", "7" → 2 numbers
Length 2 lucky numbers → "44", "47", "74", "77" → 4 numbers
Length 3 lucky numbers → 8 numbers, and so on.

That means:
For length n, there are 2^n lucky numbers.

 */
/*
 Suppose k = 10.

Find length:

length=1 → 2 numbers, k=10-2=8
length=2 → 4 numbers, k=8-4=4
Now n=3, so number has length 3.
Build number:
n=3, k=4
Compare with 2^2=4 → k=4 <= 4 → append '4'
n=2, k=4
Compare with 2^1=2 → k=4 > 2 → append '7', subtract k=4-2=2
n=1, k=2
Compare with 2^0=1 → k=2 > 1 → append '7', subtract k=2-1=1
Final number = "477" 
 
*/
package Strings;

public class kthLuckyNumber2802 {
    public String kthLuckyNumber(int k){
        int n=1;
        //1 << n means 2^n.
        //We are finding which length n the k-th lucky number belongs to.
        //Process:
// Start with length = 1 (n=1).
// If k is greater than 2^n, subtract those numbers and move to next length.
// Example: If k=10,
// length 1 has 2 numbers, subtract → k=8.
// length 2 has 4 numbers, subtract → k=4.
// So the number is in length 3 block.
// After the loop, we know the length n of the lucky number and
// the adjusted index k inside that block.
        while(k> 1<<n){
            System.out.println("k (" + k + ") > " + (1 << n) + " (1 << " + n + "), subtracting...");
            k -= 1<<n;
            System.out.println("After subtraction, k: " + k + ", increasing n");

            ++n;
        }
        System.out.println("Final n (number of digits): " + n + ", k: " + k);
        StringBuilder ans = new StringBuilder();
        //This part decodes k into binary digits of length n:
        //If k is in the first half (k <= 2^n), we put '4'.
        // If in the second half (k > 2^n), we put '7' and 
        //shift k into the right half by subtracting 2^n.
        // This is essentially saying:
        // '4' corresponds to binary 0
        // '7' corresponds to binary 1
        // So it builds the lucky number bit by bit.
        while(n-- >0){
            System.out.println("n: " + (n+1) + ", k: " + k + ", 1<<" + n + " = " + (1 << n));
            if(k <= 1<<n){
                ans.append('4');
                System.out.println("k <= " + (1<<n) + ": Appending '4'");
            }
            else{
                ans.append('7');
                k -= 1<<n;
                System.out.println("k > " + (1<<n) + ": Appending '7', new k: " + k);

            }
        }
        System.out.println("Final lucky number: " + ans.toString());
        return ans.toString();
    }

    public String kthLuckyNumberOptimized(int k) {
        k++;
        String binary = Integer.toBinaryString(k);
        System.out.println(binary);
        String binaryNew = binary.substring(1);
        System.out.println(binaryNew);
        String res = binaryNew.replace('0', '4').replace('1', '7');
        return res;
    }
    public static void main(String[] args){
        kthLuckyNumber2802 sol = new kthLuckyNumber2802();
        String res = sol.kthLuckyNumberOptimized(10);
        System.out.println(res);
    }
}


/*
 function kthLuckyNumberOptimized(k) {
    k++;  // increment
    let binary = k.toString(2);  // convert to binary string
    console.log("binary:", binary);

    let binaryNew = binary.substring(1);  // drop the leading '1'
    console.log("binaryNew:", binaryNew);

    let res = binaryNew.replace(/0/g, '4').replace(/1/g, '7');  
    return res;
}

// Test
console.log(kthLuckyNumberOptimized(10));

  
*/