/*
You are given the head of a singly linked-list.

The positions of a linked list of length = 7 for example,
 can intially be represented as:

[0, 1, 2, 3, 4, 5, 6]

Reorder the nodes of the linked list to be in the following order:

[0, 6, 1, 5, 2, 4, 3]

Notice that in the general case for a list of 
length = n the nodes are reordered to be in the following order:

[0, n-1, 1, n-2, 2, n-3, ...]

You may not modify the values in the list's nodes, but instead you must reorder the nodes themselves.

Example 1:

Input: head = [2,4,6,8]

Output: [2,8,4,6]
Example 2:

Input: head = [2,4,6,8,10]

Output: [2,10,4,8,6]
Constraints:

1 <= Length of the list <= 1000.
1 <= Node.val <= 1000

*/

function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
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
    // console.log("inside==",head)
    return head;
}

function reorderList(head) {
    if(!head || !head.next) return;
    //Step 1: Finding the Middle of the List 
    let slow = head;
    let fast = head.next;
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    //Step 2: Reversing the Second Half
    /*
    How:
    slow.next = null breaks the list into two halves.
    Use a standard linked list reversal technique:
    Store the next node temporarily.
    Redirect current node's next pointer to the previous node.
    Move prev and second pointers forward.
    After this step:
    The first half is unchanged.
    The second half is reversed.
    */
    let second = slow.next;
    slow.next = null; //slow.next = null breaks the list into two halves.
    let prev =  null;
    while (second !== null) {
        const tmp = second.next;
        second.next = prev;
        prev = second;
        second = tmp;
    }
    //After Step 2 (Reversing the second half), 
    // prev points to the head of the reversed second half of the list.

//head is the head of the first half of the list.
    //Step 3: Merging the Two Halves
    /*
    Goal: Merge the two halves by alternating nodes from the first and reversed second half.

How:

Maintain two pointers: first for the first half and second for the reversed second half.
Temporarily store the next nodes (tmp1 and tmp2) to avoid losing track.
Link first.next to second.
Link second.next to tmp1.
Move first and second forward to their respective next nodes.
This interleaves nodes from the two halves, achieving the desired reorder.
    */
    let first = head;
    second = prev; //prev points to the head of the reversed second half of the list.
    while (second !== null) {
        const tmp1 = first.next; // Save next node of first half
        const tmp2 = second.next; // Save next node of second half
        first.next = second; // Link first half node to second half node
        second.next = tmp1; // Link second half node to next node of first half
        first = tmp1; // Move forward in first half
        second = tmp2;  // Move forward in second half
    }

    return head;
}

headArr = [2,4,6,8];

const head = createLinkedList(headArr);
//console.log("head==", head)
reorderList(head)
