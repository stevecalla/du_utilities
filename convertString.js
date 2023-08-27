const inputString = "Steve Calla; Calla, Steve; Alexander, Jose; Barry Jones; Jones, Barry; Alexander, Jose";
let namesArray = inputString.split("; ").map(name => name);
console.log('semicolon delimited');
console.log({namesArray});

const inputString2 = "Steve Calla, Calla, Steve, Alexander, Jose, Barry Jones, Jones, Barry, Alexander, Jose";
const namesArray2 = inputString2.split(" ");
// console.log(namesArray2);
// console.log(namesArray2.length);
// console.log(namesArray2.length % 2 === 0);

let nameCombo = "";
let names = [];
for (let i = 0; i < namesArray2.length; i++) {
  if (namesArray2.length % 2 === 0 ) {
    if (i > 0 && i % 2 != 0) { //every odd string
      // console.log(i + " " + namesArray[i]);
      nameCombo = namesArray2[i - 1] + " " + namesArray2[i];
      nameCombo = nameCombo.charAt(nameCombo.length - 1) === "," ? nameCombo.slice(0, nameCombo.length - 1): nameCombo;
      // console.log(nameCombo);
      names.push(nameCombo);
      nameCombo = "";
      // console.log(names);
    }
  } else {
    console.log("Input not in the correct format. Please ensure each attendee has a first and last name");
    break;
  }
};
console.log('comma delimited');
console.log({names});


