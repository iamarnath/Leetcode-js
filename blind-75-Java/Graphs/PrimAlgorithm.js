/*
Prim Algorithm

Given a weighted, undirected, and connected graph with V
 vertices and E edges, your task is to find the sum 
 of the weights of the edges in the 
 Minimum Spanning Tree (MST) of the graph.
  The graph is represented by an adjacency list, 
  where each element adj[i] is a vector containing 
  vector of integers. Each vector represents an edge,
   with the first integer denoting the endpoint of the
    edge and the second integer denoting the weight of the edge.

Input:
3 3
0 1 5
1 2 3
0 2 1
 
Output: 4
Explanation:

The Spanning Tree resulting in a weight
of 4 is shown above.
Input: 
2 1
0 1 5

Output: 5 

Explanation: Only one Spanning Tree is possible which has a weight of 5.
Constraints:
2 ≤ V ≤ 1000
V-1 ≤ E ≤ (V*(V-1))/2
1 ≤ w ≤ 1000
The graph is connected and doesn't contain self-loops & multiple edges.

*/
/*
in Minimum spanning tree,if we have V nodes and V-1 edges.//V is vertices
Algorithm Steps:

Use a min-heap (priority queue) to always pick the edge with the smallest weight that connects a new node to the MST.

Track which nodes are already included in the MST with inMST.

For each new node added, add its unvisited neighbors to the priority queue.

Continue until all nodes are included.

Return the total weight of the MST.


===
spanningTree(V, adj): Main function to compute the MST sum.

pq is a MinHeap to always get the edge with the smallest weight.

`pq.push([0, Start with node 0, weight 0.

inMST is an array to track which nodes are included in the MST.

sum will store the total weight of the MST.

*/

/*
Time and Space Complexity

Time Complexity
Let V be the number of vertices, E the number of edges.

Each edge can be pushed and popped from the heap at most once.

Heap operations (push, pop) take O(log E) time.

The total number of heap operations is O(E).

So, the total time complexity is O(E log E).

Note: If you use a more optimal priority queue 
(like a Fibonacci heap), you can get O(E + V log V),
 but with a binary heap, O(E log E) is typical.

Space Complexity
The heap can store up to O(E) elements (all edges).

The inMST array uses O(V) space.

The adjacency list uses O(V + E) space.

So, the total space complexity is O(V + E).
*/
/*
Prim’s Algorithm Logic
Initialization

Start with an empty Minimum Spanning Tree (MST).

Use a priority queue (min-heap) to always select
 the edge with the smallest weight that connects a new node to the MST.

Begin from node 0 (or any node), with an initial 
edge weight of 0.

Keep track of which nodes are already included in the
 MST using a boolean array (inMST).

Initialize a variable (sum) to keep the total weight of the MST.

Building the MST

While the priority queue is not empty:

Remove (pop) the edge with the smallest weight
 from the queue. This gives you the next node to add
  to the MST and the weight of the edge used to reach it.

If this node is already in the MST, skip it (continue to next iteration).

Otherwise:

Mark this node as included in the MST.

Add the edge’s weight to the total sum.

For every neighbor of this node:

If the neighbor is not yet in the MST,
 add the edge (with its weight) to the priority queue.

Termination

Repeat the above steps until all nodes are included
 in the MST (i.e., the priority queue is empty).

Return the total sum of the weights of the edges in the MST.

Pseudocode (Based on Your Code)
text
Initialize min-heap (priority queue)
Push [0, 0] onto the heap  // [weight, node]
Initialize inMST array as [false, false, ..., false]
Initialize sum = 0

While heap is not empty:
    Pop [weight, node] from heap
    If node is already inMST:
        continue
    Mark node as inMST
    Add weight to sum
    For each [neighbor, neighbor_weight] of node:
        If neighbor is not inMST:
            Push [neighbor_weight, neighbor] onto heap

Return sum
Key Points
Always expand the MST by the smallest-weight edge that connects a new node.

Each node is added to the MST exactly once.

The priority queue ensures the next edge chosen is always the minimum possible.

The algorithm stops when all nodes are included in the MST.
*/
// class MinHeap {
//     constructor() {
//         this.heap = [];
//     }

//     push(val) {
//         this.heap.push(val);
//         this._bubbleUp(this.heap.length - 1);
//     }

//     pop() {
//         if (this.heap.length === 0) return null;
//         const min = this.heap[0];
//         const end = this.heap.pop();
//         if (this.heap.length > 0) {
//             this.heap[0] = end;
//             this._sinkDown(0);
//         }
//         return min;
//     }

//     isEmpty() {
//         return this.heap.length === 0;
//     }

//     _bubbleUp(idx) {
//         const element = this.heap[idx];
//         while (idx > 0) {
//             const parentIdx = Math.floor((idx - 1) / 2);
//             const parent = this.heap[parentIdx];
//             if (element[0] >= parent[0]) break;
//             this.heap[parentIdx] = element;
//             this.heap[idx] = parent;
//             idx = parentIdx;
//         }
//     }

//     _sinkDown(idx) {
//         const length = this.heap.length;
//         const element = this.heap[idx];

//         while (true) {
//             let leftIdx = 2 * idx + 1;
//             let rightIdx = 2 * idx + 2;
//             let swap = null;

