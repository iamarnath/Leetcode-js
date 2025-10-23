/*
146. LRU Cache
Design a data structure that follows the constraints 
of a Least Recently Used (LRU) cache.

Implement the LRUCache class:

LRUCache(int capacity) Initialize the LRU cache
 with positive size capacity.
int get(int key) Return the value of the key if
 the key exists, otherwise return -1.
void put(int key, int value) Update the value
 of the key if the key exists. Otherwise, 
 add the key-value pair to the cache. 
 If the number of keys exceeds the capacity
  from this operation, evict the least recently used key.
The functions get and put must each 
run in O(1) average time complexity.

 

Example 1:

Input
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
Output
[null, null, null, 1, null, -1, null, -1, 3, 4]

Explanation
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2);    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
lRUCache.get(1);    // return -1 (not found)
lRUCache.get(3);    // return 3
lRUCache.get(4);    // return 4
 

Constraints:

1 <= capacity <= 3000
0 <= key <= 104
0 <= value <= 105
At most 2 * 105 calls will be made to get and put.
*/

/**
 * @param {number} capacity
 */

var LRUCache = function(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    if (!this.cache.has(key)) return -1;
    var value = this.cache.get(key);
    // Move key to the end to mark as recently used
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    if (this.cache.has(key)) {
        this.cache.delete(key);
    }
    if (this.cache.size >= this.capacity) {
        // Remove least recently used (first item in Map)
        var firstKey = this.cache.keys().next().value;
        this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
};

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
//Maintains Insertion Order: The Map object in JavaScript preserves the order of keys, which makes it easy to track which key is the least recently used—this is essential for the eviction policy of an LRU cache.
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    const value = this.cache.get(key);
    // Move the key to the end to mark as recently used
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    if (this.cache.size >= this.capacity) {
      // Remove least recently used key (first in Map)
      //extracts the least recently used key (the first key inserted)
      //  from the JavaScript Map object for the LRU cache.
      //alternate way
      //const [firstKey] = map.keys();
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
}
/*
Step-by-Step Explanation
this.cache.keys() returns an iterator object of keys, in their insertion order in the Map.

.next() returns the next item from the iterator, as an object like {value: ..., done: ...}.

.value retrieves the actual key value from that first result.

For example, if the map contains:

javascript
a => 100
b => 200
c => 300
then this.cache.keys().next().value returns 'a'—the first-inserted key,
 and hence the least recently used in the context of an LRU cache

 LRU Eviction Flow Table
Map (before put)	firstKey	Map (after deletion)
a → val1, b → val2	a	b → val2, ...
b → val2, c → val3	b	c → val3, ...
Oldest key is determined by the order in which keys are stored; keys().next().value gives the first one, LRU for the cache.

This behavior is crucial for correctly maintaining the Least Recently Used cache property.
*/