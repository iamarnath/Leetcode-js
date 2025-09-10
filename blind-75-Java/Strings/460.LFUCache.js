/*
460. LFU Cache

Design and implement a data structure for a Least Frequently Used (LFU) cache.

Implement the LFUCache class:

LFUCache(int capacity) Initializes the object with the capacity of the data structure.
int get(int key) Gets the value of the key if the key exists in the cache. Otherwise, returns -1.
void put(int key, int value) Update the value of the key if present, or inserts the key if not already present. When the cache reaches its capacity, it should invalidate and remove the least frequently used key before inserting a new item. For this problem, when there is a tie (i.e., two or more keys with the same frequency), the least recently used key would be invalidated.
To determine the least frequently used key, a use counter is maintained for each key in the cache. The key with the smallest use counter is the least frequently used key.

When a key is first inserted into the cache, its use counter is set to 1 (due to the put operation). The use counter for a key in the cache is incremented either a get or put operation is called on it.

The functions get and put must each run in O(1) average time complexity.

 

Example 1:

Input
["LFUCache", "put", "put", "get", "put", "get", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [3], [4, 4], [1], [3], [4]]
Output
[null, null, null, 1, null, -1, 3, null, -1, 3, 4]

Explanation
// cnt(x) = the use counter for key x
// cache=[] will show the last used order for tiebreakers (leftmost element is  most recent)
LFUCache lfu = new LFUCache(2);
lfu.put(1, 1);   // cache=[1,_], cnt(1)=1
lfu.put(2, 2);   // cache=[2,1], cnt(2)=1, cnt(1)=1
lfu.get(1);      // return 1
                 // cache=[1,2], cnt(2)=1, cnt(1)=2
lfu.put(3, 3);   // 2 is the LFU key because cnt(2)=1 is the smallest, invalidate 2.
                 // cache=[3,1], cnt(3)=1, cnt(1)=2
lfu.get(2);      // return -1 (not found)
lfu.get(3);      // return 3
                 // cache=[3,1], cnt(3)=2, cnt(1)=2
lfu.put(4, 4);   // Both 1 and 3 have the same cnt, but 1 is LRU, invalidate 1.
                 // cache=[4,3], cnt(4)=1, cnt(3)=2
lfu.get(1);      // return -1 (not found)
lfu.get(3);      // return 3
                 // cache=[3,4], cnt(4)=1, cnt(3)=3
lfu.get(4);      // return 4
                 // cache=[4,3], cnt(4)=2, cnt(3)=3
 

Constraints:

1 <= capacity <= 104
0 <= key <= 105
0 <= value <= 109
At most 2 * 105 calls will be made to get and put.
*/
/*
keyToNodeMap:
  1 -> Node{val:10, freq:2}
  3 -> Node{val:30, freq:1}

freqToListMap:
  1 -> [3]
  2 -> [1]

minFreq = 1


*/
class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.freq = 1;
        this.prev = null;
        this.next = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = new Node(-1, -1); // dummy head
        this.tail = new Node(-1, -1); // dummy tail
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    addFirst(node) {
        node.prev = this.head;
        node.next = this.head.next;
        this.head.next.prev = node;
        this.head.next = node;
    }

    removeNode(node) {
        if (node.prev) node.prev.next = node.next;
        if (node.next) node.next.prev = node.prev;
        node.next = null;
        node.prev = null;
        return node;
    }

    removeLast() {
        if (this.tail.prev !== this.head) {
            return this.removeNode(this.tail.prev);
        }
        return null;
    }

    isEmpty() {
        return this.head.next === this.tail;
    }
}

class LFUCache {
    constructor(capacity) {
        this.capacity = capacity;
        // Tracks the current minimum usage frequency in the cache.
        this.minFreq = 0;
        //Maps each cache key to its node (O(1) for lookup).
        this.keyToNodeMap = new Map();
        //Maps frequency numbers to DoublyLinkedList instances,
        //  grouping nodes by frequency.
        this.freqToListMap = new Map();
    }

    get(key) {
        //If the cache has zero capacity or the key isn’t present, returns -1.
        if (this.capacity === 0 || !this.keyToNodeMap.has(key)) {
            return -1;
        }
        //Looks up the node for this key.
        const node = this.keyToNodeMap.get(key);
        //Calls _incrementFrequency(node), which increases the usage 
        // frequency and moves the node to its new frequency group.
        this._incrementFrequency(node);
        //Returns the node’s value if found.
        return node.value;
    }

