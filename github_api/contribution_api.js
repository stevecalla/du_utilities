// https://docs.github.com/en/rest/metrics/statistics?apiVersion=2022-11-28#get-all-contributor-commit-activity
const { seedData } = require("./seed");
const { seedUrls, getOwnerRepoInfo } = require("./seedUrls");
require("dotenv").config();

const options = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  },
};

//SECTION //STEP #1: GET REPO INFO FROM SEEDURL FILE
getInfo();

function getInfo() {
  let repoInfo = getOwnerRepoInfo();
  createRepoRequestUrl(repoInfo);
}

//SECTION //STEP #2: CCREATE REPO FETCH URL
function createRepoRequestUrl(repoInfo) {
  // fetch repo contribution stats = commits, adds, deletes by author
  // let requestUrl = 'https://api.github.com/orgs/stevecalla/repos';
  // let requestUrl = 'https://api.github.com/repos/stevecalla/integral-solutions-dev/stats/contributors';

  let repoArray = repoInfo.map((repo) => {
    let repoName = repo.repoName; //"Tourist-Attraction-Locator";
    let owner = repo.owner; //"Nehoa21";
    let baseUrl = "https://api.github.com/repos/";
    let tailUrl = "/stats/contributors";

    //fix use requestUrl = "" for testing
    // let requestUrl = ``;
    let requestUrl = `${baseUrl}${owner}/${repoName}${tailUrl}`;
    // console.log(requestUrl);
    return requestUrl;
  });

  fetchContributorStats(repoArray, repoInfo);
}

//SECTION //STEP #3: FETCH STATS
//Original fetch code
// function fetchContributorStats(requestUrl, group, repo, owner) {
//   console.log(requestUrl);
//   if (!requestUrl) {
//     renderContributorStats(seedData, group, repo, owner);
//   } else {
//     fetch(requestUrl)
//       .then(function (response, json) {
//         if (!response.ok) {
//           let response = data;
//           // We should get a 200 (OK) status code if everything is fine/working
//           throw Error(
//             `Response status ${response.status} (${response.statusText}): ${json.message}`
//           );
//         }
//         return response.json();
//       })
//       .then(function (data) {
//         // console.log(data); //raw data
//         renderContributorStats(data, group, repo, owner);
//       })
//       .catch((exception) => {
//         console.log(
//           new Map([
//             [TypeError, "There was a problem fetching the response."],
//             [SyntaxError, "There was a problem parsing the response."],
//             [Error, exception.message],
//           ]).get(exception.constructor())
//         );
//       });
//   }
// }

//Promised fetch code to ensure all fetchs settle using promise all
function fetchContributorStats(requestUrl, repoInfo) {
  // console.log(requestUrl);

  const promises = [];
  for (let i = 0; i < requestUrl.length; i++) {
    const url = requestUrl[i];
    promises.push(fetch(url, options).then((res) => res.json()));
  }

  // console.log(promises);

  Promise.all(promises).then((results) => {
    console.table(results);
    renderContributorStats(results, repoInfo, results.status);
    return results;
  })
}

//SECTION //STEP #4: RENDER STATS IN TERMINAL
function renderContributorStats(data, repoInfo) {
  // console.log(repoInfo);
  let statsByContributor = [];

  for (let i = 0; i < data.length; i++) {
    let groupData = data[i];
    for (let j = 0; j < groupData.length; j++) {
      let contributor = data[i][j];
      statsByContributor.push({
        group: repoInfo[i].group || 0,
        owner: repoInfo[i].owner || "",
        repoName: repoInfo[i].repoName || "",
        contributor: contributor.author.login,
        commits: contributor.total,
        commits: contributor.weeks
          .map((week) => week.c)
          .reduce((acc, cur) => (acc += cur)),
        adds: contributor.weeks
          .map((week) => week.a)
          .reduce((acc, cur) => (acc += cur)),
        deletes: contributor.weeks
          .map((week) => week.d)
          .reduce((acc, cur) => (acc += cur)),
        url: repoInfo[i].url,
      });
    }
  }
  console.table(statsByContributor);
}
