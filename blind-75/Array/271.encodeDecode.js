/*
271. Encode and Decode Strings - Explanation
Problem Link

Description
Design an algorithm to encode a list of strings to a single string. The encoded string is then decoded back to the original list of strings.

Please implement encode and decode

Example 1:

Input: ["neet","code","love","you"]

Output:["neet","code","love","you"]
Example 2:

Input: ["we","say",":","yes"]

Output: ["we","say",":","yes"]
Constraints:

0 <= strs.length < 100
0 <= strs[i].length < 200
strs[i] contains only UTF-8 characters.

*/

/*

To decode the strings reliably, the encoded string must
contain information about the length of each original string.
This code uses a 4-byte prefix to store the length of
each string before the string itself.

For each string in the input array:

    It calculates the string length.

    It stores the length as a 4-byte (32-bit) unsigned
    integer in an ArrayBuffer.

    Converts this 4-byte buffer into 4 characters
    (each character corresponds to a byte).

    Appends these 4 characters to the encoded string.

    Then appends the original string itself.

    The final result is a single string that looks like:
    [4 bytes length][string][4 bytes length][string]...

*/

function encode(strs) {
    let encodedString = '';

    for (const str of strs) {
        // Convert the size to a 32-bit integer and add it to the result.
        const size = str.length;
        const buffer = new ArrayBuffer(4);
        const view = new DataView(buffer);

        view.setUint32(0, size);
        console.log("view==", view)
        // Convert the ArrayBuffer to a string and append it to the result.
        encodedString += String.fromCharCode.apply(null, new Uint8Array(buffer));
        // Append the actual string data.
        encodedString += str;
    }

    return encodedString;
}

/*
The function reads the encoded string sequentially.

For each string:

It reads the first 4 characters (bytes) to get the length of the next string.

Converts those 4 characters back into a 32-bit unsigned integer.

Extracts the substring of that length.

Adds the extracted string to the result array.

Moves forward in the encoded string to process the next string.

Continues until the entire encoded string is processed.
*/
function customDecode(s) {
    const decodedStrings = [];

    let i = 0;

    while (i < s.length) {
        const buffer = new ArrayBuffer(4);
        const view = new DataView(buffer);

        for (let j = 0; j < 4; j++) {
            view.setUint8(j, s.charCodeAt(i + j));
        }

        const stringSize = view.getUint32(0);
        i += 4;

        const str = s.substring(i, i + stringSize);
        decodedStrings.push(str);
        i += stringSize;
    }

    return decodedStrings;
}

// Example usage:
//const originalStrings = ['hello', 'world'];
// const originalStrings = ["neet_","code_","love_","you_"]
// const encoded = encode(originalStrings);
// const decoded = customDecode(encoded);

// console.log("Original:", originalStrings);
// console.log("Encoded:", encoded);
// console.log("Decoded:", decoded);



class Solution {
    /**
     * @param {string[]} strs
     * @returns {string}
     */
    encode(strs) {
        let res = "";
        for (let s of strs) {
            res += s.length + "#" + s;
        }
        return res;
    }

    /**
     * @param {string} str
     * @returns {string[]}
     */
    decode(str) {
        let res = [];
        let i = 0;
        while (i < str.length) {
            let j = i;
            while (str[j] !== "#") {
                j++;
            }
            
            let length = parseInt(str.substring(i, j));
            console.log({i,j,length})
            i = j + 1;
            j = i + length;
            res.push(str.substring(i, j));
            console.log("str--",str)
            i = j;
        }
        return res;
    }
}

let s = new Solution();

let input = ["neet4#code", "code", "love", "you"]

let en = s.encode(input);

console.log("encoded==", en);

let decode = s.decode(en);

console.log("decoded==", decode)
