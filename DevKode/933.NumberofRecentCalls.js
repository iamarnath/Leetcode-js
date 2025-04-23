/*
933. Number of Recent Calls

Solution - https://leetcode.com/problems/number-of-recent-calls/solutions/5153405/optimised/

Description
You have a RecentCounter class which counts the number of recent requests within a certain time frame.

Implement the RecentCounter class:

RecentCounter() Initializes the counter with zero recent requests.
int ping(int t) Adds a new request at time t, where t represents some time in milliseconds, and returns the number of requests that has happened in the past 3000 milliseconds (including the new request). Specifically, return the number of requests that have happened in the inclusive range [t - 3000, t].
It is guaranteed that every call to ping uses a strictly larger value of t than the previous call.

 

Example 1:

Input
["RecentCounter", "ping", "ping", "ping", "ping"]
[[], [1], [100], [3001], [3002]]
Output
[null, 1, 2, 3, 3]

Explanation
RecentCounter recentCounter = new RecentCounter();
recentCounter.ping(1);     // requests = [1], range is [-2999,1], return 1
recentCounter.ping(100);   // requests = [1, 100], range is [-2900,100], return 2
recentCounter.ping(3001);  // requests = [1, 100, 3001], range is [1,3001], return 3
recentCounter.ping(3002);  // requests = [1, 100, 3001, 3002], range is [2,3002], return 3
 

Constraints:

1 <= t <= 109
Each test case will call ping with strictly increasing values of t.
At most 104 calls will be made to ping.
*/
/*
Approach Explanation:
The RecentCounter class is designed to keep track of recent ping requests within a 3000 millisecond window. The ping method records a new ping by adding its timestamp to the recentPings array. It then removes any pings from the array that are older than 3000 milliseconds from the current timestamp, ensuring that only recent pings are retained.
Time Complexity:
ping(t):
Adding a new ping to the recentPings array takes O(1) time.
Removing older pings involves a while loop that may iterate through and remove elements from the beginning of the array. In the worst case, this loop could potentially remove all elements, resulting in a time complexity of O(n), where n is the number of pings older than 3000 milliseconds.
Overall, the time complexity of the ping method is O(n) in the worst case scenario when removing older pings.
Space Complexity:
The space complexity of this implementation is O(n), where n is the number of pings stored in the recentPings array. The array grows as new pings are added, and older pings are removed to maintain the 3000 millisecond window. The space required is directly proportional to the number of recent pings stored in the array.
Summary:
Time Complexity:
Adding a new ping: O(1)
Removing older pings: O(n) in the worst case
Space Complexity: O(n) where n is the number of recent pings stored in the array.
*/


var RecentCounter = function () {
    this.recentPings = [];
};

/** 
 * @param {number} t
 * @return {number}
 */
RecentCounter.prototype.ping = function (t) {
    // Record the new ping by adding the timestamp to the array.
    this.recentPings.push(t);
    //console.log("this.recentPings before--",this.recentPings,this.recentPings[0])
    // Remove pings from the array that are older than 3000 milliseconds from the current timestamp.
    while (this.recentPings.length > 0 && this.recentPings[0] < t - 3000) {
        this.recentPings.shift();
    }
    //console.log("this.recentPings after--",this.recentPings)
    return this.recentPings.length;
};


var recentCounter  = new RecentCounter()
//var param_1 = obj.ping(t)
console.log(recentCounter.ping(1));
console.log(recentCounter.ping(100));
console.log(recentCounter.ping(3001));
console.log(recentCounter.ping(3002));