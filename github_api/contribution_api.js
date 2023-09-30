// const pLimit = require('p-limit');
// require("dotenv").config();
// const { seedData } = require("./seed"); //used to figure out data mapping
// const { getOwnerRepoInfo } = require("./seedUrls");

import pLimit from "p-limit";
import "dotenv/config";
import { getOwnerRepoInfo } from "./seedUrls.js";

//SECTION //STEP #1: GET REPO INFO FROM SEEDURL FILE

function getInfo() {
  let repoInfo = getOwnerRepoInfo(); //get repo url list/info
  createRepoRequestUrl(repoInfo); //create api url
}

//SECTION //STEP #3: FETCH STATS
const limit = pLimit(5);

function reduceStat(data, stat) {
  let stats = data.map((element) => {
    let commits = 0;
    for (let i = 0; i < element.weeks.length; i++) {
      commits += element.weeks[i][stat]; // commits += element.weeks[i].c;
    }
    return commits;
  });
  return stats;
}

const options = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  },
};

async function fetchContributorStats(requestUrl, repoInfo) {
  //aggregate all the fetches into an array
  const promises = [];
  for (let i = 0; i < requestUrl.length; i++) {
    const url = requestUrl[i];
    // promises.push(fetch(url, options).then((res) => res.json()));
    // promises.push(fetch(url, options));
    promises.push(limit(() => fetch(url, options)));
  }

  try {
    const response = await Promise.all(promises); //execute the array of promises
    const data = await Promise.allSettled(response?.map((response) => response.json()));

    console.table(data.map((element) => element));

    const combinedData = data?.map((data, i) => {
      return {
        status: data?.status,
        group: repoInfo[i]?.group,
        owner: repoInfo[i]?.owner,
        repoName: repoInfo[i]?.repoName,
        contributor: data.value.map((element) => element.author.login),
        commits: reduceStat(data.value, "c"),
        adds: reduceStat(data.value, "a"),
        deletes: reduceStat(data.value, "d"),
        url: repoInfo[i]?.url,
      };
    });
    renderContributorStats(combinedData, repoInfo);
  } catch (error) {
    throw Error("Promise failed" + error);
  }
}

//SECTION //STEP #2: CREATE REPO FETCH URL
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

//SECTION //STEP #4: RENDER STATS IN TERMINAL
function renderContributorStats(combinedData) {
  let statsByContributor = [];

  combinedData.map((element) => {
    for (let i = 0; i < element.contributor.length; i++) {
      statsByContributor.push({
        // status: element.status,
        group: element.group,
        owner: element.owner,
        repoName: element.repoName,
        contributor: element.contributor[i],
        commits: element.commits[i],
        adds: element.adds[i],
        deletes: element.deletes[i],
        url: element.url,
      });
    }
  });
  console.table(statsByContributor);
}

getInfo(); //starts the process
