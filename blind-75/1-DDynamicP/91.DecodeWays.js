/*
91. Decode Ways

A string consisting of uppercase english characters can be encoded to a number using the following mapping:

'A' -> "1"
'B' -> "2"
...
'Z' -> "26"
To decode a message, digits must be grouped and then mapped back into letters using the reverse of the mapping above. There may be multiple ways to decode a message. For example, "1012" can be mapped into:

"JAB" with the grouping (10 1 2)
"JL" with the grouping (10 12)
The grouping (1 01 2) is invalid because 01 cannot be mapped into a letter since it contains a leading zero.

Given a string s containing only digits, return the number of ways to decode it. You can assume that the answer fits in a 32-bit integer.

Example 1:

Input: s = "12"

Output: 2

Explanation: "12" could be decoded as "AB" (1 2) or "L" (12).
Example 2:

Input: s = "01"

Output: 0
Explanation: "01" cannot be decoded because "01" cannot be mapped into a letter.

Constraints:

1 <= s.length <= 100
s consists of digits

*/
/*
Memoization Optimization: Uses memo array to store computed results

Base Cases:

i === n: Valid path (counts as 1)

Leading zero: Invalid path (returns 0)

Dual Decoding Paths:

Single-digit decoding (1-9)

Two-digit decoding (10-26)

Efficient Recursion: Avoids redundant calculations through memoization
*/
function numDecodings(s){
    const n = s.length;
    const memo = new Array(n+1).fill(-1);
    const solve = (i) =>{
        if(memo[i] !== -1) return memo[i];
        if(i ===n ) return memo[i]=1; // Base case: valid decoding
        if(s[i]==='0') return memo[i] =0;//Invalid starting with zero
        let result = solve(i+1);//Single digit decoding
        // Check for valid two-digit decoding
        if(i+1<n){
            const twoDigit = parseInt(s.substring(i,i+2));
            if(twoDigit>=10 && twoDigit<=26){
                result += solve(i+2);
            }
        }
        return memo[i] = result;
    };
   return  solve(0)
}

/*
Bottom-Up Dynamic Programming:
Builds solutions from the end of the string backwards
dp[i] = number of ways to decode substring starting at index i

Base Case Handling:
dp[n] = 1 acts as the terminal condition for valid decodings
Handles empty string case implicitly

Decoding Rules:
Single Digit: Any non-zero digit (1-9) → carry forward dp[i+1]

Two Digits: Valid 10-26 combinations → add dp[i+2]

Zero Handling:

Leading zeros immediately set dp[i] = 0
Embedded zeros handled through two-digit validation

Complexity Analysis:
Time: O(n) - Single pass through the string

Space: O(n) - DP array storage
*/
function numDecodingsDP(s){
    const n = s.length;
    const dp = new Array(n+1).fill(0);
    // Base case: empty string has 1 valid decoding (base for calculation)
    dp[n]=1;
    // Build DP table from end to start
    for(let i=n-1;i>=0;i--){
        // Current digit can't be 0 for valid decoding
        if(s[i] === '0'){
            dp[i]=0;
        }
        else{
            // Single digit decoding (1-9)
            dp[i] = dp[i+1];
            if(i+1<n && 
                s[i] ==='1' ||
                (s[i] ==='2' && s[i+1] <='6')
            ){
                dp[i] +=dp[i+2];
            }
        }
    }
    return dp[0];
}

function numDecodings(s) {
    const n = s.length;
    if (n === 1) {
        return s[0] === '0' ? 0 : 1;
    }
    if (s[0] === '0') {
        return 0;
    }

    let last1 = 1, last2 = 1;

    for (let i = 1; i < n; i++) {
        let count = s[i] !== '0' ? last1 : 0;

        if (
            s[i - 1] === '1' ||
            (s[i - 1] === '2' && s[i] < '7')
        ) {
            count += last2;
        }

        last2 = last1;
        last1 = count;
    }

    return last1;
}

let s = "12";
console.log(numDecodingsDP(s))