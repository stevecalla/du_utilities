function hello() {
  console.log('hello');
}

// hello();

function loop() {
  for (let i = 0; i < 10; i++) {
    console.log(i);
  }
};

// loop();


// <!DOCTYPE html>
// <html>
//   <head>
//   </head>
//   <body class="main">
//     <h1>Frontend Task</h1>
//     <div style="display:flex">
//       <button class='left-shift-button'><<</button>
//       <div class="box">1</div>
//       <div class="box">2</div>
//       <div class="box">3</div>
//       <div class="box">4</div>
//       <div class="box">5</div>
//       <button class='right-shift-button'>>></button>
//     </div>
//   </body>
// </html>

//target arrows & numbers
let leftArrowButton = document.querySelector('.left-shift-button');
let rightArrowButton = document.querySelector('.right-shift-button');
let renderNumbers = document.querySelectorAll('.box');

//create constant array
let numbers = [1,2,3,4,5];
let count = 0;

//add event listener
leftArrowButton.addEventListener('click', leftArrowAction);
rightArrowButton.addEventListener('click', rightArrowAction);

//function to shift numbers to left
function leftArrowAction() {
    let newArray = [];
    for (let i = 0; i < renderNumbers.length; i++) {
        // console.log(i + " = " + numbers); //i=0,4=1; i=1,0=1; i=2,1=2
        if (i === 0) {
            newArray[4] = numbers[0];
            renderNumbers[4].textContent = newArray[4];
        } else {
            newArray[i - 1] = numbers[i];
            renderNumbers[i - 1].textContent = newArray[i - 1];
        }
        // console.log(newArray);
    }
    numbers = newArray;
}

//function to shift numbers to the right
function rightArrowAction() {
    let newArray = [];
    for (let i = 0; i < renderNumbers.length; i++) {
        console.log(i + " = " + numbers); //i=0,4=1; i=1,0=1; i=2,1=2
        if (i === 0) {
            newArray[0] = numbers[4];
            renderNumbers[0].textContent = newArray[0];
        } 
        else {
            newArray[i] = numbers[i - 1];
            renderNumbers[i].textContent = newArray[i];
        }
        console.log(newArray);
    }
    numbers = newArray;
}