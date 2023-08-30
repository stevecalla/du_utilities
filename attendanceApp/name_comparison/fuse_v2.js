import Fuse from 'fuse.js';

// 1. List of items to search in
const books = [
  {
    title: "Old Man's War",
    author: {
      firstName: 'John',
      lastName: 'Scalzi'
    }
  },
  {
    title: 'The Lock Artist',
    author: {
      firstName: 'Steve',
      lastName: 'Hamilton'
    }
  }
]

// 2. Set up the Fuse instance
const fuse = new Fuse(books, {
  // keys: ['title', 'author.firstName', 'author.lastName',],
  keys: ['title'],
  includeMatches: true,
  threshold: 0.5,
  includeScore: true,
})

// 3. Now search!
let test = fuse.search('The Lock Artist')

console.log(fuse);
console.log(test.map(item => item));

// Output:
// [
//   {
//     item: {
//       title: "Old Man's War",
//       author: {
//         firstName: 'John',
//         lastName: 'Scalzi'
//       }
//     },
//     refIndex: 0
//   }
// ]