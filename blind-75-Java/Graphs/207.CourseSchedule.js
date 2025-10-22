/*
207. Course Schedule

Description
You are given an array prerequisites where 
prerequisites[i] = [a, b] indicates that you must take 
course b first if you want to take course a.

The pair [0, 1], indicates that must take course 1 before taking course 0.

There are a total of numCourses courses you are required to take,
 labeled from 0 to numCourses - 1.

Return true if it is possible to finish all courses, otherwise return false.

Example 1:

Input: numCourses = 2, prerequisites = [[0,1]]

Output: true
Explanation: First take course 1 (no prerequisites) and then take course 0.

Example 2:

Input: numCourses = 2, prerequisites = [[0,1],[1,0]]

Output: false
Explanation: In order to take course 1 you must take course 0,
 and to take course 0 you must take course 1. So it is impossible.

 */
/*
prerequisite is the key because, for every [course, prerequisite] pair in the prerequisites array, the problem definition says:
"to take course course, one must take course prerequisite first"—so there is a directed edge from prerequisite to course in the course dependency graph.
This means:

prerequisite: the course that must be completed first (source of the edge)

course: the course that depends on prerequisite (destination of the edge)

So, for each entry [a, b] in prerequisites:

Course b must be taken before course a

There’s an edge from b → a

Thus, adjacencyList[b].push(a) (i.e., list at index b contains all courses that depend on b directly).

This structure allows quick lookup: “Given that I’ve finished course X, what courses can I now take next?”—simply scan adjacencyList[X]
*/
var canFinish = function (numCourses, prerequisites) {
    /*
        Adjacency List: Stores which courses depend on each course

        Example: If course A is prerequisite for B, adjacencyList[A] contains B

        In-degree Array: Tracks how many prerequisites each course requires

        Example: If course B needs 2 prerequisites, inDegree[B] = 2
    */
    // Create an adjacency list to represent the graph of courses
    //const adjacencyList = new Array(numCourses).fill(0).map(() => []);
   // const adjacencyList = Array.from({ length: numCourses }, () => []);

    const adjacencyList = [];
    for (let i = 0; i < numCourses; i++) {
        adjacencyList.push([]);
    }
    // Array to store the in-degree (number of dependencies) of each course
    const inDegree = new Array(numCourses).fill(0);
    console.log("adjacencyList initial==",adjacencyList);
    console.log("inDegree initial==",inDegree)
    // Fill the adjacency list and in-degree array based on prerequisites
    /*
    Converts prerequisites into directed edges
    Example: `` means 0 → 3 (course 3 requires course 0)
    Visual representation:
    0 → 3
    ↑   ↓
    1 ← 2
    */
    for (const [course, prerequisite] of prerequisites) {
        adjacencyList[prerequisite].push(course);
        inDegree[course]++;
    }
    console.log("adjacencyList final==",adjacencyList);
    console.log("inDegree final==",inDegree)
    // Queue for courses with no prerequisites (in-degree of 0)
    const queue = [];
    // Initialize the queue with courses that have no prerequisites
   // Queue Initialization (Kahn's Algorithm)
   //Finds starting points with zero dependencies
    //These courses can be taken immediately

    for (let i = 0; i < numCourses; ++i) {
        if (inDegree[i] === 0) {
            queue.push(i);
        }
    }
    console.log("queue==",queue)
    // Counter for the number of courses with satisfied prerequisites
    let count = 0;
    while (queue.length) {
        // Remove the first course from the queue
        const currentCourse = queue.shift();
        // Increment the count of courses that can be taken
        count++;
        // Decrease the in-degree of the adjacent courses and
        // add them to the queue if they have no other prerequisites
        /*
        Take course from queue (no remaining prerequisites)
        Reduce dependencies for all courses that required it
        Add courses to queue when their dependencies reach zero
        */
       // console.log("currentCourse==",currentCourse);
        for (const adjacentCouse of adjacencyList[currentCourse]) {
         //   console.log("inDegree[adjacentCouse]==",inDegree[adjacentCouse])
            inDegree[adjacentCouse]--;
            if (inDegree[adjacentCouse] === 0) {
                queue.push(adjacentCouse);
                console.log("queue==",queue);
            }
        }
    }
    // Compare the count of courses taken to the total number of courses
    // Valid completion: Processed all courses (count == numCourses)

   // Cycle detected: Some courses remain unprocessed (count < numCourses)
    return count === numCourses;
};
//This implementation efficiently
//  detects cycles using O(V+E) time complexity (V=vertices, E=edges) 
// and O(V) space complexity.
//let numCourses = 2, prerequisites = [[0, 1]];
let numCourses = 2, prerequisites = [[0,1],[1,0]];
console.log(canFinish(numCourses, prerequisites));

