/*
Description
You are given an array of k linked lists lists,
 where each list is sorted in ascending order.

Return the sorted linked list that is the result
 of merging all of the individual linked lists.

Example 1:

Input: lists = [[1,2,4],[1,3,5],[3,6]]

Output: [1,1,2,3,3,4,5,6]
Example 2:

Input: lists = []

Output: []
Example 3:

Input: lists = [[]]

Output: []
Constraints:

0 <= lists.length <= 1000
0 <= lists[i].length <= 100
-1000 <= lists[i][j] <= 1000

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
//This function merges two sorted linked lists 
// (list1 and list2) into one sorted list.
/*
Uses a dummy node to simplify the merging process.
Iterates through both lists, always attaching the
 smaller node to the merged list.
After one list is exhausted, appends the remaining nodes of the other list.
Returns the merged sorted list.
*/
function conquer(list1, list2) {
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
/*
Uses recursion to split the array of lists into halves.
Base cases handle when there are no lists or just one list.
After dividing, merges the two halves using the conquer function.

*/

function divide(lists, left, right) {
    if (left > right) {
        return null;
    }
    if (left === right) {
        return lists[left];
    }
    const mid = Math.floor(left + (right - left) / 2);
    const l = divide(lists, left, mid);
    const r = divide(lists, mid + 1, right);
    return conquer(l, r);
}

function mergeKLists(lists) {
    if (!lists || lists.length === 0) {
        return null;
    }
    return divide(lists, 0, lists.length - 1);
}
/*
mergeKLists starts the process.

divide splits the list of linked lists into smaller parts
 until it reaches individual lists.

conquer merges two sorted lists into one sorted list.

The recursion and merging continue until all lists are
 merged into one sorted linked list.

*/
lists = [[1, 2, 4], [1, 3, 5], [3, 6]];
//headArr = [2, 4, 6, 8];

const l1 = createLinkedList(lists[0]);
const l2 = createLinkedList(lists[1]);
const l3 = createLinkedList(lists[2]);

//console.log("head==", head)
let res = mergeKLists([l1, l2, l3])

console.log("res==",res)

/*
Time Complexity
Each merge operation takes O(n) time where n is the total 
number of nodes in the two lists being merged.

The divide and conquer approach merges pairs of lists
 in log k rounds (where k is the number of lists).

Overall time complexity: O(N log k), where N is the
 total number of nodes across all lists.


 
Great question! Let's analyze the space complexity of the provided merge k sorted lists code.

Space Complexity Analysis
1. Auxiliary Space for Merging Two Lists (conquer function)
The conquer function merges two linked lists in-place by rearranging pointers.

It uses a few constant extra variables (dummy, node, tmp variables).

No new nodes or arrays are created, so the space complexity here is O(1) (constant space).

2. Recursive Calls in divide Function
The divide function uses recursion to split the array of lists.

The recursion depth depends on the number of lists k.

Since the function splits the range [left, right] in half each time,
 the recursion depth is approximately:

log 2 k
Each recursive call uses some stack space (for local variables and call overhead).

3. Total Space Complexity
The dominant space usage comes from the recursion stack.

Each recursive call uses O(1) space, but there are O(log k) recursive calls stacked at once.

Therefore, the total auxiliary space complexity is:

*/