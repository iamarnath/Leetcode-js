/*
232. Implement Queue using Stacks

Solution - https://leetcode.com/problems/implement-queue-using-stacks/solutions/5153343/optimised/

Description
Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty).

Implement the MyQueue class:

void push(int x) Pushes element x to the back of the queue.
int pop() Removes the element from the front of the queue and returns it.
int peek() Returns the element at the front of the queue.
boolean empty() Returns true if the queue is empty, false otherwise.
Notes:

You must use only standard operations of a stack, which means only push to top, peek/pop from top, size, and is empty operations are valid.
Depending on your language, the stack may not be supported natively. You may simulate a stack using a list or deque (double-ended queue) as long as you use only a stack's standard operations.
 

Example 1:

Input
["MyQueue", "push", "push", "peek", "pop", "empty"]
[[], [1], [2], [], [], []]
Output
[null, null, null, 1, 1, false]

Explanation
MyQueue myQueue = new MyQueue();
myQueue.push(1); // queue is: [1]
myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
myQueue.peek(); // return 1
myQueue.pop(); // return 1, queue is [2]
myQueue.empty(); // return false
 

Constraints:

1 <= x <= 9
At most 100 calls will be made to push, pop, peek, and empty.
All the calls to pop and peek are valid.
 

Follow-up: Can you implement the queue such that each operation is amortized O(1) time complexity? In other words, performing n operations will take overall O(n)
 time even if one of those operations may take longer.

*/
/*

Approach Explanation:
The code you provided implements a queue data structure using two stacks, stack1 and stack2.
 The push operation adds elements to stack1, while the pop and peek operations are performed on stack2.
The move function is used to transfer elements from stack1 to stack2 when stack2 is empty.
 This ensures that the elements are processed in the correct order, simulating a queue.
Here's how the operations work:
push(x): Adds the element x to the end of the queue by pushing it onto stack1.
pop(): Removes and returns the element from the front of the queue. If stack2 is empty, the move 
function is called to transfer elements from stack1 to stack2. Then, the top element from stack2 is
 popped and returned.
peek(): Returns the element at the front of the queue without removing it. If stack2 is empty, 
the move function is called to transfer elements from stack1 to stack2. Then, the top element from 
stack2 is returned.
empty(): Returns true if both stack1 and stack2 are empty, indicating that the queue is empty.

Time Complexity:

push(x): O(1) on average. Pushing an element to stack1 takes constant time.
pop(): O(1) amortized. If stack2 is not empty, popping from stack2 takes constant time. 
If stack2 is empty, the move function is called, which takes O(n) time to transfer elements from 
stack1 to stack2. However, this operation is performed at most once for every n pop operations, 
resulting in an amortized constant time complexity.
peek(): O(1) amortized. Similar to pop(), if stack2 is not empty, peeking from stack2 takes 
constant time. If stack2 is empty, the move function is called, which takes O(n) time to transfer
 elements from stack1 to stack2. However, this operation is performed at most once for every n peek 
 operations, resulting in an amortized constant time complexity.
empty(): O(1). Checking if both stack1 and stack2 are empty takes constant time.

Space Complexity:

The space complexity is O(n), where n is the number of elements in the queue. 
In the worst case, all elements are stored in one of the stacks, either stack1 or stack2, 
depending on the sequence of operations.

*/


var MyQueue = function() {
    this.stack1=[];
    this.stack2=[];
};
MyQueue.prototype.move = function() {
   if (this.stack2.length === 0) {
       while (this.stack1.length !== 0) {
           this.stack2.push(this.stack1.pop());
       }
   }
};
/** 
* @param {number} x
* @return {void}
*/
MyQueue.prototype.push = function(x) {
       this.stack1.push(x)
};

/**
* @return {number}
*/
MyQueue.prototype.pop = function() {
   this.move();
   return this.stack2.pop();
};

/**
* @return {number}
*/
MyQueue.prototype.peek = function() {
   this.move();
   return this.stack2[this.stack2.length-1]
};

/**
* @return {boolean}
*/
MyQueue.prototype.empty = function() {
       return this.stack1.length ===0 && this.stack2.length===0;
};

/** 
* Your MyQueue object will be instantiated and called as such:
* var obj = new MyQueue()
* obj.push(x)
* var param_2 = obj.pop()
* var param_3 = obj.peek()
* var param_4 = obj.empty()
*/


 var myQueue = new MyQueue()
 myQueue.push(1);
 myQueue.push(2);
 console.log("myQueue--",myQueue)
 var param_3 = myQueue.peek();
 console.log("peek--",param_3)
 var param_2 = myQueue.pop();
 console.log("pop",param_2)
 var param_4 = myQueue.empty();
 console.log("empty",param_4)