//run using node js by typing "node sort.js" in the terminal
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted

//Todo: sort words
const months = ['March', 'Jan', 'Feb', 'Dec'];
months.sort();
console.log(months);
// Expected output: Array ["Dec", "Feb", "Jan", "March"]

//Todo: sort numbers
const array1 = [1, 30, 4, 21, 100000];
// toSorted works in browser but not node.js
// const sortedNumbers = array1.toSorted(compareNumbers);

// [...numbers] creates a shallow copy, so sort() does not mutate the original
// const sortedNumbers = [...array1].sort((a, b) => a - b);
const sortedNumbers = [...array1].sort(compareNumbers);

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
console.log([...array1]); //creates a shallow copy
// console.log({... array1 });
console.log('original array = ' + array1);
console.log('sorted array = ' + sortedNumbers);
// Expected output: Array [1, 100000, 21, 30, 4] without compareNumbers
// Expected output: Array [1, 4, 21, 30, 100000] without compareNumbers

function compareNumbers(a, b) {
  return a - b;
}

// Todo: Sorting array of objects
// Arrays of objects can be sorted by comparing the value of one of their properties.

const items = [
  { name: "Edward", value: 21 },
  { name: "Sharpe", value: 37 },
  { name: "And", value: 45 },
  { name: "The", value: -12 },
  { name: "Magnetic", value: 13 },
  { name: "Zeros", value: 37 },
];

//Todo: sort by value
items.sort((a, b) => a.value - b.value);
console.log(items);

//Todo: sort by name
items.sort((a, b) => {
  const nameA = a.name.toUpperCase(); // ignore upper and lowercase
  const nameB = b.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
});
console.log(items);