package Backtracking;

import java.util.List;
import java.util.LinkedList;
import java.util.Set;
import java.util.HashSet;
import java.util.ArrayList;
/* 
public class NonDecreasingSubsequences491 {
    int n;
    public List<List<Integer>> findSubsequences(int[] nums) {
        n = nums.length;
        List<List<Integer>> result = new LinkedList<>();
        LinkedList<Integer> curr   = new LinkedList<Integer>();
        
        dfs(nums, 0, curr, result);
        
        return result;
    }
    
    private void dfs(int[] nums, int idx, LinkedList<Integer> curr, List<List<Integer>> result) {
        if(curr.size()>1) 
            result.add(new LinkedList<Integer>(curr));
        
        Set<Integer> used = new HashSet<>();
        
        for(int i = idx; i<n; i++){
            
            if((curr.size() ==0 || nums[i] >= curr.peekLast()) && !used.contains(nums[i])) {
                used.add(nums[i]);
                
                curr.add(nums[i]); 
                
                dfs(nums, i+1, curr, result);
                
                curr.remove(curr.size()-1);
            }
        }
    }

    public static void main(String[] args){
        int[] nums = {4,6,7,7};
        NonDecreasingSubsequences491 sol = new NonDecreasingSubsequences491();
        List<List<Integer>> result = sol.findSubsequences(nums);
        System.out.println(result);
    }
}
    */

public class NonDecreasingSubsequences491 {
    int n;

    public List<List<Integer>> findSubsequences(int[] nums) {
        n = nums.length;
        List<List<Integer>> result = new ArrayList<>();
        List<Integer> curr = new ArrayList<>();
        dfs(nums, 0, curr, result);
        return result;
    }

    private void dfs(int[] nums, int idx, List<Integer> curr, List<List<Integer>> result) {
        if (curr.size() > 1) {
            result.add(new ArrayList<>(curr));
        }
        Set<Integer> used = new HashSet<>();
        for (int i = idx; i < n; i++) {
            if ((curr.isEmpty() || nums[i] >= curr.get(curr.size() - 1)) && !used.contains(nums[i])) {
                used.add(nums[i]);
                curr.add(nums[i]);
                dfs(nums, i + 1, curr, result);
                curr.remove(curr.size() - 1);
            }
        }
    }

    public static void main(String[] args) {
        int[] nums = { 4, 6, 7, 7 };
        NonDecreasingSubsequences491 sol = new NonDecreasingSubsequences491();
        List<List<Integer>> result = sol.findSubsequences(nums);
        System.out.println(result);
    }
}
