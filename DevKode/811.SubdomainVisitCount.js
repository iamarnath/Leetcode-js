/*
811. Subdomain Visit Count

solution - https://leetcode.com/problems/subdomain-visit-count/solutions/5110341/optimised/

Description
A website domain "discuss.leetcode.com" consists of various subdomains. At the top level, we have "com", at the next level, we have "leetcode.com" and at the lowest level, "discuss.leetcode.com". When we visit a domain like "discuss.leetcode.com", we will also visit the parent domains "leetcode.com" and "com" implicitly.

A count-paired domain is a domain that has one of the two formats "rep d1.d2.d3" or "rep d1.d2" where rep is the number of visits to the domain and d1.d2.d3 is the domain itself.

For example, "9001 discuss.leetcode.com" is a count-paired domain that indicates that discuss.leetcode.com was visited 9001 times.
Given an array of count-paired domains cpdomains, return an array of the count-paired domains of each subdomain in the input. You may return the answer in any order.

 

Example 1:

Input: cpdomains = ["9001 discuss.leetcode.com"]
Output: ["9001 leetcode.com","9001 discuss.leetcode.com","9001 com"]
Explanation: We only have one website domain: "discuss.leetcode.com".
As discussed above, the subdomain "leetcode.com" and "com" will also be visited. So they will all be visited 9001 times.
Example 2:

Input: cpdomains = ["900 google.mail.com", "50 yahoo.com", "1 intel.mail.com", "5 wiki.org"]
Output: ["901 mail.com","50 yahoo.com","900 google.mail.com","5 wiki.org","5 org","1 intel.mail.com","951 com"]
Explanation: We will visit "google.mail.com" 900 times, "yahoo.com" 50 times, "intel.mail.com" once and "wiki.org" 5 times.
For the subdomains, we will visit "mail.com" 900 + 1 = 901 times, "com" 900 + 50 + 1 = 951 times, and "org" 5 times.
 

Constraints:

1 <= cpdomain.length <= 100
1 <= cpdomain[i].length <= 100
cpdomain[i] follows either the "repi d1i.d2i.d3i" format or the "repi d1i.d2i" format.
repi is an integer in the range [1, 104].
d1i, d2i, and d3i consist of lowercase English letters.

*/

/*
Approach
The function uses the following approach:
Initialize an empty object map to store the count of visits for each subdomain.
Iterate through each string in the cpdomains array.
For each string:
Find the index of the space character to separate the count from the domain.
Convert the count portion of the string to an integer.
Process all subdomains, including the full domain itself:
Add the count to the corresponding subdomain in the map object.
Extract the next subdomain by finding the index of the next dot and updating the domain string.
Repeat this process until there are no more dots in the domain.
Iterate through the map object and create a new array result with the count and subdomain for each entry.
Return the result array.



The time complexity of this function is O(N * L), where N is the length of the cpdomains array and L is the average length of each string in the array.
The reason for this time complexity is:
The outer loop iterates through the cpdomains array, which has N elements.
For each string in the cpdomains array, the function processes all subdomains, which can take up to L steps (where L is the length of the string).
The additional operations, such as finding the space index, converting the count to an integer, and iterating through the map object, are all constant-time operations.

Space Complexity
The Counter object cnt storage grows with the number of distinct subdomains found, in the worst case this may contain all the subdomains which would be O(d) where d is the total number of distinct subdomains.
The created list for the final output will have as many elements as there are entries in cnt which is also O(d).
The space complexity, therefore, is O(d), which is determined by the number of unique subdomains.


*/

var subdomainVisits = function (cpdomains) {
    let map = {};
    for (let s of cpdomains) {
        // Find the space character to separate the count from the domain
        let spaceIndex = s.indexOf(" ");
        // Convert the count portion of the string to an integer
        let count = parseInt(s.substring(0, spaceIndex), 10);
       
        let domain = s.substring(spaceIndex + 1);
        // Process all subdomains, including the full domain itself
        while(domain){
            map[domain] = (map[domain] ||0)+count;
            const dotIndex= domain.indexOf(".");
            //if no dot is found or last postion break
            if(dotIndex<0) break;
            //update the domain to be string after dot
            domain = domain.substring(dotIndex+1);
        }

    }
    var result=[];
    for(let key in map){
        result.push(map[key]+ " "+key)
    }
    return result;
};

let cpdomains = ["900 google.mail.com", "50 yahoo.com", "1 intel.mail.com", "5 wiki.org"];
console.log(subdomainVisits(cpdomains));
