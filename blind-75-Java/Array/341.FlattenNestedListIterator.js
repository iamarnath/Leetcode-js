/*
341. Flatten Nested List Iterator

You are given a nested list of integers nestedList. 
Each element is either an integer or a list whose 
elements may also be integers or other lists. 
Implement an iterator to flatten it.

Implement the NestedIterator class:

NestedIterator(List<NestedInteger> nestedList) 
Initializes the iterator with the nested list nestedList.
int next() Returns the next integer in the nested list.
boolean hasNext() Returns true if there are still 
some integers in the nested list and false otherwise.
Your code will be tested with the following pseudocode:

initialize iterator with nestedList
res = []
while iterator.hasNext()
    append iterator.next() to the end of res
return res
If res matches the expected flattened list, 
then your code will be judged as correct.

 

Example 1:

Input: nestedList = [[1,1],2,[1,1]]
Output: [1,1,2,1,1]
Explanation: By calling next repeatedly until
 hasNext returns false, the order of elements 
 returned by next should be: [1,1,2,1,1].
Example 2:

Input: nestedList = [1,[4,[6]]]
Output: [1,4,6]
Explanation: By calling next repeatedly until
 hasNext returns false, the order of elements 
 returned by next should be: [1,4,6].
 

Constraints:

1 <= nestedList.length <= 500
The values of the integers in the nested list is in the range [-10^6, 10^6].

*/
/*
class NestedIterator {
    constructor(nestedList) {
        this.queue = [];
        this.addAll(nestedList);
    }

    addAll(nestedList) {
        for (let i = 0; i < nestedList.length; i++) {
            const obj = nestedList[i];
            if (obj.isInteger()) {
                this.queue.push(obj.getInteger());
            } else {
                this.addAll(obj.getList());
            }
        }
    }

    next() {
        return this.queue.shift();
    }

    hasNext() {
        return this.queue.length > 0;
    }
}
*/
/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * function NestedInteger() {
 *
 *     Return true if this NestedInteger holds a single integer, rather than a nested list.
 *     @return {boolean}
 *     this.isInteger = function() {
 *         ...
 *     };
 *
 *     Return the single integer that this NestedInteger holds, if it holds a single integer
 *     Return null if this NestedInteger holds a nested list
 *     @return {integer}
 *     this.getInteger = function() {
 *         ...
 *     };
 *
 *     Return the nested list that this NestedInteger holds, if it holds a nested list
 *     Return null if this NestedInteger holds a single integer
 *     @return {NestedInteger[]}
 *     this.getList = function() {
 *         ...
 *     };
 * };
 */
/*
Time Complexity
The time complexity is 

O(N), where 

N is the total number of NestedInteger objects (including both individual integers and all nested lists).

Every element is visited exactly once—either as an integer (added to the queue) or as a list (which causes a recursive call to visit its elements).

Space Complexity
The space complexity is also 

O(N), due to:

The output queue, which can in the worst case contain 
all integers from every level of nesting, and

The maximum recursion stack, which in the worst 
case (e.g., deeply nested single-element lists) could also be 

O(N).

For most typical (broad, not deep) nestings, recursion stack is 

O(D) where 
D is depth of nesting, but the queue itself will always be 

O(M), where 
M is the total number of integers.

Summary Table
Step	Description
For loop	Iterate all items in the current list
isInteger()	Check if an item is integer
queue.push()	Add integer to output
Recursion	Flatten nested lists recursively


*/
function NestedInteger(value) {
    // If value is an integer, store as integer, else as a list of NestedInteger
    if (typeof value === "number") {
        this.integer = value;
        this.list = null;
    } else {
        this.integer = null;
        // Assume value is an array
        this.list = value.map(v => new NestedInteger(v));
    }
    //isInteger(): Returns true if the object holds an integer, false otherwise.
    this.isInteger = function() {
        return this.integer !== null;
    };
    //getInteger(): Returns the integer value, or null if it holds a nested list.
    this.getInteger = function() {
        return this.integer;
    };
    //getList(): Returns the nested list (array of NestedInteger), or null if it’s an integer.
    this.getList = function() {
        return this.list;
    };
}


var NestedIterator = function(nestedList) {
    this.queue = [];
    this.addAll(nestedList);
};

NestedIterator.prototype.addAll = function(nestedList) {
    // Iterates through each element in the nestedList. 
    // This is necessary to inspect every item, whether 
    // it is an integer or another list.
    for (let i = 0; i < nestedList.length; i++) {
        // Accesses the current element (obj) of nestedList.
        const obj = nestedList[i];
        // Checks if obj is a single integer.
        // If it is, retrieves the integer value 
        // and appends it to this.queue, effectively flattening that portion.
        if (obj.isInteger()) {
            this.queue.push(obj.getInteger());
        } else {
            //If obj is not an integer, it is assumed to be a nested list.
            // The function recursively calls itself to flatten the sublist, 
            // ensuring all integers, regardless of nesting, end up in the queue.
            this.addAll(obj.getList());
        }
    }
};

/**
 * @this NestedIterator
 * @returns {boolean}
 */
NestedIterator.prototype.hasNext = function() {
     return this.queue.length > 0;
};

/**
 * @this NestedIterator
 * @returns {integer}
 */
//time complexity is O(N), where 
//N is the number of elements in the queue at the time of calling next().
NestedIterator.prototype.next = function() {
    return this.queue.shift();
};

/**
 * Your NestedIterator will be called like this:
 * var i = new NestedIterator(nestedList), a = [];
 * while (i.hasNext()) a.push(i.next());
*/

// Represent the input nestedList = [[1,1], 2, [1,1]]
const nestedList = [
    new NestedInteger([1,1]),
    new NestedInteger(2),
    new NestedInteger([1,1])
];
// nestedList[0] is NestedInteger([1, 1]), so:
console.log(nestedList[0].isInteger());  // false
console.log(nestedList[0].getList());    // [NestedInteger(1), NestedInteger(1)]

// Second item is an integer
console.log(nestedList[1].isInteger());    // true
console.log(nestedList[1].getInteger());   // 2

// Third item is also a list
console.log(nestedList[2].getList());      // [NestedInteger(1), NestedInteger(1)]
