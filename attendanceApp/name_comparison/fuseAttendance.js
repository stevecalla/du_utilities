import Fuse from 'fuse.js';
import { participantRoster, list_today, list081423, list081723, list082423, list_082823 } from './data.js';

// 1. List of items to search in
// see import above... list_today
// convert to include a names key
let names = list_082823.map(names => {
  return {
    fullName: names,
  }
});

// console.log(names);

// 2. Set up the Fuse instance
const fuse = new Fuse(names, {
  keys: ['fullName'],
  includeScore: true,
  includeMatches: true,
  threshold: 0.9,
})

// 3. Define an array of search queries
// let searchInput = ['mickey mouse', 'steve calla'];
let searchInput = ['Adams, Gregory', 'Greg Adams'];
// let searchInput = participantRoster;

// 4. only return matches
// const resultsMatch = searchInput_v2.map(query => {
//   return {
//     query,
//     results: fuse.search(query)
//   };
// });

// 4.1 Search for each query in searchInput_v2 and return results, including no match
const resultsAll = searchInput.map((query, index) => {
  console.log(index + " " + query)
  const matchResults = fuse.search(query);
  // console.log(index + " " + matchResults[600].score, matchResults[600].item);
  const bestMatch = matchResults.length > 0 ? matchResults[0] : {
    item: query, // returns query name
    matches: "no match", // returns no match
    score: 1.0 // Set score to 1.0 for no match
  };
  return {
    query,
    bestMatch
  };
});

// Display results for searchInput_v2
let finalResults = resultsAll.map(item => {
  return {
    name: item?.bestMatch?.item?.fullName || item.query,
    matchName: item?.bestMatch?.matches[0]?.value || "no match",
    matchNameLength: item?.bestMatch?.matches?.length || 0,
    // score: item.bestMatch.score, //original fuse score
    scoreRounded: Math.ceil(item.bestMatch.score * 100) / 100, // Rounded up to two decimal places
    scoreConverted: 1 - (Math.ceil(item.bestMatch.score * 100) / 100), // Rounded up to two decimal places
  }
});

console.log(finalResults);
console.log(finalResults.length);
console.log(finalResults.forEach(result => console.log(result.name + " " + result.scoreConverted + " " + result.matchName)))
