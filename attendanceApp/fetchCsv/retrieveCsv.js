// https://bootcampspot.instructure.com/courses/4139/external_tools/234
// https://bootcampspot.instructure.com/courses/4139/external_tools/249
// https://applications.zoom.us/lti/rich/home/meeting/reports
// https://applications.zoom.us/lti/rich/export/report/participant/96191378135?oauth_consumer_key=a5_CyEzyQXaokIYx5k3iuA&lti_scid=622f9990cb6848f741fd8f9cf00a3a3230171cdea4ac250ae36cfc0d31fef2af

import fs from 'fs/promises';
import Papa from 'papaparse'; //https://www.papaparse.com/demo
import clipboardy from 'clipboardy';
import excel from 'exceljs'; //https://github.com/exceljs/exceljs#importing
import { spawn } from 'child_process'; ////open excel file

async function parseCSVFile() {
  try {
    const csvFilePath = '/Users/stevecalla/Downloads/zoomReport.csv';
    const csvText = await fs.readFile(csvFilePath, 'utf-8');

    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        complete: function(results) {
          if (results.data && results.data.length > 0) {
            resolve(results.data);
          } else {
            reject(new Error('No data found in CSV file.'));
          }
        },
        error: function(error) {
          reject(error);
        }
      });
    });
  } catch (error) {
    throw error;
  }
};

// Call the parsing function, handle the results, copying to clipboard, export to excel
parseCSVFile()
  .then(parsedData => {
    let parsedDataModifiedKeys = parsedData.map(participant => {
      return {
        name: participant['User Name'],
        email: participant['User Email'],
        joinTime: participant['Join time'],
        leaveTime: participant['Leave time'],
        duration: participant['Duration(Minutes)'],
      }
    });

    //sort participants A-Z
    let sortedParticipants = parsedDataModifiedKeys.map(attendee => attendee).sort((a, b) => {
      const nameA = a.name || ''; //handles null values
      const nameB = b.name || ''; //handles null values
      return nameA.localeCompare(nameB);
    });
    // console.log(sortedParticipants);

    //replace hash # space with comma space
    const replaceHashSpaceWithCommaSpace = sortedParticipants.map(attendee => {
      console.log(attendee);
      const updatedName = attendee?.name?.replace('# ', ', ');
      return { ...attendee, name: updatedName };
    });

    //filter out Instructors and Teaching assistants; if email address is null then attendees
    let filteredParticipants = replaceHashSpaceWithCommaSpace.filter(attendee => attendee.email === null); // remove attendees with email address which are the instructors/teaching assistants
    // console.log(filteredParticipants);

    // create string and copy to clipboard
    let parsedDataString = filteredParticipants.map(name => `\"${name['name']}\"`).join(', ');
    clipboardy.writeSync(parsedDataString);
    // console.log(parsedDataString);
    // console.log('Names saved to clipboard ' + sortedParticipants.length);

    // export to excel
    exportToExcel(filteredParticipants).catch(error => {
      console.error('An error occurred:', error);
    });

    // console.log('Parsed CSV data:', parsedData);
    // console.log(parsedData.map(name => name['User Name']));
    // // console.log(parsedData.map(name => name['User Name']).join(', '));
  })
  .catch(error => {
    console.error('Error:', error);
  });

  
  async function exportToExcel(parsedData) {
  // export to excel
  let date = new Date().toISOString();
  const inputFile = `/Users/stevecalla/Downloads/zoomReport.csv`; // Replace with the path to your CSV file
  const outputName = `zoomReport${date}.xlsx`;
  const outputFile = `/Users/stevecalla/Downloads/${outputName}`; // Replace with the desired output Excel file path

  const workbook = new excel.Workbook();
  // const worksheet = workbook.addWorksheet('Sheet 1');
  const worksheet = workbook.addWorksheet(
    'Sheet 1', 
    { properties:{tabColor:{argb:'FFC0000'}}, 
      views:[{state: 'frozen', xSplit: 0, ySplit:5}], //x is columns; y is rows
      headerFooter:{firstHeader: "Hello Exceljs", firstFooter: "Hello World"}
    }
  );

  // Assuming the keys in the first object of the data array are the headers
  const headers = Object.keys(parsedData[0]);
  worksheet.addRow(headers);

  // console.log('Parsed CSV data:', parsedData);

  parsedData.forEach(row => {
    const values = Object.values(row);
    worksheet.addRow(values);
  });

  try {
    await workbook.xlsx.writeFile(outputFile);
    console.log('Excel file created:', outputFile);

    //open excel file
    openFileWithDefaultProgram(outputName);

  } catch (error) {
    console.error('Error:', error);
  }

};

// const xlsxFilePath = filePath; // Replace with the path to your XLSX file

function openFileWithDefaultProgram(outputName) {
  // let filePath = `~/Users/stevecalla/Downloads/${outputName}`;
  let filePath = `~/Downloads/${outputName}`;
  // let filePath = `~/Downloads/zoomReportTue\ Aug\ 29\ 2023\ 13:23:28\ GMT-0600\ \(Mountain\ Daylight\ Time\).xlsx`;
  console.log(filePath);
  let command = '';

  if (process.platform === 'darwin') { // macOS
    command = 'open';
  } else if (process.platform === 'win32') { // Windows
    command = 'start';
  } else { // Linux and other platforms
    command = 'xdg-open';
  }

  spawn(command, [filePath], { shell: true });
}

// openFileWithDefaultProgram(xlsxFilePath);
