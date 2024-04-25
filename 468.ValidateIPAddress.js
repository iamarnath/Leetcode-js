/*
468. Validate IP Address
solution: https://leetcode.com/problems/validate-ip-address/solutions/5070053/optimised/

https://leetcode.com/problems/validate-ip-address/solutions/5070059/optimised2/


Description
Given a string queryIP, return "IPv4" if IP is a valid IPv4 address, "IPv6" if IP is a valid IPv6 address or "Neither" if IP is not a correct IP of any type.

A valid IPv4 address is an IP in the form "x1.x2.x3.x4" where 0 <= xi <= 255 and xi cannot contain leading zeros. For example, "192.168.1.1" and "192.168.1.0" are valid IPv4 addresses while "192.168.01.1", "192.168.1.00", and "192.168@1.1" are invalid IPv4 addresses.

A valid IPv6 address is an IP in the form "x1:x2:x3:x4:x5:x6:x7:x8" where:

1 <= xi.length <= 4
xi is a hexadecimal string which may contain digits, lowercase English letter ('a' to 'f') and upper-case English letters ('A' to 'F').
Leading zeros are allowed in xi.
For example, "2001:0db8:85a3:0000:0000:8a2e:0370:7334" and "2001:db8:85a3:0:0:8A2E:0370:7334" are valid IPv6 addresses, while "2001:0db8:85a3::8A2E:037j:7334" and "02001:0db8:85a3:0000:0000:8a2e:0370:7334" are invalid IPv6 addresses.

Example 1:

Input: queryIP = "172.16.254.1"
Output: "IPv4"
Explanation: This is a valid IPv4 address, return "IPv4".
Example 2:

Input: queryIP = "2001:0db8:85a3:0:0:8A2E:0370:7334"
Output: "IPv6"
Explanation: This is a valid IPv6 address, return "IPv6".
Example 3:

Input: queryIP = "256.256.256.256"
Output: "Neither"
Explanation: This is neither a IPv4 address nor a IPv6 address.
 

Constraints:

queryIP consists only of English letters, digits and the characters '.' and ':'.
*/
/*
var validIPAddress = function (queryIP) {
    const tokens = queryIP.split(":");
    if (tokens.length > 7) {
        if (tokens.find(v => v.length > 4)) {
            return "Neither"
        }
        if (tokens.every(v => v.length === 1)) {
            return /((([0-9a-fA-F]){1})\:){7}([0-9a-fA-F]){1}/.test(queryIP) ? "IPv6" : "Neither"
        }
        return /^((([0-9a-fA-F]){1,4})\:){7}([0-9a-fA-F]){1,4}$/.test(queryIP) ? "IPv6" : "Neither"

    } else {
        return /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/.test(queryIP) ? "IPv4" : "Neither"
    }
};
*/
var validIPAddress = function (queryIP) {
    // Helper function to validate IPv4 addresses
    const isIPv4 = () => {
        // Split the input string by '.', IPv4 should have 4 parts
        const octets = queryIP.split('.');
        if (octets.length !== 4) return false;
        for (octet of octets) {
            // Convert string to a number
            const num = Number(octet);
            // Check if the octet is within the valid range and is a valid string representation of the number
            // Leading zeros are not allowed in IPv4 octets.
            // Number(0001) = 1->converting num to string using concatenation and then comparing with actual string
            // will give the info if string and number are ealier equal or not.
            if (num < 0 || num > 255 || num + '' !== octet) {
                return false;
            }
        }
        // If all octets are valid, return true
        return true
    }
    const isIPv6 = () => {
        // Split the input string by ':', IPv6 should have 8 parts
        const blocks = queryIP.split(':');
        // Check if there are exactly 8 blocks
        if (blocks.length !== 8) {
            return false;
        }
        // Validate each block
        for (const block of blocks) {
            // Check block length is between 1 and 4
            if (block.length === 0 || block.length > 4) {
                return false;
            }
            // Check each character in the block
            for (const char of block) {
                // Check if the character is a valid hexadecimal number
                if (!(/[0-9a-fA-F]/.test(char))) {
                    return false
                }
            }
        }
        // If all blocks are valid, return true
        return true;
    }
    if (isIPv4()) {
        return 'IPv4';
    }
    else if (isIPv6()) {
        return 'IPv6';
    }
    else {
        return 'Neither';
    }
}

let queryIP = "172.16.254.01";
queryIP = "2001:0db8:85a3:0:0:8A2E:0370:7334";
// queryIP = "256.256.256.256"
console.log(validIPAddress(queryIP));