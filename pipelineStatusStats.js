/*
. Developers are working on a project in which code gets deployed via pipeline on a daily basis. 
The pipeline runs every day exactly once. We have data on pipeline status over a period of time. 
Pipeline status can either be successful or failed.
Project manager is interested in knowing the stats for a range of days.

Input
status: [true, false, true, true, false, true, true, true, false, false]
range: 3, 6
Output
3 Success, 1 Failure


*/
function pipelineStatusStats(status, range) {
    let start = range[0] - 1;
    let end = range[1];
    let successCount = 0;
    let failureCount = 0;

    for (let i = start; i < end; i++) {
        if (status[i]) {
            successCount++;
        } else {
            failureCount++;
        }
    }

    return `${successCount} Success, ${failureCount} Failure`;
}

let status1 = [true, false, true, true, false, true, true, true, false, false];
let range = [3, 6];
//console.log(pipelineStatusStats(status1, range));

/*

Scale up: PM is now interested knowing the stats for multiple ranges.

Input
status: [true, false, true, true, false, true, true, true, false, false]
ranges: [[3, 6], [1, 3], [2, 4]]
Output
[3 Success, 1 Failure], [2 Success, 1 Failure], [2 Success, 1 Failure]

*/
function getPipelineStats2(status, ranges) {
    const n = status.length;
    const successPrefixSum = new Array(n + 1).fill(0);
    const failurePrefixSum = new Array(n + 1).fill(0);

    // Create prefix sums
    for (let i = 0; i < n; i++) {
        console.log( successPrefixSum[i],failurePrefixSum[i],status[i]);
        successPrefixSum[i + 1] = successPrefixSum[i] + (status[i] ? 1 : 0);
        failurePrefixSum[i + 1] = failurePrefixSum[i] + (status[i] ? 0 : 1);
    }
    console.log("successPrefixSum--",successPrefixSum);
    console.log("failurePrefixSum--",failurePrefixSum)
    return ranges.map(range => {
        const [start, end] = range;
        console.log({start,end})
        const successes = successPrefixSum[end] - successPrefixSum[start - 1];
        const failures = failurePrefixSum[end] - failurePrefixSum[start - 1];
        return `${successes} Success, ${failures} Failure`;
    });
}

// Example usage:
const status2 = [true, false, true, true, false, true, true, true, false, false];
const ranges2 = [[3, 6], [1, 3], [2, 4]];
const result2 = getPipelineStats2(status2, ranges2);
console.log(result2); // Output: ["3 Success, 1 Failure", "2 Success, 1 Failure", "2 Success, 1 Failure"]

