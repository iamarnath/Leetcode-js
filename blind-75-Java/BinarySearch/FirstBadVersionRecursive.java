/*
 Recursive First Bad Version with Minimal API Calls
You are a product manager overseeing the deployment of product versions from 1 to n. You know that versions starting from a certain version bad (unknown) are faulty, and all versions after bad are also faulty.
You have access to an API 

which returns true if the version is bad, otherwise false. Task:
Implement a recursive function that finds the first bad version using as few calls to isBadVersion
as possible.

Constraints
  1 <= n <= 2^31 - 1 (versions can be up to Integer.MAX_VALUE   There is at least one bad version.
  Minimize isBadVersion calls with recursion.
  Avoid integer overflow when calculating midpoints.

  Example 

  Input: n = 5, bad version = 4
Output: 4

Explanation:
Calls sequence might be: isBadVersion(3) -> false, isBadVersion(5) -> true
Then recurse to find the first bad version is 4.


 * 
*/

/*
 Explanation
  The function recursively narrows down the range [left, right].
     On each step:
  If mid is bad, recursively search left half including mid.  
   Else search right half after mid.
  When left == right, it's the first bad version.
  Using left + (right - left)/2 avoids integer overflow.  
   Time complexity: O(log n)
  Space complexity: O(log n) due to recursion stack.
 
 
*/

package BinarySearch;


public class FirstBadVersionRecursive {
    private int firstBad = 4;
    public boolean isBadVersion(int version) {
        return version >= firstBad;
    }
    public int firstBadVersion(int n){
        return recursiveBinarySearch(1,n);
    }
    public int recursiveBinarySearch(int left,int right){
        if(left == right){
            return left;
        }
        int mid = left + (right-left)/2;
        if(isBadVersion(mid)){
            return recursiveBinarySearch(left,mid);
        }
        else{
            return recursiveBinarySearch(mid+1,right);
        }
    }
    public static void main(String[] args){
        FirstBadVersionRecursive  sol =new FirstBadVersionRecursive();
        int n= 6;
        int result = sol.firstBadVersion(n);
        System.out.println(result);
    }
}
