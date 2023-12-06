// Returns a random character that includes alphanumeric and special character values
let min = 33;
let max = 127;
function getPasswordCharacter() {
  // return String.fromCharCode(Math.floor(Math.random() * 77) + 34);
  return String.fromCharCode(Math.floor(Math.random() * (max - min) + min));
}

// GENERATE CHARACTERS FROM 34 TO 127
let characters = [];
for (let i = min; i < max; i++) {
  console.log(i, String.fromCharCode(i));
  let character = String.fromCharCode(i);
  characters.push(character);
}
console.log(characters);

// TEST RANDOM NUMBERS RETURNED
let randomNumberRange = [];
for (let i = 0; i <= 10000; i++) {
  let randomNumber = Math.floor(Math.random() * (max - min) + min);
  if (!randomNumberRange.includes(randomNumber)) {
    randomNumberRange.push(randomNumber);
  }
  randomNumberRange.sort((a, b) => {
    return a - b;
  });
}
console.log(randomNumberRange);