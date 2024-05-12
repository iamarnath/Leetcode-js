/*
1019. Next Greater Node In Linked List

Solution - https://leetcode.com/problems/next-greater-node-in-linked-list/solutions/5148418/optimised/

Description
You are given the head of a linked list with n nodes.

For each node in the list, find the value of the next greater node. That is, for each node, find the value of the first node that is next to it and has a strictly larger value than it.

Return an integer array answer where answer[i] is the value of the next greater node of the ith node (1-indexed). If the ith node does not have a next greater node, set answer[i] = 0.

Example 1:

Input: head = [2,1,5]
Output: [5,5,0]
Example 2:

Input: head = [2,7,4,3,5]
Output: [7,0,5,5,0]
 
Constraints:

The number of nodes in the list is n.
1 <= n <= 104
1 <= Node.val <= 109

*/

/*

Approach:
The nextLargerNodes function takes the head of a linked list as input and returns an array of the next larger values for each node in the list.
It first converts the linked list into an array valuesArr by iterating through the list and storing the values of each node.
Then, it initializes an empty stack stak and an array nextLargerValues of the same length as valuesArr, filled with zeros.
The function iterates through valuesArr from right to left, starting from the last element.
For each element, it pops elements from the stack that are less than or equal to the current element.
If the stack is not empty after popping, the top element represents the next larger value for the current element, and it is stored in nextLargerValues.
Finally, the current element is pushed onto the stack.
After processing all elements, the nextLargerValues array is returned.
Time Complexity:
The time complexity of the nextLargerNodes function is 

O(n), where 

n is the number of nodes in the linked list.
Converting the linked list to an array takes 

O(n) time.
The main loop iterates through the array once from right to left, and each element is pushed and popped from the stack at most once, resulting in 

O(n) time complexity.

Space Complexity:

The space complexity of the function is 

O(n), where 

n is the number of nodes in the linked list.
The function creates an array valuesArr to store the values of the linked list nodes, which requires 

O(n) space.
The stack stak can hold at most 
n elements, as each element is pushed and popped at most once, resulting in 

O(n) space complexity.
The nextLargerValues array is also created with a length of 

n to store the next larger values for each node.

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

var nextLargerNodes = function (head) {
    let valuesArr = [];
    while (head != null) {
        valuesArr.push(head.val);
        head = head.next;
    }
    const stak = [];
    // Initialize an array to hold the answer.
    const len = valuesArr.length;
    const nextLargerValues = new Array(len).fill(0);

    for (let i = len - 1; i >= 0; i--) {
        console.log("stack initial--", stak, i, valuesArr[i]);
        // Pop elements from the stack that are less than or equal to the current value.
        while (stak.length > 0 && stak[stak.length - 1] <= valuesArr[i]) {
            stak.pop();
        }
        // If stack is not empty, the top will be the next larger value.
        nextLargerValues[i] = stak.length > 0 ? stak[stak.length - 1] : 0;
        stak.push(valuesArr[i]);
        console.log("stack final--", stak);
    }
    return nextLargerValues;
}

head = [2, 1, 5];
head = [2, 7, 4, 3, 5]
const list2 = createLinkedList(head);

console.log(nextLargerNodes(list2));