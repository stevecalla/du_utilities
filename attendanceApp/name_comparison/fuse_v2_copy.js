import Fuse from 'fuse.js';
import { participantRoster, list_today, list081423, list081723, list082423 } from './data.js';

// 1. List of items to search in
const names = [
  {
    fullName: "Steve Calla",
  },
  {
    fullName: "mickey mouse"
  },
  {
    fullName: "Steve# Calla"
  }
]

// 2. Set up the Fuse instance
const fuse = new Fuse(names, {
  keys: ['fullName'],
  includeScore: true,
  includeMatches: true,
  threshold: 0.5,
})

// // 3. Now search!
// let searchInput = 'Steve# Calla';
// let searchInput_v2 = ['mickey mouse', 'steve calla']
// let results = fuse.search(searchInput)

// console.log(fuse);
// console.log(results.map(result => result));
// console.log(results.map(result => result.matches));
// console.log(results.map(result => result.matches.indices));

// 4. Convert score value to two decimal places and round up
// results = results.map(result => ({
//   ...result,
//   score: Math.ceil(result.score * 100) / 100 // Rounded up to two decimal places
// }));

// 3. Define an array of search queries
let searchInput_v2 = ['mickey mouse', 'steve calla'];

// 4. Search for each query in searchInput_v2

// 4. only return matches
// const resultsMatch = searchInput_v2.map(query => {
//   return {
//     query,
//     results: fuse.search(query)
//   };
// });

// 4.1 Search for each query in searchInput_v2 and return results, including no match
const resultsAll = searchInput_v2.map(query => {
  const matchResults = fuse.search(query);
  const bestMatch = matchResults.length > 0 ? matchResults[0] : {
    item: null,
    matches: [],
    score: 1.0 // Set score to 1.0 for no match
  };
  return {
    query,
    bestMatch
  };
});

// Display results for searchInput_v2
let finalResults = resultsAll.map(item => {
  // console.log(item)
  // console.log(`Results for query '${item.query}':`);
  // console.log(item.bestMatch.item.fullName);
  // console.log(item.bestMatch.matches[0].value);
  // console.log(item.bestMatch.score);
  return {
    name: item.bestMatch.item.fullName,
    matchName: item.bestMatch.matches[0].value,
    matchNameLength: item.bestMatch.matches.length,
    // score: item.bestMatch.score,
    scoreRounded: Math.ceil(item.bestMatch.score * 100) / 100, // Rounded up to two decimal places
    scoreConverted: 1 - (Math.ceil(item.bestMatch.score * 100) / 100), // Rounded up to two decimal places
  }
});

console.log(finalResults)
