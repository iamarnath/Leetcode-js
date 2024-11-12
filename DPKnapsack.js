/* Given weights and values of n items, put these items in a knapsack of capacity W to get the maximum total value
   in the knapsack. In other words, given two integer arrays val[0..n-1] and wt[0..n-1] which represent values and weights
  associated with n items respectively. Also given an integer W which represents knapsack capacity, find out the maximum 
  value subset of val[] such that sum of the weights of this subset is smaller than or equal to W.
   You cannot break an item, either pick the complete item or don’t pick it (0-1 property).
 */
//    Time Complexity: O(2n). 
//    As there are redundant subproblems.
//    Auxiliary Space :O(1). 
//    As no extra data structure has been used for storing values.
function max(a,b){
    return (a>b)?a:b;
}

function knapsackRecursive(wt,val,w,n){
     // Base Case
    if(n === 0 || w === 0){
        return 0;
    }
    /*
    once we have visited any item,we will include/exclude it.
    we will call next function with n-1
    if value is taken,we will make next call with  n-1 and val[n-1] is added
    */
    if(wt[n-1] <= w){
        return max(val[n-1]+knapsackRecursive(wt,val,w-wt[n-1],n-1),knapsackRecursive(wt,val,w,n-1))
    }
 
    else{
       return knapsackRecursive(wt,val,w,n-1);
    }
}
// let wt = [ 10, 20, 30 ];
// let val = [ 60, 100, 120 ];

// let w = 50;
let wt = [ 1, 2, 3, 8, 7, 4 ];
let val = [20, 5, 10, 40, 15, 25 ];

let w = 10;
let n = val.length;

//console.log(knapsackRecursive(wt,val,w,n));

// Time Complexity: O(N*W). 
// As redundant calculations of states are avoided.
// Auxiliary Space: O(N*W). 
// The use of 2D array data structure for storing intermediate states-:


function knapsackDP(wt,val,w,n){
    // Base Case
    //var dp=[];
    // for(let k=0;k<n+1;k++){
    //     dp[k] = [];
    //     for(let m=0;m<w+1;m++){
    //         dp[k][m] = -1;
    //     } 
    // }
   var dp = new Array(n+1);

    for(let i=0;i<n+1;i++){
        dp[i] = new Array(w + 1);
        //console.log(dp)
        for(let j=0;j<w+1;j++){
            if(i === 0 || j === 0){
                dp[i][j] =0;
            }
            else if(wt[i-1] <= j){
                dp[i][j] = max(val[i-1]+dp[i-1][j-wt[i-1]] , dp[i-1][j])
               // return max(val[n-1]+knapsackRecursive(wt,val,w-wt[n-1],n-1),knapsackRecursive(wt,val,w,n-1))
            }
            else{
                dp[i][j] = dp[i-1][j];
             //  return knapsackRecursive(wt,val,w,n-1);
            }
        }
    }
    //console.log("dp--",dp)
 return dp[n][w];
}
console.log(knapsackDP(wt,val,w,n));