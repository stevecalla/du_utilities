var a = "I'm a variable from script.js. I'm listed 2nd to last on the html page.";

console.log('variable b= ' + b); //will error in the console b/c variable b is in script.js which is below index.js in the index.html

//The button below will connect to the index.html and console.log appopriately.
let firstButton = document.getElementById('first');
log = () => console.log('click first button');
firstButton.addEventListener('click', log);