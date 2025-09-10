/*
213. House Robber II
You are given an integer array nums where nums[i] represents 
the amount of money the ith house has. The houses are arranged
 in a circle, i.e. the first house and the last house are neighbors.

You are planning to rob money from the houses, but 
you cannot rob two adjacent houses because the security 
system will automatically alert the police if two adjacent
 houses were both broken into.

Return the maximum amount of money you can rob without alerting the police.

Example 1:

Input: nums = [3,4,3]

Output: 4
Explanation: You cannot rob nums[0] + nums[2] = 6 
because nums[0] and nums[2] are adjacent houses. 
The maximum you can rob is nums[1] = 4.

Example 2:

Input: nums = [2,9,8,3,6]

Output: 15
Explanation: You cannot rob nums[0] + nums[2] + nums[4] = 16 
because nums[0] and nums[4] are adjacent houses. 
The maximum you can rob is nums[1] + nums[4] = 15.

Constraints:

1 <= nums.length <= 100
0 <= nums[i] <= 100

*/

var robhelper = function(nums) {
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

var rob = function(nums){
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    // Consider two scenarios using array slicing
    const skipLast = nums.slice(0,-1);
    const skipFirst = nums.slice(1);
    return Math.max(robhelper(skipLast),robhelper(skipFirst));
};

//let nums = [3,4,3];

let nums = [2,9,8,3,6]

let res = rob(nums);

console.log("res-==",res);