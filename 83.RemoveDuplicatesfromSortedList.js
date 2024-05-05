/*
83. Remove Duplicates from Sorted List

Solution - https://leetcode.com/problems/remove-duplicates-from-sorted-list/solutions/5111796/optimised/


Solution - 
Description
Given the head of a sorted linked list, delete all duplicates such that each element appears only once. Return the linked list sorted as well.

Example 1:

Input: head = [1,1,2]
Output: [1,2]
Example 2:



Input: head = [1,1,2,3,3]
Output: [1,2,3]
 

Constraints:

The number of nodes in the list is in the range [0, 300].
-100 <= Node.val <= 100
The list is guaranteed to be sorted in ascending order.
*/
/*
Approach:
The deleteDuplicates function is designed to remove duplicates from a sorted linked list by iterating through the list and adjusting the pointers to skip duplicate nodes.
It uses a single pointer currentNode to traverse the list and compare adjacent nodes to identify and remove duplicates.
When a duplicate is found, the function skips over the duplicate node by updating the next pointer of the current node.
The function continues this process until the end of the list is reached, ensuring that only unique elements remain in the linked list.
Time Complexity:
The time complexity of the deleteDuplicates function is O(n), where n is the number of nodes in the linked list.
The function iterates through each node in the list once, and in the worst-case scenario, it may visit each node once to identify and remove duplicates.
The time complexity is linear as the function processes each node in the list exactly once.
Space Complexity:
The space complexity of the deleteDuplicates function is O(1) as it uses a constant amount of extra space regardless of the input size.
The function does not create any additional data structures that grow with the input size, maintaining a constant space complexity.
It modifies the existing linked list in place without requiring additional memory allocation.
Explanation:
The function starts with the currentNode pointing to the head of the linked list.
It iterates through the list, comparing the value of the current node with the value of the next node.
If a duplicate is found (i.e., currentNode.next.val === currentNode.val), the function skips over the duplicate node by updating the next pointer of the current node.
If the values are not equal, the function moves to the next node by updating the currentNode pointer.
The loop continues until the end of the list is reached, ensuring that only unique elements remain in the linked list.
Finally, the function returns the modified head of the linked list after removing duplicates.

*/

function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

var deleteDuplicates = function(head) {
    let currentNode = head;
    // Loop through the list while the current node and the next node are not null
    while(currentNode &&  currentNode.next){
        // Compare the current node value with the next node value
        if(currentNode.val === currentNode.next.val){
            // If they are equal, skip the next node by pointing to node after next.
            currentNode.next = currentNode.next.next;
        }
        else{
           // If they are not equal, move to the next node
           currentNode.next = currentNode.next;
        }
    }
    console.log(head);
    return head;
};

