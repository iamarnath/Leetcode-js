/*
1899. Merge Triplets to Form Target Triplet 

A triplet is an array of three integers. You are given a 2D integer array triplets, where triplets[i] = [ai, bi, ci] describes the ith triplet. You are also given an integer array target = [x, y, z] that describes the triplet you want to obtain.

To obtain target, you may apply the following operation on triplets any number of times (possibly zero):

Choose two indices (0-indexed) i and j (i != j) and update triplets[j] to become [max(ai, aj), max(bi, bj), max(ci, cj)].
For example, if triplets[i] = [2, 5, 3] and triplets[j] = [1, 7, 5], triplets[j] will be updated to [max(2, 1), max(5, 7), max(3, 5)] = [2, 7, 5].
Return true if it is possible to obtain the target triplet [x, y, z] as an element of triplets, or false otherwise.

 

Example 1:

Input: triplets = [[2,5,3],[1,8,4],[1,7,5]], target = [2,7,5]
Output: true
Explanation: Perform the following operations:
- Choose the first and last triplets [[2,5,3],[1,8,4],[1,7,5]]. Update the last triplet to be [max(2,1), max(5,7), max(3,5)] = [2,7,5]. triplets = [[2,5,3],[1,8,4],[2,7,5]]
The target triplet [2,7,5] is now an element of triplets.
Example 2:

Input: triplets = [[3,4,5],[4,5,6]], target = [3,2,5]
Output: false
Explanation: It is impossible to have [3,2,5] as an element because there is no 2 in any of the triplets.
Example 3:

Input: triplets = [[2,5,3],[2,3,4],[1,2,5],[5,2,3]], target = [5,5,5]
Output: true
Explanation: Perform the following operations:
- Choose the first and third triplets [[2,5,3],[2,3,4],[1,2,5],[5,2,3]]. Update the third triplet to be [max(2,1), max(5,2), max(3,5)] = [2,5,5]. triplets = [[2,5,3],[2,3,4],[2,5,5],[5,2,3]].
- Choose the third and fourth triplets [[2,5,3],[2,3,4],[2,5,5],[5,2,3]]. Update the fourth triplet to be [max(2,5), max(5,2), max(5,3)] = [5,5,5]. triplets = [[2,5,3],[2,3,4],[2,5,5],[5,5,5]].
The target triplet [5,5,5] is now an element of triplets.

*/
//O(n) time complexity and O(1) space complexity

var mergeTriplets = function(triplets, target) {
    let maxValues = [0,0,0];
    for(const triplet of triplets){
        if(triplet[0] <= target[0] &&
            triplet[1] <= target[1] &&
            triplet[2] <= target[2]
        ){
            maxValues[0] = Math.max(maxValues[0],triplet[0]);
            maxValues[1] = Math.max(maxValues[1],triplet[1]);
            maxValues[2] = Math.max(maxValues[2],triplet[2]);
            // Early termination if target is reached
            if (maxValues[0] === target[0] && 
                maxValues[1] === target[1] && 
                maxValues[2] === target[2]) {
                return true;
            }

        }
    }
    let result = (maxValues[0] === target[0] &&
                maxValues[1] === target[1] &&
                maxValues[2] === target[2]);
    return result;
};

//let triplets = [[2,5,3],[1,8,4],[1,7,5]], target = [2,7,5];
let triplets = [[3,4,5],[4,5,6]], target = [3,2,5];
let res = mergeTriplets(triplets,target);

console.log("mergeTriplets==",res);