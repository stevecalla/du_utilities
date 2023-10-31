// https://coding-boot-camp.github.io/full-stack/apis/api-resources

//SECTION //search loc api
let searchLocButton = document.getElementById("search-locApi");
searchLocButton.addEventListener("click", fetchLocApi);

let locUrl = "https://www.loc.gov/film-and-videos/?q=dog&fo=json";

function fetchLocApi() {
  fetch(locUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

//SECTION //Cocktail DB from RapidAPI
//https://rapidapi.com/thecocktaildb/api/the-cocktail-db
//other similar apis https://rapidapi.com/collection/alcohol-brewery-api
//don't know if this works https://www.thecocktaildb.com/api.php with the test auth of 1 per the site
//don't know if this works https://api-ninjas.com/api/cocktail

//search by ingredient
// const url = 'https://the-cocktail-db.p.rapidapi.com/filter.php?i=Gin';

//search by ingredient name
// const url = 'https://the-cocktail-db.p.rapidapi.com/search.php?i=vodka';

let searchCockTailButton = document.getElementById("search-cockTailApi");
searchCockTailButton.addEventListener("click", fetchCockTailApi);

//search cocktail by name
// const url = 'https://the-cocktail-db.p.rapidapi.com/search.php?s=vodka';
const cockTailbyNameUrl = "https://the-cocktail-db.p.rapidapi.com/search.php?s=bloody%20mary";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "f5add9fa36msh0b155351f2459b5p1cfb32jsn20deeda03301",
    "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
  },
};

function fetchCockTailApi() {
  fetch(cockTailbyNameUrl, options)
    .then(function (response, json) {
      if (!response.ok) {
        // We should get a 200 (OK) status code if everything is fine/working
        throw Error(
          `Respsonse status ${response.status} (${response.statusText}): ${json.message}`
        );
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })
    .catch((exception) => {
      console.log(
        new Map([
          [TypeError, "There was a problem fetching the response."],
          [SyntaxError, "There was a problem parsing the response."],
          [Error, exception.message],
        ]).get(exception.constructor())
      );
    });
}

//SECTION //google places
//https://developers.google.com/maps/documentation/javascript/places
