//Todo - run code in console, source, snippets
// https://developer.chrome.com/docs/devtools/javascript/snippets/

//TODO Step #0 navigate to Bootcamp
clear();
console.log("NAVIGATE TO BOOTCAMP");
window.location.assign("https://bootcampspot.instructure.com/courses/4139"); //navigate to course

//TODO Step #1 Navigate to Attendance
clear();
console.log("NAVIGATE TO ATTENDANCE");
document.querySelector(".context_external_tool_234").click(); //select Attendance menu

//TODO Step #2 GET TODAY'S date
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

//TODO Step #3 Create Checkboxes
const studentList2 = document.querySelectorAll('.student-details-list');
console.log('nodes= ' + studentList.childNodes);

console.log('length= ' + studentList.length);

for (let i = 2; i < 75; i++) {
    const studentRow = studentList2[0].querySelectorAll('.row');
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

//TODO Step #4 Get Student List
//SELECT THE 1ST ROW ELEMENT
document.querySelector('body .row');
document.querySelector('.row'); //select 

//#1) TARGET & SELECT => STUDENT & ATTENDANCE LIST
const studentList = document.querySelectorAll(`a`);
const attendanceList = document.querySelectorAll(`.divider.text`);
console.log(studentList.length + " " + attendanceList.length);

//TODO Step #5 Print Student List with Attendance
clear();

//CREATE CONSOLE.LOG STYLE
const styleNotPresent = [
  'color: green',
  'background: yellow',
  'font-size: 14px',
].join(';'); // 2. Concatenate the individual array item and concatenate them into a string separated by a semi-colon (;)

const stylePresent = [
  'color: red',
  // 'background: Blue',
].join(';'); // 2. Concatenate the individual array item and concatenate them into a string separated by a semi-colon (;)
//source: https://www.samanthaming.com/tidbits/40-colorful-console-message/

//#5) PRINT STUDENT LIST WITH ATTENDANCE
if (studentList.length === attendanceList.length) {
  for (let i = 0; i < studentList.length; i++) {
      attendanceList[i].innerText !== "Present" ? 
        console.log((i + 1) + " => " + `%c${studentList[i].textContent}` + " => " + attendanceList[i].textContent, styleNotPresent) 
        : console.log((i + 1) + " => " + `%c${studentList[i].textContent}` + " => " + attendanceList[i].textContent, stylePresent);
 
  };
} else {
  console.log('ERROR PRINTING LIST - ARRAYS NOT SAME LENGTH');
};


//TODO Step #5a Print Student List with Attendance
clear();clear();

const styleNotPresent2 = [
  'color: green',
  'background: yellow',
  'font-size: 14px',
].join(';'); // 2. Concatenate the individual array item and concatenate them into a string separated by a semi-colon (;)

const stylePresent2 = [
  'color: white',
  // 'background: Blue',
].join(';'); // 2. Concatenate the individual array item and concatenate them into a string separated by a semi-colon (;)
//source: https://www.samanthaming.com/tidbits/40-colorful-console-message/

//PRINT STUDENT LIST WITH ATTENDANCE
absentList = [];
if (studentList.length === attendanceList.length) {
  count = 0;
  for (let i = 0; i < studentList.length; i++) {  
    //PRINT ONLY ABSENT STUDENTS

      attendanceList[i].innerText !== "Present" && count++;
      
      attendanceList[i].innerText !== "Present" && absentList.push(studentList[i].textContent);
          
      attendanceList[i].innerText !== "Present" && 
        console.log(count + ") " + (i + 1) + " => " + `%c${studentList[i].textContent}` + " => " + attendanceList[i].textContent, styleNotPresent);

      // attendanceList[i].innerText !== "Present" ? 
        // console.log((i + 1) + " => " + `%c${studentList[i].textContent}` + " => " + attendanceList[i].textContent, styleNotPresent) 
        // : console.log((i + 1) + " => " + studentList[i].textContent + " => " + attendanceList[i].textContent)
 
  };
} else {
  console.log('ERROR PRINTING LIST - ARRAYS NOT SAME LENGTH');
};

console.log(absentList);

//TODO Step #5b WRITE STUDENT LIST TO CLIPBOARD
//After clicking run, click on the document window otherwise it will error

clear();

async function writeToClipboard () {
  if (!navigator.clipboard) {
    console.log("Clipboard API not available");
    return;
  };

  //convert node list to array
  let students = [];
  for (let i = 0; i < studentList.length; i++) {
    // let object = { name: studentList[i].textContent }; 
    // students.push(object);  
    students.push(studentList[i].textContent);
  };

  //convert array to JSON for clipboard
  students = JSON.stringify(students);
  console.log(students);

  //copy to clipboard
  try {
    await navigator.clipboard.writeText(students);
  } catch (err) {
    console.error('Failed to writeToClipboard!', err)
  }
}

//set timeout is necessary; need to click run, then in document 
//to prevent error
setTimeout(() => {writeToClipboard() }, 5000)

//Step#5c: Export to Excel
clear();
function exportTableToExcel(filename = '') {
  var downloadLink;
  var dataType = 'application/vnd.ms-excel';

  // Convert NodeList to array
  let students = [];
  for (let i = 0; i < studentList.length; i++) {
    students.push(studentList[i].textContent);
  };

  console.log(studentList)
  console.log(students);

  // Create table HTML
  var tableHTML = '<table><tbody>';

  // Loop through students and add rows
  for (let i = 0; i < students.length; i++) {
    tableHTML += '<tr>';
    tableHTML += `<td>${students[i]}</td>`;
    tableHTML += '</tr>';
  }

  tableHTML += '</tbody></table>';

  console.log(tableHTML)

  // Specify file name
  filename = filename ? filename + '.xls' : 'excel_data.xls';

  // Create download link element
  downloadLink = document.createElement("a");

  document.body.appendChild(downloadLink);

  if (navigator.msSaveOrOpenBlob) {
    var blob = new Blob(['\ufeff', tableHTML], { type: dataType });
    navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    // Create a link to the file
    downloadLink.href = 'data:' + dataType + ', ' + encodeURIComponent(tableHTML);

    // Setting the file name
    downloadLink.download = filename;

    // Triggering the download
    downloadLink.click();
  }
}

// // Usage example
// const studentList = document.querySelectorAll('.student'); // Replace with actual selector
let date2 = new Date();
exportTableToExcel(`student_data ${date2}`);

//Step#5c: Export to Excel
//this code removed the space between the first and last name
// function exportTableToExcel(tableID, filename = '') {
//   var downloadLink;
//   var dataType = 'application/vnd.ms-excel';

//   //convert node list to array
//   let students = [];
//   for (let i = 0; i < studentList.length; i++) { 
//     students.push(studentList[i].textContent);
//   };
  
//   console.log(students);

//   // Loop through the dataArray and generate table rows
//   var tableHTML = '<table><tbody>';
  
//   console.log(studentList)
//   for (let i = 0; i < students.length; i++) {
//     tableHTML += '<tr>';
//     tableHTML += `<td>${students[i]}</td>`;
//     tableHTML += '</tr>';
    
//     // tableHTML += '<tr>';
//     // for (const value of dataArray[i]) {
//     //   tableHTML += `<td>${value}</td>`;
//     // }
//     // tableHTML += '</tr>';
//   }

//   tableHTML += '</tbody></table>';

//   console.log(tableHTML);
  
//   // Specify file name
//   filename = filename ? filename+'.xls' : 'excel_data.xls';
  
//   // Create download link element
//   downloadLink = document.createElement("a");
//   console.log(downloadLink);
  
//   document.body.appendChild(downloadLink);
  
//   if (navigator.msSaveOrOpenBlob) {
//       var blob = new Blob(['\ufeff', tableHTML], { type: dataType });
//       navigator.msSaveOrOpenBlob(blob, filename);
//   } else {
//       // Create a link to the file
//       downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
  
//       // Setting the file name
//       downloadLink.download = filename;
      
//       //triggering the function
//       downloadLink.click();
//   }
// }

// // Usage
// const dataArray = [
//   ['Name', 'Age', 'Location'],
//   ['Alice', '25', 'New York'],
//   ['Bob', '30', 'Los Angeles'],
//   ['Carol', '28', 'Chicago']
// ];



//TODO #6) SET ALL STUDENTS TO PRESENT
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

//TODO #6a) SET ALL STUDENTS TO None
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

//TODO Step #7: Update Attendance Backup Code
const dropdowns = document.querySelectorAll('.ui.selection.dropdown');

dropdowns.forEach((dropdown) => {
  const preselected = dropdown.querySelector('.divider.text').textContent;
  
  if (preselected === "None") {
    const menu = dropdown.querySelector('.menu');
    const presentOption = [...menu.querySelectorAll('.item')].find(item => item.innerText === 'Present');

    if (presentOption) {
      presentOption.click();
    }
  }
});