/*
Given the beginning of a linked list head, return true if
 there is a cycle in the linked list. Otherwise, return false.

There is a cycle in a linked list if at least one node in
 the list can be visited again by following the next pointer.

Internally, index determines the index of the beginning of
the cycle, if it exists. The tail node of the list will set
it's next pointer to the index-th node. If index = -1,
then the tail node points to null and no cycle exists.

Note: index is not given to you as a parameter.

Input: head = [1,2,3,4], index = 1

Output: true

Input: head = [1,2], index = -1

Output: false
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

function hasCycle(head) {
    let fast = head;
    let slow = head;
    while (fast !== null && fast.next !== null) {
        fast = fast.next.next;
        slow = slow.next;
        if (fast === slow) {
            return true;
        }
    }
    return false;
}

head = [1,2,3,4];
const list1 = createLinkedList(head);

console.log(hasCycle(list1));