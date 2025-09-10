/*
1376. Time Needed to Inform All Employees

A company has n employees with a unique ID for each
 employee from 0 to n - 1. The head of the company is the one with headID.

Each employee has one direct manager given in 
the manager array where manager[i] is the direct 
manager of the i-th employee, manager[headID] = -1.
 Also, it is guaranteed that the subordination relationships
  have a tree structure.

The head of the company wants to inform all the 
company employees of an urgent piece of news.
 He will inform his direct subordinates, and they will
  inform their subordinates, and so on until all 
  employees know about the urgent news.

The i-th employee needs informTime[i] minutes to 
inform all of his direct subordinates (i.e., After 
informTime[i] minutes, all his direct subordinates 
can start spreading the news).

Return the number of minutes needed to inform all 
the employees about the urgent news.

Example 1:

Input: n = 1, headID = 0, manager = [-1], informTime = [0]
Output: 0
Explanation: The head of the company is the only employee in the company.
Example 2:


Input: n = 6, headID = 2, manager = [2,2,-1,2,2,2], informTime = [0,0,1,0,0,0]
Output: 1
Explanation: The head of the company with id = 2 is the
 direct manager of all the employees in the company and 
 needs 1 minute to inform them all.
The tree structure of the employees in the company is shown.
*/
/*

Time Complexity

Building the Adjacency List:
This takes 
O
(
n
)
O(n) time, where 
n
n is the number of employees (since each employee is processed once).

DFS Traversal:
Each employee (vertex) and each direct report relationship (edge) 
is visited exactly once. For a tree or general graph,
the time complexity of DFS is 

O(V+E), where 
V is the number of vertices (employees) and 
E is the number of edges (manager-report relationships).

In this problem, the structure is a tree, so 

E=V−1, making the overall time complexity O(n).

Space Complexity

Adjacency List:
The adjacency list stores up to 

O(n) entries.

Call Stack:
The recursive DFS call stack can go as deep as the
 height of the tree, which in the worst case is 

O(n) (for a skewed tree).

Auxiliary Variables:
Other variables use negligible space.

Therefore, the total space complexity is O(n).

Summary Table

Aspect	           Complexity	                       Explanation
Time Complexity	    O(n)	                Each employee and edge is visited 
                                            once (DFS on a tree)
Space Complexity	O(n)	                Adjacency list + recursion stack (up to 
                                                tree height)
*/
/*
n: total number of employees,

headID: the ID of the head of the company,

manager: an array where manager[i] is the direct manager of employee i (or -1 if i is the head),

informTime: an array where informTime[i] is the time it takes for employee i to inform their direct subordinates.
*/
var numOfMinutesDFS = function (n, headID, manager, informTime) {
    // Initializes an empty object to represent the adjacency list, which will map each manager to a list of their direct reports.
    const adj = {};
    /*
    Loops through each employee i.
        If manager[i] !== -1 (i.e., i is not the head), then:
        If adj[manager[i]] does not exist, initialize it as an empty array.
        Add employee i to their manager's list of direct reports.
    */
    for (let i = 0; i < n; i++) {
        if (manager[i] !== -1) {
            if (!adj[manager[i]]) {
                adj[manager[i]] = [];
            }
            adj[manager[i]].push(i);
        }
    }
    let maxTime = Number.MIN_SAFE_INTEGER;
    function DFS(curr_employee, curr_time) {
        //Initializes maxTime to the smallest possible safe integer, to keep track of the maximum time found during DFS.
        maxTime = Math.max(maxTime, curr_time);
        // If the current employee has no subordinates (not in the adjacency list), return (end recursion for this path).
        if (!adj[curr_employee]) return;
        for (const v of adj[curr_employee]) {
            //Call DFS on subordinate v, adding the current employee's inform time to curr_time.
            DFS(v, curr_time + informTime[curr_employee]);
        }
    }
    //Starts the DFS traversal from the head of the company with an initial time of 0.
    DFS(headID, 0);
    return maxTime;
};

