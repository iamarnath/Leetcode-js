/*
1721. Swapping Nodes in a Linked List

Solution - https://leetcode.com/problems/swapping-nodes-in-a-linked-list/post-solution/?submissionId=1249958608

Description
You are given the head of a linked list, and an integer k.

Return the head of the linked list after swapping the values of the kth node from the beginning and the kth node from the end (the list is 1-indexed).

Example 1:

Input: head = [1,2,3,4,5], k = 2
Output: [1,4,3,2,5]
Example 2:

Input: head = [7,9,6,6,7,8,3,0,9,5], k = 5
Output: [7,9,6,6,8,7,3,0,9,5]
 
Constraints:

The number of nodes in the list is n.
1 <= k <= n <= 105
0 <= Node.val <= 100
*/

/*
needed for testing
function createLinkedList(arr: number[]): ListNode | null {
    if (arr.length === 0) {
        return null;
    }

    let head: ListNode = new ListNode(arr[0]);
    let current: ListNode = head;

    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }

    return head;
}
*/

/*
# Approach

1. Initialization: The function swapNodes takes the head of a linked list and an integer k as input. It initializes two pointers, fast and slow, both pointing to the head of the linked list.
2. Move to kth Node: The function moves the fast pointer to the k-th node in the linked list by iterating k-1 times.
3. Find Nodes to Swap: Once the fast pointer is at the k-th node, the function moves both fast and slow pointers until fast reaches the end of the list. This ensures that slow points to the k-th node from the end.
4. Swap Nodes: If both the starting and ending nodes to swap have been found, their values are swapped.
5. Return: The function returns the head of the modified linked list after swapping the values of the starting and ending nodes.
# Complexity
- Time complexity:

The time complexity of this function is O(n), where n is the number of nodes in the linked list.
The function iterates through the linked list twice, once to find the starting node and once to find the ending node, each taking O(n) time.

- Space complexity:

The space complexity of this function is O(1).
It uses a constant amount of extra space regardless of the size of the input linked list.
The function does not use any additional data structures that grow with the input size, maintaining a constant space complexity.

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

function swapNodes(head, k) {
    let fast = head;
    let slow = head;
    // Move the 'fast' pointer to the kth node
    while (--k) {
        fast = fast ? fast.next : null;
    }
    // 'starting' points to the kth node from the beginning
    // This node will later be swapped
    //fast is already at kth node from beginning
    let starting = fast;
    // Move both 'fast' and 'slow' until 'fast' reaches the end of the list
    // 'slow' will then point to the kth node from the end
    while (fast && fast.next) {
        fast = fast.next;
        slow = slow ? slow.next : null;
    }
    // 'ending' points to the kth node from the end
    let ending = slow;
    // If both nodes to swap have been found, swap their values
    if (starting && ending) {
        let temp = starting.val;
        starting.val = ending.val;
        ending.val = temp;
    }
    return head;
}

//let headArr = [1, 2, 3, 4, 5], k = 2;

headArr = [7,9,6,6,7,8,3,0,9,5], k = 5
const head = createLinkedList(headArr);
swapNodes(head, k)