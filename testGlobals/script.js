var b = "I'm a variable from script.js. I'm listed last on the html page.";

console.log('variable a= ' + a);

//The button below will connect to the index.html and console.log appopriately.
let secondButton = document.getElementById('second');
log2 = () => console.log('click second button');
secondButton.addEventListener('click', log2);