/*
Time Complexity
Building the adjacency list:
Each of the 

n employees is processed once, so this step is 

O(n).

BFS traversal:
Every employee (vertex) is visited once, and every 
edge (manager-subordinate relationship) is traversed once.

For a tree with 
n nodes, there are 
n−1 edges.

Thus, the BFS part is 
O(n).

Total time complexity:
O(n)
This matches the general BFS complexity of 
O(∣V∣+∣E∣), where 
∣V∣ is the number of vertices (employees) and 
∣E∣ is the number of edges (manager-subordinate relationships).

Space Complexity
Adjacency list:
Stores up to 
n entries (one for each employee), each with a list 
of subordinates. Total space is 
O(n).

Queue for BFS:
In the worst case, the queue holds all employees at 
the deepest level, which is at most 
O(n).
Other variables:
Minor, 
O(1).

Total space complexity:
O(n)
This is standard for BFS in trees or graphs where all nodes 
may need to be stored at the deepest level.

Summary Table

Step	                    Time Complexity	    Space Complexity
Adjacency List	               O(n)	               O(n)
BFS Traversal	               O(n)	               O(n)
Total	                       O(n)	               O(n)

*/

function BFS(adj, informTime, headID) {
    //Initializes maxTime to the smallest possible value, 
    // to keep track of the maximum time taken to inform any employee.
    let maxTime = -Infinity;
    //Creates an empty queue for BFS traversal.
    const queue = [];
    //Starts BFS by adding the head of the company to the 
    // queue with time 0 (the head receives info at time 0).
    queue.push([headID, 0]);//[employee, time when receives info]
    //BFS loop: Runs as long as there are employees in the queue.
    while (queue.length > 0) {
        //Removes the first employee from the queue, retrieving:
        // currEmp: current employee's ID
        // currTime: the time this employee receives the information
        const [currEmp, currTime] = queue.shift();
        //Updates maxTime if the current employee received
        //  the information later than any previous employee.
        maxTime = Math.max(maxTime, currTime);
        //Checks if the current employee has
        //  subordinates (i.e., if they are a manager).
        if (adj.has(currEmp)) {
            //Loops through all subordinates (v) of the current employee.
            for (const v of adj.get(currEmp)) {
                //Adds each subordinate to the queue, setting their
                //  receive time as:
                //currTime (when manager got info) + informTime[currEmp]
                //  (time manager takes to inform subordinates)
                queue.push([v, currTime + informTime[currEmp]]);
            }
        }
    }
    return maxTime;
}
/*
n: number of employees
headID: the head of the company
manager: array where manager[i] is the direct manager of employee i
informTime: array as before

The code builds a tree (adjacency list) to 
represent the company hierarchy.
It uses BFS to simulate information spreading,
 tracking the time each employee receives the info.
The answer is the maximum time taken for
 any employee to be informed.

*/
var numOfMinutes = function (n, headID, manager, informTime) {
    //Creates an empty Map to represent the adjacency list.
    const adj = new Map();
    //Loops through all employees to build the adjacency list.
    for (let i = 0; i < n; i++) {
        const child = i; //child: current employee's ID
        const manager_i = manager[i]; //manager_i: manager of the current employee
        //Checks if the employee has a manager (not the head).
        if (manager_i !== -1) {
            //If the manager is not in the adjacency list, 
            // adds them with an empty list.
            if (!adj.has(manager_i)) {
                adj.set(manager_i, []);
            }
            //Adds the current employee as a subordinate of their manager.
            adj.get(manager_i).push(child);
        }
    }
    return BFS(adj, informTime, headID);
}
//let n = 6, headID = 2, manager = [2, 2, -1, 2, 2, 2], informTime = [0, 0, 1, 0, 0, 0];
n = 15;
headID = 0;
manager = [-1, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
informTime = [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
let res = numOfMinutes(n, headID, manager, informTime);

console.log("numOfMinutes==", res);