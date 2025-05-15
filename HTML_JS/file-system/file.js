// File System Traversal in Pure JavaScript
// Here's a complete implementation in pure JavaScript (without TypeScript) that handles directory traversal with file filtering:


// File System Structure Representation
const fileSystem = {
  name: 'root',
  path: '/',
  type: 'directory',
  size: 0,
  children: [
    {
      name: 'documents',
      path: '/documents',
      type: 'directory',
      size: 0,
      children: [
        {
          name: 'report.xml',
          path: '/documents/report.xml',
          type: 'file',
          size: 7 * 1024 * 1024, // 7MB
          extension: '.xml'
        },
        {
          name: 'data.json',
          path: '/documents/data.json',
          type: 'file',
          size: 2 * 1024 * 1024, // 2MB
          extension: '.json'
        }
      ]
    },
    {
      name: 'images',
      path: '/images',
      type: 'directory',
      size: 0,
      children: [
        {
          name: 'photo1.jpg',
          path: '/images/photo1.jpg',
          type: 'file',
          size: 3 * 1024 * 1024, // 3MB
          extension: '.jpg'
        },
        {
          name: 'config.xml',
          path: '/images/config.xml',
          type: 'file',
          size: 6 * 1024 * 1024, // 6MB
          extension: '.xml'
        }
      ]
    },
    {
      name: 'large.xml',
      path: '/large.xml',
      type: 'file',
      size: 10 * 1024 * 1024, // 10MB
      extension: '.xml'
    }
  ]
};

// Generic file finder function
function findFiles(directory, filterFn) {
  const results = [];
  
  function traverse(node) {
    if (node.type === 'file' && filterFn(node)) {
      results.push(node);
    }
    
    if (node.type === 'directory' && node.children) {
      node.children.forEach(child => traverse(child));
    }
  }
  
  traverse(directory);
  return results;
}

// Filter functions
function isXmlFile(file) {
  return file.extension.toLowerCase() === '.xml';
}

function isLargeFile(file, minSize = 5 * 1024 * 1024) {
  return file.size > minSize;
}

function isLargeXmlFile(file) {
  return isXmlFile(file) && isLargeFile(file);
}

// Usage examples
console.log('All XML files:');
console.log(findFiles(fileSystem, isXmlFile));

console.log('\nAll files larger than 5MB:');
console.log(findFiles(fileSystem, file => isLargeFile(file)));

console.log('\nAll XML files larger than 5MB:');
console.log(findFiles(fileSystem, isLargeXmlFile));

// Alternative: Combining filters on the fly
console.log('\nCombined filter example (XML and >5MB):');
console.log(findFiles(fileSystem, file => {
  return isXmlFile(file) && isLargeFile(file);
}));

/*
Key Features:
File System Representation:

Uses a nested object structure to represent files and directories

Each item has type, name, path, size, and either extension (for files) or children (for directories)

Core Traversal Function:

findFiles() handles recursive directory traversal

Accepts any filter function, making it extremely flexible

Returns an array of matching files

Filter Functions:

isXmlFile() checks for XML extensions

isLargeFile() checks file size (default 5MB threshold)

isLargeXmlFile() combines both filters

Reusability:

The same findFiles() function works with any filter criteria

Filters can be combined in any way needed

New filters can be added without modifying the traversal logic

How to Explain in an Interview:
Start with the Data Structure:

Explain how you're representing files and directories

Highlight the recursive nature of directories containing children

Explain the Traversal Algorithm:

Depth-first search approach

Recursive function that handles both files and directories

Base case (file) vs recursive case (directory)

Discuss the Filtering Approach:

Higher-order function pattern (findFiles takes a filter function)

Separation of concerns (traversal vs filtering logic)

How this enables composition of filters

Demonstrate Usage:

Show specific examples (XML files, large files)

Show how to combine filters

Mention how easy it would be to add new filter types

Potential Improvements:

Async version for real filesystems

Breadth-first search option

Memory optimization for very deep directories

Error handling for malformed structures

This implementation shows a clean, functional approach to solving the problem while demonstrating good JavaScript practices like higher-order functions and recursion.

*/