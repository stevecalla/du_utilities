//INSTRX TO CHANGE ALL ATTENDANCE DROPDOWN TO "Present"
//a) Click to the date of interest
//b) Copy Step #0, #1 into the console. Hit enter
//c) Copy Step #3 into the console. Hit Enter
//d) Double check work by using the Print instrx below

//INSTRX TO PRINT STUDENT LIST WITH ATTENDANCE TO CONSOLE
//a) Click to the date of interest
//b) Copy Step #0, #1, #2, #2a into the console. Hit enter

//SELECT THE 1ST ROW ELEMENT
document.querySelector('.row');

//#1) TARGET & SELECT => STUDENT & ATTENDANCE LIST
const studentList = document.querySelectorAll(`a`);
const attendanceList = document.querySelectorAll(`.divider.text`);
console.log(studentList.length + " " + attendanceList.length);

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

//LINK TO ORIGINAL VERSION FROM BOOTCAMP INSTRUCTOR SLACK CHANNEL
// https://instruct-bootcamps.slack.com/archives/C04NT3N1ZQU/p1680522965029999

// Ignacio Giadach
//   4 months ago
// For those taking attendance, here’s a little script 

// You have to only mark those “Absent” or “Absent - Excused”, it will select all “None” as “Present” - saves a lot of time.
// Just select an inner element, then paste the script in the browser console.

// const dropdowns = document.querySelectorAll('.ui.selection.dropdown');

// dropdowns.forEach((dropdown) => {
//   const preselected = dropdown.querySelector('.divider.text').textContent;
  
//   if (preselected === "None") {
//     const menu = dropdown.querySelector('.menu');
//     const presentOption = [...menu.querySelectorAll('.item')].find(item => item.innerText === 'Present');

//     if (presentOption) {
//       presentOption.click();
//     }
//   }
// });