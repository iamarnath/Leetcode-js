/*
write javascript code to minify AAABBAA to 3A2B2A
*/
function minifyRunLength(str) {
  if (!str) return "";
  let result = "";
  let currentChar = str[0];
  let count = 1;

  for (let i = 1; i < str.length; i++) {
    if (str[i] === currentChar) {
      count++;
    } else {
      result += count + currentChar;
      currentChar = str[i];
      count = 1;
    }
  }
  // Add the last run
  result += count + currentChar;
  return result;
}

// Example usage:
console.log(minifyRunLength("AAABBAA")); // Output: "3A2B2A"

//If you want "AAABBAA" → "5A2B" (count all As and all Bs), you need a different function:

function countChars(str) {
  const counts = {};
  for (const char of str) {
    counts[char] = (counts[char] || 0) + 1;
  }
  let result = "";
  for (const [char, count] of Object.entries(counts)) {
    result += count + char;
  }
  return result;
}

console.log(countChars("AAABBAA")); // Output: "5A2B"
