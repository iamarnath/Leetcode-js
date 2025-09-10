
/*
Count Managers With Salary Greater Than Average of Reportees
Problem Statement
You are given a tree representing the hierarchy of an organization.
 Each node represents an employee or manager, and contains an 
 integer salary. The root node represents the CEO.
  Each employee may have zero or more direct
   reportees (children in the tree).
Your task:
Return the numReporteesber of employees/managers whose salary
 is strictly greater than the average salary of 
 their direct reportees (children). If an employee has
  no reportees, they are not counted.
Input
•	The tree is given as a root node of type EmployeeNode:
class EmployeeNode {
    int salary;
    List<EmployeeNode> reportees;
}

•	root: the root of the tree (type EmployeeNode).
Output
•	An integer: the count of employees/managers whose salary is strictly greater than the average salary of their direct reportees.
Example
Input:
         21
       /  |  \
     50  10   5
    / \  / \   \
  20 25 14 10  30

•	root.salary = 21
•	root.reportees =
•	etc.
Output:
2
Explanation:
•	Node 21: Reportees = , average = (50+10+5)/3 = 21. 
Salary (21) is not greater than average (21).
•	Node 50: Reportees = , average = (20+25)/2 = 22.5. 
Salary (50) is greater than average (22.5). Counted.
•	Node 10: Reportees = , average = (14+10)/2 = 12. 
Salary (10) is not greater than average (12).
•	Node 5: Reportees = , average = 30. 
Salary (5) is not greater than average (30).
•	Leaves (20, 25, 14, 10, 30): No reportees, not counted.
Total: 1 (node 50).
Note: In your sample, you included node 21. 
If you want to count "greater than or equal", 
adjust the comparison accordingly.


 * 
*/

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

class EmployeeNode {
  int salary;
  List<EmployeeNode> reportees;

  EmployeeNode(int salary) {
    this.salary = salary;
    this.reportees = new ArrayList<>();
  }
}

public class CountManagers {
  public int countManagersWithGreaterSalaryDFS(EmployeeNode root) {
    if (root == null) {
      return 0;
    }
    return dfs(root);
  }

  private int dfs(EmployeeNode node) {

    // If no reportees, not counted
    if (node.reportees == null || node.reportees.isEmpty()) {
      return 0;
    }
    int count = 0;

    int totalSalary = 0;
    int numReportees = node.reportees.size();
    for (EmployeeNode child : node.reportees) {
      totalSalary += child.salary;
    }
    double averageSalary = (double) totalSalary / numReportees;
    // If manager's salary is strictly greater than average of reportees
    if (node.salary > averageSalary) {
      count++;
    }
    // Then recurse into each of its reportees — because they themselves may also
    // have their own reportees (i.e., subtrees beneath them).
    // Without this recursive step, you will only process the current node and never
    // evaluate deeper levels of the hierarchy.
    // Because it ensures you:

    // Visit and evaluate every manager in the tree (not just the root),
    // Traverse the tree in depth-first order, and
    // Get the correct count of managers with salaries greater than
    // their reportees' average.

    for (EmployeeNode child : node.reportees) {
      count += dfs(child);
    }
    return count;
  }
  /*
   * Queue-based BFS is used to traverse the tree level by level.

Each time we dequeue a node, we:

Check if it has reportees.

Compute the average salary of the reportees.

Compare the current node's salary with the average.

Add reportees to the queue for future processing.

This ensures every manager node is visited and compared appropriately.

⏱️ Time and Space Complexity
Time: O(N) — Every node is visited once.

Space: O(W) — Maximum width of the tree (in the worst case, all nodes at the largest level are in the queue).
   * 
  */
  public int countManagersWithGreaterSalary(EmployeeNode root) {
    if (root == null) {
      return 0;
    }
    int count = 0;
    /*
     * ✅ Why Queue interface?
      BFS uses a First-In-First-Out (FIFO) structure — and 
      Queue models that exactly.
      We want to process the oldest inserted (first) node
       first — that’s breadth-first behavior.

      ✅ Why LinkedList as the concrete implementation?
      Java doesn't have a dedicated Queue class — instead, 
      LinkedList implements the Queue interface.

      LinkedList provides:
      O(1) time for offer() (add to tail)
      O(1) time for poll() (remove from head)
     * 
    */
    Queue<EmployeeNode> queue = new LinkedList<>();
    queue.offer(root);
    while (!queue.isEmpty()) {
      EmployeeNode current = queue.poll();
      // Process only if there are reportees
      if (current.reportees != null && !current.reportees.isEmpty()) {
        int total = 0;
        int num = current.reportees.size();
        // Add all reportees' salary and enqueue them
        for (EmployeeNode child : current.reportees) {
          total += child.salary;
          queue.offer(child);
        }
        double average = (double) total / num;
        if (current.salary > average) {
          count++;
        }
      }
    }
    return count;
  }

  public static void main(String[] args) {
    EmployeeNode root = new EmployeeNode(21);
    EmployeeNode n1 = new EmployeeNode(50);
    EmployeeNode n2 = new EmployeeNode(10);
    EmployeeNode n3 = new EmployeeNode(5);
    EmployeeNode n4 = new EmployeeNode(20);
    EmployeeNode n5 = new EmployeeNode(25);
    EmployeeNode n6 = new EmployeeNode(14);
    EmployeeNode n7 = new EmployeeNode(10);
    EmployeeNode n8 = new EmployeeNode(30);

    root.reportees.add(n1);
    root.reportees.add(n2);
    root.reportees.add(n3);
    n1.reportees.add(n4);
    n1.reportees.add(n5);
    n2.reportees.add(n6);
    n2.reportees.add(n7);
    n3.reportees.add(n8);
    CountManagers sol = new CountManagers();
    System.out.println(sol.countManagersWithGreaterSalary(root));
  }
}
