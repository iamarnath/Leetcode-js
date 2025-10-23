/*
739. Daily Temperatures
Given an array of integers temperatures 
represents the daily temperatures, return an array
 answer such that answer[i] is the number of 
 days you have to wait after the ith day to get
  a warmer temperature. If there is 
no future day for which this is possible, keep answer[i] == 0 instead.

Example 1:

Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]
Example 2:

Input: temperatures = [30,40,50,60]
Output: [1,1,1,0]
Example 3:

Input: temperatures = [30,60,90]
Output: [1,1,0]
 

Constraints:

1 <= temperatures.length <= 105
30 <= temperatures[i] <= 100
*/

/*
Time Complexity
Each index is pushed and popped at most once from the stack, so the overall time complexity is 

O(n), where 

n is the length of the temperatures array.

Space Complexity
The result array uses 

O(n) additional space, and the stack also uses at most 

O(n) space in the worst case, so the total space complexity is 

O(n).


*/
var dailyTemperatures = function(temperatures) {
    //Stores the length of the input array in n.
    const n = temperatures.length;
    //Initializes an empty stack to keep track of indices of unresolved days.
    const st = [];
    //Initializes the output array of size n filled with zeros.
    const result = new Array(n).fill(0);
    //Loops over all days from last to first (right to left).
    for (let i = n - 1; i >= 0; i--) {
        //While there are unresolved days (stack not empty) and 
        // the current day's temperature is greater than or equal 
        // to those unresolved days (i.e., those in stack at the top),
        //  pop those indices because those days won't have a 
        // warmer day sooner than today.
        while (st.length > 0 && temperatures[i] >= temperatures[st[st.length - 1]]) {
        //Remove that day from the stack 
        // because today is warmer (or same) and will answer for it.
            st.pop();
        }
        //If, after popping, the stack is empty, there’s no warmer day in the future.
        if (st.length === 0) {
            //No warmer day for today, so 0 remains.
            result[i] = 0;
        } else {
            //If, after popping, the stack is not empty, the top day is the next warmer day.
            //Distance to the next warmer day (index-wise difference).
            result[i] = st[st.length - 1] - i; // days
        }
        //Push the current day (index) 
        // onto the stack as a potential answer for earlier days.
        st.push(i);
    }
    
    return result;
};