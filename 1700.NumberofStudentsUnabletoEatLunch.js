/*
1700. Number of Students Unable to Eat Lunch

Solution - https://leetcode.com/problems/number-of-students-unable-to-eat-lunch/solutions/5159107/optimised/

Description
The school cafeteria offers circular and square sandwiches at lunch break, referred to by numbers 0 and 1 respectively. All students stand in a queue. Each student either prefers square or circular sandwiches.

The number of sandwiches in the cafeteria is equal to the number of students. The sandwiches are placed in a stack. At each step:

If the student at the front of the queue prefers the sandwich on the top of the stack, they will take it and leave the queue.
Otherwise, they will leave it and go to the queue's end.
This continues until none of the queue students want to take the top sandwich and are thus unable to eat.

You are given two integer arrays students and sandwiches where sandwiches[i] is the type of the i​​​​​​th sandwich in the stack (i = 0 is the top of the stack) and students[j] is the preference of the j​​​​​​th student in the initial queue (j = 0 is the front of the queue). Return the number of students that are unable to eat.

 

Example 1:

Input: students = [1,1,0,0], sandwiches = [0,1,0,1]
Output: 0 
Explanation:
- Front student leaves the top sandwich and returns to the end of the line making students = [1,0,0,1].
- Front student leaves the top sandwich and returns to the end of the line making students = [0,0,1,1].
- Front student takes the top sandwich and leaves the line making students = [0,1,1] and sandwiches = [1,0,1].
- Front student leaves the top sandwich and returns to the end of the line making students = [1,1,0].
- Front student takes the top sandwich and leaves the line making students = [1,0] and sandwiches = [0,1].
- Front student leaves the top sandwich and returns to the end of the line making students = [0,1].
- Front student takes the top sandwich and leaves the line making students = [1] and sandwiches = [1].
- Front student takes the top sandwich and leaves the line making students = [] and sandwiches = [].
Hence all students are able to eat.
Example 2:

Input: students = [1,1,1,0,0,1], sandwiches = [1,0,0,0,1,1]
Output: 3
 

Constraints:

1 <= students.length, sandwiches.length <= 100
students.length == sandwiches.length
sandwiches[i] is 0 or 1.
students[i] is 0 or 1.

*/
/*
Approach:
Initialize variables:
n is assigned the length of the students array.
studentArray is initialized as an array of length 2 with all elements set to 0.
studentArray will store the count of students who like circular sandwiches.
studentArray will store the count of students who like square sandwiches.
Count student preferences:
The code iterates through the students array using a for...of loop.
For each student, it increments the corresponding count in the studentArray.
Serve sandwiches:
The code then iterates through the sandwiches array using a for loop.
For each sandwich, it checks if there are any students left who like that type of sandwich.
If there are no students left who like the current sandwich, it returns the remaining number of students (n - i).
If there are students left who like the current sandwich, it decrements the corresponding count in the studentArray.
Return remaining students:
If all sandwiches have been served, it returns 0, indicating that all students have been served.

Time Complexity:

Counting student preferences: O(n)
The first loop iterates through the students array of length n.
Serving sandwiches: O(n)
The second loop iterates through the sandwiches array of length n.
Total Time Complexity: O(n)
The overall time complexity is O(n) where n is the length of the input arrays.

Space Complexity:

studentArray: O(1)
The space used by the studentArray is constant, as it has a fixed size of 2.
Other variables: O(1)
Additional space used by variables like n and x is constant.
Total Space Complexity: O(1)
The overall space complexity is O(1) as the space usage does not depend on the input size.
*/

var countStudents = function(students, sandwiches) {
    let n = students.length;
    let studentArray=[0,0]; //arr[0] = count of students who like circular 0, arr[1] = count of students who like square 1
    for(let x of students){
        studentArray[x]++;
    }
    for(let i=0;i<n;i++){
        if(studentArray[sandwiches[i]] === 0){
            return n-i;
        }
        studentArray[sandwiches[i]]--
    }
    return 0;
};

let students = [1,1,1,0,0,1], sandwiches = [1,0,0,0,1,1];
students = [1,1,0,0], sandwiches = [0,1,0,1];
console.log(countStudents(students, sandwiches));
