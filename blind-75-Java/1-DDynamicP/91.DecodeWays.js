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
/*
Time Complexity
Each index i from 0 to n is visited at most once due to memoization.

Each call does O(1) work.

Total time complexity: O(n).

Space Complexity
The memoization array t uses O(n) extra space.

The maximum recursion depth is also O(n).

Total space complexity: O(n).
*/
//mik
function numDecodings(s) {
    const n = s.length;
    //t = Array(n+1).fill(-1): Initializes memoization array with -1 
    // (to indicate “not yet computed”); size n+1 to handle i = n base case.
    const t = Array(n + 1).fill(-1);

    function solve(i) {
        if (t[i] !== -1) return t[i];
        //If index has reached the end, that's one valid decoding path.
        if (i === n) return t[i] = 1;           // One valid split (reached end)
        //If character at i is '0', this cannot start a valid decoding.
        if (s[i] === '0') return t[i] = 0;      // Can't decode '0' at start
        //Take one character and move forward (decode as a single digit).
        let result = solve(i + 1);              // Use 1 digit

        // Check if you can use 2 digits
        //If a two-digit number (10-26) is possible, make a recursive call 
        // skipping two positions:
        //  result += solve(i + 2);.


        if (i + 1 < n && (s[i] === '1' || (s[i] === '2' && s[i+1] <= '6'))) {
            result += solve(i + 2);
        }
        //Store the result in t[i] and return it.


        return t[i] = result;
    }

    return solve(0);
}

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
    //dp is a dynamic programming array of size n+1, initialized to all 0s.
    const dp = new Array(n+1).fill(0);
    // Base case: empty string has 1 valid decoding (base for calculation)
    //dp[n] = 1 sets the base case: an empty substring 
    // (beyond the end) counts as 1 valid way to decode.


    dp[n]=1;
    // Build DP table from end to start
    //Traverses the string from right to left.
    for(let i=n-1;i>=0;i--){
        // Current digit can't be 0 for valid decoding
        //If the current character is '0', it can't be used to 
        // start a valid encoding (decodings always start from '1'),
        //  so dp[i] = 0.
        if(s[i] === '0'){
            dp[i]=0;
        }
        else{
            // Single digit decoding (1-9)
            //Otherwise, initializing dp[i] with dp[i+1] 
            // (decoding by using the current character as 
            // a single-digit letter).
            dp[i] = dp[i+1];
            //Checks if the next character exists 
            // and forms a valid two-digit encoding with s[i].
            // If s[i] === '1' (any digit after 1 creates a valid 10-19),

            // OR s[i] === '2' and s[i+1] <= '6' (covers 20-26).
            if(i+1<n && 
                s[i] ==='1' ||
                (s[i] ==='2' && s[i+1] <='6')
            ){
                dp[i] +=dp[i+2];
            }
        }
    }
    //Returns the total number of ways to decode the string 
    // starting from the first character, stored in dp.
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