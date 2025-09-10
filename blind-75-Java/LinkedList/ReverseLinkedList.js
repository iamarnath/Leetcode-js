/*
Description
Given the beginning of a singly linked list head, reverse the list, and return the new beginning of the list.

Example 1:

Input: head = [0,1,2,3]

Output: [3,2,1,0]
Example 2:

Input: head = []

Output: []
Constraints:

0 <= The length of the list <= 1000.
-1000 <= Node.val <= 1000

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

function reverseList(head) {
/*
prev will keep track of the previous node
 as we reverse the list. Initially, it's null
  because the new tail's next will be null.

curr points to the current node we're processing,
 starting at the head of the list.

*/

    let prev = null;
    let curr = head;
    
    while (curr) {
        let temp = curr.next; // Save the next node
        curr.next = prev; // Reverse the link: current node points to previous node
        prev = curr; // Move prev forward to current node
        curr = temp; // Move curr forward to next node (saved earlier)
    }
    console.log("prev==",prev);
    return prev;
}
/*
Step 1: Save curr.next in temp because once we reverse the link,
 we lose the original next node.

Step 2: Reverse the pointer of the current node 
by setting curr.next to prev.

Step 3: Move prev forward to the current node 
(since it will become the previous node for the next iteration).

Step 4: Move curr forward to the next node (temp) to continue 
reversing.

When curr becomes null, it means we've reached the end of the original list.

At this point, prev points to the new head of the reversed list.

Return prev.

*/
headArr = [0, 1, 2, 3];
const head = createLinkedList(headArr);
//console.log("head==", head)
reverseList(head)

/*
Suppose the list is:

text
head -> 1 -> 2 -> 3 -> null
Initially:

prev = null

curr = 1

Iteration 1:

temp = 2 (save next node)

curr.next = prev → 1.next = null (reverse link)

prev = 1

curr = 2

List now looks like:
1 -> null and 2 -> 3 -> null (remaining)

Iteration 2:

temp = 3

curr.next = prev → 2.next = 1

prev = 2

curr = 3

List now looks like:
2 -> 1 -> null and 3 -> null

Iteration 3:

temp = null

curr.next = prev → 3.next = 2

prev = 3

curr = null

List now looks like:
3 -> 2 -> 1 -> null

*/