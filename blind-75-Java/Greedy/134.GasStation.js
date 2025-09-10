/*
134. Gas Station

There are n gas stations along a circular route,
 where the amount of gas at the ith station is gas[i].

You have a car with an unlimited gas tank and
 it costs cost[i] of gas to travel from the ith
 station to its next (i + 1)th station. You begin
 the journey with an empty tank at one of the gas stations.

Given two integer arrays gas and cost,
 return the starting gas station's index if you can travel
  around the circuit once in the clockwise direction,
   otherwise return -1. If there exists a solution,
    it is guaranteed to be unique.

Example 1:

Input: gas = [1,2,3,4,5], cost = [3,4,5,1,2]
Output: 3
Explanation:
Start at station 3 (index 3) and fill up with 4 unit of gas.
 Your tank = 0 + 4 = 4
Travel to station 4. Your tank = 4 - 1 + 5 = 8
Travel to station 0. Your tank = 8 - 2 + 1 = 7
Travel to station 1. Your tank = 7 - 3 + 2 = 6
Travel to station 2. Your tank = 6 - 4 + 3 = 5
Travel to station 3. The cost is 5. Your gas is just 
enough to travel back to station 3.
Therefore, return 3 as the starting index.
Example 2:

Input: gas = [2,3,4], cost = [3,4,3]
Output: -1
Explanation:
You can't start at station 0 or 1, as there is not enough
 gas to travel to the next station.
Let's start at station 2 and fill up with 4 unit of gas.
 Your tank = 0 + 4 = 4
Travel to station 0. Your tank = 4 - 3 + 2 = 3
Travel to station 1. Your tank = 3 - 3 + 3 = 3
You cannot travel back to station 2, as it requires
 4 unit of gas but you only have 3.
Therefore, you can't travel around the 
circuit once no matter where you start.
 

Constraints:

n == gas.length == cost.length
1 <= n <= 105
0 <= gas[i], cost[i] <= 104
The input is generated such that the answer is unique.

*/
/*
Brute-force check
The solution checks each gas station as a potential 
starting point (for loop from 0 to n-1). Stations where
 initial gas is insufficient for immediate departure are skipped.

Circular traversal simulation
Uses modulo operation (% n) to handle circular 
array indices. The while loop continues until either:

Fuel runs out (currGas < cost[j])

Completes full circle (j === i)

Fuel management

Starts with gas[i] - cost[i] (initial station's fuel minus departure cost)

Accumulates gas[j] at each new station

Subtracts cost[j] for each move

Time Complexity -  O(n²)
*/
// brute force
var canCompleteCircuitBrute = function (gas, cost) {
    const n = gas.length;
    for (let i = 0; i < n; i++) {
        if (gas[i] < cost[i]) continue;
        let j = (i + 1) % n;
        let currGas = gas[i] - cost[i] + gas[j];
        while (j != i) {
            if (currGas < cost[j]) break;
            let costForMovingFromThisj = cost[j];
            //Let's move
            j = (j + 1) % n;
            let gasEarnInNextStationj = gas[j];
            currGas = currGas - costForMovingFromThisj + gasEarnInNextStationj;
        }
        if (i === j) {
            return i;
        }
    }
    return -1;
};
/*
1. Feasibility Check

First calculates total gas (totalGas) and total cost
 (totalCost) using array reduction .

Immediate return -1 if total gas < total cost (impossible circuit) .

2. Greedy Traversal

Maintains currentTank tracking net fuel from starting station.

When currentTank < 0, resets starting point to next 
station (startStation = i + 1) and clears tank .

This leverages the observation that stations 
between failed start and current index can't be valid starting points .

3. Single Pass Efficiency

Processes all stations in one O(n) loop (vs O(n²) brute force) .

Eliminates nested checks through smart state management.

Complexity Analysis
Metric	Value	Explanation
Time	O(n)	Single loop through stations (gas.length = n) .
Space	O(1)	Uses constant extra space (only 5 primitive variables) .
Key Optimizations
Early Termination: Eliminates impossible 
cases before main logic .

State Tracking: Maintains minimal state (currentTank + startStation) for optimal memory use .

Mathematical Insight: Uses gas-cost difference to track net fuel gain/loss per station .

*/
// greedy approach
var canCompleteCircuit = function (gas, cost) {
    const totalGas = gas.reduce((acc, val) => acc + val, 0);
    const totalCost = cost.reduce((acc, val) => acc + val, 0);
    if (totalGas < totalCost) {
        return -1;
    }
    let currentTank = 0;
    let startStation = 0;
    let gasLen = gas.length;
    for (let i = 0; i < gasLen; i++) {
        currentTank += gas[i] - cost[i];
        if (currentTank < 0) {
            startStation = i + 1;
            currentTank = 0;
        }
    }
    return startStation;
}
//let gas = [2,3,4], cost = [3,4,3];
let gas = [1, 2, 3, 4, 5], cost = [3, 4, 5, 1, 2];
let res = canCompleteCircuit(gas, cost);
console.log("canCompleteCircuit==", res)