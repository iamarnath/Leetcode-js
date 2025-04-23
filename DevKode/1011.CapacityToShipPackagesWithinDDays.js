/*
1011. Capacity To Ship Packages Within D Days

Solution - https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/solutions/5114729/optimised/

Description
A conveyor belt has packages that must be shipped from one port to another within days days.

The ith package on the conveyor belt has a weight of weights[i]. Each day, we load the ship with packages on the conveyor belt (in the order given by weights). We may not load more weight than the maximum weight capacity of the ship.

Return the least weight capacity of the ship that will result in all the packages on the conveyor belt being shipped within days days.

Example 1:

Input: weights = [1,2,3,4,5,6,7,8,9,10], days = 5
Output: 15
Explanation: A ship capacity of 15 is the minimum to ship all the packages in 5 days like this:
1st day: 1, 2, 3, 4, 5
2nd day: 6, 7
3rd day: 8
4th day: 9
5th day: 10

Note that the cargo must be shipped in the order given, so using a ship of capacity 14 and splitting the packages into parts like (2, 3, 4, 5), (1, 6, 7), (8), (9), (10) is not allowed.
Example 2:

Input: weights = [3,2,2,4,1,4], days = 3
Output: 6
Explanation: A ship capacity of 6 is the minimum to ship all the packages in 3 days like this:
1st day: 3, 2
2nd day: 2, 4
3rd day: 1, 4
Example 3:

Input: weights = [1,2,3,1,1], days = 4
Output: 3
Explanation:
1st day: 1
2nd day: 2
3rd day: 3
4th day: 1, 1
 

Constraints:

1 <= days <= weights.length <= 5 * 104
1 <= weights[i] <= 500
*/

/*
Time Complexity

The time complexity of this solution is O(n log m), where n is the length of the weights array, and m is the sum of all the weights in the array.
The key steps are:
Initializing the left and right bounds for the binary search: This takes O(n) time, as we need to iterate through the weights array to find the maximum weight and the total weight.
Performing the binary search: The binary search itself takes O(log m) time, as we are narrowing down the search space by half in each iteration.
Checking the feasibility of a given capacity: This step takes O(n) time, as we need to iterate through the weights array to calculate the required number of days.
The overall time complexity is the combination of these steps, resulting in O(n log m).

Space Complexity

The space complexity of this solution is O(1), as we only use a constant amount of extra space to store the left, right, and requiredDays variables.

Approach -

The approach used in this solution is a binary search to find the minimum capacity needed to ship all the weights within the given number of days.
The key steps are:
Initialize the left and right bounds for the binary search:
left is set to the maximum weight in the weights array, as this is the minimum capacity needed to ship any single item.
right is set to the sum of all the weights in the weights array, as this is the maximum capacity needed to ship all the items in a single day.
Define a helper function check(maxCapacity) that determines if it's possible to ship all the weights within the given days:
Initialize currentWeightSum to keep track of the current weight in the current shipment.
Initialize requiredDays to 1, as the minimum number of days needed.
Iterate through the weights array:
Add the current weight to currentWeightSum.
If currentWeightSum exceeds the maxCapacity, reset currentWeightSum to the current weight and increment requiredDays.
Return true if requiredDays is less than or equal to the given days, false otherwise.
Perform a binary search to find the minimum capacity needed:
While left is less than right:
Calculate the mid value as the average of left and right.
Call the check(mid) function to determine if it's possible to ship all the weights within the given days.
If it's possible, update right to mid to search for a smaller capacity.
Otherwise, update left to mid + 1 to search for a larger capacity.
Return the final left value, which represents the minimum capacity needed to ship all the weights within the given days.
This approach is efficient because it uses a binary search to narrow down the search space, reducing the time complexity from the naive approach of trying all possible capacities.
*/
var shipWithinDays = function (weights, days) {
    // Initialize the lower and upper bounds for the binary search
    let left = 0;
    let right = 0;
    for (let weight of weights) {
        left = Math.max(left, weight);
        right += weight;
    }
    const check = (maxCapacity) => {
        // Current total weight in the current shipment
        let currentWeightSum = 0;
        // Start with 1 day, the minimum possible
        let requiredDays = 1;
        for (const w of weights) {
            currentWeightSum += w;
            // If adding the current weight exceeds max capacity, need a new shipment (next day)
            if (currentWeightSum > maxCapacity) {
                // Reset the currentWeightSum with the current weight as the start for the next day
                currentWeightSum = w;
                // Increment the day counter as we move to the next day
                ++requiredDays;
            }
        }
        // Return true if the number of required days is less than or equal to the given days, false otherwise
        return requiredDays <= days;
    }

    // Perform a binary search to find the minimum capacity needed to ship within 'days'
    while (left < right) {
        const mid = Math.floor((left+right)/2);
        // If it's possible to ship with this capacity, reduce the upper bound to midCapacity
        if(check(mid)){
            right=mid;
        }
        else{
            // Otherwise, increase the lower bound just above midCapacity
            left = mid+1;
        }
    }
    return left;
};

let weights = [1, 2, 3, 1, 1], days = 4;
//weights = [1,2,3,4,5,6,7,8,9,10], days = 5
console.log(shipWithinDays(weights, days));