//             if (leftIdx < length) {
//                 if (this.heap[leftIdx][0] < element[0]) {
//                     swap = leftIdx;
//                 }
//             }
//             if (rightIdx < length) {
//                 if (
//                     (swap === null && this.heap[rightIdx][0] < element[0]) ||
//                     (swap !== null && this.heap[rightIdx][0] < this.heap[leftIdx][0])
//                 ) {
//                     swap = rightIdx;
//                 }
//             }
//             if (swap === null) break;
//             this.heap[idx] = this.heap[swap];
//             this.heap[swap] = element;
//             idx = swap;
//         }
//     }
// }
class Heap{
    /*
    Initializes the heap.
this.heap: An array to store heap elements.
this.size: Tracks the number of elements in the heap.
this.compaire: A comparison function – defaults to a max-heap (a > b) but can be set to a min-heap.

    */
    constructor(compaire=(a,b)=>(a>b)){
        this.heap=[];
        this.size=0;  
        this.compaire = compaire;
    }
    //Returns true if the heap is empty.
    isEmpty(){
        return this.size===0
    }
    //Returns the current number of elements in the heap.
    getSize(){
        return this.size;
    }

    //Returns the index of the parent node for a given curr index.

//Note: This uses Math.ceil, which is unusual – generally, parent is Math.floor((curr - 1) / 2).
    getParent(curr){
        return Math.ceil(curr/2)-1
    }

    //Shifts the item at index curr up the heap to maintain heap property (heapify-up or bubble-up).

//Swaps elements until the current value is in the correct position.
    #heapInsert(curr){
        let parent=this.getParent(curr)
        let arr = this.heap;

        while(parent>=0 && this.compaire(arr[curr],arr[parent])){
            [arr[parent],arr[curr]]=[arr[curr],arr[parent]];
            curr=parent;
            parent=this.getParent(curr);
        }
    }
    //Adds a new element val to the heap.
//Pushes to the array, then reorders the heap using #heapInsert.
//Increments the size.
    insert(val){
        this.heap.push(val);
        let curr = this.size;
        this.#heapInsert(curr)
        this.size++;
    }
    //Returns the element at the root of the heap (heap), which is always min/max depending on heap type.

//Throws error if heap is empty.
    getMin(){
        if(this.size)
            return this.heap[0];
        throw Error('Heap is empty')
    }

    getMax(){
        if(this.size)
            return this.heap[0];
        throw Error('Heap is empty')
    }
//Calculates indices for the left and
//  right children of the node at index curr in the array.
    #getLeftChild(curr){
        return curr*2+1;
    }

    #getRightChild(curr){
        return curr*2+2;
    }

//Restores the heap property after removing the root.

//Pushes down an element at index i if necessary (heapify-down/sift-down).
    #heapify(i){
        let curr=i;
        let l = this.#getLeftChild(curr);
        let r = this.#getRightChild(curr);
        let arr = this.heap;
        let n = this.getSize();
        let largest = i; // Initialize largest as root
    
 
    // If left child is larger than root
    if (l < n && this.compaire(arr[l],arr[largest]))
        largest = l;
 
    // If right child is larger than largest so far
    if (r < n && this.compaire(arr[r], arr[largest]))
        largest = r;
 
    // If largest is not root
    if (largest != i) {
        [arr[i], arr[largest]]=[ arr[largest],arr[i]];
        // Recursively heapify the affected sub-tree
        this.#heapify(largest);
    }
    }
//Removes and returns the root (min/max depending on heap type).

//Replaces root with last item, decreases size, then heapifies the new root to restore property.

    delete(){
        if(this.isEmpty()){
            throw Error('Heap is empty')
        }
        let currVal = this.heap[0];
        this.heap[0]=this.heap[this.getSize()-1];
        this.heap.pop();
        this.size--;
        this.#heapify(0)

        return currVal;
    }
}

function spanningTree(V, adj) {
    const pq = new Heap((a, b) => a[0] < b[0]);
    pq.insert([0, 0]); // [weight, node]
    const inMST = new Array(V).fill(false);
    let sum = 0;
    /*
    While the priority queue is not empty:
        Pop the smallest edge.
        If the node is already in the MST, skip it.
        Otherwise, mark it as included and
         add its weight to the total sum.
    */
    while(!pq.isEmpty()) {
        const [wt, node] = pq.delete();
        if (inMST[node]) continue;
        inMST[node] = true;
        sum += wt;
        /*
        For each neighbor of the current node:
        If the neighbor is not yet in the MST, push its edge to the priority queue.
        After the loop, return the sum of the weights in the MST.
        */
        for (const [neighbor, neighbor_wt] of adj[node]) {
            if (!inMST[neighbor]) {
               // pq.push([neighbor_wt, neighbor]);
               pq.insert([neighbor_wt, neighbor]);
            }// end of if
        }//end of for
    }// end of while
    return sum;
}

    // adj: Array of V arrays, each containing [neighbor, weight] pairs
/*
    function spanningTree(V, adj) {
        const pq = new MinHeap();
        pq.push([0, 0]); // [weight, node]
        const inMST = new Array(V).fill(false);
        let sum = 0;

        while (!pq.isEmpty()) {
            const [wt, node] = pq.pop();

            if (inMST[node]) continue;

            inMST[node] = true;
            sum += wt;

            for (const [neighbor, neighbor_wt] of adj[node]) {
                if (!inMST[neighbor]) {
                    pq.push([neighbor_wt, neighbor]);
                }
            }
        }
        return sum;
    }
*/
const V = 3;
const adj = [
    [[1, 1], [2, 2]], // Node 0 connects to 1 (weight 1), 2 (weight 2)
    [[0, 1], [2, 3]], // Node 1 connects to 0 (1), 2 (3)
    [[0, 2], [1, 3]]  // Node 2 connects to 0 (2), 1 (3)
];

console.log(spanningTree(V, adj)); // Output: 3 (edges 0-1 and 0-2)
