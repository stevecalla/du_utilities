// const pLimit = require('p-limit');
// require("dotenv").config();
// const { seedData } = require("./seed"); //used to figure out data mapping
// const { getOwnerRepoInfo } = require("./seedUrls");

import { getOwnerRepoInfo } from "./seedUrls.js";
import PQueue from 'p-queue';
import "dotenv/config";
// import pLimit from "p-limit";

//SECTION //STEP #1: GET REPO INFO FROM SEEDURL FILE

function getInfo() {
  let repoInfo = getOwnerRepoInfo(); //get repo url list/info
  createRepoRequestUrl(repoInfo); //create api url
}

//SECTION //STEP #3: FETCH STATS
// const limit = pLimit(5);
const queue = new PQueue({concurrency: 5});

const options = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  },
};

let currentDate = new Date();
// let formattedDate = new Intl.DateTimeFormat("en", {dateStyle: "short", timeStyle: "short"}).format(currentDate);
let formattedDate = currentDate.toLocaleString("en-US", {
  // weekday: "short",
  // year: "2-digit", //numeric
  month: "numeric", //long, short
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  // second: "numeric",
  // dayPeriod: "short", //short, long, narrow
});

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

let queueCount = 0;
let errorCount = 0;
let controller = new AbortController(); //should abort api calls on error
const signal = controller.signal;

async function fetchContributorStats(requestUrl, repoInfo) {
  //aggregate all the fetches into an array
  const promises = [];
  for (let i = 0; i < requestUrl.length; i++) {
    const url = requestUrl[i];
    // promises.push(fetch(url, options).then((res) => res.json()));
    // promises.push(fetch(url, options));
    // promises.push(limit(() => fetch(url, options)));
    // promises.push(queue.add(() => fetch(url, options)));
    promises.push(queue.add(() => fetch(url, options, { signal })));
  }

  // let queueCount = 0;
  // queue.on('active', () => {
  //   console.log(`Working on item #${++queueCount}.  Size: ${queue.size}  Pending: ${queue.pending}`);
  // });

  queue.on('next', () => {
    console.log(`Working on item #${++queueCount}. Task is completed.  Size: ${queue.size}  Pending: ${queue.pending}`);
  });
  
  queue.on('error', error => {
    console.error(error);
  });

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
    errorCount = errorCount + 1;
    console.log(errorCount);

    if (errorCount < 5) { //if error, retry API call 5 (actually 4) times
      controller.abort();
      console.log('API Call Aborted');
      queue.clear();
      queueCount = 0;

      setTimeout(() => {
        fetchContributorStats(requestUrl, repoInfo);
      }, 1000);
    } else {
      throw Error("Promise failed = " + error);
    }
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
// const fs = require('fs');
import fs from 'fs';

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
        date: formattedDate,
      });
    }
  });
  console.table(statsByContributor);


  exportToExcel(statsByContributor);
}

import excel from 'exceljs';
import { exec } from 'child_process'; ////open excel file

async function exportToExcel(parsedData) {
  let date = new Date().toISOString();
  const outputName = `project1_contribution_data_${date}.xlsx`;
  const outputFile = `/Users/stevecalla/Downloads/${outputName}`;

  const workbook = new excel.Workbook();
  const worksheet = workbook.addWorksheet('Sheet 1');

  // Assuming the keys in the first object of the data array are the headers
  const headers = Object.keys(parsedData[0]);
  worksheet.addRow(headers);

  parsedData.forEach(row => {
    const values = Object.values(row);
    worksheet.addRow(values);
  });

  try {
    await workbook.xlsx.writeFile(outputFile);
    console.log('Excel file created:', outputFile);

    // Open excel file
    openFileWithDefaultProgram(outputFile);

  } catch (error) {
    console.error('Error:', error);
  }
}

function openFileWithDefaultProgram(filePath) {
  exec(`open "${filePath}"`);
}


getInfo(); //starts the process
