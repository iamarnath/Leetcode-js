/*
21. Merge Two Sorted Lists

Solution -https://leetcode.com/problems/merge-two-sorted-lists/solutions/5115156/optimised/

You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

Example 1:

Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
Example 2:

Input: list1 = [], list2 = []
Output: []
Example 3:

Input: list1 = [], list2 = [0]
Output: [0]
 

Constraints:

The number of nodes in both lists is in the range [0, 50].
-100 <= Node.val <= 100
Both list1 and list2 are sorted in non-decreasing order.
*/

/*

The approach is based on the following steps:
Base Case: If either list1 or list2 is null, it means that one of the lists is empty. In this case, the function returns the other list, as there's nothing to merge.
Compare and Recursively Merge: If neither list is null, the function compares the values of the heads of the two lists (list1.val and list2.val). It then recursively calls itself with the next node of the list with the smaller value and the other list.
If list1.val is less than list2.val, it means that the head of list1 should come first in the merged list. The function links the head of list1 to the result of merging the rest of list1 and list2, and returns the head of list1.
If list2.val is less than or equal to list1.val, it means that the head of list2 should come first in the merged list. The function links the head of list2 to the result of merging the rest of list1 and list2, and returns the head of list2.

Time Complexity
The time complexity of this approach is O(n + m), where n and m are the lengths of the input lists. This is because each node in both lists is visited once during the merge process.

Space Complexity
The space complexity of this approach is O(n + m) as well, due to the recursive call stack. In the worst case, the maximum depth of the recursion tree is n + m, where n and m are the lengths of the input lists.

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

var mergeTwoLists = function (list1, list2) {
    // If one of the lists is null, return the other list since there's nothing to merge
    if (!list1 || !list2) {
        return list1 || list2;
    }
    // Compare the values of the two list heads and recursively merge the rest of the lists
    if (list1.val < list2.val) {
        // If the value of the first list head is less, 
        // link that node to the result of merging the rest of the lists
        list1.next = mergeTwoLists(list1.next, list2);
        return list1;
    }
    else {
        list2.next = mergeTwoLists(list1, list2.next);
        return list2;
    }
};

/*
Space Complexity for Iterative approach

The method rearranges the existing nodes by changing their next pointers.

It does not create new nodes except for the dummy node (which is a constant space).

No additional data structures proportional to input size are used.

Therefore, the space complexity is:
O(1) = Only a few pointers and dummy node used, no extra space proportional to input

*/

function mergeTwoListsIterative(list1, list2) {
    const dummy = { val: 0, next: null };
    let node = dummy;
    while (list1 && list2) {
        if (list1.val < list2.val) {
            node.next = list1;
            list1 = list1.next;
        }
        else {
            node.next = list2;
            list2 = list2.next;
        }
        node = node.next;
    }
    if (list1) {
        node.next = list1;
    }
    else {
        node.next = list2;
    }
    return dummy.next;
}

//Output: [1,1,2,3,4,4]

list1Arr = [1, 2, 4], list2Arr = [1, 3, 4]
const list1 = createLinkedList(list1Arr);
const list2 = createLinkedList(list2Arr);

console.log(mergeTwoLists(list1, list2));

//console.log(mergeTwoListsIterative(list1, list2));