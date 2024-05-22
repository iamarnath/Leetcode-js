/*
622. Design Circular Queue

Solution - https://leetcode.com/problems/design-circular-queue/solutions/5191288/optimised/

Description
Design your implementation of the circular queue. The circular queue is a linear data structure in which the operations are performed based on FIFO (First In First Out) principle, and the last position is connected back to the first position to make a circle. It is also called "Ring Buffer".

One of the benefits of the circular queue is that we can make use of the spaces in front of the queue. In a normal queue, once the queue becomes full, we cannot insert the next element even if there is a space in front of the queue. But using the circular queue, we can use the space to store new values.

Implement the MyCircularQueue class:

MyCircularQueue(k) Initializes the object with the size of the queue to be k.
int Front() Gets the front item from the queue. If the queue is empty, return -1.
int Rear() Gets the last item from the queue. If the queue is empty, return -1.
boolean enQueue(int value) Inserts an element into the circular queue. Return true if the operation is successful.
boolean deQueue() Deletes an element from the circular queue. Return true if the operation is successful.
boolean isEmpty() Checks whether the circular queue is empty or not.
boolean isFull() Checks whether the circular queue is full or not.
You must solve the problem without using the built-in queue data structure in your programming language. 

 

Example 1:

Input
["MyCircularQueue", "enQueue", "enQueue", "enQueue", "enQueue", "Rear", "isFull", "deQueue", "enQueue", "Rear"]
[[3], [1], [2], [3], [4], [], [], [], [4], []]
Output
[null, true, true, true, false, 3, true, true, true, 4]

Explanation
MyCircularQueue myCircularQueue = new MyCircularQueue(3);
myCircularQueue.enQueue(1); // return True
myCircularQueue.enQueue(2); // return True
myCircularQueue.enQueue(3); // return True
myCircularQueue.enQueue(4); // return False
myCircularQueue.Rear();     // return 3
myCircularQueue.isFull();   // return True
myCircularQueue.deQueue();  // return True
myCircularQueue.enQueue(4); // return True
myCircularQueue.Rear();     // return 4
 

Constraints:

1 <= k <= 1000
0 <= value <= 1000
At most 3000 calls will be made to enQueue, deQueue, Front, Rear, isEmpty, and isFull.
*/
/*
Approach-

The approach used in this implementation of a circular queue is to use an array to store the elements and two pointers, left and right, to keep track of the front and rear of the queue, respectively. The capacity variable stores the maximum size of the queue.
enQueue(value):
The enQueue method adds an element to the circular queue.
The index where the value is stored in the queue array is calculated as this.right % this.capacity. This ensures that the index wraps around to the beginning of the array if it reaches the end.
After adding the value, the right pointer is incremented to point to the next available position.
deQueue():
The deQueue method removes an element from the front of the circular queue.
To remove an element, the left pointer is incremented to point to the next element in the queue.
This effectively removes the element at the front of the queue.
Front():
The Front method returns the element at the front of the circular queue.
The index of the element at the front is calculated as this.left % this.capacity. This ensures that the index wraps around if it reaches the end of the array.
Rear():
The Rear method returns the element at the rear of the circular queue.
The index of the element at the rear is calculated as (this.right - 1) % this.capacity. This ensures that the index wraps around to the end of the array if needed.


Constructor (MyCircularQueue):
Time Complexity: O(1)
Space Complexity: O(k), where k is the capacity of the queue.
enQueue(value):
Time Complexity: O(1)
Space Complexity: O(1)
If the queue is not full, the element is added to the queue array at the position determined by the right pointer modulo the capacity. The right pointer is then incremented.
If the queue is full, the method returns false.
deQueue():
Time Complexity: O(1)
Space Complexity: O(1)
If the queue is not empty, the left pointer is incremented, effectively removing the element from the front of the queue.
If the queue is empty, the method returns false.
Front():
Time Complexity: O(1)
Space Complexity: O(1)
If the queue is not empty, the method returns the element at the position determined by the left pointer modulo the capacity.
If the queue is empty, the method returns -1.
Rear():
Time Complexity: O(1)
Space Complexity: O(1)
If the queue is not empty, the method returns the element at the position determined by the right pointer minus 1 modulo the capacity.
If the queue is empty, the method returns -1.
isEmpty():
Time Complexity: O(1)
Space Complexity: O(1)
The method checks if the difference between right and left is zero, indicating an empty queue.
isFull():
Time Complexity: O(1)
Space Complexity: O(1)
The method checks if the difference between right and left is equal to the capacity, indicating a full queue.


*/
/**
 * @param {number} k
 */
var MyCircularQueue = function (k) {
    this.queue = new Array(k);
    this.left = 0;
    this.right = 0;
    this.capacity = k;
};

/** 
 * @param {number} value
 * @return {boolean}
 */
MyCircularQueue.prototype.enQueue = function (value) {
    if (this.isFull()) {
        return false;
    }
    this.queue[this.right % this.capacity] = value;
    this.right++;
    return true;
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function () {
    if (this.isEmpty()) {
        return false;
    }
    this.left++;
    return true;
};

/**
 * @return {number}
 */
MyCircularQueue.prototype.Front = function () {
    if (this.isEmpty()) {
        return -1;
    }
    return this.queue[this.left % this.capacity];
};

/**
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function () {
    if (this.isEmpty()) {
        return -1;
    }
    return this.queue[(this.right - 1) % this.capacity];
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isEmpty = function () {
    return this.right - this.left === 0;
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isFull = function () {
    return this.right - this.left === this.capacity;
};

/** 
 * Your MyCircularQueue object will be instantiated and called as such:
 * var obj = new MyCircularQueue(k)
 * var param_1 = obj.enQueue(value)
 * var param_2 = obj.deQueue()
 * var param_3 = obj.Front()
 * var param_4 = obj.Rear()
 * var param_5 = obj.isEmpty()
 * var param_6 = obj.isFull()
 */
var myCircularQueue = new MyCircularQueue(3);
let a = myCircularQueue.enQueue(1); // return True
console.log(a)
let b = myCircularQueue.enQueue(2); // return True
console.log(b)
myCircularQueue.enQueue(3); // return True
let c = myCircularQueue.enQueue(4); // return False
console.log(c)
console.log(myCircularQueue.Rear());     // return 3
console.log(myCircularQueue.isFull());   // return True
console.log(myCircularQueue.deQueue());  // return True
console.log(myCircularQueue.enQueue(4)); // return True
console.log(myCircularQueue.Rear());     // return 4