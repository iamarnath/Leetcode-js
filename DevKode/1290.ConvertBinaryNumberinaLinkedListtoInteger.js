/*
1290. Convert Binary Number in a Linked List to Integer

Solution - https://leetcode.com/problems/convert-binary-number-in-a-linked-list-to-integer/solutions/5131117/optimised/

Description
Given head which is a reference node to a singly-linked list. The value of each node in the linked list is either 0 or 1. The linked list holds the binary representation of a number.

Return the decimal value of the number in the linked list.

The most significant bit is at the head of the linked list.
Example 1:

Input: head = [1,0,1]
Output: 5
Explanation: (101) in base 2 = (5) in base 10
Example 2:

Input: head = [0]
Output: 0

Constraints:

The Linked List is not empty.
Number of nodes will not exceed 30.
Each node's value is either 0 or 1.
*/

/*
In the line ans = (ans << 1) | head.val;, the code is performing a bitwise left shift operation followed by a bitwise OR operation. Let's break down this line of code step by step:
Bitwise Left Shift (<< 1):
ans << 1 shifts the binary representation of ans to the left by 1 position.
This operation effectively multiplies ans by 2, as shifting left by 1 is equivalent to multiplying by 2 in binary representation.
For example, if ans is 5 (binary 101), ans << 1 would result in 10 (binary 1010), which is 10 in decimal.
Bitwise OR (| head.val):
| head.val performs a bitwise OR operation between the result of the left shift (ans << 1) and the binary representation of head.val.
The OR operation sets a bit in the result if it is set in either of the operands.
This operation effectively adds the binary value of head.val to the shifted ans.
Combining Shift and OR:
By combining the left shift and OR operations, the line ans = (ans << 1) | head.val; effectively appends the binary representation of head.val to the left of the binary representation of ans.
This process is commonly used in binary operations to build up a binary number by shifting existing bits and adding new bits.
Overall Effect:
The line of code is updating the ans variable by shifting its current value to the left by 1 bit and then adding the binary value of head.val to the rightmost bit.
This operation is typically used in scenarios where binary manipulation is required, such as converting binary numbers represented in linked lists to decimal values.
In summary, the line ans = (ans << 1) | head.val; efficiently combines bitwise left shift and OR operations to build up a binary number by appending the binary value of head.val to the existing binary value stored in ans.


Approach:
The function initializes a variable ans to 0, which will store the final decimal value.
It then enters a while loop that continues as long as the head of the linked list is not null.
Inside the loop, the function performs the following steps:
It shifts the current ans value to the left by 1 bit using the bitwise left shift operator <<1. This effectively multiplies ans by 2.
It then performs a bitwise OR operation | head.val to append the value of the current node (head.val) to the rightmost bit of the shifted ans value.
It moves to the next node in the linked list by updating head = head.next.
After the loop completes, the function returns the final ans value, which represents the decimal value of the binary numbers in the linked list.
Time Complexity:
The time complexity of the getDecimalValue function is O(N), where N is the number of nodes in the linked list.
The function iterates through the entire linked list once, visiting each node exactly once.
The operations performed within the loop (bitwise shift and OR) take constant time.
Therefore, the overall time complexity is linear, O(N), as the function's running time is proportional to the size of the input (the number of nodes in the linked list).
Space Complexity:
The space complexity of the getDecimalValue function is O(1), which means it uses a constant amount of extra space.
The function only uses a single variable ans to store the intermediate and final decimal value.
The space required does not depend on the size of the input (the number of nodes in the linked list).
Therefore, the space complexity is constant, O(1).


*/
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

function createLinkedList(arr) {
    if (arr.length === 0) {
        return null;
    }

    let head = new ListNode(arr[0]);
    let current = head;

    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

function getDecimalValue(head) {
    let ans = 0;
    // Traverse the linked list starting from the head until the end.
    while (head !== null) {

        //ans = (ans <<1) | head.val;
        ans = ans * 2 + head.val;
        head = head.next;
    }
    return ans;
}

let head = [1, 1, 1]
const head2 = createLinkedList(head);

console.log(getDecimalValue(head2));