/*
876. Middle of the Linked List

Solution - https://leetcode.com/problems/middle-of-the-linked-list/solutions/5111206/optimised/

Description
Given the head of a singly linked list, return the middle node of the linked list.

If there are two middle nodes, return the second middle node.

 
Example 1:

Input: head = [1,2,3,4,5]
Output: [3,4,5]
Explanation: The middle node of the list is node 3.
Example 2:

Input: head = [1,2,3,4,5,6]
Output: [4,5,6]
Explanation: Since the list has two middle nodes with values 3 and 4, we return the second one.
 

Constraints:

The number of nodes in the list is in the range [1, 100].
1 <= Node.val <= 100
*/

/**
 * Definition for singly-linked list.

 */
/*
Time Complexity
The time complexity of the middleNode function is O(N), where N is the number of nodes in the linked list.
Both pointers traverse the linked list at different speeds, with the fastPointer moving twice as fast as the slowPointer.
The fastPointer will reach the end of the linked list after N/2 iterations, and the slowPointer will be at the middle node.
Therefore, the function requires a single pass through the linked list, resulting in a linear time complexity.

Space complexity

The space complexity of the middleNode function is O(1).
The function uses only a constant amount of extra space regardless of the size of the linked list.
It maintains two pointers (fastPointer and slowPointer) to traverse the linked list, but the space used remains constant.
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

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function(head) {
    let fastPointer = head; // Pointer that will move two steps at a time
    let slowPointer = head; // Pointer that will move one step at a time
    while (fastPointer != null && fastPointer.next != null) {
        fastPointer = fastPointer.next.next;
        slowPointer = slowPointer.next;
    }
    return slowPointer;
};
let headArr = [1,2,3,4,5];
let head = createLinkedList(headArr);
console.log(middleNode(head));