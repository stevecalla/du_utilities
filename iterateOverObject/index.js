const a = {a: 1, c: 2};

//iterative using for loop
console.log("---- Iterative using for of & object entries")
for (const [key, value] of Object.entries(a)) {
  console.log(`Key = ${key}`);
  console.log(`Value = ${value}`);
}

// iterate using object.keys but the parameters "(key,value)" are incorrect
console.log("\n---- Object keys with value parameter products undefined for value")
Object.keys(a).forEach(([key, value]) => {
  console.log(`${key}`); console.log(`${value}`);});

// iterate using object.entries but the parameters "(key,value)" are incorrect
console.log("\n---- Object entries with incorrect parameters")
Object.entries(a).forEach((key, value) => {
  console.log(`${key}`); console.log(`${value}`);});

//iterative using object.entries with the correct parameters using "([key,value]);
console.log("\n---- Object entries with correct parameters")
Object.entries(a).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});