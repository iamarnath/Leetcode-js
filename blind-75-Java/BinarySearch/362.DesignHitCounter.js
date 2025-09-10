/*
362. Design Hit Counter
Description
Design a hit counter which counts the number of hits received in the past 5 minutes (i.e., the past 300 seconds).

Your system should accept a timestamp parameter (in seconds granularity), and you may assume that calls are being made to the system in chronological order (i.e., timestamp is monotonically increasing). Several hits may arrive roughly at the same time.

Implement the HitCounter class:

HitCounter() Initializes the object of the hit counter system.
void hit(int timestamp) Records a hit that happened at timestamp (in seconds). Several hits may happen at the same timestamp.
int getHits(int timestamp) Returns the number of hits in the past 5 minutes from timestamp (i.e., the past 300 seconds).
 

Example 1:

Input
["HitCounter", "hit", "hit", "hit", "getHits", "hit", "getHits", "getHits"]
[[], [1], [2], [3], [4], [300], [300], [301]]
Output
[null, null, null, null, 3, null, 4, 3]

Explanation
HitCounter hitCounter = new HitCounter();
hitCounter.hit(1);       // hit at timestamp 1.
hitCounter.hit(2);       // hit at timestamp 2.
hitCounter.hit(3);       // hit at timestamp 3.
hitCounter.getHits(4);   // get hits at timestamp 4, return 3.
hitCounter.hit(300);     // hit at timestamp 300.
hitCounter.getHits(300); // get hits at timestamp 300, return 4.
hitCounter.getHits(301); // get hits at timestamp 301, return 3.
 

Constraints:

1 <= timestamp <= 2 * 109
All the calls are being made to the system in chronological order (i.e., timestamp is monotonically increasing).
At most 300 calls will be made to hit and getHits.
 

Follow up: What if the number of hits per second could be huge? Does your design scale?
*/
/*
Since timestamp is monotonically increasing, we can 
use an array ts to store all timestamps. Then in the getHits
method, we use binary search to find the first position 
that is greater than or equal to timestamp - 300 + 1, and 
then return the length of ts minus this position.
In terms of time complexity, the time complexity of the hit method is 
O(1), and the time complexity of the getHits method is 
O(log n). Where n is the length of ts.

*/

class HitCounter {
    ts = [];
    constructor() { }
    hit(timestamp) {
        this.ts.push(timestamp);
        console.log("hit added ",this.ts);
    }
    getHits(timestamp) {
        const search = (x) => {
            let [l, r] = [0, this.ts.length];
            while (l < r) {
                const mid = l + Math.floor((r-l)/2);
                if(x > this.ts[mid]){
                    l = mid +1;
                }
                else{
                    r=mid;
                }
            }
            return l;
        }
        let result = this.ts.length - search(timestamp - 300+1);
        console.log("hit count==",result);
        return result;
    }
}



var hitCounter = new HitCounter();
hitCounter.hit(1);       // hit at timestamp 1.
hitCounter.hit(2);       // hit at timestamp 2.
hitCounter.hit(3);       // hit at timestamp 3.
hitCounter.getHits(4);   // get hits at timestamp 4, return 3.
hitCounter.hit(300);     // hit at timestamp 300.
hitCounter.getHits(300); // get hits at timestamp 300, return 4.
hitCounter.getHits(301); // get hits at timestamp 301, return 3.