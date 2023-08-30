//https://www.npmjs.com/package/fuse.js?activeTab=readme
//https://github.com/krisk/Fuse
//https://www.fusejs.io/

// import Fuse from 'fuse.js';
// const Fuse = require('fuse.js');
import Fuse from 'fuse.js';

function findSimilarNames(list1, list2) {
  const options = {
    shouldSort: true,
    threshold: 0.7,
    keys: ['name'],
  };

  const fuse = new Fuse(list2, options);

  const similarNames = [];
  list1.forEach(name1 => {
    const searchResults = fuse.search(name1);
    console.log(searchResults);
    if (searchResults.length > 0) {
      const name2 = searchResults[0].item.name;
      const similarity = searchResults[0].score; // Extract the similarity score
      similarNames.push({ name1, name2, similarity });
    }
  });

  return similarNames;
}

const list1 = ["Steven Calla", "John Doe", "Alice Smith"];
const list2 = [
  { name: "Steve Calla" },
  { name: "Calla, Steve" },
  { name: "Doe, John" },
  { name: "Smith, Alice" },
  { name: "Doish, John" },
  { name: "C, Patrick" },
  { name: "Smith, Jenny" },
];

const similarNames = findSimilarNames(list1, list2);
console.log(similarNames);

