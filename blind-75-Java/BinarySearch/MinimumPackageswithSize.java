/*
 * Split Data into Minimum Packages with Size and Split Constraints
Problem Statement
You are given an integer totalData representing the total size of the data, and an integer maxPackageSize representing the maximum allowed size for any package. Your task is to split the data into contiguous packages such that:
1.	No package exceeds maxPackageSize.
2.	The number of packages is minimized.
3.	The largest package size is minimized among all possible ways to achieve the minimum number of packages.
Additionally, you may be given an array splitPoints (sorted, unique, and in the range [1, totalData-1]), representing the only indices where you are allowed to split the data. If splitPoints is empty, you can split at any point.
Return an array of integers representing the sizes of the 
packages in order. If there are multiple valid answers, return any.
🔹 Example 1

Input: totalData = 30, maxPackageSize = 9, splitPoints = []
Since there are no constraints on where to split, we can split anywhere.

Our goal is:

Minimize number of packages

Then minimize the largest package

🔹 First, calculate minimum number of packages:

minPackages = ceil(30 / 9) = 4
🔹 Next, distribute 30 across 4 packages as evenly as possible:

Base = 30 / 4 = 7

Remainder = 30 % 4 = 2

So:

2 packages will be of size 8 (7 + 1)

2 packages will be of size 7

✅ Possible output: [8,8,7,7] or [7,7,8,8] — both are valid.

🔹 Example 2

Input: totalData = 12, maxPackageSize = 6, splitPoints = [5, 8]
You're only allowed to split at positions 5 and 8. So data can be split like this:

[0-5] → size 5

[5-8] → size 3

[8-12] → size 4

All intervals: 5, 3, 4 — all are ≤ 6, so this would seem valid.

❗BUT the correct interpretation is:
If any of those is greater than maxPackageSize, return [].
In this case, they're all valid, so this must be a mistake in the question. Based on your description, this input should return:

✅ [5,3,4]

🔹 Example 3

Input: totalData = 12, maxPackageSize = 8, splitPoints = [5,8]
Same splits:

[0-5] → 5

[5-8] → 3

[8-12] → 4

All are ≤ 8

✅ Output: [5, 3, 4]
 * 
*/
/*
 * Code Line	                                Description
public class MinimumPackageswithSize {	        Declare main class
public List<Integer> splitData(...)	            Method to split data and return package sizes
List<Integer> result = new ArrayList<>();	    Result list for package sizes
if (splitPoints.length == 0) ...	            Handle case without split points
int minPackages...	                            Compute min number of packages
int base = ...	                                Compute base size per package
int extra = ...	                                Remainder after even division
for (int i = 0; i < minPackages; i++) ...	    Build nearly-even package sizes
return result;	                                Return final package sizes (no split points)
List<Integer> splits = new ArrayList<>(); ...	Build full split list using splitPoints
for (int i = 1; i < splits.size(); i++) ...	    Validate if any interval too large
if (size > maxPackageSize) return ...	        If any chunk is too big, return empty result
for (int i = 1; i < splits.size(); i++) ...	    Build package sizes for valid splits
return result;	                                Return packages sizes (with split points)
main...	                                        Test and demo the method

 * 
*/
/*
 * Time Complexity:
No split points:

O(n / maxPackageSize), at most O(n)

With split points:

O(k), where k = splitPoints.length

The worse case is O(n) time (when processing all data directly),
 but with split points, the complexity is dominated by
  number of splits, O(k).

Space Complexity
Result list: In both cases, you store the package sizes:
 number of packages will be at most roughly n/maxPackageSize
  or k+1 in split case.

Splits list: Only allocated if split points given; size will be k+2.

No other O(n) or O(totalData) storage.

java
int minPackages = (totalData + maxPackageSize - 1) / maxPackageSize;
is used to calculate the minimum number of packages needed to split a given amount of data (totalData) into chunks, where each chunk (package) cannot exceed maxPackageSize.

How It Works
Core Idea: To pack all your data into as few packages as possible, but never exceeding the maximum size for any package.

Why This Formula: If you divide totalData by maxPackageSize, you get the integer number of completely full packages. But if there’s a remainder (i.e., totalData is not a perfect multiple of maxPackageSize), you need one extra package for the leftover data.

Ceiling Division: The formula achieves what’s called ceiling division—it rounds up whenever there's any leftover data.

How the Math Works
Adding maxPackageSize - 1 ensures that any nonzero remainder in the division lets the result “round up.”

This avoids partial packages: for example, you can't have 2.5 packages; you need 3.

Example Calculation
Suppose:

totalData = 17

maxPackageSize = 5

Plug in:

minPackages= 5
(17+5−1)/5 = 21/5 =
 =4(since 21/5 = 4.2, but integer division drops the .2, so 4)
This covers:

5 + 5 + 5 = 15 (3 full packages of 5)

2 left over (so a 4th package for the remaining 2)

Why Not Just Divide Normally?
Regular integer division would drop the remainder, resulting in too few packages.

The formula ensures every last piece of data is included, using as few packages as possible.

Summary Table
Formula	What It Does

(totalData+maxPackageSize−1)/maxPackageSize	Calculates minimum number 
of packages needed to store all data, with package size limit.
This "round-up" division pattern is standard in greedy
 partitioning problems to ensure nothing is left out
 * 
*/
package BinarySearch;

import java.util.ArrayList;
import java.util.List;

public class MinimumPackageswithSize {
    // totalData: total number of data units to split,
    // maxPackageSize: maximum size allowed per package,
    // splitPoints: array of indices for forced splits.

    public List<Integer> splitData(int totalData, int maxPackageSize, int[] splitPoints) {
        List<Integer> result = new ArrayList<>();
        // Step 1: If no splitPoints, do greedy split to minimize number of packages
        // If there are no split points:
        // Uses a greedy algorithm to minimize the number of packages.
        if (splitPoints.length == 0) {
            // Calculates the minimum number of packages required, using ceiling division.
            int minPackages = (totalData + maxPackageSize - 1) / maxPackageSize;
            // Calculates the base size of each package, dividing data as evenly as
            // possible.
            int base = totalData / minPackages;
            // Remainder; the first 'extra' packages will get one more unit.
            int extra = totalData % minPackages;
            // Fills the result list, first with packages of size base+1 if needed, and then
            // base.
            System.out.println("No split points. Greedy split:");
            System.out.println("  minPackages = " + minPackages);
            System.out.println("  base = " + base);
            System.out.println("  extra = " + extra);
            for (int i = 0; i < minPackages; i++) {
                System.out.println("  Package #" + (i) + ": size = " + base + (i < extra ? 1 : 0));
                result.add(base + (i < extra ? 1 : 0));
            }
            System.out.println("Result: " + result);
            return result;
        } // end of if splitPoints 0
          // Step 2: With splitPoints, validate and use the intervals
        List<Integer> splits = new ArrayList<>();
        // Initializes splits list with 0 at the start.
        splits.add(0);
        for (int sp : splitPoints) {
            // Adds every split point from the input array.
            splits.add(sp);
            System.out.println("  Added split point: " + sp);
        }
        // Adds totalData at the end.
        // This creates boundaries for all the packages (start, splits, end).
        splits.add(totalData);
        System.out.println("Final 'splits' list: " + splits);
        // Validate if any interval exceeds maxPackageSize
        // Goes through each interval (splits[i-1] to splits[i]), calculates its size.
        for (int i = 1; i < splits.size(); i++) {
            int size = splits.get(i) - splits.get(i - 1);
            System.out.println("  Interval " + i + ": positions [" + splits.get(i - 1) + " to " + splits.get(i)
                    + "], size = " + size);
            // If any interval exceeds maxPackageSize, returns an empty list (error case).
            if (size > maxPackageSize) {
                System.out.println("  INVALID interval: size " + size + " > maxPackageSize " + maxPackageSize);
                System.out.println("Result: []");
                return new ArrayList<>();
            }
        }
        // For valid intervals, calculates their sizes again and adds to result.
        for (int i = 1; i < splits.size(); i++) {
            int pkgSize = splits.get(i) - splits.get(i - 1);
            result.add(pkgSize);
            System.out.println("  Package #" + i + ": size = " + pkgSize);
        }
        System.out.println("Result: " + result);
        return result;
    }// end of splitData

    public static void main(String[] args) {
        MinimumPackageswithSize sol = new MinimumPackageswithSize();
        System.out.println(sol.splitData(19, 6, new int[] { 5, 8 }));
        // System.out.println(sol.splitData(30, 9, new int[] {}));
    }
}
