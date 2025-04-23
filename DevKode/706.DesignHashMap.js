/*
706. Design HashMap

Solution - https://leetcode.com/problems/design-hashmap/solutions/5161517/optimised/

Description
Design a HashMap without using any built-in hash table libraries.

Implement the MyHashMap class:

MyHashMap() initializes the object with an empty map.
void put(int key, int value) inserts a (key, value) pair into the HashMap. If the key already exists in the map, update the corresponding value.
int get(int key) returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key.
void remove(key) removes the key and its corresponding value if the map contains the mapping for the key.
 

Example 1:

Input
["MyHashMap", "put", "put", "get", "get", "put", "get", "remove", "get"]
[[], [1, 1], [2, 2], [1], [3], [2, 1], [2], [2], [2]]
Output
[null, null, null, 1, -1, null, 1, null, -1]

Explanation
MyHashMap myHashMap = new MyHashMap();
myHashMap.put(1, 1); // The map is now [[1,1]]
myHashMap.put(2, 2); // The map is now [[1,1], [2,2]]
myHashMap.get(1);    // return 1, The map is now [[1,1], [2,2]]
myHashMap.get(3);    // return -1 (i.e., not found), The map is now [[1,1], [2,2]]
myHashMap.put(2, 1); // The map is now [[1,1], [2,1]] (i.e., update the existing value)
myHashMap.get(2);    // return 1, The map is now [[1,1], [2,1]]
myHashMap.remove(2); // remove the mapping for 2, The map is now [[1,1]]
myHashMap.get(2);    // return -1 (i.e., not found), The map is now [[1,1]]
 

Constraints:

0 <= key, value <= 106
At most 104 calls will be made to put, get, and remove.

*/
/*
Time Complexity
Constructor (MyHashMap): O(1)
The constructor initializes an array of size DATA_SIZE with a default value of -1. This operation takes constant time.
put(key, value): O(1)
Assigning a value to a specific index in the data array takes constant time.
get(key): O(1)
Retrieving a value from a specific index in the data array takes constant time.
remove(key): O(1)
Assigning a specific value (NOT_FOUND) to a specific index in the data array takes constant time.
In summary, all the operations (put, get, and remove) have a time complexity of O(1), which means they take constant time regardless of the size of the input.

Space Complexity

Constructor (MyHashMap): O(DATA_SIZE)
The constructor creates an array of size DATA_SIZE, which takes linear space with respect to the size of the data.
put(key, value), get(key), and remove(key): O(1)
These operations do not require any additional space proportional to the input size.

*/
const DATA_SIZE = 10 ** 6 + 1; // Define the size of the data array
const NOT_FOUND = -1; // Define a constant to represent a value that is not found

var MyHashMap = function() {
    this.data = new Array(DATA_SIZE).fill(-1);
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
MyHashMap.prototype.put = function(key, value) {
    // Directly assign the value at the index corresponding to the key
    this.data[key]=value;
};

/** 
 * @param {number} key
 * @return {number}
 */
MyHashMap.prototype.get = function(key) {
    // Return the value at the index corresponding to the key
    return this.data[key]
};

/** 
 * @param {number} key
 * @return {void}
 */
MyHashMap.prototype.remove = function(key) {
     // Set the value at the index corresponding to the key to NOT_FOUND to represent removal
    this.data[key] = NOT_FOUND;
};

/** 
 * Your MyHashMap object will be instantiated and called as such:
 * var obj = new MyHashMap()
 * obj.put(key,value)
 * var param_2 = obj.get(key)
 * obj.remove(key)
 */

var myHashMap = new MyHashMap();
myHashMap.put(1, 1); // The map is now [[1,1]]

myHashMap.put(2, 2); // The map is now [[1,1], [2,2]]

console.log(myHashMap.get(2)); 

console.log(myHashMap.get(1));    // return 1, The map is now [[1,1], [2,2]]

console.log(myHashMap.get(3));    // return -1 (i.e., not found), The map is now [[1,1], [2,2]]

myHashMap.put(2, 1); // The map is now [[1,1], [2,1]] (i.e., update the existing value)

console.log(myHashMap.get(2));    // return 1, The map is now [[1,1], [2,1]]

myHashMap.remove(2); // remove the mapping for 2, The map is now [[1,1]]

console.log(myHashMap.get(2));    // return -1 (i.e., not found), The map is now [[1,1]]