/*
210. Course Schedule II

There are a total of numCourses courses you have to take,
 labeled from 0 to numCourses - 1. You are given an array 
 prerequisites where prerequisites[i] = [ai, bi] indicates
  that you must take course bi first if you want to take course ai.

For example, the pair [0, 1], indicates that to take
 course 0 you have to first take course 1.
Return the ordering of courses you should take to 
finish all courses. If there are many valid answers,
 return any of them. If it is impossible to finish all courses,
  return an empty array.

 

Example 1:

Input: numCourses = 2, prerequisites = [[1,0]]
Output: [0,1]
Explanation: There are a total of 2 courses to take.
 To take course 1 you should have finished course 0. So the
  correct course order is [0,1].
Example 2:

Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
Output: [0,2,1,3]
Explanation: There are a total of 4 courses to take. 
To take course 3 you should have finished
 both courses 1 and 2. Both courses 1 and 2 should be
  taken after you finished course 0.
So one correct course order is [0,1,2,3].
 Another correct ordering is [0,2,1,3].
Example 3:

Input: numCourses = 1, prerequisites = []
Output: [0]
 

Constraints:

1 <= numCourses <= 2000
0 <= prerequisites.length <= numCourses * (numCourses - 1)
prerequisites[i].length == 2
0 <= ai, bi < numCourses
ai != bi
All the pairs [ai, bi] are distinct.

*/
/*
1. Data Structures
Adjacency List (adj): Stores directed edges representing course dependencies
Indegree Array: Tracks number of prerequisites for each course
Queue: Manages nodes ready for processing (0 prerequisites remaining)
Result Array: Stores valid topological order

2. Algorithm Steps
Initialization:
Build adjacency list from prerequisites
Populate indegree counts for each course

Processing:
Start with courses having 0 prerequisites
For each processed course:
Reduce neighbor's indegree count
Add neighbor to queue if indegree reaches 0
Track processed course count

Cycle Check:

If processed count matches total courses → valid order
Otherwise → cyclic dependency exists

3. Complexity
Time: O(V + E) - Linear in number of courses and prerequisites
Space: O(V) - For storing adjacency list and intermediate structures

*/
// using Breadth First search
var findOrder = function (numCourses, prerequisites) {
    const adj = {};
    //const indegree = new Array(numCourses).fill(0);
    const indegree = Array.from({ length: numCourses }, () => 0);

    //build graph and indegree array
    for (const [course, prereq] of prerequisites) {
        if (!adj[prereq]) adj[prereq] = [];
        adj[prereq].push(course);
        indegree[course]++;
    }
    // Kahn's algorithm implementation
    const topologicalSort = () => {
        const queue = [];
        const result = [];
        let count = 0;
        // Initialize queue with 0-indegree nodes
        for (let i = 0; i < numCourses; i++) {
            if (indegree[i] === 0) {
                queue.push(i);
                result.push(i);
                count++;
            }
        }
        // Process nodes
        while (queue.length > 0) {
            const u = queue.shift();
            // Process neighbors (if any)
            const neighbors = adj[u] || [];
            for (const v of neighbors) {
                indegree[v]--;
                if (indegree[v] === 0) {
                    result.push(v);
                    count++;
                    queue.push(v);
                }
            } // end of for
        } // end of while
        return count === numCourses ? result : [];
    };
    return topologicalSort();

}
//using Depth first search
var findOrderDFS = function(numCourses, prerequisites) {
    // Build adjacency list
    const adj = {};
    for (const [course, prereq] of prerequisites) {
        if (!adj[prereq]) adj[prereq] = [];
        adj[prereq].push(course);
    }
    // State arrays
    const visited = new Array(numCourses).fill(false);
    const inRecursion = new Array(numCourses).fill(false);
    let hasCycle = false;
    const stack = [];
    // DFS function
    function DFS(u){
        visited[u] = true;
        inRecursion[u] = true;
        const neighbors = adj[u] || [];
        for(const v of neighbors){
            if(inRecursion[v]){
                hasCycle = true;
                return;
            }
            if(!visited[v]){
                DFS(v);
                if(hasCycle) return; //  Early exit if cycle found
            }
        }// end of for
        stack.push(u);
        inRecursion[u] = false;
    }
    // Call DFS for each node
    for(let i=0;i<numCourses;i++){
        if(!visited[i]){
            DFS(i);
            if(hasCycle) break;
        }
    } // end of for

    if(hasCycle) return [];
    // Reverse stack to get the topological order
    return stack.reverse();
};

let numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]];

console.log(findOrderDFS(numCourses,prerequisites));