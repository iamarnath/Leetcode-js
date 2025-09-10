/*

19. Remove Nth Node From End of List

You are given the beginning of a linked list head, and an integer n.

Remove the nth node from the end of the list and return the beginning of the list.

Example 1:

Input: head = [1,2,3,4], n = 2

Output: [1,2,4]
Example 2:

Input: head = [5], n = 1

Output: []
Example 3:

Input: head = [1,2], n = 2

Output: [2]
Constraints:

The number of nodes in the list is sz.
1 <= sz <= 30
0 <= Node.val <= 100
1 <= n <= sz

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

function removeNthFromEnd(head, n) {
    let dummy = new ListNode(0, head);
    let left = dummy;
    let right = head;
    while (n > 0) {
        right = right.next;
        n--
    }
        // Move both pointers until the fast pointer reaches the end of the list

    while(right !=null){
        left=left.next;
        right= right.next;
    }
    left.next = left.next.next;
    return dummy.next;
}

let headArr = [1,2,3,4], n = 2;


const head = createLinkedList(headArr);
//console.log("head==", head)
console.log(removeNthFromEnd(head,n))