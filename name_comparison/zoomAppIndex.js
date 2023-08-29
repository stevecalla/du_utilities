// https://github.com/aceakash/string-similarity#readme
// https://www.npmjs.com/package/string-similarity
// npm install string-similarity
// https://blog.logrocket.com/using-console-colors-node-js/
// convert from es5 to es6 to use chalk https://www.digitalocean.com/community/tutorials/js-modules-es6

//todo paste "type": "module" in package.json under main index.js line to run
// const stringSimilarity = require("string-similarity");
// const { chalk } = require("chalk");
import stringSimilarity from 'string-similarity';
import chalk from 'chalk';

// DATA
// const { attendeeRoster, zoomParticipants081723 } = require('./zoomAppData');
import { attendeeRoster, zoomParticipants081723 } from './zoomAppData.js';

// FUNCTION
function findMaxSimilarityScores(attendeeRoster, zoomParticipants081723) {
  const maxSimilarityScores = [];
  let count = 0;

  attendeeRoster.forEach(attendee => {

    let maxSimilarity = 0;
    let matchName = "";
    count++;

    zoomParticipants081723.forEach(participant => {
      const similarity = stringSimilarity.compareTwoStrings(attendee, participant.screenName);
      if (similarity > maxSimilarity) {
        maxSimilarity = similarity;
        matchName = participant.screenName;
      }
    });

    maxSimilarityScores.push({ index: count, attendee: attendee, matchName: matchName, maxSimilarity });
  });

  return maxSimilarityScores;
}

const maxSimilarityScores = findMaxSimilarityScores(attendeeRoster, zoomParticipants081723);
console.log(maxSimilarityScores.forEach((score, i) => {
  if (score.maxSimilarity <= 0.5) {
    console.log(chalk.red((i + 1) + "=> " + `${score.attendee}      ${Math.floor(score.maxSimilarity * 100)}%       ${score.matchName}`)); 
  } else if (score.maxSimilarity <= 0.7) {
    console.log(chalk.yellow((i + 1) + "=> " + `${score.attendee}      ${Math.floor(score.maxSimilarity * 100)}%       ${score.matchName}`)); 
  } else {
    console.log(chalk.green((i + 1) + "=> " + `${score.attendee}      ${Math.floor(score.maxSimilarity * 100)}%       ${score.matchName}`)); 
  }
  }));

console.log(chalk.yellow(maxSimilarityScores.length));

let present = maxSimilarityScores.filter(({maxSimilarity}) => maxSimilarity > 0.50);
let absent = maxSimilarityScores.filter(({maxSimilarity}) => maxSimilarity <= 0.50);

console.log(present.length + " " + absent.length + " " + maxSimilarityScores.length)