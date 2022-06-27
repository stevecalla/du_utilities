//query selector variables go here 👇
var sectionContent = document.querySelector('section');

//global variables go here 👇

//event listeners go here 👇

//functions and event handlers go here 👇

console.time('loop');
console.time('a');

for(let i = 0; i < 100; i++) {
  console.log(i);
  // sectionContent.innerHTML += `${i}\n`;
  sectionContent.innerHTML += String.raw`${i} <br>`;
}

// var duration = console.timeEnd('a');
// var duration = a;
// var seconds = duration / 1000 + 's';

console.timeEnd('loop');

// console.log(seconds);
// mainContent.innerHTML = seconds;

// Source: 
// https://mail.google.com/mail/u/0/?tab=cm#inbox/GTvVlcRwPVgrZSJfkGvXqBJZRKRgTmrjMbMzndCDNqQkVfPDbJPBDhGXDPjKlljmzXPBGCJFMSXvX