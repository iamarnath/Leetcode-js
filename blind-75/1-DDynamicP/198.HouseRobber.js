/*
198. House Robber
You are given an integer array nums where nums[i]
 represents the amount of money the ith house has. 
 The houses are arranged in a straight line, i.e. 
 the ith house is the neighbor of the (i-1)th and (i+1)th house.

You are planning to rob money from the houses, but you 
cannot rob two adjacent houses because the security system 
will automatically alert the police if two adjacent houses were
 both broken into.

Return the maximum amount of money you can rob without 
alerting the police.

Example 1:

Input: nums = [1,1,3,3]

Output: 4
Explanation: nums[0] + nums[2] = 1 + 3 = 4.

Example 2:

Input: nums = [2,9,8,3,6]

Output: 16
Explanation: nums[0] + nums[2] + nums[4] = 2 + 8 + 6 = 16.

Constraints:

1 <= nums.length <= 100
0 <= nums[i] <= 100

*/

var rob = function(nums) {
    //No houses: Return 0 (nothing to steal).
    if(nums.length === 0) return 0;
    //One house: Return the value of that single house (you have no choice but to rob it).
    if(nums.length === 1) return nums[0];
    const dp = new Array(nums.length).fill(0);
    /*
    dp[i] stores the maximum loot possible up to the ith house.

    First house: You can only rob it → dp = nums[0].

    Second house: Choose the richer of the first
     two houses → dp = max(nums[0], nums[1]).
    */
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0],nums[1]);
    
    for(let i=2;i<nums.length;i++){
        /*
        For each house i starting from the third:
        Option 1: Skip house i → Keep the loot from the previous house (dp[i - 1]).
        Option 2: Rob house i → Add its value to the loot 
        from two houses back (nums[i] + dp[i - 2]).
        Choose the maximum of these two options.
        */
        dp[i] = Math.max(dp[i-1],nums[i]+dp[i-2]);
    }
    //The last element in dp contains
    //  the maximum loot possible for all n houses.
    return dp[nums.length -1];
};

function rob2(nums) {
    /*
    rob1: The maximum amount robbed from all houses up to two houses ago.

    rob2: The maximum amount robbed from all houses up to the previous house.
    */
    let rob1 = 0;
    let rob2 = 0;
    /*
    Option 1: Rob this house (num + rob1). You add the 
    current house’s money to rob1 (the best you could do without
     robbing the previous house).

    Option 2: Skip this house (rob2). You keep the best total so far.

    temp stores the better of these two options.

    Update rob1 to be the old rob2 (shift the window forward).

    Update rob2 to be temp (the new best total).

    */
    for (const num of nums) {
        const temp = Math.max(num + rob1, rob2);
        rob1 = rob2;
        rob2 = temp;
    }
    //After the loop, rob2 contains the maximum amount you can rob.
    return rob2;
}
/*
Time Complexity: O(n)

Space Complexity: O(1) (only two variables used)

Logic: At each step, choose to rob the current house
 (and add its value to the best from two houses ago)
  or skip it (and keep the best from the previous house).
*/
// let nums = [1,1,3,3];
let nums = [2,9,8,3,6];
let res = rob(nums);
console.log("result ==",res)