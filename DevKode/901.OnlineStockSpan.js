/*
901. Online Stock Span

Solution - https://leetcode.com/problems/online-stock-span/solutions/5159289/optimised/

Description
Design an algorithm that collects daily price quotes for some stock and returns the span of that stock's price for the current day.

The span of the stock's price in one day is the maximum number of consecutive days (starting from that day and going backward) for which the stock price was less than or equal to the price of that day.

For example, if the prices of the stock in the last four days is [7,2,1,2] and the price of the stock today is 2, then the span of today is 4 because starting from today, the price of the stock was less than or equal 2 for 4 consecutive days.
Also, if the prices of the stock in the last four days is [7,34,1,2] and the price of the stock today is 8, then the span of today is 3 because starting from today, the price of the stock was less than or equal 8 for 3 consecutive days.
Implement the StockSpanner class:

StockSpanner() Initializes the object of the class.
int next(int price) Returns the span of the stock's price given that today's price is price.
 

Example 1:

Input
["StockSpanner", "next", "next", "next", "next", "next", "next", "next"]
[[], [100], [80], [60], [70], [60], [75], [85]]
Output
[null, 1, 1, 1, 2, 1, 4, 6]

Explanation
StockSpanner stockSpanner = new StockSpanner();
stockSpanner.next(100); // return 1
stockSpanner.next(80);  // return 1
stockSpanner.next(60);  // return 1
stockSpanner.next(70);  // return 2
stockSpanner.next(60);  // return 1
stockSpanner.next(75);  // return 4, because the last 4 prices (including today's price of 75) were less than or equal to today's price.
stockSpanner.next(85);  // return 6
 

Constraints:

1 <= price <= 105
At most 104 calls will be made to next.

*/
/*

Approach:
Initialize an empty stack stk to store prices and their corresponding spans.
For each incoming price:
Initialize the span to 1.
While the stack is not empty and the top price in the stack is less than or equal to the current price:
Pop the top element from the stack and increment the span by the span of the popped prices.
This accounts for consecutive days where the price was less than or equal to the current day.
Push the current price and its span onto the stack.
Return the calculated span for the current price.

Time Complexity:

Pushing and Popping from Stack: O(n)
In the worst case, each price is pushed and popped from the stack once.
Total Time Complexity: O(n)
The overall time complexity is O(n), where n is the number of prices processed.

Space Complexity:

Stack Space: O(n)
The space used by the stack grows with the number of prices processed.
Other Variables: O(1)
Additional space used by variables like span is constant.
Total Space Complexity: O(n)
The overall space complexity is O(n) due to the stack storing prices and spans.
Summary:
The StockSpanner class efficiently calculates the span of stock prices based on the consecutive days where the price was less than or equal to the current day's price.
It has a time complexity of O(n) and a space complexity of O(n), where n is the number of prices processed.
This approach uses a stack to keep track of prices and their spans, allowing for an efficient calculation of the stock span for each day.

*/
var StockSpanner = function () {
    this.stk = [];
};

/** 
 * @param {number} price
 * @return {number}
 */
StockSpanner.prototype.next = function (price) {
    let span = 1;
    // If the stack is not empty and the top stack price is less than or equal 
    // to the current price, keep popping from the stack and increment the span
    // by the span of the popped prices as their span becomes part of the current 
    // span since our price is greater than those prices.

    while (this.stk.length && this.stk[this.stk.length - 1][0] <= price) {
        span += this.stk.pop()[1];
    }
    this.stk.push([price, span]);
    return span;
};


var stockSpanner = new StockSpanner();
let a = stockSpanner.next(100); // return 1
console.log(a)
let b =  stockSpanner.next(80);  // return 1
console.log(b)
let c =  stockSpanner.next(60);  // return 1
console.log(c)
let d = stockSpanner.next(70);  // return 2
console.log(d)
let e = stockSpanner.next(60);  // return 1
console.log(e)
let f = stockSpanner.next(75);  // return 4, because the last 4 prices (including today's price of 75) were less than or equal to today's price.
console.log(f)
let g = stockSpanner.next(85);  // return 6
console.log(g)
