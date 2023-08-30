// https://github.com/aceakash/string-similarity#readme
// https://www.npmjs.com/package/string-similarity
// npm install string-similarity

import stringSimilarity from 'string-similarity';
import { participantRoster, list_today, list_082823, list081423, list081723, list082423 } from './data.js';
import chalk from 'chalk';

// const stringSimilarity = require("string-similarity");
// const { participantRoster, list_today, list081423, list081723, list082423 } = require('./data');

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
const uniqueList2 = new Set(list_today);
// Convert the Set back to an array
const list2 = Array.from(uniqueList2);

// const similarNames = findSimilarNames(participantRoster, list2);
// console.log(similarNames);
// console.log(similarNames.length);

// const notSimilarNames = findNotSimilarNames(participantRoster, list2);
// console.log(notSimilarNames);
// console.log(notSimilarNames.length);

// const maxSimilarityScores = findMaxSimilarityScores(participantRoster, list2);
// console.log(maxSimilarityScores);
// console.log(maxSimilarityScores.length);

const maxSimilarityScoresLessThan50 = findMaxSimilarityScoresLessThan50(participantRoster, list2);
console.log(maxSimilarityScoresLessThan50);
console.log(maxSimilarityScoresLessThan50.length);
console.log(list_today.length);
console.log(list2.length);
console.log(maxSimilarityScoresLessThan50.length);


const maxSimilarityScores = findMaxSimilarityScores(participantRoster, list2);
let count = 0;
console.log(maxSimilarityScores.forEach((score, i) => {
  count++;
  if (score.maxSimilarity <= 0.5) {
    console.log(count + ") " + chalk.red((i) + "=> " + `${score.name}      ${Math.floor(score.maxSimilarity * 100)}%       ${score.matchName}`)); 
  } else if (score.maxSimilarity <= 0.7) {
    console.log(count + ") " + chalk.yellow((i) + "=> " + `${score.name}      ${Math.floor(score.maxSimilarity * 100)}%       ${score.matchName}`)); 
  } else {
    console.log(count + ") " + chalk.green((i) + "=> " + `${score.name}      ${Math.floor(score.maxSimilarity * 100)}%       ${score.matchName}`)); 
  }
  }));

console.log(chalk.yellow(maxSimilarityScores.length));
let present = maxSimilarityScores.filter(({maxSimilarity}) => maxSimilarity > 0.50);
let absent = maxSimilarityScores.filter(({maxSimilarity}) => maxSimilarity <= 0.50);
console.log(list_today.length + " " + present.length + " " + absent.length + " " + maxSimilarityScores.length)

count = 0;
console.log(maxSimilarityScores.forEach((score, i) => {
  if (score.maxSimilarity <= 0.5) {
    count++;
    console.log(count + ") " + chalk.red((i + 1) + "=> " + `${score.name}      ${Math.floor(score.maxSimilarity * 100)}%       ${score.matchName}`)); 
  } 
  }));
  

let inputPlug = maxSimilarityScores.map((score, i) => {
  let status = score.maxSimilarity <= 0.5 ? "Absent" : "Present";
  return status;
  return {
    // index: i,
    // studentName: score.name,
    // status: status,
    // matchName: score.matchName,
    // score: score.maxSimilarity,
  }
});

console.log(inputPlug);
console.log(inputPlug.length);

import clipboardy from 'clipboardy';
//PRINT ATTENDANCE STATUS TO CLIPBOARD
// //create string and copy to clipboard
let inputPlugString = inputPlug.map(name => `\"${name}\"`).join(', ');
clipboardy.writeSync(inputPlugString);
console.log(inputPlugString);
// console.log('Names saved to clipboard ' + sortedParticipants.length);

  
