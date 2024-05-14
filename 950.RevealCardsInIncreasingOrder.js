/*
950. Reveal Cards In Increasing Order

Solution - https://leetcode.com/problems/reveal-cards-in-increasing-order/solutions/5153599/optimised/

Description
You are given an integer array deck. There is a deck of cards where every card has a unique integer. The integer on the ith card is deck[i].

You can order the deck in any order you want. Initially, all the cards start face down (unrevealed) in one deck.

You will do the following steps repeatedly until all cards are revealed:

Take the top card of the deck, reveal it, and take it out of the deck.
If there are still cards in the deck then put the next top card of the deck at the bottom of the deck.
If there are still unrevealed cards, go back to step 1. Otherwise, stop.
Return an ordering of the deck that would reveal the cards in increasing order.

Note that the first entry in the answer is considered to be the top of the deck.

 

Example 1:

Input: deck = [17,13,11,2,3,5,7]
Output: [2,13,3,11,5,17,7]
Explanation: 
We get the deck in the order [17,13,11,2,3,5,7] (this order does not matter), and reorder it.
After reordering, the deck starts as [2,13,3,11,5,17,7], where 2 is the top of the deck.
We reveal 2, and move 13 to the bottom.  The deck is now [3,11,5,17,7,13].
We reveal 3, and move 11 to the bottom.  The deck is now [5,17,7,13,11].
We reveal 5, and move 17 to the bottom.  The deck is now [7,13,11,17].
We reveal 7, and move 13 to the bottom.  The deck is now [11,17,13].
We reveal 11, and move 17 to the bottom.  The deck is now [13,17].
We reveal 13, and move 17 to the bottom.  The deck is now [17].
We reveal 17.
Since all the cards revealed are in increasing order, the answer is correct.
Example 2:

Input: deck = [1,1000]
Output: [1,1000]
 

Constraints:

1 <= deck.length <= 1000
1 <= deck[i] <= 106
All the values of deck are unique.
*/

/*
Approach Explanation:
This JavaScript function deckRevealedIncreasing takes an array deck as input and returns a new array
 where the elements of deck are revealed in increasing order according to a specific rule.
  The rule is to reveal the top card, then move the next card to the bottom, and repeat this 
  process until all cards are revealed.
Here's how the function works:
It first initializes an empty queue q and fills it with indices from 0 to n-1, where n is the
 length of the input array deck.
It then sorts the input array deck in ascending order.
It creates a new array ans of the same length as deck to store the revealed cards.
It iterates through the sorted deck array. For each card, it assigns the card to the index in ans 
that is at the front of the queue q, then removes that index from the front of the queue.
If the queue is not empty, it moves the next index from the front to the back of the queue, 
simulating the process of moving the next card to the bottom.
Finally, it returns the ans array, which contains the cards in the order they were revealed.
Time Complexity:
The time complexity of this function is O(n log n), where n is the length of the input array deck.
 This is because the function sorts the input array, which takes O(n log n) time.
 The rest of the operations, such as filling the queue, iterating through the array, and assigning
  cards to the ans array, take O(n) time.
Space Complexity:
The space complexity of this function is O(n), where n is the length of the input array deck.
 This is because the function creates a new array ans of the same length as deck to store the revealed cards, and it also uses a queue q that can hold up to n indices.
*/


var deckRevealedIncreasing = function (deck) {
    let n = deck.length;
    let q = [];

    for (let i = 0; i < n; i++) {
        q.push(i);
    }

    deck.sort((a, b) => a - b);
    //console.log({deck,q})
    let ans = new Array(n);
    for (let i = 0; i < n; i++) {
        ans[q.shift()] = deck[i];
        if (q.length > 0) {
   
            q.push(q.shift());
        }
        //console.log("ans after",ans,i,q)
    }

    return ans;
};
let deck = [17,13,11,2,3,5,7]
console.log(deckRevealedIncreasing(deck));