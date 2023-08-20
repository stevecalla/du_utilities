//Todo - run code in console, source, snippets
// https://developer.chrome.com/docs/devtools/javascript/snippets/

//Todo - step#0: Navigate to Bootcamp
clear();
console.log("NAVIGATE TO BOOTCAMP");
window.location.assign("https://bootcampspot.instructure.com/courses/4139"); //navigate to course

//Todo - step#1: Navigate to Attendance
//ToDo - need to use the console, element tool to select the Attendance element then run code below
clear();
console.log("NAVIGATE TO ATTENDANCE");
document.querySelector(".context_external_tool_234").click(); //select Attendance menu

//Todo - step#2: Navigate to Today
clear();
//GET TODAY'S dateListlet date = new Date();
let date = new Date();
console.log(date);

// request a weekday along with a long date
let options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
let optionsDay = {
    day: "numeric",
}
let dateDay = new Intl.DateTimeFormat("en-US", optionsDay).format(date);
// 16

date = new Intl.DateTimeFormat("en-US", options).format(date);
// "Wednesday, August 16, 2023"

let firstLetter = "";
let secondLetter = "";

switch (dateDay % 10) {
    case 1: firstLetter = "s"; secondLetter = "t"; break;
    case 2: firstLetter = "n"; secondLetter = "d"; break;
    case 3: firstLetter = "r"; secondLetter = "d"; break;
    default: firstLetter = "t"; secondLetter = "h";
};
// https://stackoverflow.com/questions/15397372/javascript-new-date-ordinal-st-nd-rd-th

let count = 0;
let tempDate = date.split('');
for (let i = 0; i < date.length; i++) {
    if (tempDate[i] === ",") {
        if (count === 1) {
            console.log(i + ' yes' + tempDate[i - 1]);
            tempDate.splice(i, 0, secondLetter);
            tempDate.splice(i, 0, firstLetter);
        };
        count++;
    };
};
date = tempDate.join('');
// "Wednesday, August 16th, 2023"
console.log(tempDate)

let currentDate = prompt("Enter the date", date);
console.log("current date = " + currentDate);

//NAVIGATE TO TODAY
console.log("NAVIGATE TO TODAY");
let dateList = document.querySelectorAll("html body .column a");
// let todayDate = "Wednesday, August 16th, 2023";
let todayDate = currentDate;
for (let i = 0; i < dateList.length; i++) {
    if (dateList[i].textContent === todayDate) {
         console.log(dateList[i].textContent);
         dateList[i].click();
    }
};
console.log("dateList = " + dateList);

//Todo - step#3: Create Checkboxes
// document.body.onload = addElement;

const studentList = document.querySelectorAll('.student-details-list');
console.log('nodes= ' + studentList.childNodes);

console.log('length= ' + studentList.length);

for (let i = 2; i < 75; i++) {
    const studentRow = studentList[0].querySelectorAll('.row');
    const attendanceStatus = studentRow[i].querySelectorAll('.seven');
    console.log(studentRow);
    console.log(attendanceStatus);

    //CREATE CHECKBOX
    const createCheckbox = document.createElement("input");
    createCheckbox.type = "checkbox";
    createCheckbox.setAttribute('type', "checkbox");
    createCheckbox.setAttribute('class', "wide column");

    //APPEND
    studentRow[i].appendChild(createCheckbox);
    attendanceStatus.forEach(a => console.log('y'));
    attendanceStatus.forEach(a => a.appendChild(createCheckbox));

    console.log(studentRow[i]);
};

//Todo - step#4: Get Student List
//SELECT THE 1ST ROW ELEMENT
document.querySelector('body .row');
document.querySelector('.row'); //select 

//#1) TARGET & SELECT => STUDENT & ATTENDANCE LIST
const studentList2 = document.querySelectorAll(`a`);
const attendanceList = document.querySelectorAll(`.divider.text`);
console.log(studentList2.length + " " + attendanceList.length);

//Todo - step#5: Print Student List
clear();

//#2) CREATE CONSOLE.LOG STYLE
const styleNotPresent = [
  'color: green',
  'background: yellow',
  'font-size: 14px',
].join(';'); // 2. Concatenate the individual array item and concatenate them into a string separated by a semi-colon (;)

const stylePresent = [
  'color: white',
  // 'background: Blue',
].join(';'); // 2. Concatenate the individual array item and concatenate them into a string separated by a semi-colon (;)
//source: https://www.samanthaming.com/tidbits/40-colorful-console-message/

//#2a) PRINT STUDENT LIST WITH ATTENDANCE
if (studentList.length === attendanceList.length) {
  for (let i = 0; i < studentList.length; i++) {
      attendanceList[i].innerText !== "Present" ? 
        console.log((i + 1) + " => " + `%c${studentList[i].textContent}` + " => " + attendanceList[i].textContent, styleNotPresent) 
        : console.log((i + 1) + " => " + studentList[i].textContent + " => " + attendanceList[i].textContent)
  };
} else {
  console.log('ERROR PRINTING LIST - ARRAYS NOT SAME LENGTH');
};

//#3) SET ALL STUDENTS TO PRESENT
if (studentList.length === attendanceList.length) {
  attendanceList.forEach(studentAttendance => studentAttendance.textContent = "Present");
} else {
  console.log("ERROR CHANGING ATTENDANCE - ARRAYS NOT SAME LENGTH");
};

//Todo - step#6: Update Attendance
//#6) SET ALL STUDENTS TO PRESENT
if (studentList.length === attendanceList.length) {
  const attendanceDropdowns = document.querySelectorAll('.ui.selection.dropdown');

  attendanceDropdowns.forEach((dropdown) => {
    const preselected = dropdown.querySelector('.divider.text').textContent;
    console.log('preselected= ' + preselected);

    if (preselected === "None") {
      const menu = dropdown.querySelector('.menu');
      console.log('menu= ' + menu);
      const presentOption = [...menu.querySelectorAll('.item')].find(item => item.innerText === 'Present');

      if (presentOption) {
        presentOption.click();
      };
    };
  });
} else {
  console.log("ERROR CHANGING ATTENDANCE - ARRAYS NOT SAME LENGTH");
};

//Todo: - step#6a: Set all students to None
//#3) SET ALL STUDENTS TO PRESENT
if (studentList.length === attendanceList.length) {
  const attendanceDropdowns = document.querySelectorAll('.ui.selection.dropdown');

  attendanceDropdowns.forEach((dropdown) => {
    const preselected = dropdown.querySelector('.divider.text').textContent;
    console.log('preselected= ' + preselected);

    // if (preselected === "None") {
      const menu = dropdown.querySelector('.menu');
      console.log('menu= ' + menu);
      const presentOption = [...menu.querySelectorAll('.item')].find(item => item.innerText === 'None');

      if (presentOption) {
        presentOption.click();
      };
    // };
  });
} else {
  console.log("ERROR CHANGING ATTENDANCE - ARRAYS NOT SAME LENGTH");
};

//Todo - utility: clear
clear();