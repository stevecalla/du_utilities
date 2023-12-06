// let seedUrls = [
//   "https://github.com/haleybrokaw/Get-Er-Done",
//   "https://github.com/Malili05/Campground-finder",
//   "https://github.com/Nehoa21/Tourist-Attraction-Locator",
//   "https://github.com/stevecalla/integral-solutions-dev",
// ];

// project #2
let seedUrls = [
  "https://github.com/eymerin/TTRPG-Inventory-Bot", //#1
  "https://github.com/Malili05/Christmas-Karma", //#2
  "https://github.com/DAsh365/Project-2", //#3
  "https://github.com/tavargas9/DishDiscovery", //#4
  "https://github.com/Phansen47/FoodFeed", //#5
  "https://github.com/joshhigg/syntax-social", //#6
  "https://github.com/britt-young/get_your_list_together", //#7
  "https://github.com/shawncrook411/minigame", //#8
  "https://github.com/GADAMS45/FitAF", //#9
  "https://github.com/loganlosee/Rotten-Trails", //#10
  "https://github.com/G-marshall1/Hype", //#11
]

//project #1
// let seedUrls = [
//   "https://github.com/haleybrokaw/Get-Er-Done", //1
//   "https://github.com/Malili05/Campground-finder", //2
//   "https://github.com/G-marshall1/Home-Builder-Buddy", //3
//   "https://github.com/Krich2022/reel-roulette", //4
//   "https://github.com/Nehoa21/Tourist-Attraction-Locator", //5
//   "https://github.com/cpulsipher24/Movie-Knight", //6
//   "https://github.com/phechzzz/BoozeBot", //7
//   "https://github.com/nicholasmelo/SightScene", //8
//   "https://github.com/SlemJosh/culinary-crossroads", //9
//   "https://github.com/shawncrook411/Mindful_Meals", //10
//   "https://github.com/JackieChheng/JAMSearchGamers", //11
//   "https://github.com/whitbreezy/get-rhythm", //12
//   "https://github.com/DAsh365/project-1", //13
//   "https://github.com/tavargas9/movie-soundtrack-id", //14
//   "https://github.com/JJTheDev/Fitness-App", //15
//   "https://github.com/Phansen47/GroceryGO", //16
// ];

const getOwnerRepoInfo = function () {
  let group = 0;
  let ownerRepoList = seedUrls.map((url) => {
    const urlParts = url.split("/"); //split url by "/"
    return {
      group: ++group, //group number
      owner: urlParts[3], //get owner
      repoName: urlParts[4], //get repo
      url: url,
    };
  });
  // console.log(ownerRepoList);
  return ownerRepoList;
};

export { getOwnerRepoInfo };

// module.exports = {
//   seedUrls,
//   getOwnerRepoInfo,
// };
