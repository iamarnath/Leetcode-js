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
const originalStrings = ["neet_","code_","love_","you_"]
const encoded = encode(originalStrings);
const decoded = customDecode(encoded);

console.log("Original:", originalStrings);
console.log("Encoded:", encoded);
console.log("Decoded:", decoded);
