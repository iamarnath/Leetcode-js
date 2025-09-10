/*
 * Problem Statement
You are given a list of commits, each with a unique 
integer id from 1 to N (in increasing order), and an 
associated performance score. The performance score for 
each commit is a non-increasing sequence (no commit improves 
performance over its predecessor). A lower score means worse performance.
You have access to a function:
boolean worseCommit(int commit1, int commit2)

which returns true if commit2 is worse than commit1, 
and false otherwise.
Your task is to find all commits that introduce a 
performance regression compared to their immediate 
predecessor. Specifically, return a list of the first 
commit id of each regression segment (i.e., the first 
commit where the performance drops compared to the previous commit).
Example
Input:
commits: [1, 2, 3, 4, 5, 6, 7, 8, 9]
performance: [10, 10, 10, 8, 8, 8, 5, 5, 5]

Output:
[4, 7]

Explanation:
•	Commits 1, 2, 3: performance 10 (no regression)
•	Commit 4: performance drops to 8 (regression starts at 4)
•	Commits 5, 6: performance 8 (no further drop)
•	Commit 7: performance drops to 5 (regression starts at 7)
•	Commits 8, 9: performance 5
Function Signature
List<Integer> findRegressionCommits(int[] commits, int[] performance)


 * 
*/

import java.util.*;

public class RegressionCommits {
    boolean worseCommit(int commit1, int commit2, int[] commits, int[] performance) {
        int idx1 = -1, idx2 = -1;
        for (int i = 0; i < commits.length; i++) {
            if (commits[i] == commit1)
                idx1 = i;
            if (commits[i] == commit2)
                idx2 = i;

        }
        return performance[idx2] < performance[idx1];
    }

    public List<Integer> findRegressionCommits(int[] commits, int[] performance) {
        List<Integer> result = new ArrayList<>();
        for (int i = 1; i < commits.length; i++) {
            if (worseCommit(commits[i - 1], commits[i], commits, performance)) {
                result.add(commits[i]);
            }
        }
        return result;
    }

    public static void main(String[] args) {
        RegressionCommits sol = new RegressionCommits();
        int[] commits = { 1, 2, 3, 4, 5, 6, 7, 8, 9 };
        int[] performance = { 10, 10, 10, 8, 8, 8, 5, 5, 5 };
        List<Integer> res = sol.findRegressionCommits(commits, performance);
        System.out.println(res);
    }
}