    put(key, value) {
        //If the cache has zero capacity, does nothing.
        if (this.capacity === 0) return;
        //If the key already exists: update its value, increase frequency, and return.
        if (this.keyToNodeMap.has(key)) {
            const node = this.keyToNodeMap.get(key);
            node.value = value;
            this._incrementFrequency(node);
            return;
        }
        //If inserting a new key and the cache is full:
        if (this.keyToNodeMap.size === this.capacity) {
            //Find the list of nodes with the lowest frequency (minFreq).
            const minFreqList = this.freqToListMap.get(this.minFreq);
            //Remove the least recently used node from this list.
            const nodeToEvict = minFreqList.removeLast();
            //Remove that node’s key from the map.
            if (nodeToEvict) this.keyToNodeMap.delete(nodeToEvict.key);
        }
        //Create a new node for the key/value.
        const newNode = new Node(key, value);
        //Insert the node into keyToNodeMap.
        this.keyToNodeMap.set(key, newNode);
        //If there's no list for frequency 1, create it.
        if (!this.freqToListMap.has(1)) {
            //Add the new node to the front of the freq 1 list.
            this.freqToListMap.set(1, new DoublyLinkedList());
        }
        this.freqToListMap.get(1).addFirst(newNode);
        //Set minFreq to 1 since a new node is always used once.
        this.minFreq = 1;
    }
    //Moves the node to its new frequency group.
    _incrementFrequency(node) {
        //Save the node’s previous frequency and its list.
        const oldFreq = node.freq;
        const oldList = this.freqToListMap.get(oldFreq);
        //Remove the node from that DLL.
        oldList.removeNode(node);
        //If the old list is now empty:
        if (oldList.isEmpty()) {
            //Delete it.
            this.freqToListMap.delete(oldFreq);
            //If this frequency was the minimum in the cache,
            //  increment minFreq.
            if (this.minFreq === oldFreq) this.minFreq++;
        }
        //Increase the node’s freq by 1.
        node.freq++;
        //If no list exists for the new freq, create it.
        if (!this.freqToListMap.has(node.freq)) {
            this.freqToListMap.set(node.freq, new DoublyLinkedList());
        }
        //Add the node to the front (most-recent) of its new freq group.
        this.freqToListMap.get(node.freq).addFirst(node);
    }
}
/*
1. Initial State
Cache capacity: 2

text
keyToNodeMap: {}
freqToListMap: {}
minFreq: 0
2. cache.put(1, 10)
Adds key 1 with value 10 and freq=1.

text
keyToNodeMap:
  { 1: Node{key:1, value:10, freq:1} }

freqToListMap:
  { 1: [1] }

minFreq: 1
3. cache.put(2, 20)
Adds key 2 with value 20 and freq=1.

text
keyToNodeMap:
  { 1: Node{key:1, value:10, freq:1},
    2: Node{key:2, value:20, freq:1} }

freqToListMap:
  { 1: [2, 1] }   // Most recent left

minFreq: 1
4. cache.get(1)
Finds node for key=1.

Calls _incrementFrequency(node):

Removes key=1 from freq=1 list.

Freq=1 list now only , so minFreq stays 1.

key=1's freq is now 2; added to freq=2 list.

Returns value 10.

text
keyToNodeMap:
  { 1: Node{key:1, value:10, freq:2},
    2: Node{key:2, value:20, freq:1} }

freqToListMap:
  { 1: [2],
    2: [1] }

minFreq: 1
5. cache.put(3, 30) (trigger eviction!)
Full, so evict LRU from minFreq (freq=1, list=).

Removes key=2.

Adds key=3 with value 30, freq=1.

Updates structures.

text
keyToNodeMap:
  { 1: Node{key:1, value:10, freq:2},
    3: Node{key:3, value:30, freq:1} }

freqToListMap:
  { 1: [3],
    2: [1] }

minFreq: 1
6. What the functions do in each step
get(key)
Checks key in keyToNodeMap.

Uses value.

Calls _incrementFrequency(node).

Node: Losses from old list, moves to new freq list.

Updates or cleans up freqToListMap; might bump minFreq.

put(key, value)
Updates if key exists (then also bumps freq).

If not and full, finds which list minFreq points to and evicts oldest = LRU.

Adds new node for that key at freq=1.

Sets minFreq = 1.

_incrementFrequency(node)
Grabs old list for node.freq, removes node.

If that list empty, removes freq from map; if minFreq matches, bump minFreq.

Increments node's freq.

Adds node to new higher-freq list.

Text Diagram (after several operations)
text
LFUCache:
  keyToNodeMap:
    1: (value=10, freq=2)
    3: (value=30, freq=1)

  freqToListMap:
    1: [3]
    2: [1]      // Only key 1 at freq 2

  minFreq: 1
Most recent in each list is leftmost.

For equal frequency, eviction is LRU within that group.

Summary Table:

Step	keyToNodeMap	freqToListMap	minFreq
put(1,10)	{1:{10,1}}	{1:}	1
put(2,20)	{1:{10,1},2:{20,1}}	{1:}	1
get(1)	{1:{10,2},2:{20,1}}	{1:, 2:}	1
put(3,30) (evicts 2)	{1:{10,2},3:{30,1}}	{1:, 2:}	1
This is how your maps, lists, and minFreq evolve during get, put, and _incrementFrequency[].



*/