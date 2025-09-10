package BinarySearch;

public class FirstBadVersion278 {
        // Let first bad version be 4 for this example
    private int firstBad = 2;
    public boolean isBadVersion(int version) {
        return version >= firstBad;
    }
    public int firstBadVersion(int n) {
        int low=1;
        int high=n;
        int mid;
        int result = n;
        while(low <= high){
            mid = low + (high-low)/2;
            if(isBadVersion(mid)){
                result = mid;
                high = mid-1;
            }
            else{
                low = mid+1;
            }
        }
        return result;
    }
    public static void main(String[] args){
        FirstBadVersion278  sol =new FirstBadVersion278();
        int n= 6;
        int result = sol.firstBadVersion(n);
        System.out.println(result);
    }
}
