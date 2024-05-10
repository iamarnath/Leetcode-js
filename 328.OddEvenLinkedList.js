/*
328. Odd Even Linked List

Solution -https://leetcode.com/problems/odd-even-linked-list/solutions/5131259/optimised/

Description
Given the head of a singly linked list, group all the nodes with odd indices together followed by the nodes with even indices, and return the reordered list.

The first node is considered odd, and the second node is even, and so on.

Note that the relative order inside both the even and odd groups should remain as it was in the input.

You must solve the problem in O(1) extra space complexity and O(n) time complexity.

Example 1:

Input: head = [1,2,3,4,5]
Output: [1,3,5,2,4]
Example 2:

Input: head = [2,1,3,5,6,4,7]
Output: [2,3,6,7,1,5,4]
 
Constraints:

The number of nodes in the linked list is in the range [0, 104].
-106 <= Node.val <= 106

*/

/*

Approach:
The oddEvenList function takes a singly linked list as input and rearranges the nodes such that all odd-positioned nodes are grouped together, followed by all even-positioned nodes.
It uses two pointers, oddPointer and evenPointer, to traverse the linked list and reorganize the nodes.
The function iterates through the linked list, moving odd-positioned nodes to one group and even-positioned nodes to another group.
It then merges the odd and even groups by connecting the last odd node to the head of the even group.
Time Complexity:
The time complexity of the oddEvenList function is O(N), where N is the number of nodes in the linked list.
The function iterates through the linked list once, visiting each node exactly once.
The operations performed within the loop, such as moving odd and even nodes, take constant time per node.
Therefore, the overall time complexity is linear, O(N), as the function's running time is proportional to the size of the input (the number of nodes in the linked list).
Space Complexity:
The space complexity of the oddEvenList function is O(1), constant extra space.
The function does not create any new nodes or use additional data structures that grow with the input size.
It only uses a few pointers (oddPointer, evenPointer, and even) to rearrange the nodes, which do not depend on the input size.
Therefore, the space complexity is constant, O(1), as the space required remains the same regardless of the input size.

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
var oddEvenList = function (head) {
    if (!head) {
        return head;
    }
    let odd = head;
    let even = head.next;
    let evenHead = even;
    while (even && even.next) {
        odd.next = odd.next.next;// Link next odd node.
        odd = odd.next; // Move odd pointer to the next node.
        even.next = even.next.next; // Link next even node.
        even = even.next;// Move even pointer to the next node.
    }
    // Attach the even list to the end of the odd list.
    odd.next = evenHead;
    return head;
};

let head = [1, 2, 3, 4, 5]
const head2 = createLinkedList(head);

console.log(oddEvenList(head2));