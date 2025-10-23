/*

25. Reverse Nodes in k-Group

Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.

k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is.

You may not alter the values in the list's nodes, only nodes themselves may be changed.

 

Example 1:


Input: head = [1,2,3,4,5], k = 2
Output: [2,1,4,3,5]
Example 2:


Input: head = [1,2,3,4,5], k = 3
Output: [3,2,1,4,5]
 

Constraints:

The number of nodes in the list is n.
1 <= k <= n <= 5000
0 <= Node.val <= 1000
 

Follow-up: Can you solve the problem in O(1) extra memory space?
*/

/*
Here is a detailed line-by-line explanation of the provided reverseKGroup implementation in JavaScript:

javascript
var reverseKGroup = function(head, k) {
Defines the main function that will take the head of a linked list and an integer group size k as input.

javascript
    function getLength(head) {
        let length = 0;
        let temp = head;
        while (temp) {
            temp = temp.next;
            length++;
        }
        return length;
    }
Helper function: getLength finds how many nodes are in the list by moving from node to node and counting until the end (temp = null).

Returns the total length so you can check if a group of size k can be reversed.

javascript
    function reverseGroup(head, k, length) {
        if (length < k) return head;
Helper function: reverseGroup reverses the next k nodes if there are at least k left; otherwise, leaves the rest unchanged.

javascript
        let count = 0;
        let prev = null, curr = head, next = null;
        while (count < k && curr) {
            next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
            count++;
        }
Standard reversal for k nodes:

prev holds the previous node in the reversed segment (starts as null)

curr keeps track of current node (starts as the head)

next stores the rest temporarily so no node is lost

The while loop runs k times, reversing the direction of .next for each node in the group.

javascript
        if (next) {
            head.next = reverseGroup(next, k, length - k);
        }
Recursion: If there's more list after this group (next != null), call the function again for the next group with one less set (length - k). The current group's old head (now its tail) is attached to the next group's result.

javascript
        return prev;
    }
Returns the new head after reversal for the group.

javascript
    let length = getLength(head);
    return reverseGroup(head, k, length);
};
First, calculate the entire list's length.

Finally, reverse groups of size k recursively, starting from the original head.

Summary of Each Step
Get length: Counts the size of the list.

Reverse in groups: For each chunk of size k, reverse the segment's nodes; connect the end to the next reversed chunk (or to the rest if too short).

Recursion: Ensures all segments of size k are reversed throughout the list.

Return: Returns the new head after all reversals.

This implementation efficiently breaks the problem into clear sub-tasks: finding the length, reversing k nodes, and chaining results recursively.
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/*
Time Complexity: O(n)
The algorithm visits every node of the linked list exactly once for reversal, and in the wrapper version it may also do a single pass to count the length.

Each node changes its .next pointer once per reversal, so the total amount of work per node is constant, regardless of group size 
k
k.

Group reversal and recursion together still process every node only once, so the overall work is linear in the number of nodes.

Space Complexity: O(1)
The algorithm reverses the list in place, only using a few pointers (prev, curr, next) for tracking nodes in each group.

No extra data structures (like an array or stack) are used to store nodes or values.

Recursion in the wrapper version is tail-recursive in practice—all state is maintained using pointers, so space used does not depend on the input size.

No matter the list length, the space used is constant.

Time complexity: O(n), every node is processed once, regardless of group size k.

Space complexity: O(1), all reversal is done in-place with a fixed amount of extra variables
*/
var reverseKGroup = function(head, k) {
    // Helper to get the length of the list
    function getLength(head) {
        let length = 0;
        let temp = head;
        while (temp) {
            temp = temp.next;
            length++;
        }
        return length;
    }

    // Helper to reverse k nodes
    function reverseGroup(head, k, length) {
        if (length < k) return head;

        let count = 0;
        let prev = null, curr = head, next = null;

        while (count < k && curr) {
            next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
            count++;
        }

        if (next) {
            head.next = reverseGroup(next, k, length - k);
        }
        return prev;
    }

    let length = getLength(head);
    return reverseGroup(head, k, length);
};