/*
1209. Remove All Adjacent Duplicates in String II

You are given a string s and an integer k, a
 k duplicate removal consists of choosing k adjacent
  and equal letters from s and removing them, causing 
  the left and the right side of the deleted substring 
  to concatenate together.

We repeatedly make k duplicate removals on s until we no longer can.

Return the final string after all such duplicate 
removals have been made. It is guaranteed that the answer is unique.

Example 1:

Input: s = "abcd", k = 2
Output: "abcd"
Explanation: There's nothing to delete.
Example 2:

Input: s = "deeedbbcccbdaa", k = 3
Output: "aa"
Explanation: 
First delete "eee" and "ccc", get "ddbbbdaa"
Then delete "bbb", get "dddaa"
Finally delete "ddd", get "aa"
Example 3:

Input: s = "pbbcggttciiippooaais", k = 2
Output: "ps"
 

Constraints:

1 <= s.length <= 105
2 <= k <= 104
s only contains lowercase English letters.

*/
/*
Think of the stack as below (this visualizes input “abbbaaac” with 
k
=
3
k=3):

Step	Stack Contents	        Action	            Result So Far
Start	    []	-	
'a'	        [['a',1]]	        Push new	
'b'	        [['a',1],['b',1]]	Push new	
'b'	        [['a',1],['b',2]]	Increase top count	
'b'	        [['a',1],['b',3]]	Increase top count	
count=k	    [['a',1]]	        Pop top (remove 'bbb')	
'a'	        [['a',2]]	        Increase top count	
'a'	        [['a',3]]	        Increase top count	
count=k	    []	                Pop top (remove 'aaa')	
'c'	        [['c',1]]	        Push new	

Final Stack: [ ['c',1] ]
Final Result: c (since all other groups were removed in their entirety when they reached count=k).

If the stack holds [ ['a',2], ['b',3], ['c',1] ] (from bottom to top), popping yields ‘c’, then ‘b’, then ‘a’. By prepending each to the result, the answer builds up as "c" → "bbb" + "c" = "bbbc" → "aa" + "bbbc" = "aabbc", which matches the original order.

Summary Table
Stack Pop	Normally (append)	Using ans = ... + ans
Pop 'c', 1	“c”	“c”
Pop 'b', 3	“cb b b”	“bbb” + “c” = “bbbc”
Pop 'a', 2	“cb b b a a”	“aa” + “bbbc” = “aabbc”

ans = char.repeat(count) + ans;
is responsible for preserving the original string order after using the stack.

*/
/*
The time complexity of the removeDuplicates function is O(n) and the space complexity is O(n).

Time Complexity: O(n)
The function processes each character of the input
 string exactly once inside the loop (for (let i = 0; i < n; ++i)), 
 resulting in O(n) time, where n is the length of the string.

Each stack operation (push, pop, and checking the top
 element) takes constant time (O(1)), so all stack 
 operations combined over the whole string remain O(n).

The second loop that rebuilds ans by popping from 
the stack also runs at most O(n) times, but since 
each character is handled no more than twice 
(once in and once out of the stack), total operations remain O(n).

Space Complexity: O(n)
In the worst case, when no removals happen, 
the stack can hold up to all characters, so the stack’s space is O(n).

The string ans will also take up to O(n) space 
in the output, but this is typically not counted 
against the space complexity if considered as 
“output space”—the main extra space used, besides 
the input and output, is the stack.

Summary:

Time complexity: O(n) (single pass, each 
character is handled in constant time).

Space complexity: O(n) (stack may store up to 
all unique-character blocks in the worst case).

*/
function removeDuplicates(s, k) {
    const n = s.length;
    //Quick return: If the string's length is less than k, 
    // there can't be k consecutive duplicates, so the
    //  function returns the original string
    if (n < k) return s;
    //Creates an empty stack, as an array, to store 
    // character-count pairs (e.g., ['a', 2] means two consecutive 'a's)
    const stack = []; // Stack of [character, count] pairs
    for (let i = 0; i < n; i++) {
        //If stack is empty or top character is not 
        // equal to s[i], push [s[i],1] (a new group starts).
        if (stack.length === 0 || stack[stack.length - 1][0] !== s[i]) {
            stack.push([s[i], 1]);
        } else {
            //If the top of the stack matches s[i], pop the old pair, 
            // increment the count by one, and push it back with updated count.
            const prev = stack.pop();
            stack.push([s[i], prev[1] + 1]);
        }
        //Duplicate removal: If the top element's count reaches k, 
        // pop it to remove this group (i.e., eliminate k 
        // consecutive identical characters)
        if (stack[stack.length - 1][1] === k) {
            stack.pop();
        }
    }
    //Initializes an empty string to build the answer.
    let ans = '';
    //While stack is not empty, repeatedly pop items off the stack.
    while (stack.length > 0) {
        const [char, count] = stack.pop();
        //For each item [char, count], append char repeated count 
        // times to the front of the answer string (+ ans ensures 
        // original order is preserved)
        ans = char.repeat(count) + ans;
    }
    //Returns the final string without any k consecutive duplicates.
    return ans;
}

//let s = "deeedbbcccbdaa", k = 3;
let s = "pbbcggttciiippooaais", k = 2;
let res = removeDuplicates(s, k);

console.log("removeDuplicates==",res);

