// https://github.com/aceakash/string-similarity#readme
// https://www.npmjs.com/package/string-similarity

// import stringSimilarity from 'string-similarity';
const stringSimilarity = require("string-similarity");
const { participantRoster, list081423, list081723, list082423 } = require('./data');

function findSimilarNames(participantRoster, list2) {
  const similarNames = [];

  participantRoster.forEach(name1 => {
    list2.forEach(name2 => {
      const similarity = stringSimilarity.compareTwoStrings(name1, name2);
      if (similarity >= 0.7) { // You can adjust the similarity threshold
        similarNames.push({ name1, name2, similarity });
      }
    });
  });
  return similarNames;
};

function findNotSimilarNames(participantRoster, list2) {
  const similarNames = [];

  participantRoster.forEach(name1 => {
    list2.forEach(name2 => {
      const similarity = stringSimilarity.compareTwoStrings(name1, name2);
      if (similarity >= 0.7) { // You can adjust the similarity threshold
        similarNames.push({ name1, name2, similarity });
      }
    });
  });
  return similarNames;
};

function findMaxSimilarityScores(participantRoster, list2) {
  const maxSimilarityScores = [];

  let count = 0;
  participantRoster.forEach(name1 => {
    let maxSimilarity = 0;
    let matchName = "";
    count++;

    list2.forEach(name2 => {
      const similarity = stringSimilarity.compareTwoStrings(name1, name2);
      if (similarity > maxSimilarity) {
        maxSimilarity = similarity;
        matchName = name2;
      }
    });

    maxSimilarityScores.push({ index: count, name: name1, matchName: matchName, maxSimilarity });
  });

  return maxSimilarityScores;
}

function findMaxSimilarityScoresLessThan50(participantRoster, list2) {
  const maxSimilarityScoresLessThan50 = [];

  let count = 0;
  participantRoster.forEach(name1 => {
    let maxSimilarity = 0;
    let matchName = "";
    count++;

    list2.forEach(name2 => {
      const similarity = stringSimilarity.compareTwoStrings(name1, name2);
      if (similarity > maxSimilarity) {
        maxSimilarity = similarity;
        matchName = name2;
      }
    });

    if(maxSimilarity < 0.5) {
      maxSimilarityScoresLessThan50.push({ index: count, name: name1, matchName: matchName, maxSimilarity });      
    }
  });

  return maxSimilarityScoresLessThan50;
}

// Create a Set to eliminate duplicates
const uniqueList2 = new Set(list081723);
// Convert the Set back to an array
const list2 = Array.from(uniqueList2);

// const similarNames = findSimilarNames(participantRoster, list2);
// console.log(similarNames);
// console.log(similarNames.length);

// const notSimilarNames = findNotSimilarNames(participantRoster, list2);
// console.log(notSimilarNames);
// console.log(notSimilarNames.length);

const maxSimilarityScores = findMaxSimilarityScores(participantRoster, list2);
console.log(maxSimilarityScores);
console.log(maxSimilarityScores.length);

const maxSimilarityScoresLessThan50 = findMaxSimilarityScoresLessThan50(participantRoster, list2);
console.log(maxSimilarityScoresLessThan50);
console.log(maxSimilarityScoresLessThan50.length);
console.log(list081723.length);
console.log(list2.length);
console.log(maxSimilarityScoresLessThan50.length);