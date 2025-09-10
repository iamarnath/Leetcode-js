/*
133. Clone Graph
Description
Given a node in a connected undirected graph,
 return a deep copy of the graph.

Each node in the graph contains an integer value
 and a list of its neighbors.

class Node {
    public int val;
    public List<Node> neighbors;
}
The graph is shown in the test cases as an adjacency list.
 An adjacency list is a mapping of nodes to lists, used to 
 represent a finite graph. Each list describes the set of 
 neighbors of a node in the graph.

For simplicity, nodes values are numbered from 1 to n,
 where n is the total number of nodes in the graph. 
 The index of each node within the adjacency list is the same
  as the node's value (1-indexed).

The input node will always be the first node in the
 graph and have 1 as the value.

 Input: adjList = [[2],[1,3],[2]]

Output: [[2],[1,3],[2]]

Explanation: There are 3 nodes in the graph.
Node 1: val = 1 and neighbors = [2].
Node 2: val = 2 and neighbors = [1, 3].
Node 3: val = 3 and neighbors = [2].

Input: adjList = [[]]
Output: [[]]

Explanation: The graph has one node with no neighbors.

Input: adjList = []
Output: []
Explanation: The graph is empty.

Constraints:

0 <= The number of nodes in the graph <= 100.
1 <= Node.val <= 100
There are no duplicate edges and no self-loops in the graph.

 
*/
//Defines a graph node with a val (value) and
//  neighbors (list of adjacent nodes).

function _Node(val, neighbors) {
  this.val = val === undefined ? 0 : val;
  this.neighbors = neighbors === undefined ? [] : neighbors;
};
/*
buildGraph:

  Creates Node instances for each value in the adjacency list.
  Links neighbors based on the adjacency list entries.

cloneGraph:

  Takes the root Node of the original graph and returns a deep copy.

serializeGraph:

  Traverses the cloned graph to reconstruct the adjacency list.
  Ensures nodes are sorted by value to match the input format.
*/
function buildGraph(adjList) {
  if (!adjList || adjList.length === 0) return null;
  const nodes = new Map(); // Maps node values to Node instances
  // Create all nodes
  for (let i = 0; i < adjList.length; i++) {
    const val = i + 1; // Nodes are 1-indexed
    nodes.set(val, new _Node(val));
  }
  // Link neighbors
  for (let i = 0; i < adjList.length; i++) {
    const current = nodes.get(i + 1);
    const neighborValues = adjList[i];
    for (const val of neighborValues) {
      current.neighbors.push(nodes.get(val));
    }
  }
  return nodes.get(1); // Return the root node (val=1)
}

function serializeGraph(node) {
  if (!node) return [];
  const nodes = new Map(); // Tracks visited nodes
  const queue = [node];
  nodes.set(node.val, node);

  // Traverse the graph to collect all nodes
  while (queue.length > 0) {
    const current = queue.shift();
    for (const neighbor of current.neighbors) {
      if (!nodes.has(neighbor.val)) {
        nodes.set(neighbor.val, neighbor);
        queue.push(neighbor);
      }
    }
  }

  // Sort nodes by value and extract neighbors
  const sortedVals = Array.from(nodes.keys()).sort((a, b) => a - b);
  return sortedVals.map(val => {
    const neighbors = nodes.get(val).neighbors.map(n => n.val);
    return neighbors;
  });
}


function dfs(node, oldToNew) {
  //Base Case 1: If the node is null, return null.

  //Base Case 2: If the node has already been cloned 
  // (exists in oldToNew), return its clone.
  if (node === null) return null;
  if (oldToNew.has(node)) return oldToNew.get(node);

  const copy = new _Node(node.val);
  oldToNew.set(node, copy);
  //Create a new node (copy) with the same value as the original.

  //Store the mapping between the original node and its clone
  //  in oldToNew (prevents cycles).
  for (const nei of node.neighbors) {
    copy.neighbors.push(dfs(nei, oldToNew));
  }
  //Recursively clone all neighbors of the original node.

  //Add cloned neighbors to the copy node’s neighbors list.
  return copy;
}
var cloneGraph = function (node) {
  const oldToNew = new Map();
  return dfs(node, oldToNew);
};

let adjList = [[2], [1, 3], [2]];
const root = buildGraph(adjList);
let clonedRoot = cloneGraph(root);
console.log("clonedRoot==",clonedRoot);

const clonedAdjList = serializeGraph(clonedRoot);
console.log("clonedAdjList==",clonedAdjList